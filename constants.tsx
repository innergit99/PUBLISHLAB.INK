
import { ToolType, ToolConfig, PODStyle, KDPGenrePreset } from './types';

export const KDP_GENRES: KDPGenrePreset[] = [
  {
    id: 'romance', label: 'Romance Novel', category: 'FICTION', defaultTrim: '6" x 9"', defaultInterior: 'B&W',
    promptBase: 'Professional romance novel cover art, elegant characters, emotional lighting, bestseller style',
    minWords: 50000, maxWords: 90000, minChapters: 18, maxChapters: 30
  },
  {
    id: 'mystery', label: 'Mystery Thriller', category: 'FICTION', defaultTrim: '6" x 9"', defaultInterior: 'B&W',
    promptBase: 'Noir mystery book cover, dramatic shadows, silhouetted figure, cinematic',
    minWords: 60000, maxWords: 100000, minChapters: 25, maxChapters: 40
  },
  {
    id: 'fantasy', label: 'Fantasy Epic', category: 'FICTION', defaultTrim: '6" x 9"', defaultInterior: 'B&W',
    promptBase: 'Epic high-fantasy landscape, dragon soaring, magical artifacts, golden ratio',
    minWords: 80000, maxWords: 150000, minChapters: 30, maxChapters: 60
  },
  {
    id: 'sci-fi', label: 'Sci-Fi Space Opera', category: 'FICTION', defaultTrim: '6" x 9"', defaultInterior: 'B&W',
    promptBase: 'Space opera book cover, distant starships, vibrant nebula, high-tech aesthetic',
    minWords: 70000, maxWords: 120000, minChapters: 25, maxChapters: 45
  },
  {
    id: 'horror', label: 'Horror', category: 'FICTION', defaultTrim: '6" x 9"', defaultInterior: 'B&W',
    promptBase: 'Creepy horror book cover, psychological dread, dark atmosphere, minimal light, terrifying silhouette',
    minWords: 60000, maxWords: 90000, minChapters: 12, maxChapters: 25
  },
  {
    id: 'cozy-mystery', label: 'Cozy Mystery', category: 'FICTION', defaultTrim: '5" x 8" (Pocket)', defaultInterior: 'B&W',
    promptBase: 'Charming cozy mystery cover, small town setting, warm colors, cute cat or bakery element, non-threatening',
    minWords: 40000, maxWords: 65000, minChapters: 15, maxChapters: 25
  },
  {
    id: 'urban-fantasy', label: 'Urban Fantasy', category: 'FICTION', defaultTrim: '6" x 9"', defaultInterior: 'B&W',
    promptBase: 'Urban fantasy cover, city skyline at night, magical neon runes, leather jacket protagonist, glowing effects',
    minWords: 70000, maxWords: 100000, minChapters: 25, maxChapters: 40
  },
  {
    id: 'dark-romance', label: 'Dark Romance', category: 'FICTION', defaultTrim: '6" x 9"', defaultInterior: 'B&W',
    promptBase: 'Dark romance cover, gothic aesthetic, moody rose, broken glass, intense emotional shadow',
    minWords: 60000, maxWords: 100000, minChapters: 20, maxChapters: 35
  },
  {
    id: 'ya', label: 'Young Adult (YA)', category: 'FICTION', defaultTrim: '5.5" x 8.5" (Trade)', defaultInterior: 'B&W',
    promptBase: 'YA novel cover, symbolic object, bold typography, vibrant abstract background, relatable emotion',
    minWords: 50000, maxWords: 80000, minChapters: 20, maxChapters: 35
  },
  {
    id: 'historical', label: 'Historical Fiction', category: 'FICTION', defaultTrim: '6" x 9"', defaultInterior: 'B&W',
    promptBase: 'Historical fiction cover, period costume details, sweeping landscape, oil painting style, sepia tones',
    minWords: 80000, maxWords: 120000, minChapters: 20, maxChapters: 40
  },
  {
    id: 'psych-thriller', label: 'Psychological Thriller', category: 'FICTION', defaultTrim: '6" x 9"', defaultInterior: 'B&W',
    promptBase: 'Psychological thriller cover, shattered mirror or distorted face, cold blue tones, mental labyrinth',
    minWords: 65000, maxWords: 95000, minChapters: 25, maxChapters: 45
  },
  {
    id: 'manga', label: 'Manga (Shonen)', category: 'VISUAL_KIDS', defaultTrim: '5" x 7.5"', defaultInterior: 'B&W',
    promptBase: 'Dynamic shonen manga line art, sharp ink lines, dramatic perspective, screen tones',
    isFixedLayout: true, minChapters: 5, maxChapters: 10
  },
  {
    id: 'comic', label: 'Comic Book', category: 'VISUAL_KIDS', defaultTrim: '7" x 10"', defaultInterior: 'Color',
    promptBase: 'Golden age comic book style, bold outlines, vibrant halftone dots, action dynamic',
    isFixedLayout: true, minChapters: 1, maxChapters: 5
  },
  {
    id: 'picture-book', label: 'Children\'s Picture Book', category: 'VISUAL_KIDS', defaultTrim: '8.5" x 8.5"', defaultInterior: 'Color',
    promptBase: 'Whimsical watercolor illustration, friendly animals, soft textures',
    isFixedLayout: true, minWords: 300, maxWords: 1000, requiresAgeRange: true
  },
  {
    id: 'biography', label: 'Biography', category: 'NON_FICTION', defaultTrim: '6" x 9"', defaultInterior: 'B&W',
    promptBase: 'Modern minimalist biography cover, professional portrait silhouette, clean lines',
    minWords: 60000, maxWords: 120000, minChapters: 20, maxChapters: 40
  },
  {
    id: 'business', label: 'Business & Money', category: 'NON_FICTION', defaultTrim: '6" x 9"', defaultInterior: 'B&W',
    promptBase: 'High-end finance book cover, abstract geometric corporate patterns, expensive feel',
    minWords: 30000, maxWords: 70000, minChapters: 8, maxChapters: 20
  },
  {
    id: 'self-help', label: 'Self-Help', category: 'NON_FICTION', defaultTrim: '5.5" x 8.5"', defaultInterior: 'B&W',
    promptBase: 'Peaceful zen cover art, morning sunrise, calming minimalist colors',
    minWords: 25000, maxWords: 60000, minChapters: 7, maxChapters: 15
  },
  {
    id: 'coloring-adult', label: 'Coloring Book (Adult)', category: 'ACTIVITY_JOURNALS', defaultTrim: '8.5" x 11"', defaultInterior: 'B&W',
    promptBase: 'Highly intricate stress-relief mandala patterns, pure thin black lines, white background, no shading',
    isFixedLayout: true, minChapters: 30, maxChapters: 100 // Mapping pages to chapters
  },
  {
    id: 'coloring-kids', label: 'Kids Coloring Book', category: 'ACTIVITY_JOURNALS', defaultTrim: '8.5" x 11"', defaultInterior: 'B&W',
    promptBase: 'Simple bold outline coloring page for children, thick lines, playful characters, zero shading',
    isFixedLayout: true, minChapters: 20, maxChapters: 50
  },
  {
    id: 'coloring-kdp', label: 'KDP Coloring Page', category: 'ACTIVITY_JOURNALS', defaultTrim: '8.5" x 11"', defaultInterior: 'B&W',
    promptBase: 'Commercial grade KDP coloring book page, professional crisp black ink lines, white background, high-end thematic illustration, zero grey shading, zero gradients, vector clean',
    isFixedLayout: true
  },
  {
    id: 'journal', label: 'Daily Journal', category: 'ACTIVITY_JOURNALS', defaultTrim: '6" x 9"', defaultInterior: 'B&W',
    promptBase: 'Minimalist floral pattern for journal cover, textile texture, high quality',
    isFixedLayout: true
  },
  {
    id: 'planner', label: 'Planner', category: 'ACTIVITY_JOURNALS', defaultTrim: '8.5" x 11"', defaultInterior: 'B&W',
    promptBase: 'Modern organizational planner cover design, geometric elements, productivity aesthetic',
    isFixedLayout: true
  },
];

