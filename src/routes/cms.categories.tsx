import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/cms/categories")({
  component: CategoriesManagement,
});

function CategoriesManagement() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Categories</h2>
          <p className="text-muted-foreground">Organize projects into specific industry categories.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Category
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Categories</CardTitle>
          <CardDescription>Manage the categories available for projects.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-dashed p-12 text-center">
            <h3 className="text-lg font-medium">No categories created</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Add categories like "Web Development" or "AI & ML".
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
