import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const DoctorDashboard = () => {
  const [doctor, setDoctor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctorData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/api/v1/doctor/me', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch doctor data');
        }

        const data = await response.json();
        if (data.success && data.data.doctor) {
          setDoctor(data.data.doctor);
          localStorage.setItem('doctor', JSON.stringify(data.data.doctor)); // Update local storage
        } else {
          throw new Error('Invalid data format');
        }
      } catch (error) {
        console.error('Error fetching doctor data:', error);
        // If token is invalid or expired, log out the user
        localStorage.removeItem('token');
        localStorage.removeItem('doctor');
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctorData();
  }, [navigate]);

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    try {
      if (token) {
        await fetch('http://localhost:3000/api/v1/doctor/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error('Logout failed on server:', error);
      // Still proceed with client-side logout
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('doctor');
      navigate('/');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f8fffe] to-[#e6fcf5]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#50d0b0] border-opacity-70"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8fffe] to-[#e6fcf5] font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-white/30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-gradient-to-r from-[#50d0b0] to-[#3bb99f] rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <span className="text-[#1a1a1a] text-2xl font-medium tracking-tight">CliniSight</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-[#3a3a3a]">Welcome, Dr. {doctor?.name?.split(' ')[0]}</span>
            <button
              onClick={handleLogout}
              className="bg-white text-[#3a3a3a] px-4 py-2 rounded-lg border border-[#e0e0e0] hover:bg-[#f8f8f8] hover:border-[#d0d0d0] transition-all duration-300 shadow-sm active:scale-[0.98]"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-white/50 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-semibold text-[#1a1a1a] mb-2 tracking-tight">
                Welcome back, Dr. {doctor?.name}
              </h1>
              <p className="text-[#5a5a5a] text-lg capitalize">
                Your Speciality: {doctor?.speciality}
              </p>
            </div>
            <div className="text-right">
                <div className="w-20 h-20 bg-gradient-to-r from-[#50d0b0] to-[#3bb99f] rounded-full flex items-center justify-center shadow-md mb-2">
                    <span className="text-white font-bold text-3xl">
                        {doctor?.name?.charAt(0)}
                    </span>
                </div>
                <p className="text-sm text-[#5a5a5a] text-center">{doctor?.hospital}</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Link 
            to="/search"
            className="group"
          >
            <div className="glass-card p-6 hover:transform hover:scale-[1.02] transition-all duration-300 cursor-pointer group-hover:border-[#50d0b0]/30">
              <div className="w-16 h-16 bg-gradient-to-r from-[#50d0b0] to-[#3bb99f] rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:shadow-md">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#1a1a1a] mb-2">Search Patients</h3>
              <p className="text-[#5a5a5a]">Find and access patient records with OTP verification</p>
            </div>
          </Link>

          <div className="glass-card p-6">
            <div className="w-16 h-16 bg-gradient-to-r from-[#50d0b0] to-[#3bb99f] rounded-full flex items-center justify-center mb-4 shadow-sm">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#1a1a1a] mb-2">Recent Activity</h3>
            <p className="text-[#5a5a5a]">View your recent patient record access</p>
          </div>

          <div className="glass-card p-6">
            <div className="w-16 h-16 bg-gradient-to-r from-[#50d0b0] to-[#3bb99f] rounded-full flex items-center justify-center mb-4 shadow-sm">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#1a1a1a] mb-2">Settings</h3>
            <p className="text-[#5a5a5a]">Manage your account preferences</p>
          </div>
        </div>

        {/* Doctor Profile */}
        <div className="glass-card p-8">
          <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-6">Doctor Profile</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-[#3bb99f] mb-4">Personal Information</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#50d0b0] rounded-full mr-3"></div>
                  <div>
                    <span className="text-[#5a5a5a]">Name:</span>
                    <span className="text-[#1a1a1a] ml-2 font-medium">Dr. {doctor?.name}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#50d0b0] rounded-full mr-3"></div>
                  <div>
                    <span className="text-[#5a5a5a]">Email:</span>
                    <span className="text-[#1a1a1a] ml-2 font-medium">{doctor?.email}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#50d0b0] rounded-full mr-3"></div>
                  <div>
                    <span className="text-[#5a5a5a]">Phone:</span>
                    <span className="text-[#1a1a1a] ml-2 font-medium">{doctor?.phone}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#50d0b0] rounded-full mr-3"></div>
                  <div>
                    <span className="text-[#5a5a5a]">License:</span>
                    <span className="text-[#1a1a1a] ml-2 font-medium">{doctor?.license_number}</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#3bb99f] mb-4">Professional Information</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#50d0b0] rounded-full mr-3"></div>
                  <div>
                    <span className="text-[#5a5a5a]">Speciality:</span>
                    <span className="text-[#1a1a1a] ml-2 font-medium">{doctor?.speciality || 'N/A'}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#50d0b0] rounded-full mr-3"></div>
                  <div>
                    <span className="text-[#5a5a5a]">Hospital:</span>
                    <span className="text-[#1a1a1a] ml-2 font-medium">{doctor?.hospital || 'N/A'}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#50d0b0] rounded-full mr-3"></div>
                  <span className="text-[#1a1a1a]">Status: <span className="font-medium text-[#50d0b0]">Verified</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 py-6 border-t border-[#e0e0e0]/50">
        <div className="max-w-7xl mx-auto px-6 text-center text-[#5a5a5a]">
          <p>© {new Date().getFullYear()} CliniSight. All rights reserved.</p>
          <p className="mt-1 text-sm">Secure Patient Records Management System</p>
        </div>
      </footer>
    </div>
  );
};

export default DoctorDashboard;