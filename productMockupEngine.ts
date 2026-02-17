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

        return PRODUCT_SHAPES['STANDARD_TEE']; // Fallback
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
