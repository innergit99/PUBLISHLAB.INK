# 🧩 MANUSCRIPT DOCTOR — TECHNICAL ARCHITECTURE
**Feature Name:** Context-Aware Manuscript Rewrite Engine  
**System Integration:** KDP Genesis ∞  
**Priority:** Phase 3 (Post-CIN/PLIS Stabilization)  
**Timeline:** Months 9-13  
**Estimated Cost:** ≈425,000 AED

---

## 🎯 STRATEGIC VALUE

### Business Impact
- **User Retention:** Captures authors with existing drafts (70% of writers have unfinished manuscripts)
- **Market Expansion:** Appeals to traditional publishers needing AI editing
- **Revenue Stream:** Premium tier feature ($25/5K words or included in Pro plan)
- **Data Enrichment:** Real manuscript data improves CIN training
- **Competitive Moat:** No competitor offers upload → rewrite → KDP-ready pipeline

### Technical Advantages
- Leverages existing CIN Genre Logic
- Reuses Humanization Layer
- Integrates seamlessly with PLIS
- Extends KDP Validator capabilities

---

## 🏗️ SYSTEM ARCHITECTURE

### Entry Points
```
User Dashboard
├── Create New Book (Existing CIN Path)
└── Upload & Enhance Manuscript (NEW)
    ├── File Upload (.PDF, .DOCX, .TXT)
    ├── Rewrite Mode Selection
    │   ├── Fix Errors Only
    │   ├── Full Rewrite
    │   ├── Style Enhancement
    │   └── Continue Writing
    ├── Genre Selection (Optional)
    └── Target Audience (Optional)
```

### Processing Pipeline
```
1. FILE INGESTION
   ├── File Validator (type, size, encryption check)
   ├── Parser Engine (text extraction)
   │   ├── PDF: PyPDF2 + pdfplumber
   │   ├── DOCX: python-docx
   │   ├── TXT: Direct UTF-8 read
   ├── Metadata Extractor
   │   ├── Word count
   │   ├── Chapter detection (regex + TOC)
   │   ├── Font/style hints
   └── Output: manuscript_raw.json

2. CONTEXT ANALYSIS (CIN Extension)
   ├── Genre Classifier
   │   └── Uses existing GENRE_MATRIX logic
   ├── Tone Detector
   │   ├── Sentiment analysis (positive/negative/neutral)
   │   ├── Pacing detection (action vs reflection ratio)
   │   └── Dialogue density calculation
   ├── Author Voice Fingerprint
   │   ├── Sentence structure patterns
   │   ├── Vocabulary complexity (Flesch-Kincaid)
   │   └── POV consistency check
   └── Output: context_profile.json

3. REWRITE DECISION ENGINE
   ├── Mode Router
   │   ├── Fix Errors → Grammar/syntax only
   │   ├── Full Rewrite → CIN regeneration
   │   ├── Enhance Style → Humanization boost
   │   └── Continue → Context-aware generation
   ├── Text Chunker (1500-2000 words/chunk)
   ├── Error Scanner
   │   ├── Grammar (LanguageTool API)
   │   ├── Tense consistency
   │   ├── Passive voice detection
   │   └── Redundancy removal
   └── Sends chunks to Rewrite Engine

4. REWRITE ENGINE + HUMANIZATION
   ├── Grammar Pass (DeepEdit logic)
   ├── Tone Alignment (matches Genre Logic)
   ├── Lexical Enrichment
   │   ├── Metaphor injection
   │   ├── Sensory anchor integration
   │   └── Emotional depth enhancement
   ├── Dialogue Flow Tuning
   ├── Humanization Layer
   │   ├── Preserves Author Voice DNA
   │   ├── Adds natural rhythm
   │   └── Prevents AI repetition patterns
   └── Output: enhanced_manuscript.json

5. VALIDATION & COMPLIANCE
   ├── KDP Validator Bot
   │   ├── Grammar consistency check
   │   ├── Formatting compliance
   │   ├── Policy compliance (no banned phrases)
   │   └── AI content disclaimer generation
   ├── Readability Scoring
   │   ├── Flesch Reading Ease
   │   ├── Grade Level
   │   └── Pacing Score
   ├── KDP Readiness Score (0-100)
   └── Output: rewrite_report.pdf

6. OUTPUT RENDERER
   ├── Split-Screen Diff View
   │   ├── Original text (left)
   │   ├── Enhanced text (right)
   │   └── Change highlights (color-coded)
   ├── Download Options
   │   ├── .DOCX (editable)
   │   ├── .PDF (print-ready)
   │   └── .TXT (plain text)
   └── Send to PLIS (layout pipeline)

7. PLIS INTEGRATION
   ├── Auto-apply trim/margins/bleed
   ├── Format headings, drop caps
   ├── Generate print-ready PDF (300 DPI CMYK)
   ├── Generate eBook EPUB3
   └── Pass to Smart Upload Co-Pilot

8. SMART UPLOAD CO-PILOT
   ├── Auto-fill KDP metadata
   ├── Category/keyword suggestions
   ├── 3D preview generation
   └── Optional KDP API push

9. ADAPTIVE LEARNING CORE
   ├── Log upload patterns
   ├── Track rewrite success rates
   ├── Update tone models
   └── Sync with central model
```

