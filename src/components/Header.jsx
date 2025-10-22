// import React, { useState } from "react";
// import {
//   User,
//   BookOpen,
//   HelpCircle,
//   Globe,
//   Plane,
//   Bed,
//   MapPin,
//   Heart,
//   Calendar,
// } from "lucide-react";

// export default function Header() {
//   const [activeTab, setActiveTab] = useState("aviabilety");
//   const [language, setLanguage] = useState("RU");
//   const [showLangMenu, setShowLangMenu] = useState(false);

//   const translations = {
//     RU: {
//       title: "Тут покупают дешёвые авиабилеты",
//       tabs: {
//         aviabilety: "Авиабилеты",
//         oteli: "Отели",
//         uyobuyo: "Uyo-buyo",
//         izbrannoe: "Избранное",
//       },
//       nav: {
//         profile: "Профиль",
//         yolovchi: "Yo'lovchi",
//         help: "Поддержка",
//       },
//       button: "Найти билеты",
//       route: "Составить сложный маршрут",
//       booking: "Открыть Booking.com в новой вкладке",
//     },
//     UZ: {
//       title: "Arzon aviachiptalar shu yerda sotiladi",
//       tabs: {
//         aviabilety: "Aviachiptalar",
//         oteli: "Mehmonxonalar",
//         uyobuyo: "Uyo-buyo",
//         izbrannoe: "Sevimlilar",
//       },
//       nav: {
//         profile: "Profil",
//         yolovchi: "Yo'lovchi",
//         help: "Yordam",
//       },
//       button: "Chipta topish",
//       route: "Murakkab marshrut tuzish",
//       booking: "Booking.com saytini yangi oynada ochish",
//     },
//   };

//   const t = translations[language];

//   return (
//     <div className="min-h-screen bg-[#007BFF] text-white font-sans relative">
//       {/* HEADER */}
//       <header className="flex justify-between items-center px-10 py-4 relative">
//         {/* LOGO */}
//         <div className="flex items-center gap-2">
//           <img
//             src="https://upload.wikimedia.org/wikipedia/commons/2/20/Aviasales_logo.svg"
//             alt="aviasales"
//             className="h-7"
//           />
//         </div>

//         {/* NAVIGATION */}
//         <nav className="flex items-center gap-6 text-sm font-medium relative">
//           {[
//             { icon: <User size={16} />, label: t.nav.profile },
//             { icon: <BookOpen size={16} />, label: t.nav.yolovchi },
//             { icon: <HelpCircle size={16} />, label: t.nav.help },
//           ].map((item, i) => (
//             <div
//               key={i}
//               className="flex items-center gap-1 px-3 py-2 rounded-xl cursor-pointer transition hover:bg-white hover:text-[#007BFF]"
//             >
//               {item.icon}
//               <span>{item.label}</span>
//             </div>
//           ))}

//           {/* LANGUAGE SWITCHER */}
//           <div
//             className="flex items-center gap-1 px-3 py-2 rounded-xl cursor-pointer transition hover:bg-white hover:text-[#007BFF] relative"
//             onClick={() => setShowLangMenu(!showLangMenu)}
//           >
//             <Globe size={16} />
//             <span>UZS · {language}</span>

//             {showLangMenu && (
//               <div className="absolute top-10 right-0 bg-white text-[#007BFF] rounded-xl shadow-lg overflow-hidden z-10">
//                 <button
//                   onClick={() => {
//                     setLanguage("RU");
//                     setShowLangMenu(false);
//                   }}
//                   className="block w-full px-4 py-2 text-left hover:bg-[#007BFF] hover:text-white transition"
//                 >
//                   🇷🇺 Русский
//                 </button>
//                 <button
//                   onClick={() => {
//                     setLanguage("UZ");
//                     setShowLangMenu(false);
//                   }}
//                   className="block w-full px-4 py-2 text-left hover:bg-[#007BFF] hover:text-white transition"
//                 >
//                   🇺🇿 O‘zbekcha
//                 </button>
//               </div>
//             )}
//           </div>
//         </nav>
//       </header>

