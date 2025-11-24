// Import React and useState hook for form state management
import React, { useState } from "react";
// Import Link for navigation to other pages
import { Link } from "react-router-dom";
// Import CSS styles for authentication pages
import "../styles/Auth.css";
// Import reusable form components
import FormInput from "../components/FormInput";

/**
 * Sign In Page Component
 * 
 * This page allows users to sign in to their account.
 * Features:
 * - Email and password input fields
 * - Remember me checkbox
 * - Link to sign up page
 * - Form validation
 */
const SignIn = () => {
  // State to store the form data
  // Starts with empty email and password
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  /**
   * Handle changes in form inputs
   * Updates the form state when user types
   * @param {Event} event - The change event from input
   */
  const handleChange = (event) => {
    // Extract name and value from the input that changed
    const { name, value } = event.target;
    
    // Update form state, keeping other fields unchanged
    setForm((previous) => ({
      ...previous,
      [name]: value  // Update the field that changed
    }));
  };

  /**
   * Handle form submission
   * Runs when user clicks the sign in button
   * @param {Event} event - The submit event
   */
  const handleSubmit = (event) => {
    // Prevent page refresh
    event.preventDefault();
    
    // Show success message (in real app, this would authenticate user)
    alert(
      "Sign in successful!\n\n" + JSON.stringify(form, null, 2)
    );
    
    // Clear the form after submission
    setForm({
      email: "",
      password: ""
    });
  };

  // Return the JSX for the sign in page
  return (
    <div className="auth-page">
      {/* Main container for the form */}
      <div className="auth-container">
        {/* Header section with title */}
        <div className="auth-header">
          <h1 className="auth-title">Sign In</h1>
          <p className="auth-subtitle">Welcome back! Please sign in to your account.</p>
        </div>

        {/* Sign in form */}
        <form onSubmit={handleSubmit} className="auth-form">
          {/* Email input field */}
          <FormInput
            id="email"
            name="email"
            type="email"
            label="Email"
            icon="✉️"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
          />

          {/* Password input field */}
          <FormInput
            id="password"
            name="password"
            type="password"
            label="Password"
            icon="🔒"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            required
          />

          {/* Options row - remember me checkbox and forgot password link */}
          <div className="auth-options">
            <label className="checkbox-label">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password" className="auth-link">
              Forgot password?
            </Link>
          </div>

          {/* Submit button */}
          <button type="submit" className="auth-button">
            <span>Sign In</span>
            <span className="submit-icon">→</span>
          </button>

          {/* Divider with "or" text */}
          <div className="auth-divider">
            <span>or</span>
          </div>

          {/* Link to sign up page */}
          <p className="auth-footer-text">
            Don't have an account?{" "}
            <Link to="/signup" className="auth-link">
              Sign up here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;

