import { createFileRoute, Outlet, redirect, Link, useRouter, useLocation } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { adminLogout } from "@/lib/admin-auth";
import { toast } from "sonner";
import {
  LogOut,
  LayoutDashboard,
  Database,
  Settings,
  FolderOpen,
  Tags,
  Cpu,
  Users,
  Image as ImageIcon,
} from "lucide-react";

export const Route = createFileRoute("/cms")({
  beforeLoad: ({ context, location }) => {
    // Allow access to login and unauthorized pages
    if (
      location.pathname === "/cms/login" ||
      location.pathname === "/cms/unauthorized"
    ) {
      return;
    }

    // Redirect unauthenticated users to login
    if (!context.isAdmin) {
      throw redirect({
        to: "/cms/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: CMSLayout,
});

function CMSLayout() {
  const router = useRouter();
  const location = useLocation();

  const isLoginPage = location.pathname === "/cms/login";
  const isUnauthorizedPage = location.pathname === "/cms/unauthorized";

  if (isLoginPage || isUnauthorizedPage) {
    return (
      <div className="min-h-screen bg-background font-sans antialiased">
        <Outlet />
      </div>
    );
  }

  const handleLogout = async () => {
    await adminLogout();
    toast.success("Logged out successfully");
    router.invalidate();
    router.navigate({ to: "/cms/login" });
  };

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, to: "/cms/dashboard" },
    { label: "Projects", icon: FolderOpen, to: "/cms/projects" },
    { label: "Categories", icon: Tags, to: "/cms/categories" },
    { label: "Technologies", icon: Cpu, to: "/cms/technologies" },
    { label: "Users", icon: Users, to: "/cms/users" },
    { label: "Media", icon: ImageIcon, to: "/cms/media" },
    { label: "Settings", icon: Settings, to: "/cms/settings" },
  ];

  return (
    <div className="flex min-h-screen bg-background font-sans antialiased">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card p-6 hidden md:block">
        <div className="mb-10">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <h2 className="text-xl font-bold">ProjectAI CMS</h2>
          </Link>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Management</p>
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeProps={{ className: "bg-primary/10 text-primary font-medium" }}
              inactiveProps={{
                className: "text-muted-foreground hover:bg-accent hover:text-foreground",
              }}
              className="flex items-center gap-3 px-3 py-2 rounded-md transition-colors"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b bg-card flex items-center justify-between px-8">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold capitalize">
              {location.pathname.split("/").pop()}
            </h1>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </header>

        <main className="flex-1 overflow-y-auto p-8 bg-muted/20">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
