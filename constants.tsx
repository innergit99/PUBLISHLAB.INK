
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
  // 1. UPLOAD / EDIT (HANDLED AS EXTERNAL CARD IN UI)

  // 2. NEW TRENDING STYLES (v3.5 - High-Power)
  { id: 'caricature-trend', label: 'Caricature', category: 'Modern', gradient: 'from-orange-400 to-amber-600', previewUrl: 'https://images.pollinations.ai/prompt/professional%20caricature%20portrait%20illustration%20highly%20detailed%20exaggerated%20features%20vibrant%20colors?width=600&height=900&nologo=true&model=flux', promptSuffix: 'highly detailed exaggerated caricature portrait, professional digital illustration, vibrant colors, clean linework, isolated' },
  { id: 'lunar-new-year', label: 'Lunar Year', category: 'Retro', gradient: 'from-red-600 to-gold-500', previewUrl: 'https://images.pollinations.ai/prompt/lunar%20new%20year%20celebration%20aesthetic%20scarlet%20and%20gold%20asian%20design%20ornate%20dragons%20and%20lanterns?width=600&height=900&nologo=true&model=flux', promptSuffix: 'Lunar New Year aesthetic, scarlet and gold color palette, ornate traditional Asian patterns, festive lanterns, dragons, gold foil texture, isolated' },
  { id: 'flower-petals', label: 'Flower Petals', category: 'Artistic', gradient: 'from-pink-300 to-rose-400', previewUrl: 'https://images.pollinations.ai/prompt/soft%20organic%20flower%20petals%20floating%20delicate%20botanical%20illustration%20watercolor%20textures?width=600&height=900&nologo=true&model=flux', promptSuffix: 'soft organic flower petals, delicate botanical illustration, watercolor textures, floating petals, elegant floral arrangement, isolated' },
  { id: 'gold-industrial', label: 'Gold', category: 'Gothic', gradient: 'from-yellow-600 to-amber-800', previewUrl: 'https://images.pollinations.ai/prompt/liquid%20gold%20and%20metallic%20textures%20industrial%20luxury%20design%20molten%20gold%20drips?width=600&height=900&nologo=true&model=flux', promptSuffix: 'liquid gold and metallic textures, industrial luxury design, molten gold drips, high-shine luxury aesthetic, realistic reflections, isolated' },
  { id: 'crayon-sketch', label: 'Crayon', category: 'Artistic', gradient: 'from-sky-400 to-blue-500', previewUrl: 'https://images.pollinations.ai/prompt/hand-drawn%20artistic%20crayon%20textures%20childlike%20wonder%20vibrant%20waxy%20textures?width=600&height=900&nologo=true&model=flux', promptSuffix: 'hand-drawn artistic crayon textures, vibrant waxy colors, childlike wonder aesthetic, rough paper texture, expressive linework, isolated' },
  { id: 'paparazzi-photography', label: 'Paparazzi', category: 'Modern', gradient: 'from-slate-800 to-zinc-950', previewUrl: 'https://images.pollinations.ai/prompt/paparazzi%20celebrity%20photography%20high-flash%20dramatic%20lighting%20midnight%20street%20aesthetic?width=600&height=900&nologo=true&model=flux', promptSuffix: 'paparazzi celebrity photography style, high-flash dramatic lighting, midnight street aesthetic, high contrast, cinematic candid look, isolated' },
  { id: 'cloud-scape', label: 'Clouds', category: 'Artistic', gradient: 'from-blue-200 to-sky-400', previewUrl: 'https://images.pollinations.ai/prompt/dreamy%20cloud-scape%20surreal%20fluffy%20clouds%20golden%20hour%20lighting%20ethereal%20skies?width=600&height=900&nologo=true&model=flux', promptSuffix: 'dreamy cloud-scape, surreal fluffy clouds, golden hour lighting, ethereal skies, soft heavenly textures, isolated' },
  { id: 'dept-photoshoot', label: 'Photoshoot', category: 'Retro', gradient: 'from-gray-300 to-slate-400', previewUrl: 'https://images.pollinations.ai/prompt/vintage%2090s%20department%20store%20studio%20backdrop%20aesthetic%20soft%20focus%20glamour?width=600&height=900&nologo=true&model=flux', promptSuffix: 'vintage 90s department store studio backdrop aesthetic, soft focus glamour, textured gray background, classic portrait lighting, isolated' },
  { id: 'camcorder-vhs', label: 'Camcorder', category: 'Retro', gradient: 'from-teal-800 to-emerald-950', previewUrl: 'https://images.pollinations.ai/prompt/lo-fi%20VHS%20glitch%20photography%20camcorder%20distortion%20tracking%20lines%2090s%20aesthetic?width=600&height=900&nologo=true&model=flux', promptSuffix: 'lo-fi VHS glitch photography, camcorder distortion, tracking lines, 90s aesthetic, color bleeding, scanlines, isolated' },
  { id: 'neon-fantasy', label: 'Neon Fantasy', category: 'Modern', gradient: 'from-purple-500 to-pink-500', previewUrl: 'https://images.pollinations.ai/prompt/vibrant%20rainbow-spectrum%20fantasy%20art%20neon%20magical%20glow%20ethereal%20creatures?width=600&height=900&nologo=true&model=flux', promptSuffix: 'vibrant rainbow-spectrum fantasy art, neon magical glow, ethereal particles, cosmic color palette, high-power fantasy aesthetic, isolated' },
  { id: 'norman-rockwell', label: 'Rockwell', category: 'Artistic', gradient: 'from-amber-100 to-orange-200', previewUrl: 'https://images.pollinations.ai/prompt/classic%20American%20illustrative%20realism%20Norman%20Rockwell%20style%20nostalgic%20Americana?width=600&height=900&nologo=true&model=flux', promptSuffix: 'classic American illustrative realism, Norman Rockwell style, nostalgic Americana aesthetic, rich narrative detail, warm natural lighting, isolated' },
  { id: 'iconic-bw', label: 'Iconic', category: 'Modern', gradient: 'from-gray-900 to-black', previewUrl: 'https://images.pollinations.ai/prompt/high-contrast%20black%20and%20white%20cinematic%20portrait%20noir%20aesthetic%20iconic%20photography?width=600&height=900&nologo=true&model=flux', promptSuffix: 'high-contrast black and white cinematic photography, noir aesthetic, dramatic lighting, iconic portrait style, deep blacks, pure whites, isolated' },
  { id: 'pop-surrealism', label: 'Surrealism', category: 'Artistic', gradient: 'from-purple-400 to-cyan-400', previewUrl: 'https://images.pollinations.ai/prompt/pop%20surrealism%20art%20ethereal%20dreamscape%20vibrant%20pastel%20colors%20magical%20realism?width=600&height=900&nologo=true&model=flux', promptSuffix: 'pop surrealism art, ethereal dreamscape, vibrant pastel colors, magical realism, sharp focus, whimsical details, isolated' },
  { id: 'dark-academia', label: 'Academia', category: 'Gothic', gradient: 'from-stone-800 to-sepia-900', previewUrl: 'https://images.pollinations.ai/prompt/dark%20academia%20aesthetic%20moody%20intellectual%20vintage%20books%20and%20candles%20tweed%20textures?width=600&height=900&nologo=true&model=flux', promptSuffix: 'dark academia aesthetic, moody intellectual atmosphere, vintage textures, sepia tones, cinematic lighting, isolated' },
  { id: 'stipple-art', label: 'Stipple', category: 'Artistic', gradient: 'from-slate-400 to-slate-600', previewUrl: 'https://images.pollinations.ai/prompt/detailed%20stipple%20art%20illustration%20pointillism%20dot-work%20black%20ink%20on%20white%20paper?width=600&height=900&nologo=true&model=flux', promptSuffix: 'detailed stipple art illustration, pointillism, meticulous dot-work, black ink aesthetic, high contrast, isolated' },
  { id: 'blueprint-schematic', label: 'Blueprint', category: 'Modern', gradient: 'from-blue-700 to-indigo-900', previewUrl: 'https://images.pollinations.ai/prompt/technical%20architectural%20blueprint%20schematic%20white%20lines%20on%20blue%20paper%20detailed%20engineering?width=600&height=900&nologo=true&model=flux', promptSuffix: 'technical architectural blueprint, engineering schematic, white cyanotype lines on blue paper, grid background, precise details, isolated' },
  { id: 'urban-glitch', label: 'Glitch', category: 'Modern', gradient: 'from-fuchsia-500 to-cyan-500', previewUrl: 'https://images.pollinations.ai/prompt/urban%20glitch%20art%20digital%20distortion%20cyberpunk%20vandalism%20aesthetic%20neon%20drips?width=600&height=900&nologo=true&model=flux', promptSuffix: 'urban glitch art, digital distortion, cyberpunk vandalism aesthetic, neon chromatic aberration, high energy, isolated' },

  // 3. RESTORED CORE STYLES (v1.0 - v3.4)
  { id: '3d-text', label: '3D Text', category: 'Modern', gradient: 'from-blue-600 to-cyan-500', previewUrl: 'https://images.pollinations.ai/prompt/massive%203D%20text%20glossy%20cyan%20finish?width=600&height=900&nologo=true&model=flux', promptSuffix: 'massive 3D rendered text, huge depth, glossy finish, isolated on a solid uniform PURE background, high contrast, macro scale' },
  { id: 'retro-70s', label: 'Retro 70s', category: 'Retro', gradient: 'from-amber-500 to-orange-600', previewUrl: 'https://images.pollinations.ai/prompt/1970s%20vintage%20groovy%20typography%20bold?width=600&height=900&nologo=true&model=flux', promptSuffix: '1970s vintage groovy typography, bold center-aligned text, touching edges, isolated on a solid uniform PURE background' },
  { id: 'neon-sign', label: 'Neon Sign', category: 'Modern', gradient: 'from-pink-500 to-purple-600', previewUrl: 'https://images.pollinations.ai/prompt/glowing%20electric%20neon%20sign%20style%20vibrant?width=600&height=900&nologo=true&model=flux', promptSuffix: 'glowing electric neon sign style, vibrant tubes, isolated on a solid uniform PURE background' },
  { id: 'cyberpunk', label: 'Cyberpunk', category: 'Modern', gradient: 'from-fuchsia-600 to-purple-700', previewUrl: 'https://images.pollinations.ai/prompt/cyberpunk%20aesthetic%20neon%20pink%20and%20teal?width=600&height=900&nologo=true&model=flux', promptSuffix: 'cyberpunk aesthetic, high-tech neon details, futuristic chrome elements, vibrant pink and teal, isolated on black' },
  { id: 'die-cut-sticker', label: 'Sticker', category: 'Modern', gradient: 'from-indigo-500 to-purple-600', previewUrl: 'https://images.pollinations.ai/prompt/die-cut%20sticker%20design%20white%20border?width=600&height=900&nologo=true&model=flux', promptSuffix: 'Professional die-cut sticker design, 5mm white border, subtle drop shadow, glossy vinyl finish, isolated on neutral' },
  { id: 'y2k-chrome', label: 'Y2K Chrome', category: 'Modern', gradient: 'from-slate-300 to-slate-500', promptSuffix: 'liquid chrome metallic futuristic text, massive size, isolated on a solid uniform PURE background' },
  { id: 'graffiti', label: 'Graffiti Tag', category: 'Artistic', gradient: 'from-red-500 to-rose-600', promptSuffix: 'street art graffiti tag, drip paint effects, bold aggressive lettering, high contrast, isolated on black background' },
  { id: 'heavy-metal', label: 'Heavy Metal', category: 'Gothic', gradient: 'from-slate-700 to-slate-900', promptSuffix: 'sharp aggressive metallic font, symmetrical death metal logo style, high contrast, isolated on solid background' },
  { id: 'sharp-vector', label: 'Flat Vector', category: 'Modern', gradient: 'from-emerald-500 to-teal-600', promptSuffix: 'clean minimalist flat vector illustration, thick outlines, isolated on a solid uniform PURE background' },
  { id: 'anime-manga', label: 'Anime 90s', category: 'Artistic', gradient: 'from-pink-400 to-rose-500', promptSuffix: 'classic 90s anime cel-shaded style, sharp linework, isolated on a solid uniform PURE background' },
  { id: 'watercolor', label: 'Watercolor', category: 'Artistic', gradient: 'from-sky-400 to-blue-500', promptSuffix: 'bleeding watercolor paint textures, artistic splashes, soft edge paper, isolated on white background' },
  { id: 'line-art', label: 'Line Art', category: 'Artistic', gradient: 'from-slate-400 to-slate-600', promptSuffix: 'continuous single line drawing, black on white, elegant simplicity, isolated on white background' },
  { id: 'synthwave', label: 'Synthwave', category: 'Retro', gradient: 'from-purple-600 to-pink-600', promptSuffix: '1980s synthwave retro-futurism, grid patterns, chrome sun, saturated purples, isolated on dark background' },
  { id: 'bauhaus', label: 'Bauhaus', category: 'Artistic', gradient: 'from-red-500 to-amber-500', promptSuffix: 'Bauhaus industrial design, geometric abstraction, primary colors, clean stark lines, isolated on off-white' },
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
