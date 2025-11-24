import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Auth.css";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: ""
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
    alert(
      "Sign in successful!\n\n" + JSON.stringify(form, null, 2)
    );
    setForm({
      email: "",
      password: ""
    });
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1 className="auth-title">Sign In</h1>
          <p className="auth-subtitle">Welcome back! Please sign in to your account.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
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
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-options">
            <label className="checkbox-label">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password" className="auth-link">
              Forgot password?
            </Link>
          </div>

          <button type="submit" className="auth-button">
            <span>Sign In</span>
            <span className="submit-icon">→</span>
          </button>

          <div className="auth-divider">
            <span>or</span>
          </div>

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

