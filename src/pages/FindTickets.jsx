// import React from 'react'
// import FindTicketSidebar from '../components/FindTicketSidebar'

// const FindTickets = () => {
//   return (
//     <div className='bg-base-200 pt-10 '>
//       <div className="container">
//           <div className=''>
//             <FindTicketSidebar  />
//             <div>
                
//             </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default FindTickets
import React from "react";
import { AlertTriangle, Heart } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import FindTicketSidebar from "../components/FindTicketSidebar";
import { useFetch } from "../hooks/useFetch";
export default function App() {
   const { data, loading, error } = useFetch("http://localhost:3000/flights");
 if (loading) return <p>⏳ Ma'lumot yuklanmoqda...</p>;
  if (error) return <p>❌ Xato: {error.message}</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="container flex justify-between">
                    <FindTicketSidebar />
<div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-start gap-3 w-full max-w-4xl shadow-sm">
        <AlertTriangle className="text-yellow-500 w-6 h-6 flex-shrink-0 mt-1" />    
        <p className="text-sm text-gray-800 leading-tight">
          С 30 июня 2025 года немного изменятся правила въезда в Россию для
          иностранцев. Почитайте детали, чтобы на погранконтроле не было
          сюрпризов
        </p>
        <button className="ml-auto text-sm font-medium text-blue-600 hover:underline whitespace-nowrap">
          Узнать подробности
        </button>
      </div>

      {/* Cheapest tickets */}
      <div className="bg-white rounded-2xl mt-6 p-6 w-full max-w-4xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">
          Самые дешёвые билеты
        </h2>

        <Swiper
          spaceBetween={16}
          slidesPerView={"auto"}
          className="overflow-visible"
        >
          {data.map((ticket) => (
            <SwiperSlide
              key={ticket.id}
              className="!w-64 bg-gray-50 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between"
            >
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <p className="text-lg font-semibold text-gray-900">
                    {ticket.price}
                  </p>
                  <button>
                    <Heart
                      size={18}
                      className="text-gray-400 hover:text-red-500"
                    />
                  </button>
                </div>

              <div className="flex items-center gap-5">
                  <div className="mt-3 flex items-center gap-2">
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
</div>
        </div>
    </div>
  );
}
