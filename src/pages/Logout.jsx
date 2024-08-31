import React, { useEffect } from "react";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { LogoutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    LogoutUser(); // Clear the token
    navigate("/login"); // Redirect to the login page
  }, [LogoutUser, navigate]);

  return null;
};

export default Logout;
