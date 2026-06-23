import { createFileRoute, redirect } from "@tanstack/react-router";
import { exchangeCodeForSession } from "@/lib/auth-callback";

export const Route = createFileRoute("/auth/callback")({
  loader: async ({ search }) => {
    const { code, next } = search as { code?: string; next?: string };
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
