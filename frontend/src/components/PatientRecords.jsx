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
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
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
          <div className="glass-card p-8 text-center">
            <div className="text-red-400 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-black mb-4">Error Loading Patient Data</h2>
            <p className="text-gray-700 mb-6">{error}</p>
            <button
              onClick={() => navigate('/search')}
              className="teal-gradient px-6 py-3 text-black font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Back to Search
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      {/* Navigation */}
      <nav className="glass-effect p-6 mb-8 rounded-2xl">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-xl">C</span>
            </div>
            <span className="text-black text-2xl font-bold">CliniSight</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/search')}
              className="glass-effect px-4 py-2 text-black rounded-lg hover:bg-white hover:bg-opacity-20 transition-all duration-300"
            >
              ← Back to Search
            </button>
            <button
              onClick={() => navigate('/doctor/dashboard')}
              className="glass-effect px-4 py-2 text-black rounded-lg hover:bg-white hover:bg-opacity-20 transition-all duration-300"
            >
              Dashboard
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto">
        {/* Patient Header */}
        <div className="glass-card p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-teal-500 rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-3xl">
                  {patient?.name?.charAt(0)}
                </span>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-black mb-2">
                  {patient?.name}
                </h1>
                <p className="text-gray-700 text-lg">
                  Patient ID: {patient?._id}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className={`inline-block px-4 py-2 rounded-full text-black font-semibold ${getBloodGroupColor(patient?.blood_group)}`}>
                {patient?.blood_group}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-gray-500 bg-opacity-10 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-black">{patient?.age}</div>
              <div className="text-gray-700 text-sm">Age</div>
            </div>
            <div className="bg-gray-500 bg-opacity-10 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-black capitalize">{patient?.gender}</div>
              <div className="text-gray-700 text-sm">Gender</div>
            </div>
            <div className="bg-gray-500 bg-opacity-10 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-black">{records.length}</div>
              <div className="text-gray-700 text-sm">Records</div>
            </div>
            <div className="bg-gray-500 bg-opacity-10 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-black">{patient?.allergies?.length || 0}</div>
              <div className="text-gray-700 text-sm">Allergies</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="glass-card p-8">
          <div className="flex space-x-1 mb-8">
            {['overview', 'records', 'medical', 'emergency'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === tab
                    ? 'teal-gradient text-black'
                    : 'text-gray-700 hover:text-black hover:bg-white hover:bg-opacity-10'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-96">
            {activeTab === 'overview' && (
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-black mb-4">Personal Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Full Name:</span>
                      <span className="text-black font-medium">{patient?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Phone:</span>
                      <span className="text-black font-medium">{patient?.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Email:</span>
                      <span className="text-black font-medium">{patient?.email || 'Not provided'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Age:</span>
                      <span className="text-black font-medium">{patient?.age} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Gender:</span>
                      <span className="text-black font-medium capitalize">{patient?.gender}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Blood Group:</span>
                      <span className="text-black font-medium">{patient?.blood_group}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-black mb-4">Address</h3>
                  <p className="text-gray-700">{patient?.address || 'Address not provided'}</p>
                  
                  <h3 className="text-xl font-semibold text-black mb-4 mt-6">Current Medications</h3>
                  {patient?.current_medications?.length > 0 ? (
                    <ul className="space-y-2">
                      {patient.current_medications.map((med, index) => (
                        <li key={index} className="text-gray-700 flex items-center">
                          <span className="w-2 h-2 bg-teal-400 rounded-full mr-3"></span>
                          {med}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-700">No current medications</p>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'records' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-black">Medical Records</h3>
                  <span className="text-gray-700">{records.length} records found</span>
                </div>
                
                {records.length > 0 ? (
                  <div className="space-y-4">
                    {records.map((record) => (
                      <div key={record._id} className="bg-white bg-opacity-10 rounded-lg p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="text-lg font-semibold text-black mb-2">{record.title}</h4>
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                              record.type === 'consultation' ? 'bg-blue-500 text-black' :
                              record.type === 'test' ? 'bg-green-500 text-black' :
                              record.type === 'prescription' ? 'bg-purple-500 text-black' :
                              'bg-gray-500 text-black'
                            }`}>
                              {record.type}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="text-gray-700 text-sm">
                              {new Date(record.date).toLocaleDateString()}
                            </div>
                            <div className="text-gray-700 text-sm">
                              Dr. {record.doctor_id?.name || 'Unknown'}
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 mb-3">{record.description}</p>
                        
                        {record.notes && (
                          <div className="bg-white bg-opacity-5 rounded-lg p-4">
                            <h5 className="text-teal-300 font-semibold mb-2">Notes:</h5>
                            <p className="text-gray-700">{record.notes}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4">📋</div>
                    <h3 className="text-xl font-semibold text-black mb-2">No Records Found</h3>
                    <p className="text-gray-700">This patient has no medical records yet.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'medical' && (
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-black mb-4">Medical History</h3>
                  {patient?.medical_history?.length > 0 ? (
                    <ul className="space-y-2">
                      {patient.medical_history.map((history, index) => (
                        <li key={index} className="text-gray-700 flex items-center">
                          <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                          {history}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-700">No medical history recorded</p>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-black mb-4">Allergies</h3>
                  {patient?.allergies?.length > 0 ? (
                    <ul className="space-y-2">
                      {patient.allergies.map((allergy, index) => (
                        <li key={index} className="text-gray-700 flex items-center">
                          <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                          {allergy}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-700">No known allergies</p>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'emergency' && (
              <div>
                <h3 className="text-xl font-semibold text-black mb-6">Emergency Contact</h3>
                {patient?.emergency_contact ? (
                  <div className="bg-white bg-opacity-10 rounded-lg p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-semibold text-black mb-4">Contact Details</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-700">Name:</span>
                            <span className="text-black font-medium">{patient.emergency_contact.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-700">Phone:</span>
                            <span className="text-black font-medium">{patient.emergency_contact.phone}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-700">Relationship:</span>
                            <span className="text-black font-medium">{patient.emergency_contact.relationship}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                          </div>
                          <p className="text-red-300 font-semibold">Emergency Contact</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4">📞</div>
                    <h3 className="text-xl font-semibold text-black mb-2">No Emergency Contact</h3>
                    <p className="text-gray-700">Emergency contact information not provided.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientRecords;