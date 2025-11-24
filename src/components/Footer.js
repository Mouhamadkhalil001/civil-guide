import React from "react";
import { Link } from "react-router-dom";

// Footer component that appears at the bottom of every page
const Footer = () => {
  // Get the current year for the copyright
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">Civil Guide</h3>
          <p className="footer-description">
            Your simple directory for civil services and job opportunities in Lebanon.
          </p>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
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
      
      <div className="footer-bottom">
        <p className="footer-copyright">
          &copy; {currentYear} Civil Guide. All rights reserved.
        </p>
        <p className="footer-note">
          Simple React project for a civil jobs directory.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
