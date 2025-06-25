import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const genderOptions = ['male', 'female', 'other'];
const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function Profile() {
  const { token } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5001/api/patient/profile', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(setProfile);
  }, [token]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleEdit = () => {
    setForm({ ...profile, ...profile.emergency_contact });
    setEdit(true);
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const payload = {
      ...form,
      emergency_contact: {
        name: form.emergency_contact_name,
        phone: form.emergency_contact_phone,
        relationship: form.relationship,
      },
    };
    delete payload.emergency_contact_name;
    delete payload.emergency_contact_phone;
    delete payload.relationship;

    try {
      const res = await fetch('http://localhost:5001/api/patient/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        setProfile(data);
        setEdit(false);
        setMessage('Profile updated successfully!');
      } else {
        setMessage(data.message || 'Update failed.');
      }
    } catch {
      setMessage('Server error.');
    } finally {
      setLoading(false);
    }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f8fffe] to-[#e6fcf5] relative overflow-hidden px-4 py-8">
      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-[10%] left-[10%] w-[300px] h-[300px] bg-[#50d0b0] rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob"></div>
        <div className="absolute top-[40%] right-[10%] w-[250px] h-[250px] bg-[#3bb99f] rounded-full mix-blend-multiply filter blur-[80px] opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[5%] left-[40%] w-[200px] h-[200px] bg-[#50d0b0] rounded-full mix-blend-multiply filter blur-[60px] opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="glass-card max-w-3xl w-full p-6 md:p-8 shadow-2xl bg-white rounded-2xl overflow-hidden">
        <h2 className="text-3xl font-semibold text-center mb-8 text-[#1a1a1a]">Profile</h2>

        {edit ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/** Form Inputs */}
              {[
                { label: 'Name', name: 'name', value: form.name },
                { label: 'Phone', name: 'phone', value: form.phone },
                { label: 'Age', name: 'age', value: form.age },
              ].map((field) => (
                <div key={field.name} className="space-y-1">
                  <label className="text-sm text-gray-600">{field.label}</label>
                  <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3bb99f]"
                    name={field.name}
                    value={field.value || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}

              <div className="space-y-1">
                <label className="text-sm text-gray-600">Gender</label>
                <select
                  name="gender"
                  value={form.gender || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3bb99f]"
                  required
                >
                  <option value="">Select</option>
                  {genderOptions.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-sm text-gray-600">Address</label>
                <input
                  name="address"
                  value={form.address || ''}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3bb99f]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm text-gray-600">Blood Group</label>
                <select
                  name="blood_group"
                  value={form.blood_group || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3bb99f]"
                >
                  <option value="">Select</option>
                  {bloodGroups.map((bg) => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-sm text-gray-600">Emergency Contact Name</label>
                <input
                  name="emergency_contact_name"
                  value={form.emergency_contact_name || ''}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3bb99f]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm text-gray-600">Emergency Contact Phone</label>
                <input
                  name="emergency_contact_phone"
                  value={form.emergency_contact_phone || ''}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3bb99f]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm text-gray-600">Relationship</label>
                <input
                  name="relationship"
                  value={form.relationship || ''}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3bb99f]"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-[#50d0b0] to-[#3bb99f] text-white font-medium py-3 rounded-xl shadow-md hover:scale-[1.02] transition-all"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : 'Save'}
              </button>
              <button
                type="button"
                onClick={() => setEdit(false)}
                className="flex-1 bg-white text-[#1a1a1a] font-medium py-3 rounded-xl border border-[#e0e0e0] hover:bg-[#f8f8f8] transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div>
            {/** Display profile fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-[#1a1a1a]">
              <div><b>Name:</b> {profile.name}</div>
              <div><b>Phone:</b> {profile.phone}</div>
              <div><b>Email:</b> {profile.email}</div>
              <div><b>Age:</b> {profile.age}</div>
              <div><b>Gender:</b> {profile.gender}</div>
              <div><b>Address:</b> {profile.address}</div>
              <div><b>Blood Group:</b> {profile.blood_group}</div>
              <div><b>Emergency Contact:</b> {profile.emergency_contact?.name} ({profile.emergency_contact?.relationship}) - {profile.emergency_contact?.phone}</div>
            </div>
            <button
              onClick={handleEdit}
              className="mb-8 bg-gradient-to-r from-[#50d0b0] to-[#3bb99f] text-white font-medium py-2 px-6 rounded-xl shadow-md hover:scale-[1.02] transition-all"
            >
              Edit
            </button>

            {/** Display lists */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['medical_history', 'allergies', 'current_medications'].map((field) => (
                <div key={field} className="bg-white/70 rounded-xl p-4 shadow">
                  <h4 className="font-semibold text-[#3bb99f] mb-2">{field.replace('_', ' ')}</h4>
                  <ul className="text-[#5a5a5a] text-sm list-disc ml-4">
                    {profile[field]?.length ? profile[field].map((item, i) => <li key={i}>{item}</li>) : <li>None</li>}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {message && (
          <div className={`mt-4 p-3 rounded-lg text-center ${message.includes('error') || message.includes('failed') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
