
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    console.log(form)
    e.preventDefault();
    // Handle login logic here
    axios.post("http://localhost:3000/api/auth/login",{
      email: form.email,
      password: form.password
    },
  {
    withCredentials: true
  }).then((res)=>{
      console.log(res);
      navigate("/");
  }).catch((err)=>{
      console.log(err);
  })
  };

  return (
    <div className="flex items-center justify-center w-full min-h-[80vh] bg-white from-blue-50 via-white to-indigo-50">
      <form
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-8 border border-gray-100"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-6 tracking-tight">Sign In</h2>
        <div className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-base font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold rounded-xl shadow-lg hover:from-blue-600 hover:to-indigo-600 transition-all text-lg mt-4"
        >
          Login
        </button>
        <div className="text-center mt-6">
          <span className="text-base">Don't have an account? </span>
          <a href="/register" className="text-blue-600 hover:underline font-semibold">Create one</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
