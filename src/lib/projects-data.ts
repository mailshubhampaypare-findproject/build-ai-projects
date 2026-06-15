export type ProjectStatus = "Draft" | "In Progress" | "Completed";

export interface Project {
  id: string;
  name: string;
  description: string;
  tech: string[];
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  status: ProjectStatus;
  updatedAt: string;
  progress: number;
}

export const MY_PROJECTS: Project[] = [
  {
    id: "smart-health-monitor",
    name: "Smart Health Monitor",
    description: "Track vitals with a React dashboard backed by Firebase realtime DB.",
    tech: ["React", "Firebase", "Tailwind"],
    category: "Web Development",
    difficulty: "Intermediate",
    status: "Completed",
    updatedAt: "2 hours ago",
    progress: 100,
  },
  {
    id: "ai-resume-parser",
    name: "AI Resume Parser",
    description: "Extract skills and experience from PDF resumes using Python and spaCy.",
    tech: ["Python", "Flask", "spaCy"],
    category: "Python Projects",
    difficulty: "Advanced",
    status: "In Progress",
    updatedAt: "5 hours ago",
    progress: 60,
  },
  {
    id: "ecom-dashboard",
    name: "E-Commerce Dashboard",
    description: "Modern admin panel with charts and order tracking for online stores.",
    tech: ["React", "Node.js", "PostgreSQL"],
    category: "React Projects",
    difficulty: "Intermediate",
    status: "Draft",
    updatedAt: "1 day ago",
    progress: 15,
  },
  {
    id: "attendance-qr",
    name: "QR Attendance System",
    description: "Mark and verify student attendance using QR codes and a Flask backend.",
    tech: ["Flask", "SQLite", "React"],
    category: "Final Year Projects",
    difficulty: "Beginner",
    status: "Completed",
    updatedAt: "3 days ago",
    progress: 100,
  },
];

export const TEMPLATE_PROJECTS: Project[] = [
  {
    id: "django-blog",
    name: "Django Blog Platform",
    description: "Full-stack blog with authentication, comments, and an admin panel.",
    tech: ["Django", "PostgreSQL", "Tailwind"],
    category: "Django Projects",
    difficulty: "Intermediate",
    status: "Completed",
    updatedAt: "Template",
    progress: 100,
  },
  {
    id: "react-chat",
    name: "Realtime Chat App",
    description: "WhatsApp-style chat with rooms, typing indicators, and avatars.",
    tech: ["React", "Socket.IO", "Node.js"],
    category: "React Projects",
    difficulty: "Intermediate",
    status: "Completed",
    updatedAt: "Template",
    progress: 100,
  },
  {
    id: "flask-todo",
    name: "Flask Task Manager",
    description: "Beginner-friendly task manager with REST API and SQLite.",
    tech: ["Flask", "SQLite", "Bootstrap"],
    category: "Flask Projects",
    difficulty: "Beginner",
    status: "Completed",
    updatedAt: "Template",
    progress: 100,
  },
  {
    id: "ml-stock",
    name: "Stock Price Predictor",
    description: "LSTM-based stock predictor with interactive Plotly charts.",
    tech: ["Python", "TensorFlow", "Plotly"],
    category: "Python Projects",
    difficulty: "Advanced",
    status: "Completed",
    updatedAt: "Template",
    progress: 100,
  },
  {
    id: "portfolio",
    name: "Personal Portfolio Website",
    description: "Stunning resume-ready portfolio with project showcase.",
    tech: ["React", "Vite", "Tailwind"],
    category: "Resume Projects",
    difficulty: "Beginner",
    status: "Completed",
    updatedAt: "Template",
    progress: 100,
  },
  {
    id: "expense-tracker",
    name: "Expense Tracker",
    description: "Track expenses with categories, charts, and CSV export.",
    tech: ["React", "Firebase"],
    category: "Web Development",
    difficulty: "Beginner",
    status: "Completed",
    updatedAt: "Template",
    progress: 100,
  },
  {
    id: "hospital-mgmt",
    name: "Hospital Management System",
    description: "Patient, doctor, and appointment workflows for clinics.",
    tech: ["Django", "PostgreSQL"],
    category: "Final Year Projects",
    difficulty: "Advanced",
    status: "Completed",
    updatedAt: "Template",
    progress: 100,
  },
  {
    id: "movie-recsys",
    name: "Movie Recommendation System",
    description: "Collaborative filtering recommender with a Streamlit UI.",
    tech: ["Python", "Streamlit", "Pandas"],
    category: "Python Projects",
    difficulty: "Intermediate",
    status: "Completed",
    updatedAt: "Template",
    progress: 100,
  },
];

export const ALL_PROJECTS = [...MY_PROJECTS, ...TEMPLATE_PROJECTS];

export const CATEGORIES = [
  "All",
  "Web Development",
  "Python Projects",
  "React Projects",
  "Flask Projects",
  "Django Projects",
  "Final Year Projects",
  "Resume Projects",
] as const;

export function getProject(id: string): Project | undefined {
  return ALL_PROJECTS.find((p) => p.id === id);
}

export function statusBadgeClasses(s: ProjectStatus): string {
  switch (s) {
    case "Completed":
      return "bg-brand/10 text-brand border border-brand/20";
    case "In Progress":
      return "bg-amber-500/10 text-amber-600 border border-amber-500/20 dark:text-amber-400";
    case "Draft":
    default:
      return "bg-muted text-muted-foreground border border-border";
  }
}
