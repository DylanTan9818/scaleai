"use client";
import React from "react";

import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";

import { QuarterPerformance } from "./quarterPerformance";
import { MPIProjection } from "./MPIProjection";
import { ActivitySquare, Gauge, LineChartIcon } from "lucide-react";
import { GaugeDisplay } from "./gaugeDisplay";
import { Button } from "@/components/ui/button"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const MarketPerformanceBento = () => {
  return (
    <div className="w-full p-4">
      <h1 className="text-2xl font-bold mb-4">Market Performance</h1>
      <div className="mb-2"><Select>
      <SelectTrigger className="w-[180px] bg-white">
        <SelectValue placeholder="Select Sector" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>

          <SelectItem value="apple">Technology</SelectItem>
          <SelectItem value="banana">Agriculture</SelectItem>
          <SelectItem value="blueberry">Economy</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select></div>
      
      <BentoGrid>
        
        <div className="col-span-3 md:col-span-2">
          <BentoCard
            name="Market Performance Indicator (MPI)"
            className="h-full"
            description=""
            Icon={Gauge}
            href="#"
            background={<GaugeDisplay />}
          />
        </div>
        <div className="col-span-3 md:col-span-1">
          <BentoCard
            name="Quarter Performance"
            className="h-full"
            description="Average This Quarter: 75"
            Icon={LineChartIcon}
            href="#"
            background={<QuarterPerformance />}
          />
        </div>
        <div className="col-span-3">
          <BentoCard
            name="MPI Projection"
            className="h-full"
            description="Year-to-date performance and future projections"
            Icon={ActivitySquare}
            href="#"
            background={<MPIProjection />}
          />
        </div>
      </BentoGrid>
    </div>
  );
};

export default MarketPerformanceBento;