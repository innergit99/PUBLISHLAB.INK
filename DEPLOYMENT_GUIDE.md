# 🚀 HuggingFace Spaces Deployment Guide

## Prerequisites

1. **HuggingFace Account**
   - Sign up at https://huggingface.co/join
   - Create new Space at https://huggingface.co/new-space

2. **Git LFS** (for large files)
   ```bash
   git lfs install
   ```

3. **HuggingFace CLI** (optional, for easier deployment)
   ```bash
   pip install huggingface_hub
   huggingface-cli login
   ```

---

## 📦 Deployment Steps

### Option A: Web UI (Easiest)

1. **Create New Space**
   - Go to https://huggingface.co/new-space
   - Name: `artisan-ai-creative-studio`
   - License: `MIT`
   - SDK: `Docker`
   - Hardware: `ZeroGPU` (free tier)

2. **Upload Files**
   - Click "Files and versions"
   - Upload these files:
     ```
     ├── Dockerfile
     ├── README_HF.md (rename to README.md)
     ├── backend/
     │   ├── app.py
     │   └── requirements.txt
     └── (frontend build files will be built in Docker)
     ```

3. **Configure**
   - In Space settings, enable ZeroGPU
   - Set visibility (Public or Private)

4. **Deploy**
   - Space will automatically build and deploy
   - First build takes 10-15 minutes

---

### Option B: Git (Recommended for Updates)

1. **Clone Your Space**
   ```bash
   git clone https://huggingface.co/spaces/YOUR_USERNAME/artisan-ai-creative-studio
   cd artisan-ai-creative-studio
   ```

2. **Copy Files**
   ```bash
   # From your Artisan AI directory
   cp Dockerfile ./
   cp README_HF.md ./README.md
   cp -r backend ./
   
   # Copy frontend source (will be built in Docker)
   cp -r components src public *.ts *.tsx *.json *.html ./
   ```

3. **Commit and Push**
   ```bash
   git add .
   git commit -m "Initial deployment"
   git push
   ```

4. **Monitor Build**
   - Go to your Space URL
   - Watch build logs
   - Wait for "Running" status

---

## 🧪 Testing After Deployment

### 1. Health Check
```bash
curl https://YOUR_USERNAME-artisan-ai-creative-studio.hf.space/health
```

Expected response:
```json
{
  "status": "healthy",
  "service": "Artisan AI Backend",
  "gpu_available": true
}
```

### 2. Text Generation Test
```bash
curl -X POST https://YOUR_USERNAME-artisan-ai-creative-studio.hf.space/api/text \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Write a mystery story opening",
    "max_tokens": 500
  }'
```

### 3. Image Generation Test
```bash
curl -X POST https://YOUR_USERNAME-artisan-ai-creative-studio.hf.space/api/image \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Professional book cover for mystery thriller",
    "width": 512,
    "height": 512
  }'
```

---

## 🔧 Frontend Integration

### Update backendConfig.ts

Replace this line:
```typescript
: 'https://your-username-artisan-ai.hf.space';
```

With your actual Space URL:
```typescript
: 'https://YOUR_USERNAME-artisan-ai-creative-studio.hf.space';
```

### Rebuild Frontend
```bash
npm run build
```

### Update Deployment
```bash
git add backendConfig.ts
git commit -m "Update backend URL"
git push
```

---

## ⚡ Performance Optimization

### 1. Model Caching
Models are automatically cached after first load. First request takes 20-30s, subsequent requests are 5-15s.

### 2. Keep-Alive
Send periodic health checks to keep models loaded:
```javascript
setInterval(() => {
  fetch('/health');
}, 4 * 60 * 1000); // Every 4 minutes
```

### 3. Request Batching
Use `/api/text/batch` for multiple chapters:
```javascript
const chapters = await fetch('/api/text/batch', {
  method: 'POST',
  body: JSON.stringify([
    { prompt: "Chapter 1...", max_tokens: 2000 },
    { prompt: "Chapter 2...", max_tokens: 2000 }
  ])
});
```

---

## 🐛 Troubleshooting

### Build Fails

**Issue**: Docker build timeout
**Solution**: Reduce model size or use staged loading
```python
# In app.py, use smaller models initially
model_name = "microsoft/Phi-3-mini-4k-instruct"  # 3.8B instead of 8B
```

### Out of Memory

**Issue**: GPU OOM during generation
**Solution**: Reduce batch size or max tokens
```python
max_new_tokens=1000  # Instead of 2000
```

### Cold Start Too Slow

**Issue**: First request takes >60s
**Solution**: Use smaller model or increase timeout
```python
# In app.py
@app.on_event("startup")
async def startup():
    # Pre-load models
    load_text_model()
    load_image_model()
```

---

## 📊 Monitoring

### Space Metrics
- View in HF Space dashboard
- Monitor CPU/GPU usage
- Track request count
- Check error rates

### Logs
```bash
# View live logs in HF Space UI
# Or use CLI
huggingface-cli space logs YOUR_USERNAME/artisan-ai-creative-studio
```

---

##  🎯 Post-Deployment Checklist

- [ ] Health endpoint returns 200
- [ ] Text generation works
- [ ] Image generation works
- [ ] Frontend loads correctly
- [ ] All tools accessible
- [ ] Performance acceptable (< 15s per request)
- [ ] Error handling works
- [ ] Updated frontend with correct backend URL
- [ ] Tested on mobile
- [ ] Shared with team/users

---

## 🔄 Updating

### Code Updates
```bash
# Make changes locally
git add .
git commit -m "Update: description"
git push
```

### Model Updates
Edit `app.py` model names, commit, push. Space rebuilds automatically.

### Dependencies
Edit `backend/requirements.txt`, commit, push.

---

## 📝 Notes

- **Free Tier Limits**: 60s max per request, queue during high load
- **GPU**: T4 with 16GB VRAM
- **Storage**: 50GB persistent (for model cache)
- **Bandwidth**: Unlimited on Community (free tier)

---

## 🎉 Success!

Your Artisan AI Creative Studio is now deployed and accessible worldwide!

Space URL: `https://huggingface.co/spaces/YOUR_USERNAME/artisan-ai-creative-studio`

Share it, use it, and enjoy! 🚀
