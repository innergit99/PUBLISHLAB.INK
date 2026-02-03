# 🔧 ARTISAN AI - BACKEND AGENT TESTING CHECKLIST
**Date:** January 21, 2026  
**Status:** Ready for Comprehensive Testing  
**Total Agents:** 16 Backend Agents

---

## 📋 TESTING OVERVIEW

This document provides a systematic approach to testing all 16 backend agents powering Artisan AI's industrial publishing platform.

---

## 🎯 AGENT TESTING MATRIX

### **1. NICHE RADAR v2.0** 
**Purpose:** Market viability analysis across Amazon, Etsy, RedBubble, Shopify  
**Endpoint:** `/api/niche-analysis`

**Test Cases:**
- [ ] Input: "Cozy Mystery Books" → Verify velocity, competition, profit metrics
- [ ] Input: "Minimalist Wall Art" → Check cross-platform analysis
- [ ] Input: Invalid/empty → Verify error handling
- [ ] Response time: Should be < 3 seconds
- [ ] Output format: JSON with `velocity`, `competition`, `profitPotential`, `sentiment`

**Success Criteria:**
- ✅ Returns structured market data
- ✅ Provides actionable insights
- ✅ Handles edge cases gracefully

---

### **2. AMAZON SEO ENGINE**
**Purpose:** Industrial listing architect for Amazon optimization  
**Endpoint:** `/api/amazon-seo`

