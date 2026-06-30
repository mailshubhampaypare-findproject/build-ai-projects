import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ShieldAlert, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/cms/unauthorized")({
  component: CMSUnauthorized,
});

function CMSUnauthorized() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="mx-auto size-20 rounded-full bg-destructive/10 flex items-center justify-center">
          <ShieldAlert className="size-10 text-destructive" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Access Denied</h1>
          <p className="text-muted-foreground">
            You do not have the required permissions to access the Admin CMS area.
          </p>
        </div>
        <div className="pt-4">
          <Button asChild variant="outline" className="gap-2">
            <Link to="/">
              <ArrowLeft className="size-4" />
              Back to Website
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
