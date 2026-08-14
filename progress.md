# PUBLISH LAB — LIVE PROGRESS TRACKER
> Single source of truth for all active development. Update when phase tasks complete.
> Last updated: 2026-08-12 | Resumed after 6-7 month gap

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

## 🟡 PHASE 2 — QUALITY (Week 2-3)
Goal: User pays → gets genuine value → doesn't churn

| Task | Status | Notes |
|------|--------|-------|
| Generation progress streaming | 🔄 IN PROGRESS | Show "1/3 Creating outline..." |
| Onboarding overlay | ⏳ Pending | 3-step guide for first-time users |
| Error states overhaul | ⏳ Pending | No more silent failures |
| EPUB reflowable export fix | ⏳ Pending | Interactive TOC, responsive images |
| Back cover word count validator | ⏳ Pending | 150-220 words enforced |
| Duplicate paragraph detector | ⏳ Pending | Add to kdpExportValidator.ts |
| Genre wiring complete | ⏳ Pending | Paranormal, Dystopian, Western IDs |

---

## 🟠 PHASE 3 — MONETIZE (Week 3-4)
Goal: Usage limits server-enforced; first real revenue confirmed

| Task | Status | Notes |
|------|--------|-------|
| Supabase RLS for usage table | ⏳ Pending | CRITICAL — currently bypassable |
| Paddle webhook handler | ⏳ Pending | /api/paddle-webhook Vercel function |
| usageGuard.ts → Supabase read | ⏳ Pending | Replace local state with DB check |
| Upgrade modal at limit | ⏳ Pending | Trigger when free tier hit |
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

### 2026-08-12 (Current — RESUME SESSION)
- Full project audit after 6-7 month gap
- CLAUDE.md + PROGRESS.md + memory system created
- Phase 1-5 roadmap established
- Starting Phase 1 execution now
