import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import About from './pages/About/About';
import Login from './pages/Login/Login';
import Registration from './pages/Registration/Registration';
import Market from './pages/Market/Market';
import Dashboard from './pages/Dashboard/Dashboard';
import Collection from './pages/Collection/Collection';
import Contact from './pages/Contact/Contact';
import Transactions from './pages/Transactions/Transactions';
import ScrollToTop from './components/ScrollToTop'

const AppRouter = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/market" element={<Market />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/checkout" element={<Transactions />} />
        {/* You can add more routes here */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
