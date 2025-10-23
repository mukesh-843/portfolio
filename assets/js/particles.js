/*===== PARTICLE ANIMATION BACKGROUND =====*/
class ParticleBackground {
    constructor(containerId, options = {}) {
        this.canvas = document.getElementById(containerId);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.animationId = null;
        
        // Configuration
        this.config = {
            particleCount: options.particleCount || 80,
            particleSize: options.particleSize || 2,
            particleSpeed: options.particleSpeed || 0.5,
            connectionDistance: options.connectionDistance || 120,
            particleColor: options.particleColor || 'rgba(59, 130, 246, 0.6)',
            lineColor: options.lineColor || 'rgba(59, 130, 246, 0.2)',
            mouseRadius: options.mouseRadius || 150,
            enableMouseInteraction: options.enableMouseInteraction !== false,
            enableGravity: options.enableGravity || false,
            gravityStrength: options.gravityStrength || 0.001,
            bounceWalls: options.bounceWalls !== false
        };
        
        this.init();
    }
    
    init() {
        this.resize();
        this.createParticles();
        this.setupEventListeners();
        this.animate();
    }
    
    resize() {
        const rect = this.canvas.parentElement.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';
    }
    
    createParticles() {
        this.particles = [];
        
        for (let i = 0; i < this.config.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * this.config.particleSpeed,
                vy: (Math.random() - 0.5) * this.config.particleSpeed,
                size: Math.random() * this.config.particleSize + 1,
                opacity: Math.random() * 0.5 + 0.3,
                originalSize: 0,
                targetSize: 0
            });
        }
        
        // Set original sizes
        this.particles.forEach(particle => {
            particle.originalSize = particle.size;
            particle.targetSize = particle.size;
        });
    }
    
    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.resize();
            this.createParticles();
        });
        
        if (this.config.enableMouseInteraction) {
            this.canvas.addEventListener('mousemove', (e) => {
                const rect = this.canvas.getBoundingClientRect();
                this.mouse.x = e.clientX - rect.left;
                this.mouse.y = e.clientY - rect.top;
            });
            
            this.canvas.addEventListener('mouseleave', () => {
                this.mouse.x = -1000;
                this.mouse.y = -1000;
            });
        }
    }
    
    updateParticles() {
        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Apply gravity if enabled
            if (this.config.enableGravity) {
                particle.vy += this.config.gravityStrength;
            }
            
            // Bounce off walls
            if (this.config.bounceWalls) {
                if (particle.x <= 0 || particle.x >= this.canvas.width) {
                    particle.vx *= -1;
                    particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
                }
                if (particle.y <= 0 || particle.y >= this.canvas.height) {
                    particle.vy *= -1;
                    particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
                }
            } else {
                // Wrap around screen
                if (particle.x < 0) particle.x = this.canvas.width;
                if (particle.x > this.canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = this.canvas.height;
                if (particle.y > this.canvas.height) particle.y = 0;
            }
            
            // Mouse interaction
            if (this.config.enableMouseInteraction) {
                const dx = this.mouse.x - particle.x;
                const dy = this.mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.config.mouseRadius) {
                    // Repel particles from mouse
                    const force = (this.config.mouseRadius - distance) / this.config.mouseRadius;
                    const directionX = dx / distance;
                    const directionY = dy / distance;
                    
                    particle.vx -= directionX * force * 0.02;
                    particle.vy -= directionY * force * 0.02;
                    
                    // Increase particle size near mouse
                    particle.targetSize = particle.originalSize * (1 + force * 2);
                    particle.opacity = Math.min(1, particle.opacity + force * 0.3);
                } else {
                    // Return to original size
                    particle.targetSize = particle.originalSize;
                    particle.opacity = Math.max(0.3, particle.opacity - 0.01);
                }
                
                // Smooth size transition
                particle.size += (particle.targetSize - particle.size) * 0.1;
            }
            
            // Add slight random movement for organic feel
            particle.vx += (Math.random() - 0.5) * 0.001;
            particle.vy += (Math.random() - 0.5) * 0.001;
            
            // Limit velocity
            const maxVelocity = this.config.particleSpeed;
            const velocity = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
            if (velocity > maxVelocity) {
                particle.vx = (particle.vx / velocity) * maxVelocity;
                particle.vy = (particle.vy / velocity) * maxVelocity;
            }
        });
    }
    
    drawParticles() {
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = this.config.particleColor.replace(/[\d.]+\)$/, `${particle.opacity})`);
            this.ctx.fill();
            
            // Add glow effect
            this.ctx.shadowColor = this.config.particleColor;
            this.ctx.shadowBlur = particle.size * 2;
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
        });
    }
    
    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.config.connectionDistance) {
                    const opacity = (1 - distance / this.config.connectionDistance) * 0.5;
                    
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.strokeStyle = this.config.lineColor.replace(/[\d.]+\)$/, `${opacity})`);
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            }
        }
    }
    
    drawMouseConnections() {
        if (!this.config.enableMouseInteraction || this.mouse.x < 0) return;
        
        this.particles.forEach(particle => {
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < this.config.mouseRadius) {
                const opacity = (1 - distance / this.config.mouseRadius) * 0.6;
                
                this.ctx.beginPath();
                this.ctx.moveTo(particle.x, particle.y);
                this.ctx.lineTo(this.mouse.x, this.mouse.y);
                this.ctx.strokeStyle = `rgba(16, 185, 129, ${opacity})`;
                this.ctx.lineWidth = 2;
                this.ctx.stroke();
            }
        });
        
        // Draw mouse indicator
        this.ctx.beginPath();
        this.ctx.arc(this.mouse.x, this.mouse.y, 5, 0, Math.PI * 2);
        this.ctx.fillStyle = 'rgba(16, 185, 129, 0.3)';
        this.ctx.fill();
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.updateParticles();
        this.drawConnections();
        this.drawParticles();
        this.drawMouseConnections();
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        window.removeEventListener('resize', this.resize);
    }
    
    // Public methods to control the animation
    pause() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }
    
    resume() {
        if (!this.animationId) {
            this.animate();
        }
    }
    
    updateConfig(newConfig) {
        Object.assign(this.config, newConfig);
        this.createParticles();
    }
}

