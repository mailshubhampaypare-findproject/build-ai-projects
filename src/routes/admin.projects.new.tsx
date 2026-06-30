import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ProjectForm } from "@/components/admin/project-form";

export const Route = createFileRoute("/admin/projects/new")({
  component: CreateProjectPage,
});

function CreateProjectPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const { data: project, error: pError } = await supabase.from("projects").insert({
        name: data.name,
        slug: data.slug,
        description: data.shortDesc,
        full_description: data.fullDesc,
        category_id: data.categoryId || null,
        department_id: data.departmentId || null,
        difficulty: data.difficulty,
        status: data.status,
        is_pro_only: data.isProOnly,
        downloads_enabled: data.downloadsEnabled,
        thumbnail_url: data.thumbnailUrl,
        seo_title: data.seoTitle,
        meta_description: data.seoDesc,
        ai_settings: data.aiSettings,
      }).select().single();

      if (pError) throw pError;

      if (data.features.length > 0) {
        await supabase.from("project_features").insert(data.features.map((f: any) => ({ project_id: project.id, feature: f.title })));
      }
      if (data.modules.length > 0) {
        await supabase.from("project_modules").insert(data.modules.map((m: any, i: number) => ({ project_id: project.id, title: m.title, description: m.description, display_order: i })));
      }
      if (data.launchSteps.length > 0) {
        await supabase.from("project_launch_steps").insert(data.launchSteps.map((s: any, i: number) => ({ project_id: project.id, title: s.title, content: s.description, display_order: i })));
      }

      return project;
    },
    onSuccess: (project) => {
      toast.success("Project created successfully");
      queryClient.invalidateQueries({ queryKey: ["admin", "projects"] });
      navigate({ to: "/admin/projects/$id", params: { id: project.id } });
    },
    onError: (error: any) => toast.error(`Error: ${error.message}`),
  });

  return (
    <ProjectForm
      title="Create New Project"
      onSave={(data) => createMutation.mutate(data)}
      isSaving={createMutation.isPending}
    />
  );
}
