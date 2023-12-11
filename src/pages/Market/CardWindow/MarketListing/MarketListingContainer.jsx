import React from 'react';
import MarketListing from './MarketListing'; // Import your MarketListing component

const MarketListingContainer = ({ listings }) => {
  const cards = listings || [];
  
  return (
    <div id="market-listing-card-results" style={{display: 'flex',
                                                  maxHeight: '220px',
                                                 flexWrap: 'wrap',
                                                 justifyContent: 'center',
                                                 alignItems: 'flex-start',
                                                 padding: '20px',
                                                 gap: '10px',
                                                 overflowY: 'scroll'}}>
      {cards.map(card => (
        <MarketListing key={card.listing_id} card={card}/>
      ))}
    </div>
  );
};

export default MarketListingContainer;
