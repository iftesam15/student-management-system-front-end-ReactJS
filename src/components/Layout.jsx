import React from "react";
import Header from "./Header";
import { Navigate, Outlet } from "react-router-dom";
export default function Layout() {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/" replace />; // Redirect to login if not authenticated
  }
  return (
    <div>
      <Header></Header>
      <Outlet></Outlet>
    </div>
  );
}
