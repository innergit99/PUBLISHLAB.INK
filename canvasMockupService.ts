/**
 * Canvas Mockup Service - Free, unlimited mockup generation
 * Uses HTML5 Canvas to overlay designs onto base product templates
 * No API limits, no external dependencies, 100% free
 */

export interface MockupOptions {
  designUrl: string;
  productType: string;
  designPosition?: {
    x: number;
    y: number;
    width: number;
    height: number;
    rotation?: number;
    scale?: number;
    perspective?: boolean;
  };
}

export interface MockupResult {
  url: string;
  productType: string;
  width: number;
  height: number;
}

// Free base mockup templates (using high-quality placeholders)
const MOCKUP_TEMPLATES: Record<string, {
  baseImage: string;
  width: number;
  height: number;
  designArea: {
    x: number;
    y: number;
    width: number;
    height: number;
    rotation: number;
    perspective?: boolean;
  };
  shadows?: boolean;
}> = {
  'STANDARD_TEE': {
    baseImage: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=1200',
    width: 800,
    height: 1000,
    designArea: { x: 280, y: 350, width: 240, height: 320, rotation: 0 },
    shadows: true
  },
  'PREMIUM_TEE': {
    baseImage: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=1200',
    width: 800,
    height: 1000,
    designArea: { x: 280, y: 320, width: 240, height: 320, rotation: 0 },
    shadows: true
  },
  'HOODIE': {
    baseImage: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=1200',
    width: 900,
    height: 1100,
    designArea: { x: 300, y: 400, width: 300, height: 350, rotation: 0 },
    shadows: true
  },
  'MUG': {
    baseImage: 'https://images.unsplash.com/photo-1514228742587-6b1558fbed20?auto=format&fit=crop&q=80&w=1200',
    width: 600,
    height: 500,
    designArea: { x: 180, y: 150, width: 200, height: 220, rotation: 0, perspective: true },
    shadows: true
  },
  'PHONE_CASE': {
    baseImage: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=1200',
    width: 400,
    height: 800,
    designArea: { x: 80, y: 150, width: 240, height: 480, rotation: 0 },
    shadows: false
  },
  'TOTE_BAG': {
    baseImage: 'https://images.unsplash.com/photo-1597484662317-9bd773efdf58?auto=format&fit=crop&q=80&w=1200',
    width: 700,
    height: 800,
    designArea: { x: 200, y: 250, width: 300, height: 350, rotation: 0 },
    shadows: true
  },
  'POSTER': {
    baseImage: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=1200',
    width: 600,
    height: 800,
    designArea: { x: 50, y: 50, width: 500, height: 700, rotation: 0 },
    shadows: true
  },
  'STICKER': {
    baseImage: 'https://images.unsplash.com/photo-1572375927902-1c716d520298?auto=format&fit=crop&q=80&w=1200',
    width: 500,
    height: 500,
    designArea: { x: 100, y: 100, width: 300, height: 300, rotation: 0 },
    shadows: true
  },
  'HAT': {
    baseImage: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=1200',
    width: 800,
    height: 1000,
    designArea: { x: 300, y: 450, width: 200, height: 120, rotation: 0 },
    shadows: true
  }
};

