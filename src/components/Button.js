import React from "react";
import { Link } from "react-router-dom";

// Reusable button component
const Button = ({
  children,
  type = "button",
  variant = "primary",
  onClick,
  to,
  className = "",
  icon,
  fullWidth = false
}) => {
  const baseClasses = `button button-${variant} ${fullWidth ? "button-full" : ""} ${className}`;

  if (to) {
    return (
      <Link to={to} className={baseClasses}>
        {icon && <span className="button-icon">{icon}</span>}
        <span>{children}</span>
        {variant === "primary" && <span className="button-arrow">→</span>}
      </Link>
    );
  }

  return (
    <button type={type} className={baseClasses} onClick={onClick}>
      {icon && <span className="button-icon">{icon}</span>}
      <span>{children}</span>
      {variant === "primary" && <span className="button-arrow">→</span>}
    </button>
  );
};

export default Button;

