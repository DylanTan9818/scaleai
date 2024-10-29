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
  return (
    <Sidebar>
      <SidebarHeader />
      <Logo />
      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
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
