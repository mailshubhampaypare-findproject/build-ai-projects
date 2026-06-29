import { createFileRoute, redirect } from "@tanstack/react-router";
import { exchangeCodeForSession } from "@/lib/auth-callback";

export const Route = createFileRoute("/auth/callback")({
  validateSearch: (search) => ({
    code: typeof search.code === "string" ? search.code : undefined,
    next: typeof search.next === "string" ? search.next : undefined,
  }),

  loaderDeps: ({ search }) => ({
    code: search.code,
    next: search.next,
  }),

  loader: async ({ deps }) => {
    const { code, next } = deps;

    if (code) {
      const { error } = await exchangeCodeForSession({
        data: { code },
      });

      if (error) {
        console.error(error);
        throw redirect({ to: "/" });
      }
    }

    throw redirect({
      to: next || "/dashboard",
    });
  },
});
