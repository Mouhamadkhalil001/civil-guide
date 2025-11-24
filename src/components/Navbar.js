// Import React library and hooks
import React, { useState, useEffect, useRef } from "react";
// Import NavLink and Link for navigation
import { NavLink, Link, useLocation } from "react-router-dom";

/**
 * Navbar Component
 * 
 * This component creates the navigation bar that appears at the top of every page.
 * It includes:
 * - Site logo/brand name (clickable, links to home)
 * - Navigation links to all main pages
 * - Active link highlighting (shows which page you're on)
 * - Mobile hamburger menu for responsive design
 * - Scroll lock when menu is open
 * - Click outside to close menu
 */
const Navbar = () => {
  // State to manage mobile menu open/close
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Ref for the navbar to detect clicks outside
  const navRef = useRef(null);
  // Get current location to close menu on route change
  const location = useLocation();

  /**
   * Function to toggle mobile menu
   */
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  /**
   * Function to close mobile menu
   */
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  /**
   * Lock/unlock body scroll when menu is open/closed
   */
  useEffect(() => {
    if (isMenuOpen) {
      // Lock scroll when menu is open
      document.body.style.overflow = "hidden";
    } else {
      // Unlock scroll when menu is closed
      document.body.style.overflow = "";
    }

    // Cleanup: always unlock scroll when component unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  /**
   * Close menu when route changes
   */
  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  /**
   * Handle clicks outside the navbar to close menu
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If menu is open and click is outside navbar, close menu
      if (isMenuOpen && navRef.current && !navRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    // Cleanup: remove event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMenuOpen]);

  /**
   * Function to determine CSS class for navigation links
   * @param {Object} navData - Navigation data from React Router
   * @param {boolean} navData.isActive - True if this link matches current URL
   * @returns {string} CSS class name(s) for the link
   */
  const getLinkClass = ({ isActive }) =>
    // If link is active (current page), add both classes
    // Otherwise, just use the base nav-link class
    isActive ? "nav-link nav-link-active" : "nav-link";

  // Return the JSX for the navbar
  return (
    <header className="navbar" ref={navRef}>
      <div className="navbar-inner">
        {/* Site Logo/Brand - clickable, links to home */}
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <span className="navbar-brand-icon">📋</span>
          <span className="navbar-brand-text">Civil Guide</span>
        </Link>
        
        {/* Hamburger menu button - only visible on mobile */}
        <button
          className="navbar-toggle"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <span className={`hamburger-icon ${isMenuOpen ? "active" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
        
        {/* Navigation Menu - contains all the page links */}
        <nav className={`navbar-nav ${isMenuOpen ? "open" : ""}`}>
          <ul className="nav-links">
            {/* Home link - "end" prop means it only matches exact "/" path */}
            <li>
              <NavLink to="/" end className={getLinkClass} onClick={closeMenu}>
                Home
              </NavLink>
            </li>
            
            {/* Jobs page link */}
            <li>
              <NavLink to="/jobs" className={getLinkClass} onClick={closeMenu}>
                Jobs
              </NavLink>
            </li>
            
            {/* About page link */}
            <li>
              <NavLink to="/about" className={getLinkClass} onClick={closeMenu}>
                About
              </NavLink>
            </li>
            
            {/* Contact page link */}
            <li>
              <NavLink to="/contact" className={getLinkClass} onClick={closeMenu}>
                Contact
              </NavLink>
            </li>
            
            {/* Sign In page link */}
            <li>
              <NavLink to="/signin" className={getLinkClass} onClick={closeMenu}>
                Sign In
              </NavLink>
            </li>
            
            {/* Sign Up page link */}
            <li>
              <NavLink to="/signup" className={getLinkClass} onClick={closeMenu}>
                Sign Up
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

// Export the component
export default Navbar;
