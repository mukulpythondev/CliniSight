import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#f8fffe] to-[#e6fcf5] font-sans">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[10%] left-[10%] w-[400px] h-[400px] bg-[#50d0b0] rounded-full mix-blend-multiply filter blur-[120px] opacity-20 animate-blob"></div>
        <div className="absolute top-[40%] right-[10%] w-[350px] h-[350px] bg-[#3bb99f] rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[5%] left-[40%] w-[300px] h-[300px] bg-[#50d0b0] rounded-full mix-blend-multiply filter blur-[90px] opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-[#50d0b0] to-[#3bb99f] rounded-lg flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-xl">C</span>
          </div>
          <span className="text-[#1a1a1a] text-2xl font-medium tracking-tight">CliniSight</span>
        </div>
        <Link 
          to="/login"
          className="bg-white text-[#1a1a1a] px-6 py-2.5 font-medium rounded-full border border-[#e0e0e0] hover:bg-[#f8f8f8] hover:border-[#d0d0d0] transition-all duration-300 shadow-sm active:scale-[0.98]"
        >
          Doctor Login
        </Link>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-6 text-center py-16">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-10 max-w-4xl mx-auto border border-white/50 shadow-xl">
          <h1 className="text-5xl md:text-6xl font-semibold text-[#1a1a1a] mb-6 leading-tight tracking-tight">
            Secure Patient Data
            <span className="block bg-gradient-to-r from-[#50d0b0] to-[#3bb99f] bg-clip-text text-transparent mt-2">
              Access Management
            </span>
          </h1>
          
          <p className="text-xl text-[#5a5a5a] mb-10 leading-relaxed max-w-2xl mx-auto">
            Empowering healthcare professionals with secure, OTP-verified access to patient records. 
            Ensuring privacy and compliance in every interaction.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/login"
              className="bg-gradient-to-r from-[#50d0b0] to-[#3bb99f] px-8 py-4 text-white font-medium rounded-xl hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 shadow-md"
            >
              Get Started
            </Link>
            <button className="bg-white px-8 py-4 text-[#1a1a1a] font-medium rounded-xl border border-[#e0e0e0] hover:bg-[#f8f8f8] hover:border-[#d0d0d0] transition-all duration-300 shadow-sm active:scale-[0.98]">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-semibold text-[#1a1a1a] mb-4">
              Why Choose CliniSight?
            </h2>
            <p className="text-[#5a5a5a] text-lg">
              Innovative solutions designed for modern healthcare professionals
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-8 text-center hover:transform hover:scale-[1.02] transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-r from-[#50d0b0] to-[#3bb99f] rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#1a1a1a] mb-4">Secure OTP Verification</h3>
              <p className="text-[#5a5a5a]">Patient consent required through SMS verification before accessing medical records.</p>
            </div>

            <div className="glass-card p-8 text-center hover:transform hover:scale-[1.02] transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-r from-[#50d0b0] to-[#3bb99f] rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#1a1a1a] mb-4">HIPAA Compliant</h3>
              <p className="text-[#5a5a5a]">Built with healthcare privacy standards in mind, ensuring full compliance.</p>
            </div>

            <div className="glass-card p-8 text-center hover:transform hover:scale-[1.02] transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-r from-[#50d0b0] to-[#3bb99f] rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#1a1a1a] mb-4">Lightning Fast</h3>
              <p className="text-[#5a5a5a]">Instant verification and record access with modern, responsive interface.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="relative z-10 py-20 px-6 bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-semibold text-[#1a1a1a] mb-4">
              Trusted by Healthcare Professionals
            </h2>
            <p className="text-[#5a5a5a] text-lg">
              What doctors are saying about our platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-8">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-gradient-to-r from-[#50d0b0] to-[#3bb99f] rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  A
                </div>
                <div>
                  <h4 className="font-semibold text-[#1a1a1a]">Dr. Amanda Chen</h4>
                  <p className="text-[#5a5a5a] text-sm">Cardiologist</p>
                </div>
              </div>
              <p className="text-[#5a5a5a] italic">
                "CliniSight has transformed how I access patient records. The OTP verification gives both me and my patients peace of mind."
              </p>
            </div>
            
            <div className="glass-card p-8">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-gradient-to-r from-[#50d0b0] to-[#3bb99f] rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  R
                </div>
                <div>
                  <h4 className="font-semibold text-[#1a1a1a]">Dr. Robert Kim</h4>
                  <p className="text-[#5a5a5a] text-sm">Neurologist</p>
                </div>
              </div>
              <p className="text-[#5a5a5a] italic">
                "The interface is incredibly intuitive. I can access patient histories in seconds with full compliance."
              </p>
            </div>
            
            <div className="glass-card p-8">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-gradient-to-r from-[#50d0b0] to-[#3bb99f] rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  M
                </div>
                <div>
                  <h4 className="font-semibold text-[#1a1a1a]">Dr. Maria Rodriguez</h4>
                  <p className="text-[#5a5a5a] text-sm">Pediatrician</p>
                </div>
              </div>
              <p className="text-[#5a5a5a] italic">
                "Finally a solution that balances accessibility with security. My patients appreciate the consent process."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-12">
            <h2 className="text-4xl font-semibold text-[#1a1a1a] mb-6">
              Ready to transform your patient data access?
            </h2>
            <p className="text-[#5a5a5a] text-xl mb-10 max-w-2xl mx-auto">
              Join thousands of healthcare professionals using CliniSight for secure, compliant record access.
            </p>
            <Link 
              to="/login"
              className="bg-gradient-to-r from-[#50d0b0] to-[#3bb99f] px-10 py-5 text-white font-medium rounded-xl hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 shadow-md text-lg inline-block"
            >
              Get Started for Free
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 text-center border-t border-[#e0e0e0]/50">
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
              <a href="#" className="text-[#5a5a5a] hover:text-[#3bb99f] transition-colors duration-300">Contact</a>
            </div>
            
            <div className="flex space-x-4">
              <a href="#" className="text-[#5a5a5a] hover:text-[#3bb99f] transition-colors duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
              </a>
              <a href="#" className="text-[#5a5a5a] hover:text-[#3bb99f] transition-colors duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
              <a href="#" className="text-[#5a5a5a] hover:text-[#3bb99f] transition-colors duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z"/></svg>
              </a>
            </div>
          </div>
          
          <p className="text-[#5a5a5a] text-sm">
            © {new Date().getFullYear()} CliniSight. All rights reserved.
          </p>
        </div>
      </footer>
      
      {/* Glass effect utility class */}
      <style jsx>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: 24px;
        }
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;