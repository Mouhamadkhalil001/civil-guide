import React from "react";
import { NavLink } from "react-router-dom";

// Navigation bar component that appears at the top of every page
const Navbar = () => {
  const getLinkClass = ({ isActive }) =>
    isActive ? "nav-link nav-link-active" : "nav-link";

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Site logo/brand name */}
        <div className="navbar-brand">
          <span className="navbar-brand-icon">📋</span>
          <span className="navbar-brand-text">Civil Guide</span>
        </div>
        
        {/* Navigation links */}
        <nav className="navbar-nav">
          <ul className="nav-links">
            <li>
              <NavLink to="/" end className={getLinkClass}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/jobs" className={getLinkClass}>
                Jobs
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={getLinkClass}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={getLinkClass}>
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
