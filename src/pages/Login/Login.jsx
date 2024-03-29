import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import './Login.css';
import pokemartLogo from '../../assets/images/pokemartlogo.png';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleLogin(event) {
    event.preventDefault();
    setError('');

    try {
      await login(username, password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message);
    }
  }

  return (
    <div className="login-page-container">
      <div className="login-container">
        <Link to="/about">
          <img src={pokemartLogo} alt="PokéMart Logo" className="login-logo" />
        </Link>
        <form onSubmit={handleLogin}>
          {error && <div className="login-error">{error}</div>}
          <input
            type="text"
            className="login-input"
            placeholder="username or email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="login-input"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login-button">LOGIN</button>
        </form>
        <p>Don't have an account? <Link to="/register">Sign up</Link></p>
      </div>
    </div>
  );
}

export default Login;
