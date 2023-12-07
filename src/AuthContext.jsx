import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

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
        localStorage.setItem('isLoggedIn', 'true');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setIsLoggedIn(false);
      localStorage.setItem('isLoggedIn', 'false');
      throw error;
    }
  };

  const logout = async () => {
    const logoutApiEndpoint = 'https://pokemonappbackend.michaelrivera15.repl.co/auth/logout';
    try {
      const response = await fetch(logoutApiEndpoint, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        console.log("Logged out successfully.");
      } else {
        console.error("Failed to log out.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false');
    window.location.reload()
  };


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
