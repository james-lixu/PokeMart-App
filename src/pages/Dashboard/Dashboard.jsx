import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ProfileCard from '../../components/ProfileCard';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Navbar className="dashboard-navbar" />
      <div className="dashboard-img">
        <div className="hero-content">
          <div className="text-content">
            <h1>Welcome To Your Dashboard</h1>
          </div>

          <ProfileCard></ProfileCard>

          <div className="button-container">
            <Link to="/collection" className="hero-button">Your Collection</Link>
            <Link to="/market" className="hero-button">PokéMarket</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
