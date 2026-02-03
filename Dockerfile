# Artisan AI - Multi-stage Docker build for HuggingFace Spaces

# Stage 1: Build frontend
FROM node:20-slim AS frontend-builder

WORKDIR /app/frontend

# Copy frontend files
COPY package*.json ./
COPY vite.config.ts tsconfig.json tsconfig.node.json ./
COPY index.html ./
COPY public ./public
COPY src ./src
COPY components ./components
COPY *.ts ./
COPY *.tsx ./

# Install dependencies and build
RUN npm ci
RUN npm run build

# Stage 2: Python backend
FROM python:3.10-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    wget \
    && rm -rf /var/lib/apt/lists/*

# Copy backend requirements and install
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/app.py ./

# Copy built frontend from stage 1
COPY --from=frontend-builder /app/frontend/dist ./static

# Expose port
EXPOSE 7860

# Set environment variables
ENV PORT=7860
ENV PYTHONUNBUFFERED=1

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD python -c "import requests; requests.get('http://localhost:7860/health')"

# Run the application
CMD ["python", "-u", "app.py"]
