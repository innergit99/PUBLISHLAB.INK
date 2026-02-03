
# ✍️ HYBRID CO-AUTHOR INTERFACE (GENESIS PHASE 2)
**Objective**: Build the "Google Docs for AI-Human Collaboration"
**Status**: Planning

## 🏗️ Core Architecture

### 1. The Editor Engine (`CoAuthorView.tsx`)
- **Technology**: Tiptap (Headless wrapper around ProseMirror).
- **Justification**: We need granular control over "AI Suggestions" vs "User Text".
- **Visuals**: Notion-style minimalism with "Ghost Text" implementation.

### 2. The Interaction Loop
1.  **Human types**: "The spaceship landed."
2.  **AI (Ghost Mode)**: Detects pause -> Suggests completion `...with a heavy thud, scattering crimson dust.`
3.  **Action**: User hits `Tab` to accept, or keeps typing to ignore.

### 3. The "Lens" System (Sidebar Intelligence)
- **Concept**: Instead of a chatbot on the right, we have active "Lenses".
- **Lens 1: Narrative Continuity**: Checks for plot holes live.
- **Lens 2: Sensory Detail**: Highlights "Tell" moments and suggests "Show" replacements.
- **Lens 3: Pacing Graph**: Visualizes the tension arc of the current chapter.

## 📅 Implementation Plan

### Step 1: Foundation
- [ ] Install `@tiptap/react` `@tiptap/starter-kit`.
- [ ] Create `CoAuthorView.tsx` skeleton.
- [ ] Implement basic rich text state.

### Step 2: Ghost Text Engine
- [ ] Create `GhostOverlay` component (renders gray text behind cursor).
- [ ] Connect `geminiService.autocomplete` (Need to create this endpoint).
- [ ] Handle `Tab` key capture.

### Step 3: The Lenses
- [ ] Build `NarrativeLens` sidebar.
- [ ] Implement `SensoryScanner` logic (Regex for "felt", "seemed", "thought").

## 🧠 Brainstorming: The "Flow State"
*How do we prevent AI from being annoying?*
- **Rule**: AI only suggests after 2 seconds of inactivity.
- **Rule**: Suggestions fade in (opacity 0 -> 100) to avoid jarring pops.
