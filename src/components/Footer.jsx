import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // 🔹 qo‘shildi
import {
  FaTelegram,
  FaInstagram,
  FaFacebook,
  FaPhoneAlt,
  FaVk,
  FaOdnoklassniki,
} from "react-icons/fa";
import { IoChevronDown, IoHeart } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { TbAffiliate, TbBook } from "react-icons/tb";

const Footer = () => {
  const [routes, setRoutes] = useState([]);
  const [openId, setOpenId] = useState(null);
  const navigate = useNavigate(); // 🔹 navigate funksiyasi

  useEffect(() => {
    fetch("http://localhost:3001/popular_routes")
      .then((res) => res.json())
      .then((data) => setRoutes(data))
      .catch((err) => console.error("Xatolik:", err));
  }, []);

  // 🔹 Route bosilganda o‘tish funksiyasi
  const handleRouteClick = (id) => {
    navigate(`/about/${id}`);
  };

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 text-gray-700 mt-20 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-xl font-semibold mb-6 text-gray-900">
          Популярные направления
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {routes.map((route) => (
            <div
              key={route.id}
              className="transition-all duration-300"
            >
              <div
                onClick={() =>
                  setOpenId(openId === route.id ? null : route.id)
                }
                className="flex justify-between items-center bg-gray-100 hover:bg-gray-200 rounded-xl py-3 px-4 cursor-pointer shadow-sm hover:shadow-md transition-all"
              >
                <span>
                  <span className="font-medium text-gray-900">
                    {route.city}
                  </span>{" "}
                  <span className="text-gray-500">{route.country}</span>
                </span>
                <IoChevronDown
                  className={`text-gray-400 transition-transform duration-300 ${
                    openId === route.id ? "rotate-180" : ""
                  }`}
                />
              </div>

              {openId === route.id && (
                <div className="bg-white shadow-sm rounded-xl mt-2 p-3 border border-gray-100 transition-all duration-300">
                  {route.flights.map((f, i) => (
                    <div
                      key={i}
                      onClick={() => handleRouteClick(route.id)} // 🔹 shu joyda o‘tish
                      className="flex justify-between py-2 border-b border-gray-100 last:border-none cursor-pointer hover:bg-gray-50"
                    >
                      <span className="text-gray-800">{f.route}</span>
                      <span className="text-gray-600">{f.price}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
            <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
          <div>
            <h3 className="font-semibold mb-3 text-gray-900">Авиакомпании</h3>
            <ul className="space-y-2">
              <li>Air Samarkand</li>
              <li>Победа</li>
              <li>Россия</li>
              <li>Азимут</li>
              <li>Қанот Шарқ</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-gray-900">Направления</h3>
            <ul className="space-y-2">
              <li>Ургенч — Ташкент</li>
              <li>Ташкент — Бухара</li>
              <li>Термез — Ташкент</li>
              <li>Бухара — Ташкент</li>
              <li>Ташкент — Самарканд</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-gray-900">Города</h3>
            <ul className="space-y-2">
              <li>Ташкент</li>
              <li>Москва</li>
              <li>Белен</li>
              <li>Наманган</li>
              <li>Ещё 5 городов</li>
            </ul>
          </div>


<div>
            <h3 className="font-semibold mb-3 text-gray-900">Аэропорты</h3>
            <ul className="space-y-2">
              <li>Жуковский</li>
              <li>Ташкент</li>
              <li>Самарканд</li>
              <li>Наманган</li>
              <li>Внуково</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-gray-900">
              Aviasales в мире
            </h3>
            <ul className="space-y-2">
              <li>Беларусь</li>
              <li>Россия</li>
              <li>Таджикистан</li>
              <li>Кыргызстан</li>
              <li>Казахстан</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ==== Yangi qo‘shimcha pastki qism (rasmdan olingan) ==== */}
      <div className="border-t border-gray-200 py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 items-start">
          {/* Logo va tarmoqlar */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <img
                src="https://programmy-na-android.ru/images/aviasales-cover-150x150.png"
                alt="logo"
                className="h-8"
              />
              <p className="font-medium text-gray-900 text-lg">Aviasales</p>
            </div>
            <p className="text-sm text-gray-600">© 2007–2025</p>
            <div className="flex gap-3 mt-4 text-xl text-gray-500">
              <FaVk className="hover:text-blue-600 cursor-pointer" />
              <FaFacebook className="hover:text-blue-700 cursor-pointer" />
              <FaInstagram className="hover:text-pink-500 cursor-pointer" />
              <FaTelegram className="hover:text-sky-500 cursor-pointer" />
              <FaOdnoklassniki className="hover:text-orange-500 cursor-pointer" />
              <FaPhoneAlt className="hover:text-green-500 cursor-pointer" />
            </div>
          </div>

          {/* Aviasales haqida */}
          <div className="space-y-3">
            <p className="font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
              Об Aviasales
            </p>
            <p className="font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
              Пресс-центр
            </p>
          </div>

          {/* Partner va media */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <TbAffiliate className="text-2xl text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">Travelpayouts</p>
                <p className="text-sm text-gray-500">Партнёрская программа</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <TbBook className="text-2xl text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">Медиа Yo’lovchi</p>
                <p className="text-sm text-gray-500">
                  Трэвел-медиа Aviasales.uz
                </p>
              </div>
            </div>
          </div>

{/* Email va App (QR joyiga qo‘shilgan) */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <IoHeart className="text-red-500 text-2xl" />
              <p className="font-semibold text-gray-900">Лайфхаки и билеты</p>
            </div>
            <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden">
              <MdEmail className="ml-3 text-gray-500 text-lg" />
              <input
                type="email"
                placeholder="На какую почту слать письма"
                className="bg-transparent px-3 py-2 w-full text-sm focus:outline-none"
              />
            </div>
            <div className="bg-gray-100 p-3 rounded-lg flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">
                  В приложении тоже удобно
                </p>
                <p className="text-xs text-gray-500">
                  Если цена на билет упадёт, сразу пришлём уведомление
                </p>
              </div>
              <a
                href="https://aviasales.onelink.me/4159769142/web2app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://static.aviasales.com/selene-static/spa/d8615177ac876a83.png"
                  alt="QR Code"
                  className="h-20 w-20 object-contain"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Kukilar haqida */}
      <div className="border-t border-gray-200 py-6 text-center text-sm text-gray-600">
        Мы используем{" "}
        <span className="text-blue-500 cursor-pointer">куки</span> и аналогичные
        технологии — без них Aviasales просто не сможет нормально работать.
      </div>

      {/* ... pastdagi qolgan kod o‘zgarmaydi ... */}
    </footer>
  );
};

export default Footer;