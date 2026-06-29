import { createServerClient, parseCookieHeader } from "@supabase/ssr";
import { getRequest, setCookie } from "@tanstack/react-start/server";

const supabaseUrl = process.env.SUPABASE_URL ?? import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey =
  process.env.SUPABASE_PUBLISHABLE_KEY ?? import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY!;

export function createSupabaseServerClient() {
  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        const request = getRequest();
        return parseCookieHeader(request?.headers.get("Cookie") ?? "").map((cookie) => ({
          ...cookie,
          value: cookie.value ?? "",
        }));
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          setCookie(name, value, {
            ...options,
            path: options.path ?? "/",
            // Use production check for secure flag to be safe across environments
            secure: options.secure ?? import.meta.env.PROD,
            sameSite: options.sameSite ?? "lax",
          });
        });
      },
    },
  });
}
