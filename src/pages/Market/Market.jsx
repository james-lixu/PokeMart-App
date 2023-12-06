import React, { useState } from 'react';
import SearchBar from './SearchBar';
import CardWindow from './CardWindow/CardWindow';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './Market.css';
import bannerImage from './pokemartlogo.png';

const Market = () => {
  const [cards, setCards] = useState([]);

  const handleSearch = (searchResults) => {
    setCards(searchResults);
  };
  return (
    <div className="whole-container">
      <Navbar className="market-navbar" />
      <div className="market-container">

        <div className="market-img">
          <div className="market-content">
            <div className="search-bar">
              <img
                src={bannerImage}
                alt="Market Image"
                className="market-banner-image"
                style={{ width: '450px', height: '300px' }}
              />
              <h1>Start Trading Cards!</h1>
              <SearchBar onSearch={handleSearch} />

            </div>
            <div card-container>
              <CardWindow cards={cards} />
            </div>
          </div>
        </div>
        <Footer className="market-footer" />
      </div>
    </div>
  );
};

export default Market;