// Initialize particle backgrounds when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Hero section particles
    const heroParticles = new ParticleBackground('hero-particles', {
        particleCount: 60,
        particleSize: 1.5,
        particleSpeed: 0.3,
        connectionDistance: 100,
        particleColor: 'rgba(59, 130, 246, 0.4)',
        lineColor: 'rgba(59, 130, 246, 0.15)',
        mouseRadius: 120,
        enableMouseInteraction: true
    });
    
    // Skills section particles
    const skillsParticles = new ParticleBackground('skills-particles', {
        particleCount: 40,
        particleSize: 1,
        particleSpeed: 0.2,
        connectionDistance: 80,
        particleColor: 'rgba(16, 185, 129, 0.3)',
        lineColor: 'rgba(16, 185, 129, 0.1)',
        mouseRadius: 100,
        enableMouseInteraction: true
    });
    
    // Contact section particles
    const contactParticles = new ParticleBackground('contact-particles', {
        particleCount: 30,
        particleSize: 2,
        particleSpeed: 0.4,
        connectionDistance: 120,
        particleColor: 'rgba(239, 68, 68, 0.3)',
        lineColor: 'rgba(239, 68, 68, 0.1)',
        mouseRadius: 140,
        enableMouseInteraction: true,
        enableGravity: true,
        gravityStrength: 0.0005
    });
    
    // Pause animations when tab is not visible for performance
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            heroParticles.pause();
            skillsParticles.pause();
            contactParticles.pause();
        } else {
            heroParticles.resume();
            skillsParticles.resume();
            contactParticles.resume();
        }
    });
    
    // Intersection Observer to pause particles when not in view
    const particleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const canvas = entry.target;
            const canvasId = canvas.id;
            
            if (entry.isIntersecting) {
                // Resume animation when in view
                if (canvasId === 'hero-particles') heroParticles.resume();
                if (canvasId === 'skills-particles') skillsParticles.resume();
                if (canvasId === 'contact-particles') contactParticles.resume();
            } else {
                // Pause animation when out of view
                if (canvasId === 'hero-particles') heroParticles.pause();
                if (canvasId === 'skills-particles') skillsParticles.pause();
                if (canvasId === 'contact-particles') contactParticles.pause();
            }
        });
    });
    
    // Observe all particle canvases
    document.querySelectorAll('.particle-canvas').forEach(canvas => {
        particleObserver.observe(canvas);
    });
});