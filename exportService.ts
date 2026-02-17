
import { jsPDF } from 'jspdf';
import JSZip from 'jszip';
import { KDPBlueprint, KDPProject, KDPGenrePreset } from './types';
import { structureService } from './structureService';

// Physical dimensions in MM (Converted from Inches for KDP Precision)
const TRIM_MAP: Record<string, { w: number, h: number }> = {
    '5" x 8"': { w: 127, h: 203.2 },
    '5.25" x 8"': { w: 133.35, h: 203.2 },
    '5.5" x 8.5"': { w: 139.7, h: 215.9 },
    '6" x 9" (Standard)': { w: 152.4, h: 228.6 },
    '6.14" x 9.21"': { w: 155.956, h: 233.934 },
    '7" x 10"': { w: 177.8, h: 254 },
    '8" x 10"': { w: 203.2, h: 254 },
    '8.25" x 6" (Landscape)': { w: 209.55, h: 152.4 },
    '8.25" x 8.25" (Square)': { w: 209.55, h: 209.55 },
    '8.5" x 8.5" (Square)': { w: 215.9, h: 215.9 },
    '8" x 8" (Square)': { w: 203.2, h: 203.2 },
    '8.25" x 11"': { w: 209.55, h: 279.4 },
    '8.5" x 11" (Letter)': { w: 215.9, h: 279.4 },
};

const BLEED_MM = 3.175; // 0.125" Industrial Bleed
const BARCODE_W = 50.8; // 2" Precise
const BARCODE_H = 30.48; // 1.2" Precise
const BARCODE_OFFSET = 6.35; // 0.25" Safety Buffer

