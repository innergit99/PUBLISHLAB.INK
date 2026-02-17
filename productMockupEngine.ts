/**
 * PRODUCT MOCKUP ENGINE v3.0 (Unified)
 * Industrial-grade programmatic rendering engine.
 * Consolidates CanvasMockupService (Flat Lay) and HolographicMockupService (3D/Lighting).
 */

export type MockupStyle = 'realistic' | 'minimal' | '3d';

export interface MockupOptions {
    designUrl: string;
    productType: string;
    color?: string;
    style?: MockupStyle;
    designPosition?: {
        x: number;
        y: number;
        width: number;
        height: number;
        rotation?: number;
        perspective?: boolean;
    };
}

export interface MockupResult {
    url: string;
    productType: string;
    width: number;
    height: number;
}

// --- CORE UTILITIES ---

const shadeColor = (color: string, percent: number): string => {
    const f = parseInt(color.slice(1), 16), t = percent < 0 ? 0 : 255, p = percent < 0 ? percent * -1 : percent, R = f >> 16, G = f >> 8 & 0x00FF, B = f & 0x0000FF;
    return "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
};

const addDropShadow = (ctx: CanvasRenderingContext2D, y: number = 10, blur: number = 20) => {
    ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
    ctx.shadowBlur = blur;
    ctx.shadowOffsetY = y;
};

const resetShadow = (ctx: CanvasRenderingContext2D) => {
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;
};

const drawWrinkle = (ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, cpX: number, cpY: number, alpha: number = 0.05) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.quadraticCurveTo(cpX, cpY, x2, y2);
    ctx.strokeStyle = `rgba(0,0,0,${alpha})`;
    ctx.lineWidth = 2;
    ctx.stroke();
};

// --- PRODUCT SHAPES ---

