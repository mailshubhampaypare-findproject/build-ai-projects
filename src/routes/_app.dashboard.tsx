import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sparkles,
  Library,
  PlayCircle,
  FolderOpen,
  CheckCircle2,
  Download,
  Coins,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MY_PROJECTS, statusBadgeClasses } from "@/lib/projects-data";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — ProjectAI" }] }),
  component: Dashboard,
});

const STATS = [
  { label: "Total Projects", value: "14", icon: FolderOpen, tone: "text-foreground" },
  {
    label: "Active Projects",
    value: "03",
    icon: PlayCircle,
    tone: "text-amber-600 dark:text-amber-400",
  },
  { label: "Downloaded", value: "08", icon: Download, tone: "text-brand" },
  { label: "Credits Remaining", value: "38", icon: Coins, tone: "text-foreground" },
];

function Dashboard() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6 sm:p-8">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight">Welcome back, Jane</h1>
        <p className="mt-1.5 text-muted-foreground">
          Pick up where you left off, or start something new today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <div className="flex items-start justify-between">
              <p className="text-sm font-medium text-muted-foreground">{s.label}</p>
              <s.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className={`mt-3 font-display text-3xl font-semibold tracking-tight ${s.tone}`}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <QuickAction
          to="/create"
          icon={Sparkles}
          title="Create New Project"
          desc="Describe your idea and let AI build it for you."
          primary
        />
        <QuickAction
          to="/browse"
          icon={Library}
          title="Browse Templates"
          desc="Pick from a library of ready-to-build projects."
        />
        <QuickAction
          to={`/projects/${MY_PROJECTS[1].id}`}
          icon={PlayCircle}
          title="Continue Last Project"
          desc={MY_PROJECTS[1].name + " · 60% complete"}
        />
      </div>

      {/* Recent + activity */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card shadow-card">
          <div className="flex items-center justify-between border-b border-border p-5">
            <h2 className="font-semibold">Recent Projects</h2>
            <Button asChild variant="ghost" size="sm">
              <Link to="/projects">
                View all <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
          <ul className="divide-y divide-border">
            {MY_PROJECTS.slice(0, 4).map((p) => (
              <li key={p.id}>
                <Link
                  to="/projects/$id"
                  params={{ id: p.id }}
                  className="flex items-center justify-between gap-4 p-5 transition-colors hover:bg-muted/50"
                >
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 w-full sm:flex sm:items-center">
                    <div className="min-w-0">
                      <p className="truncate font-medium">{p.name}</p>
                      <p className="mt-0.5 truncate text-xs text-muted-foreground">
                        {p.tech.join(" · ")} · Updated {p.updatedAt}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`shrink-0 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${statusBadgeClasses(p.status)}`}
                  >
                    {p.status}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <h2 className="font-semibold">Recent Activity</h2>
          <ul className="mt-5 space-y-4">
            {[
              { t: "Report generated for AI Resume Parser", time: "5h ago" },
              { t: "Smart Health Monitor marked Completed", time: "Yesterday" },
              { t: "New template added: Hospital Management", time: "2 days ago" },
              { t: "Subscription renewed (Pro Plan)", time: "5 days ago" },
            ].map((a, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-1 size-2 shrink-0 rounded-full bg-brand" />
                <div className="min-w-0">
                  <p className="text-sm">{a.t}</p>
                  <p className="text-xs text-muted-foreground">{a.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function QuickAction({
  to,
  icon: Icon,
  title,
  desc,
  primary,
}: {
  to: string;
  icon: typeof Sparkles;
  title: string;
  desc: string;
  primary?: boolean;
}) {
  return (
    <Link
      to={to}
      className={`group rounded-2xl border p-6 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-elevated ${
        primary ? "border-brand/30 bg-brand/5" : "border-border bg-card"
      }`}
    >
      <div
        className={`grid size-10 place-items-center rounded-lg ${primary ? "bg-brand text-brand-foreground" : "bg-muted text-foreground"}`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <p className="mt-4 font-semibold">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
      <div className="mt-4 inline-flex items-center text-sm font-medium text-brand">
        Continue{" "}
        <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}

// satisfy unused import lint when CheckCircle2 isn't used directly
void CheckCircle2;
