// Registration.jsx
import React, { useState } from 'react';
import './Registration.css';
import { useNavigate, Link } from 'react-router-dom';
import pokemartLogo from '../../assets/images/pokemartlogo.png';

function Registration() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    // Here you would handle the registration logic,
    const registerApiEndpoint = 'https://pokemonappbackend.michaelrivera15.repl.co/auth/register';

    try {
      const response = await fetch(registerApiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        // Navigate to the login page
        navigate('/');
      } else {
        console.error('Register failed');
        // Optionally, handle and display login error to the user
      }
    } catch (error) {
      console.error('Error during registration:', error);
      // Optionally, handle and display error
    }
    console.log(username, email, password, retypePassword);
  };

  return (
    <div className="registration-page-container">
      <div className="registration-container">
        <a href="/about">
          <img src={pokemartLogo} alt="PokéMart Logo" className="login-logo" />
        </a>
        <h2>Sign up and show off all your best cards!</h2>
        <div></div> {/*You can put response output here*/}
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
        <p>Already have an account? <a href="/login">Click here to login.</a></p>
      </div>
    </div>
  );
}

export default Registration;
