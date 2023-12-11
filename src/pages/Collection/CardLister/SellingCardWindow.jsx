import React, { useState } from 'react';
import './SellingCardWindow.css';

const SellingCardWindow = ({ cards, fetchCardsBeingSold }) => {
  // Use separate state variables for input and select values
  const [priceEdits, setPriceEdits] = useState({});
  const [qualityEdits, setQualityEdits] = useState({});

  const handleChange = async (card, field) => {
    try {
      const value = field === 'price' ? parseFloat(priceEdits[card.listing_id]) : qualityEdits[card.listing_id];

      if (isNaN(value) && field === 'price') {
          alert('Please enter a valid price.');
          return;
      }
      if (!value && field === 'quality') {
        alert('Please select a quality.');
        return;
      }

      const response = await fetch(`https://pokemonappbackend.michaelrivera15.repl.co/collection/change_${field}/${card.listing_id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify({ [field]: value }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Reset the input field after changing the value
      if (field === 'price') {
        setPriceEdits((prevEdits) => ({ ...prevEdits, [card.listing_id]: '' }));
      } else {
        setQualityEdits((prevEdits) => ({ ...prevEdits, [card.listing_id]: '' }));
      }

      fetchCardsBeingSold();
    } catch (error) {
      console.error(`Error changing ${field}: `, error);
    }
  };


  const handleCancelListing = async (card) => {
    try {
      const response = await fetch(`https://pokemonappbackend.michaelrivera15.repl.co/collection/cancel/${card.listing_id}`, {
        method: 'DELETE',
        credentials: 'include',
        mode: 'cors',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Update the state or perform any other necessary actions after successful deletion
      fetchCardsBeingSold();
    } catch (error) {
      console.error('Error canceling listing: ', error);
    }
  };

  return (
    <div id='listing-results'>
      {cards.map((card) => (
        <li className='card-being-sold' key={card.listing_id}>
          <div className="left-column">
            <h4>Card ID: {card.cardID}</h4>
            <img src={card.picture} alt={card.cardID} />
          </div>

          <div className="right-column">
            {/* Change listing */}
            <div className="edit">
              {/* Edit quality */}
              <div>
                <select
                  value={qualityEdits[card.listing_id] || ''}
                  onChange={(e) => setQualityEdits((prevEdits) => ({ ...prevEdits, [card.listing_id]: e.target.value }))}
                >
                  <option value="" disabled>Select Quality</option>
                  <option value="Mint">Mint</option>
                  <option value="Near Mint">Near Mint</option>
                  <option value="Good">Good</option>
                  <option value="Played">Played</option>
                  <option value="Well Played">Well Played</option>
                </select>
                <button style={{ backgroundColor: 'green' }} onClick={() => handleChange(card, 'quality')}>Change Quality</button>
              </div>

              {/* Edit price */}
              <div>
                <input
                  type="text"
                  placeholder="Enter new price"
                  value={priceEdits[card.listing_id] || ''}
                  onChange={(e) => setPriceEdits((prevEdits) => ({ ...prevEdits, [card.listing_id]: e.target.value }))}
                />
                <button style={{ backgroundColor: 'green' }} onClick={() => handleChange(card, 'price')}>Change Price</button>
              </div>

              <h4>Quality: {card.quality}</h4>
              <h4>Your Price: ${card.price.toFixed(2)}</h4>
              {/* Cancel Listing */}
              <button style={{ backgroundColor: 'red' }} onClick={() => handleCancelListing(card)}>Cancel Listing</button>
            </div>
          </div>
        </li>
      ))}
    </div>
  );
};

export default SellingCardWindow;
