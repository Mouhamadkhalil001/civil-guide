// Import React and useState hook for form state management
import React, { useState } from "react";
// Import Link and useNavigate for navigation
import { Link, useNavigate } from "react-router-dom";
// Import CSS styles
import "../styles/Auth.css";
// Import reusable form components
import FormInput from "../components/FormInput";
// Import register API function
import { register } from "../api";

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
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
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
  const handleSubmit = async (event) => {
    // Prevent page refresh
    event.preventDefault();
    
    // Check if passwords match
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;  // Stop here if passwords don't match
    }

    setLoading(true);
    
    try {
      const userData = {
        name: form.fullName,
        email: form.email,
        password: form.password
        // role defaults to 'seeker' on backend
      };
      
      await register(userData);
      
      alert('Account created successfully! Please sign in.');
      
      // Redirect to sign in page
      navigate('/signin');
    } catch (error) {
      console.error('Registration error:', error);
      // Check if email already exists (409 = conflict)
      if (error.response?.status === 409) {
        alert('This email is already registered. Please use a different email or sign in.');
      } else {
        alert('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
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
          <button type="submit" className="auth-button" disabled={loading}>
            <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
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

