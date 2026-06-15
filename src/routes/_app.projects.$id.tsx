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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { getProject, statusBadgeClasses, type Project } from "@/lib/projects-data";
import { cn } from "@/lib/utils";

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
      <Link to="/projects" className="text-brand underline">Back to projects</Link>
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
            <Link to="/projects"><ArrowLeft className="h-4 w-4" /></Link>
          </Button>
          <div className="min-w-0">
            <h1 className="truncate font-display text-xl font-semibold tracking-tight">{project.name}</h1>
            <p className="truncate text-xs text-muted-foreground">{project.tech.join(" · ")}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${statusBadgeClasses(project.status)}`}>
            {project.status}
          </span>
          <Button variant="outline" size="sm">Download .zip</Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="workspace" className="flex flex-1 min-h-0 flex-col">
        <div className="border-b border-border bg-card px-6">
          <TabsList className="h-auto bg-transparent p-0">
            {[
              ["workspace", "Workspace"],
              ["overview", "Overview"],
              ["code", "Source Code"],
              ["docs", "Documentation"],
              ["report", "Report"],
              ["ppt", "PPT Content"],
              ["qa", "Interview Q&A"],
              ["history", "Activity"],
            ].map(([v, l]) => (
              <TabsTrigger
                key={v}
                value={v}
                className="rounded-none border-b-2 border-transparent bg-transparent px-4 py-3 text-sm data-[state=active]:border-brand data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none"
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
              <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Files</p>
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
                    <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
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
                    <Button variant="ghost" size="icon" className="rounded-full shrink-0" aria-label="Attach">
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
                    <Button size="icon" onClick={send} aria-label="Send" className="rounded-full shrink-0">
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
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Project</p>
              <h3 className="mt-2 font-semibold">{project.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{project.category}</p>

              <div className="mt-5 space-y-4 text-sm">
                <SummaryRow label="Tech" value={project.tech.join(", ")} />
                <SummaryRow label="Difficulty" value={project.difficulty} />
                <SummaryRow label="Status" value={project.status} />
                <SummaryRow label="Progress" value={`${project.progress}%`} />
                <SummaryRow label="Credits used" value="12" />
              </div>

              <p className="mt-6 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Deliverables</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {["Source", "Docs", "Report", "PPT", "Q&A"].map((d) => (
                  <span key={d} className="rounded-md border border-brand/20 bg-brand/5 px-2 py-0.5 text-[10px] font-medium text-brand">
                    {d}
                  </span>
                ))}
              </div>
            </aside>
          </div>
        </TabsContent>

        <TabsContent value="overview" className="m-0 p-6 overflow-y-auto">
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            <div className="md:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-card">
              <h2 className="font-semibold">About this project</h2>
              <p className="mt-3 text-sm text-muted-foreground">{project.description}</p>
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {project.tech.map((t: string) => (
                  <div key={t} className="rounded-lg border border-border bg-muted/30 p-3 text-center text-sm font-medium">{t}</div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Quick info</p>
              <div className="mt-3 space-y-3 text-sm">
                <SummaryRow label="Difficulty" value={project.difficulty} />
                <SummaryRow label="Category" value={project.category} />
                <SummaryRow label="Status" value={project.status} />
                <SummaryRow label="Updated" value={project.updatedAt} />
              </div>
            </div>
          </div>
        </TabsContent>

        {[
          ["code", "Source Code", Code2],
          ["docs", "Documentation", FileText],
          ["report", "Report", FileText],
          ["ppt", "PPT Content", Presentation],
          ["qa", "Interview Q&A", HelpCircle],
          ["history", "Activity", Sparkles],
        ].map(([v, l, Icon]) => (
          <TabsContent key={v as string} value={v as string} className="m-0 p-6 overflow-y-auto">
            <EmptyTab title={l as string} Icon={Icon as typeof Code2} />
          </TabsContent>
        ))}
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

function EmptyTab({ title, Icon }: { title: string; Icon: typeof Code2 }) {
  return (
    <div className="mx-auto max-w-3xl rounded-2xl border border-dashed border-border bg-card p-12 text-center shadow-card">
      <div className="mx-auto grid size-12 place-items-center rounded-xl bg-brand/10 text-brand">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-4 font-display text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Content for this section is generated alongside your project. Open the workspace to chat with AI and refine it.
      </p>
      <Button className="mt-6" variant="outline"><File className="mr-1 h-4 w-4" /> Preview file</Button>
    </div>
  );
}
