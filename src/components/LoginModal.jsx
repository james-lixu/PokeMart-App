import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './LoginModal.css';

const LoginModal = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');

    try {
      await login(username, password);
      onClose();
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message);
    }
  };

  return (
    <div className="login-modal-container">
      <div className="login-modal">
        <form onSubmit={handleLogin}>
          {error && <div className="login-modal-error">{error}</div>}
          <input
            type="text"
            className="login-modal-input"
            placeholder="username or email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="login-modal-input"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login-modal-button">LOGIN</button>
          <div className="login-modal-register">
            Don't have an account? <Link to="/register" className="login-modal-register-link">Register</Link>
          </div>
          <button onClick={onClose} className="close-login-modal">X</button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
