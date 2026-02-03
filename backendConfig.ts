/// <reference types="vite/client" />
/// <reference types="vite/client" />
// Backend API Configuration for Artisan AI

// Detect environment
const isDevelopment = import.meta.env.DEV;
const isHuggingFace = window.location.hostname.includes('huggingface.co');

// Backend URL configuration
export const BACKEND_URL = isDevelopment
    ? 'http://localhost:7860'  // Local Python backend
    : isHuggingFace
        ? ''  // Same origin on HF Spaces
        : 'https://your-username-artisan-ai.hf.space';  // Update with your HF Space URL

// API endpoints
export const API_ENDPOINTS = {
    text: `${BACKEND_URL}/api/text`,
    image: `${BACKEND_URL}/api/image`,
    textBatch: `${BACKEND_URL}/api/text/batch`,
    health: `${BACKEND_URL}/health`,
};

// API helper functions
export async function callBackendText(prompt: string, options: {
    maxTokens?: number;
    temperature?: number;
    topP?: number;
} = {}): Promise<string> {
    const response = await fetch(API_ENDPOINTS.text, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt,
            max_tokens: options.maxTokens || 2000,
            temperature: options.temperature || 0.7,
            top_p: options.topP || 0.9,
        }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Backend text generation failed');
    }

    const data = await response.json();
    return data.text;
}

export async function callBackendImage(prompt: string, options: {
    negativePrompt?: string;
    width?: number;
    height?: number;
    steps?: number;
} = {}): Promise<string> {
    const response = await fetch(API_ENDPOINTS.image, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt,
            negative_prompt: options.negativePrompt || '',
            width: options.width || 1024,
            height: options.height || 1024,
            num_inference_steps: options.steps || 4,
        }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Backend image generation failed');
    }

    const data = await response.json();
    return data.image; // Returns base64 data URL
}

export async function checkBackendHealth(): Promise<boolean> {
    try {
        const response = await fetch(API_ENDPOINTS.health);
        const data = await response.json();
        return data.status === 'healthy';
    } catch (e) {
        return false;
    }
}

// Configuration flags
export const USE_BACKEND = !isDevelopment || true; // Always use backend unless explicitly disabled
export const FALLBACK_TO_LOCAL = isDevelopment; // Fallback to local models in development
