// Import React library
import React, { useState, useEffect } from "react";
// Import Link component for navigation between pages
import { Link } from "react-router-dom";
// Import CSS styles for this page
import "../styles/Home.css";
// Import JobCard component to display job listings
import JobCard from "../components/JobCard";
// Import API function to fetch jobs
import { getJobs } from "../api";

/**
 * Home Page Component
 * 
 * This is the main landing page of the website.
 * It shows:
 * - A hero section with welcome message
 * - Featured job listings (first 3 jobs)
 */
const Home = () => {
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

  // Get first 3 jobs as featured
  const featured = [];
  for (let i = 0; i < 3 && i < jobs.length; i++) {
    featured.push(jobs[i]);
  }

  // Return the JSX (HTML structure) for the home page
  return (
    <div className="home-page">
      {/* Hero Section - the big welcome section at the top */}
      <section className="home-hero">
        <div className="home-hero-content">
          {/* Main welcome heading */}
          <h1 className="home-hero-title">
            Welcome to the <span className="highlight">Civil Guide</span>
          </h1>
          
          {/* First paragraph explaining what the site is */}
          <p className="home-hero-text">
            Join a simple civil directory that helps you explore public
            services and job opportunities easily.
          </p>
          
          {/* Second paragraph with more details */}
          <p className="home-hero-text">
            You can quickly browse available positions, see basic details,
            and focus on roles that match students or fresh graduates.
          </p>
          
          {/* Action buttons - links to other pages */}
          <div className="home-hero-actions">
            {/* Primary button - links to jobs page */}
            <Link to="/jobs" className="primary-button">
              Browse all jobs
            </Link>
            
            {/* Secondary button - links to about page */}
            <Link to="/about" className="secondary-button">
              Learn more
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section - shows first 3 jobs */}
      <section className="home-featured">
        {/* Section header with title and subtitle */}
        <div className="section-header">
          <h2 className="section-title">Featured jobs</h2>
          <p className="section-subtitle">Discover the latest opportunities</p>
        </div>
        
        {/* Grid container for job cards */}
        <div className="job-grid">
          {loading ? (
            <p>Loading jobs...</p>
          ) : featured.length === 0 ? (
            <p>No jobs available</p>
          ) : (
            featured.map((job) => {
              return <JobCard key={job.id} job={job} />;
            })
          )}
        </div>
      </section>
    </div>
  );
};

// Export the component so it can be used in App.js
export default Home;