export const KDP_TRIM_SIZES = [
  '5" x 7.5" (Manga)',
  '5" x 8"',
  '5.25" x 8"',
  '5.5" x 8.5"',
  '6" x 9" (Standard)',
  '6.14" x 9.21"',
  '7" x 10"',
  '8" x 10"',
  '8.25" x 6" (Landscape)',
  '8.25" x 8.25" (Square)',
  '8.5" x 8.5" (Square)',
  '8" x 8" (Square)',
  '8.5" x 11" (Letter)'
];

export const KDP_TONES = ['Neutral', 'Emotional', 'Romantic', 'Suspenseful', 'Mysterious', 'Adventurous', 'Humorous / Lighthearted', 'Dark / Gritty', 'Inspirational / Uplifting', 'Dramatic', 'Whimsical', 'Professional', 'Educational'];

export const POD_STYLES: PODStyle[] = [
  // ==========================================
  // 1. TYPOGRAPHY & MINIMAL
  // ==========================================
  { id: 'clean-typography', label: 'Clean Typography', category: 'Typography', gradient: 'from-slate-800 to-black', previewUrl: 'https://images.pollinations.ai/prompt/clean%20minimalist%20sans-serif%20typography%20design%20black%20and%20white%20swiss%20design%20aesthetic?width=600&height=900&nologo=true&model=flux', promptSuffix: 'clean minimalist sans-serif typography, swiss design aesthetic, bold black text on solid background, professional layout' },
  { id: 'modern-heirloom', label: 'Modern Heirloom', category: 'Typography', gradient: 'from-stone-700 to-stone-900', previewUrl: 'https://images.pollinations.ai/prompt/elegant%20modern%20heirloom%20serif%20typography%20luxury%20fashion%20brand%20aesthetic%20high-contrast?width=600&height=900&nologo=true&model=flux', promptSuffix: 'elegant modern heirloom serif typography, luxury fashion brand aesthetic, high-contrast thick and thin strokes, sophisticated lettering' },
  { id: 'luxury-insignia', label: 'Luxury Insignia', category: 'Typography', gradient: 'from-neutral-800 to-neutral-950', previewUrl: 'https://images.pollinations.ai/prompt/luxury%20monogram%20insignia%20logo%20interlocking%20letters%20gold%20foil%20on%20black%20background?width=600&height=900&nologo=true&model=flux', promptSuffix: 'luxury monogram insignia logo, elegant interlocking letters, premium brand mark, sophisticated geometry' },
  { id: 'minimalist-authority', label: 'Minimal Authority', category: 'Typography', gradient: 'from-gray-800 to-gray-900', previewUrl: 'https://images.pollinations.ai/prompt/minimalist%20authority%20stamp%20logo%20bold%20geometric%20typography%20industrial%20brutalism?width=600&height=900&nologo=true&model=flux', promptSuffix: 'minimalist authority stamp logo, bold geometric typography, industrial brutalism influence, thick uniform lines' },
  { id: 'neo-classical', label: 'Neo-Classical', category: 'Typography', gradient: 'from-slate-700 to-slate-800', previewUrl: 'https://images.pollinations.ai/prompt/neo-classical%20precision%20typography%20roman%20proportions%20elegant%20tailor%20made%20lettering?width=600&height=900&nologo=true&model=flux', promptSuffix: 'neo-classical precision typography, architectural roman proportions, elegant tailor-made lettering, refined tracking' },
  { id: 'luxury-negative', label: 'Negative Space', category: 'Typography', gradient: 'from-zinc-800 to-black', previewUrl: 'https://images.pollinations.ai/prompt/clever%20luxury%20negative%20space%20typography%20logo%20hidden%20symbol%20minimalist%20genius%20design?width=600&height=900&nologo=true&model=flux', promptSuffix: 'clever luxury negative space typography, hidden optical illusion symbol in letters, minimalist genius design award winner' },
  { id: 'material-minimalism', label: 'Material Minimal', category: 'Typography', gradient: 'from-slate-600 to-slate-900', previewUrl: 'https://images.pollinations.ai/prompt/material%20minimalism%20typography%20subtle%20embossed%20paper%20texture%20clean%20avant-garde?width=600&height=900&nologo=true&model=flux', promptSuffix: 'material minimalism typography, subtle embossed paper texture effect, clean avant-garde layout, monochromatic depth' },
  { id: 'intellectual', label: 'Intellectual', category: 'Typography', gradient: 'from-emerald-900 to-black', previewUrl: 'https://images.pollinations.ai/prompt/intellectual%20statement%20typography%20editorial%20magazine%20layout%20academic%20book%20cover%20style?width=600&height=900&nologo=true&model=flux', promptSuffix: 'intellectual statement typography, editorial magazine layout cover style, dense sophisticated text blocks, scholarly aesthetic' },
  { id: 'high-fashion', label: 'High-Fashion', category: 'Typography', gradient: 'from-fuchsia-900 to-black', previewUrl: 'https://images.pollinations.ai/prompt/high-fashion%20minimal%20mark%20avant-garde%20typography%20haute%20couture%20brand%20identity?width=600&height=900&nologo=true&model=flux', promptSuffix: 'high-fashion minimal mark, avant-garde typography, haute couture brand identity, extremely wide kerning, ultra-modern' },
  { id: 'y2k-chrome', label: 'Y2K Chrome', category: 'Typography', gradient: 'from-slate-400 to-slate-600', previewUrl: 'https://images.pollinations.ai/prompt/y2k%20chrome%20liquid%20metallic%20typography%20futuristic%202000s%20aesthetic%203d%20render?width=600&height=900&nologo=true&model=flux', promptSuffix: 'liquid chrome metallic futuristic y2k text, massive size, shiny hyper-reflective surface, early 2000s cyber aesthetic' },
  { id: 'retro-70s', label: 'Retro 70s', category: 'Typography', gradient: 'from-amber-500 to-orange-600', previewUrl: 'https://images.pollinations.ai/prompt/1970s%20vintage%20groovy%20typography%20bold%20curved%20bubble%20letters%20warm%20tones?width=600&height=900&nologo=true&model=flux', promptSuffix: '1970s vintage groovy typography, bold wavy bubble letters, warm mustard and orange tones, touching edges, retro aesthetic' },
  { id: 'neon-sign', label: 'Neon Sign', category: 'Typography', gradient: 'from-pink-500 to-purple-600', previewUrl: 'https://images.pollinations.ai/prompt/glowing%20electric%20neon%20sign%20typography%20vibrant%20synthwave%20cyberpunk%20glow?width=600&height=900&nologo=true&model=flux', promptSuffix: 'glowing electric neon sign typography, vibrant luminous glass tubes, dark brick wall background, bright halo effect' },
  { id: 'graffiti-tag', label: 'Graffiti Tag', category: 'Typography', gradient: 'from-red-500 to-rose-700', previewUrl: 'https://images.pollinations.ai/prompt/street%20art%20graffiti%20tag%20spray%20paint%20typography%20urban%20underground%20culture?width=600&height=900&nologo=true&model=flux', promptSuffix: 'street art graffiti tag, drip paint spray effects, bold aggressive wildstyle lettering, urban underground hip-hop culture' },
  { id: 'heavy-metal', label: 'Heavy Metal', category: 'Typography', gradient: 'from-slate-700 to-slate-900', previewUrl: 'https://images.pollinations.ai/prompt/sharp%20aggressive%20heavy%20metal%20logo%20typography%20symmetrical%20death%20metal%20branches%20gothic?width=600&height=900&nologo=true&model=flux', promptSuffix: 'sharp aggressive heavy metal band logo, symmetrical death metal branching letters, extreme spiked typography' },
  { id: 'blackletter', label: 'Blackletter', category: 'Typography', gradient: 'from-stone-600 to-stone-800', previewUrl: 'https://images.pollinations.ai/prompt/ornate%20blackletter%20calligraphy%20gothic%20medieval%20font%20intricate%20flourishes%20dark%20ink?width=600&height=900&nologo=true&model=flux', promptSuffix: 'ornate medieval blackletter calligraphy, classic gothic font texture, intricate pen flourishes, traditional manuscript style' },
  { id: 'brush-script', label: 'Brush Script', category: 'Typography', gradient: 'from-amber-400 to-orange-500', previewUrl: 'https://images.pollinations.ai/prompt/handwritten%20brush%20script%20typography%20thick%20dry%20brush%20strokes%20casual%20energetic?width=600&height=900&nologo=true&model=flux', promptSuffix: 'handwritten brush script typography, thick dry brush strokes, casual energetic lettering, realistic ink textures' },
  { id: 'chalkboard', label: 'Chalkboard', category: 'Typography', gradient: 'from-slate-800 to-slate-950', previewUrl: 'https://images.pollinations.ai/prompt/chalkboard%20typography%20hand-drawn%20chalk%20lettering%20dusty%20blackboard%20cafe%20menu%20style?width=600&height=900&nologo=true&model=flux', promptSuffix: 'chalkboard typography, hand-drawn white chalk lettering, dusty vintage blackboard background, intricate cafe menu style typography' },

  // ==========================================
  // 2. VECTOR & MINIMALIST
  // ==========================================
  { id: 'sharp-vector', label: 'Sharp Vector', category: 'Vector', gradient: 'from-emerald-500 to-teal-600', previewUrl: 'https://images.pollinations.ai/prompt/clean%20minimalist%20flat%20vector%20illustration%20crisp%20edges%20solid%20colors%20modern?width=600&height=900&nologo=true&model=flux', promptSuffix: 'clean minimalist sharp flat vector illustration, crisp vector edges, solid unshaded colors, modern dribbble aesthetic' },
  { id: 'minimal-line', label: 'Minimal Line', category: 'Vector', gradient: 'from-slate-300 to-slate-500', previewUrl: 'https://images.pollinations.ai/prompt/continuous%20single%20monoline%20art%20drawing%20elegant%20minimalist%20black%20line%20on%20white?width=600&height=900&nologo=true&model=flux', promptSuffix: 'continuous single monoline art drawing, elegant minimalist black line on white background, abstract continuous contour' },
  { id: 'monoline-badge', label: 'Monoline Badge', category: 'Vector', gradient: 'from-amber-600 to-orange-700', previewUrl: 'https://images.pollinations.ai/prompt/hipster%20monoline%20badge%20emblem%20logo%20outdoors%20vintage%20monoline%20vector%20camping?width=600&height=900&nologo=true&model=flux', promptSuffix: 'hipster monoline badge emblem logo, outdoor adventure vintage monoline vector styling, circular stamp design' },
  { id: 'isometric', label: 'Isometric', category: 'Vector', gradient: 'from-blue-500 to-indigo-600', previewUrl: 'https://images.pollinations.ai/prompt/isometric%20vector%20art%203d%20projection%20geometric%20clean%20perspective%20candy%20colors?width=600&height=900&nologo=true&model=flux', promptSuffix: 'isometric vector art, perfect 30-degree 3D projection, geometric clean perspective, modern startup illustration style' },
  { id: 'low-poly', label: 'Low-Poly', category: 'Vector', gradient: 'from-purple-500 to-fuchsia-600', previewUrl: 'https://images.pollinations.ai/prompt/low-poly%203d%20geometric%20art%20faceted%20polygons%20sharp%20angles%20vibrant%20lighting?width=600&height=900&nologo=true&model=flux', promptSuffix: 'low-poly 3d geometric style, faceted polygon shading, sharp angular triangles, vibrant lighting gradients' },
  { id: 'abstract-geo', label: 'Abstract Geo', category: 'Vector', gradient: 'from-rose-500 to-pink-600', previewUrl: 'https://images.pollinations.ai/prompt/abstract%20geometric%20vector%20composition%20memphis%20design%20bold%20shapes%20modern%20art?width=600&height=900&nologo=true&model=flux', promptSuffix: 'abstract geometric vector composition, memphis design influence, bold intersecting shapes, primary and pastel colors' },

  // ==========================================
  // 3. ILLUSTRATIVE & CHARACTER
  // ==========================================
  { id: 'anime-manga', label: 'Anime & Manga', category: 'Illustrative', gradient: 'from-pink-400 to-rose-500', previewUrl: 'https://images.pollinations.ai/prompt/classic%2090s%20anime%20cel-shaded%20style%20illustration%20manga%20aesthetic%20sharp%20linework?width=600&height=900&nologo=true&model=flux', promptSuffix: 'retro 90s anime cel-shaded aesthetic, high quality studio ghibli or vintage manga illustration style, sharp linework' },
  { id: 'dark-gothic', label: 'Dark Gothic', category: 'Illustrative', gradient: 'from-stone-800 to-black', previewUrl: 'https://images.pollinations.ai/prompt/dark%20themed%20gothic%20fantasy%20illustration%20macabre%20victorian%20aesthetic%20dark%20fantasy?width=600&height=900&nologo=true&model=flux', promptSuffix: 'dark themed gothic fantasy illustration, macabre victorian aesthetic, moody shadows, intricate dark fantasy details' },
  { id: 'ukiyo-e', label: 'Ukiyo-e', category: 'Illustrative', gradient: 'from-teal-600 to-cyan-700', previewUrl: 'https://images.pollinations.ai/prompt/traditional%20japanese%20ukiyo-e%20woodblock%20print%20great%20wave%20hokusai%20style%20flat%20colors?width=600&height=900&nologo=true&model=flux', promptSuffix: 'traditional japanese ukiyo-e woodblock print aesthetic, classical edo period styling, flat muted colors, distinct elegant linework' },
  { id: 'pop-art', label: 'Pop Art', category: 'Illustrative', gradient: 'from-yellow-400 to-red-500', previewUrl: 'https://images.pollinations.ai/prompt/andy%20warhol%20pop%20art%20culture%20vibrant%20solid%20colors%20silkscreen%20printing%20aesthetic?width=600&height=900&nologo=true&model=flux', promptSuffix: '1960s pop art culture aesthetic, andy warhol silkscreen printing style, extreme vibrant contrasting solid colors' },
  { id: 'kawaii', label: 'Kawaii Sticker', category: 'Illustrative', gradient: 'from-pink-300 to-fuchsia-400', previewUrl: 'https://images.pollinations.ai/prompt/cute%20kawaii%20japanese%20sticker%20design%20pastel%20colors%20adorable%20chibi%20mascot?width=600&height=900&nologo=true&model=flux', promptSuffix: 'super cute kawaii japanese sticker design, soft pastel color palette, adorable mascot, thick white sticker border outline' },
  { id: 'chibi', label: 'Chibi Character', category: 'Illustrative', gradient: 'from-blue-400 to-indigo-400', previewUrl: 'https://images.pollinations.ai/prompt/chibi%20character%20proportions%20huge%20eyes%20small%20body%20cute%20anime%20style%20illustration?width=600&height=900&nologo=true&model=flux', promptSuffix: 'chibi anime character proportions, huge expressive eyes, small cute body layout, highly polished digital illustration' },
  { id: 'cartoon-fan', label: 'Cartoon Art', category: 'Illustrative', gradient: 'from-green-400 to-emerald-500', previewUrl: 'https://images.pollinations.ai/prompt/western%20animation%20cartoon%20character%20art%20dynamic%20action%20pose%20comic%20book%20style?width=600&height=900&nologo=true&model=flux', promptSuffix: 'dynamic western animation cartoon art, expressive action poses, thick outline comic book style coloring' },
  { id: 'pixel-art', label: 'Pixel Art', category: 'Illustrative', gradient: 'from-indigo-600 to-purple-800', previewUrl: 'https://images.pollinations.ai/prompt/8-bit%20retro%20pixel%20art%20retro%20video%20game%20sprite%2016-bit%20nostalgic%20aesthetic?width=600&height=900&nologo=true&model=flux', promptSuffix: '16-bit retro pixel art, classic video game sprite aesthetic, precise blocky pixels, highly detailed nostalgic gaming art' },
  { id: 'doodle', label: 'Hand Doodle', category: 'Illustrative', gradient: 'from-stone-300 to-stone-400', previewUrl: 'https://images.pollinations.ai/prompt/quirky%20hand-drawn%20doodle%20sketchbook%20art%20pen%20scribbles%20loose%20imperfect%20lines?width=600&height=900&nologo=true&model=flux', promptSuffix: 'quirky hand-drawn sketchbook doodle, pen scribbles, loose imperfect creative lines, organic and charming sketch aesthetic' },

  // ==========================================
  // 4. ARTISTIC & TEXTURAL
  // ==========================================
  { id: 'fine-art', label: 'Fine Art', category: 'Textural', gradient: 'from-amber-700 to-brown-900', previewUrl: 'https://images.pollinations.ai/prompt/classical%20fine%20art%20oil%20painting%20masterpiece%20thick%20impasto%20brushstrokes%20museum%20quality?width=600&height=900&nologo=true&model=flux', promptSuffix: 'classical fine art oil painting, traditional museum masterpiece, striking impasto brushstrokes, rich historical oils' },
  { id: 'watercolor-botanical', label: 'Watercolor', category: 'Textural', gradient: 'from-green-200 to-emerald-300', previewUrl: 'https://images.pollinations.ai/prompt/delicate%20watercolor%20botanical%20illustration%20translucent%20washes%20bleeding%20pigments?width=600&height=900&nologo=true&model=flux', promptSuffix: 'delicate watercolor botanical illustration, translucent bleeding pigment washes, soft organic textures, cold-press paper grain' },
  { id: 'collage', label: 'Paper Collage', category: 'Textural', gradient: 'from-rose-400 to-orange-400', previewUrl: 'https://images.pollinations.ai/prompt/mixed%20media%20cut-paper%20collage%20art%20magazine%20clippings%20punk%20zine%20aesthetic%20torn%20edges?width=600&height=900&nologo=true&model=flux', promptSuffix: 'mixed media cut-paper collage art, torn magazine clippings, raw layered textures, punk zine dadaist aesthetic' },
  { id: 'claymation', label: 'Claymation', category: 'Textural', gradient: 'from-orange-500 to-amber-600', previewUrl: 'https://images.pollinations.ai/prompt/stop-motion%20claymation%20look%20plasticine%20sculpture%20fingerprints%20visible%20tactile%203d?width=600&height=900&nologo=true&model=flux', promptSuffix: 'stop-motion claymation aesthetic, tactile plasticine clay materials, visible artist fingerprints, miniature set lighting, cute 3D' },
  { id: 'woodcut', label: 'Woodcut', category: 'Textural', gradient: 'from-stone-700 to-stone-900', previewUrl: 'https://images.pollinations.ai/prompt/traditional%20woodcut%20linocut%20block%20printing%20harsh%20carved%20lines%20ink%20textures?width=600&height=900&nologo=true&model=flux', promptSuffix: 'traditional woodcut linocut block print, harsh carved gouge lines, thick black ink roll textures, raw handmade aesthetic' },
  { id: 'risograph', label: 'Risograph', category: 'Textural', gradient: 'from-pink-500 to-cyan-500', previewUrl: 'https://images.pollinations.ai/prompt/risograph%20print%20aesthetic%20misregistered%20neon%20inks%20halftone%20dots%20soy%20ink%20texture?width=600&height=900&nologo=true&model=flux', promptSuffix: 'risograph printing aesthetic, intentionally misregistered neon overlapping inks, dense halftone dots, porous paper texture' },
  { id: 'screenprint', label: 'Screenprint', category: 'Textural', gradient: 'from-red-600 to-blue-700', previewUrl: 'https://images.pollinations.ai/prompt/2-color%20screenprint%20silkscreen%20poster%20art%20flat%20ink%20layers%20bold%20graphic%20design?width=600&height=900&nologo=true&model=flux', promptSuffix: '2-color screenprint silkscreen poster aesthetic, flat heavy ink layers, bold graphic design layout, slight print registration errors' },
  { id: 'rubber-stamp', label: 'Rubber Stamp', category: 'Textural', gradient: 'from-red-800 to-red-950', previewUrl: 'https://images.pollinations.ai/prompt/grungy%20rubber%20stamp%20ink%20impression%20distressed%20faded%20ink%20bureaucratic%20stamp?width=600&height=900&nologo=true&model=flux', promptSuffix: 'grungy rubber stamp ink impression, highly distressed and faded uneven ink, official bureaucratic stamp aesthetic' },
  { id: 'embroidered', label: 'Embroidery', category: 'Textural', gradient: 'from-indigo-700 to-purple-800', previewUrl: 'https://images.pollinations.ai/prompt/highly%20detailed%20embroidered%20cloth%20patch%20thick%20stitched%20threads%20fabric%20texture%20merrowed%20border?width=600&height=900&nologo=true&model=flux', promptSuffix: 'highly detailed embroidered cloth patch design, thick realistic stitched threads, woven fabric background, merrowed thick border' },
  { id: 'die-cut', label: 'Die-Cut Sticker', category: 'Textural', gradient: 'from-sky-400 to-blue-600', previewUrl: 'https://images.pollinations.ai/prompt/premium%20die-cut%20vinyl%20sticker%20thick%20white%20border%20drop%20shadow%20glossy%20finish?width=600&height=900&nologo=true&model=flux', promptSuffix: 'premium die-cut vinyl sticker, thick perfectly contoured white border outline, subtle casting drop shadow, glossy sticker finish' },

  // ==========================================
  // 5. VINTAGE & RETRO ERAS
  // ==========================================
  { id: 'halftone-comic', label: 'Halftone Comic', category: 'Retro', gradient: 'from-yellow-400 to-cyan-500', previewUrl: 'https://images.pollinations.ai/prompt/vintage%20halftone%20comic%20book%20art%20roy%20lichtenstein%20style%20cmyk%20dots%20pop%20art?width=600&height=900&nologo=true&model=flux', promptSuffix: 'vintage halftone comic book panel, roy lichtenstein pop art style, visible CMYK ben-day dots, cheap newsprint paper texture' },
  { id: 'bauhaus', label: 'Bauhaus', category: 'Retro', gradient: 'from-red-600 to-yellow-500', previewUrl: 'https://images.pollinations.ai/prompt/1920s%20bauhaus%20poster%20design%20strict%20geometric%20abstraction%20primary%20colors%20minimalist%20avant-garde?width=600&height=900&nologo=true&model=flux', promptSuffix: '1920s bauhaus design movement poster, strict geometric abstraction, pure primary colors (red, yellow, blue), rigid avant-garde layout' },
  { id: 'art-deco', label: 'Art Deco', category: 'Retro', gradient: 'from-yellow-600 to-neutral-900', previewUrl: 'https://images.pollinations.ai/prompt/1920s%20art%20deco%20roaring%20twenties%20great%20gatsby%20gold%20and%20black%20luxurious%20geometry?width=600&height=900&nologo=true&model=flux', promptSuffix: '1920s art deco roaring twenties elegance, luxurious gold and stark black geometry, great gatsby aesthetic, sleek metallic lines' },
  { id: 'mid-century', label: 'Mid-Century', category: 'Retro', gradient: 'from-orange-400 to-teal-600', previewUrl: 'https://images.pollinations.ai/prompt/1950s%20mid-century%20modern%20atomic%20age%20design%20retro-futurism%20boomerangs%20and%20starbursts?width=600&height=900&nologo=true&model=flux', promptSuffix: '1950s mid-century modern atomic age design, retro-futurism, boomerang and starburst motifs, pastel and atomic color palettes' },
  { id: 'grunge-90s', label: '90s Grunge', category: 'Retro', gradient: 'from-stone-600 to-stone-800', previewUrl: 'https://images.pollinations.ai/prompt/1990s%20grunge%20skate%20punk%20aesthetic%20dirty%20distressed%20textures%20angsty%20zine%20art?width=600&height=900&nologo=true&model=flux', promptSuffix: '1990s grunge skate punk aesthetic, highly distressed dirty textures, photocopy degradation, angsty alternative rock album cover vibe' },
  { id: 'vintage-tee', label: 'Vintage Tee', category: 'Retro', gradient: 'from-amber-800 to-orange-950', previewUrl: 'https://images.pollinations.ai/prompt/cracked%20faded%20vintage%2070s%20band%20tee%20print%20heavily%20wash-worn%20distressed%20apparel%20graphic?width=600&height=900&nologo=true&model=flux', promptSuffix: 'cracked and faded vintage 70s band tee print, heavily wash-worn distressed apparel graphic, faded retro colors, cracked plastisol ink' },

  // ==========================================
  // 6. TECH & MODERN VIBE
  // ==========================================
  { id: 'cyberpunk', label: 'Cyberpunk', category: 'Tech', gradient: 'from-fuchsia-600 to-purple-800', previewUrl: 'https://images.pollinations.ai/prompt/night%20city%20cyberpunk%20futuristic%20aesthetic%20neon%20pink%20cyan%20high-tech%20low-life?width=600&height=900&nologo=true&model=flux', promptSuffix: 'night city cyberpunk futuristic aesthetic, blazing neon pink and cyan lights, high-tech chrome elements, dystopian sci-fi mood' },
  { id: 'vaporwave', label: 'Vaporwave', category: 'Tech', gradient: 'from-pink-400 to-cyan-400', previewUrl: 'https://images.pollinations.ai/prompt/1980s%20vaporwave%20aesthetic%20roman%20busts%20palm%20trees%20windows%2095%20glitch%20magenta%20and%20cyan?width=600&height=900&nologo=true&model=flux', promptSuffix: '1980s vaporwave aesthetic, surreal roman classical busts, tropical palm trees, retro windows 95 UI glitch, heavy magenta and cyan' },
  { id: 'synthwave', label: 'Synthwave', category: 'Tech', gradient: 'from-purple-700 to-pink-600', previewUrl: 'https://images.pollinations.ai/prompt/outrun%20synthwave%20neon%20grid%20sunset%2080s%20retro-futurism%20chrome%20sports%20cars?width=600&height=900&nologo=true&model=flux', promptSuffix: 'outrun synthwave neon landscape, glowing wireframe grid, massive retro sunset, 80s retro-futurism, deep purple space background' },
  { id: 'blueprint', label: 'Blueprint', category: 'Tech', gradient: 'from-blue-700 to-indigo-900', previewUrl: 'https://images.pollinations.ai/prompt/technical%20blueprint%20schematic%20drawing%20white%20lines%20on%20deep%20blue%20paper%20engineering%20plans?width=600&height=900&nologo=true&model=flux', promptSuffix: 'highly technical blueprint schematic drawing, crisp white cyanotype lines on deep blue architectural paper, complex engineering plans' },
  { id: 'holographic', label: 'Holographic', category: 'Tech', gradient: 'from-purple-400 via-pink-400 to-cyan-400', previewUrl: 'https://images.pollinations.ai/prompt/iridescent%20holographic%20foil%20texture%20liquid%20rainbow%20colors%20glossy%20futuristic%20reflections?width=600&height=900&nologo=true&model=flux', promptSuffix: 'iridescent holographic foil texture, swirling liquid rainbow spectrum, hyper-glossy futuristic reflections, pearlescent material' },
  { id: 'neon-outline', label: 'Neon Outline', category: 'Tech', gradient: 'from-green-400 to-emerald-600', previewUrl: 'https://images.pollinations.ai/prompt/glowing%20neon%20wireframe%20outline%20art%20dark%20background%20laser%20light%20minimalist%20glow?width=600&height=900&nologo=true&model=flux', promptSuffix: 'glowing neon laser wireframe outline art, pitch black background, minimalist continuous glowing line, high-voltage light effect' }
];


