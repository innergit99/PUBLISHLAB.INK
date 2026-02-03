/**
 * Ollama Integration Test
 * Run this in browser console to test the connection
 */

import { GeminiService } from './geminiService';

export async function testOllamaIntegration() {
    console.log('🧪 Testing Ollama Integration...\n');

    const gemini = new GeminiService();

    // Test 1: Simple text generation
    console.log('Test 1: Simple text generation');
    try {
        const result = await gemini['queryOllamaFallback']('Write a single sentence about artificial intelligence.', false);
        console.log('✅ Result:', result.substring(0, 100) + '...');
    } catch (e: any) {
        console.error('❌ Failed:', e.message);
    }

    // Test 2: JSON mode
    console.log('\nTest 2: JSON array generation');
    try {
        const result = await gemini['queryOllamaFallback']('Generate a JSON array with 3 book titles. Output ONLY valid JSON.', true);
        console.log('✅ Result:', result);
        const parsed = JSON.parse(result);
        console.log('✅ Parsed successfully:', parsed);
    } catch (e: any) {
        console.error('❌ Failed:', e.message);
    }

    // Test 3: Chapter generation
    console.log('\nTest 3: Chapter content generation');
    try {
        const result = await gemini['queryOllamaFallback']('Write the first paragraph of Chapter 1 for a mystery novel.', false);
        console.log('✅ Result:', result.substring(0, 200) + '...');
    } catch (e: any) {
        console.error('❌ Failed:', e.message);
    }

    console.log('\n✅ Ollama integration test complete!');
}

// Auto-run test
if (typeof window !== 'undefined') {
    (window as any).testOllama = testOllamaIntegration;
    console.log('💡 Run testOllama() in console to test Ollama integration');
}