//       {/* TITLE */}
//       <div className="text-center mt-10">
//         <h1 className="text-4xl md:text-5xl font-extrabold">{t.title}</h1>
//       </div>

//       {/* NAVIGATION TABS */}
//       <div className="flex justify-center mt-8">
//         <div className="flex bg-[#005FE6] rounded-2xl overflow-hidden shadow-lg p-1">
//           {[
//             { id: "aviabilety", icon: <Plane size={18} />, label: t.tabs.aviabilety },
//             { id: "oteli", icon: <Bed size={18} />, label: t.tabs.oteli },
//             { id: "uyobuyo", icon: <MapPin size={18} />, label: t.tabs.uyobuyo },
//             { id: "izbrannoe", icon: <Heart size={18} />, label: t.tabs.izbrannoe },
//           ].map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`flex items-center gap-2 font-semibold px-8 py-3 rounded-xl transition ${
//                 activeTab === tab.id
//                   ? "bg-[#005FE6] text-white hover:bg-white hover:text-[#005FE6]"
//                   : "text-white/80 hover:bg-white hover:text-[#005FE6]"
//               }`}
//             >
//               {tab.icon} {tab.label}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* SEARCH PANEL + BUTTON */}
//       <div className="flex justify-center mt-10 px-4">
//         <div className="flex items-center bg-white rounded-2xl shadow-2xl overflow-hidden max-w-6xl w-full">
//           <input
//             type="text"
//             placeholder="Ташкент"
//             className="flex-1 p-5 border-none focus:outline-none text-gray-800 text-lg"
//           />
//           <input
//             type="text"
//             placeholder="Куда"
//             className="flex-1 p-5 border-l border-gray-200 focus:outline-none text-gray-800 text-lg"
//           />
//           <div className="flex items-center flex-1 border-l border-gray-200">
//             <input
//               type="text"
//               placeholder="Когда"
//               className="flex-1 p-5 focus:outline-none text-gray-800 text-lg"
//             />
//             <Calendar size={22} className="text-gray-400 mr-4" />
//           </div>
//           <div className="flex items-center flex-1 border-l border-gray-200">
//             <input
//               type="text"
//               placeholder="Обратно"
//               className="flex-1 p-5 focus:outline-none text-gray-800 text-lg"
//             />
//             <Calendar size={22} className="text-gray-400 mr-4" />
//           </div>
//           <select className="flex-1 p-5 border-l border-gray-200 focus:outline-none text-gray-800 text-lg">
//             <option>1 пассажир — Эконом</option>
//             <option>2 пассажира — Эконом</option>
//             <option>1 пассажир — Бизнес</option>
//           </select>
//         </div>

//         {/* BUTTON */}
//         <button className="ml-4 bg-[#FF6B00] hover:bg-[#e75f00] text-white font-semibold px-10 py-5 text-xl rounded-2xl shadow-lg transition">
//           {t.button}
//         </button>
//       </div>

//       {/* UNDER PANEL OPTIONS */}
//       <div className="flex justify-between items-center mt-6 w-full max-w-6xl mx-auto text-sm text-white/90 px-2">
//         <div className="flex items-center gap-2 cursor-pointer hover:text-white transition">
//           <span className="text-lg">🔗</span>
//           <span>{t.route}</span>
//         </div>

//         <div className="flex items-center gap-2 px-4 py-2 rounded-xl cursor-pointer transition bg-transparent hover:bg-white hover:text-[#007BFF]">
//           <input
//             type="checkbox"
//             defaultChecked
//             className="accent-[#007BFF] w-5 h-5"
//           />
//           <label className="cursor-pointer select-none">{t.booking}</label>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import { User, BookOpen, HelpCircle, Globe, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

