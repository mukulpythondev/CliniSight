import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const DoctorLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    speciality: '',
    license_number: '',
    hospital: '',
    phone: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const url = isLogin
      ? 'http://localhost:3000/api/v1/doctor/login'
      : 'http://localhost:3000/api/v1/doctor/register';

    const body = isLogin
      ? JSON.stringify({
          email: formData.email,
          password: formData.password,
        })
      : JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          speciality: formData.speciality,
          license_number: formData.license_number,
          hospital: formData.hospital,
          phone: formData.phone,
        });

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'An error occurred. Please try again.');
      }

      if (data.data && data.data.token && data.data.doctor) {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('doctor', JSON.stringify(data.data.doctor));
        navigate('/doctor/dashboard');
      } else {
         throw new Error('Authentication failed: Invalid response from server.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      speciality: '',
      license_number: '',
      hospital: '',
      phone: ''
    });
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-[#f8fffe] to-[#e6fcf5] font-sans">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[10%] left-[15%] w-72 h-72 bg-[#50d0b0] rounded-full mix-blend-multiply filter blur-[80px] opacity-20 animate-blob"></div>
        <div className="absolute bottom-[10%] right-[15%] w-72 h-72 bg-[#3bb99f] rounded-full mix-blend-multiply filter blur-[80px] opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-[#50d0b0] to-[#3bb99f] rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-2xl">C</span>
            </div>
            <span className="text-[#1a1a1a] text-3xl font-medium tracking-tight">CliniSight</span>
          </Link>
          <p className="mt-2 text-[#5a5a5a]">Secure access to patient records</p>
        </div>

        {/* Toggle Buttons */}
        <div className="bg-white/80 backdrop-blur-md p-1 rounded-xl mb-6 border border-white/50 shadow-sm">
          <div className="flex">
            <button
              onClick={() => {
                setIsLogin(true);
                resetForm();
              }}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                isLogin
                  ? 'bg-gradient-to-r from-[#50d0b0] to-[#3bb99f] text-white shadow-sm'
                  : 'text-[#5a5a5a] hover:text-[#1a1a1a]'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                resetForm();
              }}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                !isLogin
                  ? 'bg-gradient-to-r from-[#50d0b0] to-[#3bb99f] text-white shadow-sm'
                  : 'text-[#5a5a5a] hover:text-[#1a1a1a]'
              }`}
            >
              Register
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 border border-white/50 shadow-lg">
          <h2 className="text-2xl font-semibold text-[#1a1a1a] text-center mb-6 tracking-tight">
            {isLogin ? 'Doctor Login' : 'Doctor Registration'}
          </h2>
          <p className="text-center text-[#5a5a5a] mb-8">
            {isLogin 
              ? 'Access patient records securely' 
              : 'Create your professional account'}
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-400/30 text-red-500 px-4 py-3 rounded-xl mb-6 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-[#5a5a5a] font-medium mb-2 pl-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required={!isLogin}
                    className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-[#e0e0e0] rounded-xl text-[#1a1a1a] placeholder-[#9a9a9a] focus:outline-none focus:ring-2 focus:ring-[#50d0b0]/50 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-[#5a5a5a] font-medium mb-2 pl-1">
                    Speciality
                  </label>
                  <input
                    type="text"
                    name="speciality"
                    value={formData.speciality}
                    onChange={handleChange}
                    required={!isLogin}
                    className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-[#e0e0e0] rounded-xl text-[#1a1a1a] placeholder-[#9a9a9a] focus:outline-none focus:ring-2 focus:ring-[#50d0b0]/50 focus:border-transparent transition-all duration-300"
                    placeholder="e.g., Cardiology, Neurology"
                  />
                </div>

                <div>
                  <label className="block text-[#5a5a5a] font-medium mb-2 pl-1">
                    License Number
                  </label>
                  <input
                    type="text"
                    name="license_number"
                    value={formData.license_number}
                    onChange={handleChange}
                    required={!isLogin}
                    className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-[#e0e0e0] rounded-xl text-[#1a1a1a] placeholder-[#9a9a9a] focus:outline-none focus:ring-2 focus:ring-[#50d0b0]/50 focus:border-transparent transition-all duration-300"
                    placeholder="Enter license number"
                  />
                </div>

                <div>
                  <label className="block text-[#5a5a5a] font-medium mb-2 pl-1">
                    Hospital
                  </label>
                  <input
                    type="text"
                    name="hospital"
                    value={formData.hospital}
                    onChange={handleChange}
                    required={!isLogin}
                    className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-[#e0e0e0] rounded-xl text-[#1a1a1a] placeholder-[#9a9a9a] focus:outline-none focus:ring-2 focus:ring-[#50d0b0]/50 focus:border-transparent transition-all duration-300"
                    placeholder="Enter hospital name"
                  />
                </div>

                <div>
                  <label className="block text-[#5a5a5a] font-medium mb-2 pl-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required={!isLogin}
                    className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-[#e0e0e0] rounded-xl text-[#1a1a1a] placeholder-[#9a9a9a] focus:outline-none focus:ring-2 focus:ring-[#50d0b0]/50 focus:border-transparent transition-all duration-300"
                    placeholder="Enter phone number"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-[#5a5a5a] font-medium mb-2 pl-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-[#e0e0e0] rounded-xl text-[#1a1a1a] placeholder-[#9a9a9a] focus:outline-none focus:ring-2 focus:ring-[#50d0b0]/50 focus:border-transparent transition-all duration-300"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-[#5a5a5a] font-medium mb-2 pl-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-[#e0e0e0] rounded-xl text-[#1a1a1a] placeholder-[#9a9a9a] focus:outline-none focus:ring-2 focus:ring-[#50d0b0]/50 focus:border-transparent transition-all duration-300"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#50d0b0] to-[#3bb99f] py-3.5 text-white font-medium rounded-xl hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm mt-2"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {isLogin ? 'Signing In...' : 'Creating Account...'}
                </div>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link 
              to="/" 
              className="text-[#50d0b0] hover:text-[#3bb99f] font-medium transition-colors duration-300 inline-flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>

        {/* Demo Credentials */}
        {isLogin && (
          <div className="bg-white/80 backdrop-blur-md p-4 rounded-xl mt-6 text-center border border-white/50 shadow-sm">
            <p className="text-[#5a5a5a] text-sm mb-1">Demo Credentials:</p>
            <p className="text-[#1a1a1a] text-xs font-medium">
              Email: doctor@example.com | Password: password123
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorLogin;