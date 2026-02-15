import { ToolType } from '../../types';
import { ToolComponent } from './types';

// =============================================================================
// TOOL REGISTRY - Modular Architecture
// =============================================================================
// 
// PHILOSOPHY:
// - Each tool is lazy-loaded for optimal bundle size
// - Fully extracted tools get their own file
// - Complex tools (temporarily) use wrappers that delegate to ToolView
// - PlaceholderTool shows "Migration in Progress" for incomplete extractions
//
// STATUS LEGEND:
// ✅ FULLY EXTRACTED - Independent component with full functionality
// 🔀 WRAPPER - Delegates to ToolView temporarily (complex tools)
// ⏳ PLACEHOLDER - Shows migration message (not yet extracted)
//
// =============================================================================

export const toolRegistry: Record<ToolType, () => Promise<{ default: ToolComponent }>> = {
  
  // ===========================================================================
  // CORE PUBLISHING TOOLS
  // ===========================================================================
  
  // KDP Book Lab - Complex wizard with 6 steps, AI deck, auto-save
  // Status: 🔀 WRAPPER (1,700+ lines, extraction in progress)
  [ToolType.COLORING_PAGES]: () => import('./KdpBookLabTool').then(m => ({ default: m.KdpBookLabTool })),
  [ToolType.MANUSCRIPT_DOCTOR]: () => import('./KdpBookLabTool').then(m => ({ default: m.KdpBookLabTool })),
  
  // POD Designer - Product catalog, style selection, mockup generation
  // Status: 🔀 WRAPPER (800+ lines, extraction in progress)
  [ToolType.POD_MERCH]: () => import('./PodDesignerTool').then(m => ({ default: m.PodDesignerTool })),
  [ToolType.TEXT_TO_IMAGE]: () => import('./PodDesignerTool').then(m => ({ default: m.PodDesignerTool })),
  
  // ===========================================================================
  // MARKET INTELLIGENCE
  // ===========================================================================
  
  // Trend Intelligence - Market dashboard with real-time data
  // Status: 🔀 WRAPPER (complex dashboard with tabs)
  [ToolType.TREND_INTELLIGENCE]: () => import('./TrendIntelligenceTool').then(m => ({ default: m.TrendIntelligenceTool })),
  
  // Niche Radar - Already has dedicated page (TrendRadarPage)
  // Status: ✅ FULLY EXTRACTED (via App.tsx routing)
  [ToolType.NICHE_RADAR]: () => import('./PlaceholderTool').then(m => ({ default: m.PlaceholderTool })),
  
  // ===========================================================================
  // OPTIMIZATION TOOLS
  // ===========================================================================
  
  // Amazon SEO - Multi-step dossier generator
  // Status: 🔀 WRAPPER (complex form with validation)
  [ToolType.AMAZON_SEO]: () => import('./AmazonSeoTool').then(m => ({ default: m.AmazonSeoTool })),
  
  // Brand Intelligence - DNA analysis with report visualization
  // Status: 🔀 WRAPPER (complex report display)
  [ToolType.BRAND_INTELLIGENCE]: () => import('./BrandIntelligenceTool').then(m => ({ default: m.BrandIntelligenceTool })),
  
  // Profit Estimator - Royalty calculator
  // Status: ✅ FULLY EXTRACTED
  [ToolType.PROFIT_ESTIMATOR]: () => import('./ProfitEstimatorTool').then(m => ({ default: m.ProfitEstimatorTool })),
  
  // ===========================================================================
  // CREATIVE TOOLS
  // ===========================================================================
  
  // Logo Creator - Brand genesis with 16-agent engine
  // Status: ✅ FULLY EXTRACTED
  [ToolType.LOGO_CREATOR]: () => import('./LogoCreatorTool').then(m => ({ default: m.LogoCreatorTool })),
  
  // ===========================================================================
  // UTILITY TOOLS
  // ===========================================================================
  
  // Ban Shield - Policy compliance checker
  // Status: ✅ FULLY EXTRACTED
  [ToolType.BAN_SHIELD]: () => import('./BanShieldTool').then(m => ({ default: m.BanShieldTool })),
  
  // Character Vault - Character continuity engine
  // Status: ✅ FULLY EXTRACTED
  [ToolType.CHARACTER_VAULT]: () => import('./CharacterVaultTool').then(m => ({ default: m.CharacterVaultTool })),
  
  // HD Upscaler - 4K image restoration
  // Status: ✅ FULLY EXTRACTED
  [ToolType.HD_UPSCALER]: () => import('./HdUpscalerTool').then(m => ({ default: m.HdUpscalerTool })),
  
  // Object Isolator - Background removal
  // Status: ✅ FULLY EXTRACTED
  [ToolType.OBJECT_ISOLATOR]: () => import('./ObjectIsolatorTool').then(m => ({ default: m.ObjectIsolatorTool })),
  
  // ===========================================================================
  // SPECIAL / NOT IMPLEMENTED
  // ===========================================================================
  
  // Dashboard - Handled separately in App.tsx
  [ToolType.DASHBOARD]: () => import('./PlaceholderTool').then(m => ({ default: m.PlaceholderTool })),
  
  // My Gallery - Handled separately in App.tsx
  [ToolType.MY_GALLERY]: () => import('./PlaceholderTool').then(m => ({ default: m.PlaceholderTool })),
  
  // Settings - Handled separately in App.tsx
  [ToolType.SETTINGS]: () => import('./PlaceholderTool').then(m => ({ default: m.PlaceholderTool })),
  
  // ===========================================================================
  // FUTURE TOOLS (Not Yet Implemented)
  // ===========================================================================
  
  [ToolType.PATTERN_MAKER]: () => import('./PlaceholderTool').then(m => ({ default: m.PlaceholderTool })),
  [ToolType.VIRAL_HOOKS]: () => import('./PlaceholderTool').then(m => ({ default: m.PlaceholderTool })),
  [ToolType.CLICK_TESTER]: () => import('./PlaceholderTool').then(m => ({ default: m.PlaceholderTool })),
  [ToolType.STOREFRONT_BUILDER]: () => import('./PlaceholderTool').then(m => ({ default: m.PlaceholderTool })),
  [ToolType.SALES_PAGE_BUILDER]: () => import('./PlaceholderTool').then(m => ({ default: m.PlaceholderTool })),
  [ToolType.HEALTH_MONITOR]: () => import('./PlaceholderTool').then(m => ({ default: m.PlaceholderTool })),
};

