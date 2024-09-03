import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";

const Layout = ({ children }) => {
  const location = useLocation();
  const isLoginOrForgetPassword =
    location.pathname === "/login" ||
    location.pathname === "/forget-password" ||
    location.pathname.startsWith("/reset-password");

  return (
    <div className="container">
      {isLoginOrForgetPassword ? null : <Header />}{" "}
      {/* Conditionally render Header */}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
