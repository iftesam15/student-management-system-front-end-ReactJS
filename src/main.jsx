import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import "./components/Login/Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./store/auth";
ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
