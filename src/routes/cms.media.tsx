import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/cms/media")({
  component: MediaManagement,
});

function MediaManagement() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Media</h2>
          <p className="text-muted-foreground">Upload and manage project assets and images.</p>
        </div>
        <Button className="gap-2">
          <Upload className="h-4 w-4" />
          Upload Files
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Asset Library</CardTitle>
          <CardDescription>Browse and organize uploaded media files.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-dashed p-12 text-center">
            <h3 className="text-lg font-medium">No media assets</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Images and assets used in projects will be stored here.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
