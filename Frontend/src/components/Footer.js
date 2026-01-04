// Import React library
import React from "react";
// Import Link component for navigation
import { Link } from "react-router-dom";

/**
 * Footer Component
 * 
 * This component creates the footer that appears at the bottom of every page.
 * It includes:
 * - Site description
 * - Quick navigation links
 * - Copyright information
 */
const Footer = () => {
  // Get the current year using JavaScript Date object
  // This ensures copyright always shows current year automatically
  const currentYear = new Date().getFullYear();

  // Return the JSX for the footer
  return (
    <footer className="footer">
      {/* Main footer content area */}
      <div className="footer-content">
        {/* Left section - site info */}
        <div className="footer-section">
          <h3 className="footer-title">Civil Guide</h3>
          <p className="footer-description">
            Your simple directory for civil services and job opportunities in Lebanon.
          </p>
        </div>
        
        {/* Right section - quick links */}
        <div className="footer-section">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            {/* List of navigation links */}
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/jobs">Jobs</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/signin">Sign In</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Bottom section - copyright and note */}
      <div className="footer-bottom">
        {/* Copyright text with dynamic year */}
        <p className="footer-copyright">
          &copy; {currentYear} Civil Guide. All rights reserved.
        </p>
        {/* Additional note about the project */}
        <p className="footer-note">
          Simple React project for a civil jobs directory.
        </p>
      </div>
    </footer>
  );
};

// Export the component
export default Footer;
