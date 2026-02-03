"""
Artisan AI - HuggingFace Gradio Space with ZeroGPU
Provides text and image generation for all Artisan AI tools
"""

import gradio as gr
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM
from diffusers import DiffusionPipeline
import spaces
import json
import base64
from io import BytesIO
from PIL import Image

# Model storage
text_model = None
text_tokenizer = None
image_model = None

def load_text_model():
    """Load Llama 3 8B Instruct model"""
    global text_model, text_tokenizer
    if text_model is None:
        print("🔄 Loading Llama 3.1 8B model...")
        model_name = "meta-llama/Llama-3.1-8B-Instruct"
        
        text_tokenizer = AutoTokenizer.from_pretrained(model_name)
        text_model = AutoModelForCausalLM.from_pretrained(
            model_name,
            torch_dtype=torch.float16,
            device_map="auto",
        )
        print("✅ Text model loaded!")
    return text_model, text_tokenizer

def load_image_model():
    """Load Stable Diffusion XL model"""
    global image_model
    if image_model is None:
        print("🔄 Loading Stable Diffusion XL model...")
        image_model = DiffusionPipeline.from_pretrained(
            "stabilityai/stable-diffusion-xl-base-1.0",
            torch_dtype=torch.float16,
            use_safetensors=True,
            variant="fp16"
        ).to("cuda")
        print("✅ Image model loaded!")
    return image_model

@spaces.GPU(duration=60)
def generate_text(prompt, max_tokens=2000, temperature=0.7):
    """Generate text using Llama 3 8B with ZeroGPU"""
    try:
        model, tokenizer = load_text_model()
        
        # Format prompt for Llama 3
        formatted_prompt = f"<|begin_of_text|><|start_header_id|>user<|end_header_id|>\n\n{prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n"
        
        # Tokenize
        inputs = tokenizer(formatted_prompt, return_tensors="pt").to(model.device)
        
        # Generate
        with torch.no_grad():
            outputs = model.generate(
                **inputs,
                max_new_tokens=max_tokens,
                temperature=temperature,
                top_p=0.9,
                do_sample=True,
                pad_token_id=tokenizer.eos_token_id
            )
        
        # Decode
        generated = tokenizer.decode(outputs[0], skip_special_tokens=True)
        
        # Remove prompt from output
        if formatted_prompt in generated:
            generated = generated.replace(formatted_prompt, "")
        
        return {
            "success": True,
            "text": generated.strip(),
            "model": "Llama-3.1-8B-Instruct"
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }

@spaces.GPU(duration=30)
def generate_image(prompt, negative_prompt="", width=1024, height=1024, steps=4):
    """Generate image using Stable Diffusion XL with ZeroGPU"""
    try:
        pipe = load_image_model()
        
        # Generate (SDXL supports negative_prompt)
        image = pipe(
            prompt=prompt,
            negative_prompt=negative_prompt if negative_prompt else None,
            width=width,
            height=height,
            num_inference_steps=max(steps, 20),  # SDXL needs at least 20 steps for quality
            guidance_scale=7.5
        ).images[0]
        
        # Convert to base64
        buffered = BytesIO()
        image.save(buffered, format="PNG")
        img_str = base64.b64encode(buffered.getvalue()).decode()
        
        return {
            "success": True,
            "image": f"data:image/png;base64,{img_str}",
            "model": "Stable-Diffusion-XL-1.0"
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }

# API-style functions for frontend integration
def api_text(request_json):
    """API endpoint for text generation"""
    try:
        data = json.loads(request_json) if isinstance(request_json, str) else request_json
        result = generate_text(
            data.get("prompt", ""),
            data.get("max_tokens", 2000),
            data.get("temperature", 0.7)
        )
        return json.dumps(result, indent=2)
    except Exception as e:
        return json.dumps({"success": False, "error": str(e)})

def api_image(request_json):
    """API endpoint for image generation"""
    try:
        data = json.loads(request_json) if isinstance(request_json, str) else request_json
        result = generate_image(
            data.get("prompt", ""),
            data.get("negative_prompt", ""),
            data.get("width", 1024),
            data.get("height", 1024),
            data.get("num_inference_steps", 4)
        )
        return json.dumps(result, indent=2)
    except Exception as e:
        return json.dumps({"success": False, "error": str(e)})

