#!/bin/bash

# AI Academy - Docker Installation Script
# This script installs Docker and Docker Compose on various Linux distributions

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

# Function to detect OS
detect_os() {
    if [[ -f /etc/os-release ]]; then
        . /etc/os-release
        OS=$NAME
        VER=$VERSION_ID
    elif type lsb_release >/dev/null 2>&1; then
        OS=$(lsb_release -si)
        VER=$(lsb_release -sr)
    elif [[ -f /etc/redhat-release ]]; then
        OS="Red Hat Enterprise Linux"
        VER=$(cat /etc/redhat-release | sed s/.*release\ // | sed s/\ .*//)
    else
        OS=$(uname -s)
        VER=$(uname -r)
    fi
}

# Function to check if Docker is already installed
check_docker() {
    if command -v docker &> /dev/null; then
        DOCKER_VERSION=$(docker --version | cut -d' ' -f3 | cut -d',' -f1)
        print_warning "Docker is already installed (version $DOCKER_VERSION)"
        return 0
    else
        return 1
    fi
}

# Function to check if Docker Compose is already installed
check_docker_compose() {
    if command -v docker-compose &> /dev/null; then
        COMPOSE_VERSION=$(docker-compose --version | cut -d' ' -f3 | cut -d',' -f1)
        print_warning "Docker Compose is already installed (version $COMPOSE_VERSION)"
        return 0
    else
        return 1
    fi
}

# Function to install Docker on Ubuntu/Debian
install_docker_ubuntu() {
    print_status "Installing Docker on Ubuntu/Debian..."
    
    # Update package index
    sudo apt-get update
    
    # Install packages to allow apt to use a repository over HTTPS
    sudo apt-get install -y \
        apt-transport-https \
        ca-certificates \
        curl \
        gnupg \
        lsb-release
    
    # Add Docker's official GPG key
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
    
    # Set up the stable repository
    echo \
        "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
        $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    
    # Update package index again
    sudo apt-get update
    
    # Install Docker Engine
    sudo apt-get install -y docker-ce docker-ce-cli containerd.io
    
    print_success "Docker installed successfully!"
}

# Function to install Docker on CentOS/RHEL/Fedora
install_docker_centos() {
    print_status "Installing Docker on CentOS/RHEL/Fedora..."
    
    # Install required packages
    sudo yum install -y yum-utils
    
    # Set up the repository
    sudo yum-config-manager \
        --add-repo \
        https://download.docker.com/linux/centos/docker-ce.repo
    
    # Install Docker Engine
    sudo yum install -y docker-ce docker-ce-cli containerd.io
    
    print_success "Docker installed successfully!"
}

# Function to install Docker Compose
install_docker_compose() {
    print_status "Installing Docker Compose..."
    
    # Get the latest version of Docker Compose
    COMPOSE_VERSION=$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep 'tag_name' | cut -d\" -f4)
    
    # Download Docker Compose
    sudo curl -L "https://github.com/docker/compose/releases/download/${COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    
    # Make it executable
    sudo chmod +x /usr/local/bin/docker-compose
    
    # Create symlink for easier access
    sudo ln -sf /usr/local/bin/docker-compose /usr/bin/docker-compose
    
    print_success "Docker Compose installed successfully!"
}

# Function to configure Docker
configure_docker() {
    print_status "Configuring Docker..."
    
    # Start Docker service
    sudo systemctl start docker
    
    # Enable Docker to start on boot
    sudo systemctl enable docker
    
    # Add current user to docker group
    sudo usermod -aG docker $USER
    
    print_success "Docker configured successfully!"
    print_warning "Please log out and log back in for group changes to take effect."
}

# Function to verify installation
verify_installation() {
    print_status "Verifying Docker installation..."
    
    # Test Docker
    if sudo docker run hello-world &> /dev/null; then
        print_success "Docker is working correctly!"
    else
        print_error "Docker installation verification failed!"
        exit 1
    fi
    
    # Test Docker Compose
    if docker-compose --version &> /dev/null; then
        COMPOSE_VERSION=$(docker-compose --version | cut -d' ' -f3 | cut -d',' -f1)
        print_success "Docker Compose is working correctly! (version $COMPOSE_VERSION)"
    else
        print_error "Docker Compose installation verification failed!"
        exit 1
    fi
}

# Function to show post-installation instructions
show_instructions() {
    echo
    print_success "Docker and Docker Compose have been installed successfully!"
    echo
    echo -e "${BLUE}Next steps:${NC}"
    echo "1. Log out and log back in (or run 'newgrp docker')"
    echo "2. Navigate to your AI Academy project directory"
    echo "3. Run: ./scripts/deploy.sh dev"
    echo
    echo -e "${BLUE}Useful commands:${NC}"
    echo "  docker --version          # Check Docker version"
    echo "  docker-compose --version  # Check Docker Compose version"
    echo "  docker ps                 # List running containers"
    echo "  docker images             # List Docker images"
    echo
    echo -e "${BLUE}AI Academy deployment:${NC}"
    echo "  ./scripts/deploy.sh dev   # Start development environment"
    echo "  ./scripts/deploy.sh prod  # Start production environment"
    echo "  ./scripts/deploy.sh stop  # Stop all services"
    echo
}

# Main installation function
main() {
    echo -e "${BLUE}"
    echo "╔══════════════════════════════════════════════════════════════╗"
    echo "║                    AI Academy Docker Installer               ║"
    echo "║                                                              ║"
    echo "║  This script will install Docker and Docker Compose         ║"
    echo "║  on your system for running AI Academy platform.            ║"
    echo "╚══════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
    echo
    
    # Check if running as root
    if [[ $EUID -eq 0 ]]; then
        print_error "This script should not be run as root!"
        print_error "Please run as a regular user with sudo privileges."
        exit 1
    fi
    
    # Check if sudo is available
    if ! command -v sudo &> /dev/null; then
        print_error "sudo is required but not installed!"
        exit 1
    fi
    
    # Detect operating system
    detect_os
    print_status "Detected OS: $OS $VER"
    
    # Check existing installations
    DOCKER_INSTALLED=false
    COMPOSE_INSTALLED=false
    
    if check_docker; then
        DOCKER_INSTALLED=true
    fi
    
    if check_docker_compose; then
        COMPOSE_INSTALLED=true
    fi
    
    # Install Docker if not already installed
    if [[ "$DOCKER_INSTALLED" == false ]]; then
        case "$OS" in
            "Ubuntu"*|"Debian"*)
                install_docker_ubuntu
                ;;
            "CentOS"*|"Red Hat"*|"Fedora"*)
                install_docker_centos
                ;;
            *)
                print_error "Unsupported operating system: $OS"
                print_error "Please install Docker manually from https://docs.docker.com/get-docker/"
                exit 1
                ;;
        esac
        
        configure_docker
    fi
    
    # Install Docker Compose if not already installed
    if [[ "$COMPOSE_INSTALLED" == false ]]; then
        install_docker_compose
    fi
    
    # Verify installation
    verify_installation
    
    # Show post-installation instructions
    show_instructions
}

# Run main function
main "$@"
