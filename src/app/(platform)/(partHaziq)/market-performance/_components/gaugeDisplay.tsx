import Image from "next/image";
import { Separator } from "@/components/ui/separator";

interface GaugeDisplayProps {
  value?: number;
}

export const GaugeDisplay = ({ value = 85 }: GaugeDisplayProps) => {
  const radius = 48;
  const strokeWidth = 10;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * Math.PI;
  const progressOffset = circumference - (value / 100) * circumference;
  const containerSize = radius * 6;
  const rotationAngle = (value / 100) * 180 - 90;

  const getMarketStatus = (value: number) => {
    if (value >= 66)
      return { text: "Good Market Performance", color: "text-emerald-400" };
    if (value >= 33)
      return { text: "Neutral Market Performance", color: "text-blue-400" };
    return { text: "Poor Market Performance", color: "text-red-400" };
  };

  const status = getMarketStatus(value);

  return (
    <div className="absolute inset-0 flex items-center justify-between p-6">
      <div className="relative w-full h-full mt-20">
      <div className="mt-20">
        <Image
          className="absolute inset-0"
          src="/images/assets/mpi-gauge.svg"
          alt="gauge"
          layout="fill"
          objectFit="contain"
        />
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            <div
              className="absolute left-1/2 top-[45%]"
              style={{
                transform: `translate(-50%, -50%) rotate(${rotationAngle}deg)`,
                transformOrigin: "50% 65%",
                width: `${containerSize}px`,
                height: `${containerSize}px`,
              }}
            >
              <Image
                height={containerSize}
                width={containerSize}
                src="/images/assets/arrow.svg"
                alt="arrow"
                className="w-full h-full"
                style={{
                  transformOrigin: "center",
                  transform: `scale(${radius / 80})`,
                }}
              />
            </div>
          </div>
        </div>
        {/* Value display */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="mt-8 text-5xl font-bold">{value}</span>
        </div>
      </div>

      {/* Status text section */}
      <div className="absolute bottom-5 left-0 right-0 flex flex-col items-center">
        <Separator className="w-24 mb-4" />
        <span className={`text-xl font-semibold ${status.color}`}>
          {status.text}
        </span>
      </div>
      </div>
    </div>
  );
};