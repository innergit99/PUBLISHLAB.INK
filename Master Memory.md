# ARTISAN AI - Master Memory

> **Last Update**: 2026-02-02 19:12
> **Current Status**: 🟢 STABLE (Free Tier Mode Active)

## Project Overview
**ARTISAN AI** is an advanced KDP (Kindle Direct Publishing) automation suite designed to accelerate the creation of professional-grade book content, covers, and metadata.
**Tech Stack**:
- **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion
- **Backend/Tooling**: Node.js, Vite
- **AI Logic**: Hybrid Engine (OpenAI, HuggingFace [Free], Ollama [Local], Static Fallback)

## Current Objectives
3.  **Genre Expansion**: Continue refining procedural engines for specific KDP niches (Mystery, Romance, Non-Fiction).

## Project Documentation Ecosystem
-   **`Master Memory.md`** (Root): **The Living Journal**. Tracks *current state*, recent changes, and active blockers. (Dynamic)
-   **`.agent/rules/artisan.md`**: **The Constitution**. Defines static *Quality Gates*, Tech Stack rules (React/Tailwind), and "Humanity Pro" writing standards. (Static)
-   **`.agent/rules/project_context.md`**: **The Protocol**. A mandatory hook that forces the agent to read the Global `GEMINI.md` and Local `Master Memory.md` on startup. (System)

## Recent Changes
1.  **[SYSTEM] Free Tier Switch (Critical)**: Disabled `GEMINI_API_KEY` to stop billing. Refactored `geminiService.ts` to strictly block Google API calls and enforce a fallback chain: OpenAI -> HuggingFace -> Ollama -> Static Templates.
2.  **[OPS] API Drain Stopped**: Identified and terminated "zombie" Node.js processes (`npm run dev`) that were silently consuming API quota in the background.
3.  **[FEATURE] Procedural Title Engine**: Implemented `generateRandomizedTitles` in `geminiService.ts` to create unique, genre-specific titles without API calls (supports 22+ genres).
4.  **[FEATURE] Structural Chapter Engine**: Upgraded `generateFallbackOutline` to understand narrative phases (Start/Mid/End), generating context-aware chapter titles procedurally.
6.  **[CONTEXT] Global IDE Check**: Attempted to read `GEMINI.md` from `C:\Users\gauvi\.gemini\antigravity`. File was binary/inaccessible. Read `SNOWBUNNY_ACTIVATION.md` instead, confirming Gemini 3.5 "Snowbunny" integration details.
7.  **[CONTEXT] Skill Catalog**: Verified `MASTER_SKILL_CATALOG.md` lists 120+ skills, including "Token Economist" which manages the Snowbunny/Llama switch.
8.  **[CONTEXT] Global Rules**: Successfully read `GEMINI.md` via terminal bypass. Confirmed "STRICT MODEL SWAP PROTOCOL" requires reading `GEMINI.md` at session start. Note: The file appears to have encoding/corruption issues but core text is readable.
9.  **[RULE] Project Context**: Created `.agent/rules/project_context.md` (Always On) to enforce the "Strict Model Swap Protocol", linking to the Global `GEMINI.md` and local `Master Memory.md`.

## Critical Context
-   **AI Economy**: The system behaves DIFFERENTLY in "Free Mode". Generative text (blurbs, stories) may be slower (HuggingFace) or static (Fallback). This is intentional to prevent cost.
-   **Gemini Service**: Despite the name `geminiService.ts`, this file is now the central "AI Orchestrator". It handles ALL providers. Do not be confused by the filename.
-   **Genre Engines**: The `GENRE_ENGINES` constant in `geminiService.ts` is the "Brain" of the procedural generation. It defines the structural beats for each book type. **Do not overwrite this with simple logic.**
-   **Zombie Processes**: If API usage spikes again, first check for background `node.exe` processes using Task Manager or `Get-Process node`.
-   **Global IDE**: The user's global configuration is in `C:\Users\gauvi\.gemini\antigravity`. Key files: `SNOWBUNNY_ACTIVATION.md` (Gemini Config), `MASTER_SKILL_CATALOG.md` (Capabilities), `GEMINI.md` (Global Rules).
-   **Context Rule**: Always check `.agent/rules/project_context.md` when starting.
