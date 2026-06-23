import { createFileRoute, useRouteContext } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_app/profile")({
  head: () => ({ meta: [{ title: "Profile — ProjectAI" }] }),
  component: Profile,
});

function Profile() {
  const { user } = useRouteContext({ from: "/_app/profile" });

  const userInitial =
    user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0).toUpperCase() || "U";
  const fullName = user?.user_metadata?.full_name || "User";
  const email = user?.email || "";
  const joinedDate = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Unknown";

  return (
    <div className="mx-auto max-w-5xl space-y-8 p-6 sm:p-8">
      <h1 className="font-display text-3xl font-semibold tracking-tight">Profile</h1>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1 rounded-2xl border border-border bg-card p-6 shadow-card text-center">
          <div className="mx-auto grid size-20 place-items-center rounded-full bg-brand/15 text-brand font-display text-2xl font-semibold ring-1 ring-brand/20 overflow-hidden">
            {user?.user_metadata?.avatar_url ? (
              <img
                src={user.user_metadata.avatar_url}
                alt={fullName}
                className="h-full w-full object-cover"
              />
            ) : (
              userInitial
            )}
          </div>
          <h2 className="mt-4 font-semibold">{fullName}</h2>
          <p className="text-sm text-muted-foreground">{email}</p>
          <Button className="mt-5 w-full" variant="outline">
            Edit profile
          </Button>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card title="Account details">
            <Row label="Name" value={fullName} />
            <Row label="Email" value={email} />
            <Row label="Joined" value={joinedDate} />
          </Card>

          <Card title="Subscription">
            <Row label="Current plan" value="Pro Plan" />
            <Row label="Credits remaining" value="38 / 50" />
            <Row label="Total projects created" value="14" />
            <Row label="Renews on" value="July 12, 2026" />
          </Card>

          <Card title="Billing history">
            <ul className="divide-y divide-border text-sm">
              {[
                ["Jun 12, 2026", "Pro Plan · Monthly", "$19.00"],
                ["May 12, 2026", "Pro Plan · Monthly", "$19.00"],
                ["Apr 12, 2026", "Pro Plan · Monthly", "$19.00"],
              ].map(([date, item, amt], i) => (
                <li key={i} className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium">{item}</p>
                    <p className="text-xs text-muted-foreground">{date}</p>
                  </div>
                  <span className="font-mono text-sm">{amt}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
      <h3 className="font-semibold">{title}</h3>
      <div className="mt-4 space-y-3">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border pb-3 last:border-0 last:pb-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}
