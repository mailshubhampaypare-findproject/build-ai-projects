import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/lib/theme";
import { Moon, Sun, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({ meta: [{ title: "Settings — ProjectAI" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [emailNotif, setEmailNotif] = useState(true);
  const [productNotif, setProductNotif] = useState(true);
  const [marketing, setMarketing] = useState(false);

  return (
    <div className="mx-auto max-w-3xl space-y-8 p-6 sm:p-8">
      <h1 className="font-display text-3xl font-semibold tracking-tight">Settings</h1>

      <Section title="Appearance" desc="Customize how ProjectAI looks on your device.">
        <Label className="text-sm">Theme</Label>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {[
            { v: "light" as const, label: "Light", Icon: Sun },
            { v: "dark" as const, label: "Dark", Icon: Moon },
            { v: "system" as const, label: "System", Icon: Monitor },
          ].map((opt) => {
            const active = opt.v === theme || (opt.v === "system" && false);
            return (
              <button
                key={opt.v}
                onClick={() => opt.v !== "system" && setTheme(opt.v)}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-lg border px-3 py-3 text-sm font-medium transition-colors",
                  active
                    ? "border-brand bg-brand/10 text-brand"
                    : "border-border bg-card hover:bg-muted",
                )}
              >
                <opt.Icon className="h-4 w-4" />
                {opt.label}
              </button>
            );
          })}
        </div>
      </Section>

      <Section title="Notifications" desc="Pick what you'd like to be notified about.">
        <SwitchRow label="Email notifications" desc="Project updates and weekly summaries." checked={emailNotif} onChange={setEmailNotif} />
        <SwitchRow label="Product announcements" desc="New features and AI capability updates." checked={productNotif} onChange={setProductNotif} />
        <SwitchRow label="Marketing emails" desc="Tips, offers, and partner content." checked={marketing} onChange={setMarketing} />
      </Section>

      <Section title="Account" desc="Manage your account credentials.">
        <Label className="text-sm">Email</Label>
        <Input defaultValue="jane@projectai.dev" className="mt-1.5" />
        <Label className="mt-4 text-sm">Display name</Label>
        <Input defaultValue="Jane Doe" className="mt-1.5" />
        <Button className="mt-5">Save changes</Button>
      </Section>

      <Section title="API access" desc="Coming soon — generate API keys to integrate ProjectAI in your tools.">
        <div className="rounded-xl border border-dashed border-border bg-muted/30 p-6 text-center">
          <p className="text-sm font-medium">API access is coming soon</p>
          <p className="mt-1 text-xs text-muted-foreground">Join the waitlist to get early access.</p>
          <Button variant="outline" className="mt-4">Join waitlist</Button>
        </div>
      </Section>
    </div>
  );
}

function Section({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
      <h3 className="font-semibold">{title}</h3>
      {desc && <p className="mt-1 text-sm text-muted-foreground">{desc}</p>}
      <div className="mt-5">{children}</div>
    </div>
  );
}

function SwitchRow({
  label,
  desc,
  checked,
  onChange,
}: {
  label: string;
  desc: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border py-4 last:border-0">
      <div className="min-w-0">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}
