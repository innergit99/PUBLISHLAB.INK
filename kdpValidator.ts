// KDP Compliance Validator
// This module provides pre-flight checks before export to ensure KDP compliance

import { KDPBlueprint, KDPProject } from './types';

export interface ComplianceCheck {
    id: string;
    label: string;
    status: 'pass' | 'fail' | 'warning';
    message: string;
    blocking: boolean; // If true, prevents export
}

export interface ComplianceReport {
    checks: ComplianceCheck[];
    canExport: boolean;
    overallStatus: 'ready' | 'warnings' | 'blocked';
}

export class KDPComplianceValidator {

    validateProject(project: KDPProject, blueprint?: KDPBlueprint): ComplianceReport {
        const checks: ComplianceCheck[] = [];

        // CRITICAL CHECKS (Blocking)
        checks.push(this.checkTrimSize(project));
        checks.push(this.checkTitle(project));
        checks.push(this.checkAuthor(project));

        if (blueprint) {
            checks.push(this.checkMinimumContent(blueprint));
            checks.push(this.checkPageCount(blueprint));

            // NEW: INDUSTRIAL PRE-FLIGHT CHECKS
            checks.push(this.checkPlaceholderText(blueprint));
            checks.push(this.checkAIHallucinations(blueprint));
            checks.push(this.checkContentIntegrity(blueprint));

            // WARNING CHECKS (Non-blocking)
            checks.push(this.checkWordCount(blueprint, project));
            checks.push(this.checkCopyright(blueprint));
            checks.push(this.checkCovers(blueprint));
            checks.push(this.checkAIDisclosure(project));
        }

        const hasBlockingFailures = checks.some(c => c.blocking && c.status === 'fail');
        const hasWarnings = checks.some(c => c.status === 'warning');

        return {
            checks,
            canExport: !hasBlockingFailures,
            overallStatus: hasBlockingFailures ? 'blocked' : hasWarnings ? 'warnings' : 'ready'
        };
    }

    private checkTrimSize(project: KDPProject): ComplianceCheck {
        const validTrimSizes = [
            '5" x 8"',
            '5.25" x 8"',
            '5.5" x 8.5"',
            '6" x 9" (Standard)',
            '7" x 10"',
            '8" x 10"',
            '8.25" x 11"',
            '8.5" x 8.5" (Square)',
            '8.5" x 11" (Letter)'
        ];

        const isValid = validTrimSizes.includes(project.trimSize);

        return {
            id: 'trim_size',
            label: 'Trim Size',
            status: isValid ? 'pass' : 'fail',
            message: isValid ? `${project.trimSize} (KDP Approved)` : `Invalid trim size: ${project.trimSize}`,
            blocking: true
        };
    }

    private checkTitle(project: KDPProject): ComplianceCheck {
        const hasTitle = project.title && project.title.trim().length > 0;

        return {
            id: 'title',
            label: 'Book Title',
            status: hasTitle ? 'pass' : 'fail',
            message: hasTitle ? 'Present' : 'Missing - title is required',
            blocking: true
        };
    }

    private checkAuthor(project: KDPProject): ComplianceCheck {
        const hasAuthor = project.author && project.author.trim().length > 0;

        return {
            id: 'author',
            label: 'Author Name',
            status: hasAuthor ? 'pass' : 'fail',
            message: hasAuthor ? 'Present' : 'Missing - author name is required',
            blocking: true
        };
    }

    private checkMinimumContent(blueprint: KDPBlueprint): ComplianceCheck {
        const hasContent = blueprint.INTERIOR_CONTENT.some(ch =>
            ch.content && ch.content.trim().length > 100
        );

        return {
            id: 'content',
            label: 'Chapter Content',
            status: hasContent ? 'pass' : 'fail',
            message: hasContent
                ? `${blueprint.INTERIOR_CONTENT.length} chapters`
                : 'No substantial content generated',
            blocking: true
        };
    }

    private checkPlaceholderText(blueprint: KDPBlueprint): ComplianceCheck {
        const placeholders = ['lorem ipsum', '[insert', 'content here', 'chapter text goes'];
        let found = false;

        for (const ch of blueprint.INTERIOR_CONTENT) {
            const lowContent = (ch.content || '').toLowerCase();
            if (placeholders.some(p => lowContent.includes(p))) {
                found = true;
                break;
            }
        }

        return {
            id: 'placeholders',
            label: 'Placeholder Audit',
            status: found ? 'fail' : 'pass',
            message: found ? 'Placeholder text detected ([...])' : 'No placeholders found',
            blocking: true
        };
    }

