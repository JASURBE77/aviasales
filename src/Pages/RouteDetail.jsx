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

const RouteDetail = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const flightRoute = searchParams.get("flight");

  const [route, setRoute] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const [selectedOrigin, setSelectedOrigin] = useState(null);
  const [flightsFromOrigin, setFlightsFromOrigin] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [selectedFlightDate, setSelectedFlightDate] = useState(null);
  const [datePickerFor, setDatePickerFor] = useState(null);
  const [message, setMessage] = useState(null);

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

  const parsePrice = (p) => {
    if (!p) return 0;
    const digits = String(p).replace(/[^\d]/g, "");
    return digits ? Number(digits) : 0;
  };

  const airlinesList = useMemo(() => {
    if (!route) return [];
    const set = new Set(route.flights?.map((f) => f.airline).filter(Boolean));
    return Array.from(set);
  }, [route]);

  const currentFlight =
    route?.flights?.find((f) => f.route === flightRoute) ||
    route?.flights?.[0] ||
    null;

  const flightsAfterApply = useMemo(() => {
    if (!route?.flights) return [];

    const { searchQuery: sq, selectedAirlines: sAir, onlyDirect: od, priceRange: pr } =
      appliedFilters;

    let fl = [...route.flights];

    if (sq) {
      const q = sq.toLowerCase();
      fl = fl.filter(
        (f) =>
          f.route?.toLowerCase().includes(q) ||
          f.airline?.toLowerCase().includes(q) ||
          String(f.price || "").includes(q)
      );
    }

    if (sAir.length > 0) {
      fl = fl.filter((f) => sAir.includes(f.airline));
    }

    if (od) {
      fl = fl.filter((f) => f.direct === true || f.direct === "true");
    }

    fl = fl.filter((f) => {
      const p = parsePrice(f.price);
      return p >= pr[0] && p <= pr[1];
    });

    return fl;
  }, [route, appliedFilters]);

  const applyFilters = () => {
    setAppliedFilters({
      searchQuery,
      selectedAirlines,
      onlyDirect,
      priceRange,
    });
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
  };

  const toggleAirline = (name) => {
    setSelectedAirlines((prev) =>
      prev.includes(name)
        ? prev.filter((a) => a !== name)
        : [...prev, name]
    );
  };

  const handleOriginClick = (origin) => {
    setSelectedOrigin(origin);
    const matches = route.flights.filter((f) => {
      const [from] = f.route.split(" — ");
      return from.trim() === origin;
    });
    setFlightsFromOrigin(matches);
  };

  const handleBuy = (flight) => {
    setSelectedFlight(flight);
  };

  const handleSelectDates = (flight) => {
    setDatePickerFor(flight.id || flight.route);
  };

  const confirmDateSelection = (flight, date) => {
    setSelectedFlight(flight);
    setSelectedFlightDate(date);
    setDatePickerFor(null);
  };

  const formatPrice = (p) => {
    const num = parsePrice(p);
    return new Intl.NumberFormat().format(num) + " сум";
  };

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        Юкланмоқда...
      </div>
    );

  if (error || !route)
    return (
      <div className="min-h-screen flex justify-center items-center text-red-600">
        Хатолик: {error}
      </div>
    );

  const displayTitle = currentFlight?.route || `${route.city} - ${route.country}`;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <h1 className="text-2xl font-bold mb-4">{displayTitle}</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left: Filters */}
        <aside className="md:w-1/4 bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold mb-2">Фильтры</h3>
          <label className="flex items-center gap-2 mb-3">
            <input
              type="checkbox"
              checked={onlyDirect}
              onChange={(e) => setOnlyDirect(e.target.checked)}
            />
            <span>Только прямые</span>
          </label>
          <div>
            <button
              onClick={applyFilters}
              className="bg-blue-600 text-white px-3 py-2 rounded w-full mb-2"
            >
              Применить
            </button>
            <button
              onClick={resetFilters}
              className="border px-3 py-2 rounded w-full"
            >
              Сбросить
            </button>
          </div>
        </aside>

        {/* Right: Flights */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-4">Рейсы</h2>
          {flightsAfterApply.length === 0 ? (
            <p>Нет подходящих рейсов</p>
          ) : (
            <div className="grid gap-4">
              {flightsAfterApply.map((f) => (
                <div
                  key={f.id}
                  className="p-4 bg-white rounded-xl shadow flex justify-between"
                >
                  <div>
                    <div className="font-semibold">{f.route}</div>
                    <div className="text-sm text-gray-600">{f.airline}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{formatPrice(f.price)}</div>
                    <button
                      onClick={() => handleBuy(f)}
                      className="bg-blue-600 text-white px-3 py-1 mt-2 rounded"
                    >
                      Купить
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RouteDetail;
