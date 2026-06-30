import { createFileRoute } from "@tanstack/react-router";
import { Plus, Search, Cpu, Edit, Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/cms/technologies")({
  component: TechnologiesPage,
});

function TechnologiesPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTech, setEditingTech] = useState<{ id: string, name: string, icon_url: string } | null>(null);
  const [formData, setFormData] = useState({ name: "", icon_url: "" });

  const { data: technologies, isLoading } = useQuery({
    queryKey: ["cms", "technologies"],
    queryFn: async () => {
      const { data, error } = await supabase.from("technologies").select("*").order("name");
      if (error) throw error;
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (newTech: typeof formData) => {
      const { error } = await supabase.from("technologies").insert(newTech);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cms", "technologies"] });
      toast.success("Technology added successfully");
      setIsDialogOpen(false);
      setFormData({ name: "", icon_url: "" });
    },
    onError: (error) => toast.error(`Error: ${error.message}`),
  });

  const updateMutation = useMutation({
    mutationFn: async (tech: { id: string } & typeof formData) => {
      const { error } = await supabase.from("technologies").update({ name: tech.name, icon_url: tech.icon_url }).eq("id", tech.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cms", "technologies"] });
      toast.success("Technology updated successfully");
      setIsDialogOpen(false);
      setEditingTech(null);
      setFormData({ name: "", icon_url: "" });
    },
    onError: (error) => toast.error(`Error: ${error.message}`),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("technologies").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cms", "technologies"] });
      toast.success("Technology deleted successfully");
    },
    onError: (error) => toast.error(`Error: ${error.message}`),
  });

  const handleSubmit = () => {
    if (editingTech) {
      updateMutation.mutate({ id: editingTech.id, ...formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleEdit = (tech: any) => {
    setEditingTech(tech);
    setFormData({ name: tech.name, icon_url: tech.icon_url || "" });
    setIsDialogOpen(true);
  };

  const filteredTechs = technologies?.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase())
  ) || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Technologies</h1>
          <p className="text-muted-foreground">Manage the tech stack library for projects.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
            setEditingTech(null);
            setFormData({ name: "", icon_url: "" });
          }
        }}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Add Technology
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingTech ? "Edit Technology" : "Add Technology"}</DialogTitle>
              <DialogDescription>
                {editingTech ? "Update technology details." : "Create a new technology to use in project tech stacks."}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="e.g. Next.js"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="icon">Icon URL (SVG preferred)</Label>
                <Input
                  id="icon"
                  placeholder="https://..."
                  value={formData.icon_url}
                  onChange={(e) => setFormData({ ...formData, icon_url: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSubmit} disabled={createMutation.isPending || updateMutation.isPending}>
                {(createMutation.isPending || updateMutation.isPending) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Technology
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search technologies..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-xl border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[80px]">Icon</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="w-[100px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-10">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
                </TableCell>
              </TableRow>
            ) : filteredTechs.map((tech) => (
              <TableRow key={tech.id}>
                <TableCell>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted p-2">
                    {tech.icon_url ? (
                      <img src={tech.icon_url} alt={tech.name} className="h-full w-full object-contain" />
                    ) : (
                      <Cpu className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{tech.name}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(tech)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                      onClick={() => {
                        if (confirm("Are you sure you want to delete this technology?")) {
                          deleteMutation.mutate(tech.id);
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {!isLoading && filteredTechs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <Cpu className="h-12 w-12 text-muted-foreground/20 mb-4" />
            <h3 className="text-lg font-semibold">No technologies found</h3>
            <p className="text-muted-foreground">Try adjusting your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
