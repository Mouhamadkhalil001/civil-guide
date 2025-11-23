import React from "react";
import "../styles/About.css";

// About page component
const About = () => {
  return (
    <div>
      <h1 className="about-title">About the Civil Guide</h1>
      <p className="about-text">
        The Civil Guide is a simple directory designed to help users
        navigate and find information about different civil services and
        public job opportunities in Lebanon.
      </p>
      <p className="about-text">
        It aims to make it easier for citizens to discover what services
        are available, how to reach the right place, and which basic
        jobs exist in the public or semi-public sector.
      </p>
      <p className="about-text">
        This project focuses only on the frontend using React, without
        any real database, to keep things clear and suitable for
        beginners.
      </p>
    </div>
  );
};

export default About;
