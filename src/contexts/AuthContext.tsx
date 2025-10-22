import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isOwner: boolean;
  userName: string | null;
  login: (name: string, isOwner: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isOwner, setIsOwner] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    const storedIsOwner = localStorage.getItem('isOwner') === 'true';
    const storedUserName = localStorage.getItem('userName');
    
    if (storedUserName) {
      setIsOwner(storedIsOwner);
      setUserName(storedUserName);
    }
  }, []);

  const login = (name: string, isOwnerValue: boolean) => {
    setIsOwner(isOwnerValue);
    setUserName(name);
    localStorage.setItem('isOwner', String(isOwnerValue));
    localStorage.setItem('userName', name);
  };

  const logout = () => {
    setIsOwner(false);
    setUserName(null);
    localStorage.removeItem('isOwner');
    localStorage.removeItem('userName');
  };

  return (
    <AuthContext.Provider value={{ isOwner, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}