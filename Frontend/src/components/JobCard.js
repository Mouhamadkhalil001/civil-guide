// Import React library
import React from "react";
// Import the CSS styles for this component
import "../styles/JobCard.css";

/**
 * JobCard Component
 * 
 * This component displays a single job listing in a card format.
 * It shows all the important information about a job including:
 * - Job title
 * - Company name and location
 * - Salary (if available)
 * - Job description
 * - Job type and category
 * 
 * @param {Object} props - Component props
 * @param {Object} props.job - The job object containing all job information
 */
const JobCard = (props) => {
  // Extract the job data from props
  // Props are data passed from parent component (like Jobs page)
  const job = props.job;

  // Return the JSX (HTML structure) for the job card
  return (
    <div className="job-card">
      {/* Job Title - the main heading of the card */}
      <h3 className="job-card-title">{job.title}</h3>
      
      {/* Company and Location - shown together with a dot separator */}
      <p className="job-card-subtitle">
        {job.company} · {job.location}
      </p>
      
      {/* Salary Information - only shown if salary exists */}
      {/* The && means "if job.salary exists, then show this div" */}
      {job.salary && (
        <div className="job-card-salary">
          <span className="job-card-salary-icon">💰</span>
          <span className="job-card-salary-text">{job.salary}</span>
        </div>
      )}
      
      {/* Job Description - explains what the job involves */}
      <p className="job-card-description">{job.description}</p>
      
      {/* Footer Section - shows job type and category as tags */}
      <div className="job-card-footer">
        {/* Job Type Badge - e.g., "Full Time", "Part Time" */}
        <span className="job-card-type">{job.type}</span>
        
        {/* Job Category - e.g., "IT / Development" */}
        <span className="job-card-category">{job.category}</span>
      </div>
    </div>
  );
};

// Export the component so it can be imported and used in other files
export default JobCard;
