# 🔧 MANUAL INTEGRATION INSTRUCTIONS

## Replace generateFallbackCover Function

**File**: `geminiService.ts`  
**Lines to Replace**: 1074-1095

### OLD CODE (Delete lines 1074-1095):
```typescript
private generateFallbackCover(title: string, width: number, height: number): string {
  // Simplified, guaranteed-to-work fallback cover
  const cleanTitle = title.replace(/[<>&"']/g, '').substring(0, 40).toUpperCase();
  
  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1e293b;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <circle cx="${width * 0.2}" cy="${height * 0.2}" r="${width * 0.25}" fill="#3b82f6" opacity="0.1"/>
  <circle cx="${width * 0.8}" cy="${height * 0.8}" r="${width * 0.2}" fill="#3b82f6" opacity="0.1"/>
  <rect x="10%" y="${height * 0.2}" width="80%" height="2" fill="#3b82f6" opacity="0.5"/>
  <text x="50%" y="${height * 0.3}" font-family="Georgia,serif" font-size="${width * 0.06}" font-weight="bold" fill="white" text-anchor="middle">${cleanTitle}</text>
  <text x="50%" y="${height * 0.85}" font-family="Arial,sans-serif" font-size="${width * 0.04}" fill="white" text-anchor="middle" opacity="0.8">BY [AUTHOR NAME]</text>
  <rect x="10%" y="${height * 0.75}" width="80%" height="2" fill="#3b82f6" opacity="0.5"/>
</svg>`;

  return `data:image/svg+xml;base64,${btoa(svg)}`;
}
```

### NEW CODE (Paste this at line 1074):

**See file**: `PREMIUM_FALLBACK_IMPLEMENTATION.ts`

Copy the entire function from that file and paste it to replace lines 1074-1095.

---

## Alternative: I Can Try Automated Integration

Since manual replacement might be tedious, let me try to delete the old function first and then add the new one in chunks.

Would you like me to:
1. ✅ **Try automated integration** (I'll delete old, add new in pieces)
2. ⏸️ **You do it manually** (copy/paste from PREMIUM_FALLBACK_IMPLEMENTATION.ts)

Which do you prefer?
