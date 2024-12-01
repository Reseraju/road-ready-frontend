import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userType, setUserType] = useState(null);
  const [jwt, setJwt] = useState(null);

  const login = (id, userType, jwt ) => {
    setIsSignedIn(true);
    setUserId(id); // Set the userId during login
    setUserType(userType);
    setJwt(jwt);
  };

  const logout = () => {
    setIsSignedIn(false);
    setUserId(null); // Clear the userId during logout
  };

  return (
    <AuthContext.Provider value={{ isSignedIn, userId, login, logout, userType, jwt }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
