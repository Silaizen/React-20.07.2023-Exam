import React, { useState } from 'react';

const FilterOptions = ({ onFilterChange }) => {
  const [filterType, setFilterType] = useState('title');
  const [filterQuery, setFilterQuery] = useState('');

  const handleFilterChange = () => {
    onFilterChange({ type: filterType, query: filterQuery });
  };

  return (
    <div>
      <h2>Filter Options</h2>
      <div>
        <label htmlFor="filterType">Filter By:</label>
        <select
          id="filterType"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="title">Title</option>
          <option value="description">Description</option>
          <option value="tag">Tag</option>
          <option value="priority">Priority</option>
        </select>
      </div>
      <div>
        <label htmlFor="filterQuery">Filter Query:</label>
        <input
          type="text"
          id="filterQuery"
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
        />
      </div>
      <button onClick={handleFilterChange}>Apply Filter</button>
    </div>
  );
};

export default FilterOptions;