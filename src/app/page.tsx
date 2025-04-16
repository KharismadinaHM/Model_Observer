"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { Icons } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";

const dummyChartData = [
  { name: 'Day 1', uv: 400, pv: 2400, amt: 2400 },
  { name: 'Day 2', uv: 300, pv: 1398, amt: 2210 },
  { name: 'Day 3', uv: 200, pv: 9800, amt: 2290 },
  { name: 'Day 4', uv: 278, pv: 3908, amt: 2000 },
  { name: 'Day 5', uv: 189, pv: 4800, amt: 2181 },
  { name: 'Day 6', uv: 239, pv: 3800, amt: 2500 },
  { name: 'Day 7', uv: 349, pv: 4300, amt: 2100 },
];

export default function Home() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  return (
    <SidebarProvider>
      <div className="md:pl-64">
        <header className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-4">
            <SidebarTrigger className="lg:hidden" />
            <h1 className="text-2xl font-semibold">Model Observer</h1>
          </div>
          <Switch id="dark-theme" checked={isDarkTheme} onCheckedChange={setIsDarkTheme} />
        </header>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Model Performance</CardTitle>
                <CardDescription>Real-time performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{ "uv": {} }}>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={dummyChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="uv" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Latency</CardTitle>
                <CardDescription>Model response time</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{ "pv": {} }}>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={dummyChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="pv" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Error Rate</CardTitle>
                <CardDescription>Percentage of failed requests</CardDescription>
              </CardHeader>
              <CardContent>
              <ChartContainer config={{ "amt": {} }}>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={dummyChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="amt" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Sidebar className="fixed inset-y-0 z-50 w-64">
        <SidebarHeader>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage src="https://picsum.photos/50/50" alt="Avatar" />
                  <AvatarFallback>MO</AvatarFallback>
                </Avatar>
                <h2 className="text-lg font-semibold">Model Observer</h2>
              </div>
              <Button variant="outline" size="icon">
                <Icons.settings className="h-4 w-4" />
                <span className="sr-only">Settings</span>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">Monitor and improve your ML models</p>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Icons.home className="h-4 w-4" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/models">
                  <SidebarMenuButton>
                    <Icons.workflow className="h-4 w-4" />
                    <span>Models</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Icons.file className="h-4 w-4" />
                  <span>Data Upload</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Icons.share className="h-4 w-4" />
                  <span>Alerting</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Settings</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Icons.user className="h-4 w-4" />
                  <span>Profile</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Icons.settings className="h-4 w-4" />
                  <span>Preferences</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <p className="text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Model Observer. All rights reserved.
          </p>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
}