export const TOOLS: ToolConfig[] = [
  // CORE (Core Publishing Factory)
  {
    id: ToolType.COLORING_PAGES,
    name: 'KDP Book Lab',
    description: 'Generate fully structured, KDP-compliant books for print and ebook from a single workflow.',
    icon: 'book-open',
    gradient: 'from-green-500 to-emerald-600',
    image: '/assets/dashboard/kdp_lab_monumental.png',
    category: 'CORE'
  },
  {
    id: ToolType.POD_MERCH,
    name: 'POD Designer',
    description: 'Design covers, interiors, and full-wrap assets for 30+ print-ready product types.',
    icon: 'shirt',
    gradient: 'from-pink-500 to-rose-600',
    image: '/assets/dashboard/pod_designer.png',
    category: 'CORE'
  },
  {
    id: ToolType.NICHE_RADAR,
    name: 'Niche Radar',
    description: 'Scan real-time market velocity to find viral entry points and high-profit gaps.',
    icon: 'target',
    gradient: 'from-red-500 to-orange-600',
    image: '/assets/dashboard/niche_radar_monumental.png',
    category: 'CORE'
  },
  {
    id: ToolType.TREND_INTELLIGENCE,
    name: 'Trend Intelligence',
    description: 'Discover profitable niches, demand signals, and saturation risk before you publish.',
    icon: 'trending-up',
    gradient: 'from-amber-400 to-orange-600',
    image: '/assets/dashboard/trend_monumental.png',
    category: 'CORE'
  },
  {
    id: ToolType.AMAZON_SEO,
    name: 'Amazon SEO Engine',
    description: 'Architect high-conversion listing metadata and optimized HTML sales copy.',
    icon: 'rocket',
    gradient: 'from-blue-600 to-indigo-700',
    image: '/assets/dashboard/amazon_seo.png',
    category: 'CORE'
  },

  // CREATIVE (Content & Aesthetic DNA)
  {
    id: ToolType.BRAND_INTELLIGENCE,
    name: 'Brand Analyzer',
    description: 'Reverse-engineer top-performing shops to extract successful design DNA.',
    icon: 'search',
    gradient: 'from-cyan-500 to-blue-600',
    image: '/assets/dashboard/brand_dna_stunning.png',
    category: 'CREATIVE'
  },
  {
    id: ToolType.LOGO_CREATOR,
    name: 'Logo Creator',
    description: 'Build a full brand identity system with vector-ready logos and style guides.',
    icon: 'box',
    gradient: 'from-blue-500 to-cyan-600',
    image: '/assets/dashboard/logo_creator.png',
    category: 'CREATIVE'
  },
  {
    id: ToolType.TEXT_TO_IMAGE,
    name: 'Text to Image',
    description: 'Render industrial-grade commercial visuals and assets for POD manufacturing.',
    icon: 'palette',
    gradient: 'from-purple-500 to-indigo-600',
    image: '/assets/dashboard/text_to_image.png',
    category: 'CREATIVE'
  },
  {
    id: ToolType.MANUSCRIPT_DOCTOR,
    name: 'Manuscript Doctor',
    description: 'Upload your manuscript to fix flow, repetition, formatting, and KDP compliance issues.',
    icon: 'file-edit',
    gradient: 'from-purple-500 to-pink-600',
    image: '/assets/dashboard/manuscript_doctor.png',
    category: 'CREATIVE'
  },

  // UTILITY (Industrial Utilities)
  {
    id: ToolType.BAN_SHIELD,
    name: 'KDP Ban Shield',
    description: 'Pre-publication policy audit to protect your account from rejections and bans.',
    icon: 'shield-check',
    gradient: 'from-slate-700 to-slate-900',
    image: '/assets/dashboard/kdp_ban_shield.png',
    category: 'UTILITY'
  },
  {
    id: ToolType.PROFIT_ESTIMATOR,
    name: 'Profit Estimator',
    description: 'Model your royalties, ROI, and suggested market pricing before you launch.',
    icon: 'bar-chart-3',
    gradient: 'from-emerald-400 to-teal-600',
    image: '/assets/dashboard/profit_estimator.png',
    category: 'UTILITY'
  },
  {
    id: ToolType.HD_UPSCALER,
    name: 'HD Upscaler',
    description: 'Restore assets to industrial 300DPI resolution for large-scale physical print.',
    icon: 'maximize',
    gradient: 'from-blue-400 to-indigo-600',
    image: '/assets/dashboard/hd_upscaler.png',
    category: 'UTILITY'
  },
  {
    id: ToolType.OBJECT_ISOLATOR,
    name: 'Object Isolator',
    description: 'Isolate subjects with precision anti-aliased edges for clean POD compositions.',
    icon: 'scissors',
    gradient: 'from-violet-500 to-purple-700',
    image: '/assets/dashboard/object_isolator_precision.png',
    category: 'UTILITY'
  }
];
