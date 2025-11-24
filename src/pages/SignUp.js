import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Auth.css";

const SignUp = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    alert(
      "Account created successfully!\n\n" + JSON.stringify(form, null, 2)
    );
    setForm({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: ""
    });
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1 className="auth-title">Sign Up</h1>
          <p className="auth-subtitle">Create a new account to get started.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-field">
            <label htmlFor="fullName" className="form-label">
              <span className="form-label-icon">👤</span>
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              className="form-input"
              placeholder="Enter your full name"
              value={form.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="email" className="form-label">
              <span className="form-label-icon">✉️</span>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-input"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="password" className="form-label">
              <span className="form-label-icon">🔒</span>
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-input"
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="confirmPassword" className="form-label">
              <span className="form-label-icon">🔒</span>
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className="form-input"
              placeholder="Confirm your password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-options">
            <label className="checkbox-label">
              <input type="checkbox" required />
              <span>I agree to the Terms and Conditions</span>
            </label>
          </div>

          <button type="submit" className="auth-button">
            <span>Create Account</span>
            <span className="submit-icon">→</span>
          </button>

          <div className="auth-divider">
            <span>or</span>
          </div>

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

