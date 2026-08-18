# Graph Report - ARTISAN AI  (2026-08-18)

## Corpus Check
- 97 files · ~49,991 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 778 nodes · 1573 edges · 47 communities (31 shown, 16 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 56 edges (avg confidence: 0.73)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 5
- Community 6
- Community 7
- Community 8
- Community 9
- Community 10
- Community 11
- Community 12
- Community 13
- Community 14
- Community 15
- Community 16
- Community 17
- Community 18
- Community 19
- Community 20
- Community 21
- Community 22
- Community 23
- Community 24
- Community 25
- Community 26
- Community 27
- Community 28
- Community 29
- Community 30
- Community 31
- Community 32
- Community 33
- Community 34
- Community 35
- Community 38
- Community 39
- Community 40
- Community 41
- Community 42
- Community 43
- Community 44
- Community 45

## God Nodes (most connected - your core abstractions)
1. `GeminiService` - 62 edges
2. `CoverGenerator` - 56 edges
3. `KDPBlueprint` - 40 edges
4. `ManuscriptDoctorService` - 29 edges
5. `ToolView (Monster UI Component)` - 28 edges
6. `ToolComponentProps (interface)` - 28 edges
7. `KDPProject` - 28 edges
8. `getCurrentUser()` - 20 edges
9. `ToolType` - 19 edges
10. `gemini` - 18 edges

## Surprising Connections (you probably didn't know these)
- `analytics` --semantically_similar_to--> `gemini`  [AMBIGUOUS] [semantically similar]
  analyticsService.ts → geminiService.ts
- `Compliance Service (SEO/KDP)` --semantically_similar_to--> `callBackendText`  [INFERRED] [semantically similar]
  complianceService.ts → backendConfig.ts
- `AI Service Wrapper` --semantically_similar_to--> `HuggingFace Backend Service`  [INFERRED] [semantically similar]
  aiServiceWrapper.ts → hfBackendService.ts
- `Compliance Service (SEO/KDP)` --semantically_similar_to--> `KDP Compliance Validator`  [INFERRED] [semantically similar]
  complianceService.ts → kdpValidator.ts
- `Local Service (Ollama)` --semantically_similar_to--> `Compliance Service (SEO/KDP)`  [INFERRED] [semantically similar]
  localService.ts → complianceService.ts

## Import Cycles
- None detected.

## Communities (47 total, 16 thin omitted)

### Community 1 - "Community 1"
Cohesion: 0.07
Nodes (18): SkillsTabProps, SmartUploadCopilot(), SmartUploadCopilotProps, ExportService, GamificationScore, GamificationService, CharacterProfile, ContinuityIssue (+10 more)

### Community 3 - "Community 3"
Cohesion: 0.07
Nodes (17): CoAuthorEditor(), CoAuthorEditorProps, exporter, TRIM_MAP, KDP_LIMITS, KDPCalculator, KDPDimensions, PaperType (+9 more)

### Community 4 - "Community 4"
Cohesion: 0.06
Nodes (34): Author Persona Database, CoverFoundryPage, CoverFoundryPage(), GenerativeBrain, globalNodes, IndustrialReactorNode, LivePipelineTerminal, NeuralNetworkBackground (+26 more)

### Community 5 - "Community 5"
Cohesion: 0.10
Nodes (9): ManuscriptDoctorPage(), ManuscriptUploaderProps, Change, ContextProfile, ManuscriptDoctorService, ManuscriptUpload, RewriteMode, RewriteReport (+1 more)

### Community 6 - "Community 6"
Cohesion: 0.08
Nodes (18): Printful Mockup Proxy (Vercel Serverless), generateMockup() — Printful, MOCKUP_TEMPLATES, MockupResult, PrintfulMockupOptions, PrintfulMockupService, PRODUCT_VARIANTS, PRODUCT_SHAPES Templates (+10 more)

### Community 7 - "Community 7"
Cohesion: 0.10
Nodes (21): AI Service Wrapper, AI Service Singleton, Backend URL Config, callBackendImage, callBackendText, checkBackendHealth, Cover Generator Singleton, Environment Config (+13 more)

### Community 8 - "Community 8"
Cohesion: 0.09
Nodes (30): KDP_GENERATION_STEPS (constant export), AIDisclosureModal, AuthModal, CharacterVault, CoAuthorEditor, Dashboard, GalleryView, GenerationProgressBar (+22 more)

### Community 9 - "Community 9"
Cohesion: 0.14
Nodes (19): AUTHOR_PERSONAS, AuthorPersona, NicheRadarViewProps, GENRE_ENGINES, GenreLogic, KDP_GENRE_SPECS, hfBackend, intelligenceService (+11 more)

### Community 10 - "Community 10"
Cohesion: 0.10
Nodes (18): AIDisclosureModal(), AIDisclosureModalProps, CheckboxRowProps, GenerationProgressBar(), GenerationProgressBarProps, GenerationStep, KDP_GENERATION_STEPS, NicheRadarView() (+10 more)

### Community 11 - "Community 11"
Cohesion: 0.10
Nodes (6): CharacterVault(), MigrationStatus, toolMigrationStatus, ToolComponent, ToolWithImageGenComponent, ToolWithImageGenerationProps

### Community 12 - "Community 12"
Cohesion: 0.15
Nodes (13): AuthModal(), AuthModalProps, AuthMode, InfographicsPage(), InfographicsPageProps, COLOR_MAP, OnboardingOverlay(), OnboardingOverlayProps (+5 more)

### Community 13 - "Community 13"
Cohesion: 0.13
Nodes (15): Dashboard(), DashboardProps, IconMap, INTENT_PRIORITY, RecentProject, PODDesignerCard(), PODDesignerCardProps, productImages (+7 more)

### Community 14 - "Community 14"
Cohesion: 0.18
Nodes (10): aiService, AIServiceWrapper, API_ENDPOINTS, BACKEND_URL, callBackendImage(), callBackendText(), checkBackendHealth(), FALLBACK_TO_LOCAL (+2 more)

### Community 15 - "Community 15"
Cohesion: 0.19
Nodes (15): ErrorDisplay (shared), ErrorDisplay(), ErrorDisplayProps, Shared Tools Index (barrel), LoadingState (shared), LoadingState(), LoadingStateProps, ToolContainer (shared) (+7 more)

### Community 16 - "Community 16"
Cohesion: 0.14
Nodes (16): Cover Generator Class, Download Service, Export Service (Print PDF), Gamification Service, Gamification Service Singleton, HdUpscalerTool (extracted), KDP Calculator (Print Physics), KDP Physical Limits (+8 more)

### Community 17 - "Community 17"
Cohesion: 0.17
Nodes (14): App — Root React Component, handleNavigate() — Auth Gate, index.tsx — React Entry Point, getAllImages(), saveImage(), StorageService (IndexedDB + Supabase), Supabase Client, CharacterProfile Interface (+6 more)

### Community 18 - "Community 18"
Cohesion: 0.15
Nodes (12): Paddle Webhook Handler (Vercel), PricingPage(), PricingPageProps, TIERS, TIER_COLORS, TIER_ICONS, UPGRADE_TIERS, UpgradeModal (+4 more)

### Community 19 - "Community 19"
Cohesion: 0.17
Nodes (12): App(), root, rootElement, canPerformAction(), getCachedTier(), getUsage(), handleCheckoutClosed(), handleCheckoutCompleted() (+4 more)

### Community 20 - "Community 20"
Cohesion: 0.16
Nodes (12): GalleryView(), GalleryViewProps, ToolViewProps, KDP_GENRES, KDP_TONES, KDP_TRIM_SIZES, POD_STYLES, TOOLS (+4 more)

### Community 21 - "Community 21"
Cohesion: 0.33
Nodes (14): AmazonSeoTool (wrapper), BanShieldTool (extracted), BrandIntelligenceTool (wrapper), CharacterVaultTool (extracted), Compliance Service (SEO/KDP), Tool Registry, ToolComponentProps (interface), ToolView (Monster UI Component) (+6 more)

### Community 22 - "Community 22"
Cohesion: 0.26
Nodes (8): ToolViewInner(), UsageMeter, UsageMeterProps, getCurrentTier(), SubscriptionTier, UsageGuard Class, UsageGuard, UsageStats

### Community 23 - "Community 23"
Cohesion: 0.19
Nodes (5): CoverOptions, KDPWrapOptions, visualBroker, VisualRequest, VisualResilienceBroker

### Community 24 - "Community 24"
Cohesion: 0.23
Nodes (6): downloadService, EXPORT_BLOCKERS, EXPORT_WARNINGS, ExportValidationResult, kdpExportValidator, visualService

### Community 27 - "Community 27"
Cohesion: 0.22
Nodes (8): KDP_GENRES Presets, PlannerGenerator Class, GENRE_MATRIX Intelligence, StructureService (Genre + Layout), SudokuGenerator Class, KDPGenrePreset Interface, KDPProject Interface, WordSearchGenerator Class

### Community 28 - "Community 28"
Cohesion: 0.38
Nodes (5): analytics, identify(), init(), KEY, track()

### Community 30 - "Community 30"
Cohesion: 0.29
Nodes (3): ollama, OLLAMA_MODELS, OllamaService

### Community 31 - "Community 31"
Cohesion: 0.60
Nodes (4): getTierFromItems(), handler(), PRICE_TO_TIER, verifyPaddleSignature()

### Community 34 - "Community 34"
Cohesion: 0.50
Nodes (4): MCP Config Schema (Zod), MCP Bridge Service, OllamaService Class, Ollama Local AI Service

## Ambiguous Edges - Review These
- `analytics` → `gemini`  [AMBIGUOUS]
  analyticsService.ts · relation: semantically_similar_to

## Knowledge Gaps
- **135 isolated node(s):** `AIDisclosureModalProps`, `CheckboxRowProps`, `AuthModalProps`, `AuthMode`, `CoAuthorEditorProps` (+130 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `analytics` and `gemini`?**
  _Edge tagged AMBIGUOUS (relation: semantically_similar_to) - confidence is low._
- **Why does `CoverGenerator` connect `Community 2` to `Community 9`, `Community 7`, `Community 23`?**
  _High betweenness centrality (0.120) - this node is a cross-community bridge._
- **Why does `GeminiService` connect `Community 0` to `Community 9`, `Community 1`, `Community 7`?**
  _High betweenness centrality (0.092) - this node is a cross-community bridge._
- **Why does `ToolView (Monster UI Component)` connect `Community 21` to `Community 3`, `Community 4`, `Community 6`, `Community 10`, `Community 11`, `Community 12`, `Community 15`, `Community 16`, `Community 22`, `Community 28`?**
  _High betweenness centrality (0.089) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `ToolView (Monster UI Component)` (e.g. with `Tool Registry` and `ToolRouter`) actually correct?**
  _`ToolView (Monster UI Component)` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `AIDisclosureModalProps`, `CheckboxRowProps`, `AuthModalProps` to the rest of the system?**
  _135 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.06533575317604355 - nodes in this community are weakly interconnected._