import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  Code2,
  File,
  FileText,
  FolderClosed,
  Github,
  HelpCircle,
  Paperclip,
  Presentation,
  Send,
  Sparkles,
  Database,
  Layers,
  Image as ImageIcon,
  Rocket,
  CheckCircle2,
  Clock,
  Users,
  Target,
  ChevronDown,
  ChevronRight,
  Copy,
  Terminal,
  ExternalLink,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { getProject, statusBadgeClasses, type Project } from "@/lib/projects-data";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";

export const Route = createFileRoute("/_app/projects/$id")({
  loader: ({ params }): { project: Project } => {
    const project = getProject(params.id);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.project.name ?? "Project"} — ProjectAI` }],
  }),
  notFoundComponent: () => (
    <div className="p-12 text-center text-muted-foreground">
      Project not found.{" "}
      <Link to="/projects" className="text-brand underline">
        Back to projects
      </Link>
    </div>
  ),
  component: ProjectDetail,
});

const FILES = [
  { name: "README.md", icon: Github, type: "doc" },
  { name: "documentation/", icon: FolderClosed, type: "folder" },
  { name: "report.pdf", icon: FileText, type: "doc" },
  { name: "slides.pptx", icon: Presentation, type: "doc" },
  { name: "interview-qa.md", icon: HelpCircle, type: "doc" },
  { name: "frontend/", icon: FolderClosed, type: "folder" },
  { name: "backend/", icon: FolderClosed, type: "folder" },
  { name: "schema.sql", icon: Code2, type: "code" },
];

const INITIAL_MESSAGES = [
  {
    role: "user" as const,
    text: "Add a database schema for user authentication and property listings. Use SQLite.",
  },
  {
    role: "ai" as const,
    text: "Done. I've updated `schema.sql` with `users` and `properties` tables, plus a `sessions` table for auth. Want me to wire up the Flask routes?",
  },
];

function ProjectDetail() {
  const { project } = Route.useLoaderData();
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [activeFile, setActiveFile] = useState("README.md");

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [
      ...m,
      { role: "user", text },
      { role: "ai", text: "Got it — I'm regenerating the affected files now." },
    ]);
    setInput("");
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-card px-6 py-4">
        <div className="flex items-center gap-3 min-w-0">
          <Button asChild variant="ghost" size="icon" className="shrink-0">
            <Link to="/projects">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div className="min-w-0">
            <h1 className="truncate font-display text-xl font-semibold tracking-tight">
              {project.name}
            </h1>
            <p className="truncate text-xs text-muted-foreground">{project.tech.join(" · ")}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${statusBadgeClasses(project.status)}`}
          >
            {project.status}
          </span>
          <Button variant="outline" size="sm">
            Download .zip
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="workspace" className="flex flex-1 min-h-0 flex-col">
        <div className="border-b border-border bg-card px-6">
          <TabsList className="h-auto bg-transparent p-0">
            {[
              ["workspace", "Workspace"],
              ["overview", "Overview"],
              ["launch", "🚀 Launch Guide"],
              ["screenshots", "Screenshots"],
              ["structure", "Structure"],
              ["modules", "Modules"],
              ["database", "Database"],
              ["docs", "Documentation"],
              ["tech", "Technologies"],
            ].map(([v, l]) => (
              <TabsTrigger
                key={v}
                value={v}
                className="rounded-none border-b-2 border-transparent bg-transparent px-4 py-3 text-sm data-[state=active]:border-brand data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none whitespace-nowrap"
              >
                {l}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="workspace" className="flex-1 min-h-0 m-0 p-0">
          <div className="grid h-full grid-cols-1 md:grid-cols-[240px_minmax(0,1fr)_280px]">
            {/* File explorer */}
            <aside className="hidden border-r border-border bg-muted/30 p-4 md:block overflow-y-auto">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Files
              </p>
              <ul className="space-y-1">
                {FILES.map((f) => (
                  <li key={f.name}>
                    <button
                      onClick={() => setActiveFile(f.name)}
                      className={cn(
                        "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors",
                        activeFile === f.name
                          ? "bg-card font-medium text-foreground shadow-card"
                          : "text-muted-foreground hover:bg-muted",
                      )}
                    >
                      <f.icon className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate font-mono text-xs">{f.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </aside>

            {/* Chat */}
            <section className="flex min-h-0 flex-col bg-background">
              <div className="flex-1 overflow-y-auto p-6">
                <div className="mx-auto max-w-2xl space-y-5">
                  {messages.map((m, i) => (
                    <div
                      key={i}
                      className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={cn(
                          "max-w-[85%] rounded-2xl px-4 py-3 text-sm",
                          m.role === "user"
                            ? "rounded-tr-sm bg-primary text-primary-foreground"
                            : "rounded-tl-sm border border-border bg-card",
                        )}
                      >
                        {m.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t border-border bg-card p-4">
                <div className="mx-auto max-w-2xl">
                  <div className="relative flex items-center gap-2 rounded-2xl border border-border bg-background p-2 shadow-card focus-within:ring-2 focus-within:ring-brand/30">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full shrink-0"
                      aria-label="Attach"
                    >
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          send();
                        }
                      }}
                      placeholder="Ask AI to modify the project..."
                      rows={1}
                      className="flex-1 resize-none bg-transparent px-1 py-2 text-sm outline-none placeholder:text-muted-foreground"
                    />
                    <Button
                      size="icon"
                      onClick={send}
                      aria-label="Send"
                      className="rounded-full shrink-0"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="mt-2 text-center text-[10px] text-muted-foreground">
                    Enter to send · Shift+Enter for newline
                  </p>
                </div>
              </div>
            </section>

            {/* Right summary */}
            <aside className="hidden border-l border-border bg-muted/30 p-5 md:block overflow-y-auto">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Project
              </p>
              <h3 className="mt-2 font-semibold">{project.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{project.category}</p>

              <div className="mt-5 space-y-4 text-sm">
                <SummaryRow label="Tech" value={project.tech.join(", ")} />
                <SummaryRow label="Difficulty" value={project.difficulty} />
                <SummaryRow label="Status" value={project.status} />
                <SummaryRow label="Progress" value={`${project.progress}%`} />
                <SummaryRow label="Credits used" value="12" />
              </div>

              <p className="mt-6 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Deliverables
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {["Source", "Docs", "Report", "PPT", "Q&A"].map((d) => (
                  <span
                    key={d}
                    className="rounded-md border border-brand/20 bg-brand/5 px-2 py-0.5 text-[10px] font-medium text-brand"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </aside>
          </div>
        </TabsContent>

        <TabsContent value="overview" className="m-0 p-6 overflow-y-auto">
          <div className="mx-auto max-w-5xl space-y-8">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2 space-y-6">
                <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
                  <h2 className="font-semibold flex items-center gap-2">
                    <FileText className="h-4 w-4 text-brand" /> Project Summary
                  </h2>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>

                  {project.features && (
                    <div className="mt-8">
                      <h3 className="text-sm font-semibold">Key Features</h3>
                      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                        {project.features.map((f, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {project.learningOutcomes && (
                    <div className="mt-8">
                      <h3 className="text-sm font-semibold">Learning Outcomes</h3>
                      <ul className="mt-3 space-y-2">
                        {project.learningOutcomes.map((o, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <Target className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
                            {o}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </section>
              </div>

              <div className="space-y-6">
                <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
                  <h2 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Project Stats
                  </h2>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" /> Est. Time
                      </div>
                      <span className="text-sm font-medium">{project.completionTime || "2 Weeks"}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Users className="h-3.5 w-3.5" /> Team Size
                      </div>
                      <span className="text-sm font-medium">{project.teamSize || "1 Person"}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Rocket className="h-3.5 w-3.5" /> Difficulty
                      </div>
                      <span className="text-sm font-medium">{project.difficulty}</span>
                    </div>
                  </div>
                </section>

                <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
                  <h2 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Tech Stack
                  </h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="rounded-lg border border-border bg-muted/50 px-3 py-1.5 text-xs font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="screenshots" className="m-0 p-6 overflow-y-auto">
          <div className="mx-auto max-w-5xl">
            {project.screenshots && project.screenshots.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2">
                {project.screenshots.map((s, i) => (
                  <div key={i} className="group relative aspect-video overflow-hidden rounded-2xl border border-border bg-muted">
                    <img src={s} alt={`Screenshot ${i + 1}`} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
                      <Button variant="secondary" size="sm">View Fullsize</Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyTab title="No Screenshots" Icon={ImageIcon} />
            )}
          </div>
        </TabsContent>

        <TabsContent value="structure" className="m-0 p-6 overflow-y-auto">
          <div className="mx-auto max-w-3xl space-y-6">
            <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-card">
              <div className="border-b border-border bg-muted/30 px-6 py-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <FolderClosed className="h-4 w-4 text-brand" /> Project Structure
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {(project.folderStructure || [
                    { path: "src/", description: "Source code of the application." },
                    { path: "public/", description: "Static assets like images and icons." },
                    { path: "tests/", description: "Unit and integration tests." },
                  ]).map((f, i) => (
                    <div key={i} className="flex gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <code className="text-sm font-bold text-brand min-w-[120px]">{f.path}</code>
                      <p className="text-sm text-muted-foreground">{f.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="modules" className="m-0 p-6 overflow-y-auto">
          <div className="mx-auto max-w-4xl grid gap-6 sm:grid-cols-2">
            {(project.modules || [
              { name: "Auth Module", description: "Handles user authentication." },
              { name: "Core Logic", description: "Primary business logic." }
            ]).map((m, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-6 shadow-card hover:border-brand/30 transition-colors">
                <div className="size-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center mb-4">
                  <Layers className="h-5 w-5" />
                </div>
                <h3 className="font-semibold">{m.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{m.description}</p>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="database" className="m-0 p-6 overflow-y-auto">
          <div className="mx-auto max-w-4xl space-y-8">
            {project.database ? (
              <>
                <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-semibold flex items-center gap-2">
                      <Database className="h-4 w-4 text-brand" /> Database Schema ({project.database.type})
                    </h2>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2">
                    {project.database.tables.map((t, i) => (
                      <div key={i} className="rounded-xl border border-border bg-muted/30 p-4">
                        <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
                          <Layers className="h-3.5 w-3.5" /> {t.name}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {t.columns.map(c => (
                            <span key={c} className="px-2 py-1 bg-card rounded border border-border text-[10px] font-mono">
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 pt-6 border-t border-border">
                    <h3 className="text-sm font-semibold mb-2">Relationships</h3>
                    <p className="text-sm text-muted-foreground">{project.database.relationships}</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-dashed border-border p-12 text-center bg-card">
                  <div className="mx-auto size-12 rounded-full bg-muted flex items-center justify-center mb-4 text-muted-foreground">
                    <ImageIcon className="h-6 w-6" />
                  </div>
                  <h3 className="font-medium text-muted-foreground">ER Diagram Placeholder</h3>
                </div>
              </>
            ) : (
              <EmptyTab title="No Database Info" Icon={Database} />
            )}
          </div>
        </TabsContent>

        <TabsContent value="docs" className="m-0 p-6 overflow-y-auto">
          <div className="mx-auto max-w-4xl space-y-8">
            {project.documentation ? (
              <div className="grid gap-6">
                {[
                  { title: "Architecture", content: project.documentation.architecture },
                  { title: "Working", content: project.documentation.working },
                  { title: "Implementation", content: project.documentation.implementation },
                ].map((d, i) => (
                  <section key={i} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                    <h3 className="font-semibold mb-4">{d.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{d.content}</p>
                  </section>
                ))}
              </div>
            ) : (
              <EmptyTab title="No Documentation" Icon={FileText} />
            )}
          </div>
        </TabsContent>

        <TabsContent value="tech" className="m-0 p-6 overflow-y-auto">
          <div className="mx-auto max-w-4xl grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {project.tech.map((t, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-6 shadow-card text-center hover:-translate-y-1 transition-all">
                <div className="mx-auto size-12 rounded-2xl bg-brand/5 flex items-center justify-center mb-4 text-brand font-bold text-xl">
                  {t[0]}
                </div>
                <h3 className="font-semibold">{t}</h3>
                <p className="mt-2 text-xs text-muted-foreground">Comprehensive use of {t} features for high performance.</p>
                <Button variant="link" size="sm" className="mt-2 h-auto p-0 text-brand">Learn More <ExternalLink className="ml-1 h-3 w-3" /></Button>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="launch" className="m-0 p-0 overflow-hidden">
          <LaunchGuide project={project} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="truncate text-sm font-medium">{value}</span>
    </div>
  );
}

function LaunchGuide({ project }: { project: Project }) {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [expandedStep, setExpandedStep] = useState<number>(0);

  const steps = [
    {
      title: "Project Overview",
      content: (
        <div className="space-y-4">
          <p>This project, <strong>{project.name}</strong>, is designed to help you build a robust {project.category.toLowerCase()} application.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-border p-3 bg-muted/30">
              <span className="text-[10px] font-bold uppercase text-muted-foreground">Difficulty</span>
              <p className="text-sm font-medium">{project.difficulty}</p>
            </div>
            <div className="rounded-lg border border-border p-3 bg-muted/30">
              <span className="text-[10px] font-bold uppercase text-muted-foreground">Est. Setup Time</span>
              <p className="text-sm font-medium">45 - 60 minutes</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Who should build it: Students interested in {project.tech.join(", ")}.</p>
        </div>
      ),
    },
    {
      title: "System Requirements",
      content: (
        <div className="space-y-4">
          <p className="text-sm">Ensure your machine meets these requirements:</p>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-brand" /> OS: Windows 10+, macOS 12+, or Linux
            </li>
            <li className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-brand" /> RAM: 8GB minimum (16GB recommended)
            </li>
            <li className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-brand" /> Node.js: v18.x or higher
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "Software Installation",
      content: (
        <div className="space-y-4">
          <p className="text-sm">Install the following core tools:</p>
          <ol className="space-y-3">
            {[
              { name: "Node.js", desc: "Runtime for JavaScript/TypeScript", link: "https://nodejs.org" },
              { name: "Git", desc: "Version control system", link: "https://git-scm.com" },
              { name: "VS Code", desc: "Recommended code editor", link: "https://code.visualstudio.com" },
            ].map((tool, i) => (
              <li key={i} className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30">
                <div>
                  <p className="text-sm font-bold">{tool.name}</p>
                  <p className="text-xs text-muted-foreground">{tool.desc}</p>
                </div>
                <Button size="sm" variant="outline" asChild>
                  <a href={tool.link} target="_blank" rel="noreferrer">Download</a>
                </Button>
              </li>
            ))}
          </ol>
        </div>
      ),
    },
    {
      title: "Download / Clone Project",
      content: (
        <div className="space-y-4">
          <p className="text-sm">Get the source code onto your local machine:</p>
          <div className="rounded-lg border border-border bg-black p-4 font-mono text-xs text-white">
            <div className="flex items-center justify-between">
              <span>git clone https://github.com/projectai/{project.id}.git</span>
              <Button size="icon" variant="ghost" className="h-6 w-6 text-white hover:bg-white/20">
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Alternatively, download the ZIP from the header and extract it.</p>
        </div>
      ),
    },
    {
      title: "Project Folder Structure",
      content: (
        <div className="space-y-3">
          <p className="text-sm">Familiarize yourself with the layout:</p>
          <div className="space-y-2">
            {project.folderStructure?.map((f, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <FolderClosed className="h-4 w-4 text-brand" />
                <span className="font-mono text-xs font-bold">{f.path}</span>
                <span className="text-muted-foreground">— {f.description}</span>
              </div>
            )) || <p className="text-sm text-muted-foreground italic">See the Structure tab for details.</p>}
          </div>
        </div>
      ),
    },
    {
      title: "Environment Variables",
      content: (
        <div className="space-y-4">
          <p className="text-sm">Create a <code>.env</code> file in the root directory:</p>
          <div className="rounded-lg border border-border bg-black p-4 font-mono text-xs text-white relative">
            <pre className="whitespace-pre-wrap">
              VITE_SUPABASE_URL=your_url{'\n'}
              VITE_SUPABASE_ANON_KEY=your_key{'\n'}
              DATABASE_URL=your_db_connection
            </pre>
            <Button size="icon" variant="ghost" className="absolute top-2 right-2 h-6 w-6 text-white hover:bg-white/20">
              <Copy className="h-3 w-3" />
            </Button>
          </div>
          <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 text-xs text-amber-700 dark:text-amber-400">
            <strong>Mistake to avoid:</strong> Never commit your .env file to version control.
          </div>
        </div>
      ),
    },
    {
      title: "Database Setup",
      content: (
        <div className="space-y-4">
          <p className="text-sm">Initialize your data store:</p>
          <div className="space-y-3">
            <div className="p-3 rounded-lg border border-border bg-muted/30">
              <p className="text-xs font-bold">1. Create Database</p>
              <p className="text-xs text-muted-foreground">Head to Supabase or PostgreSQL and create a new project.</p>
            </div>
            <div className="p-3 rounded-lg border border-border bg-muted/30">
              <p className="text-xs font-bold">2. Import Schema</p>
              <p className="text-xs text-muted-foreground">Run the SQL provided in the 'Database' tab to create tables.</p>
            </div>
            <div className="p-3 rounded-lg border border-border bg-muted/30">
              <p className="text-xs font-bold">3. Seed Data</p>
              <p className="text-xs text-muted-foreground">Use the provided seed script to populate initial data.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Install Dependencies",
      content: (
        <div className="space-y-4">
          <p className="text-sm">Install required packages using your package manager:</p>
          <div className="flex gap-2">
            <div className="flex-1 rounded-lg border border-border bg-black p-4 font-mono text-xs text-white flex items-center justify-between">
              <span>npm install</span>
              <Button size="icon" variant="ghost" className="h-6 w-6 text-white hover:bg-white/20">
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Alternatively, use <code>bun install</code> or <code>yarn</code>.</p>
        </div>
      ),
    },
    {
      title: "Run the Project",
      content: (
        <div className="space-y-4">
          <p className="text-sm">Start the development server:</p>
          <div className="rounded-lg border border-border bg-black p-4 font-mono text-xs text-white">
            <div className="flex items-center justify-between">
              <span>npm run dev</span>
              <Button size="icon" variant="ghost" className="h-6 w-6 text-white hover:bg-white/20">
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">The application will be available at <code>http://localhost:5173</code>.</p>
        </div>
      ),
    },
    {
      title: "Verify Installation",
      content: (
        <div className="space-y-4">
          <p className="text-sm">Check if everything is working correctly:</p>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-green-500" /> Landing page loads without errors
            </li>
            <li className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-green-500" /> Database connection is successful
            </li>
            <li className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-green-500" /> Login/Auth flows are functional
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "Common Errors & Solutions",
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="p-3 rounded-lg border border-border bg-muted/30">
              <p className="text-xs font-bold">Port already in use</p>
              <p className="text-xs text-muted-foreground">Kill the process using <code>lsof -i :5173</code> or change the port in <code>vite.config.ts</code>.</p>
            </div>
            <div className="p-3 rounded-lg border border-border bg-muted/30">
              <p className="text-xs font-bold">Missing .env variables</p>
              <p className="text-xs text-muted-foreground">Double check your <code>.env</code> file matches the example provided.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Project Architecture",
      content: (
        <div className="space-y-4">
          <p className="text-sm">High-level flow of the application:</p>
          <div className="p-4 rounded-xl border border-border bg-muted/30">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase text-muted-foreground mb-4">
              <span>Frontend</span>
              <ChevronRight className="h-3 w-3" />
              <span>API / Backend</span>
              <ChevronRight className="h-3 w-3" />
              <span>Database</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              React components send requests to the API server, which interacts with the database to fetch or update data, then returns the response to the UI.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Deployment Guide",
      content: (
        <div className="space-y-4">
          <p className="text-sm">Ready to go live?</p>
          <div className="grid gap-3">
            {["Vercel", "Netlify", "Railway", "Render"].map(platform => (
              <Button key={platform} variant="outline" className="justify-start h-12">
                <Rocket className="mr-2 h-4 w-4" /> Deploy to {platform}
              </Button>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Learning Resources",
      content: (
        <div className="space-y-4">
          <p className="text-sm">Expand your knowledge:</p>
          <div className="grid gap-3">
            <Button variant="ghost" className="justify-start h-auto p-3 bg-muted/30 hover:bg-muted">
              <div className="text-left">
                <p className="text-sm font-bold">Official {project.tech[0]} Docs</p>
                <p className="text-xs text-muted-foreground">Deep dive into core concepts.</p>
              </div>
            </Button>
            <Button variant="ghost" className="justify-start h-auto p-3 bg-muted/30 hover:bg-muted">
              <div className="text-left">
                <p className="text-sm font-bold">Best Practices Guide</p>
                <p className="text-xs text-muted-foreground">Learn how to write clean, maintainable code.</p>
              </div>
            </Button>
          </div>
        </div>
      ),
    },
    {
      title: "AI Assistant",
      content: (
        <div className="space-y-4 pt-2">
          <div className="grid grid-cols-2 gap-2">
            {[
              "Explain Project", "Explain Code", "Explain Database", "Explain APIs", "Help Me Run", "Fix Errors"
            ].map(action => (
              <Button key={action} variant="outline" size="sm" className="text-xs justify-start h-10 border-brand/20 hover:border-brand/50 hover:bg-brand/5">
                <Sparkles className="mr-1.5 h-3.5 w-3.5 text-brand" /> {action}
              </Button>
            ))}
          </div>
          <div className="p-3 rounded-lg border border-dashed border-brand/30 bg-brand/5 text-[10px] text-center text-brand font-medium italic">
            Interactive AI assistance coming soon!
          </div>
        </div>
      ),
    },
  ];

  const progress = (completedSteps.length / steps.length) * 100;

  const toggleStep = (index: number) => {
    if (completedSteps.includes(index)) {
      setCompletedSteps(completedSteps.filter(i => i !== index));
    } else {
      setCompletedSteps([...completedSteps, index]);
    }
  };

  return (
    <div className="flex h-full flex-col bg-background">
      <div className="border-b border-border bg-card px-6 py-4 flex items-center justify-between">
        <div className="flex-1 max-w-md mr-6">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-muted-foreground">Launch Progress</span>
            <span className="font-bold text-brand">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm"><Download className="mr-1.5 h-3.5 w-3.5" /> Guide</Button>
          <Button variant="outline" size="sm" className="hidden sm:inline-flex"><Presentation className="mr-1.5 h-3.5 w-3.5" /> Print</Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="mx-auto max-w-4xl p-6 pb-20">
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className={cn(
                  "rounded-2xl border transition-all overflow-hidden",
                  expandedStep === index ? "border-brand shadow-md" : "border-border bg-card",
                  completedSteps.includes(index) && expandedStep !== index && "opacity-75"
                )}
              >
                <div
                  className={cn(
                    "flex items-center gap-4 px-6 py-4 cursor-pointer select-none",
                    expandedStep === index ? "bg-brand/5" : "hover:bg-muted/50"
                  )}
                  onClick={() => setExpandedStep(expandedStep === index ? -1 : index)}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStep(index);
                    }}
                    className={cn(
                      "size-6 rounded-full border-2 flex items-center justify-center transition-colors shrink-0",
                      completedSteps.includes(index)
                        ? "bg-brand border-brand text-brand-foreground"
                        : "border-muted-foreground/30 hover:border-brand"
                    )}
                  >
                    {completedSteps.includes(index) && <CheckCircle2 className="h-4 w-4" />}
                  </button>
                  <span className="font-bold text-muted-foreground/50 text-sm w-6">{(index + 1).toString().padStart(2, '0')}</span>
                  <h3 className={cn("flex-1 font-semibold", completedSteps.includes(index) && "text-muted-foreground line-through decoration-brand/50")}>
                    {step.title}
                  </h3>
                  {expandedStep === index ? <ChevronDown className="h-5 w-5 text-muted-foreground" /> : <ChevronRight className="h-5 w-5 text-muted-foreground" />}
                </div>

                {expandedStep === index && (
                  <div className="px-16 pb-6 pt-2 animate-in slide-in-from-top-2 duration-300">
                    <div className="border-l-2 border-brand/20 pl-6 py-2">
                      {step.content}
                    </div>
                    <div className="mt-6 flex justify-end">
                      <Button
                        size="sm"
                        variant={completedSteps.includes(index) ? "outline" : "default"}
                        onClick={() => {
                          if (!completedSteps.includes(index)) toggleStep(index);
                          if (index < steps.length - 1) setExpandedStep(index + 1);
                        }}
                      >
                        {completedSteps.includes(index) ? "Redo Step" : "Complete & Next"}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

function EmptyTab({ title, Icon }: { title: string; Icon: typeof Code2 | typeof ImageIcon | typeof Database | typeof FileText }) {
  return (
    <div className="mx-auto max-w-3xl rounded-2xl border border-dashed border-border bg-card p-12 text-center shadow-card">
      <div className="mx-auto grid size-12 place-items-center rounded-xl bg-brand/10 text-brand">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-4 font-display text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Content for this section is generated alongside your project. Open the workspace to chat
        with AI and refine it.
      </p>
      <Button className="mt-6" variant="outline">
        <File className="mr-1 h-4 w-4" /> Preview file
      </Button>
    </div>
  );
}
