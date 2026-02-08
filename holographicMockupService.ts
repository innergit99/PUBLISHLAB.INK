/**
 * Holographic Product Mockup System
 * Pure Canvas-based product generation with 3D effects
 * Zero external dependencies - all products drawn programmatically
 */

export interface HolographicMockupOptions {
  designUrl: string;
  productType: string;
  color?: string;
  style?: 'realistic' | 'minimal' | '3d';
}

export interface HolographicResult {
  url: string;
  productType: string;
  width: number;
  height: number;
}

// Product shape definitions - pure vector data
const PRODUCT_SHAPES = {
  'STANDARD_TEE': {
    width: 800,
    height: 1000,
    draw: (ctx: CanvasRenderingContext2D, color: string) => {
      // T-shirt silhouette
      ctx.fillStyle = color;
      ctx.beginPath();
      // Body
      ctx.moveTo(200, 200);
      ctx.lineTo(250, 150);
      ctx.lineTo(300, 150);
      ctx.lineTo(350, 150);
      ctx.lineTo(400, 200);
      ctx.lineTo(600, 200);
      ctx.lineTo(650, 150);
      ctx.lineTo(550, 150);
      ctx.lineTo(500, 100);
      ctx.lineTo(300, 100);
      ctx.lineTo(250, 150);
      ctx.lineTo(150, 150);
      ctx.lineTo(200, 200);
      // Torso
      ctx.lineTo(200, 800);
      ctx.lineTo(600, 800);
      ctx.lineTo(600, 200);
      ctx.closePath();
      ctx.fill();
      
      // Sleeves
      ctx.beginPath();
      ctx.moveTo(200, 200);
      ctx.lineTo(100, 250);
      ctx.lineTo(50, 400);
      ctx.lineTo(100, 450);
      ctx.lineTo(200, 400);
      ctx.closePath();
      ctx.fill();
      
      ctx.beginPath();
      ctx.moveTo(600, 200);
      ctx.lineTo(700, 250);
      ctx.lineTo(750, 400);
      ctx.lineTo(700, 450);
      ctx.lineTo(600, 400);
      ctx.closePath();
      ctx.fill();
    },
    designArea: { x: 250, y: 300, width: 300, height: 400 }
  },
  
  'HOODIE': {
    width: 900,
    height: 1100,
    draw: (ctx: CanvasRenderingContext2D, color: string) => {
      // Hoodie shape with hood
      ctx.fillStyle = color;
      ctx.beginPath();
      // Hood
      ctx.moveTo(300, 150);
      ctx.quadraticCurveTo(450, 100, 600, 150);
      ctx.lineTo(600, 250);
      ctx.lineTo(300, 250);
      ctx.closePath();
      ctx.fill();
      
      // Body
      ctx.beginPath();
      ctx.moveTo(300, 250);
      ctx.lineTo(150, 300);
      ctx.lineTo(150, 900);
      ctx.lineTo(750, 900);
      ctx.lineTo(750, 300);
      ctx.lineTo(600, 250);
      ctx.closePath();
      ctx.fill();
      
      // Pockets
      ctx.beginPath();
      ctx.rect(350, 500, 200, 150);
      ctx.fill();
    },
    designArea: { x: 280, y: 350, width: 340, height: 400 }
  },
  
  'MUG': {
    width: 600,
    height: 500,
    draw: (ctx: CanvasRenderingContext2D, color: string) => {
      // 3D mug shape
      ctx.fillStyle = color;
      ctx.beginPath();
      // Front face
      ctx.moveTo(150, 150);
      ctx.lineTo(450, 150);
      ctx.lineTo(450, 400);
      ctx.lineTo(150, 400);
      ctx.closePath();
      ctx.fill();
      
      // Top ellipse
      ctx.beginPath();
      ctx.ellipse(300, 150, 150, 30, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Handle
      ctx.beginPath();
      ctx.arc(450, 275, 50, -Math.PI/2, Math.PI/2, false);
      ctx.lineWidth = 20;
      ctx.strokeStyle = color;
      ctx.stroke();
    },
    designArea: { x: 150, y: 100, width: 300, height: 300 }
  },
  
  'PHONE_CASE': {
    width: 400,
    height: 800,
    draw: (ctx: CanvasRenderingContext2D, color: string) => {
      // Phone case with 3D effect
      ctx.fillStyle = color;
      ctx.beginPath();
      // Front
      ctx.roundRect(50, 100, 300, 600, 20);
      ctx.fill();
      
      // Side (3D effect)
      ctx.fillStyle = shadeColor(color, -20);
      ctx.beginPath();
      ctx.moveTo(350, 100);
      ctx.lineTo(380, 80);
      ctx.lineTo(380, 680);
      ctx.lineTo(350, 700);
      ctx.closePath();
      ctx.fill();
      
      // Camera notch
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.roundRect(180, 120, 40, 10, 5);
      ctx.fill();
    },
    designArea: { x: 50, y: 100, width: 300, height: 600 }
  },
  
  'TOTE_BAG': {
    width: 700,
    height: 800,
    draw: (ctx: CanvasRenderingContext2D, color: string) => {
      // Tote bag shape
      ctx.fillStyle = color;
      ctx.beginPath();
      // Bag body
      ctx.moveTo(150, 300);
      ctx.lineTo(100, 700);
      ctx.lineTo(600, 700);
      ctx.lineTo(550, 300);
      ctx.closePath();
      ctx.fill();
      
      // Handles
      ctx.lineWidth = 15;
      ctx.strokeStyle = color;
      ctx.beginPath();
      ctx.arc(250, 300, 50, Math.PI, 0, false);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(450, 300, 50, Math.PI, 0, false);
      ctx.stroke();
    },
    designArea: { x: 175, y: 200, width: 350, height: 400 }
  }
};

export class HolographicMockupService {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.canvas = document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
    }
  }

  /**
   * Generate holographic mockup with 3D effects
   */
  async generateMockup(options: HolographicMockupOptions): Promise<HolographicResult> {
    const { designUrl, productType, color = '#ffffff', style = 'realistic' } = options;

    console.log('🌟 Holographic Mockup:', { productType, color, style });

    const product = PRODUCT_SHAPES[productType];
    
    if (!product) {
      console.warn('⚠️ No holographic template for', productType, '- using STANDARD_TEE');
      return this.generateMockup({ ...options, productType: 'STANDARD_TEE' });
    }

    if (!this.canvas || !this.ctx) {
      throw new Error('Canvas not available');
    }

    // Set canvas size
    this.canvas.width = product.width;
    this.canvas.height = product.height;

    // Clear canvas
    this.ctx.clearRect(0, 0, product.width, product.height);

    // Draw background gradient
    this.drawBackground(product.width, product.height);

    // Draw product shape
    product.draw(this.ctx, color);

    // Apply 3D effects based on style
    if (style === '3d' || style === 'realistic') {
      this.apply3DEffects(product);
    }

    // Load and overlay design
    const designImage = await this.loadImage(designUrl);
    this.overlayDesign(designImage, product.designArea, style);

    // Add final effects
    this.addFinalEffects(product, style);

    // Convert to data URL
    const mockupUrl = this.canvas.toDataURL('image/jpeg', 0.95);

    console.log('✨ Holographic mockup generated:', { width: product.width, height: product.height });

    return {
      url: mockupUrl,
      productType,
      width: product.width,
      height: product.height
    };
  }

  /**
   * Draw gradient background
   */
  private drawBackground(width: number, height: number): void {
    if (!this.ctx) return;
    
    const gradient = this.ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#f8f9fa');
    gradient.addColorStop(1, '#e9ecef');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, width, height);
  }

  /**
   * Apply 3D lighting effects
   */
  private apply3DEffects(product: any): void {
    if (!this.ctx) return;
    
    // Add shadow
    this.ctx.save();
    this.ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
    this.ctx.shadowBlur = 30;
    this.ctx.shadowOffsetX = 10;
    this.ctx.shadowOffsetY = 10;
    
    // Redraw product with shadow
    product.draw(this.ctx, '#ffffff');
    this.ctx.restore();
    
    // Add highlight
    const highlight = this.ctx.createLinearGradient(0, 0, product.width, product.height);
    highlight.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
    highlight.addColorStop(0.5, 'rgba(255, 255, 255, 0.1)');
    highlight.addColorStop(1, 'rgba(0, 0, 0, 0.1)');
    
    this.ctx.fillStyle = highlight;
    this.ctx.fillRect(0, 0, product.width, product.height);
  }

  /**
   * Overlay design with perspective
   */
  private overlayDesign(designImage: HTMLImageElement, designArea: any, style: string): void {
    if (!this.ctx) return;
    
    this.ctx.save();
    
    if (style === '3d') {
      // Apply perspective transform
      const centerX = designArea.x + designArea.width / 2;
      const centerY = designArea.y + designArea.height / 2;
      
      this.ctx.translate(centerX, centerY);
      this.ctx.transform(1, 0, -0.1, 1, 0, 0); // Skew for 3D effect
      this.ctx.translate(-centerX, -centerY);
    }
    
    // Add subtle shadow to design
    this.ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
    this.ctx.shadowBlur = 10;
    this.ctx.shadowOffsetX = 3;
    this.ctx.shadowOffsetY = 3;
    
    // Draw design
    this.ctx.drawImage(
      designImage,
      designArea.x,
      designArea.y,
      designArea.width,
      designArea.height
    );
    
    this.ctx.restore();
  }

  /**
   * Add final lighting and texture effects
   */
  private addFinalEffects(product: any, style: string): void {
    if (!this.ctx) return;
    
    // Add vignette
    const vignette = this.ctx.createRadialGradient(
      product.width / 2, product.height / 2, product.width * 0.3,
      product.width / 2, product.height / 2, product.width * 0.8
    );
    vignette.addColorStop(0, 'rgba(0,0,0,0)');
    vignette.addColorStop(1, 'rgba(0,0,0,0.1)');
    
    this.ctx.fillStyle = vignette;
    this.ctx.fillRect(0, 0, product.width, product.height);
    
    if (style === 'realistic') {
      // Add texture overlay
      this.ctx.globalCompositeOperation = 'overlay';
      this.ctx.fillStyle = 'rgba(128, 128, 128, 0.05)';
      this.ctx.fillRect(0, 0, product.width, product.height);
      this.ctx.globalCompositeOperation = 'source-over';
    }
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
   * Generate all product mockups
   */
  async generateAllMockups(designUrl: string, color = '#ffffff'): Promise<Record<string, HolographicResult>> {
    const results: Record<string, HolographicResult> = {};
    const types = Object.keys(PRODUCT_SHAPES);

    for (const productType of types) {
      try {
        const mockup = await this.generateMockup({ designUrl, productType, color });
        results[productType] = mockup;
      } catch (error) {
        console.warn(`Failed to generate ${productType}:`, error);
      }
    }

    return results;
  }
}

// Helper function to shade colors
function shadeColor(color: string, percent: number): string {
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

// Export singleton instance
export const holographicMockupService = new HolographicMockupService();
