import Image from "next/image";
import {
  GlobeIcon,
  ShoppingCartIcon,
  PackageIcon,
  TramFrontIcon,
} from "lucide-react";

import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { cn } from "@/lib/utils";
import { MPIflow } from "@/app/(landing page)/_component/animatedbeam-MPI";
import { LLMflow } from "@/app/(landing page)/_component/animatedbeam-LLM";

const features = [
  {
    Icon: GlobeIcon,
    name: "Analyze Market Performance with NLP Transformers",
    description:
      "Offers a cumulative score from recent market news, helping SMEs make quick, informed decisions.",
    href: "/",
    cta: "Learn more",
    background: (
      <>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 opacity-50 z-0" />
        <MPIflow className="absolute right-2 top-4 h-[300px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_bottom,transparent_2%,#000_40%)]  group-hover:scale-105 z-10" />
      </>
    ),
    className: "lg:col-span-2 lg:row-span-1",
  },
  {
    Icon: ShoppingCartIcon,
    name: " Dashboard",
    description:
      "historical GDP trends by sector, helping businesses make informed decisions.",
    href: "/",
    cta: "Learn more",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-50" />
    ),
    className: "lg:col-span-1 lg:row-span-1",
  },
  {
    Icon: TramFrontIcon,
    name: "Easy Integrations",
    description:
      "For future improvement, system is able to receive data from government agencies to provide a comprehensive view of your business.",
    href: "/",
    cta: "Learn more",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-teal-50 opacity-50" />
    ),
    className: "lg:col-span-1 lg:row-span-1",
  },
  {
    Icon: PackageIcon,
    name: "LLM Recommends Loan & Grants",
    description:
      "Matches SMEs with suitable financial programs to reduce reliance on expensive loans.",
    href: "/",
    cta: "Learn more",
    background: (
      <div>
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-yellow-50 opacity-50" />
        <LLMflow className="absolute right-2 top-4 h-[300px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_2%,#000_30%)] group-hover:scale-105 z-10" />
      </div>
    ),
    className: "lg:col-span-2 lg:row-span-1",
  },
];

const Bento = () => {
  return (
    <BentoGrid className="lg:grid-cols-3 lg:grid-rows-2 lg:max-w-6xl mx-auto gap-4">
      {features.map((feature) => (
        <BentoCard
          key={feature.name}
          {...feature}
          className={cn(
            feature.className,
            "h-[20rem]",
            "bg-white dark:bg-neutral-950 dark:hover:bg-neutral-900 transition-all duration-300",
            "border border-neutral-200 dark:border-neutral-800",
            "rounded-3xl overflow-hidden",
            "group relative"
          )}
        />
      ))}
    </BentoGrid>
  );
};

export default Bento;
