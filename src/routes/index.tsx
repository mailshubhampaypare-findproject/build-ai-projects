import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import {
  ArrowRight,
  Sparkles,
  Code2,
  FileText,
  Presentation,
  MessageSquare,
  BookOpen,
  Github,
  Library,
  GraduationCap,
  HelpCircle,
  Check,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/brand-logo";
import { signInWithGoogle } from "@/lib/auth";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ProjectAI — Build Complete College & Resume Projects with AI" },
      {
        name: "description",
        content:
          "Generate source code, documentation, project reports, PPT content, GitHub READMEs, and interview questions in minutes. Built for students and professionals.",
      },
      { property: "og:title", content: "ProjectAI — Build Complete Projects with AI" },
      {
        property: "og:description",
        content:
          "Go from idea to complete project in minutes — code, docs, reports, PPTs, and interview prep.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <FAQ />
      <SiteFooter />
    </div>
  );
}

function SiteHeader() {
  const router = useRouter();
  const handleSignIn = async () => {
    const { url } = await signInWithGoogle();
    if (url) {
      window.location.href = url;
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <BrandLogo />
          <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
            <a href="#features" className="transition-colors hover:text-foreground">
              Features
            </a>
            <a href="#how" className="transition-colors hover:text-foreground">
              How it works
            </a>
            <a href="#pricing" className="transition-colors hover:text-foreground">
              Pricing
            </a>
            <a href="#faq" className="transition-colors hover:text-foreground">
              FAQ
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button onClick={handleSignIn}>
            Login <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const router = useRouter();
  const handleSignIn = async () => {
    const { url } = await signInWithGoogle();
    if (url) {
      window.location.href = url;
    }
  };

  return (
    <section className="relative overflow-hidden px-6 pt-20 pb-24 sm:pt-28">
      <div className="absolute inset-x-0 top-0 -z-10 mx-auto h-[500px] max-w-5xl bg-[radial-gradient(ellipse_at_top,oklch(0.62_0.14_162/0.15),transparent_70%)]" />
      <div className="mx-auto max-w-5xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-card">
          <Sparkles className="h-3.5 w-3.5 text-brand" />
          AI-powered project builder for students & pros
        </div>
        <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl md:text-7xl">
          Build Complete College & Resume Projects with AI
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground text-pretty sm:text-xl">
          Generate source code, documentation, project reports, PPT content, GitHub README files,
          architecture explanations, and interview questions in minutes.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" className="h-12 px-6 text-base" onClick={handleSignIn}>
            Start Building <ArrowRight className="ml-1.5 h-4 w-4" />
          </Button>
          <Button asChild size="lg" variant="outline" className="h-12 px-6 text-base">
            <Link to="/browse">View Demo</Link>
          </Button>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5 text-brand" /> No coding required
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5 text-brand" /> Source + docs + reports
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5 text-brand" /> Free starter plan
          </span>
        </div>
      </div>

      {/* Product preview */}
      <div className="mx-auto mt-20 max-w-6xl">
        <div className="rounded-2xl border border-border bg-card p-2 shadow-elevated">
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-2.5">
              <div className="flex items-center gap-1.5">
                <div className="size-2.5 rounded-full bg-muted-foreground/30" />
                <div className="size-2.5 rounded-full bg-muted-foreground/30" />
                <div className="size-2.5 rounded-full bg-muted-foreground/30" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                projectai / workspace
              </span>
              <span className="text-xs font-medium text-brand">● Building</span>
            </div>
            <div className="grid min-h-[420px] grid-cols-12">
              <div className="col-span-3 hidden border-r border-border bg-muted/30 p-4 md:block">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Files
                </p>
                <ul className="space-y-1.5 text-sm">
                  {[
                    "README.md",
                    "documentation/",
                    "src/main.py",
                    "schema.sql",
                    "report.pdf",
                    "slides.pptx",
                  ].map((f, i) => (
                    <li
                      key={f}
                      className={`flex items-center gap-2 rounded-md px-2 py-1.5 ${i === 0 ? "bg-card font-medium text-foreground" : "text-muted-foreground"}`}
                    >
                      <span className="size-1.5 rounded-full bg-brand/60" />
                      <span className="font-mono text-xs">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-12 flex flex-col md:col-span-6">
                <div className="flex-1 space-y-4 p-6">
                  <div className="flex justify-end">
                    <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground">
                      Build a student attendance tracker with QR codes, React frontend, and admin
                      dashboard.
                    </div>
                  </div>
                  <div className="flex">
                    <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-border bg-card px-4 py-3 text-sm">
                      Generating blueprint. Stack:{" "}
                      <span className="font-medium">React + Vite + Supabase</span>. Creating{" "}
                      <span className="font-mono text-xs text-brand">App.tsx</span>,{" "}
                      <span className="font-mono text-xs text-brand">schema.sql</span> and{" "}
                      <span className="font-mono text-xs text-brand">README.md</span>...
                    </div>
                  </div>
                  <div className="flex">
                    <div className="rounded-xl border border-brand/20 bg-brand/5 px-3 py-2 text-xs text-brand">
                      ✓ 12 files generated · Report (8 pages) · PPT (14 slides)
                    </div>
                  </div>
                </div>
                <div className="border-t border-border p-4">
                  <div className="flex h-11 items-center rounded-xl border border-border bg-muted/40 px-4 text-sm text-muted-foreground">
                    Ask AI to modify the project...
                  </div>
                </div>
              </div>
              <div className="col-span-3 hidden border-l border-border bg-muted/30 p-4 lg:block">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Summary
                </p>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-[10px] uppercase text-muted-foreground">Stack</p>
                    <p className="font-medium">React · Supabase</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-muted-foreground">Progress</p>
                    <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div className="h-full w-3/4 bg-brand" />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 pt-2">
                    {["Code", "Docs", "PPT", "Report", "Q&A"].map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-brand/20 bg-brand/5 px-2 py-0.5 text-[10px] font-medium text-brand"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const FEATURES = [
  {
    icon: Sparkles,
    title: "AI Project Builder",
    desc: "From a single sentence to a complete, structured project.",
  },
  {
    icon: Code2,
    title: "Source Code Generation",
    desc: "Production-ready code in Python, JS, Java and more.",
  },
  {
    icon: BookOpen,
    title: "Documentation Generator",
    desc: "Architecture, API docs, and setup guides.",
  },
  {
    icon: FileText,
    title: "Project Report Generator",
    desc: "IEEE-style reports formatted for submission.",
  },
  {
    icon: Presentation,
    title: "PPT Content Generator",
    desc: "Slides and speaker notes for vivas and demos.",
  },
  {
    icon: HelpCircle,
    title: "Interview Questions",
    desc: "Custom Q&A tailored to your project code.",
  },
  {
    icon: Github,
    title: "GitHub README Generator",
    desc: "Beautiful, well-structured READMEs in one click.",
  },
  {
    icon: MessageSquare,
    title: "AI Modification Chat",
    desc: "Refactor or add features through a simple chat.",
  },
  {
    icon: Library,
    title: "Project Templates Library",
    desc: "Curated marketplace of ready-to-build projects.",
  },
];

function Features() {
  return (
    <section id="features" className="border-t border-border bg-muted/30 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-brand">Features</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Everything you need for an A+ project
          </h2>
          <p className="mt-4 text-muted-foreground">
            Nine integrated tools so you ship code, docs, reports, and interview prep — together.
          </p>
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-elevated"
            >
              <div className="mb-4 grid size-10 place-items-center rounded-lg bg-brand/10 text-brand">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  {
    n: "01",
    t: "Describe your project idea",
    d: "Tell us in plain English what you want to build.",
  },
  { n: "02", t: "Answer AI requirement questions", d: "A short guided questionnaire — no jargon." },
  { n: "03", t: "Review project blueprint", d: "Confirm stack, features, and deliverables." },
  { n: "04", t: "Generate project", d: "AI writes code, docs, reports, and slides." },
  { n: "05", t: "Modify with AI chat", d: "Refactor, add features, fix bugs by chatting." },
  { n: "06", t: "Download project assets", d: "Export a clean .zip with everything ready." },
];

function HowItWorks() {
  return (
    <section id="how" className="border-t border-border px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col items-end justify-between gap-6 md:flex-row">
          <div className="max-w-xl">
            <p className="font-mono text-xs uppercase tracking-widest text-brand">How it works</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              From idea to deployment in six steps
            </h2>
          </div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            ~15 min
          </p>
        </div>
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="bg-card p-8">
              <div className="font-mono text-xs text-brand">{s.n}</div>
              <h4 className="mt-3 font-semibold">{s.t}</h4>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const PLANS = [
  {
    name: "Starter",
    price: "$0",
    cadence: "free forever",
    desc: "Try ProjectAI for your first project.",
    cta: "Get Started",
    features: [
      "1 project / month",
      "Source code + README",
      "Basic documentation",
      "Community support",
    ],
    popular: false,
  },
  {
    name: "Pro",
    price: "$19",
    cadence: "per month",
    desc: "For students shipping serious projects.",
    cta: "Start Pro Trial",
    features: [
      "Unlimited projects",
      "Full reports + PPT content",
      "Interview prep generator",
      "AI modification chat",
      "Priority generation",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "annual",
    desc: "For colleges and engineering teams.",
    cta: "Contact Sales",
    features: ["Bulk seats", "Custom templates", "SSO + admin controls", "Dedicated support"],
    popular: false,
  },
];

function Pricing() {
  const router = useRouter();
  const handleSignIn = async () => {
    const { url } = await signInWithGoogle();
    if (url) {
      window.location.href = url;
    }
  };

  return (
    <section id="pricing" className="border-t border-border bg-muted/30 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-brand">Pricing</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Simple plans for every stage
          </h2>
          <p className="mt-4 text-muted-foreground">Start free. Upgrade when you ship more.</p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
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
                <span className="font-display text-4xl font-semibold tracking-tight">
                  {p.price}
                </span>
                <span className="text-sm text-muted-foreground">/ {p.cadence}</span>
              </div>
              <Button
                className="mt-6 w-full"
                variant={p.popular ? "default" : "outline"}
                onClick={handleSignIn}
              >
                {p.cta}
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
    </section>
  );
}

const FAQS = [
  {
    q: "Do I need coding experience to use ProjectAI?",
    a: "Not at all. ProjectAI is designed for beginners. Just describe your project idea — we handle the rest, including code, docs, and reports.",
  },
  {
    q: "What kinds of projects can I build?",
    a: "Web apps, Python projects, React apps, Flask & Django backends, final-year projects, and resume-grade portfolio pieces.",
  },
  {
    q: "Can I modify the generated project later?",
    a: "Yes. Every project includes an AI chat that can modify code, add features, switch databases, or generate new docs on demand.",
  },
  {
    q: "What do I get when I download a project?",
    a: "A clean .zip with full source code, README, documentation, project report (PDF), PPT content, and an interview Q&A guide.",
  },
  {
    q: "Is there a free plan?",
    a: "Yes — the Starter plan is free forever and lets you generate one full project per month.",
  },
];

function FAQ() {
  return (
    <section id="faq" className="border-t border-border px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-brand">FAQ</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Frequently asked questions
          </h2>
        </div>
        <Accordion type="single" collapsible className="space-y-3">
          {FAQS.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="rounded-xl border border-border bg-card px-5 shadow-card"
            >
              <AccordionTrigger className="text-left font-medium hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card px-6 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div>
          <BrandLogo />
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Accelerating the path from idea to delivery for students and professionals.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium text-muted-foreground">
          <a href="#features" className="hover:text-foreground">
            Features
          </a>
          <a href="#pricing" className="hover:text-foreground">
            Pricing
          </a>
          <a href="#faq" className="hover:text-foreground">
            FAQ
          </a>
          <Link to="/dashboard" className="hover:text-foreground">
            Dashboard
          </Link>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-border pt-6 text-xs text-muted-foreground">
        © 2022 Eduprojects solution | All rights reserved
      </div>
    </footer>
  );
}
