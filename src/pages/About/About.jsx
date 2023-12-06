import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './About.css';

function About() {
  return (
    <div className="about-container">
      <Navbar className="about-navbar" />
      <div className="about-img">
        <div className="about-summary">
          <h2>Welcome to PokéMart</h2>
          <p>
            The ultimate hub for Pokémon card enthusiasts! Our community driven platform offers a comprehensive solution for managing your Pokémon card collection and engaging in marketplace trading. Whether you're a seasoned collector or just starting, our tools and resources are designed to enhance your experience. Connect with fellow trainers, discover rare cards, and stay updated with the latest market trends, all in one place. Join us and be part of a thriving Pokémon card trading community!
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;