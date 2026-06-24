# CV Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a minimalist, static, single-page CV/portfolio website for Zulkarnen, branded "Software Engineer", in Next.js 16 + Bun + Tailwind, containerized for dev and production.

**Architecture:** Single-page SSG. All CV data lives in one typed module (`content/cv.ts`); presentational React components map over it. No backend, no API routes, no database — contact is static links and the CV is a static PDF. Subtle scroll reveals via a small IntersectionObserver client component; everything else is server-rendered and styled with Tailwind CSS (white/black tokens).

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript (strict), Bun, Tailwind CSS v4, Vitest + React Testing Library, Docker + Docker Compose.

## Global Constraints

- Runtime & package manager: **Bun** (use `bun`/`bunx`, never `npm`/`yarn`/`pnpm`).
- Framework: **Next.js 16, App Router**, `output: 'standalone'`.
- Setup is **manual, file-by-file** — do NOT run `create-next-app` or scaffold via a Docker run.
- Theme is **light only**: white primary (`#ffffff`), black secondary (`#0a0a0a`). No dark mode.
- Positioning: **Fullstack-led blend** — lead each role/section with fullstack/backend impact; DevOps is supporting.
- Content comes **only** from the master CV facts captured in `content/cv.ts` (Task 2). Never invent metrics, dates, tech, or links. **Strip all `[TAG]` markers.**
- Contact = **static links only**. Hero CTA = single **Download CV** button → `/cv.pdf`.
- Use plain `<a>` tags for the CV download, contact links, and in-page anchor links (keeps components trivial to test; no `next/link` mocking).
- Tests are **light**: Vitest + React Testing Library only, covering content wiring. **No Playwright/E2E.**
- Commit after every task with a `feat:`/`chore:`/`docs:` Conventional Commit message.
- Path alias: `@/` resolves to the project root.

---

### Task 1: Project scaffold, config, and test harness

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `next-env.d.ts` (auto), `postcss.config.mjs`, `app/globals.css`, `app/layout.tsx`, `app/page.tsx`, `vitest.config.ts`, `vitest.setup.ts`, `.gitignore`, `.env.example`
- Test: `app/__tests__/smoke.test.tsx`

**Interfaces:**
- Produces: a buildable Next.js app with a root layout, an empty `app/page.tsx`, Tailwind v4 wired with white/black tokens, and a working Vitest harness. Path alias `@/` → project root.

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "zulkarnen-cv",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

- [ ] **Step 2: Install dependencies with Bun**

Run:
```bash
bun add next@latest react@latest react-dom@latest
bun add -d typescript @types/react @types/node @types/react-dom \
  tailwindcss @tailwindcss/postcss \
  vitest @vitejs/plugin-react jsdom \
  @testing-library/react @testing-library/dom @testing-library/jest-dom
```
Expected: dependencies install, `bun.lockb` created.

- [ ] **Step 3: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "types": ["vitest/globals", "@testing-library/jest-dom"],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 4: Create `next.config.ts`**

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
};

export default nextConfig;
```

- [ ] **Step 5: Create `postcss.config.mjs`**

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

- [ ] **Step 6: Create `app/globals.css`** (Tailwind v4 CSS-first config with white/black tokens)

```css
@import "tailwindcss";

@theme {
  --color-background: #ffffff;
  --color-foreground: #0a0a0a;
  --color-muted: #6b6b6b;
  --color-border: #e5e5e5;
  --font-sans: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--color-background);
  color: var(--color-foreground);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
}
```

- [ ] **Step 7: Create `app/layout.tsx`** (basic; metadata is finalized in Task 10)

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zulkarnen — Software Engineer",
  description: "CV and portfolio of Zulkarnen, a Software Engineer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 8: Create `app/page.tsx`** (placeholder; sections composed in Task 10)

```tsx
export default function Home() {
  return <main />;
}
```

- [ ] **Step 9: Create `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL(".", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
  },
});
```

- [ ] **Step 10: Create `vitest.setup.ts`** (jest-dom matchers + IntersectionObserver stub for jsdom)

```ts
import "@testing-library/jest-dom/vitest";

