# 🚀 How to Unlock Tier 1 Image Generation (ZeroGPU)

Your application is now equipped with a **Triple-Engine Cascade** for image generation:

1.  **Tier 1: Hugging Face ZeroGPU** (Premium Quality, Free H200 GPU Quota) - *Requires Token*
2.  **Tier 2: Pollinations.ai** (Reliable Workhorse, Unlimited) - *Auto-fallback*
3.  **Tier 3: DeepAI** (Commercial Backup) - *Emergency*

To enable **Tier 1 (High Quality)**, you need to add a free Hugging Face Token.

## Step 1: Get Your Free Token
1.  Go to [Hugging Face Tokens Settings](https://huggingface.co/settings/tokens).
2.  Click **"Create new token"**.
3.  **Name**: `POD_DESIGNER` (or any name).
4.  **Type**: Select **"Read"** (Read access is sufficient).
5.  Click **"Create token"** and copy the string (it starts with `hf_...`).

## Step 2: Add to Your Environment
1.  Open the file named `.env.local` (or create it if it doesn't exist) in your project root.
2.  Add the following line:

```env
HF_API_TOKEN=hf_your_copied_token_here
```

## Step 3: Restart
Restart your development server:
```bash
npm run dev
```

## 🎉 You're Done!
The system will now automatically attempt to use the powerful ZeroGPU for every image request.
- If you have quota, it generates **premium** images (~15s).
- If your quota runs out, it **automatically** falls back to Pollinations (~5s) without any error.
