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

## SEO

- `app/layout.tsx` — page metadata, OpenGraph/Twitter tags, and `Person` JSON-LD
  structured data. The domain is set via `SITE_URL` there and in
  `app/robots.ts` / `app/sitemap.ts`.
- `app/robots.ts` → emits `/robots.txt`; `app/sitemap.ts` → emits `/sitemap.xml`
  (generated as static files at build time).
- `public/og-image.png` — 1200×630 social share image.

After deploying, verify ownership in [Google Search Console](https://search.google.com/search-console)
and submit `https://zulkarnen.web.id/sitemap.xml` under **Sitemaps**.

## Project layout

- `app/` — App Router entry (layout, page, 404)
- `components/sections/` — Hero, About, Experience, Projects, Contact
- `components/ui/` — shared primitives (Container, SectionHeading, Tag, Nav, Footer)
- `components/Reveal.tsx` — scroll-reveal wrapper
- `content/cv.ts` — single source of truth for all content