// jsdom has no IntersectionObserver; the Reveal component uses it in useEffect.
if (!("IntersectionObserver" in globalThis)) {
  class IntersectionObserverStub {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }
  // @ts-expect-error assigning a test stub
  globalThis.IntersectionObserver = IntersectionObserverStub;
}
```

- [ ] **Step 11: Create `.gitignore`**

```gitignore
/node_modules
/.next
/out
/build
.DS_Store
*.pem
.env*.local
.env
npm-debug.log*
.vercel
*.tsbuildinfo
next-env.d.ts
```

- [ ] **Step 12: Create `.env.example`**

```dotenv
# No runtime secrets required. Static site.
# PORT is set by the container; defaults to 3000.
```

- [ ] **Step 13: Write the smoke test** `app/__tests__/smoke.test.tsx`

```tsx
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home page", () => {
  it("renders a main landmark", () => {
    render(<Home />);
    expect(screen.getByRole("main")).toBeInTheDocument();
  });
});
```

- [ ] **Step 14: Run the test to verify it passes**

Run: `bun run test`
Expected: PASS (1 test). If it fails on JSX/env, recheck `vitest.config.ts` and `vitest.setup.ts`.

- [ ] **Step 15: Verify the app builds**

Run: `bun run build`
Expected: build succeeds, prints a route for `/` and a `.next/standalone` output.

- [ ] **Step 16: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js 16 + Bun + Tailwind v4 + Vitest"
```

---

### Task 2: Typed content module (`content/cv.ts`)

**Files:**
- Create: `content/cv.ts`
- Test: `content/__tests__/cv.test.ts`

**Interfaces:**
- Produces: typed exports consumed by all section components:
  - `profile: Profile` — `{ name: string; title: string; tagline: string; location: string; cvPdfPath: string }`
  - `about: string[]` — paragraphs for the About narrative
  - `skills: SkillGroup[]` — `{ category: string; items: string[] }[]`
  - `experience: ExperienceItem[]` — `{ title: string; company: string; period: string; location: string; bullets: string[] }[]`
  - `projects: Project[]` — `{ name: string; client: string; description: string; tags: string[] }[]`
  - `contacts: ContactLink[]` — `{ label: string; href: string; kind: "email" | "whatsapp" | "linkedin" | "github" }[]`

- [ ] **Step 1: Write the failing test** `content/__tests__/cv.test.ts`

```ts
import { profile, about, skills, experience, projects, contacts } from "@/content/cv";

describe("cv content", () => {
  it("has the core profile fields", () => {
    expect(profile.name).toBe("Zulkarnen");
    expect(profile.title).toBe("Software Engineer");
    expect(profile.cvPdfPath).toBe("/cv.pdf");
    expect(profile.location).toMatch(/Yogyakarta/);
    expect(profile.tagline.length).toBeGreaterThan(0);
  });

  it("has about paragraphs and skill groups", () => {
    expect(about.length).toBeGreaterThan(0);
    expect(skills.length).toBeGreaterThanOrEqual(8);
    expect(skills.every((g) => g.items.length > 0)).toBe(true);
  });

  it("has three experience roles, newest first", () => {
    expect(experience).toHaveLength(3);
    expect(experience[0].company).toMatch(/Muhammadiyah Software Labs/);
    expect(experience.every((e) => e.bullets.length > 0)).toBe(true);
  });

  it("has the four featured projects", () => {
    expect(projects).toHaveLength(4);
    const names = projects.map((p) => p.name);
    expect(names).toEqual(
      expect.arrayContaining([
        "LPP Agro Marketplace",
        "Heaven Marketplace",
        "SITAMA",
        "KTA Muhammadiyah",
      ]),
    );
  });

  it("has correct contact hrefs", () => {
    const byKind = Object.fromEntries(contacts.map((c) => [c.kind, c.href]));
    expect(byKind.email).toBe("mailto:zulkarnen706@gmail.com");
    expect(byKind.whatsapp).toBe("https://wa.me/6285722382371");
    expect(byKind.linkedin).toBe("https://www.linkedin.com/in/zulkarnen/");
    expect(byKind.github).toBe("https://github.com/zulkarnen-force/");
  });

  it("contains no leftover [TAG] markers", () => {
    const blob = JSON.stringify({ about, skills, experience, projects });
    expect(blob).not.toMatch(/\[(BE|FS|DevOps|ALL)\]/);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `bunx vitest run content`
Expected: FAIL — cannot resolve `@/content/cv`.

- [ ] **Step 3: Create `content/cv.ts`** with types and data

```ts
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
  kind: "email" | "whatsapp" | "linkedin" | "github";
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
  { label: "WhatsApp", href: "https://wa.me/6285722382371", kind: "whatsapp" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/zulkarnen/", kind: "linkedin" },
  { label: "GitHub", href: "https://github.com/zulkarnen-force/", kind: "github" },
];
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `bunx vitest run content`
Expected: PASS (6 tests).

