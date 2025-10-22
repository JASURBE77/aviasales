
// import React, {useState} from "react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";
// import { AlertTriangle, Heart } from "lucide-react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import FindTicketSidebar from "../components/FindTicketSidebar";
// import { useFetch } from "../hooks/useFetch";
// ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// export default function App() {
//   const [selectedDate, setSelectedDate] = useState("21 октября");
//    const { data, loading, error } = useFetch("http://localhost:3000/flights");
//  if (loading) return <p>⏳ Ma'lumot yuklanmoqda...</p>;
//   if (error) return <p>❌ Xato: {error.message}</p>;

//   return (
//     <div className="min-h-screen bg-gray-50 py-10 px-4">
//         <div className="container flex justify-between">
//                     <FindTicketSidebar />
// <div>
//           <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-start gap-3 w-full max-w-4xl shadow-sm">
//         <AlertTriangle className="text-yellow-500 w-6 h-6 flex-shrink-0 mt-1" />    
//         <p className="text-sm text-gray-800 leading-tight">
//           С 30 июня 2025 года немного изменятся правила въезда в Россию для
//           иностранцев. Почитайте детали, чтобы на погранконтроле не было
//           сюрпризов
//         </p>
//         <button className="ml-auto text-sm font-medium text-blue-600 hover:underline whitespace-nowrap">
//           Узнать подробности
//         </button>
//       </div>

//       {/* Cheapest tickets */}
//       <div className="bg-white rounded-2xl mt-6 p-6 w-full max-w-4xl shadow-sm">
//         <h2 className="text-xl font-semibold mb-4 text-gray-900">
//           Самые дешёвые билеты
//         </h2>

//         <Swiper
//           spaceBetween={16}
//           slidesPerView={"auto"}
//           className="overflow-visible"
//         >
//           {data.map((ticket) => (
//             <SwiperSlide
//               key={ticket.id}
//               className="!w-64 bg-gray-50 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between"
//             >
//               <div className="p-4">
//                 <div className="flex justify-between items-start">
//                   <p className="text-lg font-semibold text-gray-900">
//                     {ticket.price}
//                   </p>
//                   <button>
//                     <Heart
//                       size={18}
//                       className="text-gray-400 hover:text-red-500"
//                     />
//                   </button>
//                 </div>

//               <div className="flex items-center gap-5">
//                   <div className="mt-3 flex items-center gap-2">
//                   <div className="bg-blue-500 w-3 h-3 rounded-full"></div>
//                   <p className="text-xs text-gray-600">{ticket.date}</p>
//                 </div>
//                 <div className="flex flex-wrap gap-1 items-center">
//                 <p className="text-sm text-gray-600 mt-1">{ticket.time}</p>
//                 <p className="text-xs text-gray-500 mt-2">{ticket.from}</p>
//                 <p className="text-xs text-gray-400">{ticket.to}</p>
//                 </div>
//               </div>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
// </div>

//         </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { AlertTriangle, Heart } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import FindTicketSidebar from "../components/FindTicketSidebar";
import { useFetch } from "../hooks/useFetch";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function FindTickets() {
  const [selectedDate, setSelectedDate] = useState("21 октября");
  const { data, loading, error } = useFetch("http://localhost:3000/flights");

  if (loading) return <p>⏳ Ma'lumot yuklanmoqda...</p>;
  if (error) return <p>❌ Xato: {error.message}</p>;

  // 🔹 Chart ma'lumotlari
  const labels = [
    "20 пн", "21 вт", "22 ср", "23 чт", "24 пт", "25 сб", "26 вс",
    "27 пн", "28 вт", "29 ср", "30 чт", "31 пт", "1 сб", "2 вс"
  ];

  const prices = [
    1.44, 1.44, 1.45, 1.5, 1.55, 1.52, 1.48, 1.49, 1.47, 1.44, 1.6, 1.57, 1.53, 1.59,
  ];

  const chartData = {
    labels,
    datasets: [
      {
        label: "Цена (млн UZS)",
        data: prices,
        backgroundColor: labels.map((label) =>
          ["21 вт", "22 ср", "23 чт", "28 вт"].includes(label)
            ? "#22c55e"
            : "#e5e7eb"
        ),
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `от ${ctx.formattedValue} млн UZS`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#6b7280", font: { size: 12 } },
      },
      y: { display: false },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="container mx-auto flex flex-col md:flex-row gap-6 justify-between">
        {/* Sidebar */}
        <FindTicketSidebar />

        <div className="flex-1">
          {/* 🔸 Eslatma */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-start gap-3 w-full max-w-4xl shadow-sm">
            <AlertTriangle className="text-yellow-500 w-6 h-6 flex-shrink-0 mt-1" />
            <p className="text-sm text-gray-800 leading-tight">
              С 30 июня 2025 года немного изменятся правила въезда в Россию для
              иностранцев. Почитайте детали, чтобы на погранконтроле не было сюрпризов.
            </p>
            <button className="ml-auto text-sm font-medium text-blue-600 hover:underline whitespace-nowrap">
              Узнать подробности
            </button>
          </div>
            <div className="bg-white rounded-2xl mt-6 p-6 w-full max-w-4xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              Самые дешёвые билеты
            </h2>

            <Swiper spaceBetween={16} slidesPerView={"auto"} className="overflow-visible">
              {data.map((ticket) => (
                <SwiperSlide
                  key={ticket.id}
                  className="!w-64 bg-gray-50 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between"
                >
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <p className="text-lg font-semibold text-gray-900">{ticket.price}</p>
                      <button>
                        <Heart size={18} className="text-gray-400 hover:text-red-500" />
                      </button>
                    </div>

                    <div className="flex items-center gap-5 mt-3">
                      <div className="flex items-center gap-2">
                        <div className="bg-blue-500 w-3 h-3 rounded-full"></div>
                        <p className="text-xs text-gray-600">{ticket.date}</p>
                      </div>
                      <div className="flex flex-wrap gap-1 items-center">
                        <p className="text-sm text-gray-600 mt-1">{ticket.time}</p>
                        <p className="text-xs text-gray-500 mt-2">{ticket.from}</p>
                        <p className="text-xs text-gray-400">{ticket.to}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* 🔹 Chart bo‘limi */}
          <div className="bg-white rounded-2xl  shadow-sm p-6 mt-6 w-full max-w-4xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">График цен</h2>
              <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-full text-sm">
                <button className="px-3 py-1 rounded-full bg-white text-gray-900 shadow">
                  В одну сторону
                </button>
                <button className="px-3 py-1 text-gray-500">Туда-обратно</button>
              </div>
            </div>
            <Bar data={chartData} options={chartOptions} />
            <div className="text-center mt-6">
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium px-6 py-2 rounded-xl">
                Выбрать {selectedDate}
              </button>
            </div>
          </div>

          {/* 🔹 Cheapest tickets */}
        
        </div>
      </div>
    </div>
  );
}
