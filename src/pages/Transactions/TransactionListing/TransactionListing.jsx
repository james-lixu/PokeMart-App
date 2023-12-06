import React, { useEffect, useState } from 'react';
import { useCart } from './CartContext';
import './TransactionListing.css'

const TransactionsListing = () => {
const {cartItems} = useCart();
useEffect(() =>{
  console.log("fetching cards from cart:", cartItems);
});

}

export default TransactionsListing