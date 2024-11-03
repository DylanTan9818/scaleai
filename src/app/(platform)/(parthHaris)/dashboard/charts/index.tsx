'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SelectOption {
  value: string;
  label: string;
}

interface GDPChartProps {
  title: string;
  defaultSector: string;
  defaultSubsector: string;
  sectorOptions: SelectOption[];
  subsectorOptions: SelectOption[];
}

interface DataPoint {
  label: string;
  value: number;
  value2: number;
}

// Fixed values for the chart
const FIXED_MAX_VALUE = 50000;  // RM 50,000
const FIXED_MIN_VALUE = 20000;  // RM 20,000
const Y_AXIS_LABELS = [20000, 27500, 35000, 42500, 50000];
const LABEL_FORMAT = ['RM 20,000', 'RM 27,500', 'RM 35,000', 'RM 42,500', 'RM 50,000'];

const getRandomValue = (prevValue: number) => {
  const maxChange = prevValue * 0.08; // 8% maximum change
  const change = (Math.random() - 0.5) * 2 * maxChange;
  const newValue = prevValue + change;
  
  if (newValue > FIXED_MAX_VALUE) return FIXED_MAX_VALUE - Math.random() * 2000;
  if (newValue < FIXED_MIN_VALUE) return FIXED_MIN_VALUE + Math.random() * 2000;
  return Math.round(newValue);
};

const generateInitialData = (): DataPoint[] => {
  const years = ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'];
  let prevValue = 35000;
  let prevValue2 = 38000;
  
  return years.map(year => {
    prevValue = getRandomValue(prevValue);
    prevValue2 = getRandomValue(prevValue2);
    return {
      label: year,
      value: prevValue,
      value2: prevValue2
    };
  });
};

const EnhancedChart = () => {
  const [data, setData] = useState<DataPoint[]>(generateInitialData());
  const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0, value: 0, label: '' });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setData(prevData => {
        return prevData.map(point => ({
          ...point,
          value: getRandomValue(point.value),
          value2: getRandomValue(point.value2)
        }));
      });
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const width = 530;
  const height = 250;
  const padding = 40;
  const xScale = (width - 2 * padding) / (data.length - 1);
  const yScale = (height - 2 * padding) / (FIXED_MAX_VALUE - FIXED_MIN_VALUE);

  const generateSmoothPath = (dataPoints: number[]) => {
    const points = dataPoints.map((value, i) => ({
      x: padding + i * xScale,
      y: height - padding - (value - FIXED_MIN_VALUE) * yScale
    }));

    return points.reduce((path, point, i) => {
      if (i === 0) {
        return `M ${point.x} ${point.y}`;
      }

      const prevPoint = points[i - 1];
      const tension = 0.3;
      const cp1x = prevPoint.x + (point.x - prevPoint.x) * tension;
      const cp1y = prevPoint.y;
      const cp2x = point.x - (point.x - prevPoint.x) * tension;
      const cp2y = point.y;

      return `${path} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${point.x} ${point.y}`;
    }, '');
  };

  const line1Path = generateSmoothPath(data.map(d => d.value));
  const line2Path = generateSmoothPath(data.map(d => d.value2));

  const formatCurrency = (value: number) => `RM ${value.toLocaleString()}`;

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const svgRect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - svgRect.left;
    const mouseX = (x - padding) / xScale;
    const index = Math.round(mouseX);
    
    if (index >= 0 && index < data.length) {
      const point = data[index];
      setTooltip({
        show: true,
        x: e.clientX,
        y: e.clientY,
        value: point.value,
        label: point.label
      });
    }
  };

  return (
    <div className="relative w-full h-full">
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        className="overflow-visible"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setTooltip({ ...tooltip, show: false })}
      >
        {/* Y-axis grid lines and labels */}
        {Y_AXIS_LABELS.map((value, i) => {
          const y = height - padding - (value - FIXED_MIN_VALUE) * yScale;
          return (
            <g key={i}>
              <line 
                x1={padding} 
                y1={y} 
                x2={width - padding} 
                y2={y} 
                stroke="#e5e7eb"
                strokeDasharray="4 4"
              />
              <text 
                x={padding - 10} 
                y={y} 
                textAnchor="end" 
                alignmentBaseline="middle" 
                className="text-xs fill-gray-500"
              >
                {LABEL_FORMAT[i]}
              </text>
            </g>
          );
        })}

        {/* X-axis labels */}
        {data.map((d, i) => (
          <text 
            key={i} 
            x={padding + i * xScale} 
            y={height - padding + 20} 
            textAnchor="middle" 
            className="text-xs fill-gray-500"
          >
            {d.label}
          </text>
        ))}

        {/* Animated lines */}
        <path 
          d={line1Path} 
          fill="none" 
          stroke="#8884d8" 
          strokeWidth="2"
          className="transition-all duration-[1500ms] ease-in-out"
        />
        <path 
          d={line2Path} 
          fill="none" 
          stroke="#82ca9d" 
          strokeWidth="2"
          className="transition-all duration-[1500ms] ease-in-out"
        />

        {/* Data points */}
        {data.map((point, i) => (
          <g key={i}>
            <circle
              cx={padding + i * xScale}
              cy={height - padding - (point.value - FIXED_MIN_VALUE) * yScale}
              r="4"
              fill="#8884d8"
              className="transition-all duration-[1500ms] ease-in-out"
            />
            <circle
              cx={padding + i * xScale}
              cy={height - padding - (point.value2 - FIXED_MIN_VALUE) * yScale}
              r="4"
              fill="#82ca9d"
              className="transition-all duration-[1500ms] ease-in-out"
            />
          </g>
        ))}

        {/* Legend */}
        <g transform={`translate(${width - 120}, 10)`}>
          <text x="25" y="0" alignmentBaseline="middle" className="text-sm fill-gray-700">Main Trend</text>
          <line x1="0" y1="0" x2="20" y2="0" stroke="#8884d8" strokeWidth="2" />
          <text x="25" y="20" alignmentBaseline="middle" className="text-sm fill-gray-700">Secondary</text>
          <line x1="0" y1="20" x2="20" y2="20" stroke="#82ca9d" strokeWidth="2" />
        </g>
      </svg>

      {/* Tooltip */}
      {tooltip.show && (
        <div
          className="absolute bg-white px-3 py-2 rounded-lg shadow-lg border text-sm z-50 pointer-events-none"
          style={{
            left: tooltip.x,
            top: tooltip.y - 180,
            transform: 'translateX(-50%)',
            opacity: 1
          }}
        >
          <div className="font-medium">{tooltip.label}</div>
          <div className="text-gray-600">RM {tooltip.value.toLocaleString()}</div>
        </div>
      )}
    </div>
  );
};

