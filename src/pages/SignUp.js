// Import React and useState hook for form state management
import React, { useState } from "react";
// Import Link for navigation
import { Link } from "react-router-dom";
// Import CSS styles
import "../styles/Auth.css";
// Import reusable form components
import FormInput from "../components/FormInput";

/**
 * Sign Up Page Component
 * 
 * This page allows users to create a new account.
 * Features:
 * - Full name, email, password, and confirm password fields
 * - Password matching validation
 * - Terms and conditions checkbox
 * - Link to sign in page
 */
const SignUp = () => {
  // State to store all form fields
  const [form, setForm] = useState({
    fullName: "",        // User's full name
    email: "",           // User's email address
    password: "",        // User's password
    confirmPassword: ""   // Password confirmation (must match password)
  });

  /**
   * Handle input changes
   * Updates form state when user types in any field
   * @param {Event} event - The change event
   */
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  /**
   * Handle form submission
   * Validates passwords match before submitting
   * @param {Event} event - The submit event
   */
  const handleSubmit = (event) => {
    // Prevent page refresh
    event.preventDefault();
    
    // Check if passwords match
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;  // Stop here if passwords don't match
    }

    // Show success message (in real app, this would create account)
    alert(
      "Account created successfully!\n\n" + JSON.stringify(form, null, 2)
    );
    
    // Clear the form after successful submission
    setForm({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: ""
    });
  };

  // Return the JSX for the sign up page
  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Header section */}
        <div className="auth-header">
          <h1 className="auth-title">Sign Up</h1>
          <p className="auth-subtitle">Create a new account to get started.</p>
        </div>

        {/* Sign up form */}
        <form onSubmit={handleSubmit} className="auth-form">
          {/* Full Name field */}
          <FormInput
            id="fullName"
            name="fullName"
            type="text"
            label="Full Name"
            icon="👤"
            placeholder="Enter your full name"
            value={form.fullName}
            onChange={handleChange}
            required
          />

          {/* Email field */}
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

          {/* Password field */}
          <FormInput
            id="password"
            name="password"
            type="password"
            label="Password"
            icon="🔒"
            placeholder="Create a password"
            value={form.password}
            onChange={handleChange}
            required
          />

          {/* Confirm Password field - must match password */}
          <FormInput
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            icon="🔒"
            placeholder="Confirm your password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />

          {/* Terms and conditions checkbox */}
          <div className="auth-options">
            <label className="checkbox-label">
              <input type="checkbox" required />
              <span>I agree to the Terms and Conditions</span>
            </label>
          </div>

          {/* Submit button */}
          <button type="submit" className="auth-button">
            <span>Create Account</span>
            <span className="submit-icon">→</span>
          </button>

          {/* Divider */}
          <div className="auth-divider">
            <span>or</span>
          </div>

          {/* Link to sign in page */}
          <p className="auth-footer-text">
            Already have an account?{" "}
            <Link to="/signin" className="auth-link">
              Sign in here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

