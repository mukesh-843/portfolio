/*===== PERFORMANCE OPTIMIZATION MANAGER =====*/
class PerformanceManager {
    constructor() {
        this.loadingStates = new Map();
        this.errorStates = new Map();
        this.observers = new Map();
        this.loadedScripts = new Set();
        this.performanceMetrics = {};
        
        this.init();
    }
    
    init() {
        this.setupLoadingIndicators();
        this.setupErrorHandling();
        this.setupLazyLoading();
        this.measurePerformance();
        this.optimizeImages();
        this.preloadCriticalResources();
    }
    
    // Loading States Management
    setLoading(componentId, isLoading) {
        this.loadingStates.set(componentId, isLoading);
        const element = document.getElementById(componentId);
        if (element) {
            if (isLoading) {
                element.classList.add('loading');
                this.showLoadingSpinner(element);
            } else {
                element.classList.remove('loading');
                this.hideLoadingSpinner(element);
            }
        }
    }
    
    showLoadingSpinner(element) {
        if (element.querySelector('.loading-spinner')) return;
        
        const spinner = document.createElement('div');
        spinner.className = 'loading-spinner';
        spinner.innerHTML = `
            <div class="spinner-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <p class="loading-text">Loading...</p>
        `;
        
        element.appendChild(spinner);
    }
    
    hideLoadingSpinner(element) {
        const spinner = element.querySelector('.loading-spinner');
        if (spinner) {
            spinner.remove();
        }
    }
    
