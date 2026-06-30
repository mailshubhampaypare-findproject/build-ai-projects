import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users as UsersIcon } from "lucide-react";

export const Route = createFileRoute("/cms/users")({
  component: UsersManagement,
});

function UsersManagement() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Users</h2>
          <p className="text-muted-foreground">Manage user accounts and permissions.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Directory</CardTitle>
          <CardDescription>View and manage all registered users.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-dashed p-12 text-center">
            <UsersIcon className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium">No users found</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Users will appear here as they register on the platform.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
