---
name: Static-only site (independent of Replit)
description: This wedding site is intentionally backend-free so it can be hosted on free static hosting and survive without a Replit subscription.
---

# Static-only constraint

The owner wants the site to keep working even if the Replit subscription ends. The frontend must stay **fully static** — deployable to Cloudflare Pages / Netlify / GitHub Pages from `vite build` output (`dist/public`).

**Rule:** Do NOT reintroduce any `/api/*` calls or database dependencies into `client/src`. RSVP was removed entirely (no DB). Honeymoon contributions are IBAN display only.

**Why:** Independence from Replit hosting; no recurring cost.

**How to apply:**
- Language/country detection runs client-side via `https://ipapi.co/json/` in `useLanguage.tsx` (browser-language fallback). No server `/api/geo`.
- Honeymoon section/nav hidden when country is FR/MA or language is `fr` — keep this condition consistent across Home, Header, Footer.
- The Express server + Postgres still exist only for local dev preview; they are NOT part of the deployed artifact.
