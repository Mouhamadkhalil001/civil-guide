import React from "react";

// Reusable form input component
const FormInput = ({
  id,
  name,
  type = "text",
  label,
  icon,
  placeholder,
  value,
  onChange,
  required = false,
  className = ""
}) => {
  return (
    <div className={`form-field ${className}`}>
      <label htmlFor={id} className="form-label">
        {icon && <span className="form-label-icon">{icon}</span>}
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        className="form-input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default FormInput;