    private checkAIHallucinations(blueprint: KDPBlueprint): ComplianceCheck {
        const signs = ['as an ai', 'i am a large language', 'sorry, but i cannot', 'my knowledge cutoff'];
        let found = false;

        for (const ch of blueprint.INTERIOR_CONTENT) {
            const lowContent = (ch.content || '').toLowerCase();
            if (signs.some(s => lowContent.includes(s))) {
                found = true;
                break;
            }
        }

        return {
            id: 'ai_hallucination',
            label: 'AI Integrity',
            status: found ? 'fail' : 'pass',
            message: found ? 'AI internal logs detected' : 'Clean industrial narration',
            blocking: true
        };
    }

    private checkContentIntegrity(blueprint: KDPBlueprint): ComplianceCheck {
        // Check if chapters end abruptly (not ending with . ! ? " or )
        const brokenChapters: string[] = [];

        for (const ch of blueprint.INTERIOR_CONTENT) {
            if (!ch.content) continue;
            const lastChar = ch.content.trim().slice(-1);
            if (!['.', '!', '?', '"', ')'].includes(lastChar)) {
                brokenChapters.push(ch.chapter.toString());
            }
        }

        const broken = brokenChapters.length > 0;

        return {
            id: 'content_integrity',
            label: 'Narrative Sink',
            status: broken ? 'warning' : 'pass',
            message: broken
                ? `Potential cut-off detected in Ch: ${brokenChapters.join(', ')}`
                : 'Chapters closed correctly',
            blocking: false
        };
    }

    private checkPageCount(blueprint: KDPBlueprint): ComplianceCheck {
        const totalWords = blueprint.INTERIOR_CONTENT.reduce(
            (acc, ch) => acc + (ch.content?.split(/\s+/).length || 0),
            0
        );
        const estimatedPages = Math.ceil(totalWords / 250) + 10;

        const meetsMinimum = estimatedPages >= 24;

        return {
            id: 'page_count',
            label: 'Page Count',
            status: meetsMinimum ? 'pass' : 'fail',
            message: meetsMinimum
                ? `~${estimatedPages} pages (Minimum met)`
                : `~${estimatedPages} pages (KDP requires minimum 24)`,
            blocking: true
        };
    }

    private checkWordCount(blueprint: KDPBlueprint, project: KDPProject): ComplianceCheck {
        const totalWords = blueprint.INTERIOR_CONTENT.reduce(
            (acc, ch) => acc + (ch.content?.split(/\s+/).length || 0),
            0
        );

        const genreExpectations: Record<string, { min: number; max: number }> = {
            'ROMANCE': { min: 50000, max: 90000 },
            'MYSTERY': { min: 60000, max: 100000 },
            'THRILLER': { min: 60000, max: 100000 },
            'FANTASY': { min: 80000, max: 150000 },
            'SCI-FI': { min: 70000, max: 120000 },
            'BUSINESS': { min: 30000, max: 70000 },
            'SELF-HELP': { min: 25000, max: 60000 }
        };

        const genre = project.genre.toUpperCase();
        const genreKey = Object.keys(genreExpectations).find(k => genre.includes(k));
        const expectations = genreKey ? genreExpectations[genreKey] : { min: 20000, max: 100000 };

        const inRange = totalWords >= expectations.min && totalWords <= expectations.max;

        return {
            id: 'word_count',
            label: 'Word Count',
            status: inRange ? 'pass' : 'warning',
            message: inRange
                ? `${totalWords.toLocaleString()} words`
                : `${totalWords.toLocaleString()} words (Exp: ${Math.floor(expectations.min / 1000)}k+)`,
            blocking: false
        };
    }

    private checkCopyright(blueprint: KDPBlueprint): ComplianceCheck {
        const hasCopyright = blueprint.BOOK_STRUCTURE.front_matter.copyright_page_text &&
            blueprint.BOOK_STRUCTURE.front_matter.copyright_page_text.includes('Copyright');

        return {
            id: 'copyright',
            label: 'Legal Notice',
            status: hasCopyright ? 'pass' : 'warning',
            message: hasCopyright ? 'Copyright page active' : 'Copyright missing',
            blocking: false
        };
    }

    private checkCovers(blueprint: KDPBlueprint): ComplianceCheck {
        const hasFront = !!blueprint.COVER_SPEC.ebook_url;
        const hasBack = !!blueprint.COVER_SPEC.full_wrap_url;

        return {
            id: 'covers',
            label: 'Cover Stack',
            status: (hasFront && hasBack) ? 'pass' : 'warning',
            message: hasFront && hasBack
                ? 'Front & Back covers ready'
                : 'Cover generation incomplete',
            blocking: false
        };
    }

    private checkAIDisclosure(project: KDPProject): ComplianceCheck {
        return {
            id: 'ai_disclosure',
            label: 'AI Disclosure',
            status: 'warning',
            message: 'Must disclose AI usage during upload',
            blocking: false
        };
    }
}

export const kdpValidator = new KDPComplianceValidator();
