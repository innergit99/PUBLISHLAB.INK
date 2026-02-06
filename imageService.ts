/**
 * IMAGE GENERATION SERVICE
 * Environment-aware routing for image generation.
 * 
 * LOCAL MODE: Uses Canvas-based generation (zero API costs)
 * PRODUCTION MODE: Uses Fal.ai Flux (industrial-grade quality)
 */

import { coverGenerator } from './coverGenerator';
import { isLocalMode, isProductionMode } from './environmentConfig';

export interface ImageGenerationOptions {
    prompt: string;
    width?: number;
    height?: number;
    model?: 'schnell' | 'dev' | 'pro'; // Fal.ai Flux variants
    numInferenceSteps?: number;
    guidanceScale?: number;
}

export class ImageService {
    /**
     * Generate an image with environment-aware routing
     */
    async generateImage(options: ImageGenerationOptions): Promise<string> {
        if (isLocalMode()) {
            console.log('🏠 LOCAL MODE: Using Canvas generation (zero API costs)');
            return this.generateWithCanvas(options);
        }

        console.log('🚀 PRODUCTION MODE: Using Fal.ai Flux');
        return this.generateWithFal(options);
    }

    /**
     * LOCAL MODE: Canvas-based generation
     */
    private async generateWithCanvas(options: ImageGenerationOptions): Promise<string> {
        const { prompt, width = 1024, height = 1024 } = options;

        try {
            // Use the existing Canvas generator for generic placeholders
            const dataUrl = await coverGenerator.generateGenericPlaceholder(
                prompt,
                width,
                height
            );
            console.log('✅ Canvas generation successful');
            return dataUrl;
        } catch (error: any) {
            console.error('❌ Canvas generation failed:', error.message);
            throw new Error(`Canvas generation failed: ${error.message}`);
        }
    }

    /**
     * PRODUCTION MODE: Fal.ai Flux generation
     */
    private async generateWithFal(options: ImageGenerationOptions): Promise<string> {
        const {
            prompt,
            width = 1024,
            height = 1024,
            model = 'schnell',
            numInferenceSteps = 4,
            guidanceScale = 3.5
        } = options;

        const apiKey = import.meta.env.VITE_FAL_API_KEY || process.env.FAL_API_KEY;
        if (!apiKey || apiKey.includes('PLACEHOLDER')) {
            console.warn('⚠️ Fal.ai API key missing, falling back to Canvas');
            return this.generateWithCanvas(options);
        }

        const modelMap = {
            'schnell': 'fal-ai/flux/schnell',
            'dev': 'fal-ai/flux/dev',
            'pro': 'fal-ai/flux-pro'
        };

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s timeout

        try {
            const response = await fetch(`https://fal.run/${modelMap[model]}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Key ${apiKey}`
                },
                signal: controller.signal,
                body: JSON.stringify({
                    prompt,
                    image_size: {
                        width,
                        height
                    },
                    num_inference_steps: numInferenceSteps,
                    guidance_scale: guidanceScale,
                    num_images: 1,
                    enable_safety_checker: false
                })
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Fal.ai Error: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            const imageUrl = data.images?.[0]?.url;

            if (!imageUrl) {
                throw new Error('No image URL in Fal.ai response');
            }

            // Convert URL to data URL for consistency
            const imageDataUrl = await this.urlToDataUrl(imageUrl);
            console.log('✅ Fal.ai generation successful');
            return imageDataUrl;
        } catch (error: any) {
            clearTimeout(timeoutId);

            if (error.name === 'AbortError') {
                console.error('❌ Fal.ai request timeout');
                throw new Error('Image generation timeout (60s exceeded)');
            }

            console.error('❌ Fal.ai generation failed:', error.message);

            // Fallback to Canvas in production if Fal.ai fails
            console.log('🔄 Falling back to Canvas generation');
            return this.generateWithCanvas(options);
        }
    }

    /**
     * Convert image URL to data URL
     */
    private async urlToDataUrl(url: string): Promise<string> {
        try {
            const response = await fetch(url);
            const blob = await response.blob();

            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result as string);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });
        } catch (error) {
            console.error('Failed to convert URL to data URL:', error);
            throw error;
        }
    }

    /**
     * Generate a POD design with two-tier quality system
     * - Preview mode: Canvas (free, instant)
     * - Final mode: Fal.ai (paid, print-ready)
     */
    async generatePODDesign(options: {
        prompt: string;
        style: string;
        mode: 'preview' | 'final';
    }): Promise<string> {
        const fullPrompt = `${options.prompt}, ${options.style}`;

        if (options.mode === 'preview') {
            console.log('🎨 POD Preview Mode: Using Canvas (free)');
            // Always use Canvas for previews (unlimited, free)
            return this.generateWithCanvas({
                prompt: fullPrompt,
                width: 1024,
                height: 1024
            });
        }

        // FINAL MODE: Production-ready print design
        console.log('🖨️ POD Final Mode: Using Fal.ai (print-ready)');

        if (isLocalMode()) {
            console.warn('⚠️ Local mode: Using Canvas for final (production would use Fal.ai)');
            return this.generateWithCanvas({
                prompt: `${fullPrompt}, ultra high quality, 300 DPI`,
                width: 2048,
                height: 2048
            });
        }

        // Production: Use Fal.ai Flux Dev for highest quality
        try {
            return await this.generateWithFal({
                prompt: `${fullPrompt}, ultra high quality, 300 DPI, print-ready, professional`,
                width: 2048,
                height: 2048,
                model: 'dev', // Higher quality for print
                numInferenceSteps: 28, // More steps = better quality
                guidanceScale: 7.5 // Higher guidance for better prompt adherence
            });
        } catch (error: any) {
            console.error('❌ Fal.ai failed for POD final, falling back to Canvas:', error.message);
            // Fallback to high-res Canvas if Fal.ai fails
            return this.generateWithCanvas({
                prompt: `${fullPrompt}, ultra high quality`,
                width: 2048,
                height: 2048
            });
        }
    }

    /**
     * Generate a book cover (uses existing Canvas logic for now)
     */
    async generateCover(options: {
        title: string;
        author: string;
        genre: string;
        width?: number;
        height?: number;
        colorScheme?: 'vibrant' | 'dark' | 'minimal' | 'elegant';
    }): Promise<string> {
        // For now, always use Canvas for covers (it's already high-quality)
        // In Phase 3, we can integrate Fal.ai for cover backgrounds
        return coverGenerator.generateCover(options);
    }
}

export const imageService = new ImageService();
