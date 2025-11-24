import React from "react";

// Reusable page header component
const PageHeader = ({ title, subtitle, className = "" }) => {
  return (
    <div className={`page-header ${className}`}>
      <h1 className="page-header-title">{title}</h1>
      {subtitle && <p className="page-header-subtitle">{subtitle}</p>}
    </div>
  );
};

export default PageHeader;

