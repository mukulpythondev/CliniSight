import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const typeIcons = {
  diagnosis: '🩺',
  reminder: '⏰',
  info: 'ℹ️',
};

export default function Alerts() {
  const { token } = useContext(AuthContext);
  const [alerts, setAlerts] = useState([]);
  const [message, setMessage] = useState('');

  const fetchAlerts = () => {
    fetch('http://localhost:5001/api/patient/alerts', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setAlerts);
  };

  useEffect(() => {
    fetchAlerts();
    // Optionally, poll for new alerts every 30s
    // const interval = setInterval(fetchAlerts, 30000);
    // return () => clearInterval(interval);
  }, [token]);

  const markAsRead = async (id) => {
    const res = await fetch(`http://localhost:5001/api/patient/alerts/${id}/read`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      setMessage('Alert marked as read.');
      fetchAlerts();
    } else {
      setMessage('Failed to mark as read.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f8fffe] to-[#e6fcf5] relative overflow-hidden px-2">
      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-[10%] left-[10%] w-[300px] h-[300px] bg-[#50d0b0] rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob"></div>
        <div className="absolute top-[40%] right-[10%] w-[250px] h-[250px] bg-[#3bb99f] rounded-full mix-blend-multiply filter blur-[80px] opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[5%] left-[40%] w-[200px] h-[200px] bg-[#50d0b0] rounded-full mix-blend-multiply filter blur-[60px] opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      <div className="glass-card max-w-3xl w-full p-10 mx-4 shadow-2xl">
        <h2 className="text-3xl font-semibold text-center mb-8 text-[#1a1a1a]">Alerts</h2>
        {alerts.length === 0 ? (
          <p className="text-[#5a5a5a] text-center">No alerts.</p>
        ) : (
          <ul className="space-y-4">
            {alerts.map((alert) => (
              <li key={alert._id} className={`p-5 rounded-xl shadow flex flex-col md:flex-row md:items-center justify-between border border-white/60 ${alert.read ? 'bg-[#f8f8f8] opacity-60' : 'bg-white/90'}`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{typeIcons[alert.type] || '🔔'}</span>
                  <span className="font-semibold text-[#1a1a1a]">{alert.message}</span>
                  <span className="text-xs text-[#5a5a5a] ml-2">{new Date(alert.createdAt).toLocaleString()}</span>
                </div>
                {!alert.read && (
                  <button onClick={() => markAsRead(alert._id)} className="mt-2 md:mt-0 bg-gradient-to-r from-[#50d0b0] to-[#3bb99f] text-white font-medium py-2 px-6 rounded-xl shadow-md hover:scale-[1.02] transition-all duration-300">Mark as read</button>
                )}
              </li>
            ))}
          </ul>
        )}
        {message && <p className="mt-4 text-center text-[#3bb99f]">{message}</p>}
      </div>
    </div>
  );
} 