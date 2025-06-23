import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PatientSearch = () => {
  const [searchMethod, setSearchMethod] = useState('id');
  const [searchValue, setSearchValue] = useState('');
  const [patient, setPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [otpStep, setOtpStep] = useState('search'); // search, generate, verify
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchValue.trim()) return;

    setIsLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/v1/patients/search`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchMethod, searchValue }),
      });

      const data = await response.json();

      if (data.success) {
        setPatient(data.data);
        setOtpStep('generate');
      } else {
        setError(data.message || 'Patient not found');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const generateOTP = async () => {
    if (!patient) return;

    setIsLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/v1/otp/generate', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ patient_id: patient._id }),
      });

      const data = await response.json();

      if (data.success) {
        setIsOtpSent(true);
        setOtpStep('verify');
      } else {
        setError(data.message || 'Failed to send OTP');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async () => {
    if (!patient || !otp.trim()) return;

    setIsLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/v1/otp/verify', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ patient_id: patient._id, otp }),
      });

      const data = await response.json();

      if (data.success) {
        navigate(`/patient/${patient._id}`);
      } else {
        setError(data.message || 'Invalid OTP');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetSearch = () => {
    setPatient(null);
    setOtpStep('search');
    setOtp('');
    setIsOtpSent(false);
    setError('');
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#f8fffe] to-[#e6fcf5] overflow-hidden font-sans p-6">
      {/* Animated background blobs */}
      <div className="absolute top-[10%] left-[10%] w-72 h-72 bg-[#50d0b0] opacity-10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[15%] right-[10%] w-96 h-96 bg-[#3bb99f] opacity-10 rounded-full blur-3xl animate-pulse"></div>

      {/* Navigation */}
      <nav className="glass-card p-6 mb-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-[#50d0b0] rounded-lg flex items-center justify-center text-white font-bold text-xl">
              C
            </div>
            <span className="text-2xl font-bold text-[#1e293b]">CliniSight</span>
          </div>
          <button
            onClick={() => navigate('/doctor/dashboard')}
            className="glass-card px-4 py-2 text-[#1e293b] hover:bg-white hover:bg-opacity-50 transition rounded-lg"
          >
            ← Back to Dashboard
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto">
        {otpStep === 'search' && (
          <div className="glass-card p-8">
            <h1 className="text-3xl font-bold text-[#1e293b] mb-6 text-center">Search Patient Records</h1>

            <form onSubmit={handleSearch} className="space-y-6">
              <div>
                <label className="block text-[#1e293b] font-medium mb-2">Search Method</label>
                <div className="flex space-x-4 text-[#1e293b]">
                  <label className="flex items-center space-x-2">
                    <input type="radio" value="id" checked={searchMethod === 'id'} onChange={(e) => setSearchMethod(e.target.value)} />
                    <span>Patient ID</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" value="phone" checked={searchMethod === 'phone'} onChange={(e) => setSearchMethod(e.target.value)} />
                    <span>Phone Number</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-[#1e293b] font-medium mb-2">{searchMethod === 'id' ? 'Patient ID' : 'Phone Number'}</label>
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-full px-4 py-3 border border-[#50d0b0] bg-white bg-opacity-50 rounded-lg text-[#1e293b] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#50d0b0]"
                  placeholder={searchMethod === 'id' ? 'Enter Patient ID' : 'Enter Phone Number'}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#50d0b0] to-[#3bb99f] text-white font-semibold py-3 rounded-lg hover:scale-105 transition disabled:opacity-50"
              >
                {isLoading ? 'Searching...' : 'Search Patient'}
              </button>
            </form>

            {error && (
              <div className="mt-6 bg-red-500 bg-opacity-20 border border-red-400 text-red-500 px-4 py-3 rounded-lg text-center">
                {error}
              </div>
            )}
          </div>
        )}

        {otpStep === 'generate' && patient && (
          <div className="glass-card p-8">
            <h2 className="text-2xl font-bold text-[#1e293b] mb-6 text-center">Patient Found - OTP Verification</h2>
            <div className="bg-white bg-opacity-50 p-6 rounded-lg mb-6 text-[#1e293b]">
              <h3 className="text-xl font-semibold mb-4">Patient Info</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div><span>Name:</span> <span className="font-medium">{patient.name}</span></div>
                <div><span>Phone:</span> <span className="font-medium">{patient.phone}</span></div>
                <div><span>Age:</span> <span className="font-medium">{patient.age}</span></div>
                <div><span>Gender:</span> <span className="font-medium capitalize">{patient.gender}</span></div>
              </div>
            </div>

            <p className="text-center text-[#1e293b] mb-6">
              To access this patient's records, an OTP will be sent to their phone number.
            </p>

            <div className="flex justify-center space-x-4">
              <button
                onClick={generateOTP}
                disabled={isLoading}
                className="bg-gradient-to-r from-[#50d0b0] to-[#3bb99f] text-white font-semibold px-8 py-3 rounded-lg hover:scale-105 transition disabled:opacity-50"
              >
                {isLoading ? 'Sending OTP...' : 'Send OTP to Patient'}
              </button>
              <button
                onClick={resetSearch}
                className="glass-card px-8 py-3 text-[#1e293b] font-semibold rounded-lg hover:bg-white hover:bg-opacity-50"
              >
                Search Another Patient
              </button>
            </div>

            {error && (
              <div className="mt-6 bg-red-500 bg-opacity-20 border border-red-400 text-red-500 px-4 py-3 rounded-lg text-center">
                {error}
              </div>
            )}
          </div>
        )}

        {otpStep === 'verify' && patient && (
          <div className="glass-card p-8">
            <h2 className="text-2xl font-bold text-[#1e293b] mb-6 text-center">Verify OTP to Access Records</h2>

            <div className="bg-green-500 bg-opacity-20 border border-green-400 text-green-500 px-4 py-3 rounded-lg mb-6 text-center">
              ✅ OTP has been sent to {patient.name}'s phone ({patient.phone})
            </div>

            <div className="space-y-6">
              <label className="block text-[#1e293b] font-medium mb-2">Enter Verification Code</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="w-full px-4 py-3 border border-[#50d0b0] bg-white bg-opacity-50 rounded-lg text-[#1e293b] text-center text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-[#50d0b0]"
                placeholder="000000"
                maxLength={6}
              />

              <div className="flex space-x-4 justify-center">
                <button
                  onClick={verifyOTP}
                  disabled={isLoading || otp.length !== 6}
                  className="bg-gradient-to-r from-[#50d0b0] to-[#3bb99f] text-white font-semibold px-8 py-3 rounded-lg hover:scale-105 transition disabled:opacity-50"
                >
                  {isLoading ? 'Verifying...' : 'Verify & Access Records'}
                </button>
                <button
                  onClick={() => { setOtpStep('generate'); setOtp(''); }}
                  className="glass-card px-8 py-3 text-[#1e293b] font-semibold rounded-lg hover:bg-white hover:bg-opacity-50"
                >
                  Send New OTP
                </button>
              </div>
            </div>

            {error && (
              <div className="mt-6 bg-red-500 bg-opacity-20 border border-red-400 text-red-500 px-4 py-3 rounded-lg text-center">
                {error}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientSearch;
