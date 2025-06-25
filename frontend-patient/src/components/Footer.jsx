import React from 'react';

export default function Footer() {
  return (
    <footer className="relative z-10 py-8 px-6 text-center border-t border-[#e0e0e0]/50 bg-white/80 backdrop-blur">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="w-10 h-10 bg-gradient-to-r from-[#50d0b0] to-[#3bb99f] rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <span className="text-[#1a1a1a] text-xl font-medium tracking-tight">CliniSight</span>
          </div>
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a href="#" className="text-[#5a5a5a] hover:text-[#3bb99f] transition-colors duration-300">Privacy</a>
            <a href="#" className="text-[#5a5a5a] hover:text-[#3bb99f] transition-colors duration-300">Terms</a>
            <a href="#" className="text-[#5a5a5a] hover:text-[#3bb99f] transition-colors duration-300">Security</a>
          </div>
        </div>
        <p className="text-[#5a5a5a]">&copy; {new Date().getFullYear()} CliniSight. All rights reserved.</p>
      </div>
    </footer>
  );
} 