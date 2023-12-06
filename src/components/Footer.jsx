import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer>
      <div className="centered-div">
        <h1><Link to="/contact">Team Rocket</Link></h1>
        <div className="center-links">
        </div>
        <div className="right-image">
          <a href="/homepage">
            <img src="src/assets/images/pokemartlogo.png" alt="Clickable Image" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;