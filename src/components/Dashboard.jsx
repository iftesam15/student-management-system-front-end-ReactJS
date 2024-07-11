import React from 'react';
import { Navigate } from 'react-router-dom'; // Redirect if not authenticated

const Dashboard = () => {
  const token = localStorage.getItem('token'); // Check for token in localStorage

  if (!token) {
    return <Navigate to="/" replace />; // Redirect to login if not authenticated
  }

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      {/* Display protected content here */}
    </div>
  );
};

export default Dashboard;
