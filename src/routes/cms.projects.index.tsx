import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Copy,
  ChevronDown,
  ArrowUpDown,
  Download,
  Calendar,
  Loader2,
  X
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/cms/projects/")({
  component: ProjectsListPage,
});

function ProjectsListPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);

  const { data: projects, isLoading } = useQuery({
    queryKey: ["cms", "projects", search],
    queryFn: async () => {
      let query = supabase
        .from("projects")
        .select(`
          *,
          categories(name),
          departments(name)
        `)
        .order("updated_at", { ascending: false });

      if (search) {
        query = query.ilike("name", `%${search}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cms", "projects"] });
      toast.success("Project deleted successfully");
    },
    onError: (error) => toast.error(`Error: ${error.message}`),
  });

  const duplicateMutation = useMutation({
    mutationFn: async (id: string) => {
      const { data: project, error: pError } = await supabase.from("projects").select("*").eq("id", id).single();
      if (pError) throw pError;

      const { id: _, created_at: __, updated_at: ___, ...rest } = project;
      const { data: newProject, error: iError } = await supabase.from("projects").insert({
        ...rest,
        name: `${project.name} (Copy)`,
        slug: `${project.slug}-copy-${Math.random().toString(36).substring(7)}`,
        status: "Draft"
      }).select().single();

      if (iError) throw iError;
      return newProject;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cms", "projects"] });
      toast.success("Project duplicated successfully");
    },
    onError: (error) => toast.error(`Error: ${error.message}`),
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string, status: "Draft" | "Published" }) => {
      const { error } = await supabase.from("projects").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cms", "projects"] });
      toast.success("Project status updated");
    },
    onError: (error) => toast.error(`Error: ${error.message}`),
  });

  const toggleSelectAll = () => {
    if (selectedProjects.length === (projects?.length || 0)) {
      setSelectedProjects([]);
    } else {
      setSelectedProjects(projects?.map(p => p.id) || []);
    }
  };

  const toggleSelectProject = (id: string) => {
    setSelectedProjects(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">Manage all project content and downloads.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Export CSV
          </Button>
          <Button asChild className="gap-2">
            <Link to="/cms/projects/new">
              <Plus className="h-4 w-4" /> Add Project
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" /> Filters
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                Sort by <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              <DropdownMenuItem className="gap-2">
                <Calendar className="h-4 w-4" /> Date Updated
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <Download className="h-4 w-4" /> Downloads
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <ArrowUpDown className="h-4 w-4" /> Name
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="rounded-xl border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[40px]">
                <Checkbox
                  checked={projects && projects.length > 0 && selectedProjects.length === projects.length}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead className="min-w-[200px]">Project Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead className="text-right">Downloads</TableHead>
              <TableHead className="text-right">Last Updated</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-20">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
                </TableCell>
              </TableRow>
            ) : projects?.map((project) => (
              <TableRow key={project.id} className="group">
                <TableCell>
                  <Checkbox
                    checked={selectedProjects.includes(project.id)}
                    onCheckedChange={() => toggleSelectProject(project.id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{project.name}</span>
                    <span className="text-xs text-muted-foreground font-mono">/{project.slug}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {project.categories?.name || "Uncategorized"}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge variant={project.status === "Published" ? "default" : "secondary"} className={cn(
                    project.status === "Published" && "bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400"
                  )}>
                    {project.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{project.difficulty}</span>
                </TableCell>
                <TableCell className="text-right">
                  <span className="text-sm font-medium">{(project.downloads || 0).toLocaleString()}</span>
                </TableCell>
                <TableCell className="text-right">
                  <span className="text-sm text-muted-foreground">
                    {new Date(project.updated_at).toLocaleDateString()}
                  </span>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[160px]">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem asChild className="gap-2">
                        <a href={`/projects/${project.id}`} target="_blank" rel="noreferrer">
                          <Eye className="h-4 w-4" /> View Live
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="gap-2">
                        <Link to={`/cms/projects/${project.id}`}>
                          <Edit className="h-4 w-4" /> Edit Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="gap-2"
                        onClick={() => updateStatusMutation.mutate({
                          id: project.id,
                          status: project.status === "Published" ? "Draft" : "Published"
                        })}
                      >
                        <ArrowUpDown className="h-4 w-4" /> {project.status === "Published" ? "Unpublish" : "Publish"}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="gap-2"
                        onClick={() => duplicateMutation.mutate(project.id)}
                      >
                        <Copy className="h-4 w-4" /> Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="gap-2 text-destructive focus:text-destructive"
                        onClick={() => {
                          if (confirm("Are you sure you want to delete this project?")) {
                            deleteMutation.mutate(project.id);
                          }
                        }}
                      >
                        <Trash2 className="h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {!isLoading && projects?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <Package className="h-12 w-12 text-muted-foreground/20 mb-4" />
            <h3 className="text-lg font-semibold">No projects found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>

      {selectedProjects.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 bg-foreground text-background px-6 py-3 rounded-full shadow-2xl animate-in fade-in slide-in-from-bottom-4">
          <span className="text-sm font-medium">{selectedProjects.length} projects selected</span>
          <Separator orientation="vertical" className="h-4 bg-background/20" />
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8 text-background hover:bg-white/10">Publish</Button>
            <Button variant="ghost" size="sm" className="h-8 text-background hover:bg-white/10">Archive</Button>
            <Button variant="ghost" size="sm" className="h-8 text-destructive hover:bg-destructive/20 hover:text-destructive">Delete</Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-background hover:bg-white/10 ml-2"
            onClick={() => setSelectedProjects([])}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
