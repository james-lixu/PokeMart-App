import React, { useState } from 'react';

const Sell = ({ card }) => {
  const [price, setPrice] = useState('');
  const [newCardQuality, setNewCardQuality] = useState('');

  const handleSellClick = async (e) => {
    e.preventDefault();
    // Validate the price before proceeding
    if (!price || isNaN(parseFloat(price))) {
      alert('Please enter a valid price.');
      return;
    }

    if (!newCardQuality) {
      alert('Please select a quality.');
      return;
    }

    try {
      const response = await fetch('https://pokemonappbackend.michaelrivera15.repl.co/market/add', {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          card_id: card.id,
          picture: card.small_image_url,
          price: parseFloat(price),
          quality: newCardQuality,
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
      setNewCardQuality('');
    }
  };

  return (
    <div className="sell-card-form" style={{float: "left"}}>
      <form onSubmit={handleSellClick}>
        <label>
          Price: 
          <input placeholder='Enter Price'
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <label>
          Quality: 
          <select
            value={newCardQuality}
            onChange={(e) => setNewCardQuality(e.target.value)}
          >
            <option value="" disabled>Select Quality</option>
            <option value="Mint">Mint</option>
            <option value="Near Mint">Near Mint</option>
            <option value="Good">Good</option>
            <option value="Played">Played</option>
            <option value="Well Played">Well Played</option>
          </select>
        </label>
        <button style={{margin:"10px"}}type="submit">Sell Card</button>
      </form>
    </div>
  );
};

export default Sell;
