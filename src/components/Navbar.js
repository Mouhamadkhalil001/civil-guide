import React from "react";
import { NavLink } from "react-router-dom";

// Navigation bar component that appears at the top of every page
const Navbar = () => {
  // Function to determine which CSS class to use for navigation links
  // If the link is active (current page), add the active class
  const getLinkClass = (navData) => {
    if (navData.isActive) {
      return "nav-link nav-link-active";
    } else {
      return "nav-link";
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Site logo/brand name */}
        <div className="navbar-brand">Civil Guide</div>
        
        {/* Navigation links */}
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
      </div>
    </header>
  );
};

export default Navbar;
