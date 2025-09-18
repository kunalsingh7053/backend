
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  axios.post("http://localhost:3000/api/auth/register",{
    email: form.email,
    fullName:{

      firstName: form.firstName,
      lastName: form.lastName,
    },
    password: form.password
  },{
    withCredentials: true
  }).then((res)=>{
      console.log(res);
        navigate("/");
  }).catch((err)=>{
      console.log(err);
  })
};

  return (
    <div className="flex items-center justify-center w-full min-h-[80vh] bg-white from-indigo-50 via-white to-blue-50">
      <form
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-8 border border-gray-100"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-6 tracking-tight">Create Account</h2>
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
              className="mt-1 block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg"
            />
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label htmlFor="firstName" className="block text-base font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg"
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="lastName" className="block text-base font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={form.lastName}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg"
              />
            </div>
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
              className="mt-1 block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-3 px-6 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold rounded-xl shadow-lg hover:from-indigo-600 hover:to-blue-600 transition-all text-lg mt-4"
        >
          Register
        </button>
        <div className="text-center mt-6">
          <span className="text-base">Already have an account? </span>
          <a href="/login" className="text-indigo-600 hover:underline font-semibold">Sign in</a>
        </div>
      </form>
    </div>
  );
};

export default Register;
