// App.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Sahifa tarkibi */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Har bir sahifada Footer pastda bo‘ladi */}
      <Footer />
    </div>
  );
};

export default App;
