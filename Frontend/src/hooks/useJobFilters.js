import { useState, useMemo } from "react";

// This hook manages all the filter state and logic for the jobs page
export const useJobFilters = (jobs) => {
  // State for search text input
  const [searchText, setSearchText] = useState("");
  
  // State for location filter
  const [location, setLocation] = useState("all");
  
  // State for category filter
  const [category, setCategory] = useState("all");
  
  // State for job type filter
  const [type, setType] = useState("all");

  // Get all unique locations from the jobs array
  const locations = useMemo(() => {
    const locationList = [];
    jobs.forEach((job) => {
      if (!locationList.includes(job.location)) {
        locationList.push(job.location);
      }
    });
    return locationList.sort();
  }, [jobs]);

  // Get all unique categories from the jobs array
  const categories = useMemo(() => {
    const categoryList = [];
    jobs.forEach((job) => {
      if (!categoryList.includes(job.category)) {
        categoryList.push(job.category);
      }
    });
    return categoryList.sort();
  }, [jobs]);

  // Get all unique job types from the jobs array
  const types = useMemo(() => {
    const typeList = [];
    jobs.forEach((job) => {
      if (!typeList.includes(job.type)) {
        typeList.push(job.type);
      }
    });
    return typeList.sort();
  }, [jobs]);

  // Handle when user types in the search box
  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  // Handle when user changes location dropdown
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  // Handle when user changes category dropdown
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  // Handle when user changes job type dropdown
  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  // Reset all filters back to default values
  const handleClearFilters = () => {
    setSearchText("");
    setLocation("all");
    setCategory("all");
    setType("all");
  };

  // Check if any filters are currently active
  const hasActiveFilters = 
    searchText.length > 0 || 
    location !== "all" || 
    category !== "all" || 
    type !== "all";

  // Filter the jobs based on all the current filter values
  const filteredJobs = useMemo(() => {
    const results = [];
    
    for (let i = 0; i < jobs.length; i++) {
      const job = jobs[i];
      let shouldInclude = true;

      // Check if job matches search text
      if (searchText.length > 0) {
        const searchLower = searchText.toLowerCase();
        const titleMatch = job.title.toLowerCase().includes(searchLower);
        const companyMatch = job.company.toLowerCase().includes(searchLower);
        const categoryMatch = job.category.toLowerCase().includes(searchLower);
        
        if (!titleMatch && !companyMatch && !categoryMatch) {
          shouldInclude = false;
        }
      }

      // Check if job matches location filter
      if (shouldInclude && location !== "all") {
        if (job.location.toLowerCase() !== location.toLowerCase()) {
          shouldInclude = false;
        }
      }

      // Check if job matches category filter
      if (shouldInclude && category !== "all") {
        if (job.category.toLowerCase() !== category.toLowerCase()) {
          shouldInclude = false;
        }
      }

      // Check if job matches type filter
      if (shouldInclude && type !== "all") {
        if (job.type.toLowerCase() !== type.toLowerCase()) {
          shouldInclude = false;
        }
      }

      // Add job to results if it passed all filters
      if (shouldInclude) {
        results.push(job);
      }
    }

    return results;
  }, [jobs, searchText, location, category, type]);

  // Return everything the component needs
  return {
    searchText: searchText,
    location: location,
    category: category,
    type: type,
    locations: locations,
    categories: categories,
    types: types,
    handleSearchTextChange: handleSearchTextChange,
    handleLocationChange: handleLocationChange,
    handleCategoryChange: handleCategoryChange,
    handleTypeChange: handleTypeChange,
    handleClearFilters: handleClearFilters,
    hasActiveFilters: hasActiveFilters,
    filteredJobs: filteredJobs
  };
};

