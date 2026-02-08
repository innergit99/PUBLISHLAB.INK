/**
 * CANVAS MOCKUP SERVICE
 * Pure programmatic drawing for product mockups
 * Zero external dependencies - all products drawn via vector commands
 */

import { MockupType } from './types';

export interface MockupOptions {
  designUrl: string;
  productType: string;
  designPosition?: {
    x: number;
    y: number;
    width: number;
    height: number;
    rotation?: number;
    perspective?: boolean;
  };
  color?: string;
}

export interface MockupResult {
  url: string;
  productType: string;
  width: number;
  height: number;
}

const PRODUCT_SHAPES: Record<string, any> = {
  'STANDARD_TEE': {
    width: 1000,
    height: 1000,
    draw: (ctx: CanvasRenderingContext2D, color: string) => {
      ctx.fillStyle = color;
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 6;

      // Torso
      ctx.beginPath();
      ctx.moveTo(250, 200);
      ctx.lineTo(750, 200);
      ctx.lineTo(750, 850);
      ctx.lineTo(250, 850);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Sleeves
      ctx.beginPath();
      ctx.moveTo(250, 200); ctx.lineTo(100, 200); ctx.lineTo(100, 400); ctx.lineTo(250, 400);
      ctx.fill(); ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(750, 200); ctx.lineTo(900, 200); ctx.lineTo(900, 400); ctx.lineTo(750, 400);
      ctx.fill(); ctx.stroke();

      // Neck detail
      ctx.fillStyle = shadeColor(color, -10);
      ctx.beginPath(); ctx.arc(500, 200, 80, 0, Math.PI, false); ctx.fill(); ctx.stroke();
    },
    designArea: { x: 350, y: 300, width: 300, height: 450 }
  },
  'LARGE_PRINT_TEE': {
    width: 1000,
    height: 1000,
    draw: (ctx: CanvasRenderingContext2D, color: string) => {
      PRODUCT_SHAPES['STANDARD_TEE'].draw(ctx, color);
    },
    designArea: { x: 300, y: 250, width: 400, height: 550 }
  },
  'HOODIE': {
    width: 1000,
    height: 1100,
    draw: (ctx: CanvasRenderingContext2D, color: string) => {
      ctx.fillStyle = color;
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 6;

      // Body
      ctx.beginPath(); ctx.roundRect(250, 250, 500, 700, 20); ctx.fill(); ctx.stroke();

      // Sleeves
      ctx.beginPath(); ctx.moveTo(250, 250); ctx.lineTo(100, 250); ctx.lineTo(100, 900); ctx.lineTo(150, 900); ctx.lineTo(250, 350); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(750, 250); ctx.lineTo(900, 250); ctx.lineTo(900, 900); ctx.lineTo(850, 900); ctx.lineTo(750, 350); ctx.fill(); ctx.stroke();

      // Hood
      ctx.beginPath(); ctx.roundRect(350, 100, 300, 150, 50); ctx.fill(); ctx.stroke();

      // Pocket
      ctx.beginPath(); ctx.rect(350, 750, 300, 150); ctx.stroke();
    },
    designArea: { x: 350, y: 400, width: 300, height: 350 }
  },
  'HAT': {
    width: 1000,
    height: 800,
    draw: (ctx: CanvasRenderingContext2D, color: string) => {
      ctx.fillStyle = color;
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 6;

      // Cap Base
      ctx.beginPath(); ctx.arc(500, 400, 250, Math.PI, 0); ctx.fill(); ctx.stroke();

      // Brim
      ctx.beginPath(); ctx.roundRect(250, 400, 500, 60, 10); ctx.fill(); ctx.stroke();
    },
    designArea: { x: 400, y: 300, width: 200, height: 90 }
  },
  'MUG': {
    width: 800,
    height: 600,
    draw: (ctx: CanvasRenderingContext2D, color: string) => {
      ctx.fillStyle = color;
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 6;

      // Cylinder Body
      ctx.beginPath(); ctx.roundRect(250, 150, 300, 350, 12); ctx.fill(); ctx.stroke();

      // Handle
      ctx.beginPath(); ctx.arc(550, 325, 75, -Math.PI / 2, Math.PI / 2); ctx.stroke();
    },
    designArea: { x: 275, y: 200, width: 250, height: 250 }
  },
  'STICKER': {
    width: 600,
    height: 600,
    draw: (ctx: CanvasRenderingContext2D, color: string) => {
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 8;

      ctx.beginPath();
      // Die-cut shape (bumpy circle)
      for (let i = 0; i < 360; i += 20) {
        const rad = (i * Math.PI) / 180;
        const r = 240 + Math.sin(i / 10) * 10;
        ctx.lineTo(300 + Math.cos(rad) * r, 300 + Math.sin(rad) * r);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    },
    designArea: { x: 120, y: 120, width: 360, height: 360 }
  },
  'PHONE_CASE': {
    width: 600,
    height: 1000,
    draw: (ctx: CanvasRenderingContext2D, color: string) => {
      ctx.fillStyle = '#111';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 6;

      ctx.beginPath(); ctx.roundRect(150, 100, 300, 600, 40); ctx.fill(); ctx.stroke();

      ctx.fillStyle = color;
      ctx.beginPath(); ctx.roundRect(165, 115, 270, 570, 30); ctx.fill(); ctx.stroke();

      // Camera cutout
      ctx.fillStyle = '#000';
      ctx.beginPath(); ctx.roundRect(330, 140, 80, 80, 15); ctx.fill();
    },
    designArea: { x: 165, y: 115, width: 270, height: 570 }
  },
  'POSTER': {
    width: 800,
    height: 1100,
    draw: (ctx: CanvasRenderingContext2D, color: string) => {
      ctx.fillStyle = '#fff';
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 6;
      ctx.beginPath(); ctx.rect(150, 100, 500, 750); ctx.fill(); ctx.stroke();
      // Roll detail
      ctx.beginPath(); ctx.ellipse(400, 850, 250, 30, 0, 0, Math.PI); ctx.stroke();
    },
    designArea: { x: 170, y: 120, width: 460, height: 710 }
  },
  'TOTE_BAG': {
    width: 800,
    height: 800,
    draw: (ctx: CanvasRenderingContext2D, color: string) => {
      ctx.fillStyle = color;
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 6;

      // Bag Body
      ctx.beginPath();
      ctx.moveTo(250, 300);
      ctx.lineTo(550, 300);
      ctx.lineTo(580, 700);
      ctx.lineTo(220, 700);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Handles
      ctx.beginPath();
      ctx.moveTo(350, 300); ctx.quadraticCurveTo(350, 180, 400, 180); ctx.quadraticCurveTo(450, 180, 450, 300);
      ctx.stroke();
    },
    designArea: { x: 300, y: 350, width: 200, height: 250 }
  }
};

// Generic shapes to cover all 33+ product types
const DEFAULT_RECTANGLE = {
  width: 1000,
  height: 1000,
  draw: (ctx: CanvasRenderingContext2D, color: string) => {
    ctx.fillStyle = color;
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 6;
    ctx.beginPath(); ctx.roundRect(200, 150, 600, 700, 10); ctx.fill(); ctx.stroke();
  },
  designArea: { x: 250, y: 200, width: 500, height: 600 }
};

const DEFAULT_SQUARE = {
  width: 1000,
  height: 1000,
  draw: (ctx: CanvasRenderingContext2D, color: string) => {
    ctx.fillStyle = color;
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 6;
    ctx.beginPath(); ctx.roundRect(200, 200, 600, 600, 20); ctx.fill(); ctx.stroke();
  },
  designArea: { x: 250, y: 250, width: 500, height: 500 }
};

const DEFAULT_CIRCLE = {
  width: 1000,
  height: 1000,
  draw: (ctx: CanvasRenderingContext2D, color: string) => {
    ctx.fillStyle = color;
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 6;
    ctx.beginPath(); ctx.arc(500, 500, 400, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  },
  designArea: { x: 250, y: 250, width: 500, height: 500 }
};

// Helper to map unknown types to generic shapes
function getTemplate(type: string): any {
  if (PRODUCT_SHAPES[type]) return PRODUCT_SHAPES[type];

  const lower = type.toLowerCase();
  if (lower.includes('card') || lower.includes('journal') || lower.includes('notebook') || lower.includes('blanket') || lower.includes('tapestry') || lower.includes('mat')) {
    return DEFAULT_RECTANGLE;
  }
  if (lower.includes('pillow') || lower.includes('coaster') || lower.includes('acrylic') || lower.includes('puzzle')) {
    return DEFAULT_SQUARE;
  }
  if (lower.includes('button') || lower.includes('clock') || lower.includes('sticker')) {
    return DEFAULT_CIRCLE;
  }

  return DEFAULT_RECTANGLE;
}

export class CanvasMockupService {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.canvas = document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
    }
  }

  async generateMockup(options: MockupOptions): Promise<MockupResult> {
    const { designUrl, productType, color = '#ffffff' } = options;
    const template = getTemplate(productType);

    if (!this.canvas || !this.ctx) throw new Error('Canvas unavailable');

    this.canvas.width = template.width;
    this.canvas.height = template.height;

    // 1. Draw Transparent Background
    this.ctx.clearRect(0, 0, template.width, template.height);

    // 2. Draw Product Base
    template.draw(this.ctx, color);

    // 3. Load and Draw Design
    const designImg = await this.loadImage(designUrl);
    const area = template.designArea;

    this.ctx.save();
    this.ctx.drawImage(designImg, area.x, area.y, area.width, area.height);
    this.ctx.restore();

    // 4. Subtle Shading
    this.addShading(template);

    return {
      url: this.canvas.toDataURL('image/png'),
      productType,
      width: template.width,
      height: template.height
    };
  }

  async generateBaseProduct(productType: string, color: string = '#ffffff'): Promise<string> {
    const template = getTemplate(productType);
    if (!this.canvas || !this.ctx) throw new Error('Canvas unavailable');

    this.canvas.width = template.width;
    this.canvas.height = template.height;

    this.ctx.clearRect(0, 0, template.width, template.height);

    template.draw(this.ctx, color);
    this.addShading(template);

    return this.canvas.toDataURL('image/png');
  }

  private loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('Failed to load design image'));
      img.src = src;
    });
  }

  private addShading(template: any) {
    if (!this.ctx) return;
    const grad = this.ctx.createLinearGradient(0, 0, 0, template.height);
    grad.addColorStop(0, 'rgba(0,0,0,0.01)');
    grad.addColorStop(1, 'rgba(0,0,0,0.03)');
    this.ctx.fillStyle = grad;
    this.ctx.fillRect(0, 0, template.width, template.height);
  }
}

function shadeColor(color: string, percent: number): string {
  if (color === '#111') return '#000';
  if (color === '#fff' || color === '#ffffff') return '#f0f0f0';

  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255))
    .toString(16).slice(1);
}

export const canvasMockupService = new CanvasMockupService();
