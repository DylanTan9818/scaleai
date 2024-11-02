"use client";
import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import {
  ActivitySquare,
  LineChart as LineChartIcon,
  Gauge,
} from "lucide-react";
import { Line } from "recharts";
import { Separator } from "@/components/ui/separator";

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
  const radius = 48; // You can adjust this value to move the arrow in/out
  const strokeWidth = 10;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * Math.PI;
  const progressOffset = circumference - (value / 100) * circumference;

  // Convert radius to pixels for the arrow container
  // Multiply by a factor to get a good default size
  const containerSize = radius * 6; // Adjust this multiplier to change the default size

  // Calculate the rotation angle
  const rotationAngle = (value / 100) * 180 - 90;

  // Function to determine market performance status
  const getMarketStatus = (value: number) => {
    if (value >= 66)
      return { text: "Good Market Performance", color: "text-emerald-400" };
    if (value >= 33)
      return { text: "Neutral Market Performance", color: "text-blue-400" };
    return { text: "Poor Market Performance", color: "text-red-400" };
  };

  const status = getMarketStatus(value);

  return (
    <div className="relative w-full h-full mt-20">
      <div className="mt-20">
        <Image
          className="absolute inset-0"
          src="/images/assets/mpi-gauge.svg"
          alt="gauge"
          layout="fill"
          objectFit="contain"
        />
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            <div
              className="absolute left-1/2 top-[45%]"
              style={{
                transform: `translate(-50%, -50%) rotate(${rotationAngle}deg)`,
                transformOrigin: "50% 65%",
                width: `${containerSize}px`,
                height: `${containerSize}px`,
              }}
            >
              <Image
                height={containerSize}
                width={containerSize}
                src="/images/assets/arrow.svg"
                alt="arrow"
                className="w-full h-full"
                style={{
                  transformOrigin: "center",
                  transform: `scale(${radius / 80})`,
                }}
              />
            </div>
          </div>
        </div>
        {/* Value display */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="mt-8 text-5xl font-bold">{value}</span>
        </div>
      </div>

      {/* Status text section */}
      <div className="absolute bottom-5 left-0 right-0 flex flex-col items-center">
        <Separator className="w-24 mb-4" />
        <span className={`text-xl font-semibold ${status.color}`}>
          {status.text}
        </span>
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
              <>
                <div className="absolute inset-0 flex items-center justify-between p-6">
                  <GaugeDisplay />
                </div>
              </>
            }
          />
        </div>
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
