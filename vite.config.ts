import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
      hmr: {
        host: 'localhost',
        port: 3000,
        protocol: 'ws'
      },
      proxy: {
        '/api/ollama': {
          target: 'http://localhost:11434',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/ollama/, ''),
        },
        '/api/pollinations': {
          target: 'https://pollinations.ai',
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/api\/pollinations/, ''),
        },
        '/api/pollinations-api': {
          target: 'https://api.pollinations.ai',
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/api\/pollinations-api/, ''),
          configure: (proxy, options) => {
            proxy.on('proxyReq', (proxyReq, req, res, options) => {
              proxyReq.setHeader('Origin', 'https://api.pollinations.ai');
              proxyReq.setHeader('Access-Control-Request-Method', 'POST');
              proxyReq.setHeader('Access-Control-Request-Headers', 'authorization,content-type');
            });
            proxy.on('proxyRes', (proxyRes, req, res) => {
              proxyRes.headers['Access-Control-Allow-Origin'] = '*';
              proxyRes.headers['Access-Control-Allow-Methods'] = 'GET,POST,PUT,DELETE,OPTIONS';
              proxyRes.headers['Access-Control-Allow-Headers'] = 'authorization,content-type';
            });
          }
        },
      },
    },
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.HF_API_TOKEN': JSON.stringify(env.HF_API_TOKEN),
      'process.env.DEEPAI_API_KEY': JSON.stringify(env.DEEPAI_API_KEY),
      'process.env.POLLINATIONS_API_KEY': JSON.stringify(env.POLLINATIONS_API_KEY)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