---

## 🧱 TECHNICAL STACK

### Backend Services
```python
# File Processing
- PyPDF2, pdfplumber (PDF parsing)
- python-docx (DOCX parsing)
- AWS Textract (OCR for scanned PDFs)

# NLP & Rewriting
- OpenAI GPT-4 (rewrite engine)
- Claude 3.5 Sonnet (context analysis)
- LanguageTool (grammar checking)
- spaCy (NLP preprocessing)

# API Framework
- FastAPI (async microservice)
- Celery (background task queue)
- Redis (caching & job queue)

# Storage
- PostgreSQL (manuscript versions)
- S3 (file storage)
- MongoDB (context profiles)
```

### Frontend Components
```typescript
// New Components Needed
- ManuscriptUploader.tsx (drag-drop + file validation)
- RewriteModeSelector.tsx (mode picker UI)
- DiffViewer.tsx (side-by-side comparison)
- RewriteProgressTracker.tsx (real-time status)
- ContextProfileCard.tsx (genre/tone display)
- EnhancementReport.tsx (before/after metrics)
```

---

## 📊 DATA MODELS

### Manuscript Upload Schema
```typescript
interface ManuscriptUpload {
  id: string;
  userId: string;
  originalFileName: string;
  fileType: 'pdf' | 'docx' | 'txt';
  fileSize: number;
  uploadedAt: Date;
  status: 'parsing' | 'analyzing' | 'rewriting' | 'complete' | 'error';
  
  // Extracted Data
  rawText: string;
  wordCount: number;
  chapterCount: number;
  
  // Context Analysis
  contextProfile: {
    detectedGenre: string;
    confidence: number;
    tone: 'formal' | 'casual' | 'emotional' | 'technical';
    pov: '1st' | '2nd' | '3rd';
    dialogueDensity: number;
    pacingScore: number;
    readabilityGrade: number;
  };
  
  // Rewrite Settings
  rewriteMode: 'fix_errors' | 'full_rewrite' | 'enhance_style' | 'continue_writing';
  selectedGenre?: string;
  targetAudience?: string;
  preserveVoice: boolean;
  
  // Results
  enhancedText: string;
  changesCount: number;
  kdpReadinessScore: number;
  rewriteReport: RewriteReport;
}

interface RewriteReport {
  grammarFixes: number;
  styleEnhancements: number;
  toneAdjustments: number;
  readabilityImprovement: number;
  beforeMetrics: TextMetrics;
  afterMetrics: TextMetrics;
  changeLog: Change[];
}

interface Change {
  type: 'grammar' | 'style' | 'tone' | 'structure';
  original: string;
  revised: string;
  reason: string;
  chapterIndex: number;
}
```

