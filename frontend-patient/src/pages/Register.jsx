import React, { useState } from 'react';

const initialState = {
  name: '',
  phone: '',
  email: '',
  password: '',
  age: '',
  gender: '',
  address: '',
  blood_group: '',
  emergency_contact_name: '',
  emergency_contact_phone: '',
  emergency_contact_relationship: '',
};

export default function Register() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const payload = {
      ...form,
      age: Number(form.age),
      emergency_contact: {
        name: form.emergency_contact_name,
        phone: form.emergency_contact_phone,
        relationship: form.emergency_contact_relationship,
      },
    };
    delete payload.emergency_contact_name;
    delete payload.emergency_contact_phone;
    delete payload.emergency_contact_relationship;
    try {
      const res = await fetch('http://localhost:5001/api/patient/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Registration successful! You can now log in.');
        setForm(initialState);
      } else {
        setMessage(data.message || 'Registration failed.');
      }
    } catch (err) {
      setMessage('Server error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f8fffe] to-[#e6fcf5] relative overflow-hidden px-4 py-8">
      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-[10%] left-[10%] w-[300px] h-[300px] bg-[#50d0b0] rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob"></div>
        <div className="absolute top-[40%] right-[10%] w-[250px] h-[250px] bg-[#3bb99f] rounded-full mix-blend-multiply filter blur-[80px] opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[5%] left-[40%] w-[200px] h-[200px] bg-[#50d0b0] rounded-full mix-blend-multiply filter blur-[60px] opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="glass-card max-w-5xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Illustration Side */}
        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-b from-[#e6fcf5] to-[#f8fffe] p-8 w-1/2">
          <img 
            src="https://images.pexels.com/photos/5637704/pexels-photo-5637704.jpeg" 
            alt="Register Illustration" 
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
          <h2 className="text-2xl font-bold text-[#3bb99f] mb-2">Welcome to CliniSight!</h2>
          <p className="text-[#5a5a5a] text-center">
            Create your account to manage your health records and stay updated with your care.
          </p>
        </div>

        {/* Form Side */}
        <div className="flex-1 p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-center mb-6 text-[#1a1a1a]">Patient Registration</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Personal Information */}
              <div className="space-y-1">
                <label className="text-sm text-gray-600">Full Name</label>
                <input 
                  name="name" 
                  value={form.name} 
                  onChange={handleChange} 
                  required 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3bb99f] focus:border-transparent"
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-sm text-gray-600">Phone Number</label>
                <input 
                  name="phone" 
                  value={form.phone} 
                  onChange={handleChange} 
                  required 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3bb99f] focus:border-transparent"
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-sm text-gray-600">Email</label>
                <input 
                  name="email" 
                  type="email" 
                  value={form.email} 
                  onChange={handleChange} 
                  required 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3bb99f] focus:border-transparent"
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-sm text-gray-600">Password</label>
                <input 
                  name="password" 
                  type="password" 
                  value={form.password} 
                  onChange={handleChange} 
                  required 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3bb99f] focus:border-transparent"
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-sm text-gray-600">Age</label>
                <input 
                  name="age" 
                  type="number" 
                  value={form.age} 
                  onChange={handleChange} 
                  required 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3bb99f] focus:border-transparent"
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-sm text-gray-600">Gender</label>
                <select 
                  name="gender" 
                  value={form.gender} 
                  onChange={handleChange} 
                  required 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3bb99f] focus:border-transparent"
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div className="space-y-1 md:col-span-2">
                <label className="text-sm text-gray-600">Address</label>
                <input 
                  name="address" 
                  value={form.address} 
                  onChange={handleChange} 
                  required 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3bb99f] focus:border-transparent"
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-sm text-gray-600">Blood Group</label>
                <select 
                  name="blood_group" 
                  value={form.blood_group} 
                  onChange={handleChange} 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3bb99f] focus:border-transparent"
                >
                  <option value="">Select</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
              
              {/* Emergency Contact */}
              <div className="md:col-span-2 pt-4">
                <h3 className="text-lg font-medium text-[#3bb99f] border-b border-[#e6fcf5] pb-2 mb-4">Emergency Contact</h3>
              </div>
              
              <div className="space-y-1">
                <label className="text-sm text-gray-600">Name</label>
                <input 
                  name="emergency_contact_name" 
                  value={form.emergency_contact_name} 
                  onChange={handleChange} 
                  required 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3bb99f] focus:border-transparent"
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-sm text-gray-600">Phone</label>
                <input 
                  name="emergency_contact_phone" 
                  value={form.emergency_contact_phone} 
                  onChange={handleChange} 
                  required 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3bb99f] focus:border-transparent"
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-sm text-gray-600">Relationship</label>
                <input 
                  name="emergency_contact_relationship" 
                  value={form.emergency_contact_relationship} 
                  onChange={handleChange} 
                  required 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3bb99f] focus:border-transparent"
                />
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={loading} 
              className="w-full mt-6 bg-gradient-to-r from-[#50d0b0] to-[#3bb99f] text-white font-semibold py-3 rounded-lg shadow-md hover:opacity-90 transition-all duration-300"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : 'Register'}
            </button>
          </form>
          
          {message && (
            <div className={`mt-4 p-3 rounded-lg text-center ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}