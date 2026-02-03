/**
 * 🛰️ Visual Resilience Broker (Industrial v2.1)
 * 
 * This service acts as the "Air Traffic Control" for all visual assets in the project.
 * It ensures zero-fail rendering by managing a hierarchy of image generation engines.
 */

import { gemini } from './geminiService';
import { coverGenerator } from './coverGenerator';

export interface VisualRequest {
    prompt: string;
    context: 'COVER' | 'INTERIOR' | 'APLUS' | 'MOCKUP';
    dimensions: { width: number; height: number };
    options?: any;
}

class VisualResilienceBroker {
    private static instance: VisualResilienceBroker;
    private missionLog: string[] = [];

    private constructor() { }

    static getInstance() {
        if (!VisualResilienceBroker.instance) {
            VisualResilienceBroker.instance = new VisualResilienceBroker();
        }
        return VisualResilienceBroker.instance;
    }

    /**
     * Primary entry point for any visual fulfillment.
     * Tries engines in order of fidelity vs dependency.
     */
    async fulfill(request: VisualRequest): Promise<string> {
        this.log(`Fulfilling [${request.context}] request: ${request.prompt.substring(0, 50)}...`);

        // --- TIER 1: INDUSTRIAL CLOUD (HF / POLLINATIONS) ---
        try {
            this.log("Attempting Tier 1 Execution (Industrial Cloud)...");
            const result = await gemini.generateImageForModule(
                request.prompt,
                this.mapContextToModule(request.context),
                request.options
            );
            if (result && !result.includes('placeholder')) {
                this.log("✅ Tier 1 Fulfillment Success.");
                return result;
            }
        } catch (e) {
            this.log(`⚠️ Tier 1 Failed: ${e.message}`);
        }

        // --- TIER 2: AGENTIC BRIDGE (IDE-LEVEL FULFILLMENT) ---
        // If in development, we can check if the IDE (Antigravity) can provide an asset.
        // This is currently a conceptual bridge, but we can simulate it with a high-quality 
        // local fallback for the demo or actual IDE tool calls.
        this.log("Attempting Tier 2 Execution (Agentic Bridge)...");

        // --- TIER 3: INDUSTRIAL LOCAL (CANVAS ENGINE) ---
        try {
            this.log("Attempting Tier 3 Execution (Local Canvas Engine)...");
            if (request.context === 'COVER') {
                const cover = await coverGenerator.generateCover({
                    title: request.options?.title || 'Unknown Title',
                    author: request.options?.author || 'Artisan AI',
                    genre: request.options?.genre || 'Fiction',
                    width: request.dimensions.width,
                    height: request.dimensions.height,
                    colorScheme: request.options?.colorScheme || 'vibrant'
                });
                this.log("✅ Tier 3 Fulfillment Success (Local Canvas).");
                return cover;
            }
        } catch (e) {
            this.log(`❌ Tier 3 Failed: ${e.message}`);
        }

        // --- ABSOLUTE FALLBACK ---
        this.log("🚨 All visual tiers exhausted. Using ultra-fallback.");
        return gemini.generateFallbackCover(request.prompt, request.dimensions.width, request.dimensions.height);
    }

    private mapContextToModule(context: string): 'POD' | 'KDP' | 'MOCKUP' {
        switch (context) {
            case 'COVER': return 'KDP';
            case 'APLUS': return 'MOCKUP';
            default: return 'POD';
        }
    }

    private log(msg: string) {
        const timestamp = new Date().toLocaleTimeString();
        this.missionLog.push(`[${timestamp}] VISUAL_BROKER: ${msg}`);
        console.log(`%c[VISUAL_BROKER]%c ${msg}`, 'color: #8b5cf6; font-weight: bold', 'color: inherit');
    }

    getLogs() {
        return this.missionLog;
    }
}

export const visualBroker = VisualResilienceBroker.getInstance();
