import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { MY_PROJECTS } from "@/lib/projects-data";

export const Route = createFileRoute("/_app/create")({
  head: () => ({ meta: [{ title: "Create Project — ProjectAI" }] }),
  component: CreatePage,
});

type Step = 1 | 2 | 3;

const FEATURE_OPTIONS = [
  "User authentication",
  "Admin panel",
  "Database integration",
  "REST API",
  "Realtime updates",
  "File uploads",
  "Search & filters",
  "Charts & analytics",
  "Email notifications",
  "Mobile responsive",
];

const DELIVERABLES = [
  "Source Code",
  "Documentation",
  "Project Report",
  "PPT Content",
  "GitHub README",
  "Interview Q&A",
];

function CreatePage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [idea, setIdea] = useState("");
  const [purpose, setPurpose] = useState("");
  const [stack, setStack] = useState("");
  const [size, setSize] = useState("Medium");
  const [skill, setSkill] = useState("Intermediate");
  const [needsDb, setNeedsDb] = useState(true);
  const [users, setUsers] = useState("");
  const [features, setFeatures] = useState<string[]>([
    "User authentication",
    "Database integration",
  ]);
  const [needsAuth, setNeedsAuth] = useState(true);
  const [responsive, setResponsive] = useState(true);
  const [adminPanel, setAdminPanel] = useState(false);
  const [deliverables, setDeliverables] = useState<string[]>([
    "Source Code",
    "Documentation",
    "GitHub README",
  ]);
  const [reportLength, setReportLength] = useState("30");
  const [docLang, setDocLang] = useState("English");
  const [sampleData, setSampleData] = useState(true);
  const [deployInstructions, setDeployInstructions] = useState(true);

  const progress = step === 1 ? 25 : step === 2 ? 65 : 100;

  return (
    <div className="mx-auto max-w-3xl p-6 sm:p-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold tracking-tight">Create a new project</h1>
        <p className="mt-1.5 text-muted-foreground">
          Tell us what you want to build. AI will design the blueprint.
        </p>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-xs font-medium text-muted-foreground">
          <span>Step {step} of 3</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-brand transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-3 flex justify-between text-xs">
          {(["Idea", "Requirements", "Blueprint"] as const).map((s, i) => (
            <span
              key={s}
              className={i + 1 <= step ? "font-medium text-foreground" : "text-muted-foreground"}
            >
              {i + 1}. {s}
            </span>
          ))}
        </div>
      </div>

      {step === 1 && (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <Label className="text-base font-semibold">What do you want to build?</Label>
          <p className="mt-1 text-sm text-muted-foreground">
            Describe your project idea in plain English. The more detail, the better.
          </p>
          <Textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Example: A student attendance tracker with QR codes, admin dashboard, and weekly reports..."
            className="mt-4 min-h-[160px] resize-none"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              "Library Management System",
              "AI Chatbot for College Site",
              "Resume Builder Web App",
              "Stock Price Predictor",
            ].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setIdea(s)}
                className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs hover:bg-muted"
              >
                {s}
              </button>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <Button onClick={() => setStep(2)} disabled={idea.trim().length < 8}>
              Continue <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <Section title="Project basics">
            <FieldGrid>
              <Field label="Purpose">
                <Input
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="College submission, resume project, internal tool..."
                />
              </Field>
              <Field label="Who will use it?">
                <Input
                  value={users}
                  onChange={(e) => setUsers(e.target.value)}
                  placeholder="Students, faculty, customers..."
                />
              </Field>
              <Field label="Technology stack">
                <Select value={stack} onValueChange={setStack}>
                  <SelectTrigger>
                    <SelectValue placeholder="Let AI decide" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="react-node">React + Node.js</SelectItem>
                    <SelectItem value="next-supabase">Next.js + Supabase</SelectItem>
                    <SelectItem value="python-flask">Python + Flask</SelectItem>
                    <SelectItem value="django">Django</SelectItem>
                    <SelectItem value="mern">MERN Stack</SelectItem>
                    <SelectItem value="ai">Let AI decide</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Project size">
                <Select value={size} onValueChange={setSize}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Small">Small (1-2 weeks)</SelectItem>
                    <SelectItem value="Medium">Medium (1 month)</SelectItem>
                    <SelectItem value="Large">Large (2-3 months)</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Your skill level">
                <Select value={skill} onValueChange={setSkill}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Documentation language">
                <Select value={docLang} onValueChange={setDocLang}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Hindi">Hindi</SelectItem>
                    <SelectItem value="Spanish">Spanish</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </FieldGrid>
          </Section>

          <Section title="Configuration">
            <div className="space-y-4">
              <SwitchRow
                label="Needs a database"
                desc="Add a schema and storage layer."
                checked={needsDb}
                onChange={setNeedsDb}
              />
              <SwitchRow
                label="User authentication"
                desc="Sign up, login, sessions."
                checked={needsAuth}
                onChange={setNeedsAuth}
              />
              <SwitchRow
                label="Mobile responsive"
                desc="Adaptive layouts for phones and tablets."
                checked={responsive}
                onChange={setResponsive}
              />
              <SwitchRow
                label="Admin panel"
                desc="Management UI for admins."
                checked={adminPanel}
                onChange={setAdminPanel}
              />
              <SwitchRow
                label="Generate sample data"
                desc="Seed the database with realistic data."
                checked={sampleData}
                onChange={setSampleData}
              />
              <SwitchRow
                label="Deployment instructions"
                desc="Hosting and CI/CD guide."
                checked={deployInstructions}
                onChange={setDeployInstructions}
              />
            </div>
          </Section>

          <Section title="Features to include">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {FEATURE_OPTIONS.map((f) => (
                <CheckRow
                  key={f}
                  label={f}
                  checked={features.includes(f)}
                  onChange={(v) =>
                    setFeatures((prev) => (v ? [...prev, f] : prev.filter((x) => x !== f)))
                  }
                />
              ))}
            </div>
          </Section>

          <Section title="Deliverables">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {DELIVERABLES.map((d) => (
                <CheckRow
                  key={d}
                  label={d}
                  checked={deliverables.includes(d)}
                  onChange={(v) =>
                    setDeliverables((prev) => (v ? [...prev, d] : prev.filter((x) => x !== d)))
                  }
                />
              ))}
            </div>
            <div className="mt-4">
              <Field label="Report length (pages)">
                <Input
                  type="number"
                  min={5}
                  max={120}
                  value={reportLength}
                  onChange={(e) => setReportLength(e.target.value)}
                />
              </Field>
            </div>
          </Section>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(1)}>
              <ArrowLeft className="mr-1 h-4 w-4" /> Back
            </Button>
            <Button onClick={() => setStep(3)}>
              Review Blueprint <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-brand">
                Blueprint ready
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight">
                {idea.slice(0, 60) || "Your AI Project"}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {purpose || "AI-generated project blueprint"}
              </p>
            </div>
            <span className="rounded-md border border-brand/20 bg-brand/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-brand">
              {skill} · {size}
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <BlueprintRow label="Technology Stack" value={stack || "AI Selected"} />
            <BlueprintRow label="Database" value={needsDb ? "PostgreSQL / Supabase" : "None"} />
            <BlueprintRow label="Authentication" value={needsAuth ? "Email + OAuth" : "None"} />
            <BlueprintRow label="Users" value={users || "General users"} />
            <BlueprintRow label="Admin panel" value={adminPanel ? "Included" : "Not included"} />
            <BlueprintRow label="Responsive" value={responsive ? "Yes" : "No"} />
          </div>

          <div className="mt-6">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Features
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {features.map((f) => (
                <span
                  key={f}
                  className="rounded-md border border-border bg-muted/50 px-2 py-1 text-xs"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Deliverables
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {deliverables.map((d) => (
                <span
                  key={d}
                  className="rounded-md border border-brand/20 bg-brand/5 px-2 py-1 text-xs text-brand"
                >
                  {d}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-between gap-3">
            <Button variant="outline" onClick={() => setStep(2)}>
              <ArrowLeft className="mr-1 h-4 w-4" /> Edit requirements
            </Button>
            <Button
              onClick={() => navigate({ to: "/projects/$id", params: { id: MY_PROJECTS[1].id } })}
            >
              <Sparkles className="mr-1 h-4 w-4" /> Generate Project
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
      <h3 className="font-semibold">{title}</h3>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function FieldGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="mb-1.5 block text-sm">{label}</Label>
      {children}
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
    <div className="flex items-center justify-between gap-4 rounded-lg border border-border bg-muted/30 p-4">
      <div className="min-w-0">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}

function CheckRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-3 hover:bg-muted/60 cursor-pointer">
      <Checkbox checked={checked} onCheckedChange={(v) => onChange(Boolean(v))} />
      <span className="text-sm">{label}</span>
    </label>
  );
}

function BlueprintRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-muted/30 p-4">
      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <p className="mt-1.5 font-medium">{value}</p>
    </div>
  );
}

void Check;
