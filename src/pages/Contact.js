import React, { useState } from "react";
import "../styles/Contact.css";

// Contact page with a form for users to send messages
const Contact = () => {
  // State to store form data
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    message: ""
  });

  // This function runs when user types in any input field
  const handleChange = (event) => {
    // Get the name and value from the input that changed
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    // Update the form state with the new value
    setForm({
      fullName: fieldName === "fullName" ? fieldValue : form.fullName,
      email: fieldName === "email" ? fieldValue : form.email,
      message: fieldName === "message" ? fieldValue : form.message
    });
  };

  // This function runs when user submits the form
  const handleSubmit = (event) => {
    // Prevent the page from refreshing
    event.preventDefault();

    // Show an alert with the form data (in a real app, this would send to a server)
    alert(
      "Form submitted!\n\n" + 
      "Name: " + form.fullName + "\n" +
      "Email: " + form.email + "\n" +
      "Message: " + form.message
    );

    // Clear the form after submission
    setForm({
      fullName: "",
      email: "",
      message: ""
    });
  };

  return (
    <div>
      <h1 className="contact-title">Contact us</h1>
      <p className="contact-intro">
        If you have any question about civil services or job
        opportunities, you can send us a message using the form below.
      </p>

      <form onSubmit={handleSubmit} className="contact-form">
        {/* Full name input */}
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

        {/* Email input */}
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

        {/* Message textarea */}
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

        {/* Submit button */}
        <button type="submit" className="submit-button">
          Send message
        </button>
      </form>
    </div>
  );
};

export default Contact;
