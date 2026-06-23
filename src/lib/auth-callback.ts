import { createServerFn } from "@tanstack/react-start";
import { createSupabaseServerClient } from "./supabase.server";

export const exchangeCodeForSession = createServerFn({ method: "POST" })
  .validator((code: string) => code)
  .handler(async ({ data: code }) => {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    return { data, error };
  });
