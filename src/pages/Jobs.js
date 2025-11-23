import React, { useState, useMemo } from "react";
import "../styles/Jobs.css";
import JobCard from "../components/JobCard";
import { jobs } from "../data/jobs";

const Jobs = () => {
  const [searchText, setSearchText] = useState("");
  const [location, setLocation] = useState("all");
  const [jobType, setJobType] = useState("all");
  const [category, setCategory] = useState("all");

  // Get unique job types from jobs
  const jobTypes = useMemo(() => {
    const types = [];
    jobs.forEach((job) => {
      if (!types.includes(job.type)) {
        types.push(job.type);
      }
    });
    return types.sort();
  }, []);

  // Get unique categories from jobs
  const categories = useMemo(() => {
    const cats = [];
    jobs.forEach((job) => {
      if (!cats.includes(job.category)) {
        cats.push(job.category);
      }
    });
    return cats.sort();
  }, []);

  const handleTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleJobTypeChange = (event) => {
    setJobType(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const filteredJobs = jobs.filter((job) => {
    const text = searchText.toLowerCase();
    const matchesText =
      job.title.toLowerCase().includes(text) ||
      job.company.toLowerCase().includes(text) ||
      job.category.toLowerCase().includes(text);

    const matchesLocation =
      location === "all" ||
      job.location.toLowerCase() === location.toLowerCase();

    const matchesJobType =
      jobType === "all" ||
      job.type.toLowerCase() === jobType.toLowerCase();

    const matchesCategory =
      category === "all" ||
      job.category.toLowerCase() === category.toLowerCase();

    return matchesText && matchesLocation && matchesJobType && matchesCategory;
  });

  return (
    <div className="jobs-page">
      <div className="jobs-header">
        <div>
          <h1 className="jobs-title">Jobs Directory</h1>
          <p className="jobs-subtitle">Find your next opportunity</p>
        </div>
        {filteredJobs.length > 0 && (
          <div className="jobs-count-badge">
            <span className="jobs-count-number">{filteredJobs.length}</span>
            <span className="jobs-count-text">
              {filteredJobs.length === 1 ? "Job" : "Jobs"} Found
            </span>
          </div>
        )}
      </div>

      <div className="jobs-filters">
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
            onChange={handleTextChange}
          />
        </div>

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
            <option value="Beirut">Beirut</option>
            <option value="Saida">Saida</option>
            <option value="Tripoli">Tripoli</option>
            <option value="Zahle">Zahle</option>
            <option value="Online / Remote">Online / Remote</option>
          </select>
        </div>

        <div className="jobs-field">
          <label htmlFor="jobType" className="jobs-label">
            <span className="jobs-label-icon">💼</span>
            Job Type
          </label>
          <select
            id="jobType"
            className="jobs-select"
            value={jobType}
            onChange={handleJobTypeChange}
          >
            <option value="all">All Types</option>
            {jobTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredJobs.length === 0 ? (
        <div className="jobs-empty">
          <div className="jobs-empty-icon">🔍</div>
          <p className="jobs-message">No jobs match your search.</p>
          <p className="jobs-message-hint">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="jobs-list">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Jobs;
