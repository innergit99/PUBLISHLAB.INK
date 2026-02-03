# Using Local Intelligence (Ollama) with Artisan AI

Since Artisan AI is an "Industrial" application, it is designed to be resilient during development. 

**Note: This Local Fallback is enabled for DEVELOPMENT (localhost) ONLY.**
Production builds will strictly use Cloud APIs (HuggingFace / Gemini) to ensure reliability for public users.

## 1. Prerequisites
You must have [Ollama](https://ollama.com/) installed and running.

## 2. Setup
1. Open a terminal and run:
   ```bash
   ollama serve
   ```
2. Pull the required model (we use `llama3.2:3b` for speed/quality balance):
   ```bash
   ollama pull llama3.2:3b
   ```

## 3. How It Works
The `geminiService.ts` has been upgraded with a **Traffic Controller**:
- **Primary**: Tries to connect to HuggingFace Cloud / Google Gemini.
- **Failover**: If cloud fails (429/Quota), it instantly routes requests to `http://localhost:11434`.
- **New Feature**: The "Responsive Video Bar" in the unique Teaser Player uses this local intelligence to answer questions about the video in real-time.

## 4. Verification
To verify local mode is active:
1. Disconnect internet or invalidate API keys.
2. Open Artisan AI (`http://localhost:3000`).
3. Click "Run Diagnostic" in Settings.
4. Logic should report: `✅ Local Engine (Ollama) Online`.

---
**Note on Agent vs. App**: 
This setup allows the **Artisan AI Application** to run on your local hardware. The **Antigravity IDE Agent** (me) still requires cloud access to function and cannot currently run on local Ollama.
