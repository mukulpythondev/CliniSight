import React, { useState } from 'react';

const SummaryPage = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [selectedMetric, setSelectedMetric] = useState('all');

  // Mock data for demonstration
  const summaryStats = {
    totalAccess: 1247,
    uniquePatients: 156,
    avgResponseTime: '1.2s',
    complianceRate: '99.8%',
    otpSuccessRate: '96.4%',
    peakHours: '2-4 PM'
  };

  const weeklyTrends = [
    { day: 'Mon', accesses: 45, patients: 23, avgTime: 1.1 },
    { day: 'Tue', accesses: 52, patients: 28, avgTime: 1.3 },
    { day: 'Wed', accesses: 38, patients: 19, avgTime: 1.0 },
    { day: 'Thu', accesses: 61, patients: 31, avgTime: 1.4 },
    { day: 'Fri', accesses: 48, patients: 25, avgTime: 1.2 },
    { day: 'Sat', accesses: 22, patients: 12, avgTime: 0.9 },
    { day: 'Sun', accesses: 18, patients: 8, avgTime: 0.8 }
  ];

  const topDepartments = [
    { name: 'Cardiology', accesses: 234, percentage: 18.8 },
    { name: 'Emergency', accesses: 198, percentage: 15.9 },
    { name: 'Neurology', accesses: 156, percentage: 12.5 },
    { name: 'Pediatrics', accesses: 143, percentage: 11.5 },
    { name: 'Orthopedics', accesses: 132, percentage: 10.6 }
  ];

  const recentAlerts = [
    { type: 'info', message: 'System maintenance scheduled for tonight 11 PM - 1 AM', time: '2 hours ago' },
    { type: 'warning', message: 'OTP delivery delays reported for Verizon network', time: '4 hours ago' },
    { type: 'success', message: 'New security update deployed successfully', time: '1 day ago' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fffe] to-[#e6fcf5] font-sans">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[5%] right-[15%] w-[300px] h-[300px] bg-[#50d0b0] rounded-full mix-blend-multiply filter blur-[100px] opacity-15 animate-blob"></div>
        <div className="absolute bottom-[10%] left-[20%] w-[250px] h-[250px] bg-[#3bb99f] rounded-full mix-blend-multiply filter blur-[80px] opacity-15 animate-blob animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center p-6 bg-white/60 backdrop-blur-md border-b border-white/30">
        <div className="flex items-center space-x-8">
          <a href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-[#50d0b0] to-[#3bb99f] rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <span className="text-[#1a1a1a] text-2xl font-medium tracking-tight">CliniSight</span>
          </a>
          
          <div className="hidden md:flex space-x-6">
            <a href="/dashboard" className="text-[#5a5a5a] hover:text-[#3bb99f] transition-colors duration-300">Dashboard</a>
            <a href="/visualization" className="text-[#5a5a5a] hover:text-[#3bb99f] transition-colors duration-300">Analytics</a>
            <a href="/summary" className="text-[#3bb99f] font-medium">Summary</a>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gradient-to-r from-[#50d0b0] to-[#3bb99f] rounded-full flex items-center justify-center">
            <span className="text-white font-medium text-sm">DR</span>
          </div>
          <span className="text-[#1a1a1a] font-medium hidden md:block">Dr. Smith</span>
        </div>
      </nav>

      {/* Header */}
      <div className="relative z-10 px-6 pt-8 pb-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-4xl font-semibold text-[#1a1a1a] mb-2">System Summary</h1>
              <p className="text-[#5a5a5a] text-lg">Comprehensive overview of platform performance and usage</p>
            </div>
            
            <div className="flex space-x-3 mt-4 md:mt-0">
              <select 
                value={timeRange} 
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-xl px-4 py-2 text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#50d0b0]/50"
              >
                <option value="day">Last 24 Hours</option>
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="quarter">Last Quarter</option>
              </select>
              
              <button className="bg-gradient-to-r from-[#50d0b0] to-[#3bb99f] px-6 py-2 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300">
                Export Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="relative z-10 px-6 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            <div className="glass-card p-6 text-center hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-[#50d0b0] to-[#3bb99f] rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#1a1a1a] mb-1">{summaryStats.totalAccess.toLocaleString()}</h3>
              <p className="text-[#5a5a5a] text-sm">Total Accesses</p>
            </div>

            <div className="glass-card p-6 text-center hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-[#50d0b0] to-[#3bb99f] rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#1a1a1a] mb-1">{summaryStats.uniquePatients}</h3>
              <p className="text-[#5a5a5a] text-sm">Unique Patients</p>
            </div>

            <div className="glass-card p-6 text-center hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-[#50d0b0] to-[#3bb99f] rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#1a1a1a] mb-1">{summaryStats.avgResponseTime}</h3>
              <p className="text-[#5a5a5a] text-sm">Avg Response Time</p>
            </div>

            <div className="glass-card p-6 text-center hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-[#50d0b0] to-[#3bb99f] rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#1a1a1a] mb-1">{summaryStats.complianceRate}</h3>
              <p className="text-[#5a5a5a] text-sm">Compliance Rate</p>
            </div>

            <div className="glass-card p-6 text-center hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-[#50d0b0] to-[#3bb99f] rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#1a1a1a] mb-1">{summaryStats.otpSuccessRate}</h3>
              <p className="text-[#5a5a5a] text-sm">OTP Success Rate</p>
            </div>

            <div className="glass-card p-6 text-center hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-[#50d0b0] to-[#3bb99f] rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#1a1a1a] mb-1">{summaryStats.peakHours}</h3>
              <p className="text-[#5a5a5a] text-sm">Peak Hours</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="relative z-10 px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Weekly Trends */}
            <div className="lg:col-span-2">
              <div className="glass-card p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-[#1a1a1a]">Weekly Access Trends</h2>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setSelectedMetric('accesses')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        selectedMetric === 'accesses' || selectedMetric === 'all'
                          ? 'bg-[#50d0b0] text-white'
                          : 'bg-white/50 text-[#5a5a5a] hover:bg-white/80'
                      }`}
                    >
                      Accesses
                    </button>
                    <button 
                      onClick={() => setSelectedMetric('patients')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        selectedMetric === 'patients'
                          ? 'bg-[#50d0b0] text-white'
                          : 'bg-white/50 text-[#5a5a5a] hover:bg-white/80'
                      }`}
                    >
                      Patients
                    </button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {weeklyTrends.map((day, index) => (
                    <div key={day.day} className="flex items-center space-x-4">
                      <div className="w-12 text-[#5a5a5a] text-sm font-medium">{day.day}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <div className="flex-1 bg-white/50 rounded-full h-3 overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-[#50d0b0] to-[#3bb99f] rounded-full transition-all duration-500"
                              style={{ 
                                width: `${selectedMetric === 'patients' ? (day.patients / 35) * 100 : (day.accesses / 65) * 100}%` 
                              }}
                            ></div>
                          </div>
                          <div className="text-[#1a1a1a] font-semibold text-sm min-w-[3rem]">
                            {selectedMetric === 'patients' ? day.patients : day.accesses}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Department Usage */}
            <div>
              <div className="glass-card p-8 mb-8">
                <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-6">Top Departments</h2>
                <div className="space-y-4">
                  {topDepartments.map((dept, index) => (
                    <div key={dept.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-[#50d0b0] to-[#3bb99f] rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <div className="text-[#1a1a1a] font-medium">{dept.name}</div>
                          <div className="text-[#5a5a5a] text-sm">{dept.accesses} accesses</div>
                        </div>
                      </div>
                      <div className="text-[#3bb99f] font-semibold">{dept.percentage}%</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* System Alerts */}
              <div className="glass-card p-8">
                <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-6">Recent Alerts</h2>
                <div className="space-y-4">
                  {recentAlerts.map((alert, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 rounded-lg bg-white/50">
                      <div className={`w-3 h-3 rounded-full mt-1 ${
                        alert.type === 'success' ? 'bg-green-500' :
                        alert.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-[#1a1a1a] text-sm">{alert.message}</p>
                        <p className="text-[#5a5a5a] text-xs mt-1">{alert.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Performance Summary */}
          <div className="mt-8">
            <div className="glass-card p-8">
              <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-6">Performance Summary</h2>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-[#1a1a1a] mb-1">System Health</h3>
                  <p className="text-green-600 font-medium">Excellent</p>
                  <p className="text-[#5a5a5a] text-sm">All systems operational</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-[#1a1a1a] mb-1">Response Time</h3>
                  <p className="text-blue-600 font-medium">Optimal</p>
                  <p className="text-[#5a5a5a] text-sm">Under 1.5s average</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-[#1a1a1a] mb-1">Security</h3>
                  <p className="text-purple-600 font-medium">Secure</p>
                  <p className="text-[#5a5a5a] text-sm">Zero breaches detected</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-[#1a1a1a] mb-1">Usage Trend</h3>
                  <p className="text-orange-600 font-medium">Growing</p>
                  <p className="text-[#5a5a5a] text-sm">+12% this month</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-20">
        <button className="w-14 h-14 bg-gradient-to-r from-[#50d0b0] to-[#3bb99f] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group">
          <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>

      {/* Styles */}
      <style jsx>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: 24px;
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
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
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default SummaryPage;