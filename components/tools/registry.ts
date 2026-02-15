import { ToolType } from '../../types';
import { ToolComponent } from './types';

// Registry for lazy-loaded tool components
// Phase 1: All tools point to PlaceholderTool
// Phase 2: We'll gradually replace these with actual tool imports
export const toolRegistry: Record<ToolType, () => Promise<{ default: ToolComponent }>> = {
  [ToolType.DASHBOARD]: () => import('./PlaceholderTool').then(m => ({ default: m.PlaceholderTool })),
  [ToolType.TEXT_TO_IMAGE]: () => import('./PlaceholderTool').then(m => ({ default: m.PlaceholderTool })),
  [ToolType.POD_MERCH]: () => import('./PlaceholderTool').then(m => ({ default: m.PlaceholderTool })),
  [ToolType.LOGO_CREATOR]: () => import('./PlaceholderTool').then(m => ({ default: m.PlaceholderTool })),
  [ToolType.COLORING_PAGES]: () => import('./PlaceholderTool').then(m => ({ default: m.PlaceholderTool })),
  [ToolType.MANUSCRIPT_DOCTOR]: () => import('./PlaceholderTool').then(m => ({ default: m.PlaceholderTool })),
  [ToolType.OBJECT_ISOLATOR]: () => import('./PlaceholderTool').then(m => ({ default: m.PlaceholderTool })),
  [ToolType.HD_UPSCALER]: () => import('./PlaceholderTool').then(m => ({ default: m.PlaceholderTool })),
  [ToolType.PATTERN_MAKER]: () => import('./PlaceholderTool').then(m => ({ default: m.PlaceholderTool })),
  [ToolType.TREND_INTELLIGENCE]: () => import('./PlaceholderTool').then(m => ({ default: m.PlaceholderTool })),
  [ToolType.BRAND_INTELLIGENCE]: () => import('./PlaceholderTool').then(m => ({ default: m.PlaceholderTool })),
  [ToolType.NICHE_RADAR]: () => import('./PlaceholderTool').then(m => ({ default: m.PlaceholderTool })),
  [ToolType.VIRAL_HOOKS]: () => import('./PlaceholderTool').then(m => ({ default: m.PlaceholderTool })),
  [ToolType.AMAZON_SEO]: () => import('./PlaceholderTool').then(m => ({ default: m.PlaceholderTool })),
  [ToolType.PROFIT_ESTIMATOR]: () => import('./PlaceholderTool').then(m => ({ default: m.PlaceholderTool })),
  [ToolType.CLICK_TESTER]: () => import('./PlaceholderTool').then(m => ({ default: m.PlaceholderTool })),
  [ToolType.BAN_SHIELD]: () => import('./PlaceholderTool').then(m => ({ default: m.PlaceholderTool })),
  [ToolType.STOREFRONT_BUILDER]: () => import('./PlaceholderTool').then(m => ({ default: m.PlaceholderTool })),
  [ToolType.SALES_PAGE_BUILDER]: () => import('./PlaceholderTool').then(m => ({ default: m.PlaceholderTool })),
  [ToolType.HEALTH_MONITOR]: () => import('./PlaceholderTool').then(m => ({ default: m.PlaceholderTool })),
  [ToolType.MY_GALLERY]: () => import('./PlaceholderTool').then(m => ({ default: m.PlaceholderTool })),
  [ToolType.CHARACTER_VAULT]: () => import('./PlaceholderTool').then(m => ({ default: m.PlaceholderTool })),
  [ToolType.SETTINGS]: () => import('./PlaceholderTool').then(m => ({ default: m.PlaceholderTool })),
};

// Helper to check if a tool has been migrated
export const isToolMigrated = (toolType: ToolType): boolean => {
  // Will be updated as we migrate tools in Phase 2
  return false;
};
