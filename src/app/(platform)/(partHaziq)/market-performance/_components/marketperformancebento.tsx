"use client";
import React from "react";
import dynamic from "next/dynamic";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import {
  ActivitySquare,
  LineChart as LineChartIcon,
  Gauge,
} from "lucide-react";
import { Line } from "recharts";

// Dynamic imports for Recharts
const ResponsiveContainer = dynamic(
  () => import("recharts").then((mod) => mod.ResponsiveContainer),
  { ssr: false }
);
const LineChart = dynamic(
  () => import("recharts").then((mod) => mod.LineChart),
  { ssr: false }
);

const quarterData = [
  { month: "April", value: 45 },
  { month: "May", value: 30 },
  { month: "June", value: 65 },
  { month: "July", value: 85 },
  { month: "Aug", value: 45 },
  { month: "Sept", value: 75 },
  { month: "Oct", value: 85 },
];

const yearData = [
  { month: "Jan", value: 30 },
  { month: "Feb", value: 40 },
  { month: "March", value: 55 },
  { month: "April", value: 25 },
  { month: "May", value: 35 },
  { month: "June", value: 60 },
  { month: "July", value: 30 },
  { month: "Aug", value: 20 },
  { month: "Sept", value: 40 },
  { month: "Oct", value: 45 },
  { month: "Nov", value: 65 },
  { month: "Dec", value: 75 },
];

const GaugeDisplay = () => {
  const value = 85; // Current value
  const radius = 40;
  const strokeWidth = 10;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * Math.PI;
  const progressOffset = circumference - (value / 100) * circumference;

  return (
    <div className="relative w-48 h-48">
      <svg viewBox="0 0 100 100" className="transform rotate-180 w-full h-full">
        <path
          d="M 20,50 A 30,30 0 1,0 80,50"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Progress arcs */}
        {/* Green section (66-100) */}
        <path
          d="M 20,50 A 30,30 0 0,0 35,77"
          fill="none"
          stroke="#22c55e"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Blue section (33-66) */}
        <path
          d="M 35,77 A 30,30 0 0,0 65,77"
          fill="none"
          stroke="#3b82f6"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Red section (0-33) */}
        <path
          d="M 65,77 A 30,30 0 0,0 80,50"
          fill="none"
          stroke="#ef4444"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Indicator needle */}
        <path
          d={`M 50,50 L ${
            50 + normalizedRadius * Math.cos((value / 100) * Math.PI)
          },${50 + normalizedRadius * Math.sin((value / 100) * Math.PI)}`}
          stroke="#000"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Center circle */}
        <circle cx="50" cy="50" r="4" fill="#000" />
      </svg>

      {/* Value display */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-4xl font-bold">{value}</span>
      </div>
    </div>
  );
};

// Rest of the component remains the same...
const MarketPerformanceBento = () => {
  return (
    <div className="w-full p-4">
      <h1 className="text-2xl font-bold mb-4">Market Performance</h1>
      <BentoGrid>
        {/* MPI Card */}
        <div className="col-span-3 md:col-span-2">
          <BentoCard
            name="Market Performance Indicator (MPI)"
            className="h-full"
            description="Technology Sector"
            Icon={Gauge}
            href="#"
            background={
              <div className="absolute inset-0 flex items-center justify-between p-6">
                <GaugeDisplay />
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <span>Poor (0)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    <span>Neutral</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span>Good (100)</span>
                  </div>
                </div>
              </div>
            }
          />
        </div>

        {/* Rest of the cards remain the same... */}
        {/* Quarter Performance Card and MPI Projection Card code stays unchanged */}
        <div className="col-span-3 md:col-span-1">
          <BentoCard
            name="Quarter Performance"
            className="h-full"
            description="Average This Quarter: 75"
            Icon={LineChartIcon}
            href="#"
            background={
              <div className="absolute inset-0 p-6">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={quarterData}>
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            }
          />
        </div>

        <div className="col-span-3">
          <BentoCard
            name="MPI Projection"
            className="h-full"
            description="Year-to-date performance and future projections"
            Icon={ActivitySquare}
            href="#"
            background={
              <div className="absolute inset-0 p-6">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={yearData}>
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            }
          />
        </div>
      </BentoGrid>
    </div>
  );
};

export default MarketPerformanceBento;
