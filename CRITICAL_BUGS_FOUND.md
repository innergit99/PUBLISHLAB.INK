# 🚨 CRITICAL BUGS FOUND - IMMEDIATE ACTION PLAN

## Issue #1: Pollinations 403 Error (BLOCKING EXPORTS)

### Root Cause:
```
GET https://image.pollinations.ai/... 403 (Forbidden)
```

Pollinations is rate-limiting or blocking fetch() requests from browser.

### Impact:
- ❌ Cover PDF cannot export (images fail to load)
- ❌ User sees broken cover in preview
- ❌ Downloads fail with error

### Fix Strategy:
**Option A** (Immediate): Skip Pollinations entirely, use SVG fallback
**Option B** (Better): Use direct `<img>` tag instead of `fetch()` for Pollinations

---

## Issue #2: HF GPU Quota (6s left)

### Current Status:
```
You have exceeded your Pro GPU quota (60s requested vs. 36s left)
Try again in 1:40:39
```

### Fix:
Wait ~1.5 hours OR implement quota-aware logic

---

## Issue #3: Content Quality (ChatGPT Audit) ⚠️

### Critical Violations Found:
1. ❌ **"Amazon KDP" as publisher** → FORBIDDEN by Amazon
2. ❌ **Duplicate scenes** → Quality violation
3. ❌ **Chapter ordering broken** → Ch10 before Ch9
4. ❌ **Page numbering chaos** → 5 → 7 → 18
5. ❌ **Repetitive text** → "Heart pounded" 3x per page

### These are **CODE BUGS**, not AI issues:
- Publisher field: `geminiService.ts` Line ~73
- Duplicate content: Blueprint generation logic
- Page numbering: `exportService.ts` PDF pagination

---

## IMMEDIATE ACTIONS (Next 30 min)

### ✅ Step 1: Fix Pollinations 403 (5 min)
Replace Pollinations fetch with direct SVG fallback when it fails

### ✅ Step 2: Remove "Amazon KDP" Publisher (2 min)
Update blueprint generator to use user's imprint or "Independent"

### ✅ Step 3: Fix Page Numbering (10 min)
Ensure sequential pages starting at Chapter 1

### ✅ Step 4: Test Full Export Flow (10 min)
Generate → Preview → Download PDF

---

## STATUS: READY TO FIX
All issues identified. Fixes are straightforward.
