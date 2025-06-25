import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f8fffe] to-[#e6fcf5] relative overflow-hidden px-2">
      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-[10%] left-[10%] w-[300px] h-[300px] bg-[#50d0b0] rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob"></div>
        <div className="absolute top-[40%] right-[10%] w-[250px] h-[250px] bg-[#3bb99f] rounded-full mix-blend-multiply filter blur-[80px] opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[5%] left-[40%] w-[200px] h-[200px] bg-[#50d0b0] rounded-full mix-blend-multiply filter blur-[60px] opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      <div className="glass-card max-w-5xl w-full p-10 mx-4 shadow-2xl">
        <h2 className="text-4xl font-bold mb-2 text-[#1a1a1a] text-center">Welcome, {user?.name || 'Patient'}!</h2>
        <p className="text-[#5a5a5a] mb-10 text-center text-lg">Your personal health dashboard. Manage your profile, view your medical records, and stay updated with alerts—all in one place.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="flex flex-col items-center bg-white/80 rounded-2xl p-8 shadow-md hover:scale-[1.03] transition-all duration-300 border border-white/60">
            <div className="w-16 h-16 bg-gradient-to-r from-[#50d0b0] to-[#3bb99f] rounded-full flex items-center justify-center mb-4 shadow">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A9 9 0 1112 21a8.963 8.963 0 01-6.879-3.196z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-[#1a1a1a]">Profile</h3>
            <p className="text-[#5a5a5a] mb-4 text-center">View and update your personal and emergency contact information.</p>
            <Link to="/profile" className="bg-gradient-to-r from-[#50d0b0] to-[#3bb99f] px-6 py-2 text-white font-medium rounded-xl shadow hover:scale-105 transition-all duration-200">Go to Profile</Link>
          </div>
          {/* Records Card */}
          <div className="flex flex-col items-center bg-white/80 rounded-2xl p-8 shadow-md hover:scale-[1.03] transition-all duration-300 border border-white/60">
            <div className="w-16 h-16 bg-gradient-to-r from-[#50d0b0] to-[#3bb99f] rounded-full flex items-center justify-center mb-4 shadow">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-6 4h6a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-[#1a1a1a]">Medical Records</h3>
            <p className="text-[#5a5a5a] mb-4 text-center">Access your medical history, allergies, medications, and more.</p>
            <Link to="/records" className="bg-gradient-to-r from-[#50d0b0] to-[#3bb99f] px-6 py-2 text-white font-medium rounded-xl shadow hover:scale-105 transition-all duration-200">View Records</Link>
          </div>
          {/* Alerts Card */}
          <div className="flex flex-col items-center bg-white/80 rounded-2xl p-8 shadow-md hover:scale-[1.03] transition-all duration-300 border border-white/60">
            <div className="w-16 h-16 bg-gradient-to-r from-[#50d0b0] to-[#3bb99f] rounded-full flex items-center justify-center mb-4 shadow">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 8v.01" /></svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-[#1a1a1a]">Alerts</h3>
            <p className="text-[#5a5a5a] mb-4 text-center">Stay informed about new diagnoses, medications, and important updates.</p>
            <Link to="/alerts" className="bg-gradient-to-r from-[#50d0b0] to-[#3bb99f] px-6 py-2 text-white font-medium rounded-xl shadow hover:scale-105 transition-all duration-200">View Alerts</Link>
          </div>
        </div>
      </div>
    </div>
  );
} 