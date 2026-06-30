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
  Heart,
  History,
  Lightbulb,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MY_PROJECTS, TEMPLATE_PROJECTS, statusBadgeClasses } from "@/lib/projects-data";

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

      {/* Saved, Recently Viewed, Recommended */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Saved Projects */}
        <section className="rounded-2xl border border-border bg-card shadow-card">
          <div className="flex items-center justify-between border-b border-border p-5">
            <h2 className="font-semibold flex items-center gap-2">
              <Heart className="h-4 w-4 text-rose-500" /> Saved Projects
            </h2>
            <Button asChild variant="ghost" size="sm">
              <Link to="/browse">Explore more</Link>
            </Button>
          </div>
          <div className="p-4 space-y-3">
            {TEMPLATE_PROJECTS.slice(0, 3).map(p => (
              <ProjectListItem key={p.id} project={p} />
            ))}
          </div>
        </section>

        {/* Recently Viewed */}
        <section className="rounded-2xl border border-border bg-card shadow-card">
          <div className="flex items-center justify-between border-b border-border p-5">
            <h2 className="font-semibold flex items-center gap-2">
              <History className="h-4 w-4 text-brand" /> Recently Viewed
            </h2>
          </div>
          <div className="p-4 space-y-3">
            {TEMPLATE_PROJECTS.slice(3, 6).map(p => (
              <ProjectListItem key={p.id} project={p} />
            ))}
          </div>
        </section>
      </div>

      {/* Recommended for You */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-semibold tracking-tight flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-amber-500" /> Recommended for You
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TEMPLATE_PROJECTS.slice(1, 4).map(p => (
            <article key={p.id} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-card transition-all hover:-translate-y-1">
              <div className="flex items-start justify-between">
                <div className="size-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center font-bold">
                  {p.name[0]}
                </div>
                <div className="flex items-center gap-1 text-xs font-medium text-amber-500">
                  <Star className="h-3 w-3 fill-current" /> {p.rating}
                </div>
              </div>
              <h3 className="mt-4 font-semibold group-hover:text-brand transition-colors">{p.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{p.description}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.tech.map(t => (
                  <span key={t} className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium">{t}</span>
                ))}
              </div>
              <Button asChild size="sm" variant="ghost" className="mt-4 w-full justify-between group-hover:bg-brand group-hover:text-brand-foreground">
                <Link to="/projects/$id" params={{ id: p.id }}>
                  View Project <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </article>
          ))}
        </div>
      </section>

      {/* Recent + activity */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card shadow-card">
          <div className="flex items-center justify-between border-b border-border p-5">
            <h2 className="font-semibold">Active Projects</h2>
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

function ProjectListItem({ project }: { project: (typeof TEMPLATE_PROJECTS)[0] }) {
  return (
    <Link
      to="/projects/$id"
      params={{ id: project.id }}
      className="flex items-center gap-4 p-3 rounded-xl border border-transparent hover:border-border hover:bg-muted/30 transition-all"
    >
      <div className="size-10 shrink-0 rounded-lg bg-muted flex items-center justify-center font-bold text-xs">
        {project.name[0]}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold truncate">{project.name}</p>
        <p className="text-[10px] text-muted-foreground truncate">{project.tech.join(" · ")}</p>
      </div>
      <ArrowRight className="h-4 w-4 text-muted-foreground/30" />
    </Link>
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
