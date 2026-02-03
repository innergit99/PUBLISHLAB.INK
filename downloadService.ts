import { jsPDF } from 'jspdf';
import { KDPBlueprint } from './types';

export const downloadService = {
    /**
     * Download eBook Cover (Front Only, No Spine)
     */
    async downloadEbookCover(title: string, frontUrl: string) {
        // eBook requires High Res RGB Front Cover ONLY. No spine for Kindle.
        const link = document.createElement('a');
        link.href = frontUrl;
        link.download = `${title.replace(/\s+/g, '_')}_Kindle_Cover.png`;
        link.click();
    },

    /**
     * Download the full book as a PDF
     */
    async downloadFullBook(blueprint: KDPBlueprint) {
        // Lazy load jsPDF
        const doc = new jsPDF({
            unit: 'in',
            format: [6, 9] // Standard KDP Trim Size
        });

        const margin = 0.75;
        const pageWidth = 6;
        const pageHeight = 9;
        const contentWidth = pageWidth - (margin * 2);
        let cursorY = margin;
        let currentPage = 1;

        const addNewPage = () => {
            doc.addPage();
            currentPage++;
            cursorY = margin;
        };

        // Helper to load image
        const loadImage = (url: string) => new Promise<HTMLImageElement>((resolve, reject) => {
            const img = new Image();
            if (!url.startsWith('data:')) {
                img.crossOrigin = 'Anonymous';
            }
            img.onload = () => resolve(img);
            img.onerror = (e) => reject(e);
            img.src = url;
        });

        // 1. Title Page
        doc.setFont('times', 'bold');
        doc.setFontSize(36);
        // Wrap title if too long
        const titleLines = doc.splitTextToSize(blueprint.PROJECT_META.title_working || 'UNTITLED', contentWidth);
        doc.text(titleLines, pageWidth / 2, 3, { align: 'center' });

        doc.setFontSize(18);
        doc.setFont('times', 'italic');
        doc.text(`By ${blueprint.PROJECT_META.suggestedAuthor || 'Artisan AI'}`, pageWidth / 2, 4 + (titleLines.length * 0.5), { align: 'center' });

        doc.setFontSize(10);
        doc.setFont('times', 'normal');
        doc.text(`Published by ${blueprint.PROJECT_META.publisher_imprint || 'Artisan AI Genesis ∞'}`, pageWidth / 2, 8, { align: 'center' });

        // 2. Copyright Page
        addNewPage();
        cursorY = 2;
        doc.setFontSize(10);
        doc.setFont('times', 'normal');
        doc.text(`Copyright © ${blueprint.PROJECT_META.copyright_year || new Date().getFullYear()} ${blueprint.PROJECT_META.suggestedAuthor}.`, margin, cursorY);
        cursorY += 0.3;
        doc.text("All rights reserved.", margin, cursorY);
        cursorY += 0.5;

        const legalText = blueprint.PROJECT_META.primary_genre === 'NONFICTION'
            ? "This book is provided for informational purposes only. The author and publisher refrain from claiming any liability."
            : "This is a work of fiction. Names, characters, businesses, places, events, and incidents are either the products of the author’s imagination or used in a fictitious manner. Any resemblance to actual persons, living or dead, or actual events is purely coincidental.";

        const legalLines = doc.splitTextToSize(
            `No part of this book may be reproduced, distributed, or transmitted in any form or by any means, including photocopying, recording, or other electronic or mechanical methods, without the prior written permission of the publisher, except in the case of brief quotations embodied in critical reviews and certain other noncommercial uses permitted by copyright law.\n\n${legalText}`,
            contentWidth
        );
        doc.text(legalLines, margin, cursorY);
        cursorY += (legalLines.length * 0.2) + 0.5;

        doc.text(`Publisher: ${blueprint.PROJECT_META.publisher_imprint}`, margin, cursorY);
        cursorY += 0.3;

        if (blueprint.ISBN_SPEC.source === 'KDP') {
            doc.text("ISBN: Assign via KDP Dashboard", margin, cursorY);
        } else {
            doc.text("ISBN: [USER ISBN PENDING]", margin, cursorY);
        }
        cursorY += 0.3;

        // AI Disclosure
        doc.text("This work was created with the assistance of artificial intelligence tools and has been reviewed, edited, and curated by the author.", margin, cursorY);
        cursorY += 0.3;

        doc.text(`Printed in the ${navigator.language.split('-')[1] || 'US'}`, margin, cursorY);

        // 3. Layout Simulation (Calculate Page Numbers)
        let chPageMap: Record<number, number> = {};
        let simPage = 4; // Approx start

        // 4. Table of Contents
        addNewPage();
        doc.setFont('times', 'bold');
        doc.setFontSize(18);
        doc.text('Table of Contents', margin, cursorY);
        cursorY += 0.6;

        doc.setFontSize(12);
        doc.setFont('times', 'normal');
        // Placeholder TOC - we can't perfectly predict pages with images yet without double pass
        // but for now, we lists chapters.
        blueprint.INTERIOR_CONTENT.forEach((ch) => {
            doc.text(`Chapter ${ch.chapter}: ${ch.title}`, margin, cursorY);
            doc.text(`...`, pageWidth - margin, cursorY, { align: 'right' });
            cursorY += 0.25;
        });

        // 5. Chapters (ASYNC LOOP)
        for (const ch of blueprint.INTERIOR_CONTENT) {
            // Yield to main thread to prevent UI freeze
            await new Promise(r => setTimeout(r, 0));

            addNewPage();
            cursorY = margin + 0.5;

            // Heading
            doc.setFont('times', 'bold');
            doc.setFontSize(24);
            doc.text(`Chapter ${ch.chapter}`, margin, cursorY);
            cursorY += 0.4;

            doc.setFontSize(18);
            doc.setFont('times', 'italic');
            doc.text(ch.title, margin, cursorY);
            cursorY += 0.6;

            // --- IMAGE INJECTION ---
            if (ch.generatedImageUrl) {
                try {
                    const img = await loadImage(ch.generatedImageUrl);
                    // maintain aspect ratio
                    const imgRatio = img.width / img.height;
                    let drawWidth = 4.5; // Max width
                    let drawHeight = drawWidth / imgRatio;

                    if (drawHeight > 4) { // Max height constraint
                        drawHeight = 4;
                        drawWidth = drawHeight * imgRatio;
                    }

                    if (cursorY + drawHeight > pageHeight - margin) {
                        addNewPage();
                    }

                    // Center image
                    const xPos = margin + ((contentWidth - drawWidth) / 2);
                    doc.addImage(img, 'PNG', xPos, cursorY, drawWidth, drawHeight);
                    cursorY += drawHeight + 0.5;
                } catch (e) {
                    console.warn("Failed to embed image for PDF", e);
                }
            }
            // ------------------------

            // Content
            doc.setFont('times', 'normal');
            doc.setFontSize(12);

            const lines = doc.splitTextToSize(ch.content || 'Content pending...', contentWidth);
            lines.forEach((line: string) => {
                if (cursorY > pageHeight - margin) {
                    addNewPage();
                }
                doc.text(line, margin, cursorY);
                cursorY += 0.2;
            });
        }

        // 6. About the Author
        addNewPage();
        doc.setFont('times', 'bold');
        doc.setFontSize(18);
        doc.text("About the Author", margin, cursorY);
        cursorY += 0.5;
        doc.setFont('times', 'normal');
        doc.setFontSize(12);

        let navBio = blueprint.BOOK_STRUCTURE.end_matter.author_bio || "";
        if (!navBio || navBio.length < 10) {
            const author = blueprint.PROJECT_META.suggestedAuthor;
            navBio = `${author} is a storyteller crafting worlds in ${blueprint.PROJECT_META.primary_genre}.`;
        }

        const bioLines = doc.splitTextToSize(navBio, contentWidth);
        doc.text(bioLines, margin, cursorY);

        // Save
        const fileName = `${blueprint.PROJECT_META.title_working.replace(/\s+/g, '_')}_Manuscript.pdf`;
        doc.save(fileName);
    },

    /**
     * Download KDP Metadata as JSON
     */
    downloadMetadata(blueprint: KDPBlueprint) {
        const metadata = {
            project: {
                title: blueprint.PROJECT_META.title_working,
                subtitle: blueprint.PROJECT_META.series_info, // Assuming series info serves as subtitle proxy or add to interface
                author: blueprint.PROJECT_META.suggestedAuthor,
                genre: blueprint.PROJECT_META.primary_genre,
                description: blueprint.KDP_METADATA.long_description || blueprint.BACK_COVER_SPEC?.blurb_text
            },
            kdp_specs: {
                trim_size: blueprint.PROJECT_META.trim_size,
                interior_color: blueprint.PROJECT_META.interior_color,
                paper_type: "Cream/White",
                gloss_finish: "Matte"
            },
            keywords: blueprint.KDP_METADATA.keyword_phrases,
            categories: [
                blueprint.KDP_METADATA.primary_category,
                // blueprint.KDP_METADATA.secondary_category // Field missing in types.ts for now
            ],
            stats: {
                chapter_count: blueprint.INTERIOR_CONTENT.length,
                total_word_count: blueprint.INTERIOR_CONTENT.reduce((acc, ch) => acc + (ch.content?.split(/\s+/).length || 0), 0)
            }
        };

        const blob = new Blob([JSON.stringify(metadata, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${blueprint.PROJECT_META.title_working?.replace(/\s+/g, '_') || 'Book'}_KDP_Metadata.json`;
        a.click();
        URL.revokeObjectURL(url);
    },

    /**
     * Export the Cover as a PDF (High-Fidelity Industrial Wrap)
     */
    async downloadCoverPDF(title: string, author: string, frontUrl: string, backUrl: string, genre: string = "FICTION", pageCount: number = 100, blurb: string = "") {
        const { coverGenerator } = await import('./coverGenerator');

        // Always generate a fresh high-res full wrap from the source panels
        const fullWrapDataUrl = await coverGenerator.generateFullWrap({
            title,
            author,
            genre,
            pageCount,
            paperType: 'white',
            trimWidth: 6,
            trimHeight: 9,
            bleed: 0.125,
            blurb
        }, frontUrl, backUrl);

        const doc = new jsPDF({
            unit: 'in',
            format: [12.5, 9.25], // Full wrap size including bleed for 6x9
            orientation: 'landscape',
            compress: true
        });

        // Place the wrap image at full bleed size
        doc.addImage(fullWrapDataUrl, 'PNG', 0, 0, 12.5, 9.25);

        // Save
        doc.save(`${title.replace(/\s+/g, '_')}_FullCover.pdf`);
    },

    /**
     * Generic Download Image
     */
    async downloadImage(url: string, filename: string) {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = `${filename}_${Date.now()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
        } catch (e) {
            console.error("Download failed, using direct link", e);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${filename}.png`;
            link.click();
        }
    }
};
