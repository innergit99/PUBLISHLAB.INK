/**
 * KDP Advanced Skills System
 * Extends AI capabilities with specialized book writing tasks
 */

import { KDPBlueprint, KDPProject } from './types';
import { GeminiService } from './geminiService';

export interface CharacterProfile {
    name: string;
    role: 'protagonist' | 'antagonist' | 'supporting' | 'minor';
    age?: string;
    appearance: string;
    personality: string;
    background: string;
    motivation: string;
    arc: string;
    relationships: string[];
    firstAppearance: number; // chapter number
}

export interface ContinuityIssue {
    type: 'timeline' | 'character' | 'plot' | 'setting' | 'other';
    severity: 'critical' | 'moderate' | 'minor';
    chapter: number;
    description: string;
    suggestion: string;
}

export interface MarketingCopy {
    amazonDescription: string;
    shortBlurb: string;
    socialMediaPosts: string[];
    emailAnnouncement: string;
    keywords: string[];
    categories: string[];
}

export interface SeriesBible {
    seriesName: string;
    worldBuilding: {
        setting: string;
        rules: string[];
        locations: string[];
        timeline: string;
    };
    characters: CharacterProfile[];
    plotThreads: {
        resolved: string[];
        ongoing: string[];
        planned: string[];
    };
    continuityNotes: string[];
}

export class KDPSkills {
    private gemini: GeminiService;

    constructor() {
        this.gemini = new GeminiService();
    }

    /**
     * SKILL 1: Generate Character Profiles
     * Analyzes manuscript and creates detailed character sheets
     */
    async generateCharacterProfiles(blueprint: KDPBlueprint): Promise<CharacterProfile[]> {
        console.log('🎭 Generating character profiles...');

        // Collect all chapter content
        const fullText = blueprint.INTERIOR_CONTENT
            .map(ch => `Chapter ${ch.chapter}: ${ch.title}\n${ch.content}`)
            .join('\n\n');

        const prompt = `As "CHARACTER ARCHITECT", analyze this manuscript and create detailed character profiles.

MANUSCRIPT:
Title: "${blueprint.PROJECT_META.title_working}"
Genre: ${blueprint.PROJECT_META.primary_genre}

${fullText.substring(0, 10000)} // First 10k characters

TASK:
Create a JSON array of character profiles with this structure:
[{
  "name": "Character Name",
  "role": "protagonist|antagonist|supporting|minor",
  "age": "age or age range",
  "appearance": "physical description",
  "personality": "key traits and behaviors",
  "background": "relevant history",
  "motivation": "what drives them",
  "arc": "character development throughout story",
  "relationships": ["relationship to other characters"],
  "firstAppearance": chapter_number
}]

Focus on main and supporting characters. Output ONLY valid JSON.`;

        try {
            const response = await this.gemini['queryGemini'](prompt, true);
            const cleaned = this.gemini['cleanAndRepairJSON'](response);
            const profiles = JSON.parse(cleaned);

            if (Array.isArray(profiles) && profiles.length > 0) {
                console.log(`✅ Generated ${profiles.length} character profiles`);
                return profiles;
            }
        } catch (e) {
            console.error('Character profile generation failed:', e);
        }

        // Fallback: Basic profiles
        return [{
            name: 'Main Character',
            role: 'protagonist',
            appearance: 'To be developed',
            personality: 'To be developed',
            background: 'To be developed',
            motivation: 'To be developed',
            arc: 'To be developed',
            relationships: [],
            firstAppearance: 1
        }];
    }

    /**
     * SKILL 2: Check Story Continuity
     * Identifies plot holes, timeline issues, and inconsistencies
     */
    async checkContinuity(blueprint: KDPBlueprint): Promise<ContinuityIssue[]> {
        console.log('🔍 Checking story continuity...');

        const chapterSummaries = blueprint.INTERIOR_CONTENT
            .map(ch => `Chapter ${ch.chapter}: ${ch.title}\nSummary: ${ch.summary || ch.content?.substring(0, 200)}`)
            .join('\n\n');

        const prompt = `As "CONTINUITY EDITOR", analyze this story for consistency issues.

STORY OUTLINE:
${chapterSummaries}

TASK:
Identify continuity issues and output as JSON array:
[{
  "type": "timeline|character|plot|setting|other",
  "severity": "critical|moderate|minor",
  "chapter": chapter_number,
  "description": "what the issue is",
  "suggestion": "how to fix it"
}]

Look for:
- Timeline inconsistencies
- Character behavior contradictions
- Unresolved plot threads
- Setting/location errors
- Logic gaps

Output ONLY valid JSON.`;

        try {
            const response = await this.gemini['queryGemini'](prompt, true);
            const cleaned = this.gemini['cleanAndRepairJSON'](response);
            const issues = JSON.parse(cleaned);

            if (Array.isArray(issues)) {
                console.log(`✅ Found ${issues.length} continuity items`);
                return issues;
            }
        } catch (e) {
            console.error('Continuity check failed:', e);
        }

        return [];
    }

