import React, { useState } from "react";
import "../styles/Jobs.css";
import JobCard from "../components/JobCard";
import { jobs } from "../data/jobs";

const Jobs = () => {
  const [searchText, setSearchText] = useState("");
  const [location, setLocation] = useState("all");

  const handleTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
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

    return matchesText && matchesLocation;
  });

  return (
    <div>
      <h1 className="jobs-title">Jobs directory</h1>

      <div className="jobs-filters">
        <div className="jobs-field">
          <label htmlFor="searchText">Keyword</label>
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
          <label htmlFor="location">Location</label>
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
      </div>

      {filteredJobs.length === 0 ? (
        <p className="jobs-message">No jobs match your search.</p>
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
