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

export const MPIProjection = () => {
  return (
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
  );
};