import React, { useEffect, useState, useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaClock,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaRegClock,
  FaRegCalendar,
  FaFilter,
  FaSearch,
} from "react-icons/fa";

/**
 * RouteDetail.jsx — Final interactive version (DOM outputs, no alerts)
 *
 * Features:
 * - Preserves original data fetching: GET /popular_routes/:id
 * - Clicking an origin airport (e.g., Ташкент) shows "Flights from {origin}" block
 * - Clicking "Купить" writes the selected flight into a visible DOM panel (Selected flight)
 * - Clicking "Выбрать даты" opens an inline date picker area (no alerts)
 * - No alert() calls anywhere
 * - Filters, search, price range still work as before
 *
 * Requirements:
 * - Tailwind CSS configured
 * - react-icons installed
 * - API: GET /popular_routes/:id returns object with { city, country, flights: [...] }
 */

const RouteDetail = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const flightRoute = searchParams.get("flight");

  // original data states
  const [route, setRoute] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // UI states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [onlyDirect, setOnlyDirect] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 99999999]);
  const [showFilters, setShowFilters] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({
    searchQuery: "",
    selectedAirlines: [],
    onlyDirect: false,
    priceRange: [0, 99999999],
  });

  // New DOM-targeted UI states (no alerts)
  const [selectedOrigin, setSelectedOrigin] = useState(null); // e.g., "Ташкент"
  const [flightsFromOrigin, setFlightsFromOrigin] = useState([]); // filtered list for origin
  const [selectedFlight, setSelectedFlight] = useState(null); // flight chosen via "Купить"
  const [selectedFlightDate, setSelectedFlightDate] = useState(null); // date chosen for selectedFlight
  const [datePickerFor, setDatePickerFor] = useState(null); // flight id for which datepicker is open
  const [message, setMessage] = useState(null); // small toast

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`http://localhost:3001/popular_routes/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Маршрут топиш мумкин эмас");
        return res.json();
      })
      .then((data) => {
        setRoute(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Xatolik:", err);
        setError(err.message || "Xatolik yuz berdi");
        setLoading(false);
      });
  }, [id]);

  // utility: parse price into number
  const parsePrice = (p) => {
    if (p == null) return 0;
    if (typeof p === "number") return p;
    const digits = String(p).replace(/[^\d]/g, "");
    return digits ? Number(digits) : 0;
  };

  // derive airlinesList from route data
  const airlinesList = useMemo(() => {
    if (!route) return [];
    if (Array.isArray(route.airlines) && route.airlines.length) return route.airlines;
    const set = new Set(route.flights?.map((f) => f.airline).filter(Boolean));
    return Array.from(set);
  }, [route]);

  // preserve original currentFlight logic
  const currentFlight =
    route?.flights?.find((f) => f.route === flightRoute) || route?.flights?.[0] || null;

  // apply filters to flights (based on appliedFilters)
  const flightsAfterApply = useMemo(() => {
    if (!route?.flights) return [];

    const { searchQuery: sq, selectedAirlines: sAir, onlyDirect: od, priceRange: pr } = appliedFilters;

    let fl = [...route.flights];

    if (sq && sq.trim()) {
      const q = sq.toLowerCase();
      fl = fl.filter(
        (f) =>
          (f.route && f.route.toLowerCase().includes(q)) ||
          (f.airline && f.airline.toLowerCase().includes(q)) ||
          String(f.price || "").toLowerCase().includes(q)
      );
    }

    if (sAir && sAir.length > 0) {
      fl = fl.filter((f) => sAir.includes(f.airline));
    }

    if (od) {
      fl = fl.filter((f) => f.direct === true || f.direct === "true" || f.direct === "yes");
    }

    fl = fl.filter((f) => {
      const p = parsePrice(f.price);
      return p >= (pr?.[0] ?? 0) && p <= (pr?.[1] ?? Number.MAX_SAFE_INTEGER);
    });

    return fl;
  }, [route, appliedFilters]);

  // Apply current UI filter states into appliedFilters
  const applyFilters = () => {
    setAppliedFilters({
      searchQuery,
      selectedAirlines,
      onlyDirect,
      priceRange,
    });
    setMessage("Фильтры применены");
    setTimeout(() => setMessage(null), 2000);
    setShowFilters(false);
    // scroll to results
    const el = document.getElementById("results-top");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedAirlines([]);
    setOnlyDirect(false);
    setPriceRange([0, 99999999]);
    setAppliedFilters({
      searchQuery: "",
      selectedAirlines: [],
      onlyDirect: false,
      priceRange: [0, 99999999],
    });
    setMessage("Фильтры сброшены");
    setTimeout(() => setMessage(null), 1500);
  };

  const toggleAirline = (name) => {
    setSelectedAirlines((prev) => (prev.includes(name) ? prev.filter((a) => a !== name) : [...prev, name]));
  };

  // New logic: when an origin is clicked, compute flightsFromOrigin and show in DOM
  const handleOriginClick = (origin) => {
    setSelectedOrigin(origin);
    // find flights where origin matches (we assume flights have 'route' like "Ташкент — Москва" or have from/to fields)
    const matches = (route?.flights || []).filter((f) => {
      if (f.route && typeof f.route === "string") {
        const [from] = f.route.split(" — ").map((s) => s.trim());
        return from === origin;
      }
      // fallback: if flight has 'from' field
      return f.from === origin;
    });
    setFlightsFromOrigin(matches);
    // scroll to the flights-from-origin block
    setTimeout(() => {
      const el = document.getElementById("flights-from-origin");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  // When "Купить" clicked: set selectedFlight and show in Selected Flight DOM panel
  const handleBuy = (flight) => {
    setSelectedFlight(flight);
    setSelectedFlightDate(null);
    setMessage("Рейс выбран для покупки (см. панель ниже)");
    setTimeout(() => setMessage(null), 2000);
    // scroll to selected flight panel
    setTimeout(() => {
      const el = document.getElementById("selected-flight-panel");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 120);
  };

  // When "Выбрать даты" clicked: open an inline date picker for that flight
  const handleSelectDates = (flight) => {
    setDatePickerFor(flight.id || flight.route);
    // scroll to the date picker area inside the card by id constructed below (if present)
    setTimeout(() => {
      const el = document.getElementById(`date-picker-${flight.id || encodeURIComponent(flight.route)}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 120);
  };

  // Confirm date selection for a flight (also can set selectedFlight)
  const confirmDateSelection = (flight, date) => {
    setSelectedFlight(flight);
    setSelectedFlightDate(date);
    setDatePickerFor(null);
    setMessage(`Дата выбрана: ${date}`);
    setTimeout(() => setMessage(null), 2000);
    // scroll to selected flight panel
    setTimeout(() => {
      const el = document.getElementById("selected-flight-panel");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 120);
  };

  // small price formatter
  const formatPrice = (p) => {
    if (p == null) return "—";
    const num = parsePrice(p);
    if (num === 0) return "—";
    return new Intl.NumberFormat().format(num) + " сум";
  };

  // Loading & error UI (preserve look)
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Юкланмоқда...</p>
        </div>
      </div>
    );
  }

  if (error || !route) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>Хатолик: {error || "Маршрут топиш мумкин эмас"}</p>
        </div>
      </div>
    );
  }

  // safe derived values
  const displayTitle = currentFlight?.route || `${route.city} - ${route.country}`;
  const displayPrice = currentFlight?.price ? formatPrice(currentFlight.price) : "—";

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="text-xl font-bold text-gray-900 cursor-pointer">AviaSite</div>

            <nav className="hidden md:flex items-center gap-4 text-sm text-gray-600">
              <span className="text-gray-500">Дешёвые авиабилеты</span>
              <span className="text-gray-300">/</span>
              <span className="hover:text-blue-600 cursor-pointer">Узбекистан</span>
              <span className="text-gray-300">/</span>
              <span className="text-blue-600 font-medium">{displayTitle}</span>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center border rounded-lg px-3 py-1 gap-2 text-sm bg-gray-50">
              <FaSearch className="text-gray-400" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск рейсов, авиакомпаний..."
                className="bg-transparent outline-none text-sm w-44"
              />
            </div>

            <button
              onClick={() => setShowFilters((s) => !s)}
              className="flex items-center gap-2 bg-white border rounded-lg px-3 py-2 hover:shadow transition"
            >
              <FaFilter />
              <span className="text-sm hidden sm:inline">Фильтры</span>
            </button>

            <button
              onClick={() => applyFilters()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
            >
              Найти билеты
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero */}
        <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Дешёвые авиабилеты / Узбекистан /{" "}
                <span className="text-blue-600">{displayTitle}</span>
              </h1>
              <p className="text-gray-600">
                Самый простой способ оказаться в месте назначения — прямой перелёт. Прямые рейсы выполняют следующие авиакомпании:
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-gray-500">Средняя цена</div>
                <div className="text-xl font-semibold text-gray-900">{displayPrice}</div>
              </div>

              <div className="bg-blue-50 rounded-lg p-3 text-blue-600">
                <FaMoneyBillWave />
              </div>
            </div>
          </div>

          {/* small stats */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-3 rounded-lg border border-gray-100 bg-white flex items-start gap-3">
              <div className="p-2 bg-blue-50 rounded-md text-blue-600">
                <FaClock />
              </div>
              <div>
                <div className="text-sm text-gray-500">Время в пути</div>
                <div className="font-semibold text-gray-900">4ч 19м</div>
              </div>
            </div>
            <div className="p-3 rounded-lg border border-gray-100 bg-white flex items-start gap-3">
              <div className="p-2 bg-blue-50 rounded-md text-blue-600">
                <FaPlaneDeparture />
              </div>
              <div>
                <div className="text-sm text-gray-500">Расстояние</div>
                <div className="font-semibold text-gray-900">2 795 км</div>
              </div>
            </div>
            <div className="p-3 rounded-lg border border-gray-100 bg-white flex items-start gap-3">
              <div className="p-2 bg-blue-50 rounded-md text-blue-600">
                <FaCalendarAlt />
              </div>
              <div>
                <div className="text-sm text-gray-500">Разница во времени</div>
                <div className="font-semibold text-gray-900">+2ч</div>
              </div>
            </div>
            <div className="p-3 rounded-lg border border-gray-100 bg-white flex items-start gap-3">
              <div className="p-2 bg-blue-50 rounded-md text-blue-600">
                <FaPlaneArrival />
              </div>
              <div>
                <div className="text-sm text-gray-500">Рейсов в неделю</div>
                <div className="font-semibold text-gray-900">8</div>
              </div>
            </div>
          </div>
        </section>

        {/* Layout: filters left, results right */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters column */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-900">Фильтры</h4>
                <button onClick={resetFilters} className="text-sm text-gray-500 hover:text-gray-700">
                  Сбросить
                </button>
              </div>

              <div className="mb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onlyDirect}
                    onChange={(e) => setOnlyDirect(e.target.checked)}
                    className="w-4 h-4 accent-blue-600"
                  />
                  <span className="text-sm text-gray-700">Только прямые рейсы</span>
                </label>
              </div>

              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-2">Авиакомпании</div>
                <div className="grid grid-cols-1 gap-2 max-h-40 overflow-auto pr-1">
                  {airlinesList.length === 0 && <div className="text-sm text-gray-500">Нет данных</div>}
                  {airlinesList.map((a) => (
                    <label key={a} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-blue-600"
                        checked={selectedAirlines.includes(a)}
                        onChange={() => toggleAirline(a)}
                      />
                      <span className="truncate">{a}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-2">Цена (мин - макс)</div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={priceRange[0] === 0 ? "" : priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value || 0), priceRange[1]])}
                    className="w-1/2 border rounded px-2 py-1 text-sm"
                    placeholder="Мин"
                    min={0}
                  />
                  <input
                    type="number"
                    value={priceRange[1] === 99999999 ? "" : priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value || 99999999)])}
                    className="w-1/2 border rounded px-2 py-1 text-sm"
                    placeholder="Макс"
                    min={0}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <button onClick={applyFilters} className="flex-1 text-sm border rounded px-3 py-2 hover:shadow">
                  Применить
                </button>
                <button
                  onClick={() => {
                    setAppliedFilters({
                      searchQuery,
                      selectedAirlines,
                      onlyDirect,
                      priceRange,
                    });
                    setMessage("Фильтры применены (быстр.)");
                    setTimeout(() => setMessage(null), 1500);
                  }}
                  className="bg-blue-600 text-white px-3 py-2 rounded text-sm"
                >
                  Применить быстро
                </button>
              </div>
            </div>

            <div className="mt-4 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h5 className="text-sm font-semibold text-gray-900 mb-3">Аэропорты вылета</h5>
              <div className="grid grid-cols-1 gap-2">
                {/* List origins inferred from flights */}
                {Array.from(new Set((route.flights || []).map((f) => (f.route ? f.route.split(" — ")[0] : f.from))))
                  .filter(Boolean)
                  .map((origin) => (
                    <button
                      key={origin}
                      onClick={() => handleOriginClick(origin)}
                      className={`py-2 px-3 rounded hover:bg-gray-50 text-left text-sm w-full ${selectedOrigin === origin ? "bg-blue-50 border border-blue-100" : ""}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FaMapMarkerAlt className="text-blue-600" />
                          <div>{origin}</div>
                        </div>
                        <div className="text-xs text-gray-500">время: —</div>
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          </aside>

          {/* Results & various blocks */}
          <section id="results-top" className="lg:col-span-3 space-y-6">
            {/* Direct flights summary (static list of carriers, but clickable handled below) */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Расписание прямых рейсов {displayTitle}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Самый простой способ оказаться в месте назначения — прямой перелёт. Прямые рейсы выполняют следующие авиакомпании:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: "Uzbekistan Airways", days: "ежедневно", price: parsePrice(currentFlight?.price || 101) },
                  { name: "Победа", days: "пн, вт, ср, чт, пт, сб", price: parsePrice(currentFlight?.price || 847704) },
                  { name: "Centrum Air", days: "пн, вт, ср, чт, пт, вс", price: parsePrice(currentFlight?.price || 119) },
                ].map((airline) => (
                  <div key={airline.name} className="p-4 border border-gray-200 rounded-xl flex flex-col justify-between">
                    <div>
                      <div className="font-semibold text-gray-900">{airline.name}</div>
                      <div className="text-sm text-gray-500 mt-1">{airline.days} от {new Intl.NumberFormat().format(airline.price)} сум</div>
                    </div>

                    <div className="mt-4 flex items-center gap-3">
                      <button
                        onClick={() => {
                          // open an inline demo datepicker area for this airline (we create a pseudo "flight" object)
                          const pseudoFlight = {
                            id: `pseudo-${airline.name}`,
                            route: `${route.city} — ${route.country}`,
                            airline: airline.name,
                            price: airline.price,
                            duration: "—",
                            direct: true,
                            departure: "—",
                            arrival: "—",
                          };
                          handleSelectDates(pseudoFlight);
                        }}
                        className="text-sm px-3 py-2 border rounded hover:bg-gray-50"
                      >
                        Выбрать даты
                      </button>
                      <button
                        onClick={() => {
                          const pseudoFlight = {
                            id: `pseudo-buy-${airline.name}`,
                            route: `${route.city} — ${route.country}`,
                            airline: airline.name,
                            price: airline.price,
                            duration: "—",
                            direct: true,
                            departure: "—",
                            arrival: "—",
                          };
                          handleBuy(pseudoFlight);
                        }}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                      >
                        Купить
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Flights-from-origin panel (appears when origin clicked) */}
            <div id="flights-from-origin" className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              {selectedOrigin ? (
                <>
                  <h3 className="text-lg font-semibold mb-4">Рейсы из {selectedOrigin}</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {flightsFromOrigin.length > 0 ? (
                      flightsFromOrigin.map((f) => (
                        <div key={f.id || f.route} className="p-4 border border-gray-200 rounded-lg hover:shadow transition">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-gray-900">{f.route}</div>
                              <div className="text-sm text-gray-500 mt-1">{f.airline || "—"}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-gray-500">от</div>
                              <div className="text-lg font-semibold text-gray-900">{formatPrice(f.price)}</div>
                            </div>
                          </div>

                          <div className="mt-3 flex items-center gap-3 text-sm text-gray-600">
                            <FaRegClock className="text-gray-400" />
                            <div>в пути: {f.duration || "—"}</div>
                            <span className="mx-2">•</span>
                            <FaRegCalendar className="text-gray-400" />
                            <div>{f.days || "—"}</div>
                          </div>

                          {/* inline date picker (visible if datePickerFor matches) */}
                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleSelectDates(f)}
                                className="text-sm px-3 py-2 border rounded hover:bg-gray-50"
                              >
                                Выбрать даты
                              </button>
                              <button
                                onClick={() => handleBuy(f)}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                              >
                                Купить
                              </button>
                            </div>
                            <div className="text-xs text-gray-500">{f.direct ? "Прямой" : "С пересадкой"}</div>
                          </div>

                          {datePickerFor && (datePickerFor === f.id || datePickerFor === `pseudo-${f.airline}`) && (
                            <div id={`date-picker-${f.id || encodeURIComponent(f.route)}`} className="mt-4">
                              <input
                                type="date"
                                onChange={(e) => setSelectedFlightDate(e.target.value)}
                                className="border rounded px-3 py-2 w-full"
                              />
                              <div className="mt-2 flex gap-2">
                                <button
                                  onClick={() => confirmDateSelection(f, selectedFlightDate)}
                                  disabled={!selectedFlightDate}
                                  className="bg-blue-600 text-white px-3 py-2 rounded disabled:opacity-50"
                                >
                                  Подтвердить дату
                                </button>
                                <button
                                  onClick={() => setDatePickerFor(null)}
                                  className="px-3 py-2 border rounded"
                                >
                                  Отмена
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="col-span-full text-center py-10 text-gray-500">Нет рейсов из {selectedOrigin}</div>
                    )}
                  </div>
                </>
              ) : (
                <div className="text-gray-500">Нажмите на аэропорт отправления слева, чтобы увидеть доступные рейсы.</div>
              )}
            </div>

            {/* Prices table */}
            <div id="prices" className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Самые дешёвые авиабилеты {displayTitle}</h3>

              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Месяц</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">В одну сторону</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Туда и обратно</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 border-b">Октябрь 2025</td>
                      <td className="px-6 py-4 border-b">22.10.2025 {displayPrice}</td>
                      <td className="px-6 py-4 border-b">22.10 - 30.10.2025 {displayPrice}</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 border-b">Ноябрь 2025</td>
                      <td className="px-6 py-4 border-b">01.11.2025 {displayPrice}</td>
                      <td className="px-6 py-4 border-b">01.11 - 25.11.2025 {displayPrice}</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 border-b">Декабрь 2025</td>
                      <td className="px-6 py-4 border-b">26.12.2025 {displayPrice}</td>
                      <td className="px-6 py-4 border-b">27.12 - 11.01.2026 {displayPrice}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Самый дешевый авиабилет</strong>, найденный нашими пользователями за последние 48 часов:
                  билет от авиакомпании Centrum Air с вылетом 22.10.2025 и стоимостью <strong>{displayPrice}</strong>.
                </p>
                <button className="text-blue-600 font-semibold">Найти этот билет</button>
              </div>
            </div>

            {/* Airlines & Airports */}
            <div id="airlines" className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Авиакомпании, летающие по маршруту {displayTitle}</h3>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {airlinesList.map((airline) => (
                  <div key={airline} className="p-3 border border-gray-200 rounded-lg text-center hover:bg-gray-50 cursor-pointer">
                    <div className="text-sm font-semibold">{airline}</div>
                    <div className="text-xs text-gray-500 mt-1">рейсы: {Math.floor(Math.random() * 10) + 1}/нед</div>
                  </div>
                ))}
              </div>
            </div>

            <div id="airports" className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Аэропорты, обслуживающие направление {displayTitle}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Аэропорты вылета:</h4>
                  <div className="space-y-2">
                    {route.flights.map((f, i) => (
                      <div key={i} className="p-2 border border-gray-200 rounded flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FaMapMarkerAlt className="text-blue-600" />
                          <div className="text-sm">{f.route.split(" — ")[0]}</div>
                        </div>
                        <div className="text-xs text-gray-500">время: {f.departure || "—"}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Аэропорты назначения:</h4>
                  <div className="space-y-2">
                    {["Шереметьево (SVO)", "Домодедово (DME)", "Жуковский (ZIA)", "Внуково (VKO)"].map((airport) => (
                      <div key={airport} className="p-2 border border-gray-200 rounded flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FaMapMarkerAlt className="text-blue-600" />
                          <div className="text-sm">{airport}</div>
                        </div>
                        <div className="text-xs text-gray-500">код: {airport.match(/\((.*?)\)/)?.[1] || "—"}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Other flights grid (based on appliedFilters) */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Другие рейсы в {route.city}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {flightsAfterApply.map((f, i) => (
                  <div key={f.id ?? i} className="p-4 border border-gray-200 rounded-lg hover:shadow transition">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">{f.route}</div>
                        <div className="text-sm text-gray-500 mt-1">{f.airline || "—"}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">от</div>
                        <div className="text-lg font-semibold text-gray-900">{formatPrice(f.price)}</div>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-3 text-sm text-gray-600">
                      <FaRegClock className="text-gray-400" />
                      <div>в пути: {f.duration || "—"}</div>
                      <span className="mx-2">•</span>
                      <FaRegCalendar className="text-gray-400" />
                      <div>{f.days || "—"}</div>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleSelectDates(f)} className="text-sm px-3 py-2 border rounded hover:bg-gray-50">
                          Выбрать даты
                        </button>
                        <button onClick={() => handleBuy(f)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                          Купить
                        </button>
                      </div>
                      <div className="text-xs text-gray-500">{f.direct ? "Прямой" : "С пересадкой"}</div>
                    </div>

                    {datePickerFor && (datePickerFor === f.id || datePickerFor === `pseudo-${f.airline}`) && (
                      <div id={`date-picker-${f.id || encodeURIComponent(f.route)}`} className="mt-4">
                        <input
                          type="date"
                          onChange={(e) => setSelectedFlightDate(e.target.value)}
                          className="border rounded px-3 py-2 w-full"
                        />
                        <div className="mt-2 flex gap-2">
                          <button
                            onClick={() => confirmDateSelection(f, selectedFlightDate)}
                            disabled={!selectedFlightDate}
                            className="bg-blue-600 text-white px-3 py-2 rounded disabled:opacity-50"
                          >
                            Подтвердить дату
                          </button>
                          <button onClick={() => setDatePickerFor(null)} className="px-3 py-2 border rounded">
                            Отмена
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {flightsAfterApply.length === 0 && <div className="col-span-full text-center py-10 text-gray-500">Нет доступных рейсов по выбранным критериям.</div>}
              </div>
            </div>

            {/* Travel tips */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h4 className="text-lg font-semibold mb-3">Советы путешественникам</h4>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                <li>Проверяйте требования по визе заранее.</li>
                <li>Сравнивайте тарифы разных агентств.</li>
                <li>Бронируйте билеты за 1-3 месяца для экономии.</li>
                <li>Учтите время на трансфер и регистрацию в аэропорту.</li>
              </ul>
            </div>
          </section>
        </div>
      </main>

      {/* Selected Flight DOM Panel (no alerts!) */}
      <div id="selected-flight-panel" className="max-w-7xl mx-auto px-6 mb-12">
        <div className="bg-white rounded-2xl p-6 border border-blue-100 shadow-sm">
          <h4 className="text-lg font-semibold mb-3">Информация о выбранном рейсе</h4>
          {!selectedFlight ? (
            <div className="text-sm text-gray-500">Пока ничего не выбрано. Нажмите "Купить" на карточке рейса ниже, чтобы увидеть детали здесь.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
              <div>
                <div className="text-sm text-gray-500">Маршрут</div>
                <div className="font-semibold text-gray-900">{selectedFlight.route}</div>
                <div className="text-sm text-gray-500 mt-1">{selectedFlight.airline}</div>
              </div>

              <div>
                <div className="text-sm text-gray-500">Цена</div>
                <div className="font-semibold text-gray-900">{formatPrice(selectedFlight.price)}</div>
                <div className="text-sm text-gray-500 mt-1">В пути: {selectedFlight.duration || "—"}</div>
              </div>

              <div>
                <div className="text-sm text-gray-500">Дата</div>
                <div className="font-semibold text-gray-900">{selectedFlightDate || "не выбрана"}</div>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => {
                      if (!selectedFlightDate) {
                        // Open a simple prompt-like inline chooser: focus date picker at top of list if exists
                        setDatePickerFor(selectedFlight.id || `pseudo-${selectedFlight.airline}`);
                        setMessage("Пожалуйста, выберите дату ниже в карточке рейса.");
                        setTimeout(() => setMessage(null), 2000);
                        return;
                      }
                      // Confirm buy (in demo, just a message + console)
                      console.log("Покупка подтверждена:", { flight: selectedFlight, date: selectedFlightDate });
                      setMessage("Покупка подтверждена (демо). Проверьте консоль.");
                      setTimeout(() => setMessage(null), 3000);
                    }}
                    className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700"
                  >
                    Подтвердить покупку
                  </button>
                  <button
                    onClick={() => {
                      setSelectedFlight(null);
                      setSelectedFlightDate(null);
                      setMessage("Выбор отменен");
                      setTimeout(() => setMessage(null), 1500);
                    }}
                    className="px-3 py-2 border rounded"
                  >
                    Отменить
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-6">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h5 className="font-semibold text-gray-900 mb-2">AviaSite</h5>
              <p className="text-sm text-gray-600">Сервис поиска авиабилетов — сравнение цен и расписаний.</p>
            </div>

            <div>
              <h6 className="font-semibold text-gray-900 mb-2">Помощь</h6>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Как купить билет</li>
                <li>Багаж и нормы</li>
                <li>Возвраты и обмены</li>
              </ul>
            </div>

            <div>
              <h6 className="font-semibold text-gray-900 mb-2">Контакты</h6>
              <div className="text-sm text-gray-600 space-y-1">
                <div>support@aviasite.example</div>
                <div>+998 71 123 45 67</div>
                <div>Узбекистан, Ташкент</div>
              </div>
            </div>
          </div>

          <div className="mt-6 border-t pt-4 text-sm text-gray-500 text-center">© {new Date().getFullYear()} AviaSite. Все права защищены.</div>
        </div>
      </footer>

      {/* Toast message */}
      {message && <div className="fixed right-6 bottom-6 z-50 bg-black text-white px-4 py-2 rounded shadow">{message}</div>}
    </div>
  );
};

export default RouteDetail;
