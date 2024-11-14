import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className="container">
      <Header />{" "}
      {/* Always render Header, since Layout is only used for protected routes */}
      <Outlet />
    </div>
  );
};

export default Layout;
