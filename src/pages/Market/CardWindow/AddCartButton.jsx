import React from 'react';
import axios from 'axios';
import "./AddCartButton.css";
import { useCart } from '../../../components/Cart/CartContext';

const AddToCartButton = ({ cardId }) => {
  const { fetchCartData } = useCart();

  const handleAddToCart = async () => {
    try {
      const listingResponse = await axios.post(
        'https://pokemonappbackend.michaelrivera15.repl.co/cart/make_fake_listing',
        { card_id: cardId },
        { withCredentials: true }
      );
      const listingId = listingResponse.data.listing_id;
      await axios.post(
        'https://pokemonappbackend.michaelrivera15.repl.co/cart/add_to_cart',
        { listing_id: listingId },
        { withCredentials: true }
      );

      console.log('Card added to cart');
      await fetchCartData();
    } catch (error) {
      console.error('Error during add to cart process:', error);
    }
  };

  return (
    <button className='card-purchase-button' onClick={handleAddToCart}>Add to Cart</button>
  );
};

export default AddToCartButton;
