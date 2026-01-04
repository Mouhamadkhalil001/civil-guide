// Import React library
import React, { useState, useEffect } from "react";
// Import the CSS styles for this page
import "../styles/Jobs.css";
// Import the JobCard component to display each job
import JobCard from "../components/JobCard";
// Import API function to fetch jobs
import { getJobs } from "../api";
// Import the custom hook for job filtering
import { useJobFilters } from "../hooks/useJobFilters";

// Jobs page component - shows all available jobs with filters
const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch jobs from backend when component loads
  useEffect(() => {
    getJobs()
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading jobs:", err);
        setLoading(false);
      });
  }, []);

  // Use the reusable hook for all filter logic
  const {
    searchText,
    location,
    category,
    type,
    locations,
    categories,
    types,
    handleSearchTextChange,
    handleLocationChange,
    handleCategoryChange,
    handleTypeChange,
    filteredJobs
  } = useJobFilters(jobs);

  // Return the JSX (HTML-like code) for this component
  return (
    <div className="jobs-page">
      {/* Page header with title and job count */}
      <div className="jobs-header">
        <div>
          {/* Main page title */}
          <h1 className="jobs-title">Jobs Directory</h1>
          {/* Subtitle text */}
          <p className="jobs-subtitle">Find your next opportunity</p>
        </div>
        
        {/* Show job count badge only if there are results */}
        {filteredJobs.length > 0 && (
          <div className="jobs-count-badge">
            <span className="jobs-count-number">{filteredJobs.length}</span>
            <span className="jobs-count-text">
              {/* Show "Job" for 1, "Jobs" for multiple */}
              {filteredJobs.length === 1 ? "Job" : "Jobs"} Found
            </span>
          </div>
        )}
      </div>

      {/* Filter section - all the search and filter inputs */}
      <div className="jobs-filters">
        {/* Keyword search input */}
        <div className="jobs-field">
          <label htmlFor="searchText" className="jobs-label">
            <span className="jobs-label-icon">🔍</span>
            Keyword
          </label>
          <input
            id="searchText"
            type="text"
            className="jobs-input"
            placeholder="Search by title, company, or category"
            value={searchText}
            onChange={handleSearchTextChange}
          />
        </div>

        {/* Location filter dropdown */}
        <div className="jobs-field">
          <label htmlFor="location" className="jobs-label">
            <span className="jobs-label-icon">📍</span>
            Location
          </label>
          <select
            id="location"
            className="jobs-select"
            value={location}
            onChange={handleLocationChange}
          >
            <option value="all">All Lebanon</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Job type filter dropdown */}
        <div className="jobs-field">
          <label htmlFor="jobType" className="jobs-label">
            <span className="jobs-label-icon">💼</span>
            Job Type
          </label>
          <select
            id="jobType"
            className="jobs-select"
            value={type}
            onChange={handleTypeChange}
          >
            <option value="all">All Types</option>
            {/* Dynamically create options from available job types */}
            {types.map((jobType) => (
              <option key={jobType} value={jobType}>
                {jobType}
              </option>
            ))}
          </select>
        </div>

        {/* Category filter dropdown */}
        <div className="jobs-field">
          <label htmlFor="category" className="jobs-label">
            <span className="jobs-label-icon">📂</span>
            Category
          </label>
          <select
            id="category"
            className="jobs-select"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="all">All Categories</option>
            {/* Dynamically create options from available categories */}
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Show different content based on whether we have results */}
      {loading ? (
        // Loading state
        <div className="jobs-empty">
          <p className="jobs-message">Loading jobs...</p>
        </div>
      ) : filteredJobs.length === 0 ? (
        // Empty state - shown when no jobs match the filters
        <div className="jobs-empty">
          <div className="jobs-empty-icon">🔍</div>
          <p className="jobs-message">No jobs match your search.</p>
          <p className="jobs-message-hint">Try adjusting your filters</p>
        </div>
      ) : (
        // Job list - shown when we have matching jobs
        <div className="jobs-list">
          {/* Loop through filtered jobs and create a JobCard for each */}
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Jobs;
