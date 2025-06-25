import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import DoctorLogin from './components/DoctorLogin';
import DoctorDashboard from './components/DoctorDashboard';
import PatientSearch from './components/PatientSearch';
import PatientRecords from './components/PatientRecords';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Analysis from './components/Analysis';
import Visual_Representation from './components/Visual_Representation';
import Summary from './components/Summary';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<DoctorLogin />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
            <Route path="/search" element={<PatientSearch />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/visual" element={<Visual_Representation />} />
            <Route path="/summary" element={<Summary />} />
            <Route path="/patient/:patientId" element={<PatientRecords />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
