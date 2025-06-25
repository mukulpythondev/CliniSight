import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const typeIcons = {
  consultation: '🩺',
  lab_result: '🧪',
  medication: '💊',
  procedure: '🏥',
};
const statusColors = {
  active: 'bg-blue-100 text-blue-700',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

export default function Records() {
  const { token } = useContext(AuthContext);
  const [records, setRecords] = useState([]);
  const [filter, setFilter] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5001/api/patient/records', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(data => {
        if (Array.isArray(data)) setRecords(data);
        else if (Array.isArray(data.records)) setRecords(data.records);
        else setRecords([]);
      });
  }, [token]);

  const filtered = Array.isArray(records) ? records.filter(r =>
    (!filter || r.type === filter) && (!status || r.status === status)
  ) : [];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f8fffe] to-[#e6fcf5] relative overflow-hidden px-2">
      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-[10%] left-[10%] w-[300px] h-[300px] bg-[#50d0b0] rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob"></div>
        <div className="absolute top-[40%] right-[10%] w-[250px] h-[250px] bg-[#3bb99f] rounded-full mix-blend-multiply filter blur-[80px] opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[5%] left-[40%] w-[200px] h-[200px] bg-[#50d0b0] rounded-full mix-blend-multiply filter blur-[60px] opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      <div className="glass-card max-w-5xl w-full p-10 mx-4 shadow-2xl">
        <h2 className="text-3xl font-semibold text-center mb-8 text-[#1a1a1a]">Medical Records</h2>
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <select value={filter} onChange={e => setFilter(e.target.value)} className="input">
            <option value="">All Types</option>
            <option value="consultation">Consultation</option>
            <option value="lab_result">Lab Result</option>
            <option value="medication">Medication</option>
            <option value="procedure">Procedure</option>
          </select>
          <select value={status} onChange={e => setStatus(e.target.value)} className="input">
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        {filtered.length === 0 ? (
          <p className="text-[#5a5a5a] text-center">No records found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((rec, i) => (
              <div key={i} className="bg-white/80 rounded-xl p-6 shadow flex flex-col gap-2 border border-white/60">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{typeIcons[rec.type] || '📄'}</span>
                  <span className="font-semibold text-lg text-[#1a1a1a]">{rec.title}</span>
                  <span className={`ml-auto px-3 py-1 rounded-full text-xs font-semibold ${statusColors[rec.status] || 'bg-gray-100 text-gray-700'}`}>{rec.status}</span>
                </div>
                <div className="text-[#5a5a5a] text-sm mb-1">{rec.type && rec.type.charAt(0).toUpperCase() + rec.type.slice(1)} | {rec.date ? new Date(rec.date).toLocaleDateString() : ''}</div>
                {rec.doctor_id && <div className="text-[#3bb99f] text-xs mb-1">Doctor: {rec.doctor_id.name || rec.doctor_id}</div>}
                <div className="text-[#1a1a1a] text-base mb-1">{rec.description}</div>
                {rec.notes && <div className="text-[#5a5a5a] text-xs">Notes: {rec.notes}</div>}
              </div>
            ))}
          </div>
        )}
        {message && <p className="mt-4 text-center text-[#3bb99f]">{message}</p>}
      </div>
    </div>
  );
} 