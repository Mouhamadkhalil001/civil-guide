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
    <div>
      <h1 className="contact-title">Contact us</h1>
      <p className="contact-intro">
        If you have any question about civil services or job
        opportunities, you can send us a message using the form below.
      </p>

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-field">
          <label htmlFor="fullName" className="form-label">
            Full name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            className="form-input"
            placeholder="Enter full name"
            value={form.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="form-input"
            placeholder="Enter email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="message" className="form-label">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            className="form-textarea"
            placeholder="Enter message"
            value={form.message}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Send message
        </button>
      </form>
    </div>
  );
};

export default Contact;