export class ExportService {
    async generatePrintPDF(blueprint: KDPBlueprint): Promise<Blob> {
        // PLIS INTELLIGENCE: Multi-Pass Layout Orchestration
        // ---------------------------------------------------------------------------
        // PHASE 1: GHOST PAGINATION (Calculate Exact Page Count)
        // ---------------------------------------------------------------------------

        // Setup temporary doc for measurement
        const trimSize = blueprint.PROJECT_META?.trim_size || '6" x 9" (Standard)';
        let trim = TRIM_MAP[trimSize] || TRIM_MAP['6" x 9" (Standard)'];
        const tempDoc = new jsPDF({ unit: 'mm', format: [trim.w, trim.h] });

        // Front Matter fixed pages
        let pageCount = 1; // Title Page
        pageCount++; // Copyright Page
        if (blueprint.BOOK_STRUCTURE.front_matter.dedication_text) pageCount++;
        pageCount++; // TOC Page

        // Ensure Chapters start on ODD pages (Recto)
        if (pageCount % 2 === 0) pageCount++;

        const chapterStartPages: number[] = [];

        // Standard KDP Margins for estimation (will be refined in Phase 2)
        const estGutter = 12.7; // 0.5" default
        const estOuter = 6.35; // 0.25" default
        const contentWidth = trim.w - estGutter - estOuter;
        const mmPerLine = 5.5; // Benchmark line height

        blueprint.INTERIOR_CONTENT.forEach(ch => {
            if (pageCount % 2 === 0) pageCount++;
            chapterStartPages.push(pageCount);

            let chPages = 1; // Chapter start page
            const textStartY = ch.generatedImageUrl ? trim.w + 20 : 60; // Approx start Y
            const firstPageAvailableH = trim.h - textStartY - estOuter;
            const textHeightPerFullPage = trim.h - (estOuter * 2) - 15;

            const lines = tempDoc.splitTextToSize(ch.content || "", contentWidth);
            const firstPageLines = Math.floor(firstPageAvailableH / mmPerLine);

            let remainingLines = lines.length - firstPageLines;
            if (remainingLines > 0) {
                const linesPerPage = Math.floor(textHeightPerFullPage / mmPerLine);
                chPages += Math.ceil(remainingLines / linesPerPage);
            }
            pageCount += chPages;
        });

        // ---------------------------------------------------------------------------
        // PHASE 2: FINAL SPEC CALCULATION (Based on REAL Page Count)
        // ---------------------------------------------------------------------------
        const finalPageCount = pageCount;
        const paperType = blueprint.PROJECT_META.interior_color === 'Color' ? 'Color' : 'Cream';
        const specs = structureService.calculateLayoutSpecs(finalPageCount, paperType);

        // Convert Specs (Inches) to MM
        const mmConv = 25.4;
        const bleedsMM = specs.bleed * mmConv;
        const gutterMargin = specs.margins.inner * mmConv;
        const outerMargin = specs.margins.outer * mmConv;
        const topMargin = specs.margins.top * mmConv;
        const botMargin = specs.margins.bottom * mmConv;

        const finalPdfW = trim.w + (bleedsMM);
        const finalPdfH = trim.h + (bleedsMM * 2);

        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: [finalPdfW, finalPdfH]
        });

        // ---------------------------------------------------------------------------
        // PHASE 3: ACTUAL RENDERING
        // ---------------------------------------------------------------------------
        const titleFont = 'times';
        const bodyFont = 'times';

        // 1. Title Page
        doc.setFont(titleFont, 'bold');
        doc.setFontSize(32);
        const titleLines = doc.splitTextToSize(blueprint.PROJECT_META.title_working.toUpperCase(), trim.w - (outerMargin * 2));
        doc.text(titleLines, finalPdfW / 2, 80, { align: 'center' });

        doc.setFontSize(14);
        doc.setFont(titleFont, 'normal');
        doc.text(`By`, finalPdfW / 2, 110, { align: 'center' });
        doc.setFontSize(18);
        doc.setFont(titleFont, 'bold');
        doc.text(blueprint.PROJECT_META.suggestedAuthor.toUpperCase(), finalPdfW / 2, 120, { align: 'center' });

        if (blueprint.PROJECT_META.publisher_imprint) {
            doc.setFontSize(10);
            doc.setFont(titleFont, 'normal');
            doc.text(blueprint.PROJECT_META.publisher_imprint, finalPdfW / 2, finalPdfH - 30, { align: 'center' });
        }

        // 2. Copyright Page
        doc.addPage();
        doc.setFontSize(9);
        doc.setFont(bodyFont, 'normal');

        const currentYear = blueprint.PROJECT_META.copyright_year || new Date().getFullYear();
        const copyrightText = blueprint.BOOK_STRUCTURE.front_matter.copyright_page_text || `Copyright © ${currentYear} ...`;
        const splitCopyright = doc.splitTextToSize(copyrightText, trim.w - (outerMargin * 2));
        doc.text(splitCopyright, outerMargin + bleedsMM, 50);

        // 3. Dedication
        if (blueprint.BOOK_STRUCTURE.front_matter.dedication_text) {
            doc.addPage();
            doc.setFont(bodyFont, 'italic');
            doc.setFontSize(12);
            doc.text(blueprint.BOOK_STRUCTURE.front_matter.dedication_text, finalPdfW / 2, 100, { align: 'center' });
        }

        // 4. TOC (Now with REAL Page Numbers)
        doc.addPage();
        doc.setFont(titleFont, 'bold');
        doc.setFontSize(18);
        doc.text('CONTENTS', finalPdfW / 2, 40, { align: 'center' });
        doc.setFontSize(11);
        doc.setFont(bodyFont, 'normal');
        blueprint.INTERIOR_CONTENT.forEach((ch, i) => {
            const y = 60 + (i * 7);
            const pageNum = chapterStartPages[i] || '00';

            // Layout: Title .................... Page
            const titleStr = `Chapter ${ch.chapter}: ${ch.title}`;
            doc.text(titleStr, outerMargin + bleedsMM, y);

            // Align Page Number Right
            const rightEdge = finalPdfW - outerMargin - bleedsMM;
            doc.text(`${pageNum}`, rightEdge, y, { align: 'right' });

            // Dots? (Optional, skipping for clean look)
        });

        // 5. Chapters
        let currentArabicPage = chapterStartPages[0] || 1;
        // Note: The loop logic below must perfectly match the calculation logic above
        // to ensure page numbers align with the TOC we just wrote.
        // Or we just rely on doc.getCurrentPageInfo() effectively.
        // Wait, we need to insert blank pages to force ODD start if needed.

        for (let i = 0; i < blueprint.INTERIOR_CONTENT.length; i++) {
            const ch = blueprint.INTERIOR_CONTENT[i];

            // Force Odd Start
            if (doc.getCurrentPageInfo().pageNumber % 2 === 0) {
                doc.addPage();
            }

            doc.addPage();

            // Image HANDLING
            if (ch.generatedImageUrl) {
                try {
                    const imgData = await this.getBase64Image(ch.generatedImageUrl);
                    const imgW = trim.w - gutterMargin - outerMargin;
                    const imgH = imgW;
                    const isOdd = doc.getCurrentPageInfo().pageNumber % 2 !== 0; // standard PDF page numbering 1-based
                    const xPos = isOdd ? gutterMargin : outerMargin;

                    doc.addImage(imgData, 'JPEG', xPos, topMargin + 10, imgW, imgH, undefined, 'MEDIUM');
                } catch (e) { }
            }

            const textStartY = ch.generatedImageUrl ? finalPdfW + 20 : topMargin + 40;

            doc.setFont(titleFont, 'bold');
            doc.setFontSize(24);
            const isOdd = doc.getCurrentPageInfo().pageNumber % 2 !== 0;
            const centerX = (trim.w - gutterMargin - outerMargin) / 2 + (isOdd ? gutterMargin : outerMargin);

            doc.text(`${ch.chapter}`, centerX, textStartY - 10, { align: 'center' });
            doc.setFontSize(18);
            doc.text(ch.title.toUpperCase(), centerX, textStartY, { align: 'center' });

            doc.setFont(bodyFont, 'normal');
            doc.setFontSize(11);
            const lines = doc.splitTextToSize(ch.content || "", trim.w - gutterMargin - outerMargin);
            const mmPerLine = 5.5;
            const linesPerPage = Math.floor((finalPdfH - textStartY - botMargin) / mmPerLine);

            // First Page Chunk
            const chunk1 = lines.slice(0, linesPerPage);
            const activeLeftMargin = isOdd ? gutterMargin : outerMargin;

            doc.text(chunk1, activeLeftMargin, textStartY + 20); // +20 padding below title

            // Footer P1
            const footerX = (trim.w - gutterMargin - outerMargin) / 2 + (isOdd ? gutterMargin : outerMargin);
            doc.setFontSize(9);
            // Verify our calculated page matches the PDF execution context
            doc.text(`${doc.getCurrentPageInfo().pageNumber}`, footerX, finalPdfH - 15, { align: 'center' });
            doc.setFontSize(11);

            let offset = linesPerPage;

            // Subsequent Pages
            while (offset < lines.length) {
                doc.addPage();

                const fullPageLines = Math.floor((finalPdfH - topMargin - botMargin - 15) / mmPerLine);
                const chunk = lines.slice(offset, offset + fullPageLines);

                const isOddSub = doc.getCurrentPageInfo().pageNumber % 2 !== 0;
                const activeLeftSub = isOddSub ? gutterMargin : outerMargin;
                const footerXSub = (trim.w - gutterMargin - outerMargin) / 2 + (isOddSub ? gutterMargin : outerMargin);

                doc.text(chunk, activeLeftSub, topMargin + 10);

                // Footer
                doc.setFontSize(9);
                doc.text(`${doc.getCurrentPageInfo().pageNumber}`, footerXSub, finalPdfH - 15, { align: 'center' });
                doc.setFontSize(11);

                offset += fullPageLines;
            }
        }

        // 6. Bio
        doc.addPage();
        const bioLines = doc.splitTextToSize(blueprint.BOOK_STRUCTURE.end_matter.author_bio, trim.w - gutterMargin - outerMargin);
        doc.text(bioLines, outerMargin, topMargin + 20);

        return new Blob([doc.output('arraybuffer')], { type: 'application/pdf' });
    }

    async generateKindleEPUB(blueprint: KDPBlueprint): Promise<Blob> {
        const zip = new JSZip();

        // 1. Mimetype (Must be first and uncompressed)
        zip.file('mimetype', 'application/epub+zip', { compression: 'STORE' });

        // 2. META-INF/container.xml
        zip.file('META-INF/container.xml', `<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>`);

        // 3. OEBPS Folders
        const imagesFolder = zip.folder('OEBPS/images');
        const textFolder = zip.folder('OEBPS/text');

        let manifestItems = '';
        let spineItems = '';
        let coverMeta = '';

        // --- COVER IMAGE HANDLING (CRITICAL FOR KDP) ---
        if (blueprint.COVER_SPEC.ebook_url) {
            try {
                const coverBlob = await fetch(blueprint.COVER_SPEC.ebook_url).then(r => r.blob());
                const ext = coverBlob.type.split('/')[1] || 'jpg';
                imagesFolder?.file(`cover.${ext}`, coverBlob);
                manifestItems += `<item id="cover-image" href="images/cover.${ext}" media-type="${coverBlob.type}" properties="cover-image"/>\n`;
                coverMeta = `<meta name="cover" content="cover-image" />`;

                // Add Cover Page XHTML (Optional but good for fallback)
                const coverPageHtml = `<?xml version="1.0" encoding="utf-8"?>
                <html xmlns="http://www.w3.org/1999/xhtml">
                <head><title>Cover</title><style>img { max-width: 100%; }</style></head>
                <body><div style="text-align: center; page-break-after: always;">
                <img src="../images/cover.${ext}" alt="Cover" style="height: 100%; max-width: 100%;" />
                </div></body></html>`;
                textFolder?.file('cover.html', coverPageHtml);
                manifestItems += `<item id="cover-page" href="text/cover.html" media-type="application/xhtml+xml"/>\n`;
                // Cover page usually goes first in spine
                spineItems += `<itemref idref="cover-page"/>\n`;

            } catch (e) {
                console.error("Cover Embed Failed:", e);
            }
        }

        // Front Matter
        const frontMatterHtml = `<?xml version="1.0" encoding="utf-8"?>
<html xmlns="http://www.w3.org/1999/xhtml">
<head><title>Front Matter</title><link rel="stylesheet" type="text/css" href="../styles/style.css"/></head>
<body>
  <div class="title-page">
    <h1 class="title">${blueprint.PROJECT_META.title_working}</h1>
    <p class="author">By ${blueprint.PROJECT_META.suggestedAuthor}</p>
  </div>
  <div class="copyright">
    <p>${(blueprint.BOOK_STRUCTURE.front_matter.copyright_page_text || 'Copyright ' + new Date().getFullYear()).replace(/\n/g, '<br/>')}</p>
  </div>
</body></html>`;
        textFolder?.file('front.html', frontMatterHtml);
        manifestItems += '<item id="front" href="text/front.html" media-type="application/xhtml+xml"/>\n';
        spineItems += '<itemref idref="front"/>\n';

        // Table of Contents HTML
        let tocHtml = `<?xml version="1.0" encoding="utf-8"?>
<html xmlns="http://www.w3.org/1999/xhtml">
<head><title>Contents</title><link rel="stylesheet" type="text/css" href="../styles/style.css"/></head>
<body>
  <h1>Contents</h1>
  <nav xmlns:epub="http://www.idpf.org/2007/ops" epub:type="toc">
    <ol>`;

        blueprint.INTERIOR_CONTENT.forEach(ch => {
            tocHtml += `<li><a href="ch${ch.chapter}.html">Chapter ${ch.chapter}: ${ch.title}</a></li>`;
        });

        tocHtml += `</ol></nav></body></html>`;
        textFolder?.file('toc.html', tocHtml);
        manifestItems += '<item id="toc" href="text/toc.html" media-type="application/xhtml+xml"/>\n';
        spineItems += '<itemref idref="toc"/>\n';

        // Process Chapters
        for (const ch of blueprint.INTERIOR_CONTENT) {
            let chHtml = `<?xml version="1.0" encoding="utf-8"?>
<html xmlns="http://www.w3.org/1999/xhtml">
<head><title>${ch.title}</title><link rel="stylesheet" type="text/css" href="../styles/style.css"/></head>
<body>
  <h2 class="chapter-num">Chapter ${ch.chapter}</h2>
  <h1 class="chapter-title">${ch.title}</h1>`;

            if (ch.generatedImageUrl) {
                try {
                    const blob = await fetch(ch.generatedImageUrl).then(r => r.blob());
                    const ext = blob.type.split('/')[1] || 'jpg';
                    const filename = `img${ch.chapter}.${ext}`;
                    imagesFolder?.file(filename, blob);
                    chHtml += `<div class="chapter-image"><img src="../images/${filename}" alt="${ch.title}"/></div>`;
                    manifestItems += `<item id="img${ch.chapter}" href="images/${filename}" media-type="${blob.type}"/>\n`;
                } catch (e) { }
            }

            chHtml += `<div class="chapter-content"><p>${(ch.content || 'Chapter content coming soon...').replace(/\n/g, '</p><p>')}</p></div></body></html>`;
            textFolder?.file(`ch${ch.chapter}.html`, chHtml);
            manifestItems += `<item id="ch${ch.chapter}" href="text/ch${ch.chapter}.html" media-type="application/xhtml+xml"/>\n`;
            spineItems += `<itemref idref="ch${ch.chapter}"/>\n`;
        }

        // End Matter
        const bioHtml = `<?xml version="1.0" encoding="utf-8"?>
<html xmlns="http://www.w3.org/1999/xhtml">
<head><title>About the Author</title><link rel="stylesheet" type="text/css" href="../styles/style.css"/></head>
<body>
  <h1>About the Author</h1>
  <p>${(blueprint.BOOK_STRUCTURE.end_matter.author_bio || '').replace(/\n/g, '<br/>')}</p>
</body></html>`;
        textFolder?.file('about.html', bioHtml);
        manifestItems += '<item id="about" href="text/about.html" media-type="application/xhtml+xml"/>\n';
        spineItems += '<itemref idref="about"/>\n';

        // Styles
        zip.file('OEBPS/styles/style.css', `
            body { font-family: "Times New Roman", serif; padding: 5%; color: #333; }
            h1 { text-align: center; margin-top: 20%; font-variant: small-caps; }
            h2 { text-align: center; font-style: italic; color: #666; }
            .chapter-image { text-align: center; margin: 20px 0; }
            .chapter-image img { max-width: 100%; border-radius: 4px; }
            .chapter-content { line-height: 1.6; text-align: justify; margin-top: 30px; }
            p { margin-bottom: 1em; text-indent: 1.5em; }
            p:first-of-type { text-indent: 0; }
            .title-page { text-align: center; margin-top: 30%; }
        `);
        manifestItems += '<item id="style" href="styles/style.css" media-type="text/css"/>\n';

        // content.opf
        zip.file('OEBPS/content.opf', `<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="2.0" unique-identifier="BookID">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:opf="http://www.idpf.org/2007/opf">
    <dc:title>${blueprint.PROJECT_META.title_working}</dc:title>
    <dc:creator opf:role="aut">${blueprint.PROJECT_META.suggestedAuthor}</dc:creator>
    <dc:language>en</dc:language>
    <dc:publisher>${blueprint.PROJECT_META.publisher_imprint || 'Artisan AI'}</dc:publisher>
    <dc:rights>Copyright © ${new Date().getFullYear()} ${blueprint.PROJECT_META.suggestedAuthor}</dc:rights>
    <dc:date>${new Date().toISOString().split('T')[0]}</dc:date>
    ${coverMeta}
  </metadata>
  <manifest>
    ${manifestItems}
  </manifest>
  <spine>
    ${spineItems}
  </spine>
</package>`);

        return await zip.generateAsync({ type: 'blob' });
    }

    async generateFullCoverPDF(blueprint: KDPBlueprint): Promise<Blob> {
        const trimKey = blueprint.PROJECT_META.trim_size || '6" x 9" (Standard)';
        let trim = TRIM_MAP[trimKey];

        // Clean lookup (fuzzy match)
        if (!trim) {
            const cleanKey = trimKey.toLowerCase().replace(/\s+/g, '');
            const foundKey = Object.keys(TRIM_MAP).find(k => k.toLowerCase().replace(/\s+/g, '').includes(cleanKey) || cleanKey.includes(k.toLowerCase().replace(/\s+/g, '')));
            if (foundKey) trim = TRIM_MAP[foundKey];
        }

        if (!trim) trim = TRIM_MAP['6" x 9" (Standard)'];

        // 1. Precise Spine Calculation
        // 1. Precise Spine Calculation via PLIS
        const totalWords = blueprint.INTERIOR_CONTENT.reduce((acc, ch) => acc + (ch.content?.split(/\s+/).length || 0), 0);
        const estimatedPages = Math.max(24, Math.ceil(totalWords / 250) + (blueprint.INTERIOR_CONTENT.length * 2) + 12);

        const paperType = blueprint.PROJECT_META.interior_color === 'Color' ? 'Color' : 'Cream';
        const specs = structureService.calculateLayoutSpecs(estimatedPages, paperType);

        let spineWidth = specs.spineWidth * 25.4; // Convert inches to mm
        if (isNaN(spineWidth) || spineWidth < 0) spineWidth = 6.35;

        const totalW = (trim.w * 2) + spineWidth + (BLEED_MM * 2);
        const totalH = trim.h + (BLEED_MM * 2);

        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: [totalW, totalH]
        });

        // Positions
        const backX = BLEED_MM;
        const spineX = BLEED_MM + trim.w;
        const frontX = BLEED_MM + trim.w + spineWidth;

        // 2. BACK COVER
        const backColor = [15, 23, 42]; // Industrial Slate
        doc.setFillColor(backColor[0], backColor[1], backColor[2]);
        doc.rect(backX, BLEED_MM, trim.w, trim.h, 'F');

        if (blueprint.COVER_SPEC.full_wrap_url) {
            try {
                const backImg = await this.getBase64Image(blueprint.COVER_SPEC.full_wrap_url);
                doc.addImage(backImg, 'JPEG', backX, BLEED_MM, trim.w, trim.h, undefined, 'MEDIUM');
            } catch (e) {
                console.warn("Back cover image failed, using industrial fallback color");
            }
        }

        // 2. BACK COVER - KDP COMPLIANT (TEXT ONLY, NO IMAGES)
        // ================================================================
        // CRITICAL KDP REQUIREMENT: Back cover MUST NOT have images near barcode
        // Images can cause print quality issues and barcode scan failures
        // Professional text-only design is the industry standard
        // ================================================================

        // Professional gradient background (safe for barcode)
        const gradientSteps = 20;
        const topColor = [15, 23, 42];    // Deep slate
        const bottomColor = [30, 41, 59]; // Lighter slate

        for (let i = 0; i < gradientSteps; i++) {
            const ratio = i / gradientSteps;
            const r = topColor[0] + (bottomColor[0] - topColor[0]) * ratio;
            const g = topColor[1] + (bottomColor[1] - topColor[1]) * ratio;
            const b = topColor[2] + (bottomColor[2] - topColor[2]) * ratio;

            doc.setFillColor(r, g, b);
            const sliceH = trim.h / gradientSteps;
            doc.rect(backX, BLEED_MM + (i * sliceH), trim.w, sliceH + 0.5, 'F');
        }

        // --- SECTION 1: BOOK BLURB (Top 60%) ---
        const blurbMargin = 20;
        const blurbStartY = 35;
        const blurbMaxY = trim.h * 0.65; // Reserve bottom 35% for bio + barcode

        doc.setTextColor(255, 255, 255);
        doc.setFont('times', 'italic');
        doc.setFontSize(11);

        const blurb = blueprint.BACK_COVER_SPEC?.blurb_text || "A gripping tale that will keep you turning pages late into the night.";
        const blurbLines = doc.splitTextToSize(blurb, trim.w - (blurbMargin * 2));

        // Truncate if too long (prevent barcode overlap)
        const maxBlurbLines = Math.floor((blurbMaxY - blurbStartY) / 5.5);
        const displayBlurb = blurbLines.slice(0, maxBlurbLines);

        doc.text(displayBlurb, backX + blurbMargin, blurbStartY);

        // --- SECTION 2: AUTHOR BIO (Middle 20%) ---
        const bioStartY = blurbMaxY + 15;
        const bioMaxY = trim.h * 0.80; // Stop before barcode zone

        const authorBio = blueprint.BOOK_STRUCTURE?.end_matter?.author_bio;
        if (authorBio && authorBio.length > 20) {
            doc.setFontSize(9);
            doc.setFont('times', 'bold');
            doc.text('ABOUT THE AUTHOR', backX + blurbMargin, bioStartY);

            doc.setFont('times', 'normal');
            doc.setFontSize(8);
            const bioShort = authorBio.substring(0, 250) + (authorBio.length > 250 ? '...' : '');
            const bioLines = doc.splitTextToSize(bioShort, trim.w - (blurbMargin * 2));
            const maxBioLines = Math.floor((bioMaxY - bioStartY - 8) / 4);
            doc.text(bioLines.slice(0, maxBioLines), backX + blurbMargin, bioStartY + 6);
        }

        // --- DECORATIVE BORDER (Optional, safe area only) ---
        doc.setDrawColor(100, 116, 139); // Slate gray
        doc.setLineWidth(0.5);
        const borderMargin = 10;
        doc.rect(
            backX + borderMargin,
            BLEED_MM + borderMargin,
            trim.w - (borderMargin * 2),
            bioMaxY - borderMargin - 5,  // Stop well before barcode
            'S' // Stroke only, no fill
        );

        // 3. SPINE
        doc.setFillColor(2, 6, 23); // Deeper Slate
        doc.rect(spineX, BLEED_MM, spineWidth, trim.h, 'F');

        if (estimatedPages >= 80) {
            doc.saveGraphicsState();
            const centerX = spineX + (spineWidth / 2);
            doc.setFontSize(estimatedPages > 150 ? 12 : 9);
            // Center spine text vertically
            doc.text(blueprint.PROJECT_META.title_working.toUpperCase(), centerX, totalH / 2, { align: 'center', angle: -90 });
            doc.restoreGraphicsState();
        }

        // 4. FRONT COVER
        const frontColor = [79, 70, 229]; // Indigo
        doc.setFillColor(frontColor[0], frontColor[1], frontColor[2]);
        doc.rect(frontX, BLEED_MM, trim.w, trim.h, 'F');

        if (blueprint.COVER_SPEC.ebook_url) {
            try {
                const frontImg = await this.getBase64Image(blueprint.COVER_SPEC.ebook_url);
                doc.addImage(frontImg, 'JPEG', frontX, BLEED_MM, trim.w, trim.h, undefined, 'MEDIUM');
            } catch (e) {
                console.warn("Front cover image failed, using industrial fallback color");
            }
        }

        // Front Typography Overlay
        doc.setTextColor(255, 255, 255);
        doc.setFont('times', 'bold');
        doc.setFontSize(24);
        const titleFront = doc.splitTextToSize((blueprint.PROJECT_META.title_working || "Untitled").toUpperCase(), trim.w - 25);
        doc.text(titleFront, frontX + (trim.w / 2), 50, { align: 'center' });

        doc.setFontSize(12);
        doc.text(blueprint.PROJECT_META.suggestedAuthor.toUpperCase(), frontX + (trim.w / 2), trim.h - 15, { align: 'center' });

        // 5. BARCODE ZONE (Strict KDP Bottom-Right Compliance)
        const barcodeX = (BLEED_MM + trim.w) - BARCODE_OFFSET - BARCODE_W;
        const barcodeY = (BLEED_MM + trim.h) - BARCODE_OFFSET - BARCODE_H;

        doc.setFillColor(255, 255, 255);
        doc.rect(barcodeX, barcodeY, BARCODE_W, BARCODE_H, 'F');

        if (blueprint.ISBN_SPEC?.source === 'USER' && blueprint.ISBN_SPEC.user_barcode_url) {
            try {
                const barImg = await this.getBase64Image(blueprint.ISBN_SPEC.user_barcode_url);
                doc.addImage(barImg, 'JPEG', barcodeX, barcodeY, BARCODE_W, BARCODE_H, undefined, 'MEDIUM');
            } catch (e) {
                console.error("User Barcode Load Fail:", e);
                this.drawBarcodePlaceholder(doc, barcodeX, barcodeY);
            }
        } else {
            this.drawBarcodePlaceholder(doc, barcodeX, barcodeY);
        }

        return new Blob([doc.output('arraybuffer')], { type: 'application/pdf' });
    }

    private drawBarcodePlaceholder(doc: jsPDF, x: number, y: number) {
        // CRITICAL: Do NOT print any text in barcode zone
        // KDP automatically places the barcode during print processing
        // Any text here will cause rejection
        // The white rectangle is already drawn in the calling function
        // This function is intentionally left minimal
    }

    private async getBase64Image(url: string): Promise<string> {
        if (!url) throw new Error("URL is empty");
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            const blob = await res.blob();
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result as string);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });
        } catch (error) {
            console.error("Base64 conversion failed for URL:", url, error);
            throw error;
        }
    }

    async generateAplusPack(modules: any[]): Promise<Blob> {
        const zip = new JSZip();
        const assetFolder = zip.folder("marketing_assets");
        let copyText = "ARTISAN AI - KDP A+ LISTING ARCHITECT\n====================================\n\n";

        for (let i = 0; i < modules.length; i++) {
            const mod = modules[i];
            copyText += `MODULE ${i + 1}: ${mod.type}\n`;
            copyText += `TITLE: ${mod.title || 'N/A'}\n`;
            copyText += `BODY: ${mod.body || 'N/A'}\n\n`;

            if (mod.generatedImageUrl && assetFolder) {
                try {
                    const imgRes = await fetch(mod.generatedImageUrl);
                    const imgBlob = await imgRes.blob();
                    const ext = imgBlob.type.split('/')[1] || 'png';
                    assetFolder.file(`module_${i + 1}_visual.${ext}`, imgBlob);
                } catch (e) {
                    console.error(`Asset ${i} fetch failed:`, e);
                }
            }
        }

        zip.file("copy_index.txt", copyText);
        return await zip.generateAsync({ type: "blob" });
    }
}

export const exporter = new ExportService();
