export type ProjectStatus = "Draft" | "In Progress" | "Completed";

export interface ProjectModule {
  name: string;
  description: string;
}

export interface ProjectTable {
  name: string;
  columns: string[];
}

export interface ProjectLaunchStep {
  title: string;
  content: string;
  isCompleted?: boolean;
}

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
  // New fields
  thumbnail?: string;
  rating?: number;
  downloads?: number;
  teamSize?: string;
  completionTime?: string;
  learningOutcomes?: string[];
  features?: string[];
  screenshots?: string[];
  department?: string;
  language?: string;
  modules?: ProjectModule[];
  database?: {
    type: string;
    tables: ProjectTable[];
    relationships: string;
  };
  documentation?: {
    architecture: string;
    working: string;
    implementation: string;
  };
  folderStructure?: {
    path: string;
    description: string;
  }[];
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
    rating: 4.8,
    downloads: 1240,
    department: "Computer Science",
    language: "JavaScript",
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
    rating: 4.5,
    downloads: 850,
    department: "Artificial Intelligence",
    language: "Python",
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
    rating: 4.2,
    downloads: 450,
    department: "Software Engineering",
    language: "TypeScript",
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
    rating: 4.7,
    downloads: 2100,
    department: "Information Technology",
    language: "Python",
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
    rating: 4.6,
    downloads: 3200,
    teamSize: "1-2 Persons",
    completionTime: "2 Weeks",
    department: "Web Development",
    language: "Python",
    learningOutcomes: [
      "Understand MVC architecture in Django",
      "Implement user authentication and authorization",
      "Manage PostgreSQL database with Django ORM",
      "Create responsive UI with Tailwind CSS",
    ],
    features: [
      "User Authentication (Sign up, Login, Logout)",
      "Blog Post CRUD operations",
      "Comment system",
      "Admin Dashboard",
      "Tagging system",
    ],
    screenshots: ["https://picsum.photos/seed/django1/800/450", "https://picsum.photos/seed/django2/800/450"],
    modules: [
      { name: "Auth Module", description: "Handles user registration and login." },
      { name: "Blog Module", description: "Manages posts, categories, and comments." },
      { name: "Admin Module", description: "Provides an interface for site administrators." },
    ],
    database: {
      type: "PostgreSQL",
      tables: [
        { name: "users", columns: ["id", "username", "email", "password"] },
        { name: "posts", columns: ["id", "title", "content", "author_id", "created_at"] },
        { name: "comments", columns: ["id", "post_id", "author_id", "content", "created_at"] },
      ],
      relationships: "One-to-Many between Users and Posts, One-to-Many between Posts and Comments.",
    },
    documentation: {
      architecture: "The project follows the Model-Template-View (MTV) architectural pattern.",
      working: "Users can browse posts, sign in to comment, and admins can manage content via the dashboard.",
      implementation: "Built using Django 4.2 and PostgreSQL, styled with Tailwind CSS.",
    },
    folderStructure: [
      { path: "blog/", description: "Main application directory containing models and views." },
      { path: "templates/", description: "HTML templates for the frontend." },
      { path: "static/", description: "CSS and JavaScript files." },
      { path: "core/", description: "Project settings and configuration." },
    ],
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
    rating: 4.9,
    downloads: 5400,
    teamSize: "2-3 Persons",
    completionTime: "3 Weeks",
    department: "Software Engineering",
    language: "JavaScript",
    learningOutcomes: [
      "Implement real-time communication with Socket.IO",
      "State management in React",
      "Building a Node.js backend",
      "Handling WebSocket events",
    ],
    features: [
      "Real-time messaging",
      "Chat rooms",
      "Typing indicators",
      "User avatars",
      "Message history",
    ],
    screenshots: ["https://picsum.photos/seed/chat1/800/450", "https://picsum.photos/seed/chat2/800/450"],
    modules: [
      { name: "Client App", description: "React-based frontend for the chat interface." },
      { name: "Socket Server", description: "Node.js server handling real-time events." },
    ],
    database: {
      type: "MongoDB",
      tables: [
        { name: "users", columns: ["id", "name", "avatar"] },
        { name: "messages", columns: ["id", "room_id", "sender_id", "text", "timestamp"] },
      ],
      relationships: "Many-to-One between Messages and Users/Rooms.",
    },
    documentation: {
      architecture: "Event-driven architecture using WebSockets for real-time updates.",
      working: "Users join rooms and broadcast messages to all participants instantly.",
      implementation: "React for UI, Socket.IO for communication, Node.js/Express for backend.",
    },
    folderStructure: [
      { path: "src/components/", description: "Reusable UI components like Message and RoomList." },
      { path: "server/", description: "Node.js backend with Socket.IO logic." },
    ],
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
    rating: 4.4,
    downloads: 1800,
    teamSize: "1 Person",
    completionTime: "1 Week",
    department: "Information Technology",
    language: "Python",
    learningOutcomes: [
      "Basics of Flask framework",
      "Working with SQLite database",
      "Creating RESTful APIs",
      "Frontend integration with Bootstrap",
    ],
    features: [
      "Task creation and deletion",
      "Marking tasks as completed",
      "Filtering tasks",
      "Simple user auth",
    ],
    screenshots: ["https://picsum.photos/seed/todo1/800/450"],
    modules: [
      { name: "API", description: "Endpoints for task management." },
      { name: "Database", description: "SQLite schema and models." },
    ],
    database: {
      type: "SQLite",
      tables: [
        { name: "tasks", columns: ["id", "title", "completed", "user_id"] },
      ],
      relationships: "Tasks belong to Users.",
    },
    documentation: {
      architecture: "Monolithic Flask application.",
      working: "Standard CRUD application for personal task management.",
      implementation: "Flask with SQLAlchemy and Bootstrap 5.",
    },
    folderStructure: [
      { path: "app.py", description: "Main entry point of the application." },
      { path: "models.py", description: "Database models." },
      { path: "static/", description: "CSS and JS files." },
    ],
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
    rating: 4.7,
    downloads: 950,
    teamSize: "1-2 Persons",
    completionTime: "4 Weeks",
    department: "Data Science",
    language: "Python",
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
    rating: 4.8,
    downloads: 6200,
    teamSize: "1 Person",
    completionTime: "1 Week",
    department: "Web Development",
    language: "TypeScript",
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
    rating: 4.5,
    downloads: 2400,
    teamSize: "1 Person",
    completionTime: "2 Weeks",
    department: "Web Development",
    language: "JavaScript",
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
    rating: 4.6,
    downloads: 1100,
    teamSize: "3-4 Persons",
    completionTime: "8 Weeks",
    department: "Health Informatics",
    language: "Python",
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
    rating: 4.3,
    downloads: 1500,
    teamSize: "1-2 Persons",
    completionTime: "3 Weeks",
    department: "Artificial Intelligence",
    language: "Python",
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

export const DEPARTMENTS = [
  "All",
  "Computer Science",
  "Information Technology",
  "Software Engineering",
  "Artificial Intelligence",
  "Data Science",
  "Health Informatics",
  "Web Development",
] as const;

export const LANGUAGES = [
  "All",
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "PHP",
  "C++",
] as const;

export const DIFFICULTIES = [
  "All",
  "Beginner",
  "Intermediate",
  "Advanced",
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
