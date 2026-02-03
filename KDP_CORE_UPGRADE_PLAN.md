# 🚀 KDP CORE UPGRADE PLAN: "Industry Standard" Architecture
**Based on:** Deep Research Report (2026-01-23)
**Objective:** Transform KDP Book Lab from a "Text Generator" to a "Publishing Engine".

---

## 🏗️ ARCHITECTURE OVERVIEW

We will layer three new intelligence systems on top of the existing `geminiService` and `exportService`.

### 1. 🧠 CIN (Creative Intelligence Network)
**Responsibility:** Genre-Specific Structural Logic.
**Current State:** Generic "Write a chapter" prompts.
**Upgrade:**
- **Genre Matrix**: Hardcoded logic for 12 genres (Word count targets, Pacing curves, Chapter counts).
- **Structure Enforcement**: Example: *Romance* = "Micro-cliffhanger every 2 chapters". *Thriller* = "Rising Tension Index".

### 2. 🧬 CIS (Continuity Intelligence System)
**Responsibility:** "Smart" Regeneration & Narrative Memory.
**Current State:** "Re-Roll" (Fresh Generation).
**Upgrade:**
- **Context Locking**: Inject `Character_State` and `Plot_Threads` into regeneration prompts.
- **Emotional Delta**: When regenerating, ask AI to "Increase Tension" or "Darken Tone" relative to the previous draft.
- **Foreshadowing Safety**: Ensure key plot points (Chekhov's guns) aren't deleted during regen.

### 3. 📐 PLIS (Print Layout Intelligence System)
**Responsibility:** Physical Compliance.
**Current State:** Basic PDF export.
**Upgrade:**
- **Dynamic Margins**: Calculate inner margins based on exact page count (Standard: 0.25", Thick: 0.375").
- **Spine Logic**: `PageCount * PaperThickness` (Cream vs White logic).
- **Bleed Lock**: Hard 0.125" bleed enforcement for "Full Bleed" books (Children's/Coloring).

---

## 📅 IMPLEMENTATION ROADMAP

### PHASE 1: The "Brains" (CIN Implementation)
*   **Task 1**: Create `structureService.ts` to hold the "Genre Logic Matrix" (The data table provided in research).
*   **Task 2**: Update `generateKDPBlueprint` to read from this matrix for Chapter Count and Word Count targets.
*   **Task 3**: Update `expandChapterNarrative` to inject specific "Genre Rules" (e.g., "Use 40% Dialogue" for Romance).

### PHASE 2: The "Memory" (CIS Implementation)
*   **Task 1**: Update `KDPBlueprint` interface to store `ContextCache` (End of chapter state) for each chapter.
*   **Task 2**: Rewrite `handleExpandChapter` (Regenerate) to use **Mode Selection**: "Fresh Roll" vs "Tune Tone" (using `aiServiceWrapper` Critic loop).

### PHASE 3: The "Body" (PLIS Implementation)
*   **Task 1**: Upgrade `exportService.ts` to use `pdf-lib` dynamic margin calculation.
*   **Task 2**: Implement `PaperType` selection in `KDPProject` (Cream/White/Color).
*   **Task 3**: Connect `SmartUploadCopilot` to real PLIS data (showing actual spine width in mm).

---

## 📝 TECHNICAL SPECIFICATIONS

### A. Genre Matrix Data Structure (Sample)
```typescript
{
  "THRILLER": {
    targetWords: 80000,
    chapters: 25,
    pacing: "Rising",
    rules: ["Reveal every 4 chapters", "No safe moments"],
    paperType: "Cream"
  },
  "CHILDREN": {
    targetWords: 1000,
    chapters: 1,
    pacing: "Steady",
    rules: ["Rhythm: ABCB", "Max 60 words/spread"],
    paperType: "Color"
  }
}
```

### B. Continuity Prompt Injection
```typescript
const contextPrompt = `
PREVIOUS CONTEXT: ${prevChapterSummary}
EMOTIONAL LOCK: The reader must feel [Paranoia].
NARRATIVE LOCK: Do not resolve the [Missing Key] sub-plot yet.
`;
```

---

## ✅ SUCCESS CRITERIA
1.  **Structure**: A generated Mystery novel obeys the "3 Clues per Act" rule.
2.  **Continuity**: Regenerating Chapter 5 recalls that the weapon was found in Chapter 4.
3.  **Physical**: PDF export margins change automatically if the book grows from 100 to 300 pages.

**Status**: Plan Ready for Execution.
