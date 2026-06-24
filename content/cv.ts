export interface Profile {
  name: string;
  title: string;
  tagline: string;
  location: string;
  cvPdfPath: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  location: string;
  bullets: string[];
}

export interface Project {
  name: string;
  client: string;
  description: string;
  tags: string[];
}

export interface ContactLink {
  label: string;
  href: string;
  kind: "email" | "linkedin" | "github";
}

export const profile: Profile = {
  name: "Zulkarnen",
  title: "Software Engineer",
  tagline:
    "Full-stack engineer with 3+ years delivering end-to-end web and mobile platforms — from Next.js frontends to Go, Node.js, and Laravel backends. 12+ production applications shipped, including a 45,687-member digital membership platform.",
  location: "Yogyakarta, Indonesia",
  cvPdfPath: "/cv.pdf",
};

export const about: string[] = [
  "I own features end-to-end — from database schema to UI — with CI/CD and containerized deployment built in. My core is full-stack and backend engineering in Go, Node.js, Laravel, and Next.js.",
  "That product work sits on a strong DevOps foundation: I run a self-managed, highly available Kubernetes cluster at 99.95% uptime, cut deployment time 80% with CI/CD pipelines, and instrument everything with a full Prometheus / Grafana / Loki observability stack.",
];

export const skills: SkillGroup[] = [
  { category: "Languages", items: ["Go", "JavaScript", "TypeScript", "PHP", "Python", "Bash"] },
  {
    category: "Backend & APIs",
    items: ["REST APIs", "Gin (Go)", "Express.js", "FastAPI", "Flask", "Laravel", "CodeIgniter"],
  },
  { category: "Frontend", items: ["Next.js", "React"] },
  {
    category: "Databases & Caching",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Firebase"],
  },
  {
    category: "Testing & QA",
    items: ["Unit (Jest, Vitest)", "Integration testing", "End-to-End (Playwright)"],
  },
  {
    category: "Messaging & Storage",
    items: ["RabbitMQ", "MinIO", "Cloudflare R2", "Hasura", "Nhost"],
  },
  {
    category: "DevOps & Infra",
    items: [
      "Docker",
      "Kubernetes (self-managed HA)",
      "Helm",
      "Ansible",
      "GitLab CI",
      "GitHub Actions",
      "HAProxy",
      "Nginx",
      "Longhorn",
      "NFS",
    ],
  },
  { category: "Observability", items: ["Prometheus", "Grafana", "Loki", "Promtail"] },
  { category: "Cloud / Hosting", items: ["Bare-metal VPS", "AWS", "Cloudflare"] },
  {
    category: "Concepts",
    items: [
      "Clean Architecture",
      "Microservices",
      "Caching",
      "Authentication / Authorization",
      "Security",
      "Load Balancing",
      "CI/CD",
      "Scrum",
    ],
  },
];

export const experience: ExperienceItem[] = [
  {
    title: "Backend & DevOps Engineer",
    company: "Muhammadiyah Software Labs",
    period: "Aug 2023 – Present",
    location: "Yogyakarta, Indonesia",
    bullets: [
      "Delivered full-stack development of KTA Muhammadiyah, the organization's digital membership platform that issued 45,687 member cards — built with Laravel + Express.js, PostgreSQL, Redis, and RabbitMQ on a Clean Architecture foundation.",
      "Built full-stack features for Sehat Muhammadiyah, a healthcare services platform (Laravel + Express.js).",
      "Shipped backend services for 12+ production applications, applying Clean Architecture and microservices with PostgreSQL/MySQL and Redis caching for scalable, reliable systems.",
      "Designed and implemented backend REST APIs powering the MASA mobile apps (iOS & Android), plus a backend service within the Muhammadiyah SSO platform.",
      "Wrote unit, integration, and end-to-end tests (Jest, Vitest, Playwright) and gated them in the CI pipeline, catching regressions before every deploy.",
      "Owned CI/CD across GitLab CI and GitHub Actions, cutting deployment time 80% (30 → 6 minutes), and operate a self-managed, highly available Kubernetes cluster at 99.95% uptime with full Prometheus/Grafana/Loki observability.",
    ],
  },
  {
    title: "Backend Developer",
    company: "Sunhouse Digital",
    period: "Jun 2022 – Jun 2023",
    location: "Yogyakarta, Indonesia",
    bullets: [
      "Built Rentalize, a rental-management platform covering inventory, booking, scheduling, invoicing, payments, multi-tier pricing, and multi-branch operations — Python backend with a Next.js frontend.",
      "Implemented multi-language (i18n) support to broaden accessibility for a more inclusive user base.",
      "Built full-stack features for SIMADES, a village population-data management portal (CodeIgniter, MySQL).",
      "Optimized application performance, reducing page load times for a faster user experience.",
      "Containerized applications with Docker for consistent development and production environments.",
    ],
  },
  {
    title: "Full Stack Developer Intern",
    company: "Binokular Media Utama",
    period: "Mar 2022 – Jul 2022",
    location: "Yogyakarta, Indonesia",
    bullets: [
      "Built a news-similarity engine using cosine similarity (Python, Laravel) to detect and filter duplicate articles, processing 500+ articles/day and improving information retrieval.",
      "Developed and refactored a legacy task-management & ticketing system, improving performance and ensuring integration with modern systems.",
    ],
  },
];

export const projects: Project[] = [
  {
    name: "LPP Agro Marketplace",
    client: "LPP Agro Nusantara",
    description:
      "Internal B2B marketplace connecting farmers and corporate buyers. Built in a 4-person team on a single Next.js codebase (API routes + PostgreSQL); delivered seller onboarding, order management, and buyer and admin dashboards.",
    tags: ["Next.js", "PostgreSQL", "API Routes"],
  },
  {
    name: "Heaven Marketplace",
    client: "GB Heaven",
    description:
      "Games marketplace for trading game accounts, boosting services, and top-ups across seller, buyer, and admin roles. Built the full stack including an escrow workflow, payment-gateway integration, top-up, and dispute resolution.",
    tags: ["Next.js", "PostgreSQL", "Payments", "Escrow"],
  },
  {
    name: "SITAMA",
    client: "Majelis Tabligh Muhammadiyah",
    description:
      "Internal organization platform. Owned the backend and DevOps: designed the Hasura GraphQL schema and permissions, handled file storage with MinIO, and migrated the server to a self-managed VPS.",
    tags: ["Next.js", "Hasura", "GraphQL", "MinIO", "Nhost"],
  },
  {
    name: "KTA Muhammadiyah",
    client: "Muhammadiyah",
    description:
      "Flagship digital membership platform that issued 45,687 member cards. Built full-stack on a Clean Architecture foundation with a Laravel + Express.js backend.",
    tags: ["Laravel", "Express.js", "PostgreSQL", "Redis", "RabbitMQ"],
  },
];

export const contacts: ContactLink[] = [
  { label: "Email", href: "mailto:zulkarnen706@gmail.com", kind: "email" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/zulkarnen/", kind: "linkedin" },
  { label: "GitHub", href: "https://github.com/zulkarnen-force/", kind: "github" },
];
