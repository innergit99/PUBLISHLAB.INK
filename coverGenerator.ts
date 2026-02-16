/**
 * Canvas-Based Cover Generator
 * Creates professional book covers without external API dependencies
 */

interface CoverOptions {
    title: string;
    author: string;
    genre: string;
    width?: number;
    height?: number;
    colorScheme?: 'vibrant' | 'dark' | 'minimal' | 'elegant';
}

export interface KDPWrapOptions extends CoverOptions {
    pageCount: number;
    paperType: 'white' | 'cream' | 'color'; // KDP paper thickness varies
    trimWidth: number; // e.g., 6
    trimHeight: number; // e.g., 9
    bleed?: number; // usually 0.125
    blurb?: string;
}

export class CoverGenerator {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    constructor() {
        if (typeof document !== 'undefined') {
            this.canvas = document.createElement('canvas');
            const context = this.canvas.getContext('2d');
            if (!context) throw new Error('Canvas not supported');
            this.ctx = context;
        } else {
            // Fallback for SSR or non-browser environments if needed
            this.canvas = {} as any;
            this.ctx = {} as any;
        }
    }

    /**
     * Generate a creative, intelligent cover design
     * Creates unique covers based on title, genre, and content analysis
     */
    async generateCover(options: CoverOptions): Promise<string> {
        const {
            title,
            author,
            genre,
            width = 1600,
            height = 2400,
            colorScheme = 'vibrant'
        } = options;

        this.canvas.width = width;
        this.canvas.height = height;

        // Intelligent title and genre analysis
        const titleAnalysis = this.analyzeTitle(title);
        const creativeSeed = this.generateCreativeSeed(title, 0);
        
        // Dynamic palette based on genre and title mood
        const palette = this.generateDynamicPalette(genre, titleAnalysis.mood, 0, 1);

        // Create unique cover composition
        this.createUniqueCoverComposition(title, author, titleAnalysis, palette, creativeSeed, width, height);

        return this.canvas.toDataURL('image/png', 0.95);
    }

    /**
     * Analyze title for mood and themes
     */
    private analyzeTitle(title: string): any {
        const words = title.toLowerCase().split(/\s+/);
        
        // Mood detection from title
        const moodKeywords = {
            dark: ['dark', 'shadow', 'night', 'black', 'death', 'blood', 'evil', 'curse'],
            light: ['light', 'bright', 'sun', 'dawn', 'hope', 'joy', 'love', 'dream'],
            mysterious: ['secret', 'mystery', 'hidden', 'unknown', 'enigma', 'puzzle', 'code'],
            epic: ['war', 'battle', 'kingdom', 'empire', 'legend', 'chronicle', 'saga'],
            magical: ['magic', 'spell', 'witch', 'wizard', 'enchant', 'potion', 'myth'],
            romantic: ['love', 'heart', 'kiss', 'passion', 'romance', 'desire', 'embrace']
        };
        
        let moodScores = {};
        for (const [mood, keywords] of Object.entries(moodKeywords)) {
            moodScores[mood] = keywords.filter(word => words.includes(word)).length;
        }
        
        const dominantMood = Object.entries(moodScores).reduce((a, b) => 
            moodScores[a[0]] > moodScores[b[0]] ? a : b)[0] || 'neutral';
        
        // Visual elements from title
        const visualElements = {
            nature: ['forest', 'mountain', 'river', 'sea', 'tree', 'flower', 'sky', 'moon', 'star'],
            urban: ['city', 'street', 'building', 'tower', 'bridge', 'alley', 'neon'],
            magical: ['dragon', 'wizard', 'spell', 'potion', 'crystal', 'realm', 'portal'],
            cosmic: ['space', 'star', 'galaxy', 'planet', 'universe', 'cosmos', 'nebula'],
            medieval: ['king', 'queen', 'knight', 'castle', 'sword', 'crown', 'throne'],
            modern: ['tech', 'digital', 'cyber', 'future', 'robot', 'AI', 'code']
        };
        
        let elementScores = {};
        for (const [element, keywords] of Object.entries(visualElements)) {
            elementScores[element] = keywords.filter(word => words.includes(word)).length;
        }
        
        return {
            mood: dominantMood,
            visualElements: Object.entries(elementScores).filter(([_, score]) => (score as number) > 0).map(([element, _]) => element),
            wordCount: words.length,
            complexity: title.length > 30 ? 'complex' : title.length > 15 ? 'moderate' : 'simple',
            hasNumber: /\d/.test(title),
            keywords: words.filter(word => word.length > 4)
        };
    }

    /**
     * Create unique cover composition
     */
    private createUniqueCoverComposition(title: string, author: string, analysis: any, palette: any, seed: number, width: number, height: number): void {
        const random = this.seededRandom(seed);
        
        // Choose cover style based on analysis
        const coverStyles = [
            () => this.createModernMinimalCover(title, author, analysis, palette, random, width, height),
            () => this.createAbstractArtCover(title, author, analysis, palette, random, width, height),
            () => this.createSymbolicCover(title, author, analysis, palette, random, width, height),
            () => this.createTypographicCover(title, author, analysis, palette, random, width, height),
            () => this.createGeometricCover(title, author, analysis, palette, random, width, height),
            () => this.createIllustrativeCover(title, author, analysis, palette, random, width, height),
            () => this.createCosmicCover(title, author, analysis, palette, random, width, height),
            () => this.createDramaticCover(title, author, analysis, palette, random, width, height)
        ];
        
        const styleIndex = Math.floor(random() * coverStyles.length);
        coverStyles[styleIndex]();
    }

