import React from "react";
import "../styles/SearchFilters.css";

// This component shows all the filter inputs for searching jobs
const SearchFilters = (props) => {
  // Get all the props we need
  const searchText = props.searchText || "";
  const location = props.location || "all";
  const category = props.category || "all";
  const type = props.type || "all";
  const locations = props.locations || [];
  const categories = props.categories || [];
  const types = props.types || [];
  const onSearchTextChange = props.onSearchTextChange;
  const onLocationChange = props.onLocationChange;
  const onCategoryChange = props.onCategoryChange;
  const onTypeChange = props.onTypeChange;
  const onClearFilters = props.onClearFilters;
  const showClearButton = props.showClearButton !== false; // default to true

  // Check if user has any filters active
  let hasActiveFilters = false;
  if (searchText.length > 0) {
    hasActiveFilters = true;
  } else if (location !== "all") {
    hasActiveFilters = true;
  } else if (category !== "all") {
    hasActiveFilters = true;
  } else if (type !== "all") {
    hasActiveFilters = true;
  }

  return (
    <div className="search-filters">
      {/* Search text input */}
      <div className="search-field">
        <label htmlFor="searchText" className="search-label">
          <span className="search-label-icon">🔍</span>
          Keyword
        </label>
        <input
          id="searchText"
          type="text"
          className="search-input"
          placeholder="Search by title, company, or category"
          value={searchText}
          onChange={onSearchTextChange}
        />
      </div>

      {/* Location dropdown - only show if we have locations */}
      {locations.length > 0 && (
        <div className="search-field">
          <label htmlFor="location" className="search-label">
            <span className="search-label-icon">📍</span>
            Location
          </label>
          <select
            id="location"
            className="search-select"
            value={location}
            onChange={onLocationChange}
          >
            <option value="all">All Lebanon</option>
            {locations.map((loc) => {
              return (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              );
            })}
          </select>
        </div>
      )}

      {/* Job type dropdown - only show if we have types */}
      {types.length > 0 && (
        <div className="search-field">
          <label htmlFor="type" className="search-label">
            <span className="search-label-icon">💼</span>
            Job Type
          </label>
          <select
            id="type"
            className="search-select"
            value={type}
            onChange={onTypeChange}
          >
            <option value="all">All Types</option>
            {types.map((jobType) => {
              return (
                <option key={jobType} value={jobType}>
                  {jobType}
                </option>
              );
            })}
          </select>
        </div>
      )}

      {/* Category dropdown - only show if we have categories */}
      {categories.length > 0 && (
        <div className="search-field">
          <label htmlFor="category" className="search-label">
            <span className="search-label-icon">📂</span>
            Category
          </label>
          <select
            id="category"
            className="search-select"
            value={category}
            onChange={onCategoryChange}
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => {
              return (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              );
            })}
          </select>
        </div>
      )}

      {/* Clear filters button - only show if filters are active */}
      {showClearButton && hasActiveFilters && (
        <div className="search-field search-field-button">
          <button
            type="button"
            className="clear-filters-button"
            onClick={onClearFilters}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;

