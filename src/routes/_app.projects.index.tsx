import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MY_PROJECTS, statusBadgeClasses } from "@/lib/projects-data";

export const Route = createFileRoute("/_app/projects/")({
  head: () => ({ meta: [{ title: "My Projects — ProjectAI" }] }),
  component: MyProjects,
});

function MyProjects() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6 sm:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight">My Projects</h1>
          <p className="mt-1.5 text-muted-foreground">
            All your AI-generated projects, in one place.
          </p>
        </div>
        <Button asChild>
          <Link to="/create">
            <Plus className="mr-1 h-4 w-4" /> New Project
          </Link>
        </Button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {MY_PROJECTS.map((p) => (
          <article
            key={p.id}
            className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-elevated"
          >
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
              <div className="min-w-0">
                <h3 className="truncate font-semibold group-hover:text-brand transition-colors">
                  {p.name}
                </h3>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  {p.tech.join(" · ")}
                </p>
              </div>
              <span
                className={`shrink-0 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${statusBadgeClasses(p.status)}`}
              >
                {p.status}
              </span>
            </div>
            <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{p.description}</p>

            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{p.progress}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-brand" style={{ width: `${p.progress}%` }} />
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Updated {p.updatedAt}</span>
              <Button asChild size="sm" variant="outline">
                <Link to="/projects/$id" params={{ id: p.id }}>
                  Open
                </Link>
              </Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
