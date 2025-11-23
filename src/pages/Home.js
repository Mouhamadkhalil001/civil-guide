import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import JobCard from "../components/JobCard";
import { jobs } from "../data/jobs";

// This is the homepage component
const Home = () => {
  // Get the first 3 jobs to show as featured
  const featured = [];
  for (let i = 0; i < 3 && i < jobs.length; i++) {
    featured.push(jobs[i]);
  }

  return (
    <div>
      {/* Hero section at the top */}
      <section className="home-hero">
        <h1 className="home-hero-title">Welcome to the Civil Guide</h1>
        <p className="home-hero-text">
          Join a simple civil directory that helps you explore public
          services and job opportunities easily.
        </p>
        <p className="home-hero-text">
          You can quickly browse available positions, see basic details,
          and focus on roles that match students or fresh graduates.
        </p>
        <Link to="/jobs" className="primary-button">
          Browse all jobs
        </Link>
      </section>

      {/* Featured jobs section */}
      <section>
        <h2 className="section-title">Featured jobs</h2>
        <div className="job-grid">
          {featured.map((job) => {
            return <JobCard key={job.id} job={job} />;
          })}
        </div>
      </section>
    </div>
  );
};

export default Home;
