
import { SEOMetadata, ToolType, TrendingNiche, KDPProject, KDPBlueprint } from "./types";

const OLLAMA_URL = "http://localhost:11434/api/generate";
const IMAGE_ENGINE_URL = "https://image.pollinations.ai/prompt/";

export class LocalService {
  private async queryOllama(prompt: string, format?: string): Promise<string> {
    try {
      const response = await fetch(OLLAMA_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: "mistral:latest", // Defaulting to Mistral for quality
          prompt: prompt,
          stream: false,
          format: format // "json" if needed
        })
      });
      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error("Ollama connection failed. Is it running?", error);
      throw new Error("Local Engine Offline. Please start Ollama.");
    }
  }

  private cleanAndRepairJSON(text: string): string {
    let cleaned = text.trim();
    if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```json\s*/, '').replace(/^```\s*/, '').replace(/\s*```$/, '');
    }
    return cleaned;
  }

  async testConnection(): Promise<{ success: boolean; message: string; tier: 'Free' | 'Paid' | 'Unknown' }> {
    try {
      await this.queryOllama("ping");
      return { success: true, message: "Local Engine (Ollama) is Online.", tier: 'Free' };
    } catch (e) {
      return { success: false, message: "Local Engine Offline.", tier: 'Unknown' };
    }
  }

  async suggestKDPTitles(genre: string, category: string): Promise<string[]> {
    const prompt = `Suggest 5 high-converting Amazon KDP bestseller titles for: "${genre}" and "${category}". Output ONLY a valid JSON array of strings. No intro, no outro.`;
    const res = await this.queryOllama(prompt, "json");
    try {
      return JSON.parse(this.cleanAndRepairJSON(res));
    } catch {
      return ["Local Title Idea 1", "Local Title Idea 2"];
    }
  }

  async generateKDPBlueprint(project: KDPProject): Promise<any> {
    const prompt = `Generate a detailed KDP PRINT-READY BLUEPRINT for ${project.title}. 
    CRITICAL: Generate EXACTLY ${project.chapterCount} chapters.
    Output MUST be a JSON object matching this schema:
    {
      "PROJECT_META": { "title_working": string, "suggestedAuthor": string, "interior_color": string },
      "BOOK_STRUCTURE": { "front_matter": { "copyright_page_text": string }, "end_matter": { "author_bio": string } },
      "INTERIOR_CONTENT": [{ "chapter": number, "title": string, "content": string, "visualPrompt": string }],
      "COVER_SPEC": { "front_prompt": string, "back_prompt": string },
      "BACK_COVER_SPEC": { "blurb_text": string, "hook_points": string[] },
      "KDP_METADATA": { "keyword_phrases": string[], "primary_category": string, "long_description": string },
      "QA_CHECKLIST": string[]
    }
    Output ONLY JSON. No explanation.`;
    
    const res = await this.queryOllama(prompt, "json");
    const parsed = JSON.parse(this.cleanAndRepairJSON(res));
    return { ...parsed, id: `kdp_${Date.now()}`, timestamp: Date.now() };
  }

  async expandChapterNarrative(project: any, chapterIndex: number): Promise<string> {
    const ch = project.INTERIOR_CONTENT[chapterIndex];
    const prompt = `Write a FULL UNABRIDGED MANUSCRIPT for Chapter ${ch.chapter}: "${ch.title}".
    CONTEXT: "${project.PROJECT_META.title_working}" (Genre: ${project.PROJECT_META.primary_genre}).
    Write minimum 1500 words. Start directly with the story. No meta-talk.`;
    return await this.queryOllama(prompt);
  }

  async generateImage(prompt: string, systemPrompt?: string, aspectRatio: string = "1:1", is4K: boolean = false, isBW: boolean = false): Promise<string> {
    // Pollinations.ai is free and high quality.
    const encodedPrompt = encodeURIComponent(`${prompt}, ${systemPrompt || ""}, high quality, 4k resolution ${isBW ? ", black and white ink drawing, white background" : ""}`);
    const url = `${IMAGE_ENGINE_URL}${encodedPrompt}?width=1024&height=1024&nologo=true&seed=${Date.now()}`;
    
    // We return the URL directly as it's a dynamic image source
    // In the browser, we can fetch it to get base64 if needed for consistency
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  }

  async enhancePrompt(basePrompt: string, styleLabel: string): Promise<string> {
    const prompt = `Enhance this design prompt for a professional POD artist: "${basePrompt}" (Style: ${styleLabel}). Keep it concise but descriptive. Output ONLY the enhanced prompt.`;
    return await this.queryOllama(prompt);
  }

  async generateSEOMetadata(prompt: string): Promise<SEOMetadata> {
    const res = await this.queryOllama(`Generate Amazon SEO JSON (title, description, story, tags) for: "${prompt}". Output ONLY JSON.`, "json");
    return JSON.parse(this.cleanAndRepairJSON(res));
  }

  async processTransparency(base64Image: string): Promise<string> {
    // Keep local canvas logic as it's already free and local
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width; canvas.height = img.height;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        const bg = { r: data[0], g: data[1], b: data[2] };
        for (let i = 0; i < data.length; i += 4) {
          const diff = Math.sqrt(Math.pow(data[i]-bg.r,2)+Math.pow(data[i+1]-bg.g,2)+Math.pow(data[i+2]-bg.b,2));
          if (diff < 60) data[i+3] = 0;
        }
        ctx.putImageData(imageData, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      };
      img.src = base64Image;
    });
  }

  async fetchTrends(): Promise<TrendingNiche[]> {
    // Since Google Search grounding is paid, we use the LLM's internal knowledge of viral niches
    // This maintains "flow" without external costs.
    const prompt = `Research and brainstorm 3 viral Amazon KDP/POD trends for 2026. 
    Output as JSON array: [{ "topic": string, "description": string, "tags": string[], "reason": string }]`;
    const res = await this.queryOllama(prompt, "json");
    const parsed = JSON.parse(this.cleanAndRepairJSON(res));
    return parsed.map((n: any) => ({ ...n, sources: [{ uri: "#", title: "Internal Market Knowledge" }] }));
  }
}

export const localService = new LocalService();