- [ ] **Step 5: Commit**

```bash
git add content
git commit -m "feat: add typed CV content module"
```

---

### Task 3: Shared UI primitives

**Files:**
- Create: `components/ui/Container.tsx`, `components/ui/SectionHeading.tsx`, `components/ui/Tag.tsx`, `components/Reveal.tsx`
- Test: `components/__tests__/ui.test.tsx`

**Interfaces:**
- Produces:
  - `Container({ children, className? })` — centered max-width wrapper.
  - `SectionHeading({ id, eyebrow?, children })` — renders an `<h2>` and sets the section anchor target.
  - `Tag({ children })` — small pill for skills/tech tags.
  - `Reveal({ children, className? })` — client component that fades/slides children in on scroll.

- [ ] **Step 1: Write the failing test** `components/__tests__/ui.test.tsx`

```tsx
import { render, screen } from "@testing-library/react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";

describe("ui primitives", () => {
  it("Container renders children", () => {
    render(<Container>hello</Container>);
    expect(screen.getByText("hello")).toBeInTheDocument();
  });

  it("SectionHeading renders an h2", () => {
    render(<SectionHeading id="about">About</SectionHeading>);
    const heading = screen.getByRole("heading", { level: 2, name: "About" });
    expect(heading).toBeInTheDocument();
  });

  it("Tag renders its label", () => {
    render(<Tag>Next.js</Tag>);
    expect(screen.getByText("Next.js")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `bunx vitest run components/__tests__/ui.test.tsx`
Expected: FAIL — modules not found.

- [ ] **Step 3: Create `components/ui/Container.tsx`**

```tsx
export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-3xl px-6 ${className}`}>{children}</div>
  );
}
```

- [ ] **Step 4: Create `components/ui/SectionHeading.tsx`**

```tsx
export function SectionHeading({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-10">
      <span id={id} className="block scroll-mt-24" aria-hidden />
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        {children}
      </h2>
    </div>
  );
}
```

- [ ] **Step 5: Create `components/ui/Tag.tsx`**

```tsx
export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full border border-border px-3 py-1 text-sm text-foreground">
      {children}
    </span>
  );
}
```

- [ ] **Step 6: Create `components/Reveal.tsx`** (client, IntersectionObserver)

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

export function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 7: Run the test to verify it passes**

Run: `bunx vitest run components/__tests__/ui.test.tsx`
Expected: PASS (3 tests).

- [ ] **Step 8: Commit**

```bash
git add components
git commit -m "feat: add shared UI primitives and Reveal"
```

---

### Task 4: Navigation and footer

**Files:**
- Create: `components/ui/Nav.tsx`, `components/ui/Footer.tsx`
- Test: `components/__tests__/nav.test.tsx`

