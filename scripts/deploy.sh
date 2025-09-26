#!/bin/bash

# AI Academy Deployment Script
# This script helps deploy the platform in different environments

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if Docker is installed
check_docker() {
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
    
    print_success "Docker and Docker Compose are installed"
}

# Function to check if ports are available
check_ports() {
    local ports=("3000" "5000" "80")
    
    for port in "${ports[@]}"; do
        if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
            print_warning "Port $port is already in use. Please stop the service using this port or change the configuration."
        fi
    done
}

# Function to deploy development environment
deploy_dev() {
    print_status "Deploying AI Academy in development mode..."
    
    # Build and start development containers
    docker-compose -f docker-compose.dev.yml down --remove-orphans
    docker-compose -f docker-compose.dev.yml build --no-cache
    docker-compose -f docker-compose.dev.yml up -d
    
    print_success "Development environment deployed successfully!"
    print_status "Frontend: http://localhost:3000"
    print_status "Backend API: http://localhost:5000"
    print_status "Demo credentials: demo@company.com / demo123"
}

# Function to deploy production environment
deploy_prod() {
    print_status "Deploying AI Academy in production mode..."
    
    # Build and start production containers
    docker-compose down --remove-orphans
    docker-compose build --no-cache
    docker-compose up -d
    
    print_success "Production environment deployed successfully!"
    print_status "Application: http://localhost:3000"
    print_status "Backend API: http://localhost:5000"
    print_status "Demo credentials: demo@company.com / demo123"
}

# Function to deploy with nginx (full production)
deploy_full() {
    print_status "Deploying AI Academy with Nginx reverse proxy..."
    
    # Build and start all containers including nginx
    docker-compose --profile production down --remove-orphans
    docker-compose --profile production build --no-cache
    docker-compose --profile production up -d
    
    print_success "Full production environment deployed successfully!"
    print_status "Application: http://localhost"
    print_status "Demo credentials: demo@company.com / demo123"
}

# Function to stop all services
stop_services() {
    print_status "Stopping all AI Academy services..."
    
    docker-compose -f docker-compose.dev.yml down --remove-orphans 2>/dev/null || true
    docker-compose down --remove-orphans 2>/dev/null || true
    docker-compose --profile production down --remove-orphans 2>/dev/null || true
    
    print_success "All services stopped"
}

# Function to show logs
show_logs() {
    local service=${1:-""}
    
    if [ -z "$service" ]; then
        print_status "Showing logs for all services..."
        docker-compose logs -f
    else
        print_status "Showing logs for $service..."
        docker-compose logs -f "$service"
    fi
}

# Function to show status
show_status() {
    print_status "AI Academy Service Status:"
    echo
    docker-compose ps
    echo
    
    # Check if services are responding
    if curl -s http://localhost:3000/health >/dev/null 2>&1; then
        print_success "Frontend is healthy"
    else
        print_warning "Frontend is not responding"
    fi
    
    if curl -s http://localhost:5000/health >/dev/null 2>&1; then
        print_success "Backend is healthy"
    else
        print_warning "Backend is not responding"
    fi
}

# Main script logic
case "${1:-help}" in
    "dev")
        check_docker
        check_ports
        deploy_dev
        ;;
    "prod")
        check_docker
        check_ports
        deploy_prod
        ;;
    "full")
        check_docker
        check_ports
        deploy_full
        ;;
    "stop")
        stop_services
        ;;
    "logs")
        show_logs "$2"
        ;;
    "status")
        show_status
        ;;
    "help"|*)
        echo "AI Academy Deployment Script"
        echo
        echo "Usage: $0 [COMMAND]"
        echo
        echo "Commands:"
        echo "  dev     Deploy in development mode (hot reload enabled)"
        echo "  prod    Deploy in production mode (optimized builds)"
        echo "  full    Deploy with Nginx reverse proxy (full production)"
        echo "  stop    Stop all services"
        echo "  logs    Show logs for all services or specific service"
        echo "  status  Show service status and health checks"
        echo "  help    Show this help message"
        echo
        echo "Examples:"
        echo "  $0 dev                 # Start development environment"
        echo "  $0 prod                # Start production environment"
        echo "  $0 logs backend        # Show backend logs"
        echo "  $0 status              # Check service status"
        ;;
esac
