import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for session
    const session = localStorage.getItem('buzzhive_admin_session');
    if (session) {
      setCurrentUser(JSON.parse(session));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      // Hardcoded login check
      if (email === 'admin@buzzhive.com' && password === 'admin123') {
        const user = { email: 'admin@buzzhive.com', uid: 'local-admin' };
        setCurrentUser(user);
        localStorage.setItem('buzzhive_admin_session', JSON.stringify(user));
        resolve(user);
      } else {
        reject(new Error('Invalid credentials'));
      }
    });
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('buzzhive_admin_session');
    return Promise.resolve();
  };

  const value = {
    currentUser,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
