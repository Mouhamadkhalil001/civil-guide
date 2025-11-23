import React from "react";
import { Link } from "react-router-dom";
import "../styles/NotFound.css";

// 404 error page - shown when user visits a page that doesn't exist
const NotFound = () => {
  return (
    <div className="notfound">
      <h1 className="notfound-title">Page not found</h1>
      <p className="notfound-text">
        The page you are looking for does not exist.
      </p>
      {/* Link to go back to homepage */}
      <Link to="/" className="primary-button">
        Back to home
      </Link>
    </div>
  );
};

export default NotFound;
