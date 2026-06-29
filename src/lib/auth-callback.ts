import { createServerFn } from "@tanstack/react-start";
import { createSupabaseServerClient } from "./supabase.server";

export const exchangeCodeForSession = createServerFn({ method: "POST" }).handler(
  async ({ data }: { data: { code: string } }) => {
    const code = data.code;
    const supabase = createSupabaseServerClient();
    const { data: sessionData, error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      console.error("Supabase exchangeCodeForSession error:", error);
      return { data: null, error: error.message };
    }
    return { data: sessionData, error: null };
  },
);
