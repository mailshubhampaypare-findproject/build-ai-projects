import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/cms")({
  beforeLoad: ({ context, location }) => {
    // Allow access to login and unauthorized pages
    if (
      location.pathname === "/cms/login" ||
      location.pathname === "/cms/unauthorized"
    ) {
      return;
    }

    // Redirect unauthenticated users to login
    if (!context.isAdmin) {
      throw redirect({
        to: "/cms/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: CMSLayout,
});

function CMSLayout() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Outlet />
    </div>
  );
}
