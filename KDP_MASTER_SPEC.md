# 📘 KDP READY BOOK GENERATION WEBAPP - MASTER SPECIFICATION

## FULL TECHNICAL + PUBLISHING SPECIFICATION

---

## 1️⃣ CORE APP GOAL

Build a webapp that **automatically generates books that pass Amazon KDP review on first upload** for:
* Kindle eBook
* Paperback
* Hardcover

The app must **block generation** if:
* Formatting violates KDP
* Word count is unrealistic for genre
* Layout is wrong (reflow vs fixed)
* Metadata doesn’t match content type

---

## 2️⃣ GLOBAL KDP FORMAT RULES (ENFORCED BY ENGINE)

### Ebook
| Rule | Requirement |
| :--- | :--- |
| Layout | Reflowable (default) |
| Fixed Layout | ONLY for Comics, Manga, Children’s Picture Books |
| TOC | Mandatory & clickable |
| Images | Inline, responsive |
| Fonts | Embedded or system safe |
| File | EPUB / KPF |

### Paperback / Hardcover
| Rule | Requirement |
| :--- | :--- |
| Interior | PDF (recommended) |
| DPI | 300 minimum |
| Bleed | Optional, must be consistent |
| Fonts | Embedded |
| Min pages | ~24 pages |
| Margins | KDP trim-specific |

---

## 3️⃣ MASTER USER FLOW (UI SPEC)

### STEP 1 — Genre Blueprint Selection
(As per your image)
* Romance Novel
* Mystery Thriller
* Fantasy Epic
* Sci-Fi Space Opera
* Manga (Shonen)
* Comic Book
* Children’s Picture Book
* Biography
* Business & Money
* Self-Help
* Coloring Book (Adult)
* Kids Coloring Book
* KDP Coloring Page
* Daily Journal
* Planner

### STEP 2 — BOOK CONFIGURATION
User inputs:
* Title / Subtitle
* Author / Pen Name
* Series Name + Volume (optional)
* Language
* Target Age
* Tone
* Ebook / Print / Both
* Trim Size
* Reading Direction (for Manga)
* Color Type (BW / Color)

---

## 4️⃣ GENRE-WISE WORD COUNTS & CHAPTER STRUCTURE

This is **CRITICAL** for acceptance & customer satisfaction.

### 📕 ROMANCE NOVEL
| Parameter | Value |
| :--- | :--- |
| Word Count | 50,000 – 90,000 |
| Chapters | 18 – 30 |
| Words/Chapter | 2,000 – 3,500 |
| Ebook Layout | Reflowable |
| Print | Yes |

**Chapter Structure**
1. Hook / Meet Cute
2. Rising tension
3. Emotional conflict
4. Climax
5. Resolution / HEA or HFN

### 📘 MYSTERY / THRILLER
| Parameter | Value |
| :--- | :--- |
| Word Count | 60,000 – 100,000 |
| Chapters | 25 – 40 |
| Words/Chapter | 1,800 – 3,000 |

**Required Elements**
* Mystery setup by Chapter 3
* Clues layered gradually
* Final reveal near end

### 🧙 FANTASY EPIC
| Parameter | Value |
| :--- | :--- |
| Word Count | 80,000 – 150,000 |
| Chapters | 30 – 60 |
| Words/Chapter | 2,500 – 4,000 |

**Special Rules**
* World-building section
* Glossary (optional)
* Maps allowed (print only)

### 🚀 SCI-FI SPACE OPERA
| Parameter | Value |
| :--- | :--- |
| Word Count | 70,000 – 120,000 |
| Chapters | 25 – 45 |

**Rules**
* Tech descriptions must be fictional
* No real brand tech references

### 🖤 MANGA (SHONEN)
| Parameter | Value |
| :--- | :--- |
| Pages | 120 – 220 |
| Panels/Page | 3 – 8 |
| Words/Page | Minimal |
| Layout | Fixed |
| Direction | Right-to-Left |
| Color | Black & White |

**Structure**
* Chapter = 15–25 pages
* Action-driven pacing
* Visual storytelling priority

### 🖍️ COMIC BOOK (WESTERN)
| Parameter | Value |
| :--- | :--- |
| Pages | 24 – 120 |
| Panels/Page | 1 – 6 |
| Layout | Fixed |
| Color | BW or Color |

**Structure**
* Issue-based chapters
* Speech bubbles + captions
* Clear reading flow

### 🧒 CHILDREN’S PICTURE STORY BOOK
| Parameter | Value |
| :--- | :--- |
| Age | 3–8 |
| Words | 300 – 1,000 |
| Pages | 24 – 40 |
| Words/Page | 1–3 sentences |
| Layout | Fixed |
| Color | Full color |

**Mandatory**
* Moral / lesson
* Simple vocabulary
* Large fonts
* High-contrast images

### 📗 BIOGRAPHY
| Parameter | Value |
| :--- | :--- |
| Word Count | 60,000 – 120,000 |
| Chapters | 20 – 40 |
| Tone | Factual |

**Rules**
* Chronological flow
* No defamatory claims

### 💼 BUSINESS & MONEY
| Parameter | Value |
| :--- | :--- |
| Word Count | 30,000 – 70,000 |
| Chapters | 8 – 20 |
| Extras | Worksheets, bullet points |

**Rules**
* No financial guarantees
* Educational tone only

### 🌱 SELF-HELP
| Parameter | Value |
| :--- | :--- |
| Word Count | 25,000 – 60,000 |
| Chapters | 7 – 15 |
| Structure | Problem → Solution → Action |

### 🎨 COLORING BOOK (ADULT & KIDS)
| Parameter | Value |
| :--- | :--- |
| Pages | 30 – 100 |
| Images | 1 per page |
| DPI | 300 |
| Color | Black line art |
| Text | Minimal |

**Rules**
* Single-sided pages
* No grayscale
* No copyrighted characters

### 📒 DAILY JOURNAL
| Parameter | Value |
| :--- | :--- |
| Pages | 90 – 365 |
| Text | Repeating prompts |
| Category | Low-Content |

### 📅 PLANNER
| Parameter | Value |
| :--- | :--- |
| Pages | 120 – 250 |
| Sections | Monthly / Weekly / Daily |
| Text | Minimal |

---

## 5️⃣ BACKEND GENERATION LOGIC

### Content Engine
* Genre-specific prompt templates
* Chapter-by-chapter generation
* Regenerate individual chapters
* Maintain tone consistency

### Layout Engine
* Auto-decides:
  * Reflow vs Fixed
  * Margin sets
  * Gutter size
  * Bleed rules

### Compliance Engine (BLOCKING)
* Word count outside range ❌
* Wrong layout for genre ❌
* Image DPI < 300 ❌
* Missing TOC ❌
* Children’s book without age range ❌

---

## 6️⃣ EXPORT SYSTEM

### Outputs
* EPUB (Kindle)
* PDF Interior (Print)
* Cover PDF (Full wrap)
* Preview Images

### Packaging
* ZIP with:
  * Interior
  * Cover
  * Metadata sheet
  * KDP upload checklist

---

## 7️⃣ AI DISCLOSURE HANDLING
* Auto-flag “AI-Generated Content Used”
* User confirmation checkbox
* Store disclosure metadata
