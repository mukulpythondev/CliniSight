import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#f8fffe] to-[#e6fcf5] font-sans">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[10%] left-[10%] w-[400px] h-[400px] bg-[#50d0b0] rounded-full mix-blend-multiply filter blur-[120px] opacity-20 animate-blob"></div>
        <div className="absolute top-[40%] right-[10%] w-[350px] h-[350px] bg-[#3bb99f] rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[5%] left-[40%] w-[300px] h-[300px] bg-[#50d0b0] rounded-full mix-blend-multiply filter blur-[90px] opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] px-6 text-center py-16">
        <div className="glass-card p-10 max-w-3xl mx-auto border border-white/50 shadow-xl">
          <h1 className="text-5xl md:text-6xl font-semibold text-[#1a1a1a] mb-6 leading-tight tracking-tight">
            Your Health, <span className="block bg-gradient-to-r from-[#50d0b0] to-[#3bb99f] bg-clip-text text-transparent mt-2">Your Control</span>
          </h1>
          <p className="text-xl text-[#5a5a5a] mb-10 leading-relaxed max-w-2xl mx-auto">
            Manage your medical records, view alerts, and stay informed. CliniSight puts your health data at your fingertips—secure, private, and always accessible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login" className="bg-gradient-to-r from-[#50d0b0] to-[#3bb99f] px-8 py-4 text-white font-medium rounded-xl hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 shadow-md">Patient Login</Link>
            <Link to="/register" className="bg-white px-8 py-4 text-[#1a1a1a] font-medium rounded-xl border border-[#e0e0e0] hover:bg-[#f8f8f8] hover:border-[#d0d0d0] transition-all duration-300 shadow-sm active:scale-[0.98]">Register</Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-semibold text-[#1a1a1a] mb-4">Why Use CliniSight?</h2>
            <p className="text-[#5a5a5a] text-lg">Empowering patients with secure, easy access to their health data.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-8 text-center hover:transform hover:scale-[1.02] transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-r from-[#50d0b0] to-[#3bb99f] rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <h3 className="text-xl font-semibold text-[#1a1a1a] mb-4">Private & Secure</h3>
              <p className="text-[#5a5a5a]">Your health data is encrypted and accessible only to you and your authorized doctors.</p>
            </div>
            <div className="glass-card p-8 text-center hover:transform hover:scale-[1.02] transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-r from-[#50d0b0] to-[#3bb99f] rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-xl font-semibold text-[#1a1a1a] mb-4">Instant Alerts</h3>
              <p className="text-[#5a5a5a]">Get notified about new diagnoses, medications, and important health updates.</p>
            </div>
            <div className="glass-card p-8 text-center hover:transform hover:scale-[1.02] transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-r from-[#50d0b0] to-[#3bb99f] rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-xl font-semibold text-[#1a1a1a] mb-4">Easy Record Access</h3>
              <p className="text-[#5a5a5a]">View and manage your medical history, allergies, and medications anytime, anywhere.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
} 