// =============================================================================
// MIGRATION STATUS TRACKING
// =============================================================================

export type MigrationStatus = 'FULLY_EXTRACTED' | 'WRAPPER' | 'PLACEHOLDER' | 'NOT_APPLICABLE';

export const toolMigrationStatus: Record<ToolType, MigrationStatus> = {
  // Fully Extracted (6 tools)
  [ToolType.PROFIT_ESTIMATOR]: 'FULLY_EXTRACTED',
  [ToolType.BAN_SHIELD]: 'FULLY_EXTRACTED',
  [ToolType.CHARACTER_VAULT]: 'FULLY_EXTRACTED',
  [ToolType.OBJECT_ISOLATOR]: 'FULLY_EXTRACTED',
  [ToolType.HD_UPSCALER]: 'FULLY_EXTRACTED',
  [ToolType.LOGO_CREATOR]: 'FULLY_EXTRACTED',
  
  // Wrapper Mode (delegates to ToolView)
  [ToolType.COLORING_PAGES]: 'WRAPPER',
  [ToolType.MANUSCRIPT_DOCTOR]: 'WRAPPER',
  [ToolType.POD_MERCH]: 'WRAPPER',
  [ToolType.TEXT_TO_IMAGE]: 'WRAPPER',
  [ToolType.TREND_INTELLIGENCE]: 'WRAPPER',
  [ToolType.AMAZON_SEO]: 'WRAPPER',
  [ToolType.BRAND_INTELLIGENCE]: 'WRAPPER',
  
  // Not Applicable (handled in App.tsx)
  [ToolType.DASHBOARD]: 'NOT_APPLICABLE',
  [ToolType.MY_GALLERY]: 'NOT_APPLICABLE',
  [ToolType.SETTINGS]: 'NOT_APPLICABLE',
  [ToolType.NICHE_RADAR]: 'NOT_APPLICABLE',
  
  // Future / Placeholder
  [ToolType.PATTERN_MAKER]: 'PLACEHOLDER',
  [ToolType.VIRAL_HOOKS]: 'PLACEHOLDER',
  [ToolType.CLICK_TESTER]: 'PLACEHOLDER',
  [ToolType.STOREFRONT_BUILDER]: 'PLACEHOLDER',
  [ToolType.SALES_PAGE_BUILDER]: 'PLACEHOLDER',
  [ToolType.HEALTH_MONITOR]: 'PLACEHOLDER',
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

export const isToolMigrated = (toolType: ToolType): boolean => {
  return toolMigrationStatus[toolType] === 'FULLY_EXTRACTED';
};

export const getMigrationStats = () => {
  const statuses = Object.values(toolMigrationStatus);
  return {
    fullyExtracted: statuses.filter(s => s === 'FULLY_EXTRACTED').length,
    wrapper: statuses.filter(s => s === 'WRAPPER').length,
    placeholder: statuses.filter(s => s === 'PLACEHOLDER').length,
    notApplicable: statuses.filter(s => s === 'NOT_APPLICABLE').length,
    total: Object.keys(ToolType).length / 2, // Enum has reverse mappings
  };
};
