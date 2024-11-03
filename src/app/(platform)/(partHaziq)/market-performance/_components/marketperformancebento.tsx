"use client";
import React, { useState } from "react";
import axios from "axios";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { QuarterPerformance } from "./quarterPerformance";
import { MPIProjection } from "./MPIProjection";
import { ActivitySquare, Gauge, LineChartIcon } from "lucide-react";
import { GaugeDisplay } from "./gaugeDisplay";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MarketPerformanceBento = () => {
  const [mpiScore, setMpiScore] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSectorChange = async (value: string) => {
    setIsLoading(true);
    try {
      // Step 1: Summarize news
      const summarizeResponse = await axios.post(`http://localhost:8000/api/summarize/${value}`);
      
      // Step 2: Preprocess summarized news
      const preprocessResponse = await axios.post('http://localhost:8000/api/preprocess/preprocess', summarizeResponse.data);

      // Step 3: Get MPI score
      const mpiResponse = await axios.post('http://localhost:8000/api/mpi/analyze-json', {
        file_content: preprocessResponse.data.data
      });

      setMpiScore(mpiResponse.data.mpi_score);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full p-4">
      <h1 className="text-2xl font-bold mb-4">Market Performance</h1>
      <div className="mb-2">
        <Select onValueChange={handleSectorChange}>
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue placeholder="Select Sector" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="agriculture">Agriculture</SelectItem>
              <SelectItem value="economy">Economy</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <BentoGrid>
        <div className="col-span-3 md:col-span-2">
          <BentoCard
            name="Market Performance Indicator (MPI)"
            className="h-full"
            description=""
            Icon={Gauge}
            href="#"
            background={<GaugeDisplay value={mpiScore} isLoading={isLoading} />}
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