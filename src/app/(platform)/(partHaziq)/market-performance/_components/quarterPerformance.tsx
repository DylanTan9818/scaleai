import { Line } from "recharts";
import dynamic from "next/dynamic";

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

export const QuarterPerformance = () => {
  return (
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
  );
};