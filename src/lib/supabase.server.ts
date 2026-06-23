import { createServerClient, parseCookieHeader, serializeCookieHeader } from "@supabase/ssr";
import { getRequest, setResponseHeader } from "@tanstack/react-start/server";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

export function createSupabaseServerClient() {
  const request = getRequest();

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return parseCookieHeader(request?.headers.get("Cookie") ?? "");
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          setResponseHeader("Set-Cookie", serializeCookieHeader(name, value, options));
        });
      },
    },
  });
}
