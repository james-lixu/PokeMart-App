import React, { useState } from 'react';

const Sell = ({ card }) => {
  const [price, setPrice] = useState('');

  const handleSellClick = async (e) => {
    e.preventDefault();
    // Validate the price before proceeding
    if (!price || isNaN(parseFloat(price))) {
      alert('Please enter a valid price.');
      return;
    }

    try {
      const response = await fetch('https://pokemonappbackend.michaelrivera15.repl.co/market/listings/add', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify({
          card_id: card.id,
          picture: 'photo',
          price: parseFloat(price),
          quality: 'Mint',
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Listing added successfully. Queue number:', data.qNum);
      // Optionally, you can perform additional actions after a successful listing
    } catch (error) {
      console.error('Error adding listing: ', error);
      // Handle error as needed
    } finally {
      setPrice('');
    }
  };

  return (
    <div className="sell-card-form">
      <form onSubmit={handleSellClick}>
        <label>
          <input placeholder='Enter Price'
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <button type="submit">Sell Card</button>
      </form>
    </div>
  );
};

export default Sell;
