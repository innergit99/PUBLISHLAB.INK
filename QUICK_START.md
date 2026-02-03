# 🚀 QUICK START - Deploy in 30 Minutes

This is the fastest path to get Artisan AI running on HuggingFace Spaces.

## ⚡ **FASTEST PATH (Web UI - No Git Required)**

### **Step 1: Create Account** (2 min)
1. Go to https://huggingface.co/join
2. Sign up with email
3. Verify email

### **Step 2: Accept Llama License** (1 min)
1. Go to https://huggingface.co/meta-llama/Llama-3-8B-Instruct
2. Click "Agree and access repository"
3. Fill out form and submit

### **Step 3: Create Space** (2 min)
1. Go to https://huggingface.co/new-space
2. Fill out:
   - Owner: YOUR_USERNAME
   - Space name: `artisan-ai`
   - License: `mit`
   - Select SDK: `Docker`
   - Space hardware: `ZeroGPU` (free)
3. Click "Create Space"

### **Step 4: Upload Files** (10 min)

Click "Files and versions" → "Add file" → "Upload files"

Upload these files in this order:

**Required files:**
1. `README_HF.md` → rename to `README.md` before uploading
2. `Dockerfile`
3. Create folder `backend/` and upload:
   - `backend/app.py`
   - `backend/requirements.txt`

**Frontend files** (upload to root):
4. `package.json`
5. `package-lock.json`  
6. `vite.config.ts`
7. `tsconfig.json`
8. `tsconfig.node.json`
9. `index.html`

**Frontend folders** (create and upload):
10. Create `public/` folder → upload contents
11. Create `components/` folder → upload all `.tsx` files
12. Upload all `.ts` files (geminiService.ts, types.ts, etc.)
13. Upload all `.tsx` files in root

### **Step 5: Wait for Build** (10-15 min)
1. Space will automatically start building
2. Watch "Building..." status at top
3. Check logs for any errors
4. Wait for "Running" status

### **Step 6: Test It!** (2 min)

Once "Running", click your Space URL and test:

**Health Check:**
```
https://YOUR_USERNAME-artisan-ai.hf.space/health
```

Should return:
```json
{
  "status": "healthy",
  "gpu_available": true
}
```

**Text Generation Test:**
Open browser console and run:
```javascript
fetch('https://YOUR_USERNAME-artisan-ai.hf.space/api/text', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    prompt: 'Write one mystery book title',
    max_tokens: 50
  })
}).then(r => r.json()).then(console.log)
```

### **Step 7: Update Frontend** (5 min)

1. Open `e:\ARTISAN AI\backendConfig.ts`
2. Find this line:
   ```typescript
   : 'https://your-username-artisan-ai.hf.space';
   ```
3. Replace with YOUR actual Space URL:
   ```typescript
   : 'https://YOUR_USERNAME-artisan-ai.hf.space';
   ```
4. Save file
5. Build frontend:
   ```bash
   npm run build
   ```
6. Upload new `dist/` folder to HF Space (replace old one)

### **Step 8: Celebrate! 🎉**

Your Artisan AI is now live and accessible at:
```
https://huggingface.co/spaces/YOUR_USERNAME/artisan-ai
```

---

## ✅ **VERIFICATION CHECKLIST**

- [ ] Health endpoint returns healthy status
- [ ] Text generation works (try KDP Book Lab)
- [ ] Image generation works (try Logo Designer)
- [ ] All tools load without errors
- [ ] No CORS errors in console
- [ ] Response times acceptable

---

## 🐛 **QUICK FIXES**

### **Build Failed**
- Check you accepted Llama license
- Verify all files uploaded correctly
- Check build logs for specific error

### **Frontend Won't Load**
- Check you updated `backendConfig.ts` correctly
- Rebuild with `npm run build`
- Re-upload `dist/` folder

### **API Returns 500**
- Check Space logs
- Verify model loading isn't timing out
- May need to restart Space

---

## 📚 **FULL DOCUMENTATION**

For detailed instructions, troubleshooting, and optimization:
- See `DEPLOYMENT_GUIDE.md`
- See `DEPLOYMENT_PLAN.md`

---

## 🎯 **TOTAL TIME: ~30 MINUTES**

- Setup: 5 min
- Upload: 10 min
- Build: 15 min
- Test: 5 min

**Now go deploy and make Artisan AI amazing!** 🚀