const GDPChart: React.FC<GDPChartProps> = ({ 
  title, 
  defaultSector, 
  defaultSubsector, 
  sectorOptions, 
  subsectorOptions 
}) => {
  const [currentValue, setCurrentValue] = useState(32285);
  const [growthRate, setGrowthRate] = useState(8.49);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentValue(prev => {
        const newValue = getRandomValue(prev);
        const growth = ((newValue - prev) / prev * 100).toFixed(2);
        setGrowthRate(parseFloat(growth));
        return newValue;
      });
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Card className="w-full">
      <CardHeader className="space-y-3">
        <div>
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold transition-all duration-1000 ease-in-out">
            RM {currentValue.toLocaleString()}
          </span>
          <span className={`text-sm ${growthRate >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {growthRate >= 0 ? '+' : ''}{growthRate}%
          </span>
        </div>
        <div className="flex gap-3">
          <Select defaultValue={defaultSector}>
            <SelectTrigger className="w-[200px] bg-white">
              <SelectValue placeholder={defaultSector} />
            </SelectTrigger>
            <SelectContent>
              {sectorOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select defaultValue={defaultSubsector}>
            <SelectTrigger className="w-[200px] bg-white">
              <SelectValue placeholder={defaultSubsector} />
            </SelectTrigger>
            <SelectContent>
              {subsectorOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="h-[400px] relative">
        <EnhancedChart />
      </CardContent>
    </Card>
  );
};

const GDPCharts = () => {
  const sectorOptions: SelectOption[] = [
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'services', label: 'Services' },
    { value: 'agriculture', label: 'Agriculture' },
  ];

  const subsectorOptions: SelectOption[] = [
    { value: 'textiles', label: 'Textiles' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'finance', label: 'Finance' },
  ];

  return (
    <div className="grid grid-cols-1 gap-4">
      <GDPChart 
        title="GDP Growth Rate" 
        defaultSector={sectorOptions[0].value} 
        defaultSubsector={subsectorOptions[0].value} 
        sectorOptions={sectorOptions} 
        subsectorOptions={subsectorOptions} 
      />
    </div>
  );
};

export default GDPCharts;