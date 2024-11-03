import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Info, ChevronRight } from "lucide-react";

// Define the type for GDP data items
interface GDPDataItem {
  label: string;
  value: string;
}

const GDPStatistics = ({ className }: { className?: string }) => {
  // Update gdpData type to be an array of GDPDataItem or null initially
  const [gdpData, setGdpData] = useState<GDPDataItem[] | null>(null);

  useEffect(() => {
    const fetchGDPData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/gdp");
        const data = await response.json();
        setGdpData([
          { label: "Highest GDP", value: data["Highest GDP"] },
          { label: "Lowest GDP", value: data["Lowest GDP"] },
          { label: "Average GDP", value: data["Average GDP"] },
          { label: "Expected GDP 2024", value: data["Expected GDP 2024"] }
        ]);
      } catch (error) {
        console.error("Error fetching GDP data:", error);
      }
    };

    fetchGDPData();
  }, []);

  // Render loading state if gdpData is still null
  if (!gdpData) return <p>Loading...</p>;

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