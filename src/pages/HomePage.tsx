import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { VisitorStats } from '../components/VisitorStats';
import { Sparkles, TrendingUp, Code, Database } from 'lucide-react';

export function HomePage() {
  const { userName, isOwner } = useAuth();

  return (
    <div className="min-h-[calc(100vh-73px)] relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-background to-blue-500/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(120,119,198,0.1),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(99,102,241,0.1),transparent_40%)]" />
      
      <div className="relative container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Hero Section */}
          <div className="text-center space-y-8 py-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm animate-in fade-in duration-500">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-primary">Welcome{userName ? `, ${userName}` : ''}</span>
            </div>
            
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Om Maurya
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Full Stack Developer & Data Analyst specializing in building modern web applications 
                and creating insightful data visualizations
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mt-12">
              <div className="group p-6 bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:scale-110 transition-transform">
                    <Code className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-foreground">Development</h3>
                </div>
                <p className="text-sm text-muted-foreground">React, Node.js, TypeScript</p>
              </div>
              
              <div className="group p-6 bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-400/10 rounded-lg group-hover:scale-110 transition-transform">
                    <Database className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-foreground">Data Analysis</h3>
                </div>
                <p className="text-sm text-muted-foreground">Power BI, Excel, SQL</p>
              </div>
              
              <div className="group p-6 bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl hover:border-purple-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-400/10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-purple-400/10 rounded-lg group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="text-foreground">Growth Focused</h3>
                </div>
                <p className="text-sm text-muted-foreground">Always learning & improving</p>
              </div>
            </div>
          </div>

          {/* Visitor Statistics */}
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Visitor Analytics
                </h2>
                <p className="text-muted-foreground mt-2">Track engagement and visitor insights</p>
              </div>
              {isOwner && (
                <div className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                  <span className="text-primary">Owner Dashboard</span>
                </div>
              )}
            </div>
            <VisitorStats />
          </div>
        </div>
      </div>
    </div>
  );
}