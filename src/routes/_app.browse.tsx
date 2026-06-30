import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Download, Eye, Search, SlidersHorizontal, Star, TrendingUp, Clock, Zap, Heart, LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CATEGORIES,
  DEPARTMENTS,
  LANGUAGES,
  DIFFICULTIES,
  TEMPLATE_PROJECTS,
  type Project,
} from "@/lib/projects-data";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/_app/browse")({
  head: () => ({ meta: [{ title: "Browse Projects — ProjectAI" }] }),
  component: Browse,
});

type SortOption = "newest" | "popular" | "rating";

function Browse() {
  const [cat, setCat] = useState<string>("All");
  const [dept, setDept] = useState<string>("All");
  const [lang, setLang] = useState<string>("All");
  const [diff, setDiff] = useState<string>("All");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  const filtered = useMemo(() => {
    let result = TEMPLATE_PROJECTS.filter((p) => {
      const matchesCat = cat === "All" || p.category === cat;
      const matchesDept = dept === "All" || p.department === dept;
      const matchesLang = lang === "All" || p.language === lang;
      const matchesDiff = diff === "All" || p.difficulty === diff;

      const q = query.toLowerCase().trim();
      const matchesQuery =
        q === "" ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tech.some((t) => t.toLowerCase().includes(q)) ||
        p.department?.toLowerCase().includes(q) ||
        p.language?.toLowerCase().includes(q);

      return matchesCat && matchesDept && matchesLang && matchesDiff && matchesQuery;
    });

    // Sorting logic
    if (sortBy === "popular") {
      result = [...result].sort((a, b) => (b.downloads || 0) - (a.downloads || 0));
    } else if (sortBy === "rating") {
      result = [...result].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
    // "newest" is default (by order in mock data or could add createdAt)

    return result;
  }, [cat, dept, lang, diff, sortBy, query]);

  const paginated = useMemo(() => {
    return filtered.slice(0, page * ITEMS_PER_PAGE);
  }, [filtered, page]);

  const hasMore = paginated.length < filtered.length;

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6 sm:p-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-3xl font-semibold tracking-tight">Browse Projects</h1>
        <p className="text-muted-foreground">
          Pick a ready-to-build template and customize it with AI.
        </p>
      </div>

      {/* Filters */}
      <div className="space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search projects by name, tech, department..."
              className="h-11 pl-9 shadow-sm"
            />
          </div>
          <div className="flex items-center gap-3">
            <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
              <SelectTrigger className="w-[160px] h-11">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Department</label>
            <Select value={dept} onValueChange={(v) => { setDept(v); setPage(1); }}>
              <SelectTrigger className="w-full bg-card">
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                {DEPARTMENTS.map(d => (
                  <SelectItem key={d} value={d}>{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Programming Language</label>
            <Select value={lang} onValueChange={(v) => { setLang(v); setPage(1); }}>
              <SelectTrigger className="w-full bg-card">
                <SelectValue placeholder="All Languages" />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map(l => (
                  <SelectItem key={l} value={l}>{l}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Difficulty</label>
            <Select value={diff} onValueChange={(v) => { setDiff(v); setPage(1); }}>
              <SelectTrigger className="w-full bg-card">
                <SelectValue placeholder="All Levels" />
              </SelectTrigger>
              <SelectContent>
                {DIFFICULTIES.map(d => (
                  <SelectItem key={d} value={d}>{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Category</label>
            <Select value={cat} onValueChange={(v) => { setCat(v); setPage(1); }}>
              <SelectTrigger className="w-full bg-card">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map(c => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Grid */}
      {paginated.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
          No projects match your filters.
        </div>
      ) : (
        <div className="space-y-10">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {paginated.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center pt-4">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setPage(p => p + 1)}
                className="min-w-[200px] rounded-full border-2"
              >
                Load More Projects
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all hover:-translate-y-0.5 hover:shadow-elevated">
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-brand/20 via-brand/5 to-background">
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={project.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center text-brand">
            <span className="font-display text-4xl font-semibold opacity-30">
              {project.name
                .split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 3)}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

        <div className="absolute right-3 top-3 flex gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsSaved(!isSaved);
            }}
            className={cn(
              "rounded-full p-2 backdrop-blur-md transition-all",
              isSaved ? "bg-brand text-brand-foreground" : "bg-card/80 text-foreground hover:bg-brand hover:text-brand-foreground",
            )}
          >
            <Heart className={cn("h-4 w-4", isSaved && "fill-current")} />
          </button>
          <span className="rounded-md border border-white/20 bg-black/50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
            {project.difficulty}
          </span>
        </div>

        <div className="absolute bottom-3 left-3 flex items-center gap-3 text-white opacity-0 transition-opacity group-hover:opacity-100">
          <div className="flex items-center gap-1 text-[10px] font-medium">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            {project.rating || "4.5"}
          </div>
          <div className="flex items-center gap-1 text-[10px] font-medium">
            <Download className="h-3 w-3" />
            {project.downloads || "0"}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold group-hover:text-brand transition-colors line-clamp-1">
              {project.name}
            </h3>
            <p className="text-[10px] font-medium text-brand uppercase tracking-wider">{project.category}</p>
          </div>
        </div>

        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground min-h-[40px]">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-md border border-border bg-muted/50 px-2 py-0.5 text-[10px] font-medium"
            >
              {t}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="rounded-md border border-border bg-muted/50 px-2 py-0.5 text-[10px] font-medium">
              +{project.tech.length - 3}
            </span>
          )}
        </div>

        <div className="mt-6 space-y-2">
          <div className="flex items-center gap-2">
            <Button asChild size="sm" className="flex-1 shadow-sm">
              <Link to="/projects/$id" params={{ id: project.id }}>
                <Eye className="mr-1.5 h-3.5 w-3.5" /> View Details
              </Link>
            </Button>
            <Button size="sm" variant="outline" className="flex-1">
              <Zap className="mr-1.5 h-3.5 w-3.5" /> Similar
            </Button>
          </div>
          <Button size="sm" variant="ghost" className="w-full text-xs text-muted-foreground hover:text-brand">
            Save to My Projects
          </Button>
        </div>
      </div>
    </article>
  );
}
