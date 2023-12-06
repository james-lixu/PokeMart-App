import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true' // Retrieve the logged-in state from local storage
  );

  // Login method
  const login = async (username, password) => {
    const loginApiEndpoint = 'https://pokemonappbackend.michaelrivera15.repl.co/auth/login';
    try {
      const response = await fetch(loginApiEndpoint, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true'); // Save the logged-in state to local storage
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setIsLoggedIn(false);
      localStorage.setItem('isLoggedIn', 'false'); // Ensure the logged-in state is set to false in local storage
    }
  };

  // Logout method
  const logout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false'); // Clear the logged-in state from local storage
  };

  // Check the user's authentication status when the app loads
  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(loggedIn);
    };

    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
