import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cms/dashboard")({
  component: CMSDashboard,
});

function CMSDashboard() {
  return (
    <div className="space-y-6">
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
  );
}
