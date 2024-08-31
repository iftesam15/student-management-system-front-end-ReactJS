import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";

const Layout = ({ children }) => {
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  return (
    <div className="container">
      {isLogin ? null : <Header />} {/* Conditionally render Navbar */}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
