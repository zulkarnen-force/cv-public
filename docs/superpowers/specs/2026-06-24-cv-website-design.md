# CV Website — Zulkarnen ("Software Engineer") — Design Spec

**Date:** 2026-06-24
**Status:** Approved design, ready for implementation planning

## 1. Goal

A minimalist personal CV/portfolio website branded as **"Software Engineer"**, built with
Next.js 16 (App Router) and Bun, containerized for dev and production with Docker Compose.
Content is derived from the master CV (`/srv/obsidian/personal-notes/Brainstorming CV
Zulkarnen.md`), positioned with a **Fullstack-led blend**: lead as a software/fullstack
engineer who owns features end-to-end, with backend depth and DevOps as a strong supporting
strength.

## 2. Decisions (locked)

| Topic | Decision |
|---|---|
| Positioning | Fullstack-led blend (base = Fullstack summary); backend depth + DevOps supporting |
| Architecture | Single-page SSG; typed content module; presentational components |
| Contact | Static links only (email, WhatsApp, LinkedIn, GitHub). No form, no backend, no API routes |
| Hero CTA | Single primary button: **Download CV (PDF)** → `/cv.pdf` |
| Projects | 4 cards: LPP Agro Marketplace, Heaven Marketplace, SITAMA, KTA Muhammadiyah (flagship) |
| Motion | Subtle scroll reveals (IntersectionObserver), smooth anchor scroll, gentle hover states |
| Theme | Light only — white primary, black secondary |
| Styling | Tailwind CSS with white/black design tokens |
| Testing | Light: Vitest + React Testing Library only (content wiring). No Playwright |
| Setup | Manual, file-by-file (not `create-next-app` / scaffold-via-docker) |
| `[TAG]` markers | Stripped from all rendered content |

## 3. Tech Stack

- **Framework:** Next.js 16 (App Router), React, TypeScript (strict mode)
- **Runtime / package manager:** Bun
- **Styling:** Tailwind CSS; white/black palette via CSS custom properties
- **Rendering:** Static-first (SSG); `output: 'standalone'` for a small prod image
- **Motion:** Custom `Reveal` component (IntersectionObserver) — no animation library
- **Tooling:** ESLint (Next config), Prettier
- **Containerization:** Docker multi-stage build + Docker Compose (dev/prod overrides)
- **Design system:** Apply `ui-ux-pro-max` skill during implementation to lock the minimalist
  style (palette, typography, spacing, UX/accessibility guidelines)

## 4. Project Structure

```
zulkarnen-cv/
├── app/
│   ├── layout.tsx          # root layout, fonts, metadata/SEO, <html lang="en">
│   ├── page.tsx            # single page composing all sections
│   ├── not-found.tsx       # minimal 404
│   └── globals.css         # Tailwind + base tokens (white/black)
├── components/
│   ├── sections/           # Hero, About, Experience, Projects, Contact
│   ├── ui/                 # Button, SectionHeading, Timeline, ProjectCard, SkillGroup, Nav, Footer
│   └── Reveal.tsx          # scroll-reveal wrapper (IntersectionObserver)
├── content/
│   └── cv.ts               # single typed source of truth (data + TS interfaces)
├── lib/                    # tiny helpers if needed
├── public/
│   ├── cv.pdf              # resume download (user-provided asset)
│   ├── og-image.*          # Open Graph image
│   └── favicon.*
├── Dockerfile              # multi-stage: deps → build → runtime (Bun)
├── docker-compose.yml      # base service definition
├── docker-compose.dev.yml  # dev override (hot reload, bind mount)
├── docker-compose.prod.yml # prod override (standalone server)
├── .dockerignore
├── .gitignore
├── .env.example
├── next.config.ts          # output: 'standalone'
├── tsconfig.json
├── tailwind.config.ts
├── package.json / bun.lockb
└── README.md
```

**Content/presentation split:** `content/cv.ts` holds all text and data as typed objects;
components are pure presentation that map over it. Single place to edit, type-safe.

## 5. Content Model (`content/cv.ts`)

Typed objects with explicit TS interfaces:

- `profile` — name (Zulkarnen), title ("Software Engineer"), tagline (from Fullstack
  summary), location (Yogyakarta, Indonesia), cvPdfPath (`/cv.pdf`).
