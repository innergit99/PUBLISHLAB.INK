# PUBLISH LAB — CLAUDE.md (Project Constitution)
> AI Agent Startup Protocol. Read this FIRST before touching any file.
> Last updated: 2026-08-12 | Status: 🟢 LIVE at publishlab.ink | Version: v5.1.x

---

## 🧭 WHAT THIS PROJECT IS

**Publish Lab** is a KDP (Kindle Direct Publishing) automation SaaS.
Users input a genre + topic → AI generates a full manuscript, professional cover,
marketing copy, and export-ready PDF — in minutes.

**Live URL:** https://www.publishlab.ink
**Repo root:** `e:\ARTISAN AI\`
**Frontend:** Vercel (auto-deploys on git push to main)
**Auth/DB:** Supabase (project ID: `mctmtdjbjynzlunfictm`)
**Payments:** Paddle (production, Seller ID: 281327)
**Backend:** FastAPI stub at `backend/app.py` (NOT connected to frontend — stubs only)

---

## 🔑 ARCHITECTURE IN ONE GLANCE

```
LandingPage.tsx
    └── AuthModal.tsx (Supabase auth gate)
         └── App.tsx (routes to studio)
              ├── Dashboard.tsx (entry hub)
              ├── ToolView.tsx (277KB — monster file, all KDP tool UIs)
              ├── components/tools/ToolRouter.tsx (routes by ToolType enum)
              ├── geminiService.ts (AI ORCHESTRATOR — NOT just Gemini)
              │    ├── Gemini 2.0/2.5/3.x (primary text)
              │    ├── Groq Llama-3.3-70b (fallback text)
              │    ├── HuggingFace Spaces (backup text)
              │    ├── Pollinations (image primary)
              │    └── Canvas HTML5 (image final fallback)
              ├── exportService.ts (PDF generation — jsPDF)
              ├── kdpExportValidator.ts (25+ blocker patterns)
              ├── coverGenerator.ts (89KB — cover art engine)
              ├── paddleIntegration.ts (Paddle Billing v2)
              ├── usageGuard.ts (tier enforcement — FRONTEND ONLY, needs Supabase)
              └── storageService.ts (IndexedDB local + Supabase sync)
```

---

## 📦 KEY FILES — WHAT EACH DOES

| File | Role | Caution |
|------|------|---------|
| `geminiService.ts` | Central AI orchestrator for ALL providers | 160KB — read by offset only |
| `ToolView.tsx` | ALL KDP tool UIs in one component | 277KB — read by offset only |
| `coverGenerator.ts` | Cover art engine + canvas rendering | 89KB |
| `exportService.ts` | PDF export via jsPDF | Has KDP compliance logic |
| `kdpExportValidator.ts` | Blocks export if placeholder content detected | 25+ patterns |
| `usageGuard.ts` | Usage tier enforcement | FRONTEND ONLY — not server-enforced |
| `paddleIntegration.ts` | Paddle Billing v2 live integration | Production seller |
| `constants.tsx` | All UI constants, genre presets, tool configs | 35KB |
| `types.ts` | All TypeScript interfaces and enums | Source of truth |

---

## 🤖 AI PROVIDER STATUS (Aug 2026)

| Provider | Status | Use For |
|----------|--------|---------|
| `gemini-2.0-flash` | ✅ Primary | Fast text generation |
| `gemini-2.5-flash` | ✅ Working | Quality text generation |
| `gemini-2.5-flash-lite` | ✅ Working | Cost-efficient |
| `gemini-3-flash-preview` | ⚠️ Verify | May have been renamed |
| `gemini-3-pro-preview` | ⚠️ Verify | May have been renamed |
| Gemini 1.x / 1.5 | ❌ RETIRED | Returns 404 — do not use |
| Groq `llama-3.3-70b-versatile` | ✅ Fallback | High quality text |
| HuggingFace Spaces | ⚠️ Slow | Last resort text |
| Pollinations | ⚠️ Rate-limited | Image primary |
| Canvas HTML5 | ✅ Always works | Image final fallback |

**Model verification command (run in Settings panel):** `gemini.runDiagnostics()`

---

## 💰 BUSINESS TIERS

| Tier | Price | Limits |
|------|-------|--------|
| Novice (Free) | $0 | 1 manuscript/mo, 5 images/mo |
| Solo | Paid | See Paddle price IDs in paddleIntegration.ts |
| Artisan | Paid | Mid tier |
| Master | Paid | Unlimited |

⚠️ **CRITICAL:** Usage limits are enforced FRONTEND-ONLY via `usageGuard.ts`.
Supabase RLS is NOT set up. This means paying vs free tiers are trivially bypassable.
**Fix this before any serious marketing push.**

---

## 🏗️ GENRE ENGINE

`KDP_GENRE_SPECS` in `geminiService.ts` (line ~19) defines all 22+ genres.
`resolveGenreSpec()` maps frontend genre IDs → spec keys.
`GENRE_ENGINES` defines structural flow + logic engines per genre.

**Genres already in spec:** ROMANCE, MYSTERY, THRILLER, FANTASY, SCI-FI, HORROR,
YA, COZY, HISTORICAL, BIOGRAPHY, BUSINESS, SELF-HELP, CHILDREN, COMIC, MANGA,
JOURNAL, PLANNER, KIDS_COLORING, ADULT_COLORING

**Genre IDs missing from `resolveGenreSpec` mapping** (exist in spec, not wired):
- `dark-romance` → maps to ROMANCE (done)
- `paranormal-romance` → needs mapping
- `dystopian` → needs mapping
- `western` → needs mapping

---

## ⚡ DEVELOPMENT COMMANDS

```powershell
# Dev server
npm run dev

