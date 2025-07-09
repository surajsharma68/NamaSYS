// src/components/SearchBar.js
import React from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ query, setQuery }) => {
  return (
    <input
      type="text"
      placeholder="Search for movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      style={{
        padding: '10px',
        width: '100%',
        maxWidth: '500px',
        fontSize: '1rem',
        margin: '20px auto',
        display: 'block',
      }}
    />
  );
};

SearchBar.propTypes = {
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
};

export default SearchBar;
