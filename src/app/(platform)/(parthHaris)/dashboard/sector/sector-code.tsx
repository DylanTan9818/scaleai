'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";
import { useState } from "react";

const sectorCodes = [
  { code: 'p0', sector: 'GDP at purchases'},
  { code: 'p1', sector: 'Agriculture' },
  { code: 'p1.1', sector: 'Crops' },
  { code: 'p1.1.1', sector: 'Rubber' },
  { code: 'p1.1.2', sector: 'Oil Palm' },
  { code: 'p1.1.3', sector: 'Paddy' },
];

export function SectorCode() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const renderPaginationButton = (pageNum: number | string, isActive = false) => (
    <button
      key={pageNum}
      className={`w-8 h-8 text-sm border rounded-md transition-colors ${
        isActive 
          ? 'bg-blue-50 border-blue-200 text-blue-700' 
          : 'bg-white hover:bg-gray-50'
      }`}
      onClick={() => typeof pageNum === 'number' && setCurrentPage(pageNum)}
    >
      {pageNum}
    </button>
  );

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-2">
          <CardTitle>Sector Code</CardTitle>
          <Info className="h-4 w-4 text-blue-500" />
        </div>
        <button className="px-3 py-1.5 text-xs bg-white border rounded-md hover:bg-gray-50 transition-colors">
          Download CSV
        </button>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Headers */}
        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground font-medium">
          <div>Code</div>
          <div>Sector</div>
        </div>
        
        {/* Sector codes list */}
        <div className="space-y-3">
          {sectorCodes.map((item) => (
            <div key={item.code} className="grid grid-cols-2 gap-4 text-sm">
              <div>{item.code}</div>
              <div>{item.sector}</div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-1">
          <button 
            className="w-8 h-8 flex items-center justify-center border rounded-md bg-white hover:bg-gray-50 transition-colors"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          >
            &lt;
          </button>
          
          {currentPage > 2 && renderPaginationButton(1)}
          {currentPage > 3 && renderPaginationButton('...')}
          
          {currentPage > 1 && renderPaginationButton(currentPage - 1)}
          {renderPaginationButton(currentPage, true)}
          {currentPage < totalPages && renderPaginationButton(currentPage + 1)}
          
          {currentPage < totalPages - 2 && renderPaginationButton('...')}
          {currentPage < totalPages - 1 && renderPaginationButton(totalPages)}
          
          <button 
            className="w-8 h-8 flex items-center justify-center border rounded-md bg-white hover:bg-gray-50 transition-colors"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          >
            &gt;
          </button>
        </div>
      </CardContent>
    </Card>
  );
}