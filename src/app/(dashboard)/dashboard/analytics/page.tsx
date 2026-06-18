"use client";

import { BarChart3, Eye, Globe, TrendingUp, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AnalyticsPage() {
  const stats = [
    { label: "Total Views", value: "0", icon: Eye, change: "+0%", trend: "up" },
    { label: "Unique Visitors", value: "0", icon: Users, change: "+0%", trend: "up" },
    { label: "Top Country", value: "-", icon: Globe, change: "-", trend: "neutral" },
    { label: "Avg. Visit Duration", value: "0s", icon: TrendingUp, change: "-", trend: "neutral" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          Track your portfolio performance
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`rounded-lg bg-gray-100 p-2 dark:bg-gray-800 ${stat.trend === 'up' ? 'text-green-500' : stat.trend === 'down' ? 'text-red-500' : 'text-gray-500'}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <span className={`text-sm ${
                  stat.trend === 'up' ? 'text-green-500' : stat.trend === 'down' ? 'text-red-500' : 'text-gray-500'
                }`}>
                  {stat.change}
                </span>
              </div>
              <p className="mt-4 text-3xl font-bold">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Views Over Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-64 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
            <BarChart3 className="mb-4 h-16 w-16 text-gray-300" />
            <p className="text-lg font-medium text-gray-500">No data yet</p>
            <p className="mt-1 text-sm text-gray-400">
              Start sharing your portfolio to see analytics
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Top Referrers */}
      <Card>
        <CardHeader>
          <CardTitle>Top Referrers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-32 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
            <Globe className="mb-4 h-10 w-10 text-gray-300" />
            <p className="text-sm text-gray-500">No referral data yet</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
