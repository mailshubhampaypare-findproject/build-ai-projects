import { Link } from "@tanstack/react-router";

export function BrandLogo({ to = "/" }: { to?: string }) {
  return (
    <Link to={to} className="flex items-center gap-2 group">
      <span className="grid size-8 place-items-center rounded-lg bg-brand text-brand-foreground font-bold shadow-card">
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
          <path d="M4 7l8-4 8 4-8 4-8-4z" fill="currentColor" />
          <path
            d="M4 12l8 4 8-4M4 17l8 4 8-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="font-display text-xl font-semibold tracking-tight">ProjectAI</span>
    </Link>
  );
}
