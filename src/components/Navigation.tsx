import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { LogOut, User, Sparkles } from 'lucide-react';

export function Navigation() {
  const location = useLocation();
  const { isOwner, userName, logout } = useAuth();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Me' },
    { path: '/projects', label: 'Projects' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-foreground transition-colors hover:text-primary group">
            <Sparkles className="w-5 h-5 text-primary group-hover:animate-pulse" />
            <span className="font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Om Maurya
            </span>
          </Link>
          
          <div className="flex items-center gap-6">
            <div className="flex gap-1 bg-muted/30 rounded-full p-1">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-full transition-all duration-300 ${
                    location.pathname === link.path
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            
            {userName && (
              <div className="flex items-center gap-3 ml-2 pl-4 border-l border-border/50">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                  <User className="w-4 h-4 text-primary" />
                  <span className="text-sm text-foreground">
                    {userName} {isOwner && <span className="text-primary">●</span>}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="flex items-center gap-2 hover:bg-destructive/10 hover:text-destructive"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}