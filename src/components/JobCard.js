import React from "react";
import "../styles/JobCard.css";

// This component displays a single job card with all the job information
const JobCard = (props) => {
  // Get the job data from props
  const job = props.job;

  return (
    <div className="job-card">
      {/* Job title */}
      <h3 className="job-card-title">{job.title}</h3>
      
      {/* Company name and location */}
      <p className="job-card-subtitle">
        {job.company} · {job.location}
      </p>
      
      {/* Job description */}
      <p className="job-card-description">{job.description}</p>
      
      {/* Footer with job type and category */}
      <div className="job-card-footer">
        <span className="job-card-type">{job.type}</span>
        <span className="job-card-category">{job.category}</span>
      </div>
    </div>
  );
};

export default JobCard;