**Interfaces:**
- Consumes: `profile` from `@/content/cv`.
- Produces: `Nav()` (sticky top nav with anchor links) and `Footer()` (name + current year).

- [ ] **Step 1: Write the failing test** `components/__tests__/nav.test.tsx`

```tsx
import { render, screen } from "@testing-library/react";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";

describe("Nav", () => {
  it("renders anchor links to each section", () => {
    render(<Nav />);
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "#about");
    expect(screen.getByRole("link", { name: "Experience" })).toHaveAttribute("href", "#experience");
    expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute("href", "#projects");
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "#contact");
  });
});

describe("Footer", () => {
  it("renders the name and current year", () => {
    render(<Footer />);
    expect(screen.getByText(new RegExp(String(new Date().getFullYear())))).toBeInTheDocument();
    expect(screen.getByText(/Zulkarnen/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `bunx vitest run components/__tests__/nav.test.tsx`
Expected: FAIL — modules not found.

- [ ] **Step 3: Create `components/ui/Nav.tsx`**

```tsx
import { Container } from "@/components/ui/Container";
import { profile } from "@/content/cv";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <a href="#top" className="text-sm font-semibold tracking-tight">
          {profile.name}
        </a>
        <nav aria-label="Primary">
          <ul className="flex gap-6 text-sm text-muted">
            {links.map((link) => (
              <li key={link.href}>
                <a className="transition-colors hover:text-foreground" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
```

- [ ] **Step 4: Create `components/ui/Footer.tsx`**

```tsx
import { Container } from "@/components/ui/Container";
import { profile } from "@/content/cv";

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <Container className="text-sm text-muted">
        © {new Date().getFullYear()} {profile.name}. All rights reserved.
      </Container>
    </footer>
  );
}
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `bunx vitest run components/__tests__/nav.test.tsx`
Expected: PASS (2 tests).

- [ ] **Step 6: Commit**

```bash
git add components
git commit -m "feat: add nav and footer"
```

---

### Task 5: Hero section

**Files:**
- Create: `components/sections/Hero.tsx`
- Test: `components/__tests__/hero.test.tsx`

**Interfaces:**
- Consumes: `profile` from `@/content/cv`, `Container`.
- Produces: `Hero()` — name, title, tagline, location, and a single **Download CV** link → `profile.cvPdfPath`.

- [ ] **Step 1: Write the failing test** `components/__tests__/hero.test.tsx`

```tsx
import { render, screen } from "@testing-library/react";
import { Hero } from "@/components/sections/Hero";

describe("Hero", () => {
  it("renders the name and Software Engineer title", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1, name: /Zulkarnen/ })).toBeInTheDocument();
    expect(screen.getByText(/Software Engineer/)).toBeInTheDocument();
  });

  it("has a Download CV link pointing at the PDF", () => {
    render(<Hero />);
    const cta = screen.getByRole("link", { name: /download cv/i });
    expect(cta).toHaveAttribute("href", "/cv.pdf");
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `bunx vitest run components/__tests__/hero.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Create `components/sections/Hero.tsx`**

```tsx
import { Container } from "@/components/ui/Container";
import { profile } from "@/content/cv";

export function Hero() {
  return (
    <section id="top" className="py-28 sm:py-36">
      <Container>
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-muted">
          {profile.location}
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
          {profile.name}
        </h1>
        <p className="mt-3 text-xl text-muted sm:text-2xl">{profile.title}</p>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-foreground sm:text-lg">
          {profile.tagline}
        </p>
        <div className="mt-10">
          <a
            href={profile.cvPdfPath}
            download
            className="inline-flex items-center rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Download CV
          </a>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `bunx vitest run components/__tests__/hero.test.tsx`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add components
git commit -m "feat: add hero section with download CV CTA"
```

---

### Task 6: About section (narrative + skills)

**Files:**
- Create: `components/sections/About.tsx`
- Test: `components/__tests__/about.test.tsx`

**Interfaces:**
- Consumes: `about`, `skills` from `@/content/cv`, `Container`, `SectionHeading`, `Tag`, `Reveal`.
- Produces: `About()` — narrative paragraphs and grouped skill tags under an `#about` anchor.

- [ ] **Step 1: Write the failing test** `components/__tests__/about.test.tsx`

```tsx
import { render, screen } from "@testing-library/react";
import { About } from "@/components/sections/About";
import { skills } from "@/content/cv";

describe("About", () => {
  it("renders the About heading", () => {
    render(<About />);
    expect(screen.getByRole("heading", { level: 2, name: /about/i })).toBeInTheDocument();
  });

  it("renders every skill category", () => {
    render(<About />);
    for (const group of skills) {
      expect(screen.getByText(group.category)).toBeInTheDocument();
    }
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `bunx vitest run components/__tests__/about.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Create `components/sections/About.tsx`**

```tsx
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/Reveal";
import { about, skills } from "@/content/cv";

export function About() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading id="about">About</SectionHeading>
          <div className="space-y-4 text-base leading-relaxed text-foreground sm:text-lg">
            {about.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-12 space-y-6">
            {skills.map((group) => (
              <div key={group.category}>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Tag key={item}>{item}</Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `bunx vitest run components/__tests__/about.test.tsx`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add components
git commit -m "feat: add about section with skills"
```

---

### Task 7: Experience timeline

**Files:**
- Create: `components/sections/Experience.tsx`
- Test: `components/__tests__/experience.test.tsx`

**Interfaces:**
- Consumes: `experience` from `@/content/cv`, `Container`, `SectionHeading`, `Reveal`.
- Produces: `Experience()` — a vertical timeline of all three roles under an `#experience` anchor.

- [ ] **Step 1: Write the failing test** `components/__tests__/experience.test.tsx`

```tsx
import { render, screen } from "@testing-library/react";
import { Experience } from "@/components/sections/Experience";
import { experience } from "@/content/cv";

describe("Experience", () => {
  it("renders the Experience heading", () => {
    render(<Experience />);
    expect(screen.getByRole("heading", { level: 2, name: /experience/i })).toBeInTheDocument();
  });

  it("renders all roles with company and period", () => {
    render(<Experience />);
    for (const role of experience) {
      expect(screen.getByText(role.company)).toBeInTheDocument();
      expect(screen.getByText(role.period)).toBeInTheDocument();
    }
  });

  it("renders the first role's bullets", () => {
    render(<Experience />);
    for (const bullet of experience[0].bullets) {
      expect(screen.getByText(bullet)).toBeInTheDocument();
    }
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `bunx vitest run components/__tests__/experience.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Create `components/sections/Experience.tsx`**

```tsx
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { experience } from "@/content/cv";

export function Experience() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeading id="experience">Experience</SectionHeading>
        <ol className="relative border-l border-border">
          {experience.map((role) => (
            <li key={`${role.company}-${role.period}`} className="mb-12 ml-6 last:mb-0">
              <span className="absolute -left-[5px] mt-2 h-2.5 w-2.5 rounded-full bg-foreground" />
              <Reveal>
                <h3 className="text-lg font-semibold">{role.title}</h3>
                <p className="text-foreground">{role.company}</p>
                <p className="mt-1 text-sm text-muted">
                  {role.period} · {role.location}
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-foreground">
                  {role.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `bunx vitest run components/__tests__/experience.test.tsx`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add components
git commit -m "feat: add experience timeline"
```

---

### Task 8: Projects section

**Files:**
- Create: `components/sections/Projects.tsx`
- Test: `components/__tests__/projects.test.tsx`

**Interfaces:**
- Consumes: `projects` from `@/content/cv`, `Container`, `SectionHeading`, `Tag`, `Reveal`.
- Produces: `Projects()` — four project cards under a `#projects` anchor.

- [ ] **Step 1: Write the failing test** `components/__tests__/projects.test.tsx`

```tsx
import { render, screen } from "@testing-library/react";
import { Projects } from "@/components/sections/Projects";
import { projects } from "@/content/cv";

describe("Projects", () => {
  it("renders the Projects heading", () => {
    render(<Projects />);
    expect(screen.getByRole("heading", { level: 2, name: /projects/i })).toBeInTheDocument();
  });

  it("renders all four project cards with client and a tag", () => {
    render(<Projects />);
    for (const project of projects) {
      expect(screen.getByRole("heading", { level: 3, name: project.name })).toBeInTheDocument();
      expect(screen.getByText(project.client)).toBeInTheDocument();
      // tags[0] ("Next.js") repeats across projects, so assert at least one match
      expect(screen.getAllByText(project.tags[0]).length).toBeGreaterThan(0);
    }
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `bunx vitest run components/__tests__/projects.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Create `components/sections/Projects.tsx`**

```tsx
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/content/cv";

export function Projects() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeading id="projects">Projects</SectionHeading>
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <Reveal key={project.name}>
              <article className="flex h-full flex-col rounded-2xl border border-border p-6">
                <h3 className="text-lg font-semibold">{project.name}</h3>
                <p className="mt-1 text-sm text-muted">{project.client}</p>
                <p className="mt-4 flex-1 text-base leading-relaxed text-foreground">
                  {project.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `bunx vitest run components/__tests__/projects.test.tsx`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add components
git commit -m "feat: add projects section"
```

---

### Task 9: Contact section

**Files:**
- Create: `components/sections/Contact.tsx`
- Test: `components/__tests__/contact.test.tsx`

**Interfaces:**
- Consumes: `contacts` from `@/content/cv`, `Container`, `SectionHeading`, `Reveal`.
- Produces: `Contact()` — labeled static links under a `#contact` anchor.

- [ ] **Step 1: Write the failing test** `components/__tests__/contact.test.tsx`

```tsx
import { render, screen } from "@testing-library/react";
import { Contact } from "@/components/sections/Contact";

describe("Contact", () => {
  it("renders the Contact heading", () => {
    render(<Contact />);
    expect(screen.getByRole("heading", { level: 2, name: /contact/i })).toBeInTheDocument();
  });

  it("renders each contact link with the correct href", () => {
    render(<Contact />);
    expect(screen.getByRole("link", { name: /email/i })).toHaveAttribute(
      "href",
      "mailto:zulkarnen706@gmail.com",
    );
    expect(screen.getByRole("link", { name: /whatsapp/i })).toHaveAttribute(
      "href",
      "https://wa.me/6285722382371",
    );
    expect(screen.getByRole("link", { name: /linkedin/i })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/zulkarnen/",
    );
    expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute(
      "href",
      "https://github.com/zulkarnen-force/",
    );
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `bunx vitest run components/__tests__/contact.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Create `components/sections/Contact.tsx`**

```tsx
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { contacts } from "@/content/cv";

export function Contact() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading id="contact">Contact</SectionHeading>
          <p className="max-w-2xl text-base leading-relaxed text-foreground sm:text-lg">
            Open to backend, full-stack, and platform roles. The quickest ways to reach me:
          </p>
          <ul className="mt-8 flex flex-wrap gap-4">
            {contacts.map((contact) => {
              const isExternal = contact.kind !== "email";
              return (
                <li key={contact.kind}>
                  <a
                    href={contact.href}
                    {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="inline-flex items-center rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-foreground hover:text-background"
                  >
                    {contact.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `bunx vitest run components/__tests__/contact.test.tsx`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add components
git commit -m "feat: add contact section"
```

---

### Task 10: Compose the page, finalize layout/SEO, add 404

**Files:**
- Modify: `app/page.tsx`, `app/layout.tsx`
- Create: `app/not-found.tsx`
- Modify: `app/__tests__/smoke.test.tsx`

**Interfaces:**
- Consumes: all section components and `Nav`/`Footer`.
- Produces: the assembled single-page site and an SEO-complete root layout.

- [ ] **Step 1: Update the smoke test** `app/__tests__/smoke.test.tsx`

```tsx
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home page", () => {
  it("renders all five sections", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1, name: /Zulkarnen/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: /experience/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: /projects/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: /contact/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `bunx vitest run app`
Expected: FAIL — `Home` renders an empty `<main />`.

- [ ] **Step 3: Update `app/page.tsx`** to compose the page

```tsx
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `bunx vitest run app`
Expected: PASS.

- [ ] **Step 5: Finalize `app/layout.tsx`** with full SEO/OG metadata

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://zulkarnen.dev"),
  title: "Zulkarnen — Software Engineer",
  description:
    "Full-stack software engineer with 3+ years building end-to-end web and mobile platforms. Go, Node.js, Laravel, Next.js, and a strong DevOps foundation.",
  keywords: [
    "Zulkarnen",
    "Software Engineer",
    "Full-stack Engineer",
    "Backend Engineer",
    "Next.js",
    "Go",
    "Node.js",
    "Laravel",
  ],
  openGraph: {
    title: "Zulkarnen — Software Engineer",
    description:
      "Full-stack software engineer with 3+ years building end-to-end web and mobile platforms.",
    type: "website",
    locale: "en_US",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

> Note: adjust the `metadataBase` URL if the production domain differs.

- [ ] **Step 6: Create `app/not-found.tsx`**

```tsx
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center">
      <Container className="text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-muted">404</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">Page not found</h1>
        <p className="mt-4 text-muted">The page you&apos;re looking for doesn&apos;t exist.</p>
        <a
          href="/"
          className="mt-8 inline-flex items-center rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          Back home
        </a>
      </Container>
    </main>
  );
}
```

- [ ] **Step 7: Add a placeholder CV asset so the download link resolves**

Run:
```bash
mkdir -p public
printf '%%PDF-1.4\n%%%%EOF\n' > public/cv.pdf
```
> This is a placeholder. Replace `public/cv.pdf` with the real resume before deploying.

- [ ] **Step 8: Run the full test suite**

Run: `bun run test`
Expected: PASS (all tests across every file).

- [ ] **Step 9: Verify a production build succeeds**

Run: `bun run build`
Expected: build succeeds; `/` is statically rendered; `.next/standalone` produced.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: compose page, finalize SEO layout, add 404 and CV placeholder"
```

---

### Task 11: Dockerize (multi-stage build + dev/prod compose) and README

**Files:**
- Create: `Dockerfile`, `.dockerignore`, `docker-compose.yml`, `docker-compose.dev.yml`, `docker-compose.prod.yml`, `README.md`

**Interfaces:**
- Produces: a runnable dev container (hot reload) and a production container (standalone server).

- [ ] **Step 1: Create `.dockerignore`**

```dockerignore
node_modules
.next
out
build
.git
.gitignore
Dockerfile
docker-compose*.yml
.dockerignore
*.md
.env*
.DS_Store
coverage
```

- [ ] **Step 2: Create `Dockerfile`** (multi-stage, Bun, standalone runtime)

```dockerfile
# syntax=docker/dockerfile:1

# --- deps: install dependencies ---
FROM oven/bun:1 AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# --- build: compile the Next.js app ---
FROM oven/bun:1 AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN bun run build

# --- runtime: minimal standalone server ---
FROM oven/bun:1 AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Run as the non-root user provided by the oven/bun image
COPY --from=build --chown=bun:bun /app/.next/standalone ./
COPY --from=build --chown=bun:bun /app/.next/static ./.next/static
COPY --from=build --chown=bun:bun /app/public ./public

USER bun
EXPOSE 3000
CMD ["bun", "server.js"]
```

- [ ] **Step 3: Create `docker-compose.yml`** (base)

```yaml
services:
  web:
    build:
      context: .
    image: zulkarnen-cv
    ports:
      - "3000:3000"
```

- [ ] **Step 4: Create `docker-compose.dev.yml`** (hot reload override)

```yaml
services:
  web:
    build:
      context: .
      target: deps
    command: sh -c "bun install && bun run dev"
    environment:
      - NODE_ENV=development
      - NEXT_TELEMETRY_DISABLED=1
    volumes:
      - .:/app
      - /app/node_modules
      - /app/.next
    ports:
      - "3000:3000"
```

- [ ] **Step 5: Create `docker-compose.prod.yml`** (production override)

```yaml
services:
  web:
    build:
      context: .
      target: runtime
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    ports:
      - "3000:3000"
```

- [ ] **Step 6: Create `README.md`**

````markdown
# Zulkarnen — CV Website

Minimalist single-page CV/portfolio. Next.js 16 (App Router) + Bun + Tailwind CSS, static-rendered.

## Local development (Bun)

```bash
bun install
bun run dev      # http://localhost:3000
bun run test     # Vitest
bun run build    # production build
```

## Docker

**Development (hot reload):**

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml up
```

**Production (standalone server):**

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build
```

Both serve on http://localhost:3000.

## Content

All CV content lives in `content/cv.ts` — edit there. Replace `public/cv.pdf` with the
real resume; the Hero "Download CV" button links to it.

## Project layout

- `app/` — App Router entry (layout, page, 404)
- `components/sections/` — Hero, About, Experience, Projects, Contact
- `components/ui/` — shared primitives (Container, SectionHeading, Tag, Nav, Footer)
- `components/Reveal.tsx` — scroll-reveal wrapper
- `content/cv.ts` — single source of truth for all content
````

- [ ] **Step 7: Verify the production image builds and runs**

Run:
```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d
```
Then check it responds:
```bash
curl -sSf http://localhost:3000 | grep -q "Zulkarnen" && echo "OK"
```
Expected: `OK`. Then tear down: `docker compose -f docker-compose.yml -f docker-compose.prod.yml down`.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: add Docker multi-stage build and dev/prod compose"
```

---

## Self-Review

**Spec coverage:**
- Architecture (single-page SSG, typed content, presentational components) → Tasks 1, 2, 10. ✓
- Tech stack (Next 16, Bun, Tailwind, standalone) → Task 1. ✓
- Content model & all sections (Hero/About/Experience/Projects/Contact + Nav/Footer) → Tasks 2, 4–9. ✓
- Fullstack-led positioning, `[TAG]` stripping → Task 2 (data + test guard). ✓
- Hero CTA = Download CV → `/cv.pdf` → Task 5 (+ placeholder asset Task 10). ✓
- Static contact links with correct hrefs → Task 9. ✓
- Subtle scroll reveals → Task 3 (`Reveal`), used in Tasks 6–9. ✓
- Light-only white/black theme → Task 1 (`globals.css` tokens). ✓
- Docker multi-stage + dev/prod compose, README → Task 11. ✓
- Light testing (Vitest + RTL only, no Playwright) → every component task. ✓
- Error handling: 404, accessibility (semantic landmarks, focus, contrast), SEO/OG → Tasks 10. ✓

**Placeholder scan:** No "TBD"/"TODO"/"handle edge cases" steps; all code blocks are complete. The `public/cv.pdf` placeholder is explicitly flagged as user-replaceable, not a plan gap.

**Type consistency:** Content interface names and fields (`profile`, `about`, `skills`/`SkillGroup.category`/`items`, `experience`/`ExperienceItem` fields, `projects`/`Project` fields, `contacts`/`ContactLink.href`/`kind`) are defined in Task 2 and used verbatim in Tasks 4–10. Component export names (`Container`, `SectionHeading`, `Tag`, `Reveal`, `Nav`, `Footer`, `Hero`, `About`, `Experience`, `Projects`, `Contact`) are consistent across definition and import sites.
