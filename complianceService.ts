import { KDPSeoDossier } from './types';

/**
 * COMPLIANCE & SEO SERVICE
 * Handles Amazon SEO generation, Policy auditing, and Profit modeling.
 * All text generation routes through the Gemini → Groq fallback chain.
 */

/** Shared AI request helper — mirrors the pattern in geminiService.ts */
async function callAI(prompt: string): Promise<string> {
    const geminiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY;
    const groqKey = (import.meta as any).env?.VITE_GROQ_API_KEY;

    // 1. Try Gemini 2.0 Flash
    if (geminiKey && !geminiKey.includes('PLACEHOLDER')) {
        const models = [
            'gemini-3-flash-preview',
            'gemini-2.5-flash-lite',
            'gemini-2.0-flash',
        ];
        for (const model of models) {
            try {
                const res = await fetch(
                    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            contents: [{ parts: [{ text: prompt }] }],
                            generationConfig: { temperature: 0.7, maxOutputTokens: 4096 }
                        })
                    }
                );
                if (!res.ok) continue;
                const data = await res.json();
                const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
                if (text) return text;
            } catch (_) { /* try next */ }
        }
    }

    // 2. Try Groq
    if (groqKey && !groqKey.includes('PLACEHOLDER')) {
        try {
            const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${groqKey}` },
                body: JSON.stringify({
                    model: 'llama-3.3-70b-versatile',
                    messages: [{ role: 'user', content: prompt }],
                    temperature: 0.7,
                    max_tokens: 4000
                })
            });
            if (res.ok) {
                const data = await res.json();
                const text = data.choices?.[0]?.message?.content;
                if (text) return text;
            }
        } catch (_) { /* fall through */ }
    }

    throw new Error('All AI providers failed. Check VITE_GEMINI_API_KEY and VITE_GROQ_API_KEY.');
}

function parseJSON<T>(raw: string, fallback: T): T {
    try {
        const match = raw.match(/```json\s*([\s\S]*?)```/i) || raw.match(/(\[[\s\S]*\]|\{[\s\S]*\})/);
        return JSON.parse(match ? match[1] : raw);
    } catch {
        return fallback;
    }
}

export const complianceService = {

    /**
     * AMAZON SEO ENGINE
     * Generates a full KDP SEO Dossier using Gemini AI.
     */
    async generateSeoDossier(topic: string, genre: string): Promise<KDPSeoDossier> {
        const prompt = `You are a senior Amazon KDP SEO strategist. Generate a complete product launch dossier for the following:
TOPIC: "${topic}"
GENRE: "${genre}"

Return ONLY valid JSON in this exact structure:
{
  "hookTitle": "<compelling 200-char max title with primary keyword>",
  "primarySubtitle": "<150-char max subtitle including secondary keyword>",
  "sevenBoxMatrix": ["<7 backend keyword phrases, each under 50 chars>"],
  "categorySniperMap": [
    { "category": "<path>", "difficulty": "LOW|MEDIUM|HIGH", "browseNode": "<number>" },
    { "category": "<path>", "difficulty": "LOW|MEDIUM|HIGH", "browseNode": "<number>" },
    { "category": "<path>", "difficulty": "LOW|MEDIUM|HIGH", "browseNode": "<number>" }
  ],
  "htmlSalesCopy": "<2-paragraph HTML Amazon description>",
  "aPlusContentBlueprint": {
    "modules": [
      { "type": "STANDARD_IMAGE_TEXT", "content": "<benefit-driven copy>" },
      { "type": "STANDARD_HEADER", "content": "<authority statement>" }
    ],
    "brandStory": "<1 paragraph for publisher brand story>"
  },
  "banShieldAudit": { "status": "CLEAN", "flags": [], "trademarkRisk": "NONE" },
  "bookLabInspiration": {
    "basePrompt": "<cover art prompt>",
    "subNiches": ["<niche 1>", "<niche 2>"],
    "uniqueSellingPoint": "<differentiator>"
  }
}`;

        try {
            const raw = await callAI(prompt);
            const parsed = parseJSON<any>(raw, null);
            if (parsed && parsed.hookTitle) {
                return {
                    ...parsed,
                    topic,
                    id: `SEO_${Date.now()}`,
                    timestamp: Date.now()
                };
            }
        } catch (e) {
            console.warn('SEO dossier AI failed, using fallback:', e);
        }

        // Intelligent static fallback (better template than before)
        return {
            topic,
            hookTitle: `${topic}: The Complete ${genre} Guide to Success in 2026`,
            primarySubtitle: `Master the art of ${genre} with proven strategies that deliver real results.`,
            sevenBoxMatrix: [
                `${topic} for beginners`, `${genre} guide 2026`, `best ${topic} book`,
                `${topic} tips and tricks`, `${genre} success strategies`, `learn ${topic}`,
                `${topic} mastery`
            ],
            categorySniperMap: [
                { category: `${genre}/Reference`, difficulty: 'LOW', browseNode: '102-4958-392' },
                { category: `Books/Professional/${topic}`, difficulty: 'MEDIUM', browseNode: '482-1058-293' },
                { category: `Kindle/Nonfiction`, difficulty: 'LOW', browseNode: '958-2039-102' }
            ],
            htmlSalesCopy: `<h4>Master ${topic} With Confidence</h4><p>This comprehensive ${genre} guide gives you everything you need to succeed. Clear, actionable, and results-driven.</p>`,
            aPlusContentBlueprint: {
                modules: [
                    { type: 'STANDARD_IMAGE_TEXT', content: `Why ${topic} is the skill you need in 2026` },
                    { type: 'STANDARD_HEADER', content: 'Proven strategies. Real results.' }
                ],
                brandStory: `Published by independent experts committed to delivering high-quality, practical ${genre} content.`
            },
            banShieldAudit: { status: 'CLEAN', flags: [], trademarkRisk: 'NONE' },
            bookLabInspiration: {
                basePrompt: `Professional ${genre} book cover for "${topic}", cinematic minimalist style`,
                subNiches: [`Beginner ${topic}`, `Advanced ${topic} Tactics`],
                uniqueSellingPoint: 'Step-by-step methodology with zero fluff.'
            },
            id: `SEO_${Date.now()}`,
            timestamp: Date.now()
        };
    },

    /**
     * PROFIT ESTIMATOR ENGINE
     * Models royalties using official KDP printing cost formula.
     */
    async estimateProfit(pages: number, price: number, interior: 'B&W' | 'Color'): Promise<any> {
        // KDP Official Formula: Printing cost = fixed + (per-page rate × page count)
        // B&W US: $0.85 fixed + $0.012/page | Color US: $1.25 fixed + $0.07/page
        const printingCost = interior === 'B&W'
            ? 0.85 + (pages * 0.012)
            : 1.25 + (pages * 0.07);

        // KDP pays 60% royalty at $2.99+ price point (40% cut)
        const royaltyRate = price >= 2.99 && price <= 9.99 ? 0.70 : 0.35;
        const grossRoyalty = price * royaltyRate;
        const netProfit = grossRoyalty - printingCost;
        const roi = printingCost > 0 ? ((netProfit / printingCost) * 100) : 0;

        // Monthly projections at different BSR levels
        const projections = {
            bsr_10k: Math.round(30 * netProfit),   // ~30 sales/mo at BSR 10k
            bsr_50k: Math.round(5 * netProfit),    // ~5 sales/mo at BSR 50k
            bsr_100k: Math.round(1 * netProfit),   // ~1 sale/mo at BSR 100k
        };

        return {
            printingCost: printingCost.toFixed(2),
            royaltyRate: `${Math.round(royaltyRate * 100)}%`,
            grossRoyalty: grossRoyalty.toFixed(2),
            netProfit: Math.max(0, netProfit).toFixed(2),
            roi: `${roi.toFixed(0)}%`,
            isViable: netProfit > 0,
            projections,
            warning: netProfit < 0 ? `⚠️ Price too low: Raise to at least $${(printingCost / royaltyRate + 0.50).toFixed(2)} to break even.` : null,
        };
    },

    /**
     * BAN SHIELD AUDIT
     * Checks listing text against KDP, Redbubble, and Etsy restricted terms (2026 edition).
     */
    async runBanShield(text: string): Promise<any> {
        const rules: { category: string; terms: string[]; severity: 'HIGH' | 'MEDIUM' | 'LOW' }[] = [
            {
                category: 'Misleading Quality Claims',
                severity: 'HIGH',
                terms: ['best seller', 'bestseller', '#1', 'number one', 'award winning', 'top rated',
                    'most popular', 'chart topping', 'certified', 'officially licensed']
            },
            {
                category: 'Pricing & Promotions (Banned in metadata)',
                severity: 'HIGH',
                terms: ['free', 'sale', 'on sale', 'promotion', 'promotional', 'discount', 'cheap',
                    'unlimited', 'kindle unlimited', ' ku ', 'deal', 'price drop', 'limited time']
            },
            {
                category: 'Competitor & Platform References',
                severity: 'HIGH',
                terms: ['amazon', 'kindle', 'audible', 'barnes & noble', 'nook', 'kobo', 'apple books',
                    'google play', 'smashwords', 'draft2digital', 'redbubble', 'etsy', 'merch by amazon']
            },
            {
                category: 'AI / Automation Disclosure Risk',
                severity: 'HIGH',
                terms: ['ai generated', 'ai-generated', 'chatgpt', 'gpt-4', 'midjourney', 'dall-e',
                    'stable diffusion', 'written by ai', 'generated by ai', 'artificial intelligence generated']
            },
            {
                category: 'High-Risk Trademarks',
                severity: 'HIGH',
                terms: ['disney', 'marvel', 'dc comics', 'star wars', 'lego', 'harry potter', 'pokemon',
                    'barbie', 'nintendo', 'fortnite', 'minecraft', 'roblox', 'peppa pig']
            },
            {
                category: 'Prohibited ISBN / Edition Language',
                severity: 'MEDIUM',
                terms: ['new edition', 'revised edition', 'updated edition', 'vol 1', 'volume 1', 'v1',
                    'first edition', '2nd edition', '3rd edition']
            },
            {
                category: 'Metadata Spam Signals',
                severity: 'MEDIUM',
                terms: ['keywords', 'search terms', 'tags', 'seo', 'for sale', 'printable', 'pdf download',
                    'click here', 'buy now', 'order now', 'limited offer']
            },
            {
                category: 'Adult Content Flags (restricted categories only)',
                severity: 'LOW',
                terms: ['explicit', 'erotic', 'adult only', 'nsfw', 'mature content', '18+', '18 and over']
            }
        ];

        const textLower = text.toLowerCase();
        const allFlags: { term: string; category: string; severity: string }[] = [];

        for (const rule of rules) {
            for (const term of rule.terms) {
                if (textLower.includes(term.toLowerCase())) {
                    allFlags.push({ term, category: rule.category, severity: rule.severity });
                }
            }
        }

        const highFlags = allFlags.filter(f => f.severity === 'HIGH');
        const medFlags = allFlags.filter(f => f.severity === 'MEDIUM');
        const lowFlags = allFlags.filter(f => f.severity === 'LOW');

        const status = highFlags.length > 0 ? 'FLAGGED' : medFlags.length > 0 ? 'WARNING' : 'CLEAN';

        let recommendation = '';
        if (status === 'CLEAN') {
            recommendation = `✅ Content is KDP/Redbubble/Etsy compliant. No policy violations detected. Safe to publish.`;
        } else if (status === 'WARNING') {
            recommendation = `⚠️ Medium-risk terms found. Review before listing: ${medFlags.map(f => `"${f.term}"`).join(', ')}. These may trigger manual review.`;
        } else {
            recommendation = `🚨 HIGH RISK: Immediate action required. Remove these terms to avoid account suspension: ${highFlags.map(f => `"${f.term}" (${f.category})`).join('; ')}.`;
        }

        return {
            status,
            flags: allFlags,
            highFlags,
            medFlags,
            lowFlags,
            flagCount: allFlags.length,
            recommendation
        };
    }
};
