import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const query = event.target.elements.query.value;

    setIsLoading(true); // Set loading to true when the search begins
    try {
      const response = await fetch(`https://pokemonappbackend.michaelrivera15.repl.co/card/search?input=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      onSearch(data); // Pass the data to the Market component
    } catch (error) {
      console.error('Error fetching data: ', error);
    } finally {
      setIsLoading(false); // Set loading to false when the search is completed or fails
    }
  };

  return (
    <div className="search-container">
      <form className="search-form" onSubmit={handleSubmit}>
        <label htmlFor="query" hidden>Search Pokémon cards</label>
        <input type="text" id="query" name="query" placeholder="Search Pokémon cards" aria-label="Search Pokémon cards" />
        <button type="submit" className="search-button" disabled={isLoading}>
          {isLoading ? 'Loading...' : '🔍'}
        </button>
      </form>
    </div>
  );
};

export default SearchBar;