# Production build
npm run build

# Preview build
npm run preview

# Deploy (auto via Vercel on git push to main)
git push origin main
```

---

## 🚦 QUALITY GATES (never skip these)

1. **Before ANY export:** `kdpExportValidator.ts` must pass — no placeholders
2. **Before ANY chapter goes to PDF:** `cleanChapterContent()` must run
3. **Before ANY AI call:** `usageGuard.checkUsage()` must gate the action
4. **Before ANY image save:** validate it's not the <5KB Pollinations rate-limit placeholder
5. **AI Disclosure:** Show modal before every PDF export (KDP legal requirement)

---

## 🔴 KNOWN CRITICAL GAPS (as of 2026-08-12)

| Gap | Risk | File to Fix |
|-----|------|-------------|
| Usage enforcement frontend-only | Revenue leak | `usageGuard.ts` + Supabase |
| No AI disclosure modal on export | Legal/KDP rejection | `exportService.ts` + new component |
| Gemini model names may be stale | Generation failures | `geminiService.ts` top section |
| Backend `app.py` is stubs | Can't scale text gen | `backend/app.py` + Railway deploy |
| No Paddle webhook handler | Subscription sync breaks | Need `/api/paddle-webhook` |
| No analytics | Blind to conversion funnel | Add PostHog |
| No email on signup/billing | Poor activation | Add Resend |
| EPUB export incomplete | Kindle authors blocked | `exportService.ts` |

---

## 📋 CODING LAWS (enforce without exception)

1. **Karpathy Rule:** Touch only what you must. No opportunistic refactoring.
2. **No placeholder returns** — `geminiService.ts` throws errors, never returns fake text
3. **No `console.log` in production** — use `console.error` only for real errors
4. **No `any` types** — use `unknown` and narrow
5. **Immutable state** — spread, never mutate
6. **ToolView.tsx is 277KB** — always read with `offset` + `limit`, never full read
7. **geminiService.ts is 160KB** — same rule

---

## ⚡ SKILL-FIRST PROTOCOL (check BEFORE writing new code)

> You have 172 Antigravity skills + 60 Claude skills. Use them. Building from scratch = token waste.

| Task | Use Skill | Location |
|------|-----------|----------|
| Supabase RLS / SQL | `SupabaseArchitect` | `C:\Users\gauvi\.gemini\config\skills\SupabaseArchitect\` |
| React + Tailwind new UI | `Stitch` | `C:\Users\gauvi\.gemini\config\skills\Stitch\` |
| Bundle performance (1.88MB!) | `PerformanceTuner` | `C:\Users\gauvi\.gemini\config\skills\PerformanceTuner\` |
| Conversion / pricing page | `CROAgent` | `C:\Users\gauvi\.gemini\config\skills\CROAgent\` |
| Launch checklist | `shipping-and-launch` | `C:\Users\gauvi\.gemini\config\skills\shipping-and-launch\` |
| SEO / meta tags | `SEOArchitect` | `C:\Users\gauvi\.gemini\config\skills\SEOArchitect\` |
| Code review | `SeniorReviewer` | `C:\Users\gauvi\.gemini\config\skills\SeniorReviewer\` |
| Security audit | `SecurityOfficer` | `C:\Users\gauvi\.gemini\config\skills\SecurityOfficer\` |
| Paddle / billing API | `CommerceProtocol` | `C:\Users\gauvi\.gemini\config\skills\CommerceProtocol\` |
| 3+ parallel streams | `SwarmOrchestrator` | `C:\Users\gauvi\.gemini\config\skills\SwarmOrchestrator\` |
| Token running low | `TokenGuard` | `C:\Users\gauvi\.claude\skills\TokenGuard\` |
| Past session decisions | `HermesBridge` | `C:\Users\gauvi\.gemini\config\skills\HermesBridge\` |
| Codebase map | `/graphify` skill | `C:\Users\gauvi\.claude\skills\graphify\` |

Full router: `C:\Users\gauvi\.gemini\config\skills\SKILL_ROUTER.md`

---

## 🗺️ PHASE ROADMAP (see PROGRESS.md for live status)

| Phase | Goal | ETA |
|-------|------|-----|
| **P1: Resuscitate** | Fix AI models, disclosure modal, env drift | Week 1 |
| **P2: Quality** | Progress streaming, onboarding, EPUB fix | Week 2-3 |
| **P3: Monetize** | Supabase RLS, Paddle webhooks, email | Week 3-4 |
| **P4: Launch** | PostHog, SEO, ProductHunt, Reddit | Week 5-6 |
| **P5: Expand** | Series support, POD connection, hardcover | Week 7-12 |

---

## 🧠 MEMORY SYSTEM

Project memory lives at: `C:\Users\gauvi\.claude\projects\e--ARTISAN-AI\memory\`
Session memory: `PROGRESS.md` (this repo root)
Living journal: `Master Memory.md` (this repo root)

**Always update `PROGRESS.md` when a phase task completes.**
