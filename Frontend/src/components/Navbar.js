// Import React library and hooks
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
// Import NavLink and Link for navigation
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
// Import auth context
import { useAuth } from "../context/AuthContext";

/**
 * Navbar Component
 * 
 * This component creates the navigation bar that appears at the top of every page.
 * It includes:
 * - Site logo/brand name (clickable, links to home)
 * - Navigation links to all main pages
 * - Active link highlighting (shows which page you're on)
 * - Mobile hamburger menu for responsive design
 * - Scroll lock when menu is open
 * - Click outside to close menu
 */
const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // State to manage mobile menu open/close
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // State to manage profile dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // Ref for the navbar to detect clicks outside
  const navRef = useRef(null);
  // Ref for desktop dropdown
  const desktopDropdownRef = useRef(null);
  // Ref for mobile dropdown (portal)
  const mobileDropdownRef = useRef(null);
  // Get current location to close menu on route change
  const location = useLocation();

  /**
   * Function to toggle mobile menu
   */
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  /**
   * Function to close mobile menu
   */
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  /**
   * Toggle profile dropdown
   */
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  /**
   * Handle logout
   */
  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate('/');
  };

  /**
   * Get user initials for avatar
   */
  const getInitials = () => {
    if (!user || !user.name) return '??';
    const names = user.name.trim().split(' ');
    if (names.length === 1) return names[0][0].toUpperCase();
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };

  /**
   * Lock/unlock body scroll when menu is open/closed
   */
  useEffect(() => {
    if (isMenuOpen) {
      // Lock scroll when menu is open
      document.body.style.overflow = "hidden";
    } else {
      // Unlock scroll when menu is closed
      document.body.style.overflow = "";
    }

    // Cleanup: always unlock scroll when component unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  /**
   * Close menu when route changes
   */
  useEffect(() => {
    closeMenu();
    setIsDropdownOpen(false);
  }, [location.pathname]);

  /**
   * Handle clicks outside the navbar to close menu
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If menu is open and click is outside navbar, close menu
      if (isMenuOpen && navRef.current && !navRef.current.contains(event.target)) {
        closeMenu();
      }
      // If dropdown is open and click is outside both desktop and mobile dropdowns, close it
      if (isDropdownOpen) {
        const clickedInsideDesktop = desktopDropdownRef.current && desktopDropdownRef.current.contains(event.target);
        const clickedInsideMobile = mobileDropdownRef.current && mobileDropdownRef.current.contains(event.target);
        if (!clickedInsideDesktop && !clickedInsideMobile) {
          setIsDropdownOpen(false);
        }
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    // Cleanup: remove event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMenuOpen, isDropdownOpen]);

  /**
   * Function to determine CSS class for navigation links
   * @param {Object} navData - Navigation data from React Router
   * @param {boolean} navData.isActive - True if this link matches current URL
   * @returns {string} CSS class name(s) for the link
   */
  const getLinkClass = ({ isActive }) =>
    // If link is active (current page), add both classes
    // Otherwise, just use the base nav-link class
    isActive ? "nav-link nav-link-active" : "nav-link";

  // Return the JSX for the navbar
  return (
    <header className="navbar" ref={navRef}>
      <div className="navbar-inner">
        {/* Site Logo/Brand - clickable, links to home */}
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <span className="navbar-brand-icon">📋</span>
          <span className="navbar-brand-text">Civil Guide</span>
        </Link>

        {/* User avatar - show on mobile BEFORE hamburger */}
        {user && (
          <div className="navbar-profile mobile-profile">
            <button 
              className="navbar-avatar" 
              onClick={toggleDropdown}
              aria-label="User menu"
            >
              {user.avatar_url ? (
                <img src={user.avatar_url} alt={user.name} className="avatar-image" />
              ) : (
                <span className="avatar-initials">{getInitials()}</span>
              )}
            </button>
            
            {/* Use Portal to render dropdown outside navbar */}
            {isDropdownOpen && ReactDOM.createPortal(
              <div className="navbar-dropdown mobile-dropdown" ref={mobileDropdownRef}>
                <div className="dropdown-header">
                  <div className="dropdown-user-name">{user.name}</div>
                  <div className="dropdown-user-email">{user.email}</div>
                </div>
                <div className="dropdown-divider"></div>
                <Link to="/profile" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                  <span className="dropdown-icon">👤</span>
                  My Profile
                </Link>
                <Link to="/change-password" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                  <span className="dropdown-icon">🔒</span>
                  Change Password
                </Link>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item dropdown-logout" onClick={handleLogout}>
                  <span className="dropdown-icon">🚪</span>
                  Logout
                </button>
              </div>,
              document.body
            )}
          </div>
        )}
        
        {/* Hamburger menu button - only visible on mobile */}
        <button
          className="navbar-toggle"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <span className={`hamburger-icon ${isMenuOpen ? "active" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
        
        {/* Navigation Menu - contains all the page links */}
        <nav className={`navbar-nav ${isMenuOpen ? "open" : ""}`}>
          <ul className="nav-links">
            {/* Home link - "end" prop means it only matches exact "/" path */}
            <li>
              <NavLink to="/" end className={getLinkClass} onClick={closeMenu}>
                Home
              </NavLink>
            </li>
            
            {/* Jobs page link */}
            <li>
              <NavLink to="/jobs" className={getLinkClass} onClick={closeMenu}>
                Jobs
              </NavLink>
            </li>
            
            {/* About page link */}
            <li>
              <NavLink to="/about" className={getLinkClass} onClick={closeMenu}>
                About
              </NavLink>
            </li>
            
            {/* Contact page link */}
            <li>
              <NavLink to="/contact" className={getLinkClass} onClick={closeMenu}>
                Contact
              </NavLink>
            </li>
            
            {/* Auth links - show Sign In/Sign Up if not logged in */}
            {!user ? (
              <>
                <li>
                  <NavLink to="/signin" className={getLinkClass} onClick={closeMenu}>
                    Sign In
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/signup" className={getLinkClass} onClick={closeMenu}>
                    Sign Up
                  </NavLink>
                </li>
              </>
            ) : null}
          </ul>
          
          {/* User avatar dropdown - show if logged in (DESKTOP ONLY) */}
          {user && (
            <div className="navbar-profile desktop-profile" ref={desktopDropdownRef}>
              <button 
                className="navbar-avatar" 
                onClick={toggleDropdown}
                aria-label="User menu"
              >
                {user.avatar_url ? (
                  <img src={user.avatar_url} alt={user.name} className="avatar-image" />
                ) : (
                  <span className="avatar-initials">{getInitials()}</span>
                )}
              </button>
              
              {isDropdownOpen && (
                <div className="navbar-dropdown desktop-dropdown">
                  <div className="dropdown-header">
                    <div className="dropdown-user-name">{user.name}</div>
                    <div className="dropdown-user-email">{user.email}</div>
                  </div>
                  <div className="dropdown-divider"></div>
                  <Link to="/profile" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                    <span className="dropdown-icon">👤</span>
                    My Profile
                  </Link>
                  <Link to="/change-password" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                    <span className="dropdown-icon">🔒</span>
                    Change Password
                  </Link>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item dropdown-logout" onClick={handleLogout}>
                    <span className="dropdown-icon">🚪</span>
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

// Export the component
export default Navbar;
