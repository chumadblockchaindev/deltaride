import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const [form, setForm] = useState({
    full_name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    if (form.password !== form.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    if (!form.terms) {
      alert('Please accept the terms and conditions.');
      return;
    }

    const {full_name, username, email, password} = form

    try {
      const res = await api.post("api/user/register/", {full_name, username, email, password});
      if (res.status === 201) {
        localStorage.setItem("ACCESSTOKEN", res.data.access);
        localStorage.setItem("REFRESHTOKEN", res.data.refresh);
        navigate("/login");
      }
    } catch (error) {
      setLoading(false)
      console.error(error)
    }
  };

  return (
    <section className="bg-gradient-to-br from-cyan-950 via-gray-900 to-black min-h-screen flex items-center justify-center py-40">
      <div className="bg-black bg-opacity-50 border border-cyan-800 shadow-lg rounded-2xl w-full max-w-md p-8 space-y-6 text-white">
        <h1 className="text-2xl font-bold text-center text-cyan-300">Create an Account</h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-cyan-200">
              Full Name
            </label>
            <input
              type="text"
              name="full_name"
              id="full_name"
              className="w-full p-3 bg-gray-900 border border-cyan-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              placeholder="John Doe"
              required
              value={form.full_name}
              onChange={handleChange}
            />
          </div>
        <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-cyan-200">
              Username
            </label>
            <input
              type="username"
              name="username"
              id="username"
              className="w-full p-3 bg-gray-900 border border-cyan-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              placeholder="you@cyberverse.com"
              required
              value={form.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-cyan-200">
              Your Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full p-3 bg-gray-900 border border-cyan-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              placeholder="you@cyberverse.com"
              required
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-cyan-200">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full p-3 bg-gray-900 border border-cyan-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              placeholder="••••••••"
              required
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block mb-1 text-sm font-medium text-cyan-200">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className="w-full p-3 bg-gray-900 border border-cyan-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              placeholder="••••••••"
              required
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <div className="flex items-start">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="w-4 h-4 mt-1 text-cyan-500 bg-gray-800 border border-cyan-500 rounded focus:ring-cyan-600"
              checked={form.terms}
              onChange={handleChange}
            />
            <label htmlFor="terms" className="ml-3 text-sm text-gray-400">
              I accept the{' '}
              <a href="#" className="text-cyan-400 hover:underline">
                Terms and Conditions
              </a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-600 via-cyan-600 to-blue-600 hover:opacity-90 text-white py-2.5 rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-cyan-900/40"
          >
             {loading ? 
             (<div className='flex justify-center items-center gap-1'>
                Loading...
                <svg
                className="w-5 h-5 animate-spin text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
                />
              </svg>
             </div>
            ): "Create Account"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-400">
          Already have an account?{' '}
          <a href="#" className="text-cyan-400 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </section>
  );
};

export default RegistrationForm;
