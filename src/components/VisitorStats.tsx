import React, { useEffect, useState } from 'react';
import { getVisitors } from '../utils/db';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Calendar } from 'lucide-react';

interface Visitor {
  id: number;
  name: string;
  relation: string;
  visit_time: string;
}

export function VisitorStats() {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVisitors();
  }, []);

  const loadVisitors = async () => {
    try {
      const data = await getVisitors();
      setVisitors(data);
    } catch (error: any) {
      console.error('Error loading visitors:', error);
      // If table doesn't exist, show empty state gracefully
      if (error?.message?.includes('does not exist') || error?.code === 'PGRST205' || error?.code === '42703') {
        setVisitors([]);
      }
    } finally {
      setLoading(false);
    }
  };

  // Process data for the chart
  const getChartData = () => {
    const visitsByDate: { [key: string]: number } = {};
    
    visitors.forEach(visitor => {
      const date = new Date(visitor.visit_time).toLocaleDateString();
      visitsByDate[date] = (visitsByDate[date] || 0) + 1;
    });

    return Object.entries(visitsByDate)
      .map(([date, count]) => ({ date, visits: count }))
      .slice(-7); // Last 7 days
  };

  const chartData = getChartData();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="h-32 bg-muted animate-pulse rounded" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="h-32 bg-muted animate-pulse rounded" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Total Visitors</CardTitle>
            <div className="p-2 bg-primary/10 rounded-lg">
              <Users className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              {visitors.length}
            </div>
            <p className="text-muted-foreground mt-2">
              People have visited your portfolio
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-blue-400/30 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Recent Activity</CardTitle>
            <div className="p-2 bg-blue-400/10 rounded-lg">
              <Calendar className="h-5 w-5 text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {visitors.filter(v => {
                const visitDate = new Date(v.visit_time);
                const today = new Date();
                const diffTime = Math.abs(today.getTime() - visitDate.getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return diffDays <= 7;
              }).length}
            </div>
            <p className="text-muted-foreground mt-2">
              Visitors in the last 7 days
            </p>
          </CardContent>
        </Card>
      </div>

      {chartData.length > 0 && (
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>Visit Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="rgb(168, 85, 247)" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="rgb(168, 85, 247)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(30, 30, 40, 0.9)', 
                    border: '1px solid rgba(168, 85, 247, 0.3)',
                    borderRadius: '8px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="visits" 
                  stroke="rgb(168, 85, 247)" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorVisits)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle>Recent Visitors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {visitors.slice(0, 5).map(visitor => (
              <div key={visitor.id} className="flex items-center justify-between border-b border-border/30 pb-4 last:border-0 last:pb-0 hover:bg-muted/20 -mx-2 px-2 py-2 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400/20 to-blue-400/20 flex items-center justify-center border border-primary/20">
                    <span className="text-sm font-semibold text-primary">
                      {visitor.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-foreground font-medium">{visitor.name}</p>
                    <p className="text-sm text-muted-foreground">{visitor.relation}</p>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {new Date(visitor.visit_time).toLocaleString('en-IN', {
                    timeZone: 'Asia/Kolkata',
                    dateStyle: 'short',
                    timeStyle: 'short'
                  })}
                </div>
              </div>
            ))}
            {visitors.length === 0 && (
              <p className="text-muted-foreground text-center py-8">No visitors yet</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}