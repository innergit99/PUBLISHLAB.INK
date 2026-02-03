# 🧠 GENRE LOGIC ENGINE: COMPARISON & IMPLEMENTATION PLAN
**Start Date**: 2026-01-23  
**Objective**: Transition from "Prompt-Based" to "Logic-Engine Based" Generation

---

## 📊 EXECUTIVE SUMMARY

### **The Shift**
*   **Current System**: Uses "Genre Writing Guides" (text prompts) which act as *instructions*.
*   **New Research**: Uses "Logic Engines" (structural valid rules) which act as *constraints*.

### **Why This Matters**
| Feature | Current (Prompt-Based) | New (Logic-Engine Based) | Impact |
|---------|------------------------|--------------------------|--------|
| **Structure** | Linear (Beginning → End) | **Cyclical & Relational** (Flow + Logic) | Readers feel "earned" progression |
| **Variety** | High variance (often random) | **Controlled Variance** (Rotational Logic) | Consistent quality, infinite variations |
| **Depth** | Surface-level tropes | **Internal Motivation** (e.g., "Abandonment Logic") | Characters feel "human" |
| **Coherence** | Can drift off-topic | **Locked Flow** (Guardrails) | No plot holes or pacing issues |

---

## 🔬 DETAILED COMPARISON: CURRENT vs TARGET

### **1. ROMANCE**

| Aspect | Current Implementation | Target (Logic Engine) |
|--------|------------------------|-----------------------|
| **Structure** | "Meet-cute → Conflict → HEA" | **Fixed Flow**: Wound → Connection → ... → Self-Realization |
| **Motivation** | "They fall in love" | **Engine**: "Self-Worth Logic" (I'm not enough) |
| **Uniqueness** | Random scene generation | **Rotation**: Mix "Timing Logic" + "Social Pressure" |

**Gap**: We lack the "Internal Logic" that drives *why* they can't be together yet.

### **2. MYSTERY / THRILLER**

| Aspect | Current Implementation | Target (Logic Engine) |
|--------|------------------------|-----------------------|
| **Structure** | "Clues → Reveal" | **Fixed Flow**: Crime → ... → Misdirection → Escalation |
| **Complexity** | "Add red herrings" | **Engine**: "False Witness Logic" or "Corruption Logic" |
| **Engagement** | "Create suspense" | **Engine**: "Time-Running-Out Logic" |

**Gap**: We need structured *types* of mysteries, not just "a mystery."

### **3. SC-FI / FANTASY**

| Aspect | Current Implementation | Target (Logic Engine) |
|--------|------------------------|-----------------------|
| **World** | "Describe the setting" | **Flow**: Ordinary → Disruption → ... → New Balance |
| **Conflict** | "Hero vs Villain" | **Engine**: "Colonization Ethics" or "Legacy Logic" |
| **Theme** | Abstract concepts | **Engine**: "Identity Transfer" or "Forbidden Magic" |

**Gap**: Our sci-fi/fantasy lacks the "philosophical engine" that defines great speculative fiction.

### **4. VISUAL GENRES (Manga/Comics/Coloring)**

| Aspect | Current Implementation | Target (Logic Engine) |
|--------|------------------------|-----------------------|
| **Structure** | N/A (Not supported) | **Flow**: Weakness → Dream → ... → Victory |
| **Format** | Text-based | **Visual Logic**: Panels, Splash Pages, Pattern Growth |
| **Output** | Novel | **Engine**: "Underdog Logic" or "Mandala Logic" |

**Gap**: Complete absence of visual narrative capability.

---

## 🛠️ IMPLEMENTATION PLAN

### **Phase 1: The "Logic Engine" Core (Code Structure)**

We need to refactor `geminiService.ts` to support this new architecture.

**New Data Structure:**
```typescript
interface GenreLogic {
  flow: string[];           // The Fixed Structural Flow
  engines: string[];        // The Internal Logic Engines (select 2-3)
  override: string;         // The Outside-The-Logic Command
  visuals?: string[];       // Panel/Page Logic (for visual genres)
}

const GENRE_ENGINES: Record<string, GenreLogic> = {
  'ROMANCE': {
    flow: ['Emotional Wound', 'First Connection', ...],
    engines: ['Abandonment Logic', 'Self-Worth Logic', ...],
    override: 'Invent a new emotional conflict rooted in contemporary human fear...'
  },
  // ... other genres
};
```

### **Phase 2: The "Selection System" (Runtime)**

When generating a book:
1.  **Lock the Flow**: This becomes the high-level outline.
2.  **Rotate Engines**: Randomly select 2-3 "Logic Engines" to drive character motivation.
3.  **Apply Override**: Inject the "Outside-The-Logic" command into the system prompt.

**Example Prompt Generation:**
```text
GENRE: Romance
STRUCTURE: Step 3 - Growing Intimacy
ACTIVE LOGIC: "Self-Worth Logic" + "Social Pressure Logic"
INSTRUCTION: Write this scene where intimacy grows, but the protagonist pulls away 
because they feel "not enough" (Self-Worth) while family expectations (Social Pressure) 
create external friction.
```

### **Phase 3: Visual Genre Expansion**

Add support for **Manga**, **Comics**, and **Coloring Books** by:
1.  Generating **Concept Art / Scripts** (since we are a text/image tool, not a layout tool).
2.  Using the specific **Visual Panel Logic** in image prompts.
3.  Enforcing **KDP Safety Rules** for images (bleed, no text overlap).

---

## 🚀 IMMEDIATE ACTION ITEMS

1.  **Define the `GenreLogic` Interface** in `geminiService.ts`.
2.  **Populate `GENRE_ENGINES`** with the research data provided (Romance, Mystery, Fantasy, Sci-Fi, Horror, etc.).
3.  **Update `generateChapterOutline`** to use the "Fixed Structural Flow".
4.  **Update `expandChapterNarrative`** to inject selected "Internal Logic Engines".

This will fundamentally upgrade the **"Brain"** of your application.
