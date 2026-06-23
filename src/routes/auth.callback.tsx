import { createFileRoute, redirect } from "@tanstack/react-router";
import { exchangeCodeForSession } from "@/lib/auth-callback";

export const Route = createFileRoute("/auth/callback")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      code: search.code as string | undefined,
      next: search.next as string | undefined,
    };
  },
  loader: async ({ search }) => {
    const { code, next } = search;
    if (code) {
      const { error } = await exchangeCodeForSession({ data: code });
      if (error) {
        console.error("Error exchanging code for session:", error);
        throw redirect({ to: "/" });
      }
    }
    throw redirect({ to: next || "/dashboard" });
  },
});
