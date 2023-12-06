import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCartData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://pokemonappbackend.michaelrivera15.repl.co/cart/view_cart', {
        withCredentials: true
      });
      if (response.status === 200) {
        console.log(response.data);
        setCartItems(response.data.cart);
      } else {
        throw new Error('Failed to fetch cart items');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (cardId) => {
    setIsLoading(true);
    try {
      const response = await axios.post('https://pokemonappbackend.michaelrivera15.repl.co/cart/remove_from_cart',
        { card_id: cardId },
        { withCredentials: true }
      );
      if (response.status === 200) {
        setCartItems(currentItems => currentItems.map(item => {
          if (item.card_id === cardId) {
            return { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 0 };
          } else {
            return item;
          }
        }).filter(item => item.quantity > 0));
      } else {
        throw new Error('Failed to remove item from cart');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, isLoading, error, fetchCartData, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