# Gradio Interface
with gr.Blocks(title="Artisan AI Creative Studio", theme=gr.themes.Soft()) as demo:
    gr.Markdown("""
    # 🎨 Artisan AI - Creative Studio Backend
    
    **Powered by Llama 3 8B + FLUX.1-schnell on ZeroGPU**
    
    This is the AI backend for Artisan AI. Use the API endpoints below for integration.
    """)
    
    with gr.Tab("📝 Text Generation API"):
        gr.Markdown("### Text Generation (Llama 3 8B)")
        
        with gr.Row():
            with gr.Column():
                text_input = gr.Textbox(
                    label="Request JSON",
                    placeholder='{"prompt": "Write a mystery story...", "max_tokens": 2000, "temperature": 0.7}',
                    lines=5
                )
                text_btn = gr.Button("Generate Text", variant="primary")
            
            with gr.Column():
                text_output = gr.JSON(label="Response")
        
        text_btn.click(api_text, inputs=[text_input], outputs=[text_output])
        
        gr.Markdown("""
        **Example Request:**
        ```json
        {
          "prompt": "Write one mystery book title",
          "max_tokens": 50,
          "temperature": 0.7
        }
        ```
        """)
    
    with gr.Tab("🎨 Image Generation API"):
        gr.Markdown("### Image Generation (FLUX.1-schnell)")
        
        with gr.Row():
            with gr.Column():
                image_input = gr.Textbox(
                    label="Request JSON",
                    placeholder='{"prompt": "Professional book cover...", "width": 1024, "height": 1024}',
                    lines=5
                )
                image_btn = gr.Button("Generate Image", variant="primary")
            
            with gr.Column():
                image_output = gr.JSON(label="Response (with base64 image)")
        
        image_btn.click(api_image, inputs=[image_input], outputs=[image_output])
        
        gr.Markdown("""
        **Example Request:**
        ```json
        {
          "prompt": "Professional mystery thriller book cover",
          "width": 1024,
          "height": 1024,
          "num_inference_steps": 4
        }
        ```
        """)
    
    with gr.Tab("ℹ️ API Documentation"):
        gr.Markdown("""
        ## API Endpoints
        
        ### Text Generation
        **POST** `/api/text` or use Gradio API
        
        Request:
        ```json
        {
          "prompt": "string",
          "max_tokens": 2000,
          "temperature": 0.7
        }
        ```
        
        Response:
        ```json
        {
          "success": true,
          "text": "generated text...",
          "model": "Llama-3-8B-Instruct"
        }
        ```
        
        ### Image Generation
        **POST** `/api/image` or use Gradio API
        
        Request:
        ```json
        {
          "prompt": "string",
          "negative_prompt": "string",
          "width": 1024,
          "height": 1024,
          "num_inference_steps": 4
        }
        ```
        
        Response:
        ```json
        {
          "success": true,
          "image": "data:image/png;base64,...",
          "model": "FLUX.1-schnell"
        }
        ```
        
        ## Integration with Artisan AI Frontend
        
        Use the Gradio API client to call these functions from your React app:
        
        ```javascript
        const response = await fetch(
          'https://YOUR-USER-artisan-ai.hf.space/api/text',
          {
            method: 'POST',
            body: JSON.stringify({
              prompt: "Write a story...",
              max_tokens: 2000
            })
          }
        );
        ```
        
        ## Performance
        
        - **Text Generation**: 5-15 seconds (varies by length)
        - **Image Generation**: 2-5 seconds
        - **Cold Start**: ~20-30 seconds (first request only)
        - **GPU Time**: 60s for text, 30s for images (ZeroGPU limits)
        
        ## Rate Limits
        
        Free tier ZeroGPU has generous limits for personal use.
        """)

# Launch
if __name__ == "__main__":
    demo.launch(server_name="0.0.0.0", server_port=7860)
