// dashboard/page.tsx

import { Bell, Clock, Moon, Search, User } from "lucide-react";
import { NewsSection } from "./news/news-section";
import { StatCards } from "./stats/stats";
import GDPStatistics from "./gpdsummarize/sumarize";
import GDPCharts from "./charts"; // Import any additional charts if needed for the bottom row

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#ECF1FE]">
      <div className="p-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="pl-8 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-300"
              />
            </div>
            <Bell className="h-5 w-5 text-gray-600 cursor-pointer" />
            <Moon className="h-5 w-5 text-gray-600 cursor-pointer" />
            <Clock className="h-5 w-5 text-gray-600 cursor-pointer" />
            <User className="h-5 w-5 text-gray-600 cursor-pointer" />
          </div>
        </div>

        {/* Stats Cards - First Row */}
        <div className="mb-8">
          <StatCards />
        </div>

        {/* Second Row - GDP Chart and GDP Statistics */}
        <div className="grid grid-cols-12 gap-6 mb-8">
          <div className="col-span-12 lg:col-span-8">
            <GDPCharts />
          </div>
          <div className="col-span-12 lg:col-span-4 flex flex-col">
            <GDPStatistics className="flex-grow" />
          </div>
        </div>

        {/* Third Row - Additional Graph and News Section */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8">
            {/* Placeholder for additional graph/chart component */}
            <GDPCharts /> {/* Replace with your additional chart component if different */}
          </div>
          <div className="col-span-12 lg:col-span-4">
            <NewsSection />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;