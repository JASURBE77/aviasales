import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";




const Products = () => {
  const biletlar = [
  {
    id: 1,
    price: "1,95 млн UZS",
    from: "Ташкент",
    to: "Стамбул",
    date: "13 ноя, чт",
    time: "06:50 — 13:05",
    duration: "8 ч в пути / 1 пересадка",
    note: "2ч Анкара",
  },
  {
    id: 2,
    price: "2,10 млн UZS",
    from: "Ташкент",
    to: "Москва",
    date: "15 ноя, сб",
    time: "07:00 — 11:20",
    duration: "4 ч 20 мин, прямой",
    note: "Аэрофлот",
  },
  {
    id: 3,
    price: "1,50 млн UZS",
    from: "Ташкент",
    to: "Дубай",
    date: "20 ноя, чт",
    time: "09:30 — 13:10",
    duration: "3 ч 40 мин, прямой",
    note: "Flydubai",
  },
];
  return (
    <div className=" py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-2 gap-8">
        
        <div className="bg-gradient-to-br from-green-400 to-green-500 rounded-2xl p-6 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h2 className="text-3xl font-extrabold text-white leading-tight">Горячие билеты</h2>
              <p className="text-green-100/90 mt-1">Скоро разберут!</p>
            </div>
            <div className="w-20 h-20 flex items-center justify-center">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="6" width="14" height="10" rx="2" fill="#fff" fillOpacity="0.9" />
                <path d="M1 9h6" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M23 7c-1.5 2-3 2.5-4 2" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          <div className="mt-6 bg-white/90 rounded-xl p-4 shadow-inner">
            <Swiper
              spaceBetween={16}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              loop
            >
              {biletlar.map((t) => (
                <SwiperSlide key={t.id}>
                  <div className="p-3 rounded-lg bg-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold">{t.price}</div>
                        <div className="text-black line-through text-sm">2,24 млн UZS</div>
                      </div>
                      <div className="text-gray-400">❤️</div>
                    </div>

                    <div className="mt-4">
                      <div className="font-semibold">{t.from} — {t.to}</div>
                      <div className="text-sm text-gray-500 mt-2 flex items-center gap-3">
                        <span className="inline-flex items-center gap-2">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M2 12h20" stroke="#3b82f6" strokeWidth="1.6" strokeLinecap="round"/></svg>
                          {t.date}
                        </span>
                        <span>•</span>
                        <span>{t.time}</span>
                      </div>
                      <div className="text-sm text-gray-500 mt-2">{t.duration} <span className="text-gray-400"> • {t.note}</span></div>
                    </div>

                    <div className="mt-4 flex justify-between items-center">
                      <button className="px-4 py-2 rounded-md bg-green-500 text-white font-semibold shadow">Купить</button>
                      <div className="text-sm text-gray-400">Подробнее ➜</div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>


          <div className="mt-6">
            <button className="w-full py-3 rounded-full bg-white/20 text-white font-semibold">Больше жарких билетов</button>
          </div>
        </div>

        {/* Right: Promotional card */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl overflow-hidden shadow-lg">
          <div className="relative h-full">
            <img
              src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=60"
              alt="scenic"
              className="w-full h-64 object-cover brightness-95"
            />
            <div className="p-6">
              <h3 className="text-2xl font-extrabold text-white">Лучшие направления для первого путешествия</h3>
              <p className="text-white/90 mt-3">Подборка направлений для тех, кто летит первый раз.</p>

              <div className="mt-6">
                <button className="bg-white rounded-full px-6 py-3 font-semibold text-black">Узнать</button>
              </div>
            </div>
          </div>
        </div>

        {/* Full width support card */}
        <div className="col-span-2 bg-blue-200 rounded-2xl p-6 flex items-center gap-6 mt-2">
          <div className="flex-1">
            <h4 className="text-2xl font-extrabold text-blue-800">Круглосуточная поддержка Aviasales.uz в Узбекистане</h4>
            <div className="mt-4 inline-flex items-center bg-white rounded-full px-4 py-3 shadow">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="mr-3"><path d="M6 6l4 4-4 4" stroke="#000" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span className="font-semibold text-black">+998 71 230 80 71</span>
            </div>
          </div>

          <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center shadow-inner">
            <div className="text-center">
              <div className="text-3xl"><img src="" alt="" /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
