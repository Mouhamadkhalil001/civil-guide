import React from "react";
import "../styles/Jobs.css";
import JobCard from "../components/JobCard";
import SearchFilters from "../components/SearchFilters";
import { useJobFilters } from "../hooks/useJobFilters";
import { jobs } from "../data/jobs";

// This is the main jobs listing page
const Jobs = () => {
  // Get all the filter logic and state from our custom hook
  const filterData = useJobFilters(jobs);

  // Extract the values we need from the hook
  const searchText = filterData.searchText;
  const location = filterData.location;
  const category = filterData.category;
  const type = filterData.type;
  const locations = filterData.locations;
  const categories = filterData.categories;
  const types = filterData.types;
  const handleSearchTextChange = filterData.handleSearchTextChange;
  const handleLocationChange = filterData.handleLocationChange;
  const handleCategoryChange = filterData.handleCategoryChange;
  const handleTypeChange = filterData.handleTypeChange;
  const handleClearFilters = filterData.handleClearFilters;
  const hasActiveFilters = filterData.hasActiveFilters;
  const filteredJobs = filterData.filteredJobs;

  // Figure out the job count text
  let jobCountText = "";
  if (filteredJobs.length === 0) {
    // No jobs found, we'll show a message later
  } else if (filteredJobs.length === 1) {
    jobCountText = "1 job found";
  } else {
    jobCountText = filteredJobs.length + " jobs found";
  }

  return (
    <div>
      {/* Page header with title and job count */}
      <div className="jobs-header">
        <h1 className="jobs-title">Jobs directory</h1>
        {filteredJobs.length > 0 && (
          <p className="jobs-count">{jobCountText}</p>
        )}
      </div>

      {/* The filter component */}
      <SearchFilters
        searchText={searchText}
        location={location}
        category={category}
        type={type}
        locations={locations}
        categories={categories}
        types={types}
        onSearchTextChange={handleSearchTextChange}
        onLocationChange={handleLocationChange}
        onCategoryChange={handleCategoryChange}
        onTypeChange={handleTypeChange}
        onClearFilters={handleClearFilters}
      />

      {/* Show message if no jobs found */}
      {filteredJobs.length === 0 ? (
        <div className="jobs-empty">
          <p className="jobs-message">No jobs match your search.</p>
          {hasActiveFilters && (
            <button
              type="button"
              className="clear-filters-button"
              onClick={handleClearFilters}
            >
              Clear all filters
            </button>
          )}
        </div>
      ) : (
        /* Show the list of job cards */
        <div className="jobs-list">
          {filteredJobs.map((job) => {
            return <JobCard key={job.id} job={job} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Jobs;