export default function App() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!from || !to) {
      alert("Iltimos, 'Qayerdan' va 'Qayerga' maydonlarini to‘ldiring!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/flights");
      let data = await res.json();

      // Filtrlash (katta-kichik harf farqsiz)
      data = data.filter(
        (f) =>
          f.from.toLowerCase().includes(from.toLowerCase()) &&
          f.to.toLowerCase().includes(to.toLowerCase())
      );

      if (date) {
        const exact = data.filter((f) => f.date === date);
        if (exact.length > 0) data = exact;
        else {
          const target = new Date(date);
          data = data
            .map((f) => ({
              ...f,
              diff: Math.abs(new Date(f.date) - target),
            }))
            .sort((a, b) => a.diff - b.diff)
            .slice(0, 3);
        }
      }

      setFlights(data);
    } catch (err) {
      console.error("Xato:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" bg-[#007BFF] text-white py-5 font-sans relative">
      <header className="flex justify-between items-center px-10 py-4">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/2/20/Aviasales_logo.svg"
          alt="aviasales"
          className="h-7"
        />
        <nav className="flex items-center gap-6 text-sm font-medium">
         <Link to={'/login'}>
          <div className="flex items-center gap-1 px-3 py-2 rounded-xl cursor-pointer hover:bg-white hover:text-[#007BFF]">
            <User size={16} /> Profil
          </div>
         </Link>
          <div className="flex items-center gap-1 px-3 py-2 rounded-xl cursor-pointer hover:bg-white hover:text-[#007BFF]">
            <BookOpen size={16} /> Yo‘lovchi
          </div>
          <div className="flex items-center gap-1 px-3 py-2 rounded-xl cursor-pointer hover:bg-white hover:text-[#007BFF]">
            <HelpCircle size={16} /> Yordam
          </div>
          <div className="flex items-center gap-1 px-3 py-2 rounded-xl cursor-pointer hover:bg-white hover:text-[#007BFF]">
            <Globe size={16} /> UZS · UZ
          </div>
        </nav>
      </header>

      {/* TITLE */}
      <div className="text-center mt-10">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          Arzon aviachiptalar shu yerda sotiladi
        </h1>
      </div>

      {/* SEARCH PANEL */}
      <div className="flex justify-center mt-10 px-4">
        <div className="flex items-center bg-white rounded-2xl shadow-2xl overflow-hidden max-w-6xl w-full">
          <input
            type="text"
            placeholder="Qayerdan"
            className="flex-1 p-5 text-gray-800 text-lg"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
          <input
            type="text"
            placeholder="Qayerga"
            className="flex-1 p-5 border-l border-gray-200 text-gray-800 text-lg"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
          <div className="flex items-center flex-1 border-l border-gray-200">
            <input
              type="date"
              className="flex-1 p-5 text-gray-800 text-lg"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <Calendar size={22} className="text-gray-400 mr-4" />
          </div>
        </div>

        <button
          onClick={handleSearch}
          className="ml-4 bg-[#FF6B00] hover:bg-[#e75f00] text-white font-semibold px-10 py-5 text-xl rounded-2xl shadow-lg transition"
        >
          Chipta topish
        </button>
      </div>

      {/* RESULTS */}
      <div className="mt-3 ml-80 flex flex-col items-center">
        {loading ? (
          <p>🔄 Yuklanmoqda...</p>
        ) : flights.length > 0 ? (
          <ul className="flex flex-col gap-4 w-full max-w-4xl">
            {flights.slice(0, 3).map((f) => (
            <li key={f.id} className="bg-white w-100 flex items-center justify-evenly text-black p-4 rounded-xl">  <img  src={f.image}  alt={f.to}  className="w-20 object-cover rounded-lg mb-3" /> <div>  <h2 className="text-lg font-bold">  {f.from} ✈ {f.to}  </h2>  <p>  Sana: {f.date} <br /> </p>  <p className="text-[#007BFF] font-bold mt-1"> {f.price.toLocaleString()} so‘m  </p>  </div> 
             </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-lg mt-4">
            Hech qanday reys topilmadi 😔
          </p>
        )}
      </div>
    </div>
  );
}

