'use client';

import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, DollarSign, BarChart2, Globe } from "lucide-react";

const stats = [
  {
    title: "Recent GDP Growth (%)",
    value: "0.34%",
    change: "+2.45% from last month",
    isPositive: true,
    icon: <DollarSign className="h-8 w-8 text-blue-500" />
  },
  {
    title: "Average GDP for all Sector",
    value: "RM 23,532",
    change: "+1.2% from last month",
    isPositive: true,
    icon: <Globe className="h-8 w-8 text-green-500" />
  },
  {
    title: "Average GDP Services Sector",
    value: "RM 23,532",
    change: "+0.8% from last month",
    isPositive: true,
    icon: <BarChart2 className="h-8 w-8 text-orange-500" />
  },
  {
    title: "Average GDP Computer Subsector",
    value: "RM 23,532",
    change: "+1.5% from last month",
    isPositive: true,
    icon: <DollarSign className="h-8 w-8 text-purple-500" />
  },
  {
    title: "Trending News Found",
    value: 9,
    icon: <Globe className="h-8 w-8 text-red-500" />
  }
];

export function StatCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-white">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              {/* Left-side icon */}
              <div>{stat.icon}</div>

              {/* Middle content: Title and Value */}
              <div className="flex flex-col">
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-semibold">{stat.value}</p>
              </div>

              {/* Right-side uptrend icon */}
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>

            {/* Change text below */}
            <p className="mt-2 text-xs text-green-500">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}