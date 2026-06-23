import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_app/pricing")({
  head: () => ({ meta: [{ title: "Pricing — ProjectAI" }] }),
  component: PricingPage,
});

const PLANS = [
  {
    name: "Starter",
    price: "$0",
    cadence: "free forever",
    desc: "Try ProjectAI for your first project.",
    features: [
      "1 project / month",
      "Source code + README",
      "Basic documentation",
      "Community support",
    ],
    popular: false,
    cta: "Current plan",
  },
  {
    name: "Pro",
    price: "$19",
    cadence: "per month",
    desc: "For students shipping serious projects.",
    features: [
      "Unlimited projects",
      "Full reports + PPT content",
      "Interview prep generator",
      "AI modification chat",
      "Priority generation",
    ],
    popular: true,
    cta: "Upgrade to Pro",
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "annual",
    desc: "For colleges and engineering teams.",
    features: ["Bulk seats", "Custom templates", "SSO + admin controls", "Dedicated support"],
    popular: false,
    cta: "Contact Sales",
  },
];

function PricingPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-10 p-6 sm:p-8">
      <div className="text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-brand">Pricing</p>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Choose your plan
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Flexible pricing for students, professionals, and teams.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {PLANS.map((p) => (
          <div
            key={p.name}
            className={`relative rounded-2xl border bg-card p-8 ${p.popular ? "border-brand shadow-elevated ring-1 ring-brand/30" : "border-border shadow-card"}`}
          >
            {p.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-foreground">
                <Star className="-mt-0.5 mr-1 inline h-3 w-3" />
                Most popular
              </div>
            )}
            <h3 className="font-semibold">{p.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
            <div className="mt-6 flex items-baseline gap-1">
              <span className="font-display text-4xl font-semibold tracking-tight">{p.price}</span>
              <span className="text-sm text-muted-foreground">/ {p.cadence}</span>
            </div>
            <Button asChild className="mt-6 w-full" variant={p.popular ? "default" : "outline"}>
              <Link to="/dashboard">{p.cta}</Link>
            </Button>
            <ul className="mt-8 space-y-3">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
