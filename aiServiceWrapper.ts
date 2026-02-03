// HuggingFace Spaces Backend Integration
// This file integrates the Python backend with existing geminiService

import { callBackendText, callBackendImage, USE_BACKEND, FALLBACK_TO_LOCAL, checkBackendHealth } from './backendConfig';

/**
 * AI Service Wrapper - Routes to backend or local based on configuration
 */
export class AIServiceWrapper {
    private backendAvailable: boolean = false;
    private checkingBackend: boolean = false;

    constructor() {
        this.init();
    }

    private async init() {
        if (USE_BACKEND && !this.checkingBackend) {
            this.checkingBackend = true;
            this.backendAvailable = await checkBackendHealth();
            console.log(this.backendAvailable
                ? '✅ HF Backend connected and healthy'
                : '⚠️ HF Backend unavailable, using fallback');
            this.checkingBackend = false;
        }
    }

    /**
     * Generate text using backend or fallback to local
     */
    /**
     * Generate text with optional "The Critic" Self-Revision Loop
     */
    async generateText(prompt: string, options: {
        maxTokens?: number;
        temperature?: number;
        jsonMode?: boolean;
        useCritic?: boolean; // New: Enable Self-Revision Engine
    } = {}): Promise<string> {
        // 1. DRAFT PHASE
        let draft = "";

        // Try backend first if available
        if (USE_BACKEND && this.backendAvailable) {
            try {
                console.log('🤗 Using HF Backend (Llama 3 8B)...');
                draft = await callBackendText(prompt, {
                    maxTokens: options.maxTokens,
                    temperature: options.temperature,
                });
                console.log('✅ HF Backend generation successful');
            } catch (error: any) {
                console.warn('HF Backend failed:', error.message);

                // Mark backend as unavailable temporarily
                if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
                    this.backendAvailable = false;
                    setTimeout(() => this.init(), 30000);
                }
                // Fallback to local logic would happen here in a real scenario
                throw new Error('Backend unavailable and no local fallback configured'); // Keeping original error behavior
            }
        }
        else if (FALLBACK_TO_LOCAL) {
            throw new Error('Local fallback not yet configured - use existing geminiService');
        } else {
            throw new Error('Backend unavailable and no local fallback configured');
        }

        // 2. CRITIQUE PHASE (The Critic Agent)
        if (options.useCritic && draft && draft.length > 100) {
            console.log('🤔 [The Critic] Reviewing draft for emotional depth and pacing...');
            try {
                const critiquePrompt = `As "THE CRITIC", a ruthless senior editor, analyze the following text. 
                Identify 3 specific areas where emotional subtext, sensory details, or pacing can be improved.
                Do not be polite. Be specific.
                
                TEXT:
                "${draft.substring(0, 3000)}..."`; // Truncate if too long for context

                const critique = await callBackendText(critiquePrompt, { maxTokens: 500 });

                // 3. POLISH PHASE
                console.log('✨ [The Critic] Polishing draft based on feedback...');
                const polishPrompt = `As the Original Author, rewrite the text based on this critique:
                "${critique}"
                
                Original Text:
                "${draft}"
                
                Output ONLY the polished version. Improvements must be substantive.`;

                const polished = await callBackendText(polishPrompt, { maxTokens: options.maxTokens });
                return polished;
            } catch (e) {
                console.warn('⚠️ Critic Loop failed, returning original draft:', e);
                return draft;
            }
        }

        return draft;
    }

    /**
     * Generate image using backend
     */
    async generateImage(prompt: string, options: {
        negativePrompt?: string;
        width?: number;
        height?: number;
    } = {}): Promise<string> {
        // Try backend
        if (USE_BACKEND && this.backendAvailable) {
            try {
                console.log('🎨 Using HF Backend (FLUX.1-schnell)...');
                const result = await callBackendImage(prompt, options);
                console.log('✅ HF Backend image generation successful');
                return result;
            } catch (error: any) {
                console.warn('HF Backend image generation failed:', error.message);

                // Fall through to fallback
            }
        }

        // Fallback to Pollinations or other service
        console.log('⚠️ Using fallback image service...');
        const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${options.width || 1024}&height=${options.height || 1024}&nologo=true`;
        return pollinationsUrl;
    }

    /**
     * Check if backend is currently available
     */
    isBackendAvailable(): boolean {
        return this.backendAvailable;
    }

    /**
     * Force reconnection attempt
     */
    async reconnect(): Promise<boolean> {
        await this.init();
        return this.backendAvailable;
    }
}

// Export singleton instance
export const aiService = new AIServiceWrapper();
