import React, { createContext, useContext, useState, useEffect } from 'react';
import { getToken as getStoredToken, setToken as persistToken } from '@/api/client';
import { login as apiLogin, signup as apiSignup } from '@/api/auth';

interface AuthContextType {
  isFirstVisit: boolean;
  isAuthenticated: boolean;
  hasSeenSplash: boolean;
  token: string | null;
  setFirstVisit: (value: boolean) => void;
  setAuthenticated: (value: boolean) => void;
  setHasSeenSplash: (value: boolean) => void;
  logout: () => void;
  signup: (params: { email: string; name: string; password: string; wallets?: any[]; mnemonic?: string | null }) => Promise<void>;
  login: (params: { email: string; password: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasSeenSplash, setHasSeenSplash] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Check localStorage for previous visits
    const hasVisitedBefore = localStorage.getItem('dook-has-visited');
    const authState = localStorage.getItem('dook-authenticated');
    const storedToken = getStoredToken();
    
    if (hasVisitedBefore === 'true') {
      setIsFirstVisit(false);
    }
    
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    } else if (authState === 'true') {
      // Backward compatibility: if old flag exists, treat as authenticated
      setIsAuthenticated(true);
    }
  }, []);

  const setFirstVisit = (value: boolean) => {
    setIsFirstVisit(value);
    if (!value) {
      localStorage.setItem('dook-has-visited', 'true');
    }
  };

  const setAuthenticated = (value: boolean) => {
    setIsAuthenticated(value);
    if (value) {
      localStorage.setItem('dook-authenticated', 'true');
      // Mark as not first visit once authenticated
      setFirstVisit(false);
    } else {
      localStorage.removeItem('dook-authenticated');
    }
  };

  const updateHasSeenSplash = (value: boolean) => {
    setHasSeenSplash(value);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setHasSeenSplash(false);
    localStorage.removeItem('dook-authenticated');
    persistToken(undefined);
    setToken(null);
  };

  const signup: AuthContextType['signup'] = async ({ email, name, password, wallets, mnemonic }) => {
    const jwt = await apiSignup({ email, name, password, wallets, mnemonic });
    if (jwt) {
      persistToken(jwt);
      setToken(jwt);
      setAuthenticated(true);
    }
  };

  const login: AuthContextType['login'] = async ({ email, password }) => {
    const jwt = await apiLogin({ email, password });
    if (jwt) {
      persistToken(jwt);
      setToken(jwt);
      setAuthenticated(true);
    }
  };

  const value: AuthContextType = {
    isFirstVisit,
    isAuthenticated,
    hasSeenSplash,
    token,
    setFirstVisit,
    setAuthenticated,
    setHasSeenSplash: updateHasSeenSplash,
    logout,
    signup,
    login,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