---

## 🔐 SECURITY & PRIVACY

### File Upload Security
- Max file size: 50MB
- Virus scanning (ClamAV)
- Encrypted storage (AES-256)
- Auto-deletion after 30 days
- No data sharing/training without consent

### Content Privacy
- User manuscripts never used for model training (default)
- Optional: "Help improve AI" opt-in
- GDPR/CCPA compliant data handling
- Encrypted in-transit (TLS 1.3)

---

## 💰 PRICING MODEL

### Tier Integration
```
FREE TIER
- 1 upload/month (max 10K words)
- Fix Errors mode only
- Basic report

CREATOR TIER ($29/mo)
- 3 uploads/month (max 50K words each)
- All rewrite modes
- Full reports
- PLIS integration

PRO TIER ($99/mo)
- Unlimited uploads
- Priority processing
- API access
- Version history (30 days)

PAY-AS-YOU-GO
- $25 per 5K words
- All features
- No subscription required
```

---

## 🧪 TESTING STRATEGY

### Test Cases
1. **File Parsing**
   - PDF with complex formatting
   - DOCX with track changes
   - Scanned PDF (OCR test)
   - Large files (>100K words)

2. **Genre Detection**
   - Romance vs Thriller accuracy
   - Mixed-genre manuscripts
   - Non-fiction detection

3. **Rewrite Quality**
   - Voice preservation
   - Grammar accuracy
   - Tone consistency
   - KDP compliance

4. **Performance**
   - Processing time (target: <2min for 10K words)
   - Concurrent uploads
   - Memory usage

---

## 📈 SUCCESS METRICS

### KPIs
- Upload-to-publish conversion rate: >60%
- User satisfaction (NPS): >8/10
- Processing accuracy: >95%
- Average KDP Readiness Score improvement: +25 points
- Feature adoption rate: >40% of active users

---

## 🚀 IMPLEMENTATION PHASES

### Phase 1: MVP (Months 9-10)
- Basic file upload (DOCX/TXT only)
- Fix Errors mode
- Simple diff viewer
- Integration with existing Validator

### Phase 2: Core Features (Months 11-12)
- PDF support with OCR
- Full Rewrite & Enhance modes
- Context Analyzer integration
- PLIS pipeline connection

### Phase 3: Advanced (Month 13)
- Continue Writing mode
- Voice preservation AI
- Advanced reporting
- API access for Pro users

---

## ⚠️ RISK MITIGATION

| Risk | Impact | Mitigation |
|------|--------|------------|
| Voice overwriting | High | Add "Preserve Voice" slider (0-100%) |
| Large file crashes | Medium | Chunk processing + async queue |
| OCR accuracy | Medium | Fallback to manual text paste |
| Privacy concerns | High | Clear data policy + encryption |
| Processing costs | Medium | Rate limiting + tier restrictions |

---

## 🔗 INTEGRATION POINTS

### Existing Systems
```
manuscriptDoctor.uploadFile()
  ↓
contextAnalyzer.analyze() // Uses GENRE_MATRIX
  ↓
rewriteEngine.process() // Uses CIN logic
  ↓
humanizationService.enhance() // Existing layer
  ↓
kdpValidator.validate() // Existing validator
  ↓
exportService.toPLIS() // Existing PLIS
  ↓
smartUploadCopilot.prepare() // Existing uploader
```

---

## 📝 NEXT STEPS

1. **Immediate (This Week)**
   - Create `manuscriptDoctorService.ts` stub
   - Design upload UI mockup
   - Set up file storage infrastructure

2. **Short-term (Next 2 Weeks)**
   - Implement basic file parser
   - Build context analyzer prototype
   - Create diff viewer component

3. **Medium-term (Next Month)**
   - Integrate with CIN for rewrite logic
   - Connect to Humanization Layer
   - Build reporting system

---

**Status:** Architecture Complete ✅  
**Next Action:** Await approval to begin Phase 1 MVP development
