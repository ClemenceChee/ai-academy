#!/bin/bash

# B____ AI Academy Deployment Script
# This script provides automated deployment options for different environments

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="b____-ai-academy"
IMAGE_NAME="b____-ai-academy"
CONTAINER_NAME="b____-ai-academy"
PORT="3000"

# Functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

check_dependencies() {
    log_info "Checking dependencies..."
    
    if ! command -v docker &> /dev/null; then
        log_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        log_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
    
    log_success "All dependencies are installed."
}

build_image() {
    log_info "Building Docker image..."
    docker build -t $IMAGE_NAME .
    log_success "Docker image built successfully."
}

run_development() {
    log_info "Starting development environment..."
    docker-compose -f docker-compose.dev.yml up -d
    log_success "Development environment started on http://localhost:3000"
}

run_production() {
    log_info "Starting production environment..."
    docker-compose up -d
    log_success "Production environment started on http://localhost:$PORT"
}

stop_containers() {
    log_info "Stopping containers..."
    docker-compose down
    docker-compose -f docker-compose.dev.yml down 2>/dev/null || true
    log_success "Containers stopped."
}

clean_up() {
    log_info "Cleaning up Docker resources..."
    docker-compose down -v --rmi local 2>/dev/null || true
    docker system prune -f
    log_success "Cleanup completed."
}

deploy_kubernetes() {
    log_info "Deploying to Kubernetes..."
    
    if ! command -v kubectl &> /dev/null; then
        log_error "kubectl is not installed. Please install kubectl first."
        exit 1
    fi
    
    # Build and tag image for registry
    docker build -t $IMAGE_NAME:latest .
    
    # Apply Kubernetes manifests
    kubectl apply -f k8s-deployment.yaml
    
    log_success "Deployed to Kubernetes cluster."
}

show_logs() {
    log_info "Showing application logs..."
    docker-compose logs -f $APP_NAME
}

health_check() {
    log_info "Performing health check..."
    
    # Wait for container to start
    sleep 10
    
    if curl -f http://localhost:$PORT/health &> /dev/null; then
        log_success "Application is healthy!"
    else
        log_error "Health check failed. Check logs for details."
        docker-compose logs $APP_NAME
        exit 1
    fi
}

backup_data() {
    log_info "Creating backup..."
    
    timestamp=$(date +%Y%m%d_%H%M%S)
    backup_dir="backups/$timestamp"
    mkdir -p $backup_dir
    
    # Export container
    docker export $CONTAINER_NAME > $backup_dir/container_backup.tar
    
    # Save image
    docker save $IMAGE_NAME > $backup_dir/image_backup.tar
    
    log_success "Backup created in $backup_dir"
}

show_status() {
    log_info "Application Status:"
    echo "===================="
    
    # Check if containers are running
    if docker ps | grep -q $CONTAINER_NAME; then
        log_success "Container is running"
        echo "Container ID: $(docker ps --filter name=$CONTAINER_NAME --format '{{.ID}}')"
        echo "Status: $(docker ps --filter name=$CONTAINER_NAME --format '{{.Status}}')"
        echo "Ports: $(docker ps --filter name=$CONTAINER_NAME --format '{{.Ports}}')"
    else
        log_warning "Container is not running"
    fi
    
    # Check health endpoint
    if curl -f http://localhost:$PORT/health &> /dev/null; then
        log_success "Health check: PASSED"
    else
        log_warning "Health check: FAILED"
    fi
    
    # Show resource usage
    if docker ps | grep -q $CONTAINER_NAME; then
        echo ""
        log_info "Resource Usage:"
        docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}" $CONTAINER_NAME
    fi
}

update_application() {
    log_info "Updating application..."
    
    # Pull latest changes (if using git)
    if [ -d ".git" ]; then
        git pull origin main
    fi
    
    # Rebuild and restart
    docker-compose up --build -d
    
    # Health check
    health_check
    
    log_success "Application updated successfully."
}

show_help() {
    echo "B____ AI Academy Deployment Script"
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  build       Build Docker image"
    echo "  dev         Start development environment"
    echo "  prod        Start production environment"
    echo "  stop        Stop all containers"
    echo "  clean       Clean up Docker resources"
    echo "  k8s         Deploy to Kubernetes"
    echo "  logs        Show application logs"
    echo "  health      Perform health check"
    echo "  status      Show application status"
    echo "  backup      Create backup"
    echo "  update      Update and restart application"
    echo "  help        Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 dev      # Start development environment"
    echo "  $0 prod     # Start production environment"
    echo "  $0 status   # Check application status"
}

# Main script logic
case "${1:-help}" in
    "build")
        check_dependencies
        build_image
        ;;
    "dev")
        check_dependencies
        run_development
        health_check
        ;;
    "prod")
        check_dependencies
        build_image
        run_production
        health_check
        ;;
    "stop")
        stop_containers
        ;;
    "clean")
        stop_containers
        clean_up
        ;;
    "k8s")
        check_dependencies
        deploy_kubernetes
        ;;
    "logs")
        show_logs
        ;;
    "health")
        health_check
        ;;
    "status")
        show_status
        ;;
    "backup")
        backup_data
        ;;
    "update")
        update_application
        ;;
    "help"|*)
        show_help
        ;;
esac
