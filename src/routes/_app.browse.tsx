import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Download, Eye, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CATEGORIES, TEMPLATE_PROJECTS } from "@/lib/projects-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/browse")({
  head: () => ({ meta: [{ title: "Browse Projects — ProjectAI" }] }),
  component: Browse,
});

function Browse() {
  const [cat, setCat] = useState<string>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return TEMPLATE_PROJECTS.filter((p) => {
      const matchesCat = cat === "All" || p.category === cat;
      const matchesQuery =
        query.trim() === "" ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.tech.some((t) => t.toLowerCase().includes(query.toLowerCase()));
      return matchesCat && matchesQuery;
    });
  }, [cat, query]);

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6 sm:p-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-3xl font-semibold tracking-tight">Browse Projects</h1>
        <p className="text-muted-foreground">
          Pick a ready-to-build template and customize it with AI.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search templates..."
            className="h-10 pl-9"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <SlidersHorizontal className="h-4 w-4 shrink-0 text-muted-foreground" />
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={cn(
                "shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                cat === c
                  ? "border-brand bg-brand text-brand-foreground"
                  : "border-border bg-card text-muted-foreground hover:bg-muted",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
          No projects match your filters.
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <article
              key={p.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all hover:-translate-y-0.5 hover:shadow-elevated"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-brand/20 via-brand/5 to-background">
                <div className="absolute inset-0 grid place-items-center text-brand">
                  <span className="font-display text-4xl font-semibold opacity-30">
                    {p.name
                      .split(" ")
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 3)}
                  </span>
                </div>
                <span className="absolute right-3 top-3 rounded-md border border-border bg-card/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur">
                  {p.difficulty}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-semibold group-hover:text-brand transition-colors">{p.name}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{p.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <span key={t} className="rounded-md border border-border bg-muted/50 px-2 py-0.5 text-[10px] font-medium">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-2">
                  <Button asChild size="sm" className="flex-1">
                    <Link to="/projects/$id" params={{ id: p.id }}>
                      <Eye className="mr-1.5 h-3.5 w-3.5" /> View
                    </Link>
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Download className="mr-1.5 h-3.5 w-3.5" /> Use
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
