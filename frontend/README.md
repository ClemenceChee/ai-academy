# 🎓 B____ AI Academy

A comprehensive internal AI education platform designed for B____ teams to learn and implement AI technologies effectively.

## 🚀 Quick Start with Docker

### Prerequisites
- Docker (20.10+)
- Docker Compose (2.0+)
- 4GB RAM minimum
- 2GB free disk space

### One-Command Deployment
```bash
# Clone and start production environment
git clone <repository-url>
cd b____-ai-academy
./deploy.sh prod
```

Access the application at: **http://localhost:3000**

## 📋 Available Commands

### Using the Deploy Script
```bash
# Development environment with hot reload
./deploy.sh dev

# Production environment
./deploy.sh prod

# Check application status
./deploy.sh status

# View logs
./deploy.sh logs

# Stop all containers
./deploy.sh stop

# Complete cleanup
./deploy.sh clean

# Deploy to Kubernetes
./deploy.sh k8s

# Create backup
./deploy.sh backup

# Update application
./deploy.sh update
```

### Manual Docker Commands
```bash
# Build and run with Docker Compose
docker-compose up -d

# Development mode with live reload
docker-compose -f docker-compose.dev.yml up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

## 🏗️ Architecture

### Container Structure
```
┌─────────────────────────────────────┐
│           Nginx (Alpine)            │
│         ┌─────────────────┐         │
│         │   React App     │         │
│         │   (Built)       │         │
│         └─────────────────┘         │
│              Port 80                │
└─────────────────────────────────────┘
                   │
              Port 3000 (Host)
```

### Multi-Stage Build Process
1. **Build Stage**: Node.js Alpine → Install deps → Build React app
2. **Production Stage**: Nginx Alpine → Copy built files → Configure server

## 🔧 Configuration

### Environment Variables
Create `.env` file:
```env
NODE_ENV=production
PORT=3000
REACT_APP_COMPANY_NAME=B____
REACT_APP_THEME_COLOR=#FF6B35
```

### Custom Port
```bash
# Run on port 8080
docker run -d -p 8080:80 b____-ai-academy
```

### SSL/HTTPS Setup
```bash
# Generate certificates (development)
mkdir ssl
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout ssl/private.key -out ssl/certificate.crt

# Use production profile with SSL
docker-compose --profile production up -d
```

## 🌐 Deployment Options

### 1. Local Development
```bash
./deploy.sh dev
# Features: Hot reload, development tools, debugging
```

### 2. Local Production
```bash
./deploy.sh prod
# Features: Optimized build, nginx, production settings
```

### 3. Cloud Deployment

#### AWS ECS
```bash
# Build and push to ECR
docker build -t your-account.dkr.ecr.region.amazonaws.com/b____-ai-academy .
docker push your-account.dkr.ecr.region.amazonaws.com/b____-ai-academy

# Deploy using ECS task definition
```

#### Google Cloud Run
```bash
# Build and deploy
gcloud builds submit --tag gcr.io/PROJECT-ID/b____-ai-academy
gcloud run deploy --image gcr.io/PROJECT-ID/b____-ai-academy --platform managed
```

#### Azure Container Instances
```bash
# Build and push to ACR
az acr build --registry myregistry --image b____-ai-academy .
az container create --resource-group myResourceGroup --name b____-ai-academy \
  --image myregistry.azurecr.io/b____-ai-academy
```

### 4. Kubernetes
```bash
# Deploy to K8s cluster
./deploy.sh k8s

# Or manually
kubectl apply -f k8s-deployment.yaml
```

## 📊 Monitoring & Health Checks

### Health Endpoint
```bash
curl http://localhost:3000/health
# Response: "healthy"
```

### Container Monitoring
```bash
# Resource usage
docker stats b____-ai-academy

# Application logs
docker logs -f b____-ai-academy

