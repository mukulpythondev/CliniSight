import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Header() {
  const { token, logout } = React.useContext(AuthContext);
  const location = useLocation();
  return (
    <header className="relative z-20 w-full bg-white/80 backdrop-blur border-b border-[#e0e0e0]/50 shadow-sm">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-[#50d0b0] to-[#3bb99f] rounded-lg flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-xl">C</span>
          </div>
          <span className="text-[#1a1a1a] text-2xl font-medium tracking-tight">CliniSight</span>
        </div>
        <nav className="flex items-center gap-4">
          {!token ? (
            <>
              <Link to="/login" className={`px-4 py-2 rounded-full font-medium transition ${location.pathname === '/login' ? 'bg-gradient-to-r from-[#50d0b0] to-[#3bb99f] text-white' : 'bg-white text-[#1a1a1a] border border-[#e0e0e0] hover:bg-[#f8f8f8]'}`}>Login</Link>
              <Link to="/register" className={`px-4 py-2 rounded-full font-medium transition ${location.pathname === '/register' ? 'bg-gradient-to-r from-[#50d0b0] to-[#3bb99f] text-white' : 'bg-white text-[#1a1a1a] border border-[#e0e0e0] hover:bg-[#f8f8f8]'}`}>Register</Link>
            </>
          ) : (
            <button onClick={() => { logout(); window.location.href = '/'; }} className="px-4 py-2 rounded-full font-medium bg-gradient-to-r from-[#50d0b0] to-[#3bb99f] text-white shadow hover:scale-105 transition">Logout</button>
          )}
        </nav>
      </div>
    </header>
  );
} 