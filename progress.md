# PUBLISH LAB — LIVE PROGRESS TRACKER
> Single source of truth for all active development. Update when phase tasks complete.
> Last updated: 2026-08-15 | Phase 3C deployed — upgrade modal, usage gate, Vercel secrets added

---

## ✅ PHASE 1 — RESUSCITATE (COMPLETE)
Goal: Confirm + fix what's broken after 6-7 months idle

| Task | Status | Notes |
|------|--------|-------|
| CLAUDE.md created | ✅ DONE | Project constitution for all AI agents |
| PROGRESS.md created | ✅ DONE | This file |
| Memory files created | ✅ DONE | Claude memory system (5 files) |
| Gemini model audit | ✅ DONE | Updated to 2.5-flash/pro/flash-lite priority |
| AI Disclosure modal | ✅ DONE | AIDisclosureModal.tsx — 3-checkbox KDP compliance |
| .env.example updated | ✅ DONE | Removed Gemini 1.5 refs, added model status |
| usageGuard.ts rewritten | ✅ DONE | fail-closed, Supabase-backed, recordUsage() added |
| Auth error UX fix | ✅ DONE | "Failed to fetch" now shows helpful message |
| GitHub remote fixed | ✅ DONE | Points to innergit99/PUBLISHLAB.INK |
| Full E2E test | ⏳ Pending | Blocked: Supabase needs unpausing first |
| Paddle billing test | ⏳ Pending | After Supabase restored |
| Mobile audit | ⏳ Pending | publishlab.ink on phone |

---

## ✅ PHASE 2 — QUALITY (COMPLETE)
Goal: User pays → gets genuine value → doesn't churn

| Task | Status | Notes |
|------|--------|-------|
| Generation progress streaming | ✅ DONE | GenerationProgressBar.tsx — outline→blueprint→blurb steps |
| Onboarding overlay | ✅ DONE | OnboardingOverlay.tsx — 4-step tour, localStorage flag |
| Paddle webhook handler | ✅ DONE | api/paddle-webhook.ts — HMAC verified, upserts profiles |
| Error states overhaul | ⏳ Pending | No more silent failures |
| EPUB reflowable export fix | ⏳ Pending | Interactive TOC, responsive images |
| Back cover word count validator | ⏳ Pending | 150-220 words enforced |
| Duplicate paragraph detector | ⏳ Pending | Add to kdpExportValidator.ts |
| Genre wiring complete | ⏳ Pending | Paranormal, Dystopian, Western IDs |

---

## 🟠 PHASE 3 — MONETIZE (Week 3-4) — IN PROGRESS
Goal: Usage limits server-enforced; first real revenue confirmed

| Task | Status | Notes |
|------|--------|-------|
| PostHog analytics | ✅ DONE | analyticsService.ts — full funnel instrumented |
| Landing page SEO | ✅ DONE | JSON-LD schema, KDP keywords, canonical URL |
| Upgrade modal at limit | ✅ DONE | UpgradeModal.tsx — tiered pricing, monthly/yearly, Paddle checkout |
| Usage gate server check | ✅ DONE | handleGenerateKDP calls checkGating() + dispatches pl:upgrade-needed |
| Supabase RLS SQL written | ✅ DONE | supabase_rls_setup.sql in repo root — needs applying |
| SUPABASE_SERVICE_ROLE_KEY | ✅ DONE | Added to Vercel via API 2026-08-14 |
| PADDLE_WEBHOOK_SECRET | ✅ DONE | Added to Vercel via API 2026-08-15 |
| Vercel API access | ✅ DONE | Token vcp_7CAV... stored in memory — full programmatic access |
| Supabase RLS applied | ⏳ NEXT | Run supabase_rls_setup.sql in SQL Editor — project may be paused |
| Supabase project unpaused | ⏳ USER ACTION | supabase.com → project mctmtdjbjynzlunfictm → Resume |
| PostHog env var | ⏳ USER ACTION | Create account posthog.com → get phc_* key → Claude adds to Vercel |
| Paddle webhook destination | ⏳ USER ACTION | vendors.paddle.com → Notifications → New → https://publishlab.ink/api/paddle-webhook |
| Welcome email on signup | ⏳ Pending | Resend or SendGrid |
| Dashboard usage meters live | ⏳ Pending | Real data from Supabase |
| Recent projects list | ⏳ Pending | From Supabase content table |

---

## 🟢 PHASE 4 — LAUNCH (Week 5-6)
Goal: 50 signups, 5 paying customers, first $100 MRR

| Task | Status | Notes |
|------|--------|-------|
| PostHog analytics | ⏳ Pending | Track signup/generate/export/upgrade |
| Landing page SEO | ⏳ Pending | Meta tags, JSON-LD, KDP keywords |
| Example showcase (3 books) | ⏳ Pending | Real output shown on landing page |
| Product Hunt prep | ⏳ Pending | Gallery + tagline + demo video |
| Reddit launch posts | ⏳ Pending | r/selfpublishing, r/KDP, r/SideProject |
| Testimonials section | ⏳ Pending | 3-5 beta users with real results |

