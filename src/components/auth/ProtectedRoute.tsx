import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // Require authentication for all protected routes
  if (!isAuthenticated) {
    return <Navigate to="/welcome" replace />;
  }

  return <>{children}</>;
};
