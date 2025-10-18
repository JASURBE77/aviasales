import React, { useEffect } from "react";

export default function FooterNavbar() {
  useEffect(() => {
    document.title = "Yo‘lovchi media";
  }, []);

  const handleRead = () => {
    alert("📘 Bu demo versiya — maqola hali yo‘q 😊");
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-[#fefefe] to-[#f3f6fa] font-[Poppins]">
      
      {/* Banner */}
      <div className="w-[90%] sm:w-[70%] bg-[#f45c67] text-white text-center rounded-2xl shadow-xl mt-14 p-10">
        <h1 className="text-4xl font-extrabold mb-3">Yo‘lovchi media</h1>
        <p className="text-base opacity-90 mb-6">
          Всё просто: мы пишем про путешествия — вы читаете
        </p>
        <button
          onClick={handleRead}
          className="bg-white text-[#f45c67] font-semibold px-8 py-2 rounded-full hover:bg-[#ffe5e8] active:scale-95 transition"
        >
          Читать
        </button>
      </div>

      {/* Mushuk qismi */}
      <div className="relative mt-24 bg-white w-[85%] sm:w-[65%] rounded-2xl shadow-lg p-10 text-center">
        <img
          src="https://i.imgur.com/6YVbE7S.png"
          alt="cat"
          className="w-24 h-24 mx-auto rounded-full border-4 border-white shadow-md absolute left-1/2 -top-12 transform -translate-x-1/2"
        />
        <h2 className="mt-16 text-xl font-semibold text-gray-700">
          Долистали до конца?
        </h2>
        <p className="text-gray-500 mb-5">Вот вам милый котик!</p>
        <button
          onClick={scrollTop}
          className="bg-[#f3f6fa] px-6 py-2 rounded-full text-sm hover:bg-[#e2e6ec] transition"
        >
          Вернуться в начало
        </button>
      </div>

      {/* Footer */}
      <footer className="mt-14 text-center text-sm text-gray-500 mb-10 w-[85%] sm:w-[70%]">
        Мы не продаём авиабилеты, а помогаем найти самые дешёвые. Бесплатно.{" "}
        <a href="#" className="text-blue-600 hover:underline">
          Узнать больше
        </a>
      </footer>
    </div>
  );
}
