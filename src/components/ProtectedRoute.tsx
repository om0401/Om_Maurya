import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { userName } = useAuth();

  if (!userName) {
    return <Navigate to="/landing" replace />;
  }

  return <>{children}</>;
}
