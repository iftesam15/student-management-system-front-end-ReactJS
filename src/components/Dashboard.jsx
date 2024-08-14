import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom'; // Redirect if not authenticated
import Header from './Header';
import { useAuth } from '../store/auth';

const Dashboard = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <div>
     
      <h1>Welcome to the Dashboard</h1>
      <p>Name: {user.username}</p>
      <p>Email: {user.email}</p>


      {/* Display protected content here */}
    </div>
  );
};

export default Dashboard;
