# Deploying ProjectAI to Vercel

This app is built with **TanStack Start + Nitro**, which has first-class Vercel support via the `@nitro/vercel` preset (already installed). No framework rewrite needed.

## One-time setup

1. Push the repo to GitHub / GitLab / Bitbucket.
2. Go to https://vercel.com/new and import the repository.
3. On the "Configure Project" screen:
   - **Framework Preset:** `Other` (leave as-is — `vercel.json` handles it)
   - **Build Command:** leave default (read from `vercel.json`)
   - **Output Directory:** leave default (read from `vercel.json`)
   - **Install Command:** leave default
4. Click **Deploy**.

That's it. Vercel will run `NITRO_PRESET=vercel npm run build`. The TanStack Start Vite build emits the Vercel Build Output API format into `.vercel/output/`, and Vercel serves SSR via Vercel Functions + static assets via the CDN.

## Environment variables

If/when you add Lovable Cloud (Supabase) or other secrets, set them in
**Vercel → Project → Settings → Environment Variables**:

- `VITE_SUPABASE_URL` (client-safe)
- `VITE_SUPABASE_PUBLISHABLE_KEY` (client-safe)
- `SUPABASE_URL` (server)
- `SUPABASE_PUBLISHABLE_KEY` (server)
- `SUPABASE_SERVICE_ROLE_KEY` (server, secret)

Redeploy after adding new env vars.

## Local production preview

```bash
NITRO_PRESET=vercel npm run build
# Output appears in .vercel/output/
```

You can then run `vercel dev` (with the Vercel CLI) to emulate the production runtime locally.

## Custom domain

Vercel → Project → Settings → Domains → Add. Follow the DNS instructions.
