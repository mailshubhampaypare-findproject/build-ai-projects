import { createServerFn } from "@tanstack/react-start";
import { createSupabaseServerClient } from "./supabase.server";
import { redirect } from "@tanstack/react-router";
import { getRequest } from "@tanstack/react-start/server";

export const signInWithGoogle = createServerFn({ method: "POST" }).handler(async () => {
  const supabase = createSupabaseServerClient();
  const request = getRequest();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${new URL(request.url).origin}/auth/callback`,
    },
  });

  if (error) throw error;
  return { url: data.url };
});

export const signOut = createServerFn({ method: "POST" }).handler(async () => {
  const supabase = createSupabaseServerClient();
  await supabase.auth.signOut();
  return { success: true };
});

export const getUser = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.warn("Supabase getUser error:", error.message);
      return null;
    }
    return data?.user ?? null;
  } catch (error) {
    console.error("Unexpected error in getUser server function:", error);
    return null;
  }
});
