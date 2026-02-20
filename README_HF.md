---
title: Publish Lab Creative Studio
emoji: 🎨
colorFrom: purple
colorTo: pink
sdk: docker
pinned: false
license: mit
app_port: 7860
---

# Publish Lab - Creative Studio

A comprehensive AI-powered creative suite for content creation, design, and publishing.

## Features

### 📚 KDP Book Lab
- AI-powered book writing
- Chapter generation with consistent narrative
- Genre-specific templates (Romance, Mystery, Fantasy, Sci-Fi, Horror)
- Professional cover design
- KDP-compliant PDF export

### 🎨 Visual Design Tools
- Logo generation
- Brand identity creation
- Marketing materials
- High-quality AI images (FLUX.1-schnell)

### 📊 Business Intelligence
- Trend analysis
- Niche research
- Market insights
- Brand DNA generation

## Tech Stack

**Frontend:**
- React + TypeScript
- Vite
- Tailwind CSS

**Backend:**
- FastAPI (Python)
- Llama 3 8B Instruct (text generation)
- FLUX.1-schnell (image generation)

**Infrastructure:**
- HuggingFace Spaces
- ZeroGPU (T4 - 16GB VRAM)

## API Endpoints

### Text Generation
```bash
POST /api/text
{
  "prompt": "Write a mystery story opening...",
  "max_tokens": 2000,
  "temperature": 0.7
}
```

### Image Generation
```bash
POST /api/image
{
  "prompt": "Professional book cover for mystery thriller",
  "width": 1024,
  "height": 1024
}
```

## Usage

1. Open the Space URL
2. Select a tool from the sidebar
3. Follow the tool-specific workflow
4. Generate content with AI
5. Export/download results

## Performance

- Text Generation: 5-15 seconds (depending on length)
- Image Generation: 2-5 seconds
- Cold Start: ~20-30 seconds (first request only)

## Limitations

- Free tier GPU time limits apply
- Maximum 60 seconds per generation
- Concurrent requests queued

## License

MIT License - Free for personal and commercial use

## Credits

Built by Bishal Gautam
Powered by HuggingFace 🤗
