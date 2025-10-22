import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Plane, Lock, User } from "lucide-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "12345") {
      dispatch(login({ username }));
      navigate("/admin");
    } else {
      alert("❌ Noto‘g‘ri login yoki parol!");
    }
  };
  const validation = (e) => {
    if (e.search(/\d/) >= 0) {
      return true;
    } else {
      return false;
    }
  }
  const isValid = validation(username) ? "text-red-500 border-red-500" : "text-black";


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
      <div className="bg-white/90 backdrop-blur-sm border border-blue-100 shadow-xl rounded-3xl w-[400px] p-8 relative">
        {/* Plane icon */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white p-3 rounded-full shadow-lg">
          <Plane className="w-6 h-6" />
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 mt-6 mb-2">
          Aviasales Admin Login
        </h2>
        <p className="text-center text-gray-500 mb-8 text-sm">
          Kirish uchun admin ma'lumotlaringizni kiriting
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="relative">
            <User className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 transition-all ${isValid}`}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg"
          >
            Kirish
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          Parolingizni unutdingizmi?{" "}
          <span className="text-blue-500 hover:underline cursor-pointer">
            Tiklash
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
