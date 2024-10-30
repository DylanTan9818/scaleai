import { ReactNode } from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const BentoGrid = ({
  children,
  className,
  cardHeight = "22rem", // Add a default cardHeight prop
}: {
  children: ReactNode;
  className?: string;
  cardHeight?: string; // Add cardHeight prop type
}) => {
  return (
    <div
      className={cn(
        "grid w-full grid-cols-3 gap-4",
        "min-h-[28rem]", // Add minimum height here
        className
      )}
      style={{ gridAutoRows: cardHeight }}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
}: {
  name: string;
  className: string;
  background: ReactNode;
  Icon: any;
  description: string;
  href: string;
}) => (
  <div
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-3xl",
      "h-[28rem]", // Add a fixed height here
      // light styles
      "bg-white shadow-sm hover:shadow-md",
      // dark styles
      "dark:bg-neutral-950 dark:hover:bg-neutral-900",
      "border border-neutral-200 dark:border-neutral-800",
      "transition-all duration-300",
      className
    )}
  >
    <div className="absolute inset-0">{background}</div>
    <div className="relative z-10 p-6">
      <div className="flex items-center gap-4 mb-2">
        <Icon className="h-8 w-8 text-neutral-600 dark:text-neutral-300" />
        <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-200">
          {name}
        </h3>
      </div>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed text-start">
        {description}
      </p>
    </div>

    <div className="relative z-10 p-6 pt-0">
      <Button
        variant="ghost"
        asChild
        size="sm"
        className="hover:bg-neutral-100 dark:hover:
        neutral-800"
      ></Button>
    </div>
  </div>
);

export { BentoCard, BentoGrid };