const PRODUCT_SHAPES: Record<string, any> = {
    'STANDARD_TEE': {
        width: 1000, height: 1000,
        draw: (ctx: CanvasRenderingContext2D, color: string) => {
            addDropShadow(ctx, 15, 30);
            ctx.fillStyle = color;
            ctx.strokeStyle = '#222';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(380, 150); ctx.quadraticCurveTo(500, 200, 620, 150);
            ctx.lineTo(750, 180); ctx.quadraticCurveTo(800, 250, 820, 350);
            ctx.lineTo(720, 380); ctx.lineTo(700, 300); ctx.quadraticCurveTo(710, 500, 710, 800);
            ctx.quadraticCurveTo(500, 820, 290, 800); ctx.quadraticCurveTo(290, 500, 300, 300);
            ctx.lineTo(280, 380); ctx.lineTo(180, 350); ctx.quadraticCurveTo(200, 250, 250, 180);
            ctx.lineTo(380, 150); ctx.closePath();
            ctx.fill(); resetShadow(ctx); ctx.stroke();
            // Collar
            ctx.beginPath(); ctx.moveTo(380, 150); ctx.quadraticCurveTo(500, 200, 620, 150);
            ctx.quadraticCurveTo(500, 230, 380, 150); ctx.fillStyle = shadeColor(color, -0.1); ctx.fill(); ctx.stroke();
            // Wrinkles
            drawWrinkle(ctx, 300, 300, 400, 400, 350, 350, 0.1);
            drawWrinkle(ctx, 700, 300, 600, 400, 650, 350, 0.1);
        },
        designArea: { x: 350, y: 300, width: 300, height: 400 }
    },
    'HOODIE': {
        width: 900, height: 1100,
        draw: (ctx: CanvasRenderingContext2D, color: string) => {
            addDropShadow(ctx, 20, 40);
            ctx.fillStyle = color;
            ctx.strokeStyle = '#222';
            ctx.lineWidth = 2;
            // Hood
            ctx.beginPath(); ctx.moveTo(300, 150); ctx.quadraticCurveTo(450, 100, 600, 150); ctx.lineTo(600, 250); ctx.lineTo(300, 250); ctx.closePath(); ctx.fill(); ctx.stroke();
            // Body
            ctx.beginPath(); ctx.moveTo(300, 250); ctx.lineTo(150, 350); ctx.lineTo(150, 900); ctx.quadraticCurveTo(450, 950, 750, 900); ctx.lineTo(750, 350); ctx.lineTo(600, 250); ctx.closePath(); ctx.fill(); ctx.stroke();
            // Pocket
            ctx.fillStyle = shadeColor(color, -0.05);
            ctx.beginPath(); ctx.roundRect(300, 600, 300, 200, 20); ctx.fill(); ctx.stroke();
            resetShadow(ctx);
        },
        designArea: { x: 280, y: 350, width: 340, height: 250 }
    },
    'MUG': {
        width: 800, height: 700,
        draw: (ctx: CanvasRenderingContext2D, color: string) => {
            addDropShadow(ctx, 10, 20);
            ctx.fillStyle = color;
            ctx.strokeStyle = '#111';
            ctx.lineWidth = 2;
            // Handle
            ctx.beginPath(); ctx.arc(580, 350, 90, -Math.PI / 2, Math.PI / 2); ctx.lineWidth = 25; ctx.strokeStyle = color; ctx.stroke(); resetShadow(ctx); ctx.lineWidth = 2; ctx.strokeStyle = '#111'; ctx.stroke();
            // Main
            ctx.beginPath(); ctx.ellipse(400, 200, 180, 40, 0, 0, Math.PI * 2); ctx.moveTo(220, 200); ctx.lineTo(230, 550); ctx.quadraticCurveTo(400, 600, 570, 550); ctx.lineTo(580, 200); ctx.fill(); ctx.stroke();
            // Highlight
            ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.fillRect(260, 250, 30, 300);
        },
        designArea: { x: 300, y: 250, width: 220, height: 250 }
    },
    'TOTE_BAG': {
        width: 800, height: 900,
        draw: (ctx: CanvasRenderingContext2D, color: string) => {
            addDropShadow(ctx, 10, 20);
            ctx.fillStyle = color; ctx.strokeStyle = '#333'; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.rect(200, 300, 400, 450); ctx.fill(); resetShadow(ctx); ctx.stroke();
            // Straps
            ctx.fillStyle = '#111'; ctx.fillRect(250, 100, 30, 200); ctx.fillRect(520, 100, 30, 200);
            ctx.beginPath(); ctx.arc(400, 100, 135, Math.PI, 0); ctx.lineWidth = 30; ctx.strokeStyle = '#111'; ctx.stroke();
        },
        designArea: { x: 250, y: 350, width: 300, height: 350 }
    },
    'PHONE_CASE': {
        width: 600, height: 1000,
        draw: (ctx: CanvasRenderingContext2D, color: string) => {
            addDropShadow(ctx, 10, 25);
            ctx.fillStyle = color; ctx.strokeStyle = '#333'; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.roundRect(150, 100, 300, 600, 45); ctx.fill(); resetShadow(ctx); ctx.stroke();
            // Camera
            ctx.fillStyle = '#111'; ctx.beginPath(); ctx.roundRect(170, 120, 100, 100, 25); ctx.fill();
        },
        designArea: { x: 160, y: 240, width: 280, height: 440 }
    },
    'PILLOW': {
        width: 800, height: 800,
        draw: (ctx: CanvasRenderingContext2D, color: string) => {
            addDropShadow(ctx, 15, 30);
            ctx.fillStyle = color; ctx.strokeStyle = '#ccc'; ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(150, 150); ctx.quadraticCurveTo(400, 100, 650, 150); ctx.quadraticCurveTo(700, 400, 650, 650); ctx.quadraticCurveTo(400, 700, 150, 650); ctx.quadraticCurveTo(100, 400, 150, 150); ctx.fill(); resetShadow(ctx); ctx.stroke();
            // Gradient
            const grad = ctx.createRadialGradient(400, 400, 100, 400, 400, 400); grad.addColorStop(0, 'rgba(255,255,255,0.2)'); grad.addColorStop(1, 'rgba(0,0,0,0.1)'); ctx.fillStyle = grad; ctx.fill();
        },
        designArea: { x: 200, y: 200, width: 400, height: 400 }
    },
    'POSTER': {
        width: 800, height: 1000,
        draw: (ctx: CanvasRenderingContext2D) => {
            addDropShadow(ctx, 20, 40);
            ctx.fillStyle = '#fff'; ctx.strokeStyle = '#111'; ctx.lineWidth = 15;
            ctx.beginPath(); ctx.rect(150, 100, 500, 700); ctx.stroke(); resetShadow(ctx); ctx.fillRect(158, 108, 484, 684);
        },
        designArea: { x: 160, y: 110, width: 480, height: 680 }
    },
    'STICKER': {
        width: 600, height: 600,
        draw: (ctx: CanvasRenderingContext2D) => {
            addDropShadow(ctx, 8, 15);
            ctx.fillStyle = '#fff'; ctx.strokeStyle = '#ccc'; ctx.lineWidth = 4;
            ctx.beginPath(); ctx.moveTo(300, 100); ctx.quadraticCurveTo(500, 100, 500, 300); ctx.quadraticCurveTo(500, 500, 300, 500); ctx.quadraticCurveTo(100, 500, 100, 300); ctx.quadraticCurveTo(100, 100, 300, 100); ctx.fill(); resetShadow(ctx); ctx.stroke();
        },
        designArea: { x: 150, y: 150, width: 300, height: 300 }
    },
    'SPIRAL_NOTEBOOK': {
        width: 800, height: 1000,
        draw: (ctx: CanvasRenderingContext2D, color: string) => {
            addDropShadow(ctx, 10, 20);
            ctx.fillStyle = '#333'; ctx.beginPath(); ctx.roundRect(100, 100, 600, 800, 10); ctx.fill();
            ctx.fillStyle = color; ctx.strokeStyle = '#222'; ctx.lineWidth = 1; resetShadow(ctx);
            ctx.beginPath(); ctx.roundRect(100, 100, 600, 800, 10); ctx.fill(); ctx.stroke();
            // Binding
            for (let y = 120; y < 880; y += 40) {
                ctx.fillStyle = '#000'; ctx.beginPath(); ctx.arc(120, y, 6, 0, Math.PI * 2); ctx.fill();
                ctx.strokeStyle = '#888'; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(110, y, 15, 0, Math.PI * 2); ctx.stroke();
            }
        },
        designArea: { x: 150, y: 150, width: 500, height: 700 }
    },
    'HAT': {
        width: 800, height: 700,
        draw: (ctx: CanvasRenderingContext2D, color: string) => {
            addDropShadow(ctx, 15, 25);
            ctx.fillStyle = color; ctx.strokeStyle = '#222'; ctx.lineWidth = 2;
            // Dome
            ctx.beginPath(); ctx.arc(400, 350, 200, Math.PI, 0); ctx.fill(); ctx.stroke();
            // Brim
            ctx.beginPath(); ctx.ellipse(400, 350, 280, 40, 0, 0, Math.PI * 2); ctx.fillStyle = shadeColor(color, -0.1); ctx.fill(); ctx.stroke();
            // Button
            ctx.fillStyle = '#222'; ctx.beginPath(); ctx.arc(400, 150, 10, 0, Math.PI * 2); ctx.fill();
            resetShadow(ctx);
        },
        designArea: { x: 280, y: 180, width: 240, height: 150 }
    },
    'DESK_MAT': {
        width: 1200, height: 600,
        draw: (ctx: CanvasRenderingContext2D, color: string) => {
            addDropShadow(ctx, 10, 20);
            ctx.fillStyle = color; ctx.strokeStyle = '#333'; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.roundRect(100, 100, 1000, 400, 25); ctx.fill(); resetShadow(ctx); ctx.stroke();
            // Stitching
            ctx.setLineDash([5, 5]); ctx.strokeStyle = '#555'; ctx.lineWidth = 1;
            ctx.beginPath(); ctx.roundRect(110, 110, 980, 380, 20); ctx.stroke(); ctx.setLineDash([]);
        },
        designArea: { x: 100, y: 100, width: 1000, height: 400 }
    },
    'CANVAS': {
        width: 900, height: 700,
        draw: (ctx: CanvasRenderingContext2D) => {
            addDropShadow(ctx, 25, 50);
            // Side depth
            ctx.fillStyle = '#ddd'; ctx.beginPath(); ctx.moveTo(800, 100); ctx.lineTo(840, 140); ctx.lineTo(840, 640); ctx.lineTo(800, 600); ctx.fill();
            ctx.fillStyle = '#ccc'; ctx.beginPath(); ctx.moveTo(100, 600); ctx.lineTo(140, 640); ctx.lineTo(840, 640); ctx.lineTo(800, 600); ctx.fill();

            // Front face
            ctx.fillStyle = '#fff'; ctx.strokeStyle = '#eee'; ctx.lineWidth = 1;
            ctx.beginPath(); ctx.rect(100, 100, 700, 500); ctx.fill(); resetShadow(ctx); ctx.stroke();
        },
        designArea: { x: 100, y: 100, width: 700, height: 500 }
    },
    'LAPTOP_SKIN': {
        width: 1000, height: 700,
        draw: (ctx: CanvasRenderingContext2D, color: string) => {
            addDropShadow(ctx, 10, 20);
            ctx.fillStyle = color; ctx.strokeStyle = '#333'; ctx.lineWidth = 1;
            ctx.beginPath(); ctx.roundRect(150, 100, 700, 480, 30); ctx.fill(); resetShadow(ctx); ctx.stroke();
            // Apple Logo cutout placeholder
            ctx.fillStyle = 'rgba(255,255,255,0.2)'; ctx.beginPath(); ctx.arc(500, 340, 40, 0, Math.PI * 2); ctx.fill();
        },
        designArea: { x: 150, y: 100, width: 700, height: 480 }
    },
    'DRESS': {
        width: 800, height: 1100,
        draw: (ctx: CanvasRenderingContext2D, color: string) => {
            addDropShadow(ctx, 15, 30);
            ctx.fillStyle = color; ctx.strokeStyle = '#333'; ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(300, 100); ctx.quadraticCurveTo(400, 150, 500, 100); // Neck
            ctx.lineTo(600, 150); ctx.quadraticCurveTo(550, 300, 600, 400); // Right sleeve/waist
            ctx.lineTo(700, 900); ctx.quadraticCurveTo(400, 950, 100, 900); // Bottom hem
            ctx.lineTo(200, 400); ctx.quadraticCurveTo(250, 300, 200, 150); // Left sleeve/waist
            ctx.closePath();
            ctx.fill(); resetShadow(ctx); ctx.stroke();
        },
        designArea: { x: 250, y: 200, width: 300, height: 600 }
    },
    'CLOCK': {
        width: 800, height: 800,
        draw: (ctx: CanvasRenderingContext2D, color: string) => {
            addDropShadow(ctx, 20, 40);
            ctx.fillStyle = '#222'; ctx.beginPath(); ctx.arc(400, 400, 310, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = color; ctx.strokeStyle = '#111'; ctx.lineWidth = 5;
            ctx.beginPath(); ctx.arc(400, 400, 300, 0, Math.PI * 2); ctx.fill(); resetShadow(ctx); ctx.stroke();
            // Hands
            ctx.strokeStyle = '#000'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(400, 400); ctx.lineTo(400, 200); ctx.stroke();
            ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(400, 400); ctx.lineTo(550, 400); ctx.stroke();
            ctx.fillStyle = '#d00'; ctx.beginPath(); ctx.arc(400, 400, 15, 0, Math.PI * 2); ctx.fill();
        },
        designArea: { x: 150, y: 150, width: 500, height: 500 }
    },
    'SHOWER_CURTAIN': {
        width: 800, height: 900,
        draw: (ctx: CanvasRenderingContext2D, color: string) => {
            addDropShadow(ctx, 10, 30);
            ctx.fillStyle = color; ctx.strokeStyle = '#ccc'; ctx.lineWidth = 1;
            ctx.beginPath(); ctx.rect(100, 100, 600, 700); ctx.fill(); resetShadow(ctx); ctx.stroke();
            // Rings
            ctx.fillStyle = '#fff'; ctx.strokeStyle = '#999';
            for (let x = 120; x < 700; x += 55) {
                ctx.beginPath(); ctx.arc(x, 115, 8, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
            }
        },
        designArea: { x: 100, y: 150, width: 600, height: 650 }
    },
    'PUZZLE': {
        width: 800, height: 600,
        draw: (ctx: CanvasRenderingContext2D) => {
            addDropShadow(ctx, 5, 10);
            ctx.fillStyle = '#fff'; ctx.strokeStyle = '#ccc';
            ctx.beginPath(); ctx.rect(100, 100, 600, 400); ctx.fill(); resetShadow(ctx); ctx.stroke();
            // Puzzle Overlay Pattern
            ctx.beginPath(); ctx.lineWidth = 0.5; ctx.strokeStyle = 'rgba(0,0,0,0.3)';
            for (let x = 100; x <= 700; x += 50) { ctx.moveTo(x, 100); ctx.lineTo(x, 500); }
            for (let y = 100; y <= 500; y += 50) { ctx.moveTo(100, y); ctx.lineTo(700, y); }
            ctx.stroke();
        },
        designArea: { x: 100, y: 100, width: 600, height: 400 }
    },
    'SOCKS': {
        width: 600, height: 800,
        draw: (ctx: CanvasRenderingContext2D, color: string) => {
            addDropShadow(ctx, 10, 20);
            ctx.fillStyle = color; ctx.strokeStyle = '#ccc'; ctx.lineWidth = 2;
            // Sock Shape
            ctx.beginPath(); ctx.moveTo(200, 100); ctx.lineTo(400, 100); ctx.lineTo(380, 500);
            ctx.quadraticCurveTo(380, 700, 200, 700); ctx.quadraticCurveTo(100, 700, 100, 600);
            ctx.lineTo(200, 500); ctx.lineTo(200, 100); ctx.closePath();
            ctx.fill(); resetShadow(ctx); ctx.stroke();
            // Heel & Toe
            ctx.fillStyle = '#333';
            ctx.beginPath(); ctx.moveTo(200, 650); ctx.quadraticCurveTo(100, 650, 100, 600); ctx.lineTo(200, 550); ctx.fill(); // Toe
            ctx.beginPath(); ctx.moveTo(200, 500); ctx.quadraticCurveTo(250, 550, 200, 600); ctx.lineTo(200, 500); ctx.fill(); // Heel
        },
        designArea: { x: 200, y: 120, width: 180, height: 350 }
    },
    'GENERIC_RECT': {
        width: 800, height: 600,
        draw: (ctx: CanvasRenderingContext2D) => {
            addDropShadow(ctx, 15, 30);
            ctx.fillStyle = '#f0f0f0'; ctx.strokeStyle = '#ccc'; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.roundRect(100, 100, 600, 400, 20); ctx.fill(); resetShadow(ctx); ctx.stroke();
        },
        designArea: { x: 100, y: 100, width: 600, height: 400 }
    },
    'GENERIC_SQUARE': {
        width: 800, height: 800,
        draw: (ctx: CanvasRenderingContext2D) => {
            addDropShadow(ctx, 15, 30);
            ctx.fillStyle = '#f0f0f0'; ctx.strokeStyle = '#ccc'; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.roundRect(150, 150, 500, 500, 20); ctx.fill(); resetShadow(ctx); ctx.stroke();
        },
        designArea: { x: 150, y: 150, width: 500, height: 500 }
    },
    'APRON': {
        width: 800, height: 1000,
        draw: (ctx: CanvasRenderingContext2D, color: string) => {
            addDropShadow(ctx, 10, 20);
            ctx.fillStyle = color; ctx.strokeStyle = '#333'; ctx.lineWidth = 2;
            // Apron Body
            ctx.beginPath();
            ctx.moveTo(300, 200); ctx.lineTo(500, 200); // Neck top
            ctx.lineTo(600, 400); ctx.lineTo(600, 900); // Right side
            ctx.lineTo(200, 900); ctx.lineTo(200, 400); // Left side
            ctx.closePath();
            ctx.fill(); resetShadow(ctx); ctx.stroke();
            // Neck Strap
            ctx.beginPath(); ctx.moveTo(300, 200); ctx.quadraticCurveTo(400, 50, 500, 200); ctx.strokeStyle = '#222'; ctx.lineWidth = 4; ctx.stroke();
            // Waist Straps
            ctx.beginPath(); ctx.moveTo(200, 400); ctx.lineTo(50, 450); ctx.moveTo(600, 400); ctx.lineTo(750, 450); ctx.stroke();
        },
        designArea: { x: 250, y: 300, width: 300, height: 500 }
    },
    'BUTTON': {
        width: 600, height: 600,
        draw: (ctx: CanvasRenderingContext2D) => {
            addDropShadow(ctx, 10, 20);
            ctx.fillStyle = '#f0f0f0'; ctx.strokeStyle = '#aaa'; ctx.lineWidth = 1;
            ctx.beginPath(); ctx.arc(300, 300, 250, 0, Math.PI * 2); ctx.fill(); resetShadow(ctx); ctx.stroke();
            // Reflection
            const grad = ctx.createLinearGradient(100, 100, 500, 500); grad.addColorStop(0, 'rgba(255,255,255,0.8)'); grad.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = grad; ctx.fill();
        },
        designArea: { x: 100, y: 100, width: 400, height: 400 }
    }
};

export class ProductMockupEngine {
    private canvas: HTMLCanvasElement | null = null;
    private ctx: CanvasRenderingContext2D | null = null;

    constructor() {
        if (typeof window !== 'undefined') {
            this.canvas = document.createElement('canvas');
            this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
        }
    }

    async generateMockup(options: MockupOptions): Promise<MockupResult> {
        const { designUrl, productType, color = '#f2f2f2', style = 'realistic' } = options;
        const template = this.getTemplate(productType);

        if (!this.canvas || !this.ctx) throw new Error('Canvas unavailable');

        this.canvas.width = template.width;
        this.canvas.height = template.height;

        // 1. Clear & Background
        this.ctx.clearRect(0, 0, template.width, template.height);
        if (style === '3d') {
            this.drawBackground(template.width, template.height);
        }

        // 2. Draw Product Base
        template.draw(this.ctx, color);

        // 3. Load Design
        let designImg;
        try {
            designImg = await this.loadImage(designUrl);
        } catch {
            return { url: this.canvas.toDataURL(), productType, width: template.width, height: template.height };
        }

        // 4. Overlay Design
        this.overlayDesign(designImg, template.designArea, style);

        // 5. Final Effects
        if (style !== 'minimal') {
            this.addLightingEffects(template, style);
        }

        return {
            url: this.canvas.toDataURL('image/png'),
            productType,
            width: template.width,
            height: template.height
        };
    }

    private getTemplate(type: string): any {
        if (PRODUCT_SHAPES[type]) return PRODUCT_SHAPES[type];
        const lower = type.toLowerCase();
        if (lower.includes('tee')) return PRODUCT_SHAPES['STANDARD_TEE'];
        if (lower.includes('hoodie')) return PRODUCT_SHAPES['HOODIE'];
        if (lower.includes('mug')) return PRODUCT_SHAPES['MUG'];
        if (lower.includes('tote')) return PRODUCT_SHAPES['TOTE_BAG'];
        if (lower.includes('case')) return PRODUCT_SHAPES['PHONE_CASE'];
        if (lower.includes('pillow')) return PRODUCT_SHAPES['PILLOW'];
        if (lower.includes('poster')) return PRODUCT_SHAPES['POSTER'];
        if (lower.includes('sticker')) return PRODUCT_SHAPES['STICKER'];
        if (lower.includes('notebook')) return PRODUCT_SHAPES['SPIRAL_NOTEBOOK'];

        if (lower.includes('hat') || lower.includes('cap')) return PRODUCT_SHAPES['HAT'];
        if (lower.includes('mat') || lower.includes('mouse')) return PRODUCT_SHAPES['DESK_MAT'];
        if (lower.includes('canvas')) return PRODUCT_SHAPES['CANVAS'];
        if (lower.includes('skin') || lower.includes('laptop')) return PRODUCT_SHAPES['LAPTOP_SKIN'];
        if (lower.includes('dress') || lower.includes('skirt')) return PRODUCT_SHAPES['DRESS'];
        if (lower.includes('clock')) return PRODUCT_SHAPES['CLOCK'];
        if (lower.includes('curtain')) return PRODUCT_SHAPES['SHOWER_CURTAIN'];
        if (lower.includes('journal')) return PRODUCT_SHAPES['JOURNAL'];
        if (lower.includes('puzzle')) return PRODUCT_SHAPES['PUZZLE'];
        if (lower.includes('sock')) return PRODUCT_SHAPES['SOCKS'];

        if (lower.includes('apron')) return PRODUCT_SHAPES['APRON'];
        if (lower.includes('button') || lower.includes('pin') || lower.includes('magnet')) return PRODUCT_SHAPES['BUTTON'];
        if (lower.includes('coaster')) return PRODUCT_SHAPES['GENERIC_SQUARE']; // Coasters are essentially square buttons/tiles

        // Intelligent Fallbacks
        if (lower.includes('mat') || lower.includes('flag') || lower.includes('towel') || lower.includes('blanket') || lower.includes('duvet') || lower.includes('tapestry') || lower.includes('card') || lower.includes('pouch')) return PRODUCT_SHAPES['GENERIC_RECT'];
        if (lower.includes('block') || lower.includes('square')) return PRODUCT_SHAPES['GENERIC_SQUARE'];
        if (lower.includes('bag') || lower.includes('pack')) return PRODUCT_SHAPES['TOTE_BAG'];

        return PRODUCT_SHAPES['GENERIC_SQUARE']; // Better Default than T-Shirt
    }

    private async loadImage(src: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    }

    private drawBackground(width: number, height: number): void {
        if (!this.ctx) return;
        const gradient = this.ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, '#f8f9fa');
        gradient.addColorStop(1, '#e9ecef');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, width, height);
    }

    private overlayDesign(designImg: HTMLImageElement, area: any, style: MockupStyle): void {
        if (!this.ctx) return;
        this.ctx.save();

        if (style === '3d') {
            const centerX = area.x + area.width / 2;
            const centerY = area.y + area.height / 2;
            this.ctx.translate(centerX, centerY);
            this.ctx.transform(1, 0, -0.05, 1, 0, 0); // Slight Skew
            this.ctx.translate(-centerX, -centerY);
        }

        if (style === 'realistic') {
            this.ctx.globalCompositeOperation = 'multiply';
            this.ctx.globalAlpha = 0.9;
        }

        this.ctx.drawImage(designImg, area.x, area.y, area.width, area.height);
        this.ctx.restore();
    }

    private addLightingEffects(template: any, style: MockupStyle): void {
        if (!this.ctx) return;

        const grad = this.ctx.createLinearGradient(0, 0, template.width, template.height);
        grad.addColorStop(0, 'rgba(255,255,255,0.15)');
        grad.addColorStop(0.5, 'rgba(255,255,255,0)');
        grad.addColorStop(1, 'rgba(0,0,0,0.05)');

        this.ctx.globalCompositeOperation = 'overlay';
        this.ctx.fillStyle = grad;
        this.ctx.fillRect(0, 0, template.width, template.height);
        this.ctx.globalCompositeOperation = 'source-over';

        if (style === '3d') {
            const vignette = this.ctx.createRadialGradient(
                template.width / 2, template.height / 2, template.width * 0.4,
                template.width / 2, template.height / 2, template.width * 0.9
            );
            vignette.addColorStop(0, 'rgba(0,0,0,0)');
            vignette.addColorStop(1, 'rgba(0,0,0,0.1)');
            this.ctx.fillStyle = vignette;
            this.ctx.fillRect(0, 0, template.width, template.height);
        }
    }
}

export const productMockupEngine = new ProductMockupEngine();
