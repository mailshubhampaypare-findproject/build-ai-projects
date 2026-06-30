import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/cms/technologies")({
  component: TechnologiesManagement,
});

function TechnologiesManagement() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Technologies</h2>
          <p className="text-muted-foreground">Manage the tech stacks and tools used in projects.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Tech
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tech Stacks</CardTitle>
          <CardDescription>Configure supported technologies and icons.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-dashed p-12 text-center">
            <h3 className="text-lg font-medium">No technologies listed</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Populate the library with tools like React, Python, or Supabase.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
