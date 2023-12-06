import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import pokemartLogo from '../assets/images/pokemartlogo.png';
import profileIcon from '../assets/images/profileIcon.jpg';
import ShoppingCartIcon from '../assets/images/ShoppingCart.svg';
import './Navbar.css';
import CartModal from '../components/Cart/CartModal';
import { useCart } from '../components/Cart/CartContext';

const Navbar = ({ className }) => {
  const { isLoggedIn, logout } = useAuth();
  const { cartItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <nav className={`navbar navbar-expand-lg navbar-light bg-light ${className}`}>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <Link className="navbar-brand" to="/about">
        <img src={pokemartLogo} alt="PokéMart Logo" height="75px" width="auto" />
      </Link>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item"><Link className="nav-link" to="/about">Home</Link></li>
          <li className="nav-item active"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/market">PokéMarket</Link></li>
          {/* <li className="nav-item"><Link className="nav-link" to="/community">Community</Link></li> */}
          <li className="nav-item"><Link className="nav-link" to="/contact">Contact Us</Link></li>
        </ul>

        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
          {isLoggedIn ? (
            <>
              <li className="nav-item">
                <div className="nav-link profile-icon" onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
                  <img src={profileIcon} alt="Profile" className="navbar-profile-img" />
                  <div className={`profile-dropdown ${isDropdownOpen ? 'active' : ''}`}>
                    <Link to="/collection" className="profile-dropdown-item">
                      My Collection
                    </Link>
                    <Link to="/checkout" className="profile-dropdown-item">
                      My Cart
                    </Link>
                    <Link to="/orders" className="profile-dropdown-item">
                      Orders
                    </Link>
                    <button onClick={logout} className="profile-dropdown-item profile-dropdown-logout">
                      Logout
                    </button>
                  </div>
                </div>
              </li>
              <li className="nav-item">
                <button onClick={toggleCart} className="nav-link navbar-cart-button">
                  <img src={ShoppingCartIcon} alt="Shopping Cart" className="navbar-shopping-cart" />
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Sign Up</Link>
              </li>
              <li className="nav-item">
                <button onClick={toggleCart} className="nav-link navbar-cart-button">
                  <img src={ShoppingCartIcon} alt="Shopping Cart" className="navbar-shopping-cart" />
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
      {isCartOpen && <CartModal cartItems={cartItems} onClose={toggleCart} />}
    </nav>
  );
};

export default Navbar;
