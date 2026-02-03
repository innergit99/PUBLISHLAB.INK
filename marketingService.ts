import { KDPProject, KDPGenrePreset } from './types';
import { structureService } from './structureService';

interface MarketingAsset {
    blurb: string;
    keywords: string[];
    categories: string[];
    hook: string;
}

export class MarketingService {

    /**
     * Generates a "Best Seller" style blurb based on genre hooks
     */
    generateBlurb(project: KDPProject): string {
        const genre = structureService.getGenreLogic(project.genre);
        const title = project.title || "Untitled Masterpiece";

        // Template Logic based on Genre
        if (project.genre.includes('ROMANCE')) {
            return `In the heart of a world torn apart, ${title} weaves a tale of forbidden desire.\n\n` +
                `She was looking for ${genre.emotionalCore}. He was hiding from his past. ` +
                `When their worlds collide, the heat is undeniable, but secrets threaten to tear them apart.\n\n` +
                `Can love survive the ultimate test? Discover the passion that readers are calling "unforgettable."`;
        }

        if (project.genre.includes('THRILLER') || project.genre.includes('MYSTERY')) {
            return `Some secrets should stay buried. ${title} proves why.\n\n` +
                `It started with a simple ${genre.sensoryAnchors[0]}. But when the evidence points to the impossible, ` +
                `the truth becomes the most dangerous weapon of all.\n\n` +
                `With time running out and the stakes rising, one thing is certain: nothing is what it seems. ` +
                `Prepare for the twist that will leave you breathless.`;
        }

        if (project.genre.includes('FANTASY')) {
            return `A kingdom in peril. A power awakened. ${title} begins the saga.\n\n` +
                `In a realm defined by ${genre.sensoryAnchors[0]}, destiny calls to the unworthy. ` +
                `The ancient prophecy has returned, and with it, a darkness that threatens to consume everything.\n\n` +
                `Will the sacrifice be enough? Enter a world of magic, betrayal, and ${genre.emotionalCore}.`;
        }

        // Default / Non-Fiction
        return `Unlock the secrets of ${title}.\n\n` +
            `In this groundbreaking guide, discover the strategies to master your life. ` +
            `Based on the core principle of ${genre.emotionalCore}, this book provides the roadmap you've been waiting for.\n\n` +
            `Don't just read about success. Live it.`;
    }

    /**
     * Generates 7 High-Traffic Keyword Phrases (Amazon SEO limit)
     */
    generateKeywords(project: KDPProject): string[] {
        const base = [
            `${project.genre} books for ${project.audience.toLowerCase()}`,
            `best selling ${project.genre} novel`,
            `${project.title} book series`
        ];

        if (project.interiorColor === 'Color') {
            base.push('illustrated edition');
            base.push('full color interior');
        }

        // Add emotional anchors as keywords
        const logic = structureService.getGenreLogic(project.genre);
        if (logic) {
            base.push(`${logic.emotionalCore.split(' ')[0]} stories`);
            base.push(`${project.genre} with ${logic.sensoryAnchors[0]}`);
        }

        // Fill to 7
        while (base.length < 7) {
            base.push(`${project.genre} new release 2026`);
        }

        return base.slice(0, 7);
    }

    /**
     * Suggests Browse Nodes (Categories)
     */
    generateCategories(project: KDPProject): string[] {
        const g = project.genre.toUpperCase();
        if (g.includes('ROMANCE')) return ['Books > Romance > Contemporary', 'Books > Romance > New Adult'];
        if (g.includes('THRILLER')) return ['Books > Mystery, Thriller & Suspense > Psychological Thriller', 'Books > Mystery, Thriller & Suspense > Crime'];
        if (g.includes('FANTASY')) return ['Books > Sci-Fi & Fantasy > Fantasy > Epic', 'Books > Sci-Fi & Fantasy > Fantasy > Sword & Sorcery'];
        if (g.includes('CHILDREN')) return ['Books > Children\'s Books > Animals', 'Books > Children\'s Books > Early Learning'];

        return ['Books > Literature & Fiction > Genre Fiction'];
    }

    /**
     * Full Marketing Deck Generation
     */
    generateMarketingDeck(project: KDPProject): MarketingAsset {
        return {
            blurb: this.generateBlurb(project),
            keywords: this.generateKeywords(project),
            categories: this.generateCategories(project),
            hook: `The must-read ${project.genre} of 2026.`
        };
    }
}

export const marketingService = new MarketingService();
