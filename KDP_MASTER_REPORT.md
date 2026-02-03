# Artisan AI: KDP Book Lab - Comprehensive Intelligence Report (2026)

## 1. Executive Summary
The **KDP Book Lab** is the flagship module of the Artisan AI suite, engineered as a "Zero-Fail Publishing Factory." It transforms a simple high-level concept into a market-ready Amazon KDP asset. The system moves beyond simple text generation, employing an **Industrial Logic Engine** that strictly enforces genre conventions, pacing, and structural integrity before a single word of narrative is written.

### Core Architecture
*   **Blueprint First:** No content is generated without a rigid `KDPBlueprint` structure (Title, ISBN, Trim Size, Chapter Outline).
*   **Multi-Pass Hybrid Engine:** A sophisticated cascade of AI models ensures 100% uptime:
    1.  **Primary:** HuggingFace ZeroGPU (Llama 3.1-8B) for high-fidelity reasoning.
    2.  **Accelerator:** Local Ollama (Llama 3.2) for speed and offline continuity ("Sticky Mode" compliant).
    3.  **Fallback:** Gemini 2.0 Flash for reliable cloud backup.
*   **Humanity Pro™ Audit:** A post-processing layer that scrubs "AI-isms" (filler words, repetitive structures) to boost reader retention.

---

## 2. Genre System Architecture
The system recognizes distinct **Physics** for each genre. It does not treat a "Romance" novel the same as a "Business" book. Each genre triggers a specific set of logic adapters.

### A. Commercial Fiction (Reflowable Layout)
*Target: Kindle E-readers & Standard Paperbacks*

| Genre | Logic Engine | Key Structural Flow | Audio/Visual Specs |
| :--- | :--- | :--- | :--- |
| **Romance** | *Abandonment Logic* | Wound -> Connection -> Intimacy -> Separation -> Reunion | 30k-90k Words<br>5.5" x 8.5" Trim |
| **Mystery** | *Locked-Room Logic* | Crime -> Investigation -> Misdirection -> Reveal | 60k-100k Words<br>5.5" x 8.5" Trim |
| **Thriller** | *Ticking Clock Logic* | Threat -> Escalation -> No Way Out -> Climax | 60k-100k Words<br>6" x 9" Trim |
| **Fantasy** | *Chosen-Burden Logic* | Ordinary World -> Call -> Trial -> Sacrifice -> Power | 80k-150k Words<br>6" x 9" Trim |
| **Sci-Fi** | *Speculative Ethics Logic* | Premise -> Tech Disruption -> Moral Crisis -> Shift | 70k-120k Words<br>6" x 9" Trim |
| **Horror** | *Dread Logic* | Normalcy -> Unease -> Violation -> Confrontation | 60k-90k Words<br>6" x 9" Trim |

### B. Visual & Fixed Layout
*Target: Tablets, Physical Collectors Editions*

| Genre | Logic Engine | Key Structural Flow | Audio/Visual Specs |
| :--- | :--- | :--- | :--- |
| **Manga** | *Underdog Logic* | Weakness -> Training -> Rivalry -> Breakthrough | **RTL Reading**<br>5" x 7.5"<br>High-Contrast B&W |
| **Comic** | *Hero's Cost Logic* | Threat -> Dilemma -> Battle -> Consequence | **Color**<br>7" x 10"<br>Panel-based Scripting |
| **Children's** | *Pattern Verification* | Theme -> Repetition -> Verification -> Reward | **Square** (8.5"x8.5")<br>Full Bleed Color |

### C. Non-Fiction & Low Content
*Target: Reference, Utility, Daily Use*

| Genre | Logic Engine | Key Structural Flow | Audio/Visual Specs |
| :--- | :--- | :--- | :--- |
| **Business** | *ROI Logic* | Problem -> Methodology -> Case Study -> Action | 30k-70k Words<br>6" x 9" |
| **Biography** | *Legacy Logic* | Origins -> Struggle -> Achievement -> Reflection | 60k-120k Words<br>6" x 9" |
| **Coloring** | *Zen Logic* | Theme Entry -> Complexity Ramp -> Mandala/Focus | **Single Sided**<br>8.5" x 11"<br>Vector Black Ink |

---

## 3. The "Industrial Engine" Workflow
The user journey follows a strict railway system to prevent "Blank Page Syndrome."

### Step 1: Configuration (The Setup)
*   **Input:** User provides a raw idea (e.g., "Cyberpunk detective story in Tokyo").
*   **Validation:** System checks typical word counts and chapter constraints for the selected genre.
*   **Title Architecture:** AI generates 5 market-tested titles (e.g., "Neon Rain", "Silicon Soul") based on metadata analysis.

### Step 2: Blueprint Generation (The Skeleton)
*   The API generates a complete `KDPBlueprint` JSON object.
*   **Deliverables:**
    *   Full Chapter Outline (Title + Summary per chapter).
    *   Cover Art Prompts (Front & Back).
    *   Marketing Blurb (Hook, Body, Call to Action).
    *   A+ Content Plan (Banner, Feature, Info Grid).

### Step 3: Production (The Flesh)
The user enters the **Interior Studio**, where they can manage the book chapter-by-chapter.
*   **Text Generation:**
    *   Clicking **"Industrial Expand"** triggers the multi-pass AI.
    *   **Logic:** The prompt fed to the AI includes the *entire* context of the book (Genre, Tone, Previous Chapter Summary) to ensure continuity.
    *   **Audit:** The text is immediately scanned for "AI fluff" (e.g., "In the realm of...", "It is important to note..."). These are purged.
*   **Visual Generation:**
    *   Each chapter gets a dedicated visual plate generated from the blueprint's `visualPrompt`.

### Step 4: Export & Compliance (The Product)
*   **Format:** The system determines if the export should be PDF (Print) or EPUB (E-Book).
*   **Compilation:**
    *   `jsPDF` renders the manuscript.
    *   **Front Matter:** Title page, Copyright, Dedication are injected.
    *   **End Matter:** Author Bio and "Also By" pages are appended.
    *   **Images:** Full-bleed images are inserted for visual genres; in-line plates for fiction.
*   **Metadata Deck:** A downloadable text file containing the exact Title, Subtitle, Keywords, and Category strings needed for the Kindle Direct Publishing dashboard.

---

## 4. Current Operational Status ("Where We Are")
**Status:** 🟢 **DEPLOYED & OPTIMIZED**

### ✅ Working Features
*   **Full Blueprinting:** All major genres support detailed outline generation.
*   **Hybrid AI Generation:** The "Sticky Mode" fix successfully routes traffic to local Ollama models upon cloud failure, enabling uninterrupted long-form generation.
*   **Visual Plates:** Cover and interior image generation is active.
*   **Export:** PDF generation for Print is robust; Metadata export is active.

### ⚠️ Areas for Refinement
1.  **Manga RTL Export:** While the logic exists, the PDF renderer needs verification to ensure pages are ordered Right-to-Left correctly for print.
2.  **Series Continuity:** currently, the "Series Bible" feature (in `KDPBlueprint`) is a placeholder structure. Activating this to pass character sheets between books is the next logical evolution.
3.  **E-Book Validation:** EPUB export relies on standard libraries; validation against "Kindle Previewer 3" strict standards is a manual user step currently.

## 5. Strategic Recommendations
1.  **Activate "Loki Mode":** The multi-variant generation code exists (`generateLokiBlueprints`). Exposing this in the UI would allow users to generate 3 *versions* of a book concept (e.g., "Dark Tone", "Hopeful Tone", "Action Focus") and pick the winner before writing.
2.  **Series Bible Interface:** Build a UI to view/edit the persistent user data that tracks characters across projects.
3.  **Direct-to-KDP:** Long-term goal of using browser automation (puppeteer) to auto-fill the KDP webpage fields using the Metadata Deck.
