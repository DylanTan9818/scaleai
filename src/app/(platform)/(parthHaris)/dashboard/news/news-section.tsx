'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const newsItems = [
  {
    title: "Microsoft to invest US$2.2b in cloud and AI services in Malaysia",
    image: "/images/microsoft.png",  // Use absolute path from public folder
    trending: true,
  },
  {
    title: "Malaysia Races To Become Global Tech Hub: From Semiconductors To Data Centres | CNA Correspondent",
    image: "/images/Malaysia.jpg",   // Use absolute path from public folder
    trending: true,
  },
  {
    title: "SME News | MRANTI addresses Malaysia's shift to become technology producer",
    image: "/images/mranti.jpg",     // Use absolute path from public folder
    trending: true,
  },
];

export function NewsSection() {
  return (
    <Card className="bg-white h-full">
      <CardHeader className="space-y-2">
        <CardTitle>News</CardTitle>
        <p className="text-sm text-muted-foreground">
          Find trending tech news that could impact the market.
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {newsItems.map((item, index) => (
            <div key={index} className="flex items-start gap-4">
              <Image 
                src={item.image} 
                alt={item.title}
                width={80}
                height={80}
                className="rounded-lg bg-slate-100 object-cover"
              />
              <div className="space-y-2">
                <p className="text-sm font-medium leading-tight">{item.title}</p>
                <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium text-purple-700 bg-purple-50">
                  Trending
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}