# 🏗️ SYSTEM STRUCTURE & LOGIC REPORT
**Module**: KDP Book Lab
**Analysis Date**: 2026-01-23

---

## 1. 📄 PAGE COUNT LOGIC
**Current Status**: **Word Count Based**

Key factors in calculation:
*   **Formula**: `(Total Word Count / 300) + (Chapter Count * 2)`
*   **Minimum constraint**: The system forces a minimum of **72 pages** (industry standard for decent spine width).
*   **Per-Chapter Analysis**: It sums the actual word count of generated chapters. If chapters are placeholders (0 words), the page count remains at the floor (72).

**Code Reference (`ToolView.tsx`):**
```typescript
const estimatedPages = Math.max(72, Math.ceil(totalWords / 300) + (kdpBlueprint.INTERIOR_CONTENT.length * 2));
```

**Assessment**:
This is a standard estimation for 6x9" books. It assumes ~300 words per page. It does *not* currently calculate based on physical layout (font size/margins) but provides a "manufacturing estimate".

---

## 2. 🔄 REGENERATE CHAPTER LOGIC
**Current Status**: **Fresh Generation (Re-Roll)**

When a user clicks "Regenerate" on a chapter:
1.  **Trigger**: `handleExpandChapter(idx)` is called again.
2.  **Logic**:
    *   It calls `expandChapterNarrative` in `geminiService.ts`.
    *   It uses the **SAME** Blueprinted Summary and Context.
    *   It sends a fresh request to the AI Engine.
3.  **Variation Source**:
    *   Relies on the AI's "Temperature" (set to 0.7) to produce different results.
    *   It does **not** currently take the "rejected" text as input to say "Make it different from this."
    *   It does **not** explicitly use the "Critic" loop in this specific function call (it uses the internal `queryAI` method).

**Code Reference (`geminiService.ts`):**
```typescript
const basePrompt = `Write the ${genre} novel... Current Chapter: ${ch.chapter}... Summary: ${ch.summary}...`;
// ...
rawContent = await this.queryAI(prompt);
```

**Assessment**:
The current logic is a "Hard Reset". It discards the old text and generates fresh from the original prompt. It does not "iterate" or "fix" the previous version; it simply tries again from scratch.

---

## 💡 RECOMMENDATIONS (For Future)

1.  **Page Count**:
    *   Switch to a "Layout Simulator" that accounts for Trim Size (e.g., 5x8 has fewer words/page than 6x9).
    *   Logic: `Words / WordsPerPage(TrimSize)`.

2.  **Regeneration**:
    *   Implement **"Iterative Regeneration"**: Pass the *rejected* text to the AI and ask it to "Write a version distinct from this one."
    *   Connect the **Critic Engine**: Use the `aiServiceWrapper` capabilities to polish the text instead of just re-rolling it.
