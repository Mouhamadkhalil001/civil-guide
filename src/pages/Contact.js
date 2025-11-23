import React, { useState } from "react";
import "../styles/Contact.css";

const Contact = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    message: ""
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
      "Form submitted!\n\n" + JSON.stringify(form, null, 2)
    );
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1 className="contact-title">Contact Us</h1>
        <p className="contact-intro">
          If you have any question about civil services or job
          opportunities, you can send us a message using the form below.
        </p>
      </div>

      <div className="contact-form-wrapper">
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-field">
            <label htmlFor="fullName" className="form-label">
              <span className="form-label-icon">👤</span>
              Full name
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
              placeholder="Enter your email address"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="message" className="form-label">
              <span className="form-label-icon">💬</span>
              Message
            </label>
            <textarea
              id="message"
              name="message"
              className="form-textarea"
              placeholder="Enter your message here..."
              value={form.message}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-button">
            <span>Send message</span>
            <span className="submit-icon">→</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
