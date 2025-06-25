import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('http://localhost:5001/api/patient/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        login(data.patient, data.token);
        window.location.href = '/dashboard';
      } else {
        setMessage(data.message || 'Login failed.');
      }
    } catch (err) {
      setMessage('Server error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f8fffe] to-[#e6fcf5] relative overflow-hidden px-4 py-8">
      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-[10%] left-[10%] w-[300px] h-[300px] bg-[#50d0b0] rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob"></div>
        <div className="absolute top-[40%] right-[10%] w-[250px] h-[250px] bg-[#3bb99f] rounded-full mix-blend-multiply filter blur-[80px] opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[5%] left-[40%] w-[200px] h-[200px] bg-[#50d0b0] rounded-full mix-blend-multiply filter blur-[60px] opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="glass-card max-w-5xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Illustration Side */}
        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-b from-[#e6fcf5] to-[#f8fffe] p-8 w-1/2">
          <img
            src="https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg"
            alt="Login Illustration"
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
          <h2 className="text-2xl font-bold text-[#3bb99f] mb-2">Welcome Back!</h2>
          <p className="text-[#5a5a5a] text-center">
            Log in to access your health dashboard and stay updated with your care.
          </p>
        </div>

        {/* Form Side */}
        <div className="flex-1 p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-center mb-6 text-[#1a1a1a]">Patient Login</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm text-gray-600">Email</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3bb99f] focus:border-transparent"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm text-gray-600">Password</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3bb99f] focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-gradient-to-r from-[#50d0b0] to-[#3bb99f] text-white font-semibold py-3 rounded-lg shadow-md hover:opacity-90 transition-all duration-300"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </span>
              ) : 'Login'}
            </button>
          </form>

          {message && (
            <div
              className={`mt-4 p-3 rounded-lg text-center ${
                message.includes('Server') || message.includes('failed')
                  ? 'bg-red-100 text-red-700'
                  : 'bg-green-100 text-green-700'
              }`}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
