import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import { Calendar, User, FileText, Activity, TrendingUp, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
const PatientDashboard = () => {
  const [showSummary, setShowSummary] = useState(false);

  // Mock patient data with more comprehensive records
  const patientRecords = [
    {
      _id: "68585a023811c40c46186439",
      patient_id: "685830c4e7fe09b655fc55e7",
      doctor_id: "68583327e7d8d9eb50177f2f",
      type: "consultation",
      title: "Hypertension",
      description: "The patient has a history of high blood pressure for the past 5 years, currently on medication regimen including ACE inhibitors and diuretics.",
      status: "active",
      notes: "Continue medication as prescribed and monitor blood pressure bi-weekly. Patient responding well to current treatment.",
      date: "2025-06-22",
      createdAt: "2025-06-22T19:31:14.925+00:00",
      patient_name: "John Smith",
      age: 45,
      severity: "moderate"
    },
    {
      _id: "68585a023811c40c46186440",
      patient_id: "685830c4e7fe09b655fc55e8",
      doctor_id: "68583327e7d8d9eb50177f2f",
      type: "diagnosis",
      title: "Type 2 Diabetes",
      description: "Recently diagnosed with Type 2 Diabetes Mellitus. HbA1c levels at 8.2%. Patient requires lifestyle modifications and medication.",
      status: "active",
      notes: "Started on Metformin 500mg twice daily. Scheduled for diabetes education classes and nutritionist consultation.",
      date: "2025-06-20",
      createdAt: "2025-06-20T14:22:10.123+00:00",
      patient_name: "Maria Garcia",
      age: 52,
      severity: "high"
    },
    {
      _id: "68585a023811c40c46186441",
      patient_id: "685830c4e7fe09b655fc55e9",
      doctor_id: "68583327e7d8d9eb50177f30",
      type: "follow-up",
      title: "Post-Surgery Recovery",
      description: "6-week post-operative follow-up for appendectomy. Incision healing well, no signs of infection.",
      status: "resolved",
      notes: "Patient cleared for normal activities. Follow-up in 3 months or if any concerns arise.",
      date: "2025-06-18",
      createdAt: "2025-06-18T10:15:30.456+00:00",
      patient_name: "David Johnson",
      age: 34,
      severity: "low"
    },
    {
      _id: "68585a023811c40c46186442",
      patient_id: "685830c4e7fe09b655fc55ea",
      doctor_id: "68583327e7d8d9eb50177f2f",
      type: "consultation",
      title: "Chronic Fatigue",
      description: "Patient reports persistent fatigue lasting 4 months. Initial blood work shows low vitamin D and iron deficiency.",
      status: "active",
      notes: "Prescribed vitamin D3 2000 IU daily and iron supplements. Follow-up blood work in 6 weeks.",
      date: "2025-06-15",
      createdAt: "2025-06-15T16:45:22.789+00:00",
      patient_name: "Sarah Wilson",
      age: 28,
      severity: "moderate"
    },
    {
      _id: "68585a023811c40c46186443",
      patient_id: "685830c4e7fe09b655fc55eb",
      doctor_id: "68583327e7d8d9eb50177f31",
      type: "emergency",
      title: "Chest Pain",
      description: "Patient presented with acute chest pain. EKG normal, troponin levels within normal range. Likely muscular strain.",
      status: "resolved",
      notes: "Discharged with pain management instructions. Advised to follow up with primary care if symptoms persist.",
      date: "2025-06-12",
      createdAt: "2025-06-12T22:30:15.234+00:00",
      patient_name: "Robert Brown",
      age: 41,
      severity: "high"
    },
    {
      _id: "68585a023811c40c46186444",
      patient_id: "685830c4e7fe09b655fc55ec",
      doctor_id: "68583327e7d8d9eb50177f2f",
      type: "consultation",
      title: "Anxiety Disorder",
      description: "Patient experiencing increased anxiety and panic attacks over the past 3 months. Work-related stress contributing factor.",
      status: "active",
      notes: "Started on SSRI therapy. Referred to therapist for cognitive behavioral therapy. Follow-up in 4 weeks.",
      date: "2025-06-10",
      createdAt: "2025-06-10T13:20:45.567+00:00",
      patient_name: "Emily Davis",
      age: 31,
      severity: "moderate"
    }
  ];

  // Data for charts
  const consultationTypeData = [
    { name: 'Consultation', count: 4, color: '#50d0b0' },
    { name: 'Diagnosis', count: 1, color: '#3bb99f' },
    { name: 'Follow-up', count: 1, color: '#2da58a' },
    { name: 'Emergency', count: 1, color: '#1e8f75' }
  ];

  const statusData = [
    { name: 'Active', value: 4 },
    { name: 'Resolved', value: 2 }
  ];

  const severityData = [
    { name: 'Low', count: 1 },
    { name: 'Moderate', count: 3 },
    { name: 'High', count: 2 }
  ];

  const monthlyTrendsData = [
    { month: 'Jan', consultations: 12, diagnoses: 3 },
    { month: 'Feb', consultations: 15, diagnoses: 5 },
    { month: 'Mar', consultations: 18, diagnoses: 4 },
    { month: 'Apr', consultations: 14, diagnoses: 2 },
    { month: 'May', consultations: 20, diagnoses: 6 },
    { month: 'Jun', consultations: 22, diagnoses: 7 }
  ];

  const COLORS = ['#50d0b0', '#3bb99f', '#2da58a', '#1e8f75'];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    return status === 'active' ? (
      <AlertCircle className="w-4 h-4 text-orange-500" />
    ) : (
      <CheckCircle className="w-4 h-4 text-green-500" />
    );
  };

  const generateSummary = () => {
    const totalRecords = patientRecords.length;
    const activeRecords = patientRecords.filter(r => r.status === 'active').length;
    const averageAge = Math.round(patientRecords.reduce((sum, r) => sum + r.age, 0) / totalRecords);
    const commonConditions = ['Hypertension', 'Diabetes', 'Anxiety'];
    
    return {
      totalRecords,
      activeRecords,
      averageAge,
      commonConditions,
      recentTrend: "23% increase in consultations this month",
      criticalCases: patientRecords.filter(r => r.severity === 'high').length
    };
  };

  const summary = generateSummary();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8fffe] to-[#e6fcf5] p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-[#50d0b0] to-[#3bb99f] rounded-xl flex items-center justify-center shadow-lg">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#1a1a1a]">Patient Analytics Dashboard</h1>
              <p className="text-[#5a5a5a]">Comprehensive patient data visualization and insights</p>
            </div>
          </div>
          
          <button
            onClick={() => setShowSummary(!showSummary)}
            className="bg-gradient-to-r from-[#50d0b0] to-[#3bb99f] px-6 py-3 text-white font-medium rounded-xl hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 shadow-md flex items-center space-x-2"
          >
            <FileText className="w-5 h-5" />
            {/* <span>{showSummary ? 'Hide Summary' : 'Generate Summary'}</span> */}
            <Link to='/summary'>Generate Summary</Link>
          </button>
        </div>

        {/* Summary Panel */}
        {showSummary && (
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/50 shadow-xl">
            <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-4 flex items-center">
              <TrendingUp className="w-6 h-6 mr-2 text-[#50d0b0]" />
              Patient Data Summary
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-[#50d0b0]/10 to-[#3bb99f]/10 p-4 rounded-xl">
                <h3 className="font-semibold text-[#1a1a1a] mb-2">Overview</h3>
                <ul className="text-[#5a5a5a] space-y-1">
                  <li>• Total Records: {summary.totalRecords}</li>
                  <li>• Active Cases: {summary.activeRecords}</li>
                  <li>• Critical Cases: {summary.criticalCases}</li>
                  <li>• Average Patient Age: {summary.averageAge} years</li>
                </ul>
              </div>
              <div className="bg-gradient-to-r from-[#50d0b0]/10 to-[#3bb99f]/10 p-4 rounded-xl">
                <h3 className="font-semibold text-[#1a1a1a] mb-2">Common Conditions</h3>
                <ul className="text-[#5a5a5a] space-y-1">
                  {summary.commonConditions.map((condition, index) => (
                    <li key={index}>• {condition}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-r from-[#50d0b0]/10 to-[#3bb99f]/10 p-4 rounded-xl">
                <h3 className="font-semibold text-[#1a1a1a] mb-2">Insights</h3>
                <p className="text-[#5a5a5a]">{summary.recentTrend}</p>
                <p className="text-[#5a5a5a] mt-2">Most cases are moderate severity, indicating good preventive care.</p>
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-white/50 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#5a5a5a] text-sm">Total Patients</p>
                <p className="text-2xl font-bold text-[#1a1a1a]">{patientRecords.length}</p>
              </div>
              <User className="w-8 h-8 text-[#50d0b0]" />
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-white/50 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#5a5a5a] text-sm">Active Cases</p>
                <p className="text-2xl font-bold text-[#1a1a1a]">{statusData[0].value}</p>
              </div>
              <Activity className="w-8 h-8 text-[#3bb99f]" />
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-white/50 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#5a5a5a] text-sm">This Month</p>
                <p className="text-2xl font-bold text-[#1a1a1a]">22</p>
              </div>
              <Calendar className="w-8 h-8 text-[#2da58a]" />
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-white/50 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#5a5a5a] text-sm">Critical Cases</p>
                <p className="text-2xl font-bold text-[#1a1a1a]">2</p>
              </div>
              <AlertCircle className="w-8 h-8 text-[#e74c3c]" />
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Consultation Types Bar Chart */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-white/50 shadow-lg">
            <h3 className="text-xl font-semibold text-[#1a1a1a] mb-4">Consultation Types</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={consultationTypeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" stroke="#5a5a5a" />
                <YAxis stroke="#5a5a5a" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                    border: 'none', 
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                  }} 
                />
                <Bar dataKey="count" fill="#50d0b0" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Status Distribution Pie Chart */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-white/50 shadow-lg">
            <h3 className="text-xl font-semibold text-[#1a1a1a] mb-4">Case Status Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Severity Levels */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-white/50 shadow-lg">
            <h3 className="text-xl font-semibold text-[#1a1a1a] mb-4">Severity Levels</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={severityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" stroke="#5a5a5a" />
                <YAxis stroke="#5a5a5a" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                    border: 'none', 
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                  }} 
                />
                <Bar dataKey="count" fill="#3bb99f" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Monthly Trends */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-white/50 shadow-lg">
            <h3 className="text-xl font-semibold text-[#1a1a1a] mb-4">Monthly Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrendsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="month" stroke="#5a5a5a" />
                <YAxis stroke="#5a5a5a" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                    border: 'none', 
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                  }} 
                />
                <Legend />
                <Line type="monotone" dataKey="consultations" stroke="#50d0b0" strokeWidth={3} dot={{ fill: '#50d0b0' }} />
                <Line type="monotone" dataKey="diagnoses" stroke="#3bb99f" strokeWidth={3} dot={{ fill: '#3bb99f' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Patient Records Table */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-white/50 shadow-lg">
          <h3 className="text-xl font-semibold text-[#1a1a1a] mb-6">Recent Patient Records</h3>
          <div className="overflow-x-auto">
            <div className="space-y-4">
              {patientRecords.map((record) => (
                <div key={record._id} className="bg-white/60 rounded-xl p-4 border border-white/30 hover:shadow-md transition-all duration-300">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(record.status)}
                          <h4 className="font-semibold text-[#1a1a1a]">{record.title}</h4>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(record.severity)}`}>
                          {record.severity}
                        </span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          {record.type}
                        </span>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-[#5a5a5a] text-sm mb-1">
                            <strong>Patient:</strong> {record.patient_name} ({record.age} years)
                          </p>
                          <p className="text-[#5a5a5a] text-sm mb-2">
                            <strong>Date:</strong> {new Date(record.date).toLocaleDateString()}
                          </p>
                          <p className="text-[#5a5a5a] text-sm">
                            {record.description.length > 100 
                              ? `${record.description.substring(0, 100)}...` 
                              : record.description}
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-[#5a5a5a] text-sm mb-2">
                            <strong>Notes:</strong>
                          </p>
                          <p className="text-[#5a5a5a] text-sm bg-gray-50 p-2 rounded-lg">
                            {record.notes.length > 80 
                              ? `${record.notes.substring(0, 80)}...` 
                              : record.notes}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 lg:mt-0 lg:ml-6 flex items-center space-x-2">
                      <div className="text-right">
                        <p className="text-xs text-[#5a5a5a]">
                          <Clock className="w-3 h-3 inline mr-1" />
                          {new Date(record.createdAt).toLocaleTimeString()}
                        </p>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                          record.status === 'active' 
                            ? 'bg-orange-100 text-orange-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {record.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;