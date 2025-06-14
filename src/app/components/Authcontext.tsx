'use client';
import { createContext, useContext, useState, useEffect } from 'react';



// types.ts or AuthContext.tsx

export interface User {
  name: string;
  email: string;
  password: string;
}

export interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}


const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('loggedInUser');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const login = (userData: any) => {
    localStorage.setItem('authToken', userData.token);
    localStorage.setItem('loggedInUser', JSON.stringify(userData));

    setUser(userData);
    
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('loggedInUser');
    setUser(null);

  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