    /**
     * Modern minimal cover style
     */
    private createModernMinimalCover(title: string, author: string, analysis: any, palette: any, random: any, width: number, height: number): void {
        // Clean gradient background
        const gradient = this.ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, palette.background);
        gradient.addColorStop(0.7, palette.primary);
        gradient.addColorStop(1, palette.secondary);
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, width, height);
        
        // Subtle geometric element
        this.ctx.strokeStyle = palette.accent;
        this.ctx.lineWidth = 2;
        this.ctx.globalAlpha = 0.3;
        const centerX = width / 2;
        const centerY = height / 2;
        const size = Math.min(width, height) * 0.6;
        
        this.ctx.beginPath();
        this.ctx.moveTo(centerX - size/2, centerY - size/3);
        this.ctx.lineTo(centerX + size/2, centerY - size/3);
        this.ctx.lineTo(centerX + size/3, centerY + size/2);
        this.ctx.lineTo(centerX - size/3, centerY + size/2);
        this.ctx.closePath();
        this.ctx.stroke();
        
        this.ctx.globalAlpha = 1;
        
        // Title and author
        this.drawCoverText(title, author, palette, width, height, 'modern');
    }

    /**
     * Abstract art cover style
     */
    private createAbstractArtCover(title: string, author: string, analysis: any, palette: any, random: any, width: number, height: number): void {
        // Dynamic background with abstract shapes
        const bgGradient = this.ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, Math.max(width, height)/2);
        bgGradient.addColorStop(0, palette.primary);
        bgGradient.addColorStop(0.5, palette.secondary);
        bgGradient.addColorStop(1, palette.background);
        this.ctx.fillStyle = bgGradient;
        this.ctx.fillRect(0, 0, width, height);
        
        // Abstract flowing shapes
        for (let i = 0; i < 8; i++) {
            const x = random() * width;
            const y = random() * height;
            const radius = 50 + random() * 150;
            
            const shapeGradient = this.ctx.createRadialGradient(x, y, 0, x, y, radius);
            shapeGradient.addColorStop(0, palette.accent);
            shapeGradient.addColorStop(1, 'transparent');
            
            this.ctx.fillStyle = shapeGradient;
            this.ctx.globalAlpha = 0.1 + random() * 0.3;
            this.ctx.beginPath();
            this.ctx.arc(x, y, radius, 0, Math.PI * 2);
            this.ctx.fill();
        }
        
        this.ctx.globalAlpha = 1;
        
        // Title and author
        this.drawCoverText(title, author, palette, width, height, 'artistic');
    }

    /**
     * Symbolic cover style
     */
    private createSymbolicCover(title: string, author: string, analysis: any, palette: any, random: any, width: number, height: number): void {
        // Dark, mysterious background
        const gradient = this.ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, '#0a0a0a');
        gradient.addColorStop(0.5, palette.primary);
        gradient.addColorStop(1, '#0a0a0a');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, width, height);
        
        // Central symbolic element
        const centerX = width / 2;
        const centerY = height / 2;
        const symbols = this.generateSymbolsForMood(analysis.mood);
        const mainSymbol = symbols[Math.floor(random() * symbols.length)];
        
        // Glowing symbol
        this.ctx.save();
        this.ctx.translate(centerX, centerY);
        this.ctx.rotate(random() * Math.PI * 0.2);
        
        // Outer glow
        for (let i = 5; i > 0; i--) {
            this.ctx.font = `${100 + i * 20}px Arial`;
            this.ctx.fillStyle = palette.accent;
            this.ctx.globalAlpha = 0.05 * i;
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(mainSymbol, 0, 0);
        }
        
        // Main symbol
        this.ctx.font = '120px Arial';
        this.ctx.fillStyle = '#ffffff';
        this.ctx.globalAlpha = 0.9;
        this.ctx.fillText(mainSymbol, 0, 0);
        
        this.ctx.restore();
        this.ctx.globalAlpha = 1;
        
        // Title and author
        this.drawCoverText(title, author, palette, width, height, 'mysterious');
    }

    /**
     * Typographic cover style
     */
    private createTypographicCover(title: string, author: string, analysis: any, palette: any, random: any, width: number, height: number): void {
        // Clean background
        this.ctx.fillStyle = palette.background;
        this.ctx.fillRect(0, 0, width, height);
        
        // Large typographic treatment
        const words = title.split(' ');
        const centerX = width / 2;
        const centerY = height / 2;
        
        words.forEach((word, index) => {
            const fontSize = 60 + (words.length - index) * 15;
            const yOffset = (index - words.length/2) * (fontSize * 0.8);
            
            this.ctx.save();
            this.ctx.translate(centerX, centerY + yOffset);
            
            // Word background
            this.ctx.fillStyle = palette.primary;
            this.ctx.globalAlpha = 0.1;
            this.ctx.fillRect(-200, -fontSize/2, 400, fontSize);
            
            // Word text
            this.ctx.font = `bold ${fontSize}px Arial`;
            this.ctx.fillStyle = palette.accent;
            this.ctx.globalAlpha = 0.9;
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(word.toUpperCase(), 0, 0);
            
            this.ctx.restore();
        });
        
        this.ctx.globalAlpha = 1;
        
        // Author name
        this.ctx.font = '24px Arial';
        this.ctx.fillStyle = palette.secondary;
        this.ctx.textAlign = 'center';
        this.ctx.fillText(author, centerX, height - 100);
    }

    /**
     * Geometric cover style
     */
    private createGeometricCover(title: string, author: string, analysis: any, palette: any, random: any, width: number, height: number): void {
        // Gradient background
        const gradient = this.ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, palette.background);
        gradient.addColorStop(0.5, palette.primary);
        gradient.addColorStop(1, palette.secondary);
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, width, height);
        
        // Geometric pattern overlay
        const gridSize = 40;
        const shapes = ['circle', 'triangle', 'square'];
        
        for (let x = gridSize; x < width; x += gridSize * 2) {
            for (let y = gridSize; y < height; y += gridSize * 2) {
                if (random() > 0.3) {
                    const shape = shapes[Math.floor(random() * shapes.length)];
                    const color = [palette.primary, palette.secondary, palette.tertiary, palette.accent][Math.floor(random() * 4)];
                    
                    this.ctx.fillStyle = color;
                    this.ctx.globalAlpha = 0.2 + random() * 0.3;
                    
                    this.ctx.save();
                    this.ctx.translate(x, y);
                    this.ctx.rotate(random() * Math.PI * 2);
                    
                    switch(shape) {
                        case 'circle':
                            this.ctx.beginPath();
                            this.ctx.arc(0, 0, gridSize/3, 0, Math.PI * 2);
                            this.ctx.fill();
                            break;
                        case 'triangle':
                            this.ctx.beginPath();
                            this.ctx.moveTo(0, -gridSize/3);
                            this.ctx.lineTo(-gridSize/3, gridSize/3);
                            this.ctx.lineTo(gridSize/3, gridSize/3);
                            this.ctx.closePath();
                            this.ctx.fill();
                            break;
                        case 'square':
                            this.ctx.fillRect(-gridSize/4, -gridSize/4, gridSize/2, gridSize/2);
                            break;
                    }
                    
                    this.ctx.restore();
                }
            }
        }
        
        this.ctx.globalAlpha = 1;
        
        // Title and author
        this.drawCoverText(title, author, palette, width, height, 'bold');
    }

    /**
     * Illustrative cover style
     */
    private createIllustrativeCover(title: string, author: string, analysis: any, palette: any, random: any, width: number, height: number): void {
        // Scene background
        const gradient = this.ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, palette.background);
        gradient.addColorStop(0.6, palette.primary);
        gradient.addColorStop(1, palette.secondary);
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, width, height);
        
        // Illustrative elements based on visual elements
        const centerX = width / 2;
        const centerY = height / 2;
        
        if (analysis.visualElements.includes('nature')) {
            // Draw simplified landscape
            this.drawSimpleLandscape(centerX, centerY, width, height, palette, random);
        } else if (analysis.visualElements.includes('urban')) {
            // Draw simplified cityscape
            this.drawSimpleCityscape(centerX, centerY, width, height, palette, random);
        } else if (analysis.visualElements.includes('magical')) {
            // Draw magical elements
            this.drawSimpleMagicalScene(centerX, centerY, width, height, palette, random);
        } else {
            // Generic abstract illustration
            this.drawSimpleAbstractScene(centerX, centerY, width, height, palette, random);
        }
        
        // Title and author
        this.drawCoverText(title, author, palette, width, height, 'illustrative');
    }

    /**
     * Cosmic cover style
     */
    private createCosmicCover(title: string, author: string, analysis: any, palette: any, random: any, width: number, height: number): void {
        // Space background
        const gradient = this.ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, Math.max(width, height)/2);
        gradient.addColorStop(0, '#0a0a2e');
        gradient.addColorStop(0.5, '#161650');
        gradient.addColorStop(1, '#000000');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, width, height);
        
        // Stars
        for (let i = 0; i < 200; i++) {
            const x = random() * width;
            const y = random() * height;
            const size = random() * 2;
            const brightness = random();
            
            this.ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
            this.ctx.beginPath();
            this.ctx.arc(x, y, size, 0, Math.PI * 2);
            this.ctx.fill();
        }
        
        // Nebula effect
        const nebulaGradient = this.ctx.createRadialGradient(width/2, height/3, 0, width/2, height/3, width/3);
        nebulaGradient.addColorStop(0, palette.accent);
        nebulaGradient.addColorStop(0.5, palette.primary);
        nebulaGradient.addColorStop(1, 'transparent');
        this.ctx.fillStyle = nebulaGradient;
        this.ctx.globalAlpha = 0.3;
        this.ctx.fillRect(0, 0, width, height);
        
        this.ctx.globalAlpha = 1;
        
        // Title and author
        this.drawCoverText(title, author, palette, width, height, 'cosmic');
    }

    /**
     * Dramatic cover style
     */
    private createDramaticCover(title: string, author: string, analysis: any, palette: any, random: any, width: number, height: number): void {
        // High contrast background
        const gradient = this.ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, '#000000');
        gradient.addColorStop(0.3, palette.primary);
        gradient.addColorStop(0.7, palette.secondary);
        gradient.addColorStop(1, '#000000');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, width, height);
        
        // Dramatic lighting effect
        const lightGradient = this.ctx.createRadialGradient(width/2, height/3, 0, width/2, height/3, width/2);
        lightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
        lightGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.1)');
        lightGradient.addColorStop(1, 'transparent');
        this.ctx.fillStyle = lightGradient;
        this.ctx.fillRect(0, 0, width, height);
        
        // Dramatic element
        const centerX = width / 2;
        const centerY = height / 2;
        
        this.ctx.strokeStyle = palette.accent;
        this.ctx.lineWidth = 3;
        this.ctx.globalAlpha = 0.8;
        
        // Dramatic shape
        this.ctx.beginPath();
        this.ctx.moveTo(centerX - 100, centerY - 150);
        this.ctx.lineTo(centerX + 100, centerY - 150);
        this.ctx.lineTo(centerX + 50, centerY + 100);
        this.ctx.lineTo(centerX - 50, centerY + 100);
        this.ctx.closePath();
        this.ctx.stroke();
        
        this.ctx.globalAlpha = 1;
        
        // Title and author
        this.drawCoverText(title, author, palette, width, height, 'dramatic');
    }

    /**
     * Draw cover text with different styles
     */
    private drawCoverText(title: string, author: string, palette: any, width: number, height: number, style: string): void {
        const centerX = width / 2;
        let titleY = height / 2;
        
        this.ctx.save();
        
        switch(style) {
            case 'modern':
                this.ctx.font = 'bold 48px Arial';
                this.ctx.fillStyle = '#ffffff';
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                this.ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
                this.ctx.shadowBlur = 10;
                this.ctx.fillText(title, centerX, titleY);
                
                this.ctx.font = '24px Arial';
                this.ctx.fillStyle = palette.accent;
                this.ctx.fillText(author, centerX, titleY + 80);
                break;
                
            case 'artistic':
                this.ctx.font = 'bold 56px Georgia';
                this.ctx.fillStyle = '#ffffff';
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                this.ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
                this.ctx.shadowBlur = 15;
                this.ctx.fillText(title.toUpperCase(), centerX, titleY);
                
                this.ctx.font = 'italic 20px Georgia';
                this.ctx.fillStyle = palette.secondary;
                this.ctx.fillText(author, centerX, titleY + 100);
                break;
                
            case 'mysterious':
                this.ctx.font = 'bold 52px serif';
                this.ctx.fillStyle = '#ffffff';
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                this.ctx.shadowColor = palette.accent;
                this.ctx.shadowBlur = 20;
                this.ctx.fillText(title, centerX, titleY);
                
                this.ctx.font = '18px serif';
                this.ctx.fillStyle = palette.accent;
                this.ctx.fillText(author, centerX, titleY + 90);
                break;
                
            case 'bold':
                this.ctx.font = 'bold 64px Arial';
                this.ctx.fillStyle = '#ffffff';
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                this.ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
                this.ctx.shadowBlur = 12;
                this.ctx.fillText(title.toUpperCase(), centerX, titleY);
                
                this.ctx.font = 'bold 22px Arial';
                this.ctx.fillStyle = palette.primary;
                this.ctx.fillText(author, centerX, titleY + 100);
                break;
                
            case 'illustrative':
                this.ctx.font = 'bold 46px Georgia';
                this.ctx.fillStyle = '#ffffff';
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                this.ctx.strokeStyle = '#000000';
                this.ctx.lineWidth = 3;
                this.ctx.strokeText(title, centerX, titleY);
                this.ctx.fillText(title, centerX, titleY);
                
                this.ctx.font = '20px Georgia';
                this.ctx.fillStyle = palette.secondary;
                this.ctx.fillText(author, centerX, titleY + 80);
                break;
                
            case 'cosmic':
                this.ctx.font = 'bold 58px Arial';
                this.ctx.fillStyle = '#ffffff';
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                this.ctx.shadowColor = palette.accent;
                this.ctx.shadowBlur = 25;
                this.ctx.fillText(title, centerX, titleY);
                
                this.ctx.font = '22px Arial';
                this.ctx.fillStyle = palette.tertiary;
                this.ctx.fillText(author, centerX, titleY + 90);
                break;
                
            case 'dramatic':
                this.ctx.font = 'bold 70px Impact';
                this.ctx.fillStyle = '#ffffff';
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                this.ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
                this.ctx.shadowBlur = 20;
                this.ctx.fillText(title.toUpperCase(), centerX, titleY);
                
                this.ctx.font = '24px Impact';
                this.ctx.fillStyle = palette.accent;
                this.ctx.fillText(author, centerX, titleY + 110);
                break;
        }
        
        this.ctx.restore();
    }

    /**
     * Simple landscape drawing
     */
    private drawSimpleLandscape(centerX: number, centerY: number, width: number, height: number, palette: any, random: any): void {
        // Mountains
        this.ctx.fillStyle = palette.secondary;
        this.ctx.beginPath();
        this.ctx.moveTo(0, height * 0.7);
        this.ctx.lineTo(width * 0.3, height * 0.4);
        this.ctx.lineTo(width * 0.5, height * 0.5);
        this.ctx.lineTo(width * 0.7, height * 0.3);
        this.ctx.lineTo(width, height * 0.6);
        this.ctx.lineTo(width, height);
        this.ctx.lineTo(0, height);
        this.ctx.closePath();
        this.ctx.fill();
        
        // Sun/moon
        this.ctx.fillStyle = palette.accent;
        this.ctx.beginPath();
        this.ctx.arc(width * 0.8, height * 0.2, 40, 0, Math.PI * 2);
        this.ctx.fill();
    }

    /**
     * Simple cityscape drawing
     */
    private drawSimpleCityscape(centerX: number, centerY: number, width: number, height: number, palette: any, random: any): void {
        // Buildings
        for (let i = 0; i < 8; i++) {
            const x = (width / 8) * i;
            const buildingHeight = height * (0.3 + random() * 0.4);
            const buildingWidth = width / 10;
            
            this.ctx.fillStyle = palette.secondary;
            this.ctx.fillRect(x, height - buildingHeight, buildingWidth, buildingHeight);
            
            // Windows
            this.ctx.fillStyle = palette.accent;
            for (let j = 0; j < 5; j++) {
                for (let k = 0; k < 3; k++) {
                    if (random() > 0.3) {
                        this.ctx.fillRect(
                            x + 5 + k * (buildingWidth / 4),
                            height - buildingHeight + 20 + j * 30,
                            8, 12
                        );
                    }
                }
            }
        }
    }

    /**
     * Simple magical scene drawing
     */
    private drawSimpleMagicalScene(centerX: number, centerY: number, width: number, height: number, palette: any, random: any): void {
        // Magical circle
        this.ctx.strokeStyle = palette.accent;
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, 100, 0, Math.PI * 2);
        this.ctx.stroke();
        
        // Inner circle
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, 70, 0, Math.PI * 2);
        this.ctx.stroke();
        
        // Magical symbols
        const symbols = ['✦', '✧', '⋆', '✵', '⟡'];
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const x = centerX + Math.cos(angle) * 130;
            const y = centerY + Math.sin(angle) * 130;
            
            this.ctx.font = '24px Arial';
            this.ctx.fillStyle = palette.tertiary;
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(symbols[i % symbols.length], x, y);
        }
    }

    /**
     * Simple abstract scene drawing
     */
    private drawSimpleAbstractScene(centerX: number, centerY: number, width: number, height: number, palette: any, random: any): void {
        // Flowing curves
        for (let i = 0; i < 5; i++) {
            this.ctx.strokeStyle = [palette.primary, palette.secondary, palette.tertiary, palette.accent][i % 4];
            this.ctx.lineWidth = 4;
            this.ctx.globalAlpha = 0.6;
            this.ctx.beginPath();
            
            const startX = random() * width;
            const startY = random() * height;
            this.ctx.moveTo(startX, startY);
            
            for (let j = 0; j < 3; j++) {
                const cp1x = random() * width;
                const cp1y = random() * height;
                const cp2x = random() * width;
                const cp2y = random() * height;
                const endX = random() * width;
                const endY = random() * height;
                this.ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
            }
            
            this.ctx.stroke();
        }
        this.ctx.globalAlpha = 1;
    }

    /**
     * Generate KDP Print-Ready Full Wrap
     * Layout: [Back][Spine][Front]
     */
    async generateFullWrap(options: KDPWrapOptions, frontImageUrl?: string, backImageUrl?: string): Promise<string> {
        const dpi = 300;
        const bleedPx = (options.bleed || 0.125) * dpi;
        const trimWidthPx = options.trimWidth * dpi;
        const trimHeightPx = options.trimHeight * dpi;

        const spineWidthPx = this.calculateSpineWidthPixels(options.pageCount, options.paperType, dpi);

        const totalWidth = (trimWidthPx * 2) + spineWidthPx + (bleedPx * 2);
        const totalHeight = trimHeightPx + (bleedPx * 2);

        this.canvas.width = totalWidth;
        this.canvas.height = totalHeight;

        const palette = this.getColorPalette(options.genre, options.colorScheme || 'vibrant');

        // Helper to load image
        const loadImage = (url: string) => new Promise<HTMLImageElement>((res, rej) => {
            const img = new Image();
            if (!url.startsWith('data:')) {
                img.crossOrigin = "anonymous";
            }
            img.onload = () => res(img);
            img.onerror = (e) => {
                console.error("Failed to load image for canvas:", url.substring(0, 50) + "...");
                rej(e);
            };
            img.src = url;
        });

        // 1. Draw Background (Base layer)
        this.ctx.fillStyle = palette.primary;
        this.ctx.fillRect(0, 0, totalWidth, totalHeight);

        // 2. BACK COVER (Left Panel)
        const backX = bleedPx;
        if (backImageUrl) {
            try {
                const backImg = await loadImage(backImageUrl);
                this.ctx.drawImage(backImg, backX, bleedPx, trimWidthPx, trimHeightPx);
            } catch (e) {
                console.warn("Back cover image failed to load, using default background.");
            }
        }

        // Draw Barcode Area (Safe zone)
        // Draw Barcode Area (Safe zone) - BOTTOM RIGHT
        const barcodeW = 2 * dpi;
        const barcodeH = 1.2 * dpi;
        // Position: Bottom Right of Back Cover, inside bleed
        const barcodeX = backX + trimWidthPx - barcodeW - (0.375 * dpi); // 0.375" margin
        const barcodeY = totalHeight - bleedPx - barcodeH - (0.375 * dpi);

        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.fillRect(barcodeX, barcodeY, barcodeW, barcodeH);

        // Draw Blurb
        if (options.blurb) {
            this.ctx.save();

            // Always draw a subtle backing for the blurb to ensure readability against any background
            this.ctx.fillStyle = 'rgba(0,0,0,0.6)';
            if (backImageUrl) {
                this.ctx.fillStyle = 'rgba(0,0,0,0.85)'; // Darker if over an image
            }
            this.ctx.fillRect(backX + 40, totalHeight * 0.15, trimWidthPx - 80, totalHeight * 0.55);

            this.ctx.fillStyle = '#FFFFFF';
            this.ctx.font = '48px "Georgia", serif'; // Larger font for print
            this.ctx.textAlign = 'left';
            this.ctx.textBaseline = 'top';

            const blurbX = backX + 80;
            const blurbY = totalHeight * 0.20;
            const blurbWidth = trimWidthPx - 160;
            const lineHeight = 60; // Slightly tighter leading

            // Handle paragraphs with overflow protection
            const paragraphs = options.blurb.substring(0, 1200).split('\n'); // Truncate to safe length
            let y = blurbY;

            paragraphs.forEach(para => {
                const words = para.split(' ');
                let line = '';

                for (const word of words) {
                    const testLine = line + word + ' ';
                    const metrics = this.ctx.measureText(testLine);
                    if (metrics.width > blurbWidth && line !== '') {
                        this.ctx.fillText(line, blurbX, y);
                        line = word + ' ';
                        y += lineHeight;
                    } else {
                        line = testLine;
                    }
                }
                this.ctx.fillText(line, blurbX, y);
                y += lineHeight * 1.5;
            });

            this.ctx.restore();
        }

        // 3. SPINE (Center Panel)
        const spineX = bleedPx + trimWidthPx;
        this.ctx.fillStyle = palette.secondary;
        // Darken spine color for better contrast/professional look
        // We simulate a darker shade by overlaying semi-transparent black
        this.ctx.fillRect(spineX, bleedPx, spineWidthPx, trimHeightPx);
        this.ctx.fillStyle = 'rgba(0,0,0,0.3)';
        this.ctx.fillRect(spineX, bleedPx, spineWidthPx, trimHeightPx);

        if (spineWidthPx > 40) {
            this.ctx.save();
            this.ctx.translate(spineX + spineWidthPx / 2, totalHeight / 2);
            this.ctx.rotate(Math.PI / 2);
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillStyle = '#FFFFFF';

            // Safety margin: KDP requires text to be 0.0625" away from fold. 
            // We use a safe max width of totalHeight - 1 inch (0.5" margin top/bottom)
            const maxSpineTextWidth = totalHeight - (dpi * 1.5);

            // Adaptive font size for spine
            let spineFontSize = 28;
            if (spineWidthPx < 60) spineFontSize = 22;
            if (spineWidthPx < 50) spineFontSize = 16; // Smaller for safety

            this.ctx.font = `bold ${spineFontSize}px Arial`;

            const spineText = `${options.title.toUpperCase()}  •  ${options.author.toUpperCase()}`;
            const metrics = this.ctx.measureText(spineText);
            if (metrics.width > maxSpineTextWidth) {
                const scale = maxSpineTextWidth / metrics.width;
                this.ctx.scale(scale, scale);
            }

            this.ctx.fillText(spineText, 0, 0);
            this.ctx.restore();
        }

        // 4. FRONT COVER (Right Panel)
        const frontX = spineX + spineWidthPx;
        if (frontImageUrl) {
            try {
                const frontImg = await loadImage(frontImageUrl);
                this.ctx.drawImage(frontImg, frontX, bleedPx, trimWidthPx, trimHeightPx);

                // Draw Title and Author as OVERLAY
                this.ctx.save();
                this.ctx.translate(frontX, bleedPx);
                this.drawWrappedTitle(options.title, trimWidthPx, trimHeightPx, palette);
                this.drawAuthor(options.author, trimWidthPx, trimHeightPx, palette);
                this.ctx.restore();
            } catch (e) {
                console.warn("Front cover image failed to load.");
            }
        } else {
            this.ctx.save();
            this.ctx.translate(frontX, bleedPx);
            this.drawGenericFrontCover(trimWidthPx, trimHeightPx, options, palette);
            this.ctx.restore();
        }

        return this.canvas.toDataURL('image/png', 0.95);
    }

    private calculateSpineWidthPixels(pageCount: number, paperType: 'white' | 'cream' | 'color', dpi: number = 300): number {
        const factors = {
            'white': 0.002252,
            'cream': 0.0025,
            'color': 0.002347
        };
        const inches = Math.max(pageCount * factors[paperType], 0.1);
        return Math.ceil(inches * dpi);
    }

    private getColorPalette(genre: string, scheme: string) {
        const palettes: Record<string, any> = {
            'FICTION': {
                vibrant: { primary: '#6366f1', secondary: '#8b5cf6', accent: '#ec4899', text: '#ffffff' },
                dark: { primary: '#1e1b4b', secondary: '#312e81', accent: '#4f46e5', text: '#e0e7ff' },
                minimal: { primary: '#f8fafc', secondary: '#e2e8f0', accent: '#334155', text: '#0f172a' },
                elegant: { primary: '#18181b', secondary: '#27272a', accent: '#d4af37', text: '#fafafa' }
            },
            'MYSTERY': {
                vibrant: { primary: '#dc2626', secondary: '#991b1b', accent: '#fbbf24', text: '#ffffff' },
                dark: { primary: '#0f172a', secondary: '#1e293b', accent: '#dc2626', text: '#f1f5f9' },
                minimal: { primary: '#374151', secondary: '#4b5563', accent: '#dc2626', text: '#f9fafb' },
                elegant: { primary: '#1c1917', secondary: '#292524', accent: '#b91c1c', text: '#fafaf9' }
            },
            'ROMANCE': {
                vibrant: { primary: '#ec4899', secondary: '#db2777', accent: '#f472b6', text: '#ffffff' },
                dark: { primary: '#831843', secondary: '#9f1239', accent: '#fb7185', text: '#fce7f3' },
                minimal: { primary: '#fdf2f8', secondary: '#fce7f3', accent: '#be123c', text: '#881337' },
                elegant: { primary: '#4c0519', secondary: '#701a3a', accent: '#fda4af', text: '#fff1f2' }
            },
            'SCI-FI': {
                vibrant: { primary: '#0ea5e9', secondary: '#0284c7', accent: '#22d3ee', text: '#ffffff' },
                dark: { primary: '#082f49', secondary: '#0c4a6e', accent: '#06b6d4', text: '#e0f2fe' },
                minimal: { primary: '#f0f9ff', secondary: '#e0f2fe', accent: '#0369a1', text: '#075985' },
                elegant: { primary: '#0c4a6e', secondary: '#164e63', accent: '#67e8f9', text: '#f0fdfa' }
            },
            'FANTASY': {
                vibrant: { primary: '#7c3aed', secondary: '#6d28d9', accent: '#a78bfa', text: '#ffffff' },
                dark: { primary: '#3b0764', secondary: '#581c87', accent: '#a855f7', text: '#faf5ff' },
                minimal: { primary: '#faf5ff', secondary: '#f3e8ff', accent: '#7c3aed', text: '#581c87' },
                elegant: { primary: '#2e1065', secondary: '#4c1d95', accent: '#c4b5fd', text: '#faf5ff' }
            },
            'CHILDREN': {
                vibrant: { primary: '#f59e0b', secondary: '#d97706', accent: '#fbbf24', text: '#ffffff' },
                dark: { primary: '#78350f', secondary: '#92400e', accent: '#fbbf24', text: '#fef3c7' },
                minimal: { primary: '#fffbeb', secondary: '#fef3c7', accent: '#d97706', text: '#78350f' },
                elegant: { primary: '#451a03', secondary: '#78350f', accent: '#fcd34d', text: '#fef9c3' }
            },
            'HISTORICAL': {
                vibrant: { primary: '#92400e', secondary: '#b45309', accent: '#d97706', text: '#ffffff' },
                dark: { primary: '#451a03', secondary: '#78350f', accent: '#f59e0b', text: '#fef3c7' },
                minimal: { primary: '#fef3c7', secondary: '#fed7aa', accent: '#92400e', text: '#451a03' },
                elegant: { primary: '#7c2d12', secondary: '#9a3412', accent: '#fbbf24', text: '#fffbeb' }
            },
            'LITERARY': {
                vibrant: { primary: '#475569', secondary: '#64748b', accent: '#94a3b8', text: '#ffffff' },
                dark: { primary: '#1e293b', secondary: '#334155', accent: '#475569', text: '#f1f5f9' },
                minimal: { primary: '#f8fafc', secondary: '#f1f5f9', accent: '#475569', text: '#1e293b' },
                elegant: { primary: '#0f172a', secondary: '#1e293b', accent: '#cbd5e1', text: '#f8fafc' }
            },
            'CONTEMPORARY': {
                vibrant: { primary: '#0f766e', secondary: '#0d9488', accent: '#14b8a6', text: '#ffffff' },
                dark: { primary: '#134e4a', secondary: '#115e59', accent: '#0f766e', text: '#f0fdfa' },
                minimal: { primary: '#f0fdfa', secondary: '#ccfbf1', accent: '#0f766e', text: '#134e4a' },
                elegant: { primary: '#042f2e', secondary: '#134e4a', accent: '#5eead4', text: '#f0fdfa' }
            },
            'WOMEN': {
                vibrant: { primary: '#ec4899', secondary: '#f472b6', accent: '#f9a8d4', text: '#ffffff' },
                dark: { primary: '#831843', secondary: '#9f1239', accent: '#ec4899', text: '#fdf2f8' },
                minimal: { primary: '#fdf2f8', secondary: '#fce7f3', accent: '#831843', text: '#831843' },
                elegant: { primary: '#500724', secondary: '#701a75', accent: '#fbcfe8', text: '#fdf2f8' }
            },
            'LGBTQ': {
                vibrant: { primary: '#e879f9', secondary: '#d946ef', accent: '#c026d3', text: '#ffffff' },
                dark: { primary: '#701a75', secondary: '#86198f', accent: '#a21caf', text: '#faf5ff' },
                minimal: { primary: '#faf5ff', secondary: '#f3e8ff', accent: '#701a75', text: '#581c87' },
                elegant: { primary: '#4a044e', secondary: '#701a75', accent: '#e879f9', text: '#faf5ff' }
            },
            'DYSTOPIAN': {
                vibrant: { primary: '#dc2626', secondary: '#b91c1c', accent: '#ef4444', text: '#ffffff' },
                dark: { primary: '#450a0a', secondary: '#7f1d1d', accent: '#991b1b', text: '#fef2f2' },
                minimal: { primary: '#fef2f2', secondary: '#fee2e2', accent: '#dc2626', text: '#450a0a' },
                elegant: { primary: '#291515', secondary: '#450a0a', accent: '#fca5a5', text: '#fef2f2' }
            },
            'URBAN': {
                vibrant: { primary: '#6b7280', secondary: '#4b5563', accent: '#9ca3af', text: '#ffffff' },
                dark: { primary: '#111827', secondary: '#1f2937', accent: '#374151', text: '#f9fafb' },
                minimal: { primary: '#f9fafb', secondary: '#f3f4f6', accent: '#6b7280', text: '#111827' },
                elegant: { primary: '#030712', secondary: '#111827', accent: '#d1d5db', text: '#f9fafb' }
            },
            'ADVENTURE': {
                vibrant: { primary: '#059669', secondary: '#047857', accent: '#10b981', text: '#ffffff' },
                dark: { primary: '#064e3b', secondary: '#065f46', accent: '#047857', text: '#ecfdf5' },
                minimal: { primary: '#ecfdf5', secondary: '#d1fae5', accent: '#059669', text: '#064e3b' },
                elegant: { primary: '#022c22', secondary: '#064e3b', accent: '#34d399', text: '#ecfdf5' }
            },
            'SUSPENSE': {
                vibrant: { primary: '#7c3aed', secondary: '#6d28d9', accent: '#8b5cf6', text: '#ffffff' },
                dark: { primary: '#312e81', secondary: '#4c1d95', accent: '#6d28d9', text: '#ede9fe' },
                minimal: { primary: '#ede9fe', secondary: '#ddd6fe', accent: '#7c3aed', text: '#312e81' },
                elegant: { primary: '#1e1b4b', secondary: '#312e81', accent: '#a78bfa', text: '#ede9fe' }
            }
        };

        const genreKey = Object.keys(palettes).find(k => genre.toUpperCase().includes(k)) || 'FICTION';
        return palettes[genreKey][scheme] || palettes['FICTION']['vibrant'];
    }

    private drawBackground(palette: any) {
        const { width, height } = this.canvas;
        const gradient = this.ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, palette.primary);
        gradient.addColorStop(0.5, palette.secondary);
        gradient.addColorStop(1, palette.accent);

        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, width, height);

        // Add subtle film grain for premium texture
        this.addGrain(0.05);
    }

    private addGrain(intensity: number) {
        const { width, height } = this.canvas;
        const imageData = this.ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
            const noise = (Math.random() - 0.5) * intensity * 255;
            data[i] = Math.min(255, Math.max(0, data[i] + noise));
            data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
            data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
        }
        this.ctx.putImageData(imageData, 0, 0);
    }

    private drawGenericFrontCover(width: number, height: number, options: CoverOptions, palette: any) {
        this.drawProceduralPattern(options.genre, width, height, palette);
        this.drawGenreSymbol(options.genre, width, height, palette);
        this.drawWrappedTitle(options.title, width, height, palette);
        this.drawAuthor(options.author, width, height, palette);
    }

    private drawProceduralPattern(genre: string, width: number, height: number, palette: any) {
        this.ctx.save();
        const g = genre.toUpperCase();

        if (g.includes('MYSTERY') || g.includes('THRILLER') || g.includes('HORROR')) {
            // MYSTERY/THRILLER: Spotlight / Shadows / Fog
            // Radial spotlight off-center
            const spotX = width * 0.7;
            const spotY = height * 0.3;
            const rad = this.ctx.createRadialGradient(spotX, spotY, 0, spotX, spotY, width * 1.2);
            rad.addColorStop(0, 'rgba(255,255,255,0.05)');
            rad.addColorStop(1, 'rgba(0,0,0,0.8)');
            this.ctx.fillStyle = rad;
            this.ctx.fillRect(0, 0, width, height);

            // Sharp angular chaos lines for Thriller
            this.ctx.strokeStyle = 'rgba(255,255,255,0.03)';
            this.ctx.lineWidth = 2;
            for (let i = 0; i < 40; i++) {
                this.ctx.beginPath();
                this.ctx.moveTo(Math.random() * width, Math.random() * height);
                this.ctx.lineTo(Math.random() * width, Math.random() * height);
                this.ctx.stroke();
            }
        }
        else if (g.includes('ROMANCE')) {
            // ROMANCE: Soft Bokeh / Curves
            this.ctx.fillStyle = palette.accent;
            this.ctx.globalAlpha = 0.1;
            for (let i = 0; i < 15; i++) {
                this.ctx.beginPath();
                this.ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 300, 0, Math.PI * 2);
                this.ctx.fill();
            }
        }
        else if (g.includes('FANTASY')) {
            // FANTASY: Magic particles / Ethereal glow
            const grad = this.ctx.createLinearGradient(0, height, width, 0);
            grad.addColorStop(0, 'rgba(0,0,0,0)');
            grad.addColorStop(0.5, palette.secondary);
            grad.addColorStop(1, palette.accent);
            this.ctx.globalAlpha = 0.2;
            this.ctx.fillStyle = grad;
            this.ctx.fillRect(0, 0, width, height);

            this.ctx.fillStyle = '#FFF';
            for (let i = 0; i < 100; i++) {
                this.ctx.globalAlpha = Math.random() * 0.5;
                this.ctx.beginPath();
                this.ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 3, 0, Math.PI * 2);
                this.ctx.fill();
            }
        }
        else if (g.includes('HISTORICAL')) {
            // HISTORICAL: Aged paper texture / Vintage elements
            this.ctx.fillStyle = palette.primary;
            this.ctx.globalAlpha = 0.1;
            this.ctx.fillRect(0, 0, width, height);
            
            // Vintage texture
            for (let i = 0; i < 50; i++) {
                this.ctx.strokeStyle = palette.accent;
                this.ctx.globalAlpha = Math.random() * 0.1;
                this.ctx.lineWidth = 1;
                this.ctx.beginPath();
                this.ctx.moveTo(Math.random() * width, Math.random() * height);
                this.ctx.lineTo(Math.random() * width, Math.random() * height);
                this.ctx.stroke();
            }
        }
        else if (g.includes('LITERARY')) {
            // LITERARY: Subtle typography / Book pages
            this.ctx.fillStyle = palette.primary;
            this.ctx.globalAlpha = 0.05;
            for (let i = 0; i < 20; i++) {
                const x = Math.random() * width;
                const y = Math.random() * height;
                const lineHeight = 15;
                for (let j = 0; j < 10; j++) {
                    this.ctx.fillRect(x, y + j * lineHeight, Math.random() * 100, 2);
                }
            }
        }
        else if (g.includes('CONTEMPORARY')) {
            // CONTEMPORARY: Clean geometric shapes / Modern
            this.ctx.fillStyle = palette.accent;
            this.ctx.globalAlpha = 0.1;
            for (let i = 0; i < 15; i++) {
                const x = Math.random() * width;
                const y = Math.random() * height;
                const size = Math.random() * 100 + 50;
                this.ctx.fillRect(x, y, size, size);
            }
        }
        else if (g.includes('WOMEN')) {
            // WOMEN: Soft flowing curves / Elegant
            this.ctx.strokeStyle = palette.accent;
            this.ctx.globalAlpha = 0.2;
            this.ctx.lineWidth = 3;
            for (let i = 0; i < 10; i++) {
                this.ctx.beginPath();
                const startX = Math.random() * width;
                const startY = Math.random() * height;
                this.ctx.moveTo(startX, startY);
                for (let j = 0; j < 3; j++) {
                    const cpX = Math.random() * width;
                    const cpY = Math.random() * height;
                    const endX = Math.random() * width;
                    const endY = Math.random() * height;
                    this.ctx.quadraticCurveTo(cpX, cpY, endX, endY);
                }
                this.ctx.stroke();
            }
        }
        else if (g.includes('LGBTQ')) {
            // LGBTQ: Rainbow gradient / Pride colors
            const colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3'];
            const stripeHeight = height / colors.length;
            colors.forEach((color, i) => {
                this.ctx.fillStyle = color;
                this.ctx.globalAlpha = 0.1;
                this.ctx.fillRect(0, i * stripeHeight, width, stripeHeight);
            });
        }
        else if (g.includes('DYSTOPIAN') || g.includes('POST-APOCALYPTIC')) {
            // DYSTOPIAN: Dark oppressive atmosphere / Broken elements
            this.ctx.fillStyle = '#000';
            this.ctx.globalAlpha = 0.3;
            this.ctx.fillRect(0, 0, width, height);
            
            // Broken grid pattern
            this.ctx.strokeStyle = palette.accent;
            this.ctx.globalAlpha = 0.1;
            this.ctx.lineWidth = 1;
            for (let i = 0; i < width; i += 30) {
                this.ctx.beginPath();
                this.ctx.moveTo(i, 0);
                this.ctx.lineTo(i + Math.random() * 20 - 10, height);
                this.ctx.stroke();
            }
        }
        else if (g.includes('URBAN')) {
            // URBAN: Cityscape / Grid patterns
            this.ctx.fillStyle = palette.primary;
            this.ctx.globalAlpha = 0.1;
            for (let i = 0; i < 20; i++) {
                const x = Math.random() * width;
                const buildingHeight = Math.random() * height * 0.7;
                this.ctx.fillRect(x, height - buildingHeight, 30, buildingHeight);
            }
        }
        else if (g.includes('ADVENTURE')) {
            // ADVENTURE: Dynamic movement / Exploration
            this.ctx.strokeStyle = palette.accent;
            this.ctx.globalAlpha = 0.2;
            this.ctx.lineWidth = 2;
            for (let i = 0; i < 15; i++) {
                this.ctx.beginPath();
                this.ctx.moveTo(Math.random() * width, Math.random() * height);
                for (let j = 0; j < 5; j++) {
                    this.ctx.lineTo(Math.random() * width, Math.random() * height);
                }
                this.ctx.stroke();
            }
        }
        else if (g.includes('SUSPENSE')) {
            // SUSPENSE: Tension lines / Dramatic angles
            this.ctx.strokeStyle = palette.accent;
            this.ctx.globalAlpha = 0.15;
            this.ctx.lineWidth = 1;
            for (let i = 0; i < 30; i++) {
                this.ctx.beginPath();
                this.ctx.moveTo(0, Math.random() * height);
                this.ctx.lineTo(width, Math.random() * height);
                this.ctx.stroke();
            }
        }
        else {
            // DEFAULT: Elegant Geometric Flow
            this.ctx.strokeStyle = palette.accent;
            this.ctx.globalAlpha = 0.1;
            this.ctx.lineWidth = 1;
            for (let i = 0; i < 50; i++) {
                this.ctx.beginPath();
                const x = Math.random() * width;
                const y = Math.random() * height;
                const size = Math.random() * 300;
                this.ctx.rect(x, y, size, size);
                this.ctx.stroke();
            }
        }
        this.ctx.restore();
    }

    private drawWrappedTitle(title: string, width: number, height: number, palette: any) {
        // KDP SAFE ZONE: Title must be 0.25" inside trim
        // We implement a massive safety margin
        const marginX = width * 0.15;
        const maxLineWidth = width - (marginX * 2);

        this.ctx.save();
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'top';
        this.ctx.shadowColor = 'rgba(0,0,0,0.8)';
        this.ctx.shadowBlur = 30;
        this.ctx.shadowOffsetY = 6;

        const words = title.toUpperCase().split(' ');
        let lines: string[] = [];
        let curLine = words[0];

        // Dynamic font sizing (Iterative approach to find max fit)
        let fontSize = width * 0.15; // Start huge
        if (title.length > 20) fontSize = width * 0.12;
        if (title.length > 40) fontSize = width * 0.08;

        this.ctx.font = `bold ${fontSize}px "Georgia", serif`;

        // Wrap Text Logic
        for (let i = 1; i < words.length; i++) {
            const w = words[i];
            const widthStart = this.ctx.measureText(curLine + " " + w).width;
            if (widthStart < maxLineWidth) {
                curLine += " " + w;
            } else {
                lines.push(curLine);
                curLine = w;
            }
        }
        lines.push(curLine);

        // Vertical Centering (Top 1/3 visual weight)
        const totalHeight = lines.length * (fontSize * 1.1);
        const startY = (height * 0.3) - (totalHeight / 2);

        lines.forEach((l, i) => {
            this.ctx.fillText(l, width / 2, startY + (i * fontSize * 1.1));
        });

        this.ctx.restore();
    }

    private drawAuthor(author: string, width: number, height: number, palette: any) {
        if (!author || author.includes("UNKNOWN")) return;

        // SAFETY CHECK: Ensure Author Name fits
        this.ctx.save();
        let fontSize = width * 0.06;
        this.ctx.font = `bold ${fontSize}px Arial`;

        const metrics = this.ctx.measureText(author.toUpperCase());
        if (metrics.width > width * 0.8) {
            // Shrink to fit
            const scale = (width * 0.8) / metrics.width;
            fontSize = fontSize * scale;
            this.ctx.font = `bold ${fontSize}px Arial`;
        }

        this.ctx.fillStyle = '#E0E0E0';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'bottom';
        this.ctx.shadowColor = 'rgba(0,0,0,0.9)';
        this.ctx.shadowBlur = 10;
        this.ctx.shadowOffsetY = 2;

        // Position: Bottom 10% line
        this.ctx.fillText(author.toUpperCase(), width / 2, height * 0.9);
        this.ctx.restore();
    }

    private drawGenreSymbol(genre: string, width: number, height: number, palette: any) {
        this.ctx.save();
        this.ctx.globalAlpha = 0.15; // Increased visibility
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillStyle = '#FFF';

        let symbol = "📖";
        let color = "#FFF";

        if (genre.includes('MYSTERY')) { symbol = "🔍"; color = "#60a5fa"; }
        if (genre.includes('THRILLER')) { symbol = "⚡"; color = "#fbbf24"; }
        if (genre.includes('ROMANCE')) { symbol = "♥"; color = "#f43f5e"; }
        if (genre.includes('FANTASY')) { symbol = "⚔"; color = "#8b5cf6"; }
        if (genre.includes('SCI-FI')) { symbol = "🚀"; color = "#22d3ee"; }
        if (genre.includes('HORROR')) { symbol = "👁"; color = "#ef4444"; }
        if (genre.includes('CHILDREN')) { symbol = "🎨"; color = "#facc15"; }
        if (genre.includes('HISTORICAL')) { symbol = "📜"; color = "#92400e"; }
        if (genre.includes('LITERARY')) { symbol = "📖"; color = "#475569"; }
        if (genre.includes('CONTEMPORARY')) { symbol = "🏙️"; color = "#0f766e"; }
        if (genre.includes('WOMEN')) { symbol = "💐"; color = "#ec4899"; }
        if (genre.includes('LGBTQ')) { symbol = "🌈"; color = "#e879f9"; }
        if (genre.includes('DYSTOPIAN') || genre.includes('POST-APOCALYPTIC')) { symbol = "⚠️"; color = "#dc2626"; }
        if (genre.includes('URBAN')) { symbol = "🏙️"; color = "#6b7280"; }
        if (genre.includes('ADVENTURE')) { symbol = "🗺️"; color = "#059669"; }
        if (genre.includes('SUSPENSE')) { symbol = "❓"; color = "#7c3aed"; }

        this.ctx.font = `bold ${width / 2}px Arial`;
        this.ctx.fillStyle = color;
        this.ctx.fillText(symbol, width / 2, height / 2);

        // Add a secondary offset glow
        this.ctx.globalAlpha = 0.05;
        this.ctx.fillText(symbol, width / 2 + 10, height / 2 + 10);

        this.ctx.restore();
    }

    /**
     * Generate a simple interior illustration (Grayscale/Line art style)
     * Used as fallback for Chapter headers
     */
    async generateInteriorImage(prompt: string, title: string, genre: string): Promise<string> {
        const width = 1200; // High res
        const height = 900;
        this.canvas.width = width;
        this.canvas.height = height;

        const g = genre.toUpperCase();

        // Background - Soft off-white for paper feel
        this.ctx.fillStyle = '#fdfdfd';
        this.ctx.fillRect(0, 0, width, height);

        // Ornate Border
        this.ctx.strokeStyle = '#333';
        this.ctx.lineWidth = 4;
        this.ctx.strokeRect(40, 40, width - 80, height - 80);
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(50, 50, width - 100, height - 100);

        // Genre Specific Centerpiece
        this.ctx.save();
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';

        let symbol = "📜";
        let color = "#444";

        if (g.includes('MYSTERY')) { symbol = "🕵️"; color = "#1e293b"; }
        if (g.includes('ROMANCE')) { symbol = "🌹"; color = "#9f1239"; }
        if (g.includes('SCI-FI')) { symbol = "🛸"; color = "#0e7490"; }
        if (g.includes('FANTASY')) { symbol = "🐉"; color = "#4c1d95"; }
        if (g.includes('HORROR')) { symbol = "💀"; color = "#450a0a"; }
        if (g.includes('CHILDREN')) { symbol = "🧸"; color = "#b45309"; }
        if (g.includes('HISTORICAL')) { symbol = "⚜️"; color = "#92400e"; }
        if (g.includes('LITERARY')) { symbol = "📚"; color = "#475569"; }
        if (g.includes('CONTEMPORARY')) { symbol = "🌆"; color = "#0f766e"; }
        if (g.includes('WOMEN')) { symbol = "🌸"; color = "#831843"; }
        if (g.includes('LGBTQ')) { symbol = "🏳️‍🌈"; color = "#701a75"; }
        if (g.includes('DYSTOPIAN') || g.includes('POST-APOCALYPTIC')) { symbol = "⛓️"; color = "#450a0a"; }
        if (g.includes('URBAN')) { symbol = "🏢"; color = "#111827"; }
        if (g.includes('ADVENTURE')) { symbol = "🧭"; color = "#064e3b"; }
        if (g.includes('SUSPENSE')) { symbol = "🔎"; color = "#312e81"; }

        // Draw shadow/glow
        this.ctx.font = `200px serif`;
        this.ctx.globalAlpha = 0.1;
        this.ctx.fillText(symbol, width / 2 + 5, height / 2 + 5);

        // Draw main symbol
        this.ctx.globalAlpha = 0.8;
        this.ctx.fillStyle = color;
        this.ctx.fillText(symbol, width / 2, height / 2);

        // Add decorative corner elements
        const cornerSize = 100;
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 2;
        this.ctx.globalAlpha = 0.4;

        // Top-Left corner adornment
        this.ctx.beginPath();
        this.ctx.moveTo(60, 60 + cornerSize);
        this.ctx.lineTo(60, 60);
        this.ctx.lineTo(60 + cornerSize, 60);
        this.ctx.stroke();

        // Bottom-Right corner
        this.ctx.beginPath();
        this.ctx.moveTo(width - 60, height - 60 - cornerSize);
        this.ctx.lineTo(width - 60, height - 60);
        this.ctx.lineTo(width - 60 - cornerSize, height - 60);
        this.ctx.stroke();

        this.ctx.restore();

        // Subtle background texture
        this.addGrain(0.02);

        return this.canvas.toDataURL('image/jpeg', 0.9);
    }

    /**
     * Generate a generic industrial placeholder for any module (POD, KDP, etc.)
     */
    async generateGenericPlaceholder(prompt: string, width: number, height: number): Promise<string> {
        this.canvas.width = width;
        this.canvas.height = height;

        const palette = this.getColorPalette('ADVENTURE', 'vibrant');
        this.drawBackground(palette);

        // CREATE STYLIZED ILLUSTRATION
        this.ctx.save();
        this.ctx.translate(width / 2, height / 2);

        // Circular Badge
        this.ctx.beginPath();
        this.ctx.arc(0, 0, width * 0.35, 0, Math.PI * 2);
        this.ctx.fillStyle = 'white';
        this.ctx.fill();
        this.ctx.lineWidth = 15;
        this.ctx.strokeStyle = palette[0];
        this.ctx.stroke();

        // Stylized symbol based on prompt
        this.ctx.fillStyle = palette[1];
        const size = width * 0.2;
        if (prompt.toLowerCase().includes('mountain') || prompt.toLowerCase().includes('adventure')) {
            this.ctx.beginPath();
            this.ctx.moveTo(-size, size); this.ctx.lineTo(0, -size); this.ctx.lineTo(size, size);
            this.ctx.closePath(); this.ctx.fill();
        } else if (prompt.toLowerCase().includes('space') || prompt.toLowerCase().includes('star')) {
            this.ctx.beginPath();
            this.ctx.arc(0, 0, size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.fillStyle = 'white';
            this.ctx.beginPath();
            this.ctx.arc(size / 2, -size / 2, size / 3, 0, Math.PI * 2);
            this.ctx.fill();
        } else {
            // Default Abstract Emblem
            for (let i = 0; i < 4; i++) {
                this.ctx.rotate(Math.PI / 2);
                this.ctx.fillRect(-size / 2, -size / 2, size, size / 2);
            }
        }
        this.ctx.restore();

        // Industrial Frame
        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 4;
        this.ctx.strokeRect(20, 20, width - 40, height - 40);

        return this.canvas.toDataURL('image/png');
    }

    /**
     * Generate unique, creative chapter illustrations
     * Each chapter gets a completely unique design based on content, mood, and position
     */
    async generateChapterIllustration(chapterTitle: string, chapterContent: string, genre: string, chapterIndex: number, totalChapters: number): Promise<string> {
        console.log('🎨 [COVER GENERATOR] generateChapterIllustration called!');
        console.log('📖 [DEBUG] Chapter:', chapterTitle, 'Genre:', genre, 'Index:', chapterIndex);
        
        const width = 1200;
        const height = 900;
        this.canvas.width = width;
        this.canvas.height = height;
        
        // Intelligent content analysis
        const contentAnalysis = this.analyzeContentDeeply(chapterTitle, chapterContent, chapterIndex, totalChapters);
        const creativeSeed = this.generateCreativeSeed(chapterTitle, chapterIndex);
        
        // Dynamic palette based on content mood and chapter position
        const palette = this.generateDynamicPalette(genre, contentAnalysis.mood, chapterIndex, totalChapters);
        
        // Create unique composition for this specific chapter
        this.createUniqueChapterComposition(contentAnalysis, palette, creativeSeed, width, height);
        
        // Add chapter info with creative styling
        this.addCreativeChapterInfo(chapterIndex + 1, chapterTitle, width, height, palette);
        
        return this.canvas.toDataURL('image/png', 0.95);
    }

    /**
     * Deep content analysis for intelligent design generation
     */
    private analyzeContentDeeply(chapterTitle: string, content: string, chapterIndex: number, totalChapters: any): any {
        const words = content.toLowerCase().split(/\s+/);
        const title = chapterTitle.toLowerCase();
        
        // Emotional analysis
        const emotions = {
            joy: ['happy', 'joy', 'smile', 'laugh', 'celebration', 'love', 'wonderful'],
            sadness: ['sad', 'cry', 'tears', 'grief', 'sorrow', 'melancholy'],
            anger: ['angry', 'rage', 'fury', 'mad', 'irritated', 'frustrated'],
            fear: ['afraid', 'scared', 'terror', 'horror', 'anxious', 'worried'],
            surprise: ['surprised', 'shocked', 'amazed', 'astonished', 'stunned'],
            mystery: ['unknown', 'mystery', 'secret', 'hidden', 'puzzle', 'enigma']
        };
        
        let emotionScores = {};
        for (const [emotion, keywords] of Object.entries(emotions)) {
            emotionScores[emotion] = keywords.filter(word => words.includes(word)).length;
        }
        
        const dominantEmotion = Object.entries(emotionScores).reduce((a, b) => 
            emotionScores[a[0]] > emotionScores[b[0]] ? a : b)[0];
        
        // Visual elements detection
        const visualElements = {
            nature: ['forest', 'mountain', 'river', 'ocean', 'tree', 'flower', 'sky', 'sun', 'moon', 'stars'],
            urban: ['city', 'building', 'street', 'car', 'traffic', 'skyscraper', 'bridge'],
            magical: ['magic', 'spell', 'potion', 'wand', 'dragon', 'wizard', 'fairy', 'enchant'],
            action: ['fight', 'battle', 'run', 'jump', 'chase', 'escape', 'struggle'],
            romance: ['love', 'kiss', 'heart', 'romance', 'passion', 'embrace', 'together'],
            technology: ['computer', 'robot', 'AI', 'digital', 'code', 'technology', 'future']
        };
        
        let elementScores = {};
        for (const [element, keywords] of Object.entries(visualElements)) {
            elementScores[element] = keywords.filter(word => words.includes(word)).length;
        }
        
        // Chapter position analysis
        const chapterPosition = {
            isFirst: chapterIndex === 0,
            isLast: chapterIndex === totalChapters - 1,
            isMiddle: chapterIndex > 0 && chapterIndex < totalChapters - 1,
            progress: chapterIndex / totalChapters
        };
        
        return {
            mood: dominantEmotion,
            visualElements: Object.entries(elementScores).filter(([_, score]) => (score as number) > 0).map(([element, _]) => element),
            wordCount: words.length,
            hasDialogue: content.includes('"') || content.includes("'"),
            chapterPosition,
            titleKeywords: title.split(' ').filter(word => word.length > 3),
            complexity: words.length > 500 ? 'complex' : words.length > 200 ? 'moderate' : 'simple'
        };
    }

    /**
     * Generate unique creative seed for variation
     */
    private generateCreativeSeed(chapterTitle: string, chapterIndex: number): number {
        let seed = 0;
        for (let i = 0; i < chapterTitle.length; i++) {
            seed += chapterTitle.charCodeAt(i) * (i + 1);
        }
        seed += chapterIndex * 1000;
        return seed % 10000;
    }

    /**
     * Generate dynamic palette based on multiple factors
     */
    private generateDynamicPalette(genre: string, mood: string, chapterIndex: number, totalChapters: number): any {
        const basePalettes = {
            joy: ['#FFD700', '#FFA500', '#FF69B4', '#98FB98'],
            sadness: ['#4169E1', '#6495ED', '#778899', '#B0C4DE'],
            anger: ['#DC143C', '#FF4500', '#FF6347', '#CD5C5C'],
            fear: ['#483D8B', '#4B0082', '#663399', '#8A2BE2'],
            surprise: ['#FF1493', '#FF69B4', '#FFB6C1', '#FFC0CB'],
            mystery: ['#2F4F4F', '#708090', '#778899', '#696969']
        };
        
        const moodColors = basePalettes[mood] || basePalettes.joy;
        const progress = chapterIndex / totalChapters;
        
        // Evolve colors through the book
        const evolvedColors = moodColors.map((color, index) => {
            const hue = this.adjustHue(color, progress * 60);
            const lightness = this.adjustLightness(color, 0.5 + Math.sin(progress * Math.PI) * 0.3);
            return this.hslToHex(hue, 70, lightness);
        });
        
        return {
            primary: evolvedColors[0],
            secondary: evolvedColors[1],
            tertiary: evolvedColors[2],
            accent: evolvedColors[3],
            background: this.lightenColor(evolvedColors[0], 0.9)
        };
    }

    /**
     * Create unique composition for each chapter
     */
    private createUniqueChapterComposition(analysis: any, palette: any, seed: number, width: number, height: number): void {
        // Use seed for pseudo-random but reproducible variations
        const random = this.seededRandom(seed);
        
        // Choose composition style based on content
        const compositionStyles = [
            () => this.createAbstractFlow(analysis, palette, random, width, height),
            () => this.createGeometricPattern(analysis, palette, random, width, height),
            () => this.createOrganicShapes(analysis, palette, random, width, height),
            () => this.createTypographicArt(analysis, palette, random, width, height),
            () => this.createSymbolicRepresentation(analysis, palette, random, width, height),
            () => this.createDataVisualization(analysis, palette, random, width, height),
            () => this.createMinimalistDesign(analysis, palette, random, width, height),
            () => this.createComplexIllustration(analysis, palette, random, width, height)
        ];
        
        const styleIndex = Math.floor(random() * compositionStyles.length);
        compositionStyles[styleIndex]();
    }

    /**
     * Abstract flowing composition
     */
    private createAbstractFlow(analysis: any, palette: any, random: any, width: number, height: number): void {
        // Background gradient
        const gradient = this.ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, palette.background);
        gradient.addColorStop(0.5, palette.primary);
        gradient.addColorStop(1, palette.secondary);
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, width, height);
        
        // Flowing curves
        for (let i = 0; i < 5; i++) {
            this.ctx.strokeStyle = palette.accent;
            this.ctx.lineWidth = 2 + random() * 4;
            this.ctx.globalAlpha = 0.3 + random() * 0.4;
            this.ctx.beginPath();
            
            const startX = random() * width;
            const startY = random() * height;
            this.ctx.moveTo(startX, startY);
            
            for (let j = 0; j < 4; j++) {
                const cp1x = random() * width;
                const cp1y = random() * height;
                const cp2x = random() * width;
                const cp2y = random() * height;
                const endX = random() * width;
                const endY = random() * height;
                this.ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
            }
            
            this.ctx.stroke();
        }
        this.ctx.globalAlpha = 1;
    }

    /**
     * Geometric pattern composition
     */
    private createGeometricPattern(analysis: any, palette: any, random: any, width: number, height: number): void {
        this.ctx.fillStyle = palette.background;
        this.ctx.fillRect(0, 0, width, height);
        
        const gridSize = 30 + Math.floor(random() * 50);
        const shapes = ['circle', 'square', 'triangle', 'hexagon'];
        
        for (let x = 0; x < width; x += gridSize) {
            for (let y = 0; y < height; y += gridSize) {
                if (random() > 0.3) {
                    const shape = shapes[Math.floor(random() * shapes.length)];
                    const color = [palette.primary, palette.secondary, palette.tertiary, palette.accent][Math.floor(random() * 4)];
                    
                    this.ctx.fillStyle = color;
                    this.ctx.globalAlpha = 0.3 + random() * 0.5;
                    
                    this.ctx.save();
                    this.ctx.translate(x + gridSize/2, y + gridSize/2);
                    this.ctx.rotate(random() * Math.PI * 2);
                    
                    switch(shape) {
                        case 'circle':
                            this.ctx.beginPath();
                            this.ctx.arc(0, 0, gridSize/3, 0, Math.PI * 2);
                            this.ctx.fill();
                            break;
                        case 'square':
                            this.ctx.fillRect(-gridSize/3, -gridSize/3, gridSize*2/3, gridSize*2/3);
                            break;
                        case 'triangle':
                            this.ctx.beginPath();
                            this.ctx.moveTo(0, -gridSize/3);
                            this.ctx.lineTo(-gridSize/3, gridSize/3);
                            this.ctx.lineTo(gridSize/3, gridSize/3);
                            this.ctx.closePath();
                            this.ctx.fill();
                            break;
                        case 'hexagon':
                            this.drawHexagon(0, 0, gridSize/3);
                            break;
                    }
                    
                    this.ctx.restore();
                }
            }
        }
        this.ctx.globalAlpha = 1;
    }

    /**
     * Organic shapes composition
     */
    private createOrganicShapes(analysis: any, palette: any, random: any, width: number, height: number): void {
        const gradient = this.ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, Math.max(width, height)/2);
        gradient.addColorStop(0, palette.primary);
        gradient.addColorStop(0.5, palette.secondary);
        gradient.addColorStop(1, palette.background);
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, width, height);
        
        // Organic blobs
        for (let i = 0; i < 8; i++) {
            const x = random() * width;
            const y = random() * height;
            const size = 50 + random() * 150;
            const color = [palette.tertiary, palette.accent][Math.floor(random() * 2)];
            
            this.ctx.fillStyle = color;
            this.ctx.globalAlpha = 0.2 + random() * 0.3;
            
            this.ctx.beginPath();
            const points = 6 + Math.floor(random() * 6);
            for (let j = 0; j < points; j++) {
                const angle = (j / points) * Math.PI * 2;
                const radius = size * (0.5 + random() * 0.5);
                const px = x + Math.cos(angle) * radius;
                const py = y + Math.sin(angle) * radius;
                
                if (j === 0) {
                    this.ctx.moveTo(px, py);
                } else {
                    this.ctx.lineTo(px, py);
                }
            }
            this.ctx.closePath();
            this.ctx.fill();
        }
        this.ctx.globalAlpha = 1;
    }

    /**
     * Typographic art composition
     */
    private createTypographicArt(analysis: any, palette: any, random: any, width: number, height: number): void {
        this.ctx.fillStyle = palette.background;
        this.ctx.fillRect(0, 0, width, height);
        
        // Extract key words from content
        const words = analysis.titleKeywords.slice(0, 8);
        
        words.forEach((word, index) => {
            const fontSize = 20 + random() * 60;
            const x = 50 + random() * (width - 100);
            const y = 50 + random() * (height - 100);
            const rotation = (random() - 0.5) * 0.5;
            const color = [palette.primary, palette.secondary, palette.tertiary, palette.accent][index % 4];
            
            this.ctx.save();
            this.ctx.translate(x, y);
            this.ctx.rotate(rotation);
            this.ctx.font = `bold ${fontSize}px Arial`;
            this.ctx.fillStyle = color;
            this.ctx.globalAlpha = 0.3 + random() * 0.4;
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(word.toUpperCase(), 0, 0);
            this.ctx.restore();
        });
        this.ctx.globalAlpha = 1;
    }

    /**
     * Symbolic representation composition
     */
    private createSymbolicRepresentation(analysis: any, palette: any, random: any, width: number, height: number): void {
        this.ctx.fillStyle = palette.background;
        this.ctx.fillRect(0, 0, width, height);
        
        const symbols = this.generateSymbolsForMood(analysis.mood);
        const symbolCount = 3 + Math.floor(random() * 5);
        
        for (let i = 0; i < symbolCount; i++) {
            const x = width * (0.2 + random() * 0.6);
            const y = height * (0.2 + random() * 0.6);
            const size = 30 + random() * 80;
            const symbol = symbols[Math.floor(random() * symbols.length)];
            
            this.ctx.save();
            this.ctx.translate(x, y);
            this.ctx.rotate(random() * Math.PI * 2);
            this.ctx.fillStyle = palette.accent;
            this.ctx.globalAlpha = 0.4 + random() * 0.4;
            this.ctx.font = `${size}px Arial`;
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(symbol, 0, 0);
            this.ctx.restore();
        }
        this.ctx.globalAlpha = 1;
    }

    /**
     * Data visualization composition
     */
    private createDataVisualization(analysis: any, palette: any, random: any, width: number, height: number): void {
        this.ctx.fillStyle = palette.background;
        this.ctx.fillRect(0, 0, width, height);
        
        // Create abstract data representation
        const dataPoints = 20;
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) * 0.3;
        
        for (let i = 0; i < dataPoints; i++) {
            const angle = (i / dataPoints) * Math.PI * 2;
            const value = random();
            const r = radius * (0.3 + value * 0.7);
            const x = centerX + Math.cos(angle) * r;
            const y = centerY + Math.sin(angle) * r;
            
            this.ctx.strokeStyle = palette.primary;
            this.ctx.lineWidth = 2;
            this.ctx.globalAlpha = 0.6;
            this.ctx.beginPath();
            this.ctx.moveTo(centerX, centerY);
            this.ctx.lineTo(x, y);
            this.ctx.stroke();
            
            this.ctx.fillStyle = palette.accent;
            this.ctx.beginPath();
            this.ctx.arc(x, y, 3 + value * 7, 0, Math.PI * 2);
            this.ctx.fill();
        }
        this.ctx.globalAlpha = 1;
    }

    /**
     * Minimalist design composition
     */
    private createMinimalistDesign(analysis: any, palette: any, random: any, width: number, height: number): void {
        this.ctx.fillStyle = palette.background;
        this.ctx.fillRect(0, 0, width, height);
        
        // Simple, elegant shapes
        const shapeCount = 2 + Math.floor(random() * 3);
        
        for (let i = 0; i < shapeCount; i++) {
            const x = width * (0.2 + random() * 0.6);
            const y = height * (0.2 + random() * 0.6);
            const size = 50 + random() * 100;
            
            this.ctx.strokeStyle = palette.primary;
            this.ctx.lineWidth = 1 + random() * 3;
            this.ctx.globalAlpha = 0.5 + random() * 0.3;
            
            if (random() > 0.5) {
                // Circle
                this.ctx.beginPath();
                this.ctx.arc(x, y, size, 0, Math.PI * 2);
                this.ctx.stroke();
            } else {
                // Rectangle
                this.ctx.strokeRect(x - size/2, y - size/2, size, size);
            }
        }
        this.ctx.globalAlpha = 1;
    }

    /**
     * Complex illustration composition
     */
    private createComplexIllustration(analysis: any, palette: any, random: any, width: number, height: number): void {
        // Background with texture
        const gradient = this.ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, palette.background);
        gradient.addColorStop(0.5, palette.secondary);
        gradient.addColorStop(1, palette.tertiary);
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, width, height);
        
        // Add texture
        for (let i = 0; i < 100; i++) {
            const x = random() * width;
            const y = random() * height;
            const size = random() * 2;
            this.ctx.fillStyle = palette.accent;
            this.ctx.globalAlpha = random() * 0.3;
            this.ctx.fillRect(x, y, size, size);
        }
        this.ctx.globalAlpha = 1;
        
        // Complex central element
        const centerX = width / 2;
        const centerY = height / 2;
        const layers = 3 + Math.floor(random() * 3);
        
        for (let i = 0; i < layers; i++) {
            const layerSize = 100 + i * 30;
            const rotation = random() * Math.PI * 2;
            
            this.ctx.save();
            this.ctx.translate(centerX, centerY);
            this.ctx.rotate(rotation);
            this.ctx.strokeStyle = [palette.primary, palette.secondary, palette.tertiary][i % 3];
            this.ctx.lineWidth = 2;
            this.ctx.globalAlpha = 0.6 - i * 0.1;
            
            // Draw complex shape
            this.ctx.beginPath();
            const points = 6 + i * 2;
            for (let j = 0; j < points; j++) {
                const angle = (j / points) * Math.PI * 2;
                const radius = layerSize * (0.5 + Math.sin(j * 0.5) * 0.3);
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                
                if (j === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            }
            this.ctx.closePath();
            this.ctx.stroke();
            this.ctx.restore();
        }
        this.ctx.globalAlpha = 1;
    }

    /**
     * Add creative chapter information
     */
    private addCreativeChapterInfo(chapterNum: number, chapterTitle: string, width: number, height: number, palette: any): void {
        this.ctx.save();
        
        // Creative chapter number display
        const numX = width - 100;
        const numY = height - 100;
        
        // Background circle for chapter number
        const gradient = this.ctx.createRadialGradient(numX, numY, 0, numX, numY, 40);
        gradient.addColorStop(0, palette.accent);
        gradient.addColorStop(1, palette.primary);
        this.ctx.fillStyle = gradient;
        this.ctx.globalAlpha = 0.9;
        this.ctx.beginPath();
        this.ctx.arc(numX, numY, 35, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Chapter number
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = 'bold 20px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(chapterNum.toString(), numX, numY);
        
        // Chapter title (if short enough)
        if (chapterTitle.length < 30) {
            this.ctx.fillStyle = palette.primary;
            this.ctx.font = 'bold 16px Arial';
            this.ctx.globalAlpha = 0.8;
            this.ctx.textAlign = 'right';
            this.ctx.fillText(chapterTitle, numX - 50, numY);
        }
        
        this.ctx.restore();
    }

    /**
     * Generate symbols based on mood
     */
    private generateSymbolsForMood(mood: string): string[] {
        const symbolSets = {
            joy: ['✨', '🌟', '💫', '⭐', '🌈', '☀️', '🎉', '🎊'],
            sadness: ['💧', '🌧️', '☁️', '🌙', '💔', '🕯️', '🍂', '🌊'],
            anger: ['🔥', '⚡', '💥', '🌋', '⚠️', '🔴', '💢', '⚔️'],
            fear: ['👁️', '🌑', '🕸️', '🦇', '🌃', '⛓️', '🗝️', '🔦'],
            surprise: ['❗', '💫', '🌟', '✨', '🎆', '🎇', '💥', '🌠'],
            mystery: ['🔮', '🗝️', '🕯️', '🌙', '⭐', '🌌', '🔍', '📜']
        };
        
        return symbolSets[mood] || symbolSets.joy;
    }

    /**
     * Helper: Seeded random number generator
     */
    private seededRandom(seed: number): () => number {
        let m = 0x80000000;
        let a = 1103515245;
        let c = 12345;
        let state = seed;
        
        return () => {
            state = (a * state + c) % m;
            return state / m;
        };
    }

    /**
     * Helper: Draw hexagon
     */
    private drawHexagon(x: number, y: number, size: number): void {
        this.ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const hx = x + size * Math.cos(angle);
            const hy = y + size * Math.sin(angle);
            if (i === 0) {
                this.ctx.moveTo(hx, hy);
            } else {
                this.ctx.lineTo(hx, hy);
            }
        }
        this.ctx.closePath();
        this.ctx.fill();
    }

    /**
     * Helper: Color manipulation functions
     */
    private adjustHue(color: string, degrees: number): number {
        // Convert hex to HSL and adjust hue
        const rgb = this.hexToRgb(color);
        const hsl = this.rgbToHsl(rgb.r, rgb.g, rgb.b);
        return (hsl.h + degrees) % 360;
    }

    private adjustLightness(color: string, factor: number): number {
        const rgb = this.hexToRgb(color);
        const hsl = this.rgbToHsl(rgb.r, rgb.g, rgb.b);
        return hsl.l * factor;
    }

    private hexToRgb(hex: string): any {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 0, g: 0, b: 0 };
    }

    private rgbToHsl(r: number, g: number, b: number): any {
        r /= 255;
        g /= 255;
        b /= 255;
        
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        
        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            
            switch (max) {
                case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
                case g: h = ((b - r) / d + 2) / 6; break;
                case b: h = ((r - g) / d + 4) / 6; break;
            }
        }
        
        return { h: h * 360, s: s * 100, l: l * 100 };
    }

    private hslToHex(h: number, s: number, l: number): string {
        h = h / 360;
        s = s / 100;
        l = l / 100;
        
        let r, g, b;
        
        if (s === 0) {
            r = g = b = l;
        } else {
            const hue2rgb = (p: number, q: number, t: number) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1/6) return p + (q - p) * 6 * t;
                if (t < 1/2) return q;
                if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            };
            
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }
        
        const toHex = (x: number) => {
            const hex = Math.round(x * 255).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };
        
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }

    private lightenColor(color: string, factor: number): string {
        const rgb = this.hexToRgb(color);
        const hsl = this.rgbToHsl(rgb.r, rgb.g, rgb.b);
        return this.hslToHex(hsl.h, hsl.s, Math.min(100, hsl.l * factor));
    }
}

export const coverGenerator = new CoverGenerator();
