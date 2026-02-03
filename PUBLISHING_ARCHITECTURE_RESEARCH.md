# PUBLISHING ARCHITECTURE & LOGIC RESEARCH
## CORE PRINCIPLE
**Content is NOT format. Format is a rendering layer.**
The system must treat:
* **Story/content = single canonical source**
* **Print book & eBook = two different renderings of the same source**

## HIGH-LEVEL SYSTEM ARCHITECTURE
```
CONTENT CORE (single source of truth)
        ↓
STRUCTURAL NORMALIZATION LAYER
        ↓
FORMAT-SPECIFIC RENDERERS
   ↙                ↘
PRINT ENGINE      EBOOK ENGINE
(PDF)             (EPUB/KPF)
```

## STEP 1 — CANONICAL CONTENT MODEL
The AI should **never generate “print pages” or “ebook pages”**. Instead, it generates **structured content blocks**.

### Example Canonical Content JSON
```json
{
  "book_metadata": {
    "title": "The Devil’s Bargain for Her Heart",
    "author": "Bishal Gautam",
    "genre": "Dark Romance"
  },
  "front_matter": [
    { "type": "title_page" },
    { "type": "copyright" },
    { "type": "dedication" },
    { "type": "toc" }
  ],
  "chapters": [
    {
      "chapter_number": 1,
      "chapter_title": "Shattered Reflections",
      "content_blocks": [
        { "type": "paragraph", "text": "Maya stood before the mirror..." },
        { "type": "scene_break" },
        { "type": "paragraph", "text": "The air felt heavy..." }
      ]
    }
  ],
  "back_matter": [
    { "type": "about_author" }
  ]
}
```
**Rule**: Never store page numbers or layout-specific values in the content model.

## STEP 2 — NORMALIZATION LAYER
Before rendering **any format**, the system must normalize content.
* Fix capitalization
* Remove duplicate headings
* Standardize scene breaks
* Enforce paragraph rules
* Clean AI repetition
**Rule**: Normalization runs ONCE. Both print and ebook use the same normalized content.

## STEP 3 — FORMAT DECISION LOGIC
When the user clicks **Export**, they choose:
* [ ] Paperback
* [ ] Hardcover
* [ ] eBook (Kindle)
* [ ] Both
The content **does not change** — only the renderer changes.

## STEP 4 — PRINT BOOK RENDERING FLOW (PDF)
Print is **fixed-layout**, page-based.
1. Canonical Content
2. Apply Print Template (by genre)
3. Apply Trim Size & Margins
4. Paginate Content
5. Generate Page Numbers (internal)
6. Generate TOC (page-based)
7. Embed Fonts (CMYK)
8. Export Print PDF

**Key Rules (Print)**:
* Page numbers: Hidden on front matter, Optional on chapters.
* TOC: Generated AFTER pagination.
* Fonts: Serif only.
* Layout: Fixed.
**Dev Instruction**: Print pagination MUST happen before TOC generation.

## STEP 5 — EBOOK RENDERING FLOW (EPUB / KPF)
eBooks are **reflowable**.
1. Canonical Content
2. Strip Print-Only Elements
3. Apply Ebook Template (by genre)
4. Convert Structure to HTML
5. Generate Linked TOC
6. Apply CSS (font scaling)
7. Validate EPUB/KPF

**Key Rules (Ebook)**:
* ❌ No page numbers
* ❌ No fixed margins
* ❌ No print headers/footers
* ✅ Clickable TOC
* ✅ Reflowable text
**Dev Instruction**: Never carry print page numbers into ebook. Never number ebook TOC.

## STEP 6 — DIFFERENCES MATRIX
| Element      | Print          | eBook             |
| ------------ | -------------- | ----------------- |
| Page numbers | Optional       | ❌ Never           |
| TOC          | Page-based     | Link-based        |
| Fonts        | Embedded serif | Reader-controlled |
| Margins      | Fixed          | Fluid             |
| Scene breaks | ***            | `<hr>`            |
| Images       | 300 DPI CMYK   | Optimized RGB     |
| ISBN         | Required       | Optional          |

## STEP 7 — KDP-SAFE EXPORT VALIDATION
**Print Validator**: Margins OK? Page numbers? TOC matches? Fonts embedded? CMYK? No placeholders?
**Ebook Validator**: No page numbers? Linked TOC? No fixed widths? No absolute fonts? Metadata complete?

## STEP 8 — USER EXPERIENCE FLOW
1. Writes content once.
2. Clicks “Preview”.
3. Toggles: Print preview / Kindle preview.
4. Fixes issues once.
5. Exports both formats.
**Ideally Hidden**: Pagination logic, CSS rules, ISBN handling, KDP quirks.

## SUMMARY
* Maintain a single canonical content model.
* Print and ebook are separate renderers consuming the same content.
* Pagination exists only in the print renderer.
* TOC is generated last for print and linked for ebook.
* No layout logic lives inside content.
