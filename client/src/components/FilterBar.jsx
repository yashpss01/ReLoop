import React from 'react';

const FilterBar = ({ onFilterChange }) => {
  return (
    <div className="filter-bar">
      <label>Condition: </label>
      <select onChange={(e) => onFilterChange(e.target.value)}>
        <option value="">All</option>
        <option value="A">A - Like New</option>
        <option value="B">B - Good</option>
        <option value="C">C - Fair</option>
      </select>
    </div>
  );
};

export default FilterBar;
