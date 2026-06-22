import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — ProjectAI" },
      {
        name: "description",
        content: "Your ProjectAI dashboard",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
        <p className="text-muted-foreground mb-8">
          Welcome to your ProjectAI dashboard. This is where you'll manage your projects.
        </p>
        
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="font-semibold mb-2">Create Project</h3>
            <p className="text-sm text-muted-foreground">Start building a new project with AI</p>
          </div>
          
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="font-semibold mb-2">My Projects</h3>
            <p className="text-sm text-muted-foreground">View and manage your existing projects</p>
          </div>
          
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="font-semibold mb-2">Settings</h3>
            <p className="text-sm text-muted-foreground">Manage your account and preferences</p>
          </div>
        </div>
      </div>
    </div>
  );
}
