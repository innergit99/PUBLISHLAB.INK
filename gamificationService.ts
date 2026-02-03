import { KDPBlueprint, KDPProject, KDPGenrePreset } from './types';
import { structureService } from './structureService';

export interface GamificationScore {
    total: number;
    level: 'NOVICE' | 'DRAFTER' | 'PUBLISHER' | 'KDP MASTER';
    breakdown: {
        technical: number; // Max 30
        content: number;   // Max 40
        market: number;    // Max 30
    };
    nextMilestone: string;
    badges: string[];
}

export class GamificationService {

    calculateScore(project: KDPProject, blueprint: KDPBlueprint): GamificationScore {
        let technical = 0;
        let content = 0;
        let market = 0;
        const badges: string[] = [];

        // 1. TECHNICAL SCORE (30 pts)
        if (project.trimSize && project.trimSize !== 'Variable') technical += 10;
        if (blueprint.COVER_SPEC.spine_text) technical += 5;
        if (project.interiorColor) technical += 5;
        // Validation check simulation (simplified)
        if (blueprint.QA_CHECKLIST && blueprint.QA_CHECKLIST.length > 0) technical += 10;

        // 2. CONTENT SCORE (40 pts)
        const wordCount = blueprint.INTERIOR_CONTENT.reduce((acc, ch) => acc + (ch.wordCount || (ch.content?.split(/\s+/).length || 0)), 0);
        const genre = structureService.getGenreLogic(project.genre);

        if (wordCount > 0) content += 5;
        if (wordCount >= (genre?.totalWordCount.min || 10000)) {
            content += 15;
            badges.push('Word Count Warrior');
        }
        if (blueprint.INTERIOR_CONTENT.length >= (genre?.estimatedPageCount.min || 20) / 10) content += 10; // Rough chapter heuristic
        if (blueprint.BOOK_STRUCTURE.front_matter.dedication_text) content += 5;
        if (blueprint.BOOK_STRUCTURE.end_matter.author_bio) content += 5;

        // 3. MARKET SCORE (30 pts)
        if (blueprint.BACK_COVER_SPEC.blurb_text && blueprint.BACK_COVER_SPEC.blurb_text.length > 50) {
            market += 15;
            badges.push('Copywriter');
        }
        if (blueprint.KDP_METADATA.keyword_phrases.length >= 5) {
            market += 10;
            badges.push('SEO Sniper');
        }
        if (blueprint.KDP_METADATA.primary_category) market += 5;

        const total = technical + content + market;

        let level: GamificationScore['level'] = 'NOVICE';
        if (total > 30) level = 'DRAFTER';
        if (total > 70) level = 'PUBLISHER';
        if (total >= 95) level = 'KDP MASTER';

        let nextMilestone = "Start Drafting";
        if (total > 10 && total <= 40) nextMilestone = "Complete Manuscript Draft";
        if (total > 40 && total <= 80) nextMilestone = "Generate Marketing Assets";
        if (total > 80 && total < 100) nextMilestone = "Final Polish & Upload";
        if (total === 100) nextMilestone = "Ready to Launch";

        return {
            total,
            level,
            breakdown: { technical, content, market },
            nextMilestone,
            badges
        };
    }
}

export const gamificationService = new GamificationService();
