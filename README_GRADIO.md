---
title: Publish Lab Creative Studio
emoji: 🎨
colorFrom: purple
colorTo: pink
sdk: gradio
sdk_version: 4.44.0
app_file: backend/app_gradio.py
pinned: false
license: mit
---

# 🎨 Publish Lab - Creative Studio

A comprehensive AI-powered creative suite for content creation, design, and publishing.

Powered by **Llama 3 8B Instruct** + **FLUX.1-schnell** on **ZeroGPU**

## Features

### 📚 KDP Book Lab
- AI-powered book writing with Llama 3 8B
- Chapter generation with consistent narrative
- Genre-specific templates (Romance, Mystery, Fantasy, etc.)
- Professional cover design with FLUX.1
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

**AI Models:**
- 📝 Text: Llama 3 8B Instruct (8B parameters)
- 🎨 Images: FLUX.1-schnell (fast, high-quality)

**Infrastructure:**
- HuggingFace Spaces
- ZeroGPU (T4 GPU - free tier)
- Gradio interface

## API Usage

### Text Generation

**Input:**
```json
{
  "prompt": "Write a mystery story opening...",
  "max_tokens": 2000,
  "temperature": 0.7
}
```

**Output:**
```json
{
  "success": true,
  "text": "The fog rolled in from the harbor...",
  "model": "Llama-3-8B-Instruct"
}
```

### Image Generation

**Input:**
```json
{
  "prompt": "Professional mystery thriller book cover",
  "width": 1024,
  "height": 1024,
  "num_inference_steps": 4
}
```

**Output:**
```json
{
  "success": true,
  "image": "data:image/png;base64,iVBORw0KGgo...",
  "model": "FLUX.1-schnell"
}
```

## Integration with Frontend

Use Gradio's API to call from React:

```javascript
// Text generation
const response = await fetch(
  'https://YOUR-USER-artisan-ai.hf.space/call/api_text',
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      data: [JSON.stringify({
        prompt: "Write a story...",
        max_tokens: 2000
      })]
    })
  }
);
```

## Performance

- **Text Generation**: 5-15 seconds
- **Image Generation**: 2-5 seconds  
- **Cold Start**: 20-30 seconds (first request)
- **GPU Time Limits**: 60s text, 30s images (ZeroGPU)

## Usage Limits

**Free ZeroGPU Tier:**
- Generous for personal projects
- Queue during high demand
- Maximum 60s per text generation
- Maximum 30s per image generation

## License

MIT License - Free for personal and commercial use

## Credits

Built by Bishal Gautam  
Powered by HuggingFace 🤗  
Models: Meta (Llama 3), Black Forest Labs (FLUX.1)

## Support

For issues or questions, please check the Gradio interface documentation at the Space URL.
