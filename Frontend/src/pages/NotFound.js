// Import React library
import React from "react";
// Import Link for navigation
import { Link } from "react-router-dom";
// Import CSS styles
import "../styles/NotFound.css";

/**
 * NotFound (404) Page Component
 * 
 * This page is shown when a user visits a URL that doesn't exist.
 * It provides:
 * - Error message
 * - Helpful explanation
 * - Links to navigate back to main pages
 */
const NotFound = () => {
  // Return the JSX for the 404 page
  return (
    <div className="notfound-page">
      <div className="notfound-content">
        {/* Large 404 number display */}
        <div className="notfound-icon">404</div>
        
        {/* Error title */}
        <h1 className="notfound-title">Page Not Found</h1>
        
        {/* Error message */}
        <p className="notfound-text">
          Oops! The page you are looking for does not exist.
        </p>
        
        {/* Helpful hint */}
        <p className="notfound-hint">
          It might have been moved, deleted, or the URL might be incorrect.
        </p>
        
        {/* Action buttons to navigate away */}
        <div className="notfound-actions">
          {/* Link to homepage */}
          <Link to="/" className="primary-button">
            Go to Homepage
          </Link>
          
          {/* Link to jobs page */}
          <Link to="/jobs" className="secondary-button">
            Browse Jobs
          </Link>
        </div>
      </div>
    </div>
  );
};

// Export the component
export default NotFound;