# Health status
docker inspect --format='{{.State.Health.Status}}' b____-ai-academy
```

### Performance Metrics
- **Build Time**: ~2-3 minutes
- **Container Size**: ~50MB (compressed)
- **Memory Usage**: ~128MB (typical)
- **Startup Time**: ~10 seconds

## 🔒 Security Features

### Container Security
- Non-root user execution
- Read-only root filesystem
- Dropped capabilities
- Security headers in nginx

### Network Security
- Custom Docker networks
- Rate limiting
- SSL/TLS encryption
- CORS configuration

### Security Headers
- X-Frame-Options: SAMEORIGIN
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Strict-Transport-Security (HTTPS)
- Content-Security-Policy

## 🛠️ Development

### Local Development Setup
```bash
# Start development environment
./deploy.sh dev

# The application will be available at:
# http://localhost:3000 (with hot reload)
```

### Making Changes
1. Edit source files in `src/`
2. Changes are automatically reflected (dev mode)
3. For production testing: `./deploy.sh prod`

### Adding Dependencies
```bash
# Add new npm package
docker-compose exec b____-ai-academy-dev npm install package-name

# Rebuild for production
./deploy.sh prod
```

## 📦 File Structure
```
b____-ai-academy/
├── 📁 src/                     # React application source
├── 📁 public/                  # Static assets and images
├── 📁 dist/                    # Built application (generated)
├── 🐳 Dockerfile              # Production container
├── 🐳 Dockerfile.dev           # Development container
├── 🐳 docker-compose.yml       # Production orchestration
├── 🐳 docker-compose.dev.yml   # Development orchestration
├── ⚙️ nginx.conf               # Web server configuration
├── ⚙️ proxy.conf               # Production proxy config
├── ☸️ k8s-deployment.yaml      # Kubernetes manifests
├── 🚀 deploy.sh                # Deployment automation script
├── 📋 DEPLOYMENT.md            # Detailed deployment guide
├── 🚫 .dockerignore            # Docker build optimization
└── 📖 README.md                # This file
```

## 🔧 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Find and kill process using port 3000
lsof -i :3000
kill -9 <PID>

# Or use different port
docker run -d -p 3001:80 b____-ai-academy
```

#### Build Failures
```bash
# Clean Docker cache
docker system prune -a

# Rebuild without cache
./deploy.sh clean
./deploy.sh build
```

#### Container Won't Start
```bash
# Check logs
./deploy.sh logs

# Check status
./deploy.sh status

# Debug interactively
docker run -it --entrypoint /bin/sh b____-ai-academy
```

#### Memory Issues
```bash
# Check Docker resources
docker system df

# Increase Docker memory limit in Docker Desktop
# Or add swap space on Linux
```

### Performance Optimization

#### Reduce Build Time
```bash
# Use .dockerignore to exclude unnecessary files
# Enable BuildKit for faster builds
export DOCKER_BUILDKIT=1
docker build -t b____-ai-academy .
```

#### Reduce Image Size
- Multi-stage builds (already implemented)
- Alpine Linux base images
- npm ci instead of npm install
- Remove development dependencies

## 📈 Scaling

### Horizontal Scaling
```bash
# Scale with Docker Compose
docker-compose up --scale b____-ai-academy=3

# Load balancer configuration needed for multiple instances
```

### Kubernetes Auto-scaling
```yaml
# HPA already configured in k8s-deployment.yaml
# Scales based on CPU/Memory usage
minReplicas: 2
maxReplicas: 10
```

## 🆘 Support

### Getting Help
1. Check logs: `./deploy.sh logs`
2. Verify health: `./deploy.sh health`
3. Check status: `./deploy.sh status`
4. Review configuration files
5. Consult DEPLOYMENT.md for detailed instructions

### Useful Resources
- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Reference](https://docs.docker.com/compose/)
- [Nginx Configuration](https://nginx.org/en/docs/)
- [React Deployment Guide](https://create-react-app.dev/docs/deployment/)

## 📝 License

Internal use only - B____ AI Academy Platform

---

**🎯 Ready to deploy?** Run `./deploy.sh prod` and start learning!