export class CanvasMockupService {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.canvas = document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
    }
  }

  /**
   * Generate mockup by overlaying design onto product template
   */
  async generateMockup(options: MockupOptions): Promise<MockupResult> {
    const { designUrl, productType, designPosition } = options;

    console.log('🎨 Canvas Mockup:', { productType, designUrlLength: designUrl?.length });

    const template = MOCKUP_TEMPLATES[productType];

    if (!template) {
      console.warn('⚠️ No template for', productType, '- using STANDARD_TEE');
      return this.generateMockup({ ...options, productType: 'STANDARD_TEE' });
    }

    if (!this.canvas || !this.ctx) {
      throw new Error('Canvas not available');
    }

    // Set canvas size
    this.canvas.width = template.width;
    this.canvas.height = template.height;

    // Load images
    const [baseImage, designImage] = await Promise.all([
      this.loadImage(template.baseImage),
      this.loadImage(designUrl)
    ]);

    // Draw base background (filled with white)
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillRect(0, 0, template.width, template.height);

    // Calculate design position
    const pos = designPosition || template.designArea;

    // Apply rotation and draw design
    this.ctx.save();

    if (pos.rotation) {
      const centerX = pos.x + pos.width / 2;
      const centerY = pos.y + pos.height / 2;
      this.ctx.translate(centerX, centerY);
      this.ctx.rotate((pos.rotation * Math.PI) / 180);
      this.ctx.translate(-centerX, -centerY);
    }

    // Apply subtle perspective transform if needed
    if (pos.perspective) {
      this.applyPerspective(pos, designImage);
    } else {
      // Draw design with proper scaling
      this.ctx.drawImage(
        designImage,
        pos.x,
        pos.y,
        pos.width,
        pos.height
      );
    }

    this.ctx.restore();

    // Now overlay the product template with MULTIPLY blend mode
    // This captures the shadows, folds, and highlights from the photography
    this.ctx.globalCompositeOperation = 'multiply';
    this.ctx.drawImage(baseImage, 0, 0, template.width, template.height);
    this.ctx.globalCompositeOperation = 'source-over';

    // Add lighting effects
    this.addLightingEffects(template);

    // Convert to data URL
    const mockupUrl = this.canvas.toDataURL('image/jpeg', 0.92);

    console.log('✅ Canvas mockup generated:', { width: template.width, height: template.height });

    return {
      url: mockupUrl,
      productType,
      width: template.width,
      height: template.height
    };
  }

  /**
   * Load image from URL
   */
  private loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load image: ${src.substring(0, 50)}...`));
      img.src = src;
    });
  }

  /**
   * Apply perspective transformation for 3D effects (mugs, etc)
   */
  private applyPerspective(pos: any, img: HTMLImageElement): void {
    if (!this.ctx) return;

    // Simple perspective - draw with slight curve simulation
    const steps = 10;
    const sliceHeight = pos.height / steps;
    const curve = 0.05; // curve amount

    for (let i = 0; i < steps; i++) {
      const y = pos.y + i * sliceHeight;
      const offset = Math.sin((i / steps) * Math.PI) * pos.width * curve;

      const sourceY = (i / steps) * img.height;
      const sourceHeight = img.height / steps;

      this.ctx.drawImage(
        img,
        0, sourceY, img.width, sourceHeight,
        pos.x + offset, y, pos.width - offset * 2, sliceHeight + 1
      );
    }
  }

  /**
   * Add lighting and material effects
   */
  private addLightingEffects(template: any): void {
    if (!this.ctx) return;

    // Add subtle vignette
    const gradient = this.ctx.createRadialGradient(
      template.width / 2, template.height / 2, template.width * 0.3,
      template.width / 2, template.height / 2, template.width * 0.8
    );
    gradient.addColorStop(0, 'rgba(0,0,0,0)');
    gradient.addColorStop(1, 'rgba(0,0,0,0.05)');

    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, template.width, template.height);

    // Add fabric texture overlay (subtle)
    this.ctx.globalCompositeOperation = 'overlay';
    this.ctx.fillStyle = 'rgba(128, 128, 128, 0.03)';
    this.ctx.fillRect(0, 0, template.width, template.height);
    this.ctx.globalCompositeOperation = 'source-over';
  }

  /**
   * Batch generate mockups for multiple products
   */
  async generateMultipleMockups(
    designUrl: string,
    productTypes: string[]
  ): Promise<MockupResult[]> {
    const results: MockupResult[] = [];

    for (const productType of productTypes) {
      try {
        const mockup = await this.generateMockup({ designUrl, productType });
        results.push(mockup);
      } catch (error) {
        console.warn(`Failed to generate ${productType}:`, error);
      }
    }

    return results;
  }

  /**
   * Generate all available mockups for a design
   */
  async generateAllMockups(designUrl: string): Promise<Record<string, MockupResult>> {
    const results: Record<string, MockupResult> = {};
    const types = Object.keys(MOCKUP_TEMPLATES);

    for (const productType of types) {
      try {
        const mockup = await this.generateMockup({ designUrl, productType });
        results[productType] = mockup;
      } catch (error) {
        console.warn(`Failed to generate ${productType}:`, error);
      }
    }

    return results;
  }
}

// Export singleton instance
export const canvasMockupService = new CanvasMockupService();
