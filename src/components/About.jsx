import React from "react";
import "../styles/About.css"; // Make sure to import the CSS file for styling

export default function About() {
  return (
    <div className="banner">
      <div className="text-content">
        <h1>
          Happy <span>Chinese New Year</span>, 20% discount for you today
        </h1>
        <button>Subscribe Course</button>
      </div>
      <img
        src="https://via.placeholder.com/150"
        alt="Student"
        className="student-image"
      />
      <div className="shapes">
        <div className="shape shape1"></div>
        <div className="shape shape2"></div>
        <div className="shape shape3"></div>
        <div className="shape shape4"></div>
      </div>
    </div>
  );
}
