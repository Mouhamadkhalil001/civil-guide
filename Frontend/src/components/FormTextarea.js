import React from "react";

// Reusable textarea component
const FormTextarea = ({
  id,
  name,
  label,
  icon,
  placeholder,
  value,
  onChange,
  required = false,
  rows = 4,
  className = ""
}) => {
  return (
    <div className={`form-field ${className}`}>
      <label htmlFor={id} className="form-label">
        {icon && <span className="form-label-icon">{icon}</span>}
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        className="form-textarea"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
      />
    </div>
  );
};

export default FormTextarea;

