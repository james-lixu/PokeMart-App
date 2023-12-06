import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './Transactions.css';
import { useCart } from '../../components/Cart/CartContext';

const Transactions = () => {
  const { cartItems, removeFromCart } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    setQuantities(cartItems.reduce((acc, item) => ({
      ...acc,
      [item.listing_id]: item.quantity,
    }), {}));
  }, [cartItems]);

  useEffect(() => {
    setTotalPrice(cartItems.reduce((total, item) => total + (item.price * (quantities[item.listing_id] || item.quantity)), 0));
  }, [cartItems, quantities]);

  const handleQuantityChange = (listingId, newQuantity) => {
    setQuantities(prev => ({ ...prev, [listingId]: Math.max(1, newQuantity) }));
  };

  const handleRemoveClick = (cardId) => {
    removeFromCart(cardId);
  };

  const handlePurchase = () => {
    console.log('Purchase clicked, process the transaction');
    // Implement purchase functionality
  };

  return (
    <div className="whole-page">
      <Navbar className="transaction-navbar" />
      <div className="transaction-container">
        <div className="transaction-content">
          <h1 className="cart-header">Your Cart</h1>
          {cartItems.length > 0 ? (
            <ul className="cart-items-list">
              {cartItems.map(item => (
                <li key={item.listing_id} className="cart-item">
                  <img src={item.image_url} alt={`Card ${item.card_id}`} className="cart-item-image" />
                  <div className="cart-item-details">
                    <p className="cart-item-name">{`Card ${item.card_id}`}</p>
                    <div className="cart-item-quantity">
                      Qty:
                      <input
                        type="number"
                        value={quantities[item.listing_id]}
                        onChange={(e) => handleQuantityChange(item.listing_id, parseInt(e.target.value))}
                        min="1"
                        className="quantity-input"
                      />
                    </div>
                    <p className="cart-item-price">${item.price.toFixed(2)}</p>
                    <button onClick={() => handleRemoveClick(item.card_id)} className="remove-item-button">
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-cart-message">Your cart is empty.</p>
          )}
          <div className="cart-total">
            Total Price: ${totalPrice.toFixed(2)}
          </div>
          <button onClick={handlePurchase} className="purchase-button">
            Purchase
          </button>
        </div>
      </div>
      <Footer className="market-footer" />
    </div>
  );
};

export default Transactions;