    /**
     * SKILL 3: Generate Marketing Copy
     * Creates all marketing materials for Amazon and social media
     */
    async generateMarketingCopy(blueprint: KDPBlueprint): Promise<MarketingCopy> {
        console.log('📢 Generating marketing copy...');

        const blurb = blueprint.BACK_COVER_SPEC.blurb_text;
        const genre = blueprint.PROJECT_META.primary_genre;
        const title = blueprint.PROJECT_META.title_working;

        const prompt = `As "MARKETING ARCHITECT", create comprehensive marketing copy for this book.

BOOK INFO:
Title: "${title}"
Genre: ${genre}
Back Cover Blurb: "${blurb}"

TASK:
Generate marketing materials as JSON:
{
  "amazonDescription": "500-word compelling Amazon description with HTML formatting",
  "shortBlurb": "One-sentence hook for ads",
  "socialMediaPosts": ["3 different social media posts"],
  "emailAnnouncement": "Email to readers announcing the book",
  "keywords": ["7 Amazon keywords"],
  "categories": ["3 Amazon categories"]
}

Make it conversion-optimized and genre-appropriate. Output ONLY valid JSON.`;

        try {
            const response = await this.gemini['queryGemini'](prompt, true);
            const cleaned = this.gemini['cleanAndRepairJSON'](response);
            const marketing = JSON.parse(cleaned);

            if (marketing.amazonDescription) {
                console.log('✅ Marketing copy generated');
                return marketing;
            }
        } catch (e) {
            console.error('Marketing generation failed:', e);
        }

        // Fallback
        return {
            amazonDescription: `<b>${title}</b><br><br>${blurb}<br><br>Perfect for fans of ${genre} fiction!`,
            shortBlurb: `${title} - A ${genre} adventure you won't forget.`,
            socialMediaPosts: [
                `📚 New release! ${title} is now available!`,
                `Excited to share my latest ${genre} novel: ${title}`,
                `If you love ${genre}, you'll love ${title}!`
            ],
            emailAnnouncement: `Dear Readers,\n\nI'm thrilled to announce my new book: ${title}!\n\n${blurb}\n\nAvailable now on Amazon!`,
            keywords: [genre, 'fiction', 'bestseller', 'new release', 'must read', 'page turner', 'book'],
            categories: [genre, 'Fiction', 'Literature']
        };
    }

    /**
     * SKILL 4: Create Series Bible
     * Maintains continuity across multiple books in a series
     */
    async createSeriesBible(
        blueprint: KDPBlueprint,
        seriesName: string,
        bookNumber: number
    ): Promise<SeriesBible> {
        console.log('📖 Creating series bible...');

        const fullText = blueprint.INTERIOR_CONTENT
            .map(ch => `${ch.title}: ${ch.summary || ch.content?.substring(0, 300)}`)
            .join('\n');

        const prompt = `As "SERIES ARCHITECT", create a series bible for tracking continuity.

SERIES: "${seriesName}" - Book ${bookNumber}
CURRENT BOOK: "${blueprint.PROJECT_META.title_working}"
GENRE: ${blueprint.PROJECT_META.primary_genre}

STORY SUMMARY:
${fullText}

TASK:
Create a series bible as JSON:
{
  "seriesName": "${seriesName}",
  "worldBuilding": {
    "setting": "where/when the series takes place",
    "rules": ["magic system, technology, society rules"],
    "locations": ["key places"],
    "timeline": "chronological events"
  },
  "characters": [/* main recurring characters */],
  "plotThreads": {
    "resolved": ["plot points resolved in this book"],
    "ongoing": ["continuing storylines"],
    "planned": ["future plot seeds"]
  },
  "continuityNotes": ["important facts to remember for future books"]
}

Output ONLY valid JSON.`;

        try {
            const response = await this.gemini['queryGemini'](prompt, true);
            const cleaned = this.gemini['cleanAndRepairJSON'](response);
            const bible = JSON.parse(cleaned);

            if (bible.seriesName) {
                console.log('✅ Series bible created');
                return bible;
            }
        } catch (e) {
            console.error('Series bible creation failed:', e);
        }

        // Fallback
        return {
            seriesName,
            worldBuilding: {
                setting: 'To be developed',
                rules: ['To be developed'],
                locations: ['To be developed'],
                timeline: 'To be developed'
            },
            characters: [],
            plotThreads: {
                resolved: [],
                ongoing: [],
                planned: []
            },
            continuityNotes: []
        };
    }

    /**
     * SKILL 5: Generate Reader Magnets
     * Creates bonus content to attract readers
     */
    async generateReaderMagnet(
        blueprint: KDPBlueprint,
        type: 'bonus-chapter' | 'character-interview' | 'behind-scenes' | 'prequel-scene'
    ): Promise<string> {
        console.log(`🎁 Generating ${type} reader magnet...`);

        const characters = blueprint.INTERIOR_CONTENT
            .slice(0, 3)
            .map(ch => ch.content)
            .join('\n')
            .match(/[A-Z][a-z]+ [A-Z][a-z]+/g)
            ?.slice(0, 3) || ['Main Character'];

        let prompt = '';

        switch (type) {
            case 'bonus-chapter':
                prompt = `Write a bonus chapter (1000 words) set after the events of "${blueprint.PROJECT_META.title_working}". Show what happens next for the main characters.`;
                break;
            case 'character-interview':
                prompt = `Create an interview with ${characters[0]} from "${blueprint.PROJECT_META.title_working}". Ask 10 questions about their experiences, motivations, and future plans. Make it feel authentic to the character.`;
                break;
            case 'behind-scenes':
                prompt = `Write a "behind the scenes" piece (800 words) about creating "${blueprint.PROJECT_META.title_working}". Discuss inspiration, research, character development, and interesting facts readers would enjoy.`;
                break;
            case 'prequel-scene':
                prompt = `Write a prequel scene (1000 words) showing ${characters[0]}'s life before the events of "${blueprint.PROJECT_META.title_working}". Provide context and backstory.`;
                break;
        }

        try {
            const content = await this.gemini['queryGemini'](prompt, false);
            console.log(`✅ ${type} generated`);
            return content;
        } catch (e) {
            console.error('Reader magnet generation failed:', e);
            return `[${type} content will be generated here]`;
        }
    }
}

export const kdpSkills = new KDPSkills();
