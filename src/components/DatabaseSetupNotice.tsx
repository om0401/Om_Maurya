import React, { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Button } from './ui/button';
import { Database, AlertCircle, X, ExternalLink } from 'lucide-react';
import { Card, CardContent } from './ui/card';

export function DatabaseSetupNotice() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <Card className="border-yellow-500/50 bg-yellow-500/10 backdrop-blur-sm relative">
      <button
        onClick={() => setDismissed(true)}
        className="absolute top-4 right-4 text-yellow-500/70 hover:text-yellow-500 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-yellow-500/20 rounded-xl border border-yellow-500/30">
            <Database className="w-6 h-6 text-yellow-500" />
          </div>
          <div className="flex-1 space-y-3">
            <div>
              <h3 className="font-semibold text-yellow-500 flex items-center gap-2 mb-1">
                <AlertCircle className="w-4 h-4" />
                Database Setup Required
              </h3>
              <p className="text-sm text-foreground/80 leading-relaxed">
                To enable full functionality of your portfolio, please run the database setup SQL script in your Supabase dashboard.
              </p>
            </div>
            
            <div className="bg-background/50 rounded-lg p-4 space-y-2 text-sm">
              <p className="text-foreground/70">Quick Setup Steps:</p>
              <ol className="list-decimal list-inside space-y-1 text-muted-foreground ml-2">
                <li>Open your Supabase project dashboard</li>
                <li>Navigate to the SQL Editor</li>
                <li>Copy the SQL from <code className="text-xs bg-muted px-1.5 py-0.5 rounded">database-setup.sql</code></li>
                <li>Run the SQL script to create all tables</li>
                <li className="text-yellow-500/80">If updating: Script will safely add new columns (resume, category)</li>
              </ol>
            </div>

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="border-yellow-500/30 hover:bg-yellow-500/10 hover:text-yellow-500"
                asChild
              >
                <a href="/database-setup.sql" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View SQL File
                </a>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDismissed(true)}
                className="text-muted-foreground"
              >
                Dismiss
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}