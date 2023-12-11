import React from 'react';
import './MarketListing.css';


const MarketListing = ({ card, onCardClick }) => {
  return (
    <li className='market-listing-card' onClick={() => onCardClick(card)}>
      <h3>Seller: {card.username} </h3>
      <img src={card.picture} alt={`Card ${card.name}`} />
      <p>Quality: {card.quality}</p>
      <p>Selling Price: ${card.price.toFixed(2)}</p>
    </li>
  );
};

export default MarketListing;