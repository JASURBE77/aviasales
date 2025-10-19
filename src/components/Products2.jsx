import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Products2() {
  const [index, setIndex] = useState(0);

  const photos = [
    "https://images.unsplash.com/photo-1505761671935-60b3a7427bad",
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
    "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92",
    "https://images.unsplash.com/photo-1526772662000-3f88f10405ff",
    "https://images.unsplash.com/photo-1549887534-3db1bd59dcca",
    "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad",
    "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
    "https://images.unsplash.com/photo-1508057198894-247b23fe5ade",
    "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843",
   
  ];

  const next = () => setIndex((prev) => (prev + 1) % photos.length);
  const prev = () => setIndex((prev) => (prev - 1 + photos.length) % photos.length);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-10 space-y-10">
      {/* --- Yuqori ikki kartochka --- */}
      <div className="flex flex-wrap justify-center gap-10">
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden w-80 transform transition duration-300 hover:scale-105 hover:shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?auto=format&fit=crop&w=800&q=80"
            alt="Swings"
            className="w-full h-52 object-cover"
          />
          <div className="p-5">
            <h2 className="text-xl font-bold mb-2 text-gray-800">Kacheli v parke</h2>
            <p className="text-gray-600 text-sm">
              Iliq shamol, bolalik va yengillik — osmon ostida erkinlikni his et.
            </p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-2xl overflow-hidden w-80 transform transition duration-300 hover:scale-105 hover:shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1596464716121-9e3b1b6bfa6e?auto=format&fit=crop&w=800&q=80"
            alt="Swings at sunset"
            className="w-full h-52 object-cover"
          />
          <div className="p-5">
            <h2 className="text-xl font-bold mb-2 text-gray-800">Kacheli na zakate</h2>
            <p className="text-gray-600 text-sm">
              Tinchlik va ilhom lahzasi — quyosh kunda xayrlashayotganda.
            </p>
          </div>
        </div>
      </div>

      {/* --- Xarita kartasi --- */}
      <div className="bg-white shadow-lg rounded-2xl flex flex-col md:flex-row justify-between items-center w-[700px] p-6 hover:shadow-2xl transition duration-300">
        <div className="flex items-start space-x-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/854/854878.png"
            alt="map icon"
            className="w-12 h-12"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Karta tsen</h2>
            <p className="text-gray-600 text-sm">Eng arzon chipta topish osonroq</p>
            <button className="mt-4 px-6 py-2 bg-gray-100 rounded-xl font-semibold hover:bg-gray-200 transition">
              Otkazish
            </button>
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1601134467661-3d775b999c8b?auto=format&fit=crop&w=400&q=80"
          alt="map"
          className="w-64 h-40 object-cover rounded-xl mt-6 md:mt-0"
        />
      </div>

      {/* --- Seul fotosuratlari slayderi --- */}
      <div className="w-[700px] rounded-2xl overflow-hidden relative shadow-xl border border-gray-200 p-4 bg-white">
        <div className="flex justify-between items-center mb-3 px-2">
          <h2 className="text-xl font-semibold text-gray-800">Foto Seula</h2>

          <div className="flex gap-3">
            <button
              onClick={prev}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-xl w-8 h-8 rounded-full flex items-center justify-center transition"
            >
              ‹
            </button>
            <button
              onClick={next}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-xl w-8 h-8 rounded-full flex items-center justify-center transition"
            >
              ›
            </button>
          </div>
        </div>

        {/* Foto konteyner */}
        <div className="overflow-hidden w-full">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${index * 25}%)`,
              width: `${photos.length * 25}%`,
            }}
          >
            {photos.map((photo, i) => (
              <img
                key={i}
                src={`${photo}?auto=format&fit=crop&w=220&q=80`}
                alt={`Seoul ${i}`}
                className="w-1/4 h-[180px] object-cover rounded-lg shadow-md mx-1 hover:scale-105 transition-transform duration-500"
              />
              
            ))} 
            
          </div>
         <center>
         <Link to={'/find-tickets'}>
            <button className="mt-4 px-6 py-2 bg-gray-100 rounded-xl font-semibold hover:bg-gray-200 transition">
              Найти билеты от 1,43 млн UZS
            </button>
         </Link>
         </center>
        </div>
      </div>
    </div>
  );
}
