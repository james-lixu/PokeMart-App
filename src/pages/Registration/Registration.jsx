import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Registration.css';
import pokemartLogo from '../../assets/images/pokemartlogo.png';

function Registration() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError(''); 

    if (password !== retypePassword) {
      setError("Passwords do not match.");
      return;
    }

    const registerApiEndpoint = 'https://pokemonappbackend.michaelrivera15.repl.co/auth/register';
    try {
      const response = await fetch(registerApiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        navigate('/login');
      } else {
        const errorData = await response.json();
        setError(errorData.msg || 'Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setError(error.message);
    }
  };

  return (
    <div className="registration-page-container">
      <div className="registration-container">
        <Link to="/about">
          <img src={pokemartLogo} alt="PokéMart Logo" className="login-logo" />
        </Link>
        <h2>Sign up and show off all your best cards!</h2>
        {error && <div className="registration-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="registration-input"
            name="username"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            className="registration-input"
            name="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="registration-input"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            className="registration-input"
            name="retype_password"
            placeholder="retype password"
            value={retypePassword}
            onChange={(e) => setRetypePassword(e.target.value)}
          />
          <button type="submit" className="registration-button">REGISTER</button>
        </form>
        <p>Already have an account? <Link to="/login">Click here to login.</Link></p>
      </div>
    </div>
  );
}

export default Registration;
