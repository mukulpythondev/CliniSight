import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = localStorage.getItem('token');

  // If token exists, render the child route (via Outlet).
  // Otherwise, redirect to the login page.
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute; 