**Test Cases:**
- [ ] Input: Topic + Genre → Generate title, bullets, description, keywords
- [ ] Verify KDP compliance (character limits, banned words)
- [ ] Test with different genres (Fiction, Non-Fiction, Children's)
- [ ] Response time: Should be < 5 seconds

**Success Criteria:**
- ✅ SEO-optimized titles (< 200 chars)
- ✅ 7 compelling bullet points
- ✅ Keyword-rich description
- ✅ Backend search terms provided

---

### **3. BRAND INTELLIGENCE**
**Purpose:** Competitive analysis and brand positioning  
**Endpoint:** `/api/brand-intel`

**Test Cases:**
- [ ] Input: Brand name + niche → Analyze market position
- [ ] Competitor identification
- [ ] SWOT analysis generation
- [ ] Trend forecasting

**Success Criteria:**
- ✅ Identifies 3-5 competitors
- ✅ Provides differentiation strategy
- ✅ Market gap analysis

---

### **4. KDP BOOK LAB (Coloring Pages)**
**Purpose:** High-content book generation with industrial compliance  
**Endpoint:** `/api/kdp-generate`

**Test Cases:**
- [ ] Genre: Fiction → Generate 10-chapter manuscript
- [ ] Genre: Non-Fiction → Generate structured content
- [ ] Genre: Children's → Generate age-appropriate content
- [ ] Verify: Spine width calculation
- [ ] Verify: Bleed/margin compliance
- [ ] Test: Cover generation (front + full wrap)
- [ ] Test: Interior PDF export
- [ ] Test: A+ Content generation

**Success Criteria:**
- ✅ Generates complete manuscript (10k+ words)
- ✅ Creates KDP-compliant cover
- ✅ Produces print-ready PDF
- ✅ Includes A+ marketing modules

---

### **5. COLORING PAGES GENERATOR**
**Purpose:** Automated coloring book creation  
**Endpoint:** `/api/coloring-generate`

**Test Cases:**
- [ ] Theme: "Animals" → Generate 20 unique pages
- [ ] Theme: "Mandalas" → Verify complexity levels
- [ ] Test: B&W conversion
- [ ] Test: Line thickness consistency
- [ ] Export: PDF with proper margins

**Success Criteria:**
- ✅ Generates unique, non-repetitive designs
- ✅ Clean black outlines on white background
- ✅ KDP-compliant page dimensions

---

### **6. POD MERCH DESIGNER**
**Purpose:** Print-on-demand asset generation  
**Endpoint:** `/api/pod-generate`

**Test Cases:**
- [ ] Product: T-Shirt → Generate design
- [ ] Product: Mug → Verify dimensions (3000x3000px)
- [ ] Product: Poster → Test high-res output
- [ ] Style: Vintage, Modern, Minimalist
- [ ] Test: Transparent background support

**Success Criteria:**
- ✅ Generates platform-specific dimensions
- ✅ High-resolution output (300 DPI)
- ✅ Multiple style variations

---

### **7. PROFIT ESTIMATOR**
**Purpose:** KDP royalty and cost calculation  
**Endpoint:** `/api/profit-estimate`

**Test Cases:**
- [ ] Input: Price $9.99, 200 pages, B&W → Calculate royalty
- [ ] Input: Price $24.99, 150 pages, Color → Verify costs
- [ ] Test: Different trim sizes (6x9, 8.5x11)
- [ ] Verify: Amazon fee calculations

**Success Criteria:**
- ✅ Accurate royalty calculations
- ✅ Printing cost breakdown
- ✅ Profit margin analysis

---

### **8. TREND INTELLIGENCE**
**Purpose:** Real-time market trend analysis  
**Endpoint:** `/api/trend-analysis`

**Test Cases:**
- [ ] Query: "2026 Publishing Trends" → Identify emerging niches
- [ ] Historical data analysis
- [ ] Seasonal trend detection
- [ ] Velocity scoring

**Success Criteria:**
- ✅ Identifies trending keywords
- ✅ Provides velocity metrics
- ✅ Suggests optimal timing

---

### **9. COVER GENERATOR (Industrial)**
**Purpose:** KDP-compliant cover creation  
**Endpoint:** `/api/cover-generate`

**Test Cases:**
- [ ] Genre: Mystery → Generate dark, atmospheric cover
- [ ] Genre: Romance → Generate emotional cover
- [ ] Genre: Sci-Fi → Generate futuristic cover
- [ ] Test: Spine width integration
- [ ] Test: Barcode placement
- [ ] Verify: Full wrap dimensions

**Success Criteria:**
- ✅ Genre-appropriate design
- ✅ Correct dimensions for trim size
- ✅ Includes spine + back cover

---

### **10. MANUSCRIPT EXPANDER**
**Purpose:** AI-powered chapter content generation  
**Endpoint:** `/api/expand-chapter`

**Test Cases:**
- [ ] Input: Chapter outline → Generate 2000-word chapter
- [ ] Test: Narrative consistency
- [ ] Test: Character development
- [ ] Verify: No AI-flagged vocabulary ("delve", "tapestry")

**Success Criteria:**
- ✅ Generates target word count
- ✅ Maintains story coherence
- ✅ Human-like writing quality

---

### **11. A+ CONTENT ARCHITECT**
**Purpose:** Amazon A+ marketing module generation  
**Endpoint:** `/api/aplus-generate`

**Test Cases:**
- [ ] Input: Book description → Generate 4 A+ modules
- [ ] Test: Visual prompt generation
- [ ] Test: Copy optimization
- [ ] Verify: Module types (comparison, feature, story)

**Success Criteria:**
- ✅ Generates 4-6 modules
- ✅ Includes visual prompts
- ✅ Conversion-optimized copy

---

### **12. VISUAL PLATE GENERATOR**
**Purpose:** Chapter illustration creation  
**Endpoint:** `/api/visual-plate`

**Test Cases:**
- [ ] Input: Chapter summary → Generate illustration
- [ ] Test: B&W conversion for print
- [ ] Test: Grayscale quality
- [ ] Verify: Print-safe resolution

**Success Criteria:**
- ✅ Contextually relevant images
- ✅ Print-ready quality
- ✅ Consistent style across chapters

---

### **13. COMPLIANCE VALIDATOR**
**Purpose:** KDP standards verification  
**Endpoint:** `/api/validate-kdp`

**Test Cases:**
- [ ] Test: Margin compliance
- [ ] Test: Bleed requirements
- [ ] Test: Spine width accuracy
- [ ] Test: File size limits
- [ ] Test: Content policy check

**Success Criteria:**
- ✅ Flags non-compliant elements
- ✅ Provides fix recommendations
- ✅ Zero-fail validation

---

### **14. EXPORT ORCHESTRATOR**
**Purpose:** Multi-format export (PDF, EPUB, MOBI)  
**Endpoint:** `/api/export`

**Test Cases:**
- [ ] Export: Print PDF → Verify bleed, margins
- [ ] Export: EPUB → Test reflowable layout
- [ ] Export: MOBI → Kindle compatibility
- [ ] Test: Font embedding
- [ ] Test: Image compression

**Success Criteria:**
- ✅ Generates valid PDF/EPUB/MOBI
- ✅ Maintains formatting integrity
- ✅ Optimized file sizes

---

### **15. CLOUD SAVE MANAGER**
**Purpose:** Project persistence and recovery  
**Endpoint:** `/api/cloud-save`

**Test Cases:**
- [ ] Save: Complete project → Verify storage
- [ ] Load: Saved project → Verify restoration
- [ ] Test: Auto-save functionality
- [ ] Test: Version history

**Success Criteria:**
- ✅ Reliable save/load operations
- ✅ Data integrity maintained
- ✅ Fast retrieval (< 2 seconds)

---

### **16. HUMANITY PRO (AI Sanitizer)**
**Purpose:** Remove AI-flagged vocabulary and patterns  
**Endpoint:** `/api/humanize`

**Test Cases:**
- [ ] Input: AI-generated text → Remove "delve", "tapestry", "meticulously"
- [ ] Test: Maintain meaning and flow
- [ ] Test: Emotional depth enhancement
- [ ] Verify: Sensory language injection

**Success Criteria:**
- ✅ Removes all banned AI words
- ✅ Improves readability
- ✅ Maintains original intent

---

## 🚀 TESTING EXECUTION PLAN

### **Phase 1: Core Functionality (Day 1)**
1. Test agents 1-5 (Market Intelligence + Content Generation)
2. Verify API response times
3. Check error handling

### **Phase 2: Creative Assets (Day 2)**
1. Test agents 6-10 (Visual + Design)
2. Verify output quality
3. Test file exports

### **Phase 3: Compliance & Export (Day 3)**
1. Test agents 11-16 (Validation + Export)
2. End-to-end workflow testing
3. Performance benchmarking

---

## 📊 SUCCESS METRICS

- **Response Time:** < 5 seconds per agent
- **Success Rate:** > 95% for all test cases
- **Error Handling:** Graceful degradation with clear messages
- **Output Quality:** Production-ready assets

---

## 🐛 KNOWN ISSUES TO VERIFY

1. **Landing Page Preview Image:** Not scaling to fill container (fix tomorrow)
2. **ToolView.tsx Compilation:** Recently fixed - verify stability
3. **Font Loading:** Check fallback behavior
4. **PDF Generation:** Verify bleed/margin accuracy

---

## 📝 TESTING NOTES

- All tests should be run on `http://localhost:3000`
- Backend should be running on port 5000 (Flask) or 7860 (Gradio)
- Use Postman or browser DevTools for API testing
- Document any failures with screenshots and logs

---

**Next Steps:**
1. Fix landing page image scaling
2. Execute Phase 1 testing (agents 1-5)
3. Document results and create bug reports
4. Optimize slow endpoints

---

*Generated: January 21, 2026 | Artisan AI Industrial Testing Suite*
