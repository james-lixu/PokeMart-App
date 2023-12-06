import React, { useState } from 'react';
import SearchBar from './SearchBar';
import CardWindow from './CardWindow/CardWindow';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './Market.css';
import bannerImage from './pokemartlogo.png';

const Market = () => {
  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleSearch = (searchResults) => {
    setCards(searchResults);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cards.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="whole-container">
        <Navbar className="market-navbar" />

        <div className="market-layout">
          <div className="left-sidebar">
            <img src={bannerImage} alt="Market Logo" className="market-banner-image" />
            <h1>Start Trading Cards!</h1>
            <SearchBar onSearch={handleSearch} />
          </div>

          <div className="card-window-container">
            <CardWindow cards={currentItems} />
            <div className="pagination">
              {[...Array(Math.ceil(cards.length / itemsPerPage)).keys()].map(number => (
                <button
                  key={number + 1}
                  className={`page-button ${currentPage === number + 1 ? 'active' : ''}`}
                  onClick={() => paginate(number + 1)}
                  onFocus={(event) => event.target.classList.add('focus-glow')}
                  onBlur={(event) => event.target.classList.remove('focus-glow')}
                >
                  {number + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Market;
