import { supabase } from "@/integrations/supabase/client";

export async function uploadFile(
  bucket: string,
  path: string,
  file: File,
  onProgress?: (progress: number) => void
) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) throw error;

  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path);

  return publicUrl;
}

export async function deleteFile(bucket: string, path: string) {
  const { error } = await supabase.storage.from(bucket).remove([path]);
  if (error) throw error;
}

export async function getProjects(options?: {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  status?: string;
}) {
  let query = supabase.from("projects").select("*, categories(name)", { count: "exact" });

  if (options?.search) {
    query = query.ilike("name", `%${options.search}%`);
  }

  if (options?.category && options.category !== "All") {
    // Assuming categories.name filter, might need to fetch categories first or use join
    query = query.filter("categories.name", "eq", options.category);
  }

  if (options?.status) {
    query = query.eq("status", options.status);
  }

  if (options?.page && options.limit) {
    const from = (options.page - 1) * options.limit;
    const to = from + options.limit - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query.order("updated_at", { ascending: false });

  if (error) throw error;
  return { data, count };
}

export async function deleteProject(id: string) {
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw error;
}

export async function updateProjectStatus(id: string, status: "Draft" | "Published") {
  const { error } = await supabase.from("projects").update({ status }).eq("id", id);
  if (error) throw error;
}

export async function getCategories() {
  const { data, error } = await supabase.from("categories").select("*").order("name");
  if (error) throw error;
  return data;
}

export async function getTechnologies() {
  const { data, error } = await supabase.from("technologies").select("*").order("name");
  if (error) throw error;
  return data;
}

export async function getUsers() {
  const { data, error } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function updateUserRole(id: string, role: "user" | "cms") {
  const { error } = await supabase.from("profiles").update({ role }).eq("id", id);
  if (error) throw error;
}
