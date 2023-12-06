import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import './CartModal.css'

const CartModal = ({ onClose }) => {
  const { cartItems, removeFromCart, setIsCartModalOpen } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    console.log('Current cart items:', cartItems);
    const initialQuantities = {};
    cartItems.forEach(item => {
      initialQuantities[item.listing_id] = quantities[item.listing_id] || 1;
    });
    setQuantities(initialQuantities);
  }, [cartItems]);

  useEffect(() => {
    // Recalculate total price
    const newTotal = cartItems.reduce((total, item) => {
      const quantity = quantities[item.listing_id] || item.quantity;
      return total + (item.price * quantity);
    }, 0);
    setTotalPrice(newTotal);
  }, [cartItems, quantities]);

  const handleQuantityChange = (listingId, newQuantity) => {
    setQuantities(prev => ({ ...prev, [listingId]: Math.max(1, newQuantity) }));
  };

  const handleRemoveClick = (cardId) => {
    removeFromCart(cardId);
  };

  return (
    <div className="cart-modal">
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
                <div className="cart-item-actions">
                  <button onClick={() => handleRemoveClick(item.card_id)} className="remove-item-button">
                    Remove
                  </button>
                </div>
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
      <div className="cart-actions">
        <Link to="/checkout">
          <button className="checkout-button">
            Continue to Checkout
          </button></Link>
        <button onClick={onClose} className="close-cart-button">
          X
        </button>
      </div>
    </div>
  );
};

export default CartModal;
