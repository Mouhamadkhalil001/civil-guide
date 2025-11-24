import React from "react";

// Reusable select dropdown component
const FormSelect = ({
  id,
  name,
  label,
  icon,
  value,
  onChange,
  options = [],
  placeholder = "Select an option",
  required = false,
  className = ""
}) => {
  return (
    <div className={`form-field ${className}`}>
      <label htmlFor={id} className="form-label">
        {icon && <span className="form-label-icon">{icon}</span>}
        {label}
      </label>
      <select
        id={id}
        name={name}
        className="form-select"
        value={value}
        onChange={onChange}
        required={required}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => {
          if (typeof option === "string") {
            return (
              <option key={option} value={option}>
                {option}
              </option>
            );
          }
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormSelect;

