import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Navigation } from './components/Navigation';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LandingPage } from './pages/LandingPage';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ContactPage } from './pages/ContactPage';
import { Toaster } from './components/ui/sonner';
import { initializeTables } from './utils/db';

function AppContent() {
  const { userName } = useAuth();

  useEffect(() => {
    // Initialize database tables on app load
    initializeTables();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <Routes>
        <Route path="/landing" element={userName ? <Navigate to="/" replace /> : <LandingPage />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Navigation />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/contact" element={<ContactPage />} />
              </Routes>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to={userName ? "/" : "/landing"} replace />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}
