
/**
 * Ollama Service - Local AI Fallback
 * Connects to local Ollama instance via Vite Proxy
 */

export const OLLAMA_MODELS = {
    LLAMA_3: 'llama3.2:3b', // Optimized for speed/quality balance
    TINY: 'tinyllama',     // Ultra-fast fallback
};

class OllamaService {
    private baseUrl = '/api/ollama/api'; // Proxied to http://localhost:11434/api
    private model = OLLAMA_MODELS.LLAMA_3;

    async checkConnection(): Promise<boolean> {
        try {
            const response = await fetch(`${this.baseUrl}/tags`);
            return response.ok;
        } catch (e) {
            console.warn('Ollama connection failed:', e);
            return false;
        }
    }

    async generateText(prompt: string, systemPrompt?: string): Promise<string> {
        try {
            const response = await fetch(`${this.baseUrl}/generate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: this.model,
                    prompt: prompt,
                    system: systemPrompt || "You are a helpful AI assistant.",
                    stream: false,
                    options: {
                        temperature: 0.7,
                        num_ctx: 4096
                    }
                })
            });

            if (!response.ok) {
                throw new Error(`Ollama API Error: ${response.statusText}`);
            }

            const data = await response.json();
            return data.response;
        } catch (error) {
            console.error('Ollama Generation Failed:', error);
            throw error;
        }
    }

    async chat(messages: { role: string; content: string }[]): Promise<string> {
        try {
            const response = await fetch(`${this.baseUrl}/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: this.model,
                    messages: messages,
                    stream: false
                })
            });

            if (!response.ok) {
                throw new Error(`Ollama Chat Error: ${response.statusText}`);
            }

            const data = await response.json();
            return data.message.content;
        } catch (error) {
            console.error('Ollama Chat Failed:', error);
            throw error;
        }
    }
}

export const ollama = new OllamaService();
