import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ProjectForm } from "@/components/admin/project-form";

export const Route = createFileRoute("/admin/projects/$id")({
  component: EditProjectPage,
});

function EditProjectPage() {
  const { id } = Route.useParams();
  const queryClient = useQueryClient();

  const { data: project, isLoading } = useQuery({
    queryKey: ["admin", "project", id],
    queryFn: async () => {
      const [p, f, m, s] = await Promise.all([
        supabase.from("projects").select("*").eq("id", id).single(),
        supabase.from("project_features").select("*").eq("project_id", id),
        supabase.from("project_modules").select("*").eq("project_id", id).order("display_order"),
        supabase.from("project_launch_steps").select("*").eq("project_id", id).order("display_order"),
      ]);

      if (p.error) throw p.error;

      return {
        ...p.data,
        features: f.data || [],
        modules: m.data || [],
        launchSteps: s.data || [],
      };
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: any) => {
      const { error: pError } = await supabase.from("projects").update({
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
        updated_at: new Date().toISOString(),
      }).eq("id", id);

      if (pError) throw pError;

      await supabase.from("project_features").delete().eq("project_id", id);
      if (data.features.length > 0) {
        await supabase.from("project_features").insert(data.features.map((f: any) => ({ project_id: id, feature: f.title })));
      }

      await supabase.from("project_modules").delete().eq("project_id", id);
      if (data.modules.length > 0) {
        await supabase.from("project_modules").insert(data.modules.map((m: any, i: number) => ({ project_id: id, title: m.title, description: m.description, display_order: i })));
      }

      await supabase.from("project_launch_steps").delete().eq("project_id", id);
      if (data.launchSteps.length > 0) {
        await supabase.from("project_launch_steps").insert(data.launchSteps.map((s: any, i: number) => ({ project_id: id, title: s.title, content: s.description, display_order: i })));
      }
    },
    onSuccess: () => {
      toast.success("Project updated successfully");
      queryClient.invalidateQueries({ queryKey: ["admin", "project", id] });
    },
    onError: (error: any) => toast.error(`Error: ${error.message}`),
  });

  return (
    <ProjectForm
      title={`Edit: ${project?.name || "Project"}`}
      initialData={project}
      isLoading={isLoading}
      isSaving={updateMutation.isPending}
      onSave={(data) => updateMutation.mutate(data)}
    />
  );
}
