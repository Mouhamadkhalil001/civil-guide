import React from "react";
import { Link } from "react-router-dom";
import "../styles/NotFound.css";

// 404 error page - shown when user visits a page that doesn't exist
const NotFound = () => {
  return (
    <div className="notfound-page">
      <div className="notfound-content">
        <div className="notfound-icon">404</div>
        <h1 className="notfound-title">Page Not Found</h1>
        <p className="notfound-text">
          Oops! The page you are looking for does not exist.
        </p>
        <p className="notfound-hint">
          It might have been moved, deleted, or the URL might be incorrect.
        </p>
        <div className="notfound-actions">
          <Link to="/" className="primary-button">
            Go to Homepage
          </Link>
          <Link to="/jobs" className="secondary-button">
            Browse Jobs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
