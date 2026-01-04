// Import React library
import React from "react";
// Import CSS styles for this page
import "../styles/About.css";
// Import reusable components
import PageHeader from "../components/PageHeader";

/**
 * About Page Component
 * 
 * This page provides information about the Civil Guide project.
 * It displays:
 * - Project mission
 * - Project goals
 * - Technology used
 */
const About = () => {
  // Return the JSX for the about page
  return (
    <div className="about-page">
      {/* Page header section */}
      <PageHeader
        title="About the Civil Guide"
        subtitle="Your gateway to civil services and opportunities"
        className="about-hero"
      />

      {/* Content cards section - displays information in cards */}
      <div className="about-content">
        {/* Mission card */}
        <div className="about-card">
          <div className="about-card-icon">📋</div>
          <h2 className="about-card-title">Our Mission</h2>
          <p className="about-text">
            The Civil Guide is a simple directory designed to help users
            navigate and find information about different civil services and
            public job opportunities in Lebanon.
          </p>
        </div>

        {/* Goal card */}
        <div className="about-card">
          <div className="about-card-icon">🎯</div>
          <h2 className="about-card-title">Our Goal</h2>
          <p className="about-text">
            It aims to make it easier for citizens to discover what services
            are available, how to reach the right place, and which basic
            jobs exist in the public or semi-public sector.
          </p>
        </div>

        {/* Technology card */}
        <div className="about-card">
          <div className="about-card-icon">💻</div>
          <h2 className="about-card-title">Technology</h2>
          <p className="about-text">
            This project focuses only on the frontend using React, without
            any real database, to keep things clear and suitable for
            beginners.
          </p>
        </div>
      </div>
    </div>
  );
};

// Export the component
export default About;
