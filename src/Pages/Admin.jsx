import React, { useState } from "react";
import { usePost } from "../hooks/usePost";

const Admin = () => {
  const { data, loading, error, postData } = usePost("http://localhost:3000/flights");
  const [form, setForm] = useState({
    from: "",
    to: "",
    date: "",
    time: "",
    price: "",
    airline: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postData(form);
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="from" onChange={handleChange} placeholder="From" className="input input-bordered w-full" />
        <input name="to" onChange={handleChange} placeholder="To" className="input input-bordered w-full" />
        <input name="date" onChange={handleChange} type="date" className="input input-bordered w-full" />
        <input name="time" onChange={handleChange} type="time" className="input input-bordered w-full" />
        <input name="price" onChange={handleChange} placeholder="Price" className="input input-bordered w-full" />
        <input name="airline" onChange={handleChange} placeholder="Airline" className="input input-bordered w-full" />
        <button className="btn btn-primary w-full" disabled={loading}>
          {loading ? "Yuborilmoqda..." : "Qo‘shish"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-2">❌ {error}</p>}
      {data && <p className="text-green-600 mt-2">✅ Yangi flight qo‘shildi!</p>}
    </div>
  );
};

export default Admin;
