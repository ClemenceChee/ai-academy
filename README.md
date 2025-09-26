# AI Academy - Internal AI Education Platform

![AI Academy](https://img.shields.io/badge/AI-Academy-orange?style=for-the-badge&logo=artificial-intelligence)
![Docker](https://img.shields.io/badge/Docker-Ready-blue?style=for-the-badge&logo=docker)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**AI Academy** is a comprehensive internal education platform designed to build AI literacy across all teams in your organization. It provides a modern, engaging learning experience with specialized tracks for leadership, product, development, and compliance.

This repository contains the complete source code and Docker deployment configuration for the AI Academy platform, making it easy for anyone to run, develop, and deploy the application.

---

## ✨ Key Features

- **🎓 Modern Learning Experience**: Engaging UI with interactive content and progress tracking
- **🎯 Specialized Learning Tracks**: Tailored content for different roles and expertise levels
- **📚 Comprehensive Course Library**: 6 courses covering AI strategy, product management, development, and compliance
- **📊 Analytics Dashboard**: Real-time insights into user engagement, course performance, and learning value
- **⚡ Dynamic Content Management**: Admin interface for real-time content updates without rebuilds
- **🐳 Dockerized Deployment**: Easy setup for local development and production environments
- **🎨 Professional Design**: Modern branding, responsive layout, and professional UI components
- **🔐 Authentication System**: Secure login with demo credentials for testing

## 🚀 Quick Start

Get the AI Academy platform up and running in minutes with Docker.

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) (20.10+)
- [Docker Compose](https://docs.docker.com/compose/install/) (2.0+)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ai-academy.git
cd ai-academy
```

### 2. Configure Environment

Copy the example environment file and customize it for your setup:

```bash
cp .env.example .env
# Edit .env file with your preferred settings
```

### 3. Run the Application

Use the deployment script to start the application in your desired mode:

**Development Mode (with hot reload):**
```bash
./scripts/deploy.sh dev
```

**Production Mode:**
```bash
./scripts/deploy.sh prod
```

**Full Production with Nginx:**
```bash
./scripts/deploy.sh full
```

### 4. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Admin Panel**: http://localhost:5000/admin.html

**Demo Credentials:**
- **Email**: `demo@company.com`
- **Password**: `demo123`

## 🔧 Deployment Script

The `scripts/deploy.sh` script provides a convenient way to manage the application lifecycle.

| Command | Description |
|---------|-------------|
| `dev` | Deploy in development mode (hot reload) |
| `prod` | Deploy in production mode (optimized builds) |
| `full` | Deploy with Nginx reverse proxy (full production) |
| `stop` | Stop all services |
| `logs [service]` | Show logs for all or specific services |
| `status` | Show service status and health checks |
| `help` | Show help message |

### Examples

```bash
# Start development environment
./scripts/deploy.sh dev

# Check service status
./scripts/deploy.sh status

# View logs for all services
./scripts/deploy.sh logs

# View logs for specific service
./scripts/deploy.sh logs frontend

# Stop all services
./scripts/deploy.sh stop
```

## 🏗️ Architecture

The AI Academy platform is built with a modern full-stack architecture:

- **Frontend**: React, Vite, Tailwind CSS, Recharts
- **Backend**: Flask, Python, SQLAlchemy
- **Database**: SQLite (default), PostgreSQL (optional)
- **Deployment**: Docker, Docker Compose, Nginx

### System Components

- **React Frontend**: User interface, authentication, analytics dashboard
- **Flask Backend**: RESTful API for course content, analytics, and admin functionality
- **Nginx Reverse Proxy**: Handles SSL, rate limiting, and serves static assets in production
- **Docker Compose**: Orchestrates the multi-container application

### Directory Structure

```
ai-academy/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── contexts/        # React contexts
│   │   └── hooks/           # Custom hooks
│   ├── Dockerfile           # Frontend container
│   └── package.json         # Dependencies
├── backend/                 # Flask API
│   ├── src/
│   │   ├── routes/         # API routes
│   │   ├── models/         # Data models
│   │   └── content/        # Course content
│   ├── Dockerfile          # Backend container
│   └── requirements.txt    # Python dependencies
├── nginx/                  # Nginx configuration
├── scripts/               # Deployment scripts
├── docker-compose.yml     # Production compose
├── docker-compose.dev.yml # Development compose
└── README.md             # This file
```

## 📚 Course Library

The platform includes 6 comprehensive courses:

1. **AI Strategy for Leadership** - Strategic AI implementation for executives
2. **GDPR Compliance for AI Systems** - Legal compliance and data protection
3. **AI Product Management** - Product strategy and AI integration
4. **Machine Learning for Developers** - Technical ML implementation
5. **Safe AI Usage Guidelines** - Ethical AI practices and safety
6. **MLOps and Production AI** - Deployment and operations

## 🎨 Design & Branding

The platform features a professional design with modern branding:

- **Color Scheme**: Orange theme for the frontend, blue for the admin backend
- **Typography**: Inter font for a clean, modern look
- **UI Components**: Cards, charts, navigation, forms, and interactive elements
- **Responsive Design**: Optimized for all screen sizes and devices

## 🔧 Development

### Local Development Setup

1. **Clone and Setup**
   ```bash
   git clone https://github.com/your-username/ai-academy.git
   cd ai-academy
   cp .env.example .env
   ```

2. **Start Development Environment**
   ```bash
   ./scripts/deploy.sh dev
   ```

3. **Access Development Servers**
   - Frontend: http://localhost:3000 (with hot reload)
   - Backend: http://localhost:5000 (with auto-restart)

### Making Changes

- **Frontend**: Edit files in `frontend/src/` - changes will hot reload
- **Backend**: Edit files in `backend/src/` - server will auto-restart
- **Content**: Modify course content in `backend/src/content/`

### Building for Production

```bash
# Build optimized containers
./scripts/deploy.sh prod

# Or build with Nginx reverse proxy
./scripts/deploy.sh full
```

## 🚀 Production Deployment

### Docker Compose (Recommended)

1. **Clone Repository**
   ```bash
   git clone https://github.com/your-username/ai-academy.git
   cd ai-academy
   ```

2. **Configure Environment**
   ```bash
   cp .env.example .env
   # Edit .env with production settings
   ```

3. **Deploy**
   ```bash
   ./scripts/deploy.sh full
   ```

### Manual Docker Build

```bash
# Build frontend
docker build -t ai-academy-frontend ./frontend

# Build backend
docker build -t ai-academy-backend ./backend

# Run with docker-compose
docker-compose up -d
```

### Environment Variables

Key environment variables for production:

```bash
# Application
APP_NAME=AI-Academy
NODE_ENV=production
FLASK_ENV=production

# URLs
REACT_APP_API_URL=https://your-api-domain.com
FRONTEND_URL=https://your-frontend-domain.com

# Security
SECRET_KEY=your-secret-key-here
JWT_SECRET=your-jwt-secret-here

# Database (optional)
DATABASE_URL=postgresql://user:pass@host:5432/ai_academy
```

## 🔐 Security

- **Authentication**: JWT-based authentication system
- **CORS**: Properly configured cross-origin resource sharing
- **Environment Variables**: Sensitive data stored in environment variables
- **Docker Security**: Non-root user containers and minimal attack surface
- **Nginx Security**: Security headers and rate limiting in production

## 📊 Analytics & Monitoring

The platform includes comprehensive analytics:

- **User Engagement**: Signup trends, active users, session duration
- **Course Performance**: Completion rates, popular courses, learning progress
- **System Metrics**: API response times, error rates, resource usage
- **Real-time Dashboard**: Interactive charts and visualizations

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the Repository**
2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make Your Changes**
4. **Test Your Changes**
   ```bash
   ./scripts/deploy.sh dev
   # Test your changes
   ```
5. **Commit and Push**
   ```bash
   git commit -m "Add your feature description"
   git push origin feature/your-feature-name
   ```
6. **Create a Pull Request**

### Development Guidelines

- Follow React best practices for frontend development
- Use Flask conventions for backend API development
- Write clear commit messages
- Test changes in development mode before submitting
- Update documentation for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern web technologies and best practices
- Designed for scalability and maintainability
- Created to democratize AI education in organizations

---

**Ready to transform your organization's AI literacy? Get started with AI Academy today!** 🚀

*This project was created with the help of Manus AI.*
