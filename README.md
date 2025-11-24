# Civil Guide - React Job Directory

A modern, responsive React web application for browsing civil services and public job opportunities in Lebanon. Built with React, React Router, and custom CSS - no Bootstrap or heavy frameworks.

## 🎯 Project Overview

**Civil Guide** is a frontend-only job directory that helps users discover public and semi-public sector job opportunities. The application features:

- **Job Listings**: Browse and search through available job positions
- **Advanced Filtering**: Filter by keyword, location, job type, and category
- **Responsive Design**: Fully responsive with mobile hamburger menu
- **Modern UI**: Dark theme with gradient accents and smooth animations
- **No Backend**: Uses static data - perfect for learning React

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation & Running

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The app will open at `http://localhost:3000` automatically.

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner

## 📁 Code Structure

```
civil-guide/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── components/         # Reusable React components
│   │   ├── Button.js       # Reusable button component
│   │   ├── Footer.js       # Site footer
│   │   ├── FormInput.js    # Reusable form input
│   │   ├── FormSelect.js   # Reusable select dropdown
│   │   ├── FormTextarea.js # Reusable textarea
│   │   ├── JobCard.js      # Job listing card
│   │   ├── Navbar.js       # Navigation bar with mobile menu
│   │   ├── PageHeader.js   # Reusable page header
│   │   └── SearchFilters.js # Reusable search filters
│   ├── data/
│   │   └── jobs.js         # Static job data (6 jobs)
│   ├── hooks/
│   │   └── useJobFilters.js # Custom hook for job filtering
│   ├── pages/              # Page components (routes)
│   │   ├── About.js        # About page
│   │   ├── Contact.js      # Contact form
│   │   ├── Home.js         # Homepage
│   │   ├── Jobs.js         # Jobs directory with filters
│   │   ├── NotFound.js     # 404 page
│   │   ├── SignIn.js       # Sign in page
│   │   └── SignUp.js       # Sign up page
│   ├── styles/             # Component-specific CSS
│   │   ├── About.css
│   │   ├── Auth.css
│   │   ├── Button.css
│   │   ├── Contact.css
│   │   ├── Home.css
│   │   ├── JobCard.css
│   │   ├── Jobs.css
│   │   ├── NotFound.css
│   │   ├── PageHeader.css
│   │   └── SearchFilters.css
│   ├── App.js              # Main app with routing
│   ├── index.js            # Application entry point
│   └── index.css           # Global styles & CSS variables
└── package.json            # Dependencies
```

## 🏗️ Architecture Overview

### Component-Based Structure

The application follows a **component-based architecture** with clear separation of concerns:

1. **Reusable Components** (`src/components/`)
   - Self-contained, reusable UI components
   - Can be used across multiple pages
   - Examples: `Button`, `FormInput`, `JobCard`, `Navbar`

2. **Page Components** (`src/pages/`)
   - Full page views that compose multiple components
   - Each page is a route in the application
   - Examples: `Home`, `Jobs`, `About`, `Contact`

3. **Custom Hooks** (`src/hooks/`)
   - Reusable logic extracted from components
   - Examples: `useJobFilters` - manages all job filtering logic

4. **Static Data** (`src/data/`)
   - Application data (jobs array)
   - No backend or database needed

### Key Features

#### 🎨 **Responsive Design**
- Mobile-first approach
- Hamburger menu on mobile devices (≤768px)
- Touch-friendly interactions
- Responsive breakpoints: 1024px, 768px, 480px, 360px

#### 🔍 **Job Filtering**
- Keyword search (searches title, company, category)
- Location filter (Beirut, Saida, Tripoli, Zahle, Online/Remote)
- Job type filter (Full Time, Part Time, Internship, Contract)
- Category filter (IT, Administration, Customer Service, etc.)
- Real-time filtering as you type/select

#### 📱 **Mobile Navigation**
- Hamburger menu button on mobile
- Smooth slide-down animation
- Scroll lock when menu is open
- Click outside to close
- Auto-close on route change

#### 🎯 **User Experience**
- Scroll to top on route change
- Active link highlighting in navbar
- Smooth page transitions
- Loading states and empty states

## 🛠️ Technology Stack

- **React 19.2.0** - UI library
- **React Router DOM 6.20.0** - Client-side routing
- **Custom CSS** - No Bootstrap, Tailwind, or other frameworks
- **CSS Variables** - For theming and consistency
- **React Hooks** - useState, useEffect, useMemo, useLocation, useRef

## 📄 Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Landing page with hero section and featured jobs |
| `/jobs` | Jobs | Full jobs directory with search and filters |
| `/about` | About | Information about the project |
| `/contact` | Contact | Contact form |
| `/signin` | Sign In | User authentication (demo) |
| `/signup` | Sign Up | User registration (demo) |
| `*` | 404 | Error page for invalid routes |

## 🎨 Styling Approach

- **Modular CSS**: Each component/page has its own CSS file
- **CSS Variables**: Centralized theming in `index.css`
- **Dark Theme**: Modern dark color scheme
- **Gradient Accents**: Primary colors use gradients
- **Responsive**: Media queries for all screen sizes
- **No Framework**: Pure CSS - no Bootstrap or Tailwind


## 🔑 Key Concepts

### Component Reusability
- Components are designed to be reusable across pages
- Form components (`FormInput`, `FormSelect`, `FormTextarea`) used in multiple forms
- `JobCard` component used in Home and Jobs pages
- `PageHeader` for consistent page headers

### State Management
- Local state with `useState` hook
- Custom hooks for complex logic (`useJobFilters`)
- No global state management (Redux/Context) needed

### Routing
- Client-side routing with React Router
- No page refreshes on navigation
- Scroll to top on route change
- Active link highlighting

### Responsive Design
- Mobile-first CSS approach
- Breakpoints: 1024px (tablet), 768px (mobile), 480px (small mobile), 360px (extra small)
- Hamburger menu for mobile navigation
- Flexible grid layouts

## 🎓 Learning Points

This project demonstrates:
- ✅ React functional components and hooks
- ✅ React Router for navigation
- ✅ Component composition and reusability
- ✅ Custom hooks for logic extraction
- ✅ Responsive CSS design
- ✅ Form handling and validation
- ✅ State management patterns
- ✅ Modern CSS (variables, flexbox, grid)

