import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function TicketsMap() {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersLayerRef = useRef(null);

  const countries = [
    {
      flag: "https://flagcdn.com/w40/uz.png",
      name: "Узбекистан",
      price: "от 238 567 UZS",
      dirs: 12,
    },
    {
      flag: "https://flagcdn.com/w40/tj.png",
      name: "Таджикистан",
      price: "от 579 507 UZS",
      dirs: 3,
    },
    {
      flag: "https://flagcdn.com/w40/kz.png",
      name: "Казахстан",
      price: "от 669 737 UZS",
      dirs: 16,
    },
    {
      flag: "https://flagcdn.com/w40/kg.png",
      name: "Киргизстан",
      price: "от 744 103 UZS",
      dirs: 2,
    },
    {
      flag: "https://flagcdn.com/w40/ru.png",
      name: "Россия",
      price: "от 977 954 UZS",
      dirs: 77,
    },
    {
      flag: "https://flagcdn.com/w40/in.png",
      name: "Индия",
      price: "от 1,27 млн UZS",
      dirs: 19,
    },
    {
      flag: "https://flagcdn.com/w40/ae.png",
      name: "ОАЭ",
      price: "от 1,41 млн UZS",
      dirs: 6,
    },
    {
      flag: "https://flagcdn.com/w40/gb.png",
      name: "Великобритания",
      price: "от 1,97 млн UZS",
      dirs: 8,
    },
  ];

  const markers = [
    { name: "Москва", price: "от 977 954 UZS", coords: [55.7558, 37.6173] },
    { name: "Анкара", price: "от 1,52 млн UZS", coords: [39.93, 32.85] },
    { name: "Лондон", price: "от 1,97 млн UZS", coords: [51.5072, -0.1276] },
    { name: "Барселона", price: "от 2,61 млн UZS", coords: [41.3851, 2.1734] },
    { name: "Дубай", price: "от 1,41 млн UZS", coords: [25.276987, 55.296249] },
    { name: "Токио", price: "от 2,85 млн UZS", coords: [35.6764, 139.65] },
    { name: "Париж", price: "от 2,45 млн UZS", coords: [48.8566, 2.3522] },
    { name: "Нью-Йорк", price: "от 3,12 млн UZS", coords: [40.7128, -74.006] },
  ];

  useEffect(() => {
    if (!mapRef.current && mapContainerRef.current) {
      mapRef.current = L.map(mapContainerRef.current, {
        center: [40.5, 55],
        zoom: 4,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);

      markersLayerRef.current = L.layerGroup().addTo(mapRef.current);

      markers.forEach((m) => {
        L.marker(m.coords)
          .addTo(markersLayerRef.current)
          .bindPopup(`<b>${m.name}</b><br>${m.price}`);
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markersLayerRef.current = null;
      }
    };
  }, []);

  const onCountryClick = (index) => {
    const m = markers[index % markers.length];
    if (m && mapRef.current) {
      mapRef.current.setView(m.coords, 6, { animate: true });
      markersLayerRef.current.eachLayer((layer) => {
        const latlng = layer.getLatLng();
        if (latlng.lat === m.coords[0] && latlng.lng === m.coords[1]) {
          layer.openPopup();
        }
      });
    }
  };

  return (
    <div className="container mx-auto px-6">
      <div className="flex h-screen bg-gray-50 mt-20 gap-6">
        {/* Левая часть */}
        <div className="w-[420px] bg-white shadow-xl border border-gray-200 flex flex-col rounded-2xl overflow-hidden">
          <div className="p-6 border-b bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
            <h2 className="text-xl font-bold tracking-wide mb-1">🌍 Все страны</h2>
            <p className="text-sm text-blue-100">Выбери страну, чтобы увидеть рейсы</p>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4 bg-gray-50">
            {countries.map((c, i) => (
              <div
                key={i}
                onClick={() => onCountryClick(i)}
                className="flex items-center justify-between bg-white rounded-2xl px-4 py-3 shadow hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer"
              >
                <div className="flex items-center space-x-3 overflow-hidden">
                  <img
                    src={c.flag}
                    alt={c.name}
                    className="w-7 h-5 rounded-sm border object-cover"
                  />
                  <div className="flex flex-col leading-tight">
                    <h3 className="text-[15px] font-medium text-gray-800 truncate w-32">
                      {c.name}
                    </h3>
                    <p className="text-[12px] text-gray-500">{c.dirs} направлений</p>
                  </div>
                </div>
                <div className="text-[13px] text-gray-700 font-semibold whitespace-nowrap">
                  {c.price}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 text-center text-sm text-gray-600 border-t bg-white">
            🧭 Нажми на страну, чтобы увидеть метку на карте.
          </div>
        </div>

        {/* Правая часть — карта */}
        <div className="flex-1 relative rounded-2xl overflow-hidden shadow-lg">
          <div
            ref={mapContainerRef}
            id="map"
            className="w-full h-full"
            style={{ minHeight: 400 }}
          ></div>
        </div>
      </div>
    </div>
  );
}
