
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
  <div className="min-h-screen flex items-center justify-center bg-white text-black">
      <form
  className="w-full max-w-sm bg-gray-50 rounded-lg shadow-md p-6 space-y-6"
        onSubmit={handleSubmit}
      >
  <h2 className="text-2xl font-bold text-center text-black mb-4">Login</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-black">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-black">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-500 text-white font-semibold rounded-md shadow hover:bg-indigo-600 transition-colors"
        >
          Login
        </button>
        <div className="text-center mt-4">
          <span className="text-sm">Don't have an account? </span>
          <a href="/register" className="text-indigo-600 hover:underline font-semibold">Create one</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