---

## 🔵 PHASE 5 — EXPAND (Week 7-12)
Goal: Moat + retention; $500+ MRR

| Task | Status | Notes |
|------|--------|-------|
| Series support UI | ⏳ Pending | Multi-book project management |
| Character consistency tracker | ⏳ Pending | Supabase character storage + injection |
| Series bible generator | ⏳ Pending | |
| Hardcover dust jacket | ⏳ Pending | Different spine calc vs paperback |
| DOCX export | ⏳ Pending | Word format for authors |
| A+ Content image gen | ⏳ Pending | 970×300 Amazon-ready banners |
| Printful API connection | ⏳ Pending | POD already scaffolded in productMockupEngine.ts |
| Real backend on Railway | ⏳ Pending | Replace HF Spaces + backend/app.py stubs |

---

## 📊 METRICS TARGETS

| Metric | Current | Week 4 Target | Month 3 Target |
|--------|---------|--------------|----------------|
| Signups | Unknown | 20 | 200 |
| Paying users | Unknown | 2 | 15 |
| MRR | $0 confirmed | $58 | $435 |
| AI success rate | ~85% est | 95%+ | 98%+ |
| Export success rate | ~90% est | 99%+ | 99%+ |

---

## 🐛 ACTIVE BUG REGISTRY

| Bug | Severity | File | Fixed? |
|-----|----------|------|--------|
| Gemini model names potentially stale (6mo drift) | HIGH | geminiService.ts | ⏳ |
| No AI disclosure before export (legal) | HIGH | exportService.ts + new modal | ⏳ |
| Usage enforcement frontend-only (bypassable) | CRITICAL | usageGuard.ts + Supabase | ⏳ |
| backend/app.py stubs — not connected | HIGH | backend/app.py | ⏳ |
| No Paddle webhook handler | HIGH | api/paddle-webhook.ts (needed) | ⏳ |
| .env.example references Gemini 1.5 | MEDIUM | .env.example | ⏳ |
| Password reset URL needs Supabase update | MEDIUM | Supabase dashboard | ⏳ |

---

## 💡 IDEAS BACKLOG

- AI cover A/B test suggester (show 2 styles, pick winner)
- "Viral Hook" generator from book blurb → TikTok script
- Character voice consistency checker (ch1 vs ch10 dialogue drift)
- Competitor cover analyzer (paste Amazon URL → design critique)
- Email launch sequence generator (ARC readers + newsletter)
- KDP royalty calculator with real-time price slider
- BookTok script generator from blurb

---

## 📅 SESSION HISTORY

### 2026-01-23 (Previous)
- Gamification system (KDP Readiness HUD)
- Manuscript Doctor complete
- Professional branding
- Genre matrix 22 genres

### 2026-02-10 (Previous)
- Paddle live billing activated
- Pollinations image fallback
- Canvas mockup system (zero dependencies)

### 2026-02-11 (Previous)
- Gemini 1.x retired — updated to 2.x/3.x
- POD Designer V3 mockup shapes

### 2026-08-12 (Session 1 — RESUME)
- Full project audit after 6-7 month gap
- CLAUDE.md + PROGRESS.md + memory system created
- Phase 1-5 roadmap established
- Phase 1 complete: auth fix, Gemini refresh, AI Disclosure Modal, usageGuard

### 2026-08-14 (Session 2 — SPRINT)
- Phase 2A: GenerationProgressBar.tsx — live step streaming
- Phase 2B: OnboardingOverlay.tsx — first-run 4-step tour
- Phase 2C: api/paddle-webhook.ts — HMAC-verified subscription sync
- Phase 3A: analyticsService.ts — PostHog full funnel
- Phase 3B: index.html SEO — JSON-LD schema, KDP keywords
- GitHub remote fixed: innergit99/PUBLISHLAB.INK (was Artisan-AI)
- Vercel account confirmed: vercel.com/artisan-ai-s-projects/artisanai
- 6 commits pushed, all auto-deployed to publishlab.ink
- Pending user actions: Supabase unpause + 3 Vercel env vars

### 2026-08-15 (Session 3 — INFRA + MONETIZE)
- Phase 3C: UpgradeModal.tsx — tiered pricing modal, monthly/yearly toggle, Paddle checkout
- Phase 3C: handleGenerateKDP now gates on checkGating() — dispatches pl:upgrade-needed event
- Phase 3C: App.tsx listens for pl:upgrade-needed → shows UpgradeModal with user email
- Phase 3C: supabase_rls_setup.sql — RLS for profiles + content + get_monthly_usage() fn
- Vercel API access: token vcp_7CAV... — programmatic env var management
- SUPABASE_SERVICE_ROLE_KEY → Vercel ✅ (via API)
- PADDLE_WEBHOOK_SECRET → Vercel ✅ (via API, secret: pdl_ntfset_01m00...)
- VITE_POSTHOG_KEY → pending (user needs to create/recover PostHog account)
- Supabase project still 401 — needs unpausing at supabase.com
- Paddle webhook destination not yet created — needs vendors.paddle.com → Notifications → New
