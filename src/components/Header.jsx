import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/students">Students</Link></li>
        <li><Link to="/enrollments">Enrollments</Link></li>
      </ul>
    </nav>
  </header>
);

export default Header;