    // Error Handling
    setupErrorHandling() {
        window.addEventListener('error', (event) => {
            console.error('Global error:', event.error);
            this.handleComponentError(event.target.id || 'unknown', event.error);
        });
        
        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled promise rejection:', event.reason);
            this.handleComponentError('promise', event.reason);
        });
    }
    
    handleComponentError(componentId, error) {
        this.errorStates.set(componentId, error);
        const element = document.getElementById(componentId);
        
        if (element) {
            element.classList.add('error');
            this.showErrorMessage(element, error);
        }
    }
    
    showErrorMessage(element, error) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <div class="error-icon">⚠️</div>
            <p class="error-text">Something went wrong. Please refresh the page.</p>
            <button class="retry-button" onclick="location.reload()">Retry</button>
        `;
        
        element.appendChild(errorDiv);
    }
    
    // Lazy Loading with Intersection Observer
    setupLazyLoading() {
        const lazyLoadOptions = {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        };
        
        this.observers.set('lazy', new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadComponent(entry.target);
                    this.observers.get('lazy').unobserve(entry.target);
                }
            });
        }, lazyLoadOptions));
        
        // Observe lazy load elements
        document.querySelectorAll('[data-lazy-load]').forEach(element => {
            this.observers.get('lazy').observe(element);
        });
    }
    
    loadComponent(element) {
        const componentType = element.getAttribute('data-lazy-load');
        const componentId = element.id;
        
        this.setLoading(componentId, true);
        
        try {
            switch (componentType) {
                case 'code-cube':
                    this.loadCodeCube(element);
                    break;
                case 'terminal':
                    this.loadTerminal(element);
                    break;
                case 'skills-radar':
                    this.loadSkillsRadar(element);
                    break;
                case 'particles':
                    this.loadParticles(element);
                    break;
                default:
                    console.warn('Unknown component type:', componentType);
            }
        } catch (error) {
            this.handleComponentError(componentId, error);
        }
    }
    
    // Component Loaders with Error Handling
    async loadCodeCube(element) {
        try {
            if (!window.THREE) {
                await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js');
            }
            
            if (typeof CodeCube !== 'undefined') {
                new CodeCube(element.id);
                this.setLoading(element.id, false);
            } else {
                throw new Error('CodeCube class not found');
            }
        } catch (error) {
            this.handleComponentError(element.id, error);
        }
    }
    
    async loadTerminal(element) {
        try {
            if (typeof InteractiveTerminal !== 'undefined') {
                new InteractiveTerminal(element.id);
                this.setLoading(element.id, false);
            } else {
                throw new Error('InteractiveTerminal class not found');
            }
        } catch (error) {
            this.handleComponentError(element.id, error);
        }
    }
    
    async loadSkillsRadar(element) {
        try {
            const skillsData = [
                { name: 'C# / .NET', level: 95, description: '3+ years of professional experience' },
                { name: 'JavaScript', level: 90, description: 'Advanced proficiency in modern JavaScript' },
                { name: 'React.js', level: 85, description: 'Building responsive user interfaces' },
                { name: 'SQL Server', level: 90, description: 'Database design and optimization' },
                { name: 'Azure Cloud', level: 80, description: 'Cloud deployment and services' },
                { name: 'Python', level: 75, description: 'Data analysis and automation' },
                { name: 'Docker', level: 70, description: 'Containerization and DevOps' },
                { name: 'Git/GitHub', level: 95, description: 'Version control and collaboration' }
            ];
            
            if (typeof SkillsRadarChart !== 'undefined') {
                new SkillsRadarChart(element.id, skillsData);
                this.setLoading(element.id, false);
            } else {
                throw new Error('SkillsRadarChart class not found');
            }
        } catch (error) {
            this.handleComponentError(element.id, error);
        }
    }
    
    async loadParticles(element) {
        try {
            const config = JSON.parse(element.getAttribute('data-particle-config') || '{}');
            
            if (typeof ParticleBackground !== 'undefined') {
                new ParticleBackground(element.id, config);
                this.setLoading(element.id, false);
            } else {
                throw new Error('ParticleBackground class not found');
            }
        } catch (error) {
            this.handleComponentError(element.id, error);
        }
    }
    
    // Script Loading with Caching
    loadScript(src) {
        return new Promise((resolve, reject) => {
            if (this.loadedScripts.has(src)) {
                resolve();
                return;
            }
            
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            script.defer = true;
            
            script.onload = () => {
                this.loadedScripts.add(src);
                resolve();
            };
            
            script.onerror = () => {
                reject(new Error(`Failed to load script: ${src}`));
            };
            
            document.head.appendChild(script);
        });
    }
    
    // Performance Monitoring
    measurePerformance() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    
                    this.performanceMetrics = {
                        loadTime: perfData.loadEventEnd - perfData.fetchStart,
                        domContentLoaded: perfData.domContentLoadedEventEnd - perfData.fetchStart,
                        firstByte: perfData.responseStart - perfData.fetchStart,
                        domComplete: perfData.domComplete - perfData.fetchStart
                    };
                    
                    this.reportPerformance();
                }, 0);
            });
        }
    }
    
    reportPerformance() {
        if (this.performanceMetrics.loadTime > 3000) {
            console.warn('Page load time is slow:', this.performanceMetrics.loadTime + 'ms');
        }
        
        // Add performance data to page for debugging
        const perfDiv = document.createElement('div');
        perfDiv.id = 'performance-debug';
        perfDiv.style.cssText = 'position:fixed;bottom:10px;right:10px;background:rgba(0,0,0,0.8);color:white;padding:10px;border-radius:5px;font-size:12px;z-index:10000;display:none;';
        perfDiv.innerHTML = `
            <strong>Performance Metrics:</strong><br>
            Load Time: ${Math.round(this.performanceMetrics.loadTime)}ms<br>
            DOM Ready: ${Math.round(this.performanceMetrics.domContentLoaded)}ms<br>
            First Byte: ${Math.round(this.performanceMetrics.firstByte)}ms
        `;
        document.body.appendChild(perfDiv);
        
        // Show performance debug on Ctrl+Shift+P
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'P') {
                perfDiv.style.display = perfDiv.style.display === 'none' ? 'block' : 'none';
            }
        });
    }
    
    // Image Optimization
    optimizeImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            img.classList.add('lazy');
            imageObserver.observe(img);
        });
    }
    
    // Preload Critical Resources
    preloadCriticalResources() {
        const criticalResources = [
            'assets/css/styles.css',
            'assets/js/main.js'
        ];
        
        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            link.as = resource.endsWith('.css') ? 'style' : 'script';
            document.head.appendChild(link);
        });
    }
    
    // Progressive Loading
    enableProgressiveLoading() {
        const components = [
            { id: 'code-cube-container', priority: 1 },
            { id: 'interactive-terminal', priority: 2 },
            { id: 'skills-radar-container', priority: 3 }
        ];
        
        components.sort((a, b) => a.priority - b.priority);
        
        let delay = 0;
        components.forEach(component => {
            setTimeout(() => {
                const element = document.getElementById(component.id);
                if (element && element.hasAttribute('data-lazy-load')) {
                    this.loadComponent(element);
                }
            }, delay);
            delay += 500; // Stagger loading by 500ms
        });
    }
    
    // Connection-aware loading
    setupAdaptiveLoading() {
        if ('connection' in navigator) {
            const connection = navigator.connection;
            const isSlow = connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g';
            
            if (isSlow) {
                // Disable heavy animations for slow connections
                document.body.classList.add('slow-connection');
                
                // Reduce particle count
                document.querySelectorAll('[data-particle-config]').forEach(element => {
                    const config = JSON.parse(element.getAttribute('data-particle-config') || '{}');
                    config.particleCount = Math.floor(config.particleCount / 2);
                    element.setAttribute('data-particle-config', JSON.stringify(config));
                });
            }
        }
    }
    
    // Public Methods
    retryComponent(componentId) {
        const element = document.getElementById(componentId);
        if (element) {
            element.classList.remove('error');
            const errorMessage = element.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
            this.loadComponent(element);
        }
    }
    
    getPerformanceMetrics() {
        return this.performanceMetrics;
    }
}

// Initialize Performance Manager
const performanceManager = new PerformanceManager();

// Global error recovery
window.addEventListener('load', () => {
    setTimeout(() => {
        performanceManager.enableProgressiveLoading();
        performanceManager.setupAdaptiveLoading();
    }, 1000);
});

// Export for global access
window.PerformanceManager = performanceManager;