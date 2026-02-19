import { TrendingNiche, BrandDNAReport, NicheRadarReport } from './types';

/**
 * INTELLIGENCE SERVICE
 * Delegates to the Gemini AI engine for real market research and brand analysis.
 * All methods use the AI-first cascade (Gemini → Groq → static fallback).
 *
 * CHANGELOG v3.3:
 * - analyzeBrand: was returning hardcoded keyword-guessed data. Now routes to
 *   gemini.analyzeBrandDNA() which has a full AI prompt + JSON parsing + fallback.
 * - scanTrends: was returning static arrays. Now routes to gemini.fetchTrends()
 *   which uses Gemini AI with a quality fallback list.
 * - probeNiche: unchanged, already used gemini.analyzeNicheStrategic.
 */
export const intelligenceService = {

    /**
     * TREND INTELLIGENCE ENGINE
     * Fetches AI-generated live market data for POD and KDP sectors.
     */
    async scanTrends(category: 'POD' | 'KDP'): Promise<TrendingNiche[]> {
        const { gemini } = await import('./geminiService');
        const data = await gemini.fetchTrends();
        return category === 'POD' ? data.pod : data.kdp;
    },

    /**
     * BRAND ANALYZER ENGINE
     * Reverse-engineers Design DNA from a storefront URL using Gemini AI.
     * Previously: returned hardcoded data based on whether URL contained "retro" or "simple".
     * Now: sends the URL to the AI engine which generates a full BrandDNAReport.
     */
    async analyzeBrand(url: string): Promise<BrandDNAReport> {
        const { gemini } = await import('./geminiService');
        return await gemini.analyzeBrandDNA(url);
    },

    /**
     * NICHE RADAR ENGINE
     * Validates a specific niche idea for viability using Gemini Strategic Analysis.
     */
    async probeNiche(niche: string): Promise<NicheRadarReport> {
        const { gemini } = await import('./geminiService');
        return await gemini.analyzeNicheStrategic(niche, {
            targetPlatform: 'Amazon KDP & POD',
            goal: 'High Margin / Low Competition',
            riskTolerance: 'Balanced'
        });
    }
};
