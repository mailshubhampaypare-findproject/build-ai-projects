import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { adminLogout } from "@/lib/admin-auth";
import { toast } from "sonner";
import { LogOut, LayoutDashboard, Database, Settings } from "lucide-react";

export const Route = createFileRoute("/cms/dashboard")({
  component: CMSDashboard,
});

function CMSDashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    await adminLogout();
    toast.success("Logged out successfully");
    router.invalidate();
    router.navigate({ to: "/cms/login" });
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Placeholder */}
      <aside className="w-64 border-r bg-card p-6 hidden md:block">
        <div className="mb-10">
          <h2 className="text-xl font-bold">ProjectAI CMS</h2>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Management</p>
        </div>
        <nav className="space-y-1">
          <Link
            to="/cms/dashboard"
            className="flex items-center gap-3 px-3 py-2 rounded-md bg-primary/10 text-primary font-medium"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          <div className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors cursor-not-allowed">
            <Database className="h-4 w-4" />
            Projects
          </div>
          <div className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors cursor-not-allowed">
            <Settings className="h-4 w-4" />
            Settings
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-muted/20">
        <header className="h-16 border-b bg-card flex items-center justify-between px-8">
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </header>

        <div className="p-8">
          <div className="bg-card rounded-xl border p-12 text-center shadow-sm">
            <h2 className="text-2xl font-bold mb-2">Welcome to the Admin Dashboard</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              This is the secure area where you will be able to manage projects, users, and site settings.
            </p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4 bg-muted/10">
                <div className="text-2xl font-bold">--</div>
                <div className="text-xs text-muted-foreground uppercase">Total Projects</div>
              </div>
              <div className="border rounded-lg p-4 bg-muted/10">
                <div className="text-2xl font-bold">--</div>
                <div className="text-xs text-muted-foreground uppercase">Active Users</div>
              </div>
              <div className="border rounded-lg p-4 bg-muted/10">
                <div className="text-2xl font-bold">--</div>
                <div className="text-xs text-muted-foreground uppercase">Storage Used</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
