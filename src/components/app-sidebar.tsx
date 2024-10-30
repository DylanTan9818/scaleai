"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Home, Rocket, LineChart, User2 } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Logo } from "./logo";

// Menu Items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "MPI",
    url: "/market-performance",
    icon: LineChart,
  },
  {
    title: "Grant/Loan Recommendation",
    url: "/loan-grant-recommendation",
    icon: Rocket,
  },
];

export function AppSidebar() {
  const [currentPath, setCurrentPath] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
    }
  }, [pathname]);

  return (
    <Sidebar>
      <SidebarHeader />
      <div className="p-2 mb-10">
        <Logo />
      </div>
      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={currentPath === item.url}>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex">
          <User2 />
          <span>My Profile</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
