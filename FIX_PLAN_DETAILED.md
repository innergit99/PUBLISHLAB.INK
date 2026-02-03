# 🔧 COMPREHENSIVE FIX PLAN + CODE

Based on your testing, here's what we need to fix URGENTLY:

## CRITICAL BUG #1: Pollinations 403 Error ❌

### Problem:
```
exportService.ts:447 GET https://image.pollinations.ai/... 403 (Forbidden)
```

The app generates a Pollinations URL, but when `exportService.ts` tries to `fetch()` it to convert to base64 for PDF embedding, Poll inations blocks the request with `403 Forbidden`.

### Root Cause:
Pollinations API changed their CORS policy or rate limits browser-side fetches.

### Solution:
**Don't use Pollinations URLs that we can't fetch.** When HF fails, go DIRECTLY to SVG fallback instead of trying Pollinations.

### Code Change Needed:
**File**: `geminiService.ts` Line ~1015

**Current**:
```typescript
console.log('⚠️ Attempting Pollinations as backup...');
return this.generateWithPollinations(...)
```

**Fix To**:
```typescript
// SKIP Pollinations for KDP (it returns 403 during export)
if (module === 'KDP') {
  console.log('⚠️ HF failed, using SVG fallback for KDP');
  return this.generateFallbackCover(cleanPrompt, width, height);
}
// For POD, still try Pollinations (displayed in <img>, not fetched)
console.log('⚠️ Attempting Pollinations as backup...');
return this.generateWithPollinations(...)
```

---

## CRITICAL BUG #2: "Amazon KDP" as Publisher ❌

### Problem (ChatGPT Audit):
```
Publisher: Amazon KDP  ← FORBIDDEN by Amazon
```

### Root Cause:
Blueprint generator hardcodes "Amazon KDP" as publisher.

### Code Change Needed:
**File**: `gemini Service.ts` Line ~73 (in `generateKDPBlueprint`)

**Current**:
```typescript
publisher_imprint: 'Amazon KDP'
```

**Fix To**:
```typescript
publisher_imprint: project.publisher || 'Independent Publishing'
```

---

## BUG #3: Duplicate Chapter Titles in TOC

### Problem (ChatGPT Audit):
```
1
SHADOWS IN THE NIGHT
Shadows in the Night  ← Duplicate!
```

### Root Cause:
`exportService.ts` prints both chapter number AND title twice in TOC.

### Code Change Needed:
**File**: `exportService.ts` Line ~104

**Current**:
```typescript
doc.text(`Chapter ${ch.chapter}: ${ch.title}`, 30, y);
```

**Fix To**: (Choose ONE format, remove duplication in ToolView preview)
```typescript
doc.text(`${ch.chapter}. ${ch.title.toUpperCase()}`, 30, y);
```

---

## BUG #4: Page Numbering Chaos

### Problem (ChatGPT Audit):
```
Pages jump: 5 → 7 → 18 → 32
Front matter has page numbers (shouldn't)
```

### Root Cause:
`exportService.ts` Line ~149 adds page numbers globally, including front matter.

### Code Change Needed:
**File**: `exportService.ts`

Add a flag to skip numbering on front matter pages:
```typescript
let shouldNumber = false; // Start false
// After TOC:
shouldNumber = true; // Enable numbering from Chapter 1
// Then in footer logic:
if (shouldNumber) {
  doc.text(`${currentPageNum}`, docW / 2, docH - 15, { align: 'center' });
}
```

---

## SUMMARY OF FIXES NEEDED

| # | Issue | File | Line | Est. Time |
|---|-------|------|------|-----------|
| 1 | Pollinations 403 | `geminiService.ts` | ~1015 | 2 min |
| 2 | Amazon KDP publisher | `geminiService.ts` | ~73 | 1 min |
| 3 | Duplicate TOC | `exportService.ts` | ~104 | 2 min |
| 4 | Page numbering | `exportService.ts` | ~149 | 5 min |

**Total**: ~10 minutes of focused fixes

---

## NEXT ACTION

Would you like me to:
1. **Make all 4 fixes now** (I'llcreate the updated files)
2. **Fix them one-by-one** (you review each)
3. **You manually edit** (I guide you line-by-line)

Your HF quota resets in ~1.5 hours, so we have time to fix and re-test!
