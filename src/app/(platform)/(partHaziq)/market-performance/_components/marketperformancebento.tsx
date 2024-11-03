"use client";
import React, { useState } from "react";
import axios from "axios";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { MPIProjection } from "./MPIProjection";
import { ActivitySquare, Gauge, LineChartIcon } from "lucide-react";
import { GaugeDisplay } from "./gaugeDisplay";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AnalyzeItem {
  text: string;
  sentiment: "positive" | "negative" | "neutral";
  confidence: number;
  category: string;
}

interface QuarterPerformanceProps {
  analyzeData: AnalyzeItem[];
}

const QuarterPerformance: React.FC<QuarterPerformanceProps> = ({ analyzeData }) => {
  return (
    <div className="w-full h-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">No.</TableHead>
            <TableHead className="w-[400px]">Text</TableHead>
            <TableHead className="w-[100px]">Sentiment</TableHead>
            <TableHead className="w-[100px] text-right">Confidence</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {analyzeData?.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className="truncate max-w-[400px]" title={item.text}>
                {item.text}
              </TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.sentiment === "positive"
                      ? "bg-green-100 text-green-800"
                      : item.sentiment === "negative"
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {item.sentiment}
                </span>
              </TableCell>
              <TableCell className="text-right">
                {(item.confidence * 100).toFixed(2)}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const MarketPerformanceBento = () => {
  const [mpiScore, setMpiScore] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analyzeData, setAnalyzeData] = useState<AnalyzeItem[]>([]);

  const handleSectorChange = async (value: string) => {
    setIsLoading(true);
    try {
      const summarizeResponse = await axios.post(`http://localhost:8000/api/summarize/${value}`);
      const preprocessResponse = await axios.post('http://localhost:8000/api/preprocess/preprocess', summarizeResponse.data);
      const mpiResponse = await axios.post('http://localhost:8000/api/mpi/analyze-json', {
        file_content: preprocessResponse.data.data
      });
      console.log(mpiResponse.data.analyzed_items); // Updated console log
      setAnalyzeData(mpiResponse.data.analyzed_items); // Updated to use analyzed_items
      setMpiScore(mpiResponse.data.mpi_score);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full p-4 ml-36">
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
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-5">
          <BentoCard
            name="Market Performance Indicator (MPI)"
            className="h-[26rem]"
            description=""
            Icon={Gauge}
            href="#"
            background={<GaugeDisplay value={mpiScore} isLoading={isLoading} />}
          />
        </div>
        <div className="col-span-7">
          <BentoCard
            name=""
            className="h-[26rem]"
            description=""
            Icon={LineChartIcon}
            href="#"
            background={<QuarterPerformance analyzeData={analyzeData} />}
          />
        </div>
        <div className="col-span-12">
          <BentoCard
            name="MPI Projection"
            className="h-[25rem] mt-4"
            description="Year-to-date performance and future projections"
            Icon={ActivitySquare}
            href="#"
            background={<MPIProjection />}
          />
        </div>
      </div>
    </div>
  );
};

export default MarketPerformanceBento;