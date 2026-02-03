# 🚀 KDP GENESIS 2.0: ROADMAP & ARCHITECTURE
**Strategic Plan based on Deep Research (2026-01-23)**
**Core Philosophy:** "Think like a publisher, write like an author, typeset like a pro."

---

## 🏗️ EXECUTIVE SUMMARY
We are evolving the platform from a "Book Generator" to a **"KDP Publishing Ecosystem"**.
The new architecture (Genesis 2.0) introduces 11 intelligence layers that handle everything from *Market Analysis* (Pre-Creation) to *Adaptive Learning* (Post-Publication).

---

## 🗺️ SYSTEM ARCHITECTURE (THE 11 LAYERS)

### **LAYER 0: USER ENTRY HUB**
*   **Current:** Simple Form (Genre/Topic).
*   **Genesis:** "Smart Project Setup" collecting Target Audience, Tone (Serious/Playful), and Cover Style preference immediately.

### **LAYER 1: PRE-CREATION INTELLIGENCE (🧠 NEW)**
*   **Market Trend Analyzer:** Scans Amazon/KDP for trending sub-genres (e.g., "Cozy Mystery" + "Baking").
*   **Reader Persona Engine:** Translates "Teen Reader" -> Specific Syntax/Pacing rules.
*   **Author-Mind Simulation:** Assigns a "Virtual Author Personality" (Voice DNA) to the project.

### **LAYER 2: CIN (CREATIVE INTELLIGENCE NETWORK)**
*   **Status:** ✅ Core implemented (Genre Matrix).
*   **Upgrade:** Dedicated Engines for specific formats (Manga Engine, Picture Book Engine).
*   **Output:** Generates the "Story Graph" (Timeline + Emotion Curve).

### **LAYER 3: STRUCTURE & HUMANIZATION (✍️ NEW)**
*   **Hybrid Co-Author Mode:** Live "Google Docs" style canvas where AI & Human co-write.
*   **Voice DNA:** Calibrates rhythm and vocabulary to match the assigned "Author Personality".
*   **Inspiration vs Production:** Toggle modes for creative drafting vs consistent output.

### **LAYER 4: NARRATIVE GRAPH VALIDATOR (Testing Logic)**
*   **Function:** Checks for plot holes, orphan sub-plots, and pacing issues.
*   **Tech:** Graph-based logic (Nodes = Events, Edges = Causality).

### **LAYER 5: PLIS (PRINT LAYOUT INTELLIGENCE) (📏 CORE)**
*   **Status:** ✅ Logic implemented in `structureService`.
*   **Genesis:** "Smart Typography Engine" (Auto-pairing fonts) and "Dual Preview" (Kindle vs Print Bleed view).

### **LAYER 6: KDP VALIDATOR BOT (🔍 CORE)**
*   **Function:** The final gatekeeper. Checks DPI, Bleed, Margins, Font Embedding.
*   **Auto-Fix:** Automatically correct basic errors (e.g., scale images 95% to fit safe zone).

### **LAYER 7: SMART UPLOAD CO-PILOT (📦 CORE)**
*   **Status:** ✅ UI Implemented.
*   **Genesis:** Direct API connection to metadata sources (ISBN, Bowker). Package everything into one `.zip`.

### **LAYER 8: SMART PUBLISHING COACH (💬 UX)**
*   **Function:** Explains *why* things matter ("Increase spine width by 0.2mm").
*   **Guided Learning:** Micro-lessons taught during the workflow.

### **LAYER 9: ANALYTICS & FEEDBACK (DATA)**
*   **Function:** Users upload sales data.
*   **Loop:** System learns which "Voice DNA" sells best.

### **LAYER 10: CLOUD INFRASTRUCTURE (BACKBONE)**
*   **Asset Library:** Store reusable characters/settings.
*   **Version Control:** Git-style "Rollback" for narrative branches.

### **LAYER 11: ADAPTIVE LEARNING CORE (🔮 FUTURE)**
*   **Self-Optimization:** Retrains the *Reader Persona Engine* based on global success metrics.

---

## ✅ FEASIBILITY ASSESSMENT

| Feature | Feasibility | Technical Requirement |
| :--- | :--- | :--- |
| **Market Trend Analyzer** | High | Python Scraper (Selenium/BS4) targeting Amazon Best Sellers. |
| **Narrative Graph** | Medium | Requires strict structured output (JSON) from LLM to map nodes. |
| **Hybrid Co-Author** | High | Tiptap/ProseMirror editor with WebSocket Collab logic. |
| **Smart Typography** | High | Library of Google Font pairings mapped to Genre. |
| **PLIS (PDF Engine)** | High | `pdf-lib` or `react-pdf` for dynamic generation (Already in progress). |
| **Auto-ISBN** | Low (Partner) | Requires User API keys for Bowker/Nielsen. |
| **3D Preview** | Medium | Three.js rendering of the PDF texture on a book mesh. |

---

## 📅 IMPLEMENTATION PRIORITIES

1.  **Phase 1 (The Brains):** Solidify CIN & PLIS (Done/In Progress).
2.  **Phase 2 (The Experience):** Build **Hybrid Co-Author Interface** (The Editor).
3.  **Phase 3 (The Eye):** Implement **3D Preview** & **Smart Typography**.
4.  **Phase 4 (The Market):** Build **Trend Analyzer** Scrapers.

**Conclusion:**
We have the foundation (CIN/PLIS). The "Co-Author" editor and "Visual CME" are the next major frontiers to unlock full "Genesis 2.0" status.