- `skills[]` — grouped categories from the Skills table: Languages, Backend & APIs, Frontend,
  Testing & QA, Databases & Caching, Messaging & Storage, DevOps & Infra, Observability,
  Cloud / Hosting, Concepts. Frontend surfaced prominently (fullstack lead); DevOps present
  but not leading. `[TAG]` markers stripped.
- `experience[]` — three roles (reverse-chronological): each with title, company, dates,
  location, and bullets. Bullets lead with fullstack/backend impact; one or two DevOps
  highlights kept as supporting (80% deploy cut, 99.95% uptime).
- `projects[]` — four cards: name, context/client, one-line description, tech tags.
- `contactLinks[]` — label, href, type (email/whatsapp/linkedin/github).

All facts drawn strictly from the master CV — no invented metrics, dates, tech, or links.

## 6. Sections

1. **Hero** — Name "Zulkarnen", headline "Software Engineer", sub-line from the Fullstack
   summary (end-to-end web & mobile; 12+ production apps; 45,687-member platform), location
   line. Single primary CTA: **Download CV** → `/cv.pdf`. Generous whitespace.
2. **About** — short narrative from the Fullstack summary (owns features DB→UI; backend depth
   in Go/Node/Laravel; DevOps as supporting strength). Skills rendered as grouped tag lists.
3. **Experience** — vertical timeline, three roles reverse-chronological (Muhammadiyah
   Software Labs Aug 2023–Present; Sunhouse Digital Jun 2022–Jun 2023; Binokular Media Utama
   intern Mar–Jul 2022). Each node: title, company, dates, location, selected bullets.
4. **Projects** — four text-only cards (LPP Agro Marketplace, Heaven Marketplace, SITAMA, KTA
   Muhammadiyah). No external links (none in source beyond client names).
5. **Contact** — static labeled links/buttons: email (`mailto:zulkarnen706@gmail.com`),
   WhatsApp (`wa.me/6285722382371`), LinkedIn, GitHub.
6. **Nav & footer** — sticky minimal top nav with anchor links (About · Experience · Projects
   · Contact) + smooth scroll; footer with name + current year.

## 7. Docker & Environments

**Multi-stage `Dockerfile` (Bun-based):**
- `deps` — `oven/bun` base; `bun install` from `package.json` + `bun.lockb`.
- `build` — copy source; `bun run build` (Next.js standalone output).
- `runtime` — minimal image; runs the standalone server as a non-root user; `EXPOSE 3000`.

**Compose (base + overrides):**
- `docker-compose.yml` — shared service definition.
- `docker-compose.dev.yml` — bind-mounts source; `bun run dev`; hot reload; port 3000.
- `docker-compose.prod.yml` — builds production target; runs standalone server;
  `NODE_ENV=production`.
- Usage (documented in README):
  - Dev: `docker compose -f docker-compose.yml -f docker-compose.dev.yml up`
  - Prod: `docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build`

## 8. Testing (light)

- **Vitest + React Testing Library** only. Focused tests covering content wiring:
  - Hero CTA `href` resolves to `/cv.pdf`.
  - Contact links have correct `href`s (mailto, wa.me, LinkedIn, GitHub).
  - Each section renders its content from `cv.ts` (e.g., all three experience roles, all four
    project cards present).
- No Playwright / E2E.

## 9. Error Handling & Robustness

- `app/not-found.tsx` — minimal 404.
- Type-safety: required fields on content interfaces; build fails on malformed content rather
  than rendering broken UI.
- **Accessibility:** semantic landmarks, alt text, visible focus states, keyboard-navigable
  nav, strong contrast (black-on-white). Aligns with `ui-ux-pro-max` UX guidelines.
- **SEO:** metadata, Open Graph tags, `lang="en"`, sensible title/description in `layout.tsx`.

## 10. Assets the user provides

- `public/cv.pdf` — the actual resume PDF (button wired to it regardless; placeholder until
  supplied).
- Optionally an OG image / favicon (sensible defaults otherwise).

## 11. Out of Scope (YAGNI)

- Contact form / email backend / API routes.
- Dark mode.
- CMS / MDX content layer.
- Multi-route pages.
- Animation libraries, parallax, animated counters.
- PDF generation (resume is a static, user-provided file).
