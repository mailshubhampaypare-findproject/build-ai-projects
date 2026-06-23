import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Sparkles,
  Library,
  FolderOpen,
  CreditCard,
  User,
  Settings,
  X,
} from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/create", label: "Create Project", icon: Sparkles },
  { to: "/browse", label: "Browse Projects", icon: Library },
  { to: "/projects", label: "My Projects", icon: FolderOpen },
  { to: "/pricing", label: "Pricing", icon: CreditCard },
  { to: "/profile", label: "Profile", icon: User },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function AppSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-foreground/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-5">
          <BrandLogo to="/dashboard" />
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {NAV.map((item) => {
            const active =
              item.to === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-sidebar-border p-4">
          <div className="rounded-xl bg-brand p-4 text-brand-foreground">
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Pro Plan</p>
            <p className="mt-1 text-sm font-medium">12 / 50 credits used</p>
            <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-brand-foreground/20">
              <div className="h-full w-1/4 bg-brand-foreground" />
            </div>
            <Button
              asChild
              size="sm"
              variant="secondary"
              className="mt-4 w-full bg-brand-foreground/15 text-brand-foreground hover:bg-brand-foreground/25"
            >
              <Link to="/pricing">Upgrade plan</Link>
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
