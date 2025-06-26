import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PatientRecords = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchPatientData();
  }, [patientId]);

  const fetchPatientData = async () => {
    setIsLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`http://localhost:3000/api/v1/records/patient/${patientId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setPatient(data.data.patient);
        setRecords(data.data.records);
      } else {
        setError(data.message || 'Failed to fetch patient data');
      }
    } catch (err) {
      console.error('Fetch error:', err); // Added console error for debugging
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyzeReport = async () => {
    setIsAnalyzing(true);
    setShowModal(true);

    try {
      const res = await fetch('http://127.0.0.1:8000/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patient_info: patient, records }),
      });

      const data = await res.json();
      setAnalysisResult(data.summary || 'No result returned.');
    } catch (error) {
      console.error('Analysis error:', error); // Added console error
      setAnalysisResult('Error analyzing data.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getBloodGroupColor = (bloodGroup) => {
    const colors = {
      'A+': 'bg-red-500',
      'A-': 'bg-red-600',
      'B+': 'bg-blue-500',
      'B-': 'bg-blue-600',
      'AB+': 'bg-purple-500',
      'AB-': 'bg-purple-600',
      'O+': 'bg-green-500',
      'O-': 'bg-green-600'
    };
    return colors[bloodGroup] || 'bg-gray-500';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-red-400 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-black mb-4">Error Loading Patient Data</h2>
            <p className="text-gray-700 mb-6">{error}</p>
            <button
              onClick={() => navigate('/search')}
              className="bg-teal-500 hover:bg-teal-600 px-6 py-3 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Back to Search
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main content - this was missing!
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* Modal for Analysis Result */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white max-w-2xl w-full p-6 rounded-xl shadow-xl">
            <h2 className="text-2xl font-bold text-black mb-4">AI Analysis Summary</h2>
            <div className="bg-gray-100 p-4 rounded-lg max-h-[60vh] overflow-y-auto">
              <pre className="whitespace-pre-wrap text-gray-800">
                {isAnalyzing ? 'Analyzing patient data...' : analysisResult}
              </pre>
            </div>
            <div className="mt-6 text-right">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/search')}
              className="text-teal-600 hover:text-teal-800 font-semibold flex items-center"
            >
              ← Back to Search
            </button>
            <h1 className="text-3xl font-bold text-gray-800">Patient Records</h1>
            <div></div>
          </div>
        </div>

        {/* Patient Info Card */}
        {patient && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {patient.name || 'Unknown Patient'}
                </h2>
                <p className="text-gray-600">ID: {patient.id || patientId}</p>
                <p className="text-gray-600">Age: {patient.age || 'N/A'}</p>
                <p className="text-gray-600">Gender: {patient.gender || 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-600">Phone: {patient.phone || 'N/A'}</p>
                <p className="text-gray-600">Email: {patient.email || 'N/A'}</p>
                <p className="text-gray-600">Address: {patient.address || 'N/A'}</p>
              </div>
              <div className="flex items-center justify-center">
                {patient.bloodGroup && (
                  <div className={`${getBloodGroupColor(patient.bloodGroup)} text-white px-4 py-2 rounded-full font-bold text-lg`}>
                    {patient.bloodGroup}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="border-b">
            <nav className="flex space-x-8 px-6">
              {['overview', 'records', 'vitals'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm capitalize transition-colors ${
                    activeTab === tab
                      ? 'border-teal-500 text-teal-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Patient Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-700 mb-2">Recent Activity</h4>
                    <p className="text-gray-600">Total Records: {records.length}</p>
                    <p className="text-gray-600">Last Visit: {records[0]?.date || 'N/A'}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-700 mb-2">Emergency Contact</h4>
                    <p className="text-gray-600">{patient?.emergencyContact || 'Not provided'}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'records' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">Medical Records</h3>
                  <button
                    onClick={handleAnalyzeReport}
                    disabled={isAnalyzing}
                    className="bg-teal-500 hover:bg-teal-600 disabled:bg-gray-400 text-white px-5 py-2 rounded-lg font-semibold transition-all"
                  >
                    {isAnalyzing ? 'Analyzing...' : 'Analyze Report'}
                  </button>
                </div>
                
                {records.length > 0 ? (
                  <div className="space-y-4">
                    {records.map((record, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-800">{record.type || 'Medical Record'}</h4>
                          <span className="text-sm text-gray-500">{record.date}</span>
                        </div>
                        <p className="text-gray-600">{record.description || record.notes}</p>
                        {record.doctor && <p className="text-sm text-gray-500 mt-2">Dr. {record.doctor}</p>}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No medical records found for this patient.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'vitals' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Vital Signs</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {records.filter(r => r.vitals).map((record, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-700 mb-2">{record.date}</h4>
                      <div className="space-y-1 text-sm">
                        <p>BP: {record.vitals?.bloodPressure || 'N/A'}</p>
                        <p>HR: {record.vitals?.heartRate || 'N/A'}</p>
                        <p>Temp: {record.vitals?.temperature || 'N/A'}</p>
                      </div>
                    </div>
                  )) || (
                    <div className="col-span-3 text-center py-8">
                      <p className="text-gray-500">No vital signs recorded.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientRecords;