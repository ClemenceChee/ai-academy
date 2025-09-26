# B____ AI Academy - Deployment Guide

This guide provides comprehensive instructions for deploying the B____ AI Academy platform using Docker.

## 🚀 Quick Start

### Prerequisites
- Docker (version 20.10 or higher)
- Docker Compose (version 2.0 or higher)
- Git (for cloning the repository)

### 1. Clone and Setup
```bash
# Clone the repository
git clone <repository-url>
cd b____-ai-academy

# Verify all files are present
ls -la
```

### 2. Build and Run with Docker Compose
```bash
# Build and start the application
docker-compose up -d

# View logs
docker-compose logs -f

# Check status
docker-compose ps
```

### 3. Access the Application
- **Local Development**: http://localhost:3000
- **Health Check**: http://localhost:3000/health

## 🐳 Docker Commands

### Basic Operations
```bash
# Build the image
docker build -t b____-ai-academy .

# Run the container
docker run -d -p 3000:80 --name b____-ai-academy b____-ai-academy

# Stop the container
docker stop b____-ai-academy

# Remove the container
docker rm b____-ai-academy
```

### Development Mode
```bash
# Run with live reload (development)
docker-compose -f docker-compose.dev.yml up

# Build without cache
docker-compose build --no-cache

# Rebuild and restart
docker-compose up --build
```

## 🔧 Configuration Options

### Environment Variables
Create a `.env` file in the root directory:
```env
# Application settings
NODE_ENV=production
PORT=3000

# Optional: Custom branding
REACT_APP_COMPANY_NAME=B____
REACT_APP_THEME_COLOR=#FF6B35
```

### Custom Port Mapping
```bash
# Run on different port
docker run -d -p 8080:80 b____-ai-academy

# Or modify docker-compose.yml
ports:
  - "8080:80"
```

## 🌐 Production Deployment

### Option 1: Simple Production Setup
```bash
# Use production profile
docker-compose --profile production up -d
```

### Option 2: Cloud Deployment

#### AWS ECS
```bash
# Build for AWS
docker build -t your-account.dkr.ecr.region.amazonaws.com/b____-ai-academy .

# Push to ECR
docker push your-account.dkr.ecr.region.amazonaws.com/b____-ai-academy
```

#### Google Cloud Run
```bash
# Build for GCP
docker build -t gcr.io/your-project/b____-ai-academy .

# Push to GCR
docker push gcr.io/your-project/b____-ai-academy

# Deploy to Cloud Run
gcloud run deploy b____-ai-academy \
  --image gcr.io/your-project/b____-ai-academy \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

#### Azure Container Instances
```bash
# Build for Azure
docker build -t your-registry.azurecr.io/b____-ai-academy .

# Push to ACR
docker push your-registry.azurecr.io/b____-ai-academy
```

### Option 3: Kubernetes Deployment
```yaml
# k8s-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: b____-ai-academy
spec:
  replicas: 3
  selector:
    matchLabels:
      app: b____-ai-academy
  template:
    metadata:
      labels:
        app: b____-ai-academy
    spec:
      containers:
      - name: b____-ai-academy
        image: b____-ai-academy:latest
        ports:
        - containerPort: 80
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "200m"
---
apiVersion: v1
kind: Service
metadata:
  name: b____-ai-academy-service
spec:
  selector:
    app: b____-ai-academy
  ports:
  - port: 80
    targetPort: 80
  type: LoadBalancer
```

## 🔒 Security Considerations

### SSL/TLS Setup
```bash
# Generate self-signed certificate (development only)
mkdir ssl
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout ssl/private.key -out ssl/certificate.crt

# For production, use Let's Encrypt or your certificate provider
```

### Security Headers
The nginx configuration includes security headers:
- X-Frame-Options
- X-Content-Type-Options
- X-XSS-Protection
- Referrer-Policy

### Network Security
```bash
# Create custom network
docker network create babbel-secure-network

# Run with custom network
docker run -d --network babbel-secure-network b____-ai-academy
```

## 📊 Monitoring and Logging

### Health Checks
```bash
# Check application health
curl http://localhost:3000/health

# Docker health check
docker inspect --format='{{.State.Health.Status}}' b____-ai-academy
```

### Logging
```bash
# View application logs
docker-compose logs b____-ai-academy

# Follow logs in real-time
docker-compose logs -f b____-ai-academy

# Export logs
docker-compose logs b____-ai-academy > app.log
```

### Performance Monitoring
```bash
# Container resource usage
docker stats b____-ai-academy

# Detailed container info
docker inspect b____-ai-academy
```

## 🛠️ Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>

# Or use different port
docker run -d -p 3001:80 b____-ai-academy
```

#### Build Failures
```bash
# Clean Docker cache
docker system prune -a

# Rebuild without cache
docker build --no-cache -t b____-ai-academy .
```

#### Container Won't Start
```bash
# Check logs
docker logs b____-ai-academy

# Run interactively for debugging
docker run -it --entrypoint /bin/sh b____-ai-academy
```

### Performance Optimization

#### Multi-stage Build Optimization
```dockerfile
# Use specific Node version
FROM node:18.17-alpine as build

# Use npm ci for faster installs
RUN npm ci --only=production --silent

# Optimize nginx
FROM nginx:1.25-alpine
```

#### Resource Limits
```yaml
# docker-compose.yml
services:
  b____-ai-academy:
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
```

## 📋 Maintenance

### Updates
```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose up --build -d

# Clean old images
docker image prune -a
```

### Backup
```bash
# Export container
docker export b____-ai-academy > b____-backup.tar

# Save image
docker save b____-ai-academy > b____-image.tar
```

### Scaling
```bash
# Scale with docker-compose
docker-compose up --scale b____-ai-academy=3

# Or use Docker Swarm
docker service create --replicas 3 --name b____-ai-academy-service b____-ai-academy
```

## 🆘 Support

### Getting Help
- Check logs: `docker-compose logs`
- Verify health: `curl http://localhost:3000/health`
- Review configuration files
- Check Docker and system resources

### Useful Commands
```bash
# Complete cleanup
docker-compose down -v --rmi all

# Reset everything
docker system prune -a --volumes

# Check disk usage
docker system df
```

## 📝 File Structure
```
b____-ai-academy/
├── Dockerfile              # Main container definition
├── docker-compose.yml      # Multi-container orchestration
├── nginx.conf              # Web server configuration
├── .dockerignore           # Build optimization
├── DEPLOYMENT.md           # This file
├── package.json            # Node.js dependencies
├── src/                    # Application source code
├── public/                 # Static assets
└── dist/                   # Built application (generated)
```

This deployment setup provides a production-ready, scalable solution for hosting the B____ AI Academy platform.
