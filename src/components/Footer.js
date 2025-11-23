import React from "react";

// Footer component that appears at the bottom of every page
const Footer = () => {
  // Get the current year for the copyright
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div>
        <div>&copy; {currentYear} Civil Guide</div>
        <div>Simple React project for a civil jobs directory.</div>
      </div>
    </footer>
  );
};

export default Footer;
