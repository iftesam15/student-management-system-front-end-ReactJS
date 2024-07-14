import React, { useEffect } from 'react'
import { useAuth } from '../store/auth'
import { Navigate } from 'react-router-dom';

export default function Logout() {
    const { LogoutUser} = useAuth();
    useEffect(()=>{
        LogoutUser();
    },[LogoutUser]);
  return (
    <Navigate to="/login" />
  )
}
