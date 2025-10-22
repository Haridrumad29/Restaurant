import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password, role) => {
    // Clear any existing auth data
    localStorage.removeItem('user');
    setUser(null);
    
    const users = {
      admin: { 
        email: 'admin@flavorburst.com', 
        password: 'admin123', 
        role: 'admin', 
        name: 'Admin User' 
      },
      staff: { 
        email: 'staff@flavorburst.com', 
        password: 'staff123', 
        role: 'staff', 
        name: 'Staff Member' 
      },
      user: { 
        email: 'user@example.com', 
        password: 'user123', 
        role: 'user', 
        name: 'Customer' 
      },
    };

    const userKey = Object.keys(users).find(key => 
      users[key].email === email && 
      users[key].password === password && 
      users[key].role === role.toLowerCase()
    );

    if (userKey) {
      const userData = users[userKey];
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true, user: userData };
    }
    return { success: false, message: 'Invalid credentials' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
