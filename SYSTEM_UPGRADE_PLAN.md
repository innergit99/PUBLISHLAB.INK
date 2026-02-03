# 🚀 ARTISAN AI SYSTEM UPGRADE PLAN
**Generated**: 2026-01-23  
**System Specs**: 16GB RAM, CPU-only (No dedicated GPU)

---

## 📊 CURRENT STATE
- **Ollama Model**: TinyLlama (637 MB, 1.1B params)
- **Performance**: ~400 words/chapter (requires 8 segments for 3000 words)
- **Generation Speed**: ~3-4 min/chapter
- **Image Gen**: HF → Pollinations → Canvas Fallback

---

## ✅ RECOMMENDED UPGRADES

### 1. **Ollama Model Upgrade** (CRITICAL)

#### Option A: **Llama 3.2 3B** (RECOMMENDED for your system)
```bash
ollama pull llama3.2:3b
```
- **Size**: 2GB
- **RAM Usage**: ~4-6GB during inference
- **Output Quality**: ⭐⭐⭐⭐⭐ (Near GPT-3.5 quality)
- **Speed**: ~1.5-2 min/chapter (3000 words in 1 pass)
- **Word Capacity**: 4000+ words per generation
- **Your System**: ✅ PERFECT FIT (16GB RAM comfortable)

#### Option B: **Mistral 7B** (Alternative)
```bash
ollama pull mistral:7b
```
- **Size**: 4.1GB  
- **RAM Usage**: ~8-10GB during inference
- **Output Quality**: ⭐⭐⭐⭐⭐ (Excellent long-form narrative)
- **Speed**: ~2-3 min/chapter
- **Your System**: ✅ FEASIBLE (but will use 60% of RAM)

#### Option C: **Phi-3 Mini** (Lightweight + Quality)
```bash
ollama pull phi3:mini
```
- **Size**: 2.3GB
- **RAM Usage**: ~5GB
- **Output Quality**: ⭐⭐⭐⭐ (Microsoft's efficient model)
- **Speed**: ~1 min/chapter
- **Your System**: ✅ EXCELLENT CHOICE

---

### 2. **Image Generation Resilience**

#### Phase 1: Add IDE Tool Integration ✅
- Antigravity IDE `generate_image` tool as final fallback
- Cascade: HF → Pollinations → **IDE Tool** → Canvas

#### Phase 2: Local Stable Diffusion (Future)
- If you install a GPU later, can add local SDXL

---

### 3. **KDP Back Cover Compliance** ✅

#### Current Issue:
- Using images on back cover (risks barcode overlap)

#### KDP-Compliant Solution:
- **NO IMAGES** on back cover (text-only design)
- Professional typography layout:
  - Blurb (top 60%)
  - Author bio (middle 20%)  
  - Barcode zone (bottom right - MUST be clear)
- Color gradients OK, images NOT OK

---

## 🎯 IMMEDIATE ACTION ITEMS

1. **Install Llama 3.2 3B** (30 seconds):
   ```bash
   ollama pull llama3.2:3b
   ```

2. **Update geminiService.ts** (Line 237):
   ```typescript
   model: "llama3.2:3b",  // Changed from "tinyllama"
   ```

3. **Implement IDE Image Fallback** ✅

4. **Redesign Back Cover** (text-only) ✅

---

## 📈 EXPECTED IMPROVEMENTS

| Metric | Before (TinyLlama) | After (Llama 3.2 3B) |
|--------|-------------------|----------------------|
| Words/Chapter | 400 (truncated) | 3000+ (single pass) |
| Generation Time | 3-4 min | 1.5-2 min |
| Segments Needed | 8 | 1-2 |
| Quality Score | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| RAM Usage | 2GB | 4-6GB |
| Full Book (14ch) | 45-60 min | 20-30 min |

---

## 🔧 SAFE ROLLBACK

If Llama 3.2 3B is too slow, revert:
```bash
# In geminiService.ts line 237:
model: "tinyllama"  # Restore original
```

The multi-segment logic will still work as backup.
