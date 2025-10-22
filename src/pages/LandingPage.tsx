import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { LoginModal } from '../components/LoginModal';
import { Shield, UserCircle, Sparkles } from 'lucide-react';

export function LandingPage() {
  const navigate = useNavigate();
  const [loginMode, setLoginMode] = useState<'owner' | 'visitor' | null>(null);

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-background to-blue-500/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(99,102,241,0.15),transparent_50%)]" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000,transparent)]" />
      
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="max-w-4xl w-full text-center space-y-12 animate-in fade-in duration-1000">
          {/* Header with glowing effect */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-primary">Portfolio 2025</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent pb-2">
              Om Maurya
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Full Stack Developer & Data Analyst
              <br />
              <span className="text-foreground/80">
                Building modern web applications and data-driven solutions
              </span>
            </p>
          </div>

          {/* Cards with hover effects */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <button
              onClick={() => setLoginMode('owner')}
              className="group relative p-8 bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl hover:border-primary/50 hover:bg-card/80 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_-12px] hover:shadow-primary/50"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative flex flex-col items-center gap-4">
                <div className="p-5 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-10 h-10 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl mb-2 text-foreground">Owner</h3>
                  <p className="text-muted-foreground">
                    Full access with edit permissions
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setLoginMode('visitor')}
              className="group relative p-8 bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl hover:border-blue-400/50 hover:bg-card/80 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_-12px] hover:shadow-blue-400/50"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative flex flex-col items-center gap-4">
                <div className="p-5 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <UserCircle className="w-10 h-10 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-2xl mb-2 text-foreground">Visitor</h3>
                  <p className="text-muted-foreground">
                    Explore projects and portfolio
                  </p>
                </div>
              </div>
            </button>
          </div>

          <p className="text-sm text-muted-foreground/60">
            By continuing, your visit will be tracked for analytics purposes
          </p>
        </div>
      </div>

      <LoginModal
        isOpen={loginMode !== null}
        onClose={() => setLoginMode(null)}
        mode={loginMode}
      />
    </div>
  );
}