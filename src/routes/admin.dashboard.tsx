import { createFileRoute } from "@tanstack/react-router";
import {
  Package,
  Download,
  Users,
  Eye,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Plus
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  Cell
} from "recharts";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/dashboard")({
  component: DashboardPage,
});

function useDashboardStats() {
  return useQuery({
    queryKey: ["admin", "dashboard-stats"],
    queryFn: async () => {
      const [
        { count: totalProjects },
        { count: publishedProjects },
        { count: draftProjects },
        { count: totalUsers },
        { count: totalCategories },
        { count: totalTechnologies },
      ] = await Promise.all([
        supabase.from("projects").select("*", { count: "exact", head: true }),
        supabase.from("projects").select("*", { count: "exact", head: true }).eq("status", "Published"),
        supabase.from("projects").select("*", { count: "exact", head: true }).eq("status", "Draft"),
        supabase.from("profiles").select("*", { count: "exact", head: true }),
        supabase.from("categories").select("*", { count: "exact", head: true }),
        supabase.from("technologies").select("*", { count: "exact", head: true }),
      ]);

      const { data: recentProjects } = await supabase
        .from("projects")
        .select("id, name, status, downloads, created_at")
        .order("created_at", { ascending: false })
        .limit(5);

      const { data: projectsWithTech } = await supabase
        .from("projects")
        .select("downloads");

      const totalDownloads = projectsWithTech?.reduce((acc, p) => acc + (p.downloads || 0), 0) || 0;

      return {
        totalProjects: totalProjects || 0,
        publishedProjects: publishedProjects || 0,
        draftProjects: draftProjects || 0,
        totalUsers: totalUsers || 0,
        totalCategories: totalCategories || 0,
        totalTechnologies: totalTechnologies || 0,
        totalDownloads,
        recentProjects: recentProjects || [],
      };
    },
  });
}

const VIEWS_DATA = [
  { name: "Mon", views: 4000, downloads: 2400 },
  { name: "Tue", views: 3000, downloads: 1398 },
  { name: "Wed", views: 2000, downloads: 9800 },
  { name: "Thu", views: 2780, downloads: 3908 },
  { name: "Fri", views: 1890, downloads: 4800 },
  { name: "Sat", views: 2390, downloads: 3800 },
  { name: "Sun", views: 3490, downloads: 4300 },
];

function DashboardPage() {
  const { data: stats, isLoading } = useDashboardStats();

  const displayStats = [
    {
      label: "Total Projects",
      value: stats?.totalProjects.toString() || "0",
      icon: Package,
      change: "+12%",
      trend: "up",
      color: "text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400"
    },
    {
      label: "Total Downloads",
      value: stats?.totalDownloads.toLocaleString() || "0",
      icon: Download,
      change: "+18%",
      trend: "up",
      color: "text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400"
    },
    {
      label: "Active Users",
      value: stats?.totalUsers.toString() || "0",
      icon: Users,
      change: "+5%",
      trend: "up",
      color: "text-purple-600 bg-purple-100 dark:bg-purple-900/20 dark:text-purple-400"
    },
    {
      label: "Categories",
      value: stats?.totalCategories.toString() || "0",
      icon: Eye,
      change: "+2",
      trend: "up",
      color: "text-amber-600 bg-amber-100 dark:bg-amber-900/20 dark:text-amber-400"
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground">Welcome back, Admin. Here's what's happening today.</p>
        </div>
        <Button asChild>
          <Link to="/admin/projects" className="gap-2">
            <Plus className="h-4 w-4" /> New Project
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {displayStats.map((stat) => (
          <Card key={stat.label} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <div className={cn("rounded-lg p-2", stat.color)}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoading ? "..." : stat.value}
              </div>
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>
                  {stat.trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {stat.change}
                </span>
                from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Analytics Chart */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Views & Downloads</CardTitle>
            <CardDescription>Daily performance metrics for the past 7 days.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={VIEWS_DATA}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--brand)" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="var(--brand)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      borderColor: "hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="views"
                    stroke="var(--brand)"
                    fillOpacity={1}
                    fill="url(#colorViews)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Projects */}
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Projects</CardTitle>
              <CardDescription>Latest project uploads and updates.</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to="/admin/projects">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isLoading ? (
                <p className="text-center py-4 text-sm text-muted-foreground">Loading projects...</p>
              ) : stats?.recentProjects.map((project) => (
                <div key={project.id} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <Package className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-none truncate">{project.name}</p>
                    <p className="text-xs text-muted-foreground">{project.status}</p>
                  </div>
                  <div className="text-right">
                    <div className={cn(
                      "inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                      project.status === "Published"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-muted text-muted-foreground"
                    )}>
                      {project.status}
                    </div>
                    <p className="mt-1 text-[10px] text-muted-foreground">{project.downloads} downloads</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
