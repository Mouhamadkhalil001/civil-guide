// Import React and useState hook for managing form state
import React, { useState } from "react";
// Import CSS styles for this page
import "../styles/Contact.css";
// Import reusable form components
import FormInput from "../components/FormInput";
import FormTextarea from "../components/FormTextarea";

/**
 * Contact Page Component
 * 
 * This page allows users to send messages through a contact form.
 * It includes:
 * - Form with name, email, and message fields
 * - Form validation
 * - Submit handling
 */
const Contact = () => {
  // State to store form data
  // useState returns an array: [currentValue, functionToUpdateValue]
  const [form, setForm] = useState({
    fullName: "",  // User's full name
    email: "",     // User's email address
    message: ""    // User's message
  });

  /**
   * Handle input changes in the form
   * This function runs every time user types in any input field
   * @param {Event} event - The change event from the input
   */
  const handleChange = (event) => {
    // Get the name and value from the input that changed
    // name tells us which field (fullName, email, or message)
    // value is what the user typed
    const { name, value } = event.target;
    
    // Update the form state
    // We use a function that receives the previous state
    // This ensures we always have the latest state
    setForm((previous) => ({
      ...previous,  // Keep all other fields the same
      [name]: value  // Update only the field that changed
    }));
  };

  /**
   * Handle form submission
   * This runs when user clicks the submit button
   * @param {Event} event - The submit event from the form
   */
  const handleSubmit = (event) => {
    // Prevent the page from refreshing (default form behavior)
    event.preventDefault();
    
    // Show an alert with the form data
    // In a real app, this would send data to a server
    alert(
      "Form submitted!\n\n" + JSON.stringify(form, null, 2)
    );
  };

  // Return the JSX for the contact page
  return (
    <div className="contact-page">
      {/* Page header section */}
      <div className="contact-header">
        <h1 className="contact-title">Contact Us</h1>
        <p className="contact-intro">
          If you have any question about civil services or job
          opportunities, you can send us a message using the form below.
        </p>
      </div>

      {/* Form wrapper */}
      <div className="contact-form-wrapper">
        {/* Contact form */}
        <form onSubmit={handleSubmit} className="contact-form">
          {/* Full Name Input Field */}
          <FormInput
            id="fullName"
            name="fullName"
            type="text"
            label="Full name"
            icon="👤"
            placeholder="Enter your full name"
            value={form.fullName}
            onChange={handleChange}
            required
          />

          {/* Email Input Field */}
          <FormInput
            id="email"
            name="email"
            type="email"
            label="Email"
            icon="✉️"
            placeholder="Enter your email address"
            value={form.email}
            onChange={handleChange}
            required
          />

          {/* Message Textarea Field */}
          <FormTextarea
            id="message"
            name="message"
            label="Message"
            icon="💬"
            placeholder="Enter your message here..."
            value={form.message}
            onChange={handleChange}
            required
            rows={6}
          />

          {/* Submit Button */}
          <button type="submit" className="submit-button">
            <span>Send message</span>
            <span className="submit-icon">→</span>
          </button>
        </form>
      </div>
    </div>
  );
};

// Export the component
export default Contact;
