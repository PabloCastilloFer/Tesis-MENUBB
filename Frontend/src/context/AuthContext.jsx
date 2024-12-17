import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (token) => {
    localStorage.setItem('accessToken', token);
    setUser(token);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setUser(token);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};