import React from 'react'
import { Link, Outlet } from 'react-router-dom'
export default function About() {
  return (
    <div>
      <h1>About</h1>
      <nav>
        <ul>
          <li><Link to="help">Help</Link></li>
          <li><Link to="contact">Contact</Link></li>
        </ul>
      </nav>
      <Outlet />
    </div>
  
  )
}
