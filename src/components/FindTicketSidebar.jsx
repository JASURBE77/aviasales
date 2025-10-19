import React from 'react'
import { LuPlane } from "react-icons/lu";
import { LuCalendarClock } from "react-icons/lu";
import { IoStatsChart } from "react-icons/io5";
const FindTicketSidebar = () => {
  return (
   <div  className='flex flex-col gap-5'>
     <div className='bg-white py-5  w-80 pl-5 flex flex-col rounded-3xl justify-center gap-3'>
            <span className='text-3xl font-bold'>Ташкент — Санкт-<br /> Петербург</span>
        <div className='flex flex-col gap-2'>
      <div className='flex items-center gap-5 hover:bg-gray-100  w-[250px] py-3 px-3 rounded-2xl transition-all  '>
        <div className='bg-green-400 text-white rounded-full h-10 flex items-center justify-center w-10'>
            <LuPlane className='text-[19px]' />
        </div>
        <span className='w-30'>Самые дешёвые билеты</span>
      </div>
         <div className='flex items-center gap-5 hover:bg-gray-100  w-[250px] py-3 px-3 rounded-2xl transition-all  '>
        <div className='bg-blue-400 text-white rounded-full h-10 flex items-center justify-center w-10'>
            <LuPlane className='text-[19px]' />
        </div>
        <span className='w-30'>График цен</span>
      </div>
         <div className='flex items-center gap-5 hover:bg-gray-100  w-[250px] py-3 px-3 rounded-2xl transition-all  '>
        <div className='bg-primary text-white rounded-full h-10 flex items-center justify-center w-10'>
            <IoStatsChart   className='text-[19px]' />
        </div>
        <span className='w-30'>Расписание прямых рейсов</span>
      </div>    
        </div>
    </div>
     <div className="w-80 rounded-2xl overflow-hidden shadow-md">
      {/* Upper gradient section */}
      <div className="bg-gradient-to-r from-orange-500 to-yellow-400 p-4 flex justify-between items-start">
        <p className="text-white font-semibold text-sm leading-tight">
          Чем заняться <br /> в Санкт-Петербурге
        </p>
        <span className="text-white text-2xl">👀</span>
      </div>

      {/* Lower white section */}
      <div className="bg-white flex items-center gap-2 p-4">
        <span className="text-orange-500 text-xl">🔥</span>
        <p className="font-medium text-gray-800 text-sm">Любопытные места</p>
      </div>
    </div>
   </div>
  )
}

export default FindTicketSidebar