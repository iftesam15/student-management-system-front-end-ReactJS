import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Students from "./pages/Students";
import EditStudent from "./pages/EditStudent";
import Header from "./components/Header";
import "./index.css";
const App = () => (
  <div className="app-container">
    <Header />
    <div className="container">
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<Students />} />
          <Route path="/students/new" element={<EditStudent />} />
          <Route path="/students/edit/:id" element={<EditStudent />} />
        </Routes>
      </div>
    </div>
  </div>
);

export default App;
