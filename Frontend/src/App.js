// Import React library and hooks
import React, { useEffect } from "react";
// Import React Router components for navigation between pages
import { Routes, Route, useLocation } from "react-router-dom";

// Import AuthProvider
import { AuthProvider } from "./context/AuthContext";

// Import all the components we need
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Import all the page components
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import NotFound from "./pages/NotFound";

// Component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when route changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Main App component - this is the root of our application
function App() {
  return (
    <AuthProvider>
      {/* Main container for the entire app */}
      <div className="app">
        {/* Scroll to top on route change */}
        <ScrollToTop />
        
        {/* Navigation bar - appears at the top of every page */}
        <Navbar />
        
        {/* Main content area - where page content goes */}
        <main className="main-content">
          {/* React Router - handles which page to show based on URL */}
          <Routes>
            {/* Home page - shown when user visits "/" */}
            <Route path="/" element={<Home />} />
            
            {/* Jobs listing page - shown when user visits "/jobs" */}
            <Route path="/jobs" element={<Jobs />} />
            
            {/* About page - shown when user visits "/about" */}
            <Route path="/about" element={<About />} />
            
            {/* Contact page - shown when user visits "/contact" */}
            <Route path="/contact" element={<Contact />} />
            
            {/* Sign in page - shown when user visits "/signin" */}
            <Route path="/signin" element={<SignIn />} />
            
            {/* Sign up page - shown when user visits "/signup" */}
            <Route path="/signup" element={<SignUp />} />
            
            {/* Profile page - shown when user visits "/profile" */}
            <Route path="/profile" element={<Profile />} />
            
            {/* Change Password page - shown when user visits "/change-password" */}
            <Route path="/change-password" element={<ChangePassword />} />
            
            {/* 404 page - shown for any URL that doesn't match above routes */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        {/* Footer - appears at the bottom of every page */}
        <Footer />
      </div>
    </AuthProvider>
  );
}

// Export the App component so it can be used in index.js
export default App;
