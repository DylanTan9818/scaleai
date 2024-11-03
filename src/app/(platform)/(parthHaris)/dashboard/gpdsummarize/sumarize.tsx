import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Info, ChevronRight } from "lucide-react";

// Define the type for GDP data items
interface GDPDataItem {
  label: string;
  value: string;
}

const GDPStatistics = ({ className }: { className?: string }) => {
  // Initialize gdpData with mock data instead of fetching from an API
  const [gdpData, setGdpData] = useState<GDPDataItem[]>([
    { label: "Highest GDP", value: "RM64,000" },
    { label: "Lowest GDP", value: "RM34,833" },
    { label: "Average GDP", value: "RM55,314" },
    { label: "Expected GDP 2024", value: "RM76,342" }
  ]);

  // Render loading state is no longer necessary since we're using mock data
  return (
    <Card className={`w-full flex flex-col ${className}`}>
      <div>
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2">
            <CardTitle className="text-[#1e3a8a]">Annual GDP Statistics</CardTitle>
            <Info className="h-5 w-5 text-blue-500" />
          </div>
          <p className="text-lg text-[#94a3b8]">By Economic Sector</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {gdpData.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <h3 className={`text-xl font-semibold ${index === 3 ? 'text-[#1e3a8a]' : 'text-[#1e3a8a]'}`}>
                {item.label}
              </h3>
              <span className="text-xl font-semibold text-[#1e3a8a]">
                {item.value}
              </span>
            </div>
          ))}
        </CardContent>
      </div>

      <div className="mt-auto border-t border-gray-100">
        <div className="px-6 py-4 flex items-center justify-between">
          <p className="text-[#94a3b8]">
            Predicted data based on news
          </p>
          <button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 hover:bg-blue-700 transition-colors">
            See News
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </Card>
  );
};

export default GDPStatistics;