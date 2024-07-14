import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <header >
    <nav>
      <ul style= {
    {
      display: "flex",
      listStyle:"none",
      gap: 20 + "px",
      justifyContent: "start",
      padding: 10 + "px",
    }
  }>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/students">Students</Link>
        </li>
        <li>
          <Link to="/enrollments">Enrollments</Link>
        </li>
        <li>
          <Link to="/instructors">Instructors</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/logout">Logout</Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
