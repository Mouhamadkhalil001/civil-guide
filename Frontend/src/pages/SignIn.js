// Import React and useState hook for form state management
import React, { useState } from "react";
// Import Link and useNavigate for navigation
import { Link, useNavigate } from "react-router-dom";
// Import CSS styles for authentication pages
import "../styles/Auth.css";
// Import reusable form components
import FormInput from "../components/FormInput";
// Import login API function
import { login as apiLogin } from "../api";
// Import auth context
import { useAuth } from "../context/AuthContext";

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
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const [loading, setLoading] = useState(false);
  
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
  const handleSubmit = async (event) => {
    // Prevent page refresh
    event.preventDefault();
    setLoading(true);
    
    try {
      const response = await apiLogin(form);
      
      // Save user to context and localStorage
      authLogin(response.user);
      
      // Redirect based on role (no alert, silent login)
      if (response.user.role === 'admin') {
        navigate('/');
      } else {
        navigate('/jobs');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Wrong email or password. Please try again.');
    } finally {
      setLoading(false);
    }
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
          <button type="submit" className="auth-button" disabled={loading}>
            <span>{loading ? 'Signing in...' : 'Sign In'}</span>
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

