/*===== PERFORMANCE OPTIMIZATION & SMOOTHNESS ENHANCEMENTS =====*/

/*===== ENHANCED PERFORMANCE MONITOR =====*/
class EnhancedPerformanceMonitor {
    constructor() {
        this.metrics = {};
        this.isMonitoring = false;
        this.init();
    }

    init() {
        this.setupPerformanceObserver();
        this.collectInitialMetrics();
        this.displayMetrics();
        this.startContinuousMonitoring();
        this.setupFPSMonitor();
    }

    setupPerformanceObserver() {
        if (!('PerformanceObserver' in window)) {
            console.warn('PerformanceObserver not supported');
            return;
        }

        // Core Web Vitals Observer
        const vitalsObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                switch (entry.entryType) {
                    case 'paint':
                        if (entry.name === 'first-paint') {
                            this.metrics.firstPaint = Math.round(entry.startTime);
                        }
                        if (entry.name === 'first-contentful-paint') {
                            this.metrics.firstContentfulPaint = Math.round(entry.startTime);
                        }
                        break;
                    case 'largest-contentful-paint':
                        this.metrics.largestContentfulPaint = Math.round(entry.startTime);
                        break;
                    case 'layout-shift':
                        if (!this.metrics.cumulativeLayoutShift) {
                            this.metrics.cumulativeLayoutShift = 0;
                        }
                        if (!entry.hadRecentInput) {
                            this.metrics.cumulativeLayoutShift += entry.value;
                        }
                        break;
                    case 'first-input':
                        this.metrics.firstInputDelay = Math.round(entry.processingStart - entry.startTime);
                        break;
                }
                this.displayMetrics();
            }
        });

        try {
            vitalsObserver.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'layout-shift', 'first-input'] });
        } catch (e) {
            console.warn('Some performance metrics not available:', e);
        }
    }

    collectInitialMetrics() {
        const navigation = performance.getEntriesByType('navigation')[0];
        if (navigation) {
            this.metrics = {
                ...this.metrics,
                loadTime: Math.round(navigation.loadEventEnd - navigation.fetchStart),
                domContentLoaded: Math.round(navigation.domContentLoadedEventEnd - navigation.fetchStart),
                timeToInteractive: Math.round(navigation.domInteractive - navigation.fetchStart),
                networkLatency: Math.round(navigation.responseStart - navigation.requestStart),
                serverResponseTime: Math.round(navigation.responseEnd - navigation.responseStart),
                domProcessingTime: Math.round(navigation.domComplete - navigation.responseEnd)
            };
        }

        // Memory usage (if available)
        if ('memory' in performance) {
            this.metrics.memoryUsage = {
                used: Math.round(performance.memory.usedJSHeapSize / 1048576), // MB
                allocated: Math.round(performance.memory.totalJSHeapSize / 1048576), // MB
                limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576) // MB
            };
        }
    }

    setupFPSMonitor() {
        let frames = 0;
        let lastTime = performance.now();
        
        const countFrames = () => {
            frames++;
            const currentTime = performance.now();
            
            if (currentTime >= lastTime + 1000) {
                this.metrics.fps = Math.round((frames * 1000) / (currentTime - lastTime));
                frames = 0;
                lastTime = currentTime;
                this.displayMetrics();
            }
            
            requestAnimationFrame(countFrames);
        };
        
        requestAnimationFrame(countFrames);
    }

    displayMetrics() {
        const container = document.getElementById('performance-metrics');
        if (!container) return;

        // Core Web Vitals and Essential Performance Metrics (Industry Standards)
        const metricsData = [
            { 
                label: 'LCP', 
                value: `${this.metrics.largestContentfulPaint || 0}ms`, 
                status: this.getLCPStatus(this.metrics.largestContentfulPaint),
                description: 'Largest Contentful Paint - Core Web Vital',
                threshold: 'Good: <2.5s, Poor: >4.0s'
            },
            { 
                label: 'FID', 
                value: `${this.metrics.firstInputDelay || 0}ms`, 
                status: this.getFIDStatus(this.metrics.firstInputDelay),
                description: 'First Input Delay - Core Web Vital',
                threshold: 'Good: <100ms, Poor: >300ms'
            },
            {
                label: 'CLS',
                value: `${(this.metrics.cumulativeLayoutShift || 0).toFixed(3)}`,
                status: this.getCLSStatus(this.metrics.cumulativeLayoutShift),
                description: 'Cumulative Layout Shift - Core Web Vital',
                threshold: 'Good: <0.1, Poor: >0.25'
            },
            { 
                label: 'FCP', 
                value: `${this.metrics.firstContentfulPaint || 0}ms`, 
                status: this.getFCPStatus(this.metrics.firstContentfulPaint),
                description: 'First Contentful Paint - Loading Performance',
                threshold: 'Good: <1.8s, Poor: >3.0s'
            },
            { 
                label: 'TTI', 
                value: `${this.metrics.timeToInteractive || 0}ms`, 
                status: this.getTTIStatus(this.metrics.timeToInteractive),
                description: 'Time to Interactive - User Experience',
                threshold: 'Good: <3.8s, Poor: >7.3s'
            }
        ];

        container.innerHTML = `
            <div class="performance__grid">
                ${metricsData.map(metric => `
                    <div class="metric__card" data-tooltip="${metric.description} | ${metric.threshold}">
                        <div class="metric__header">
                            <div class="metric__value">${metric.value}</div>
                            <span class="metric__status ${metric.status}"></span>
                        </div>
                        <div class="metric__label">${metric.label}</div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    // Status calculation methods
    getLoadTimeStatus(time) {
        if (!time) return 'unknown';
        if (time < 1500) return 'excellent';
        if (time < 2500) return 'good';
        if (time < 4000) return 'needs-improvement';
        return 'poor';
    }

    // Core Web Vitals Status Methods (Based on Google's Thresholds)
    getFCPStatus(time) {
        if (!time) return 'unknown';
        if (time < 1800) return 'good';
        if (time < 3000) return 'needs-improvement';
        return 'poor';
    }

    getLCPStatus(time) {
        if (!time) return 'unknown';
        if (time < 2500) return 'good';
        if (time < 4000) return 'needs-improvement';
        return 'poor';
    }

    getFIDStatus(fid) {
        if (fid === undefined || fid === null) return 'unknown';
        if (fid < 100) return 'good';
        if (fid < 300) return 'needs-improvement';
        return 'poor';
    }

    getCLSStatus(cls) {
        if (cls === undefined) return 'unknown';
        if (cls < 0.1) return 'good';
        if (cls < 0.25) return 'needs-improvement';
        return 'poor';
    }

    getTTIStatus(tti) {
        if (!tti) return 'unknown';
        if (tti < 3800) return 'good';
        if (tti < 7300) return 'needs-improvement';
        return 'poor';
    }

    startContinuousMonitoring() {
        // Update metrics every 10 seconds
        setInterval(() => {
            this.collectInitialMetrics();
            this.displayMetrics();
        }, 10000);
    }
}

/*===== SMOOTH SCROLLING AND ANIMATIONS =====*/
class SmoothScrollManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupSmoothScrolling();
        this.setupIntersectionObserver();
        this.optimizeAnimations();
        this.setupScrollIndicator();
    }

    setupSmoothScrolling() {
        // Enhanced smooth scrolling for all navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const headerOffset = 70;
                    const elementPosition = target.offsetTop;
                    const offsetPosition = elementPosition - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Update active navigation
                    this.updateActiveNav(anchor.getAttribute('href'));
                }
            });
        });
    }

    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '-50px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Trigger animation
                    entry.target.classList.add('animate-in');
                    
                    // Update navigation
                    const id = entry.target.getAttribute('id');
                    if (id) {
                        this.updateActiveNav(`#${id}`);
                    }
                }
            });
        }, options);

        // Observe all sections
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });

        // Observe elements with animation classes
        document.querySelectorAll('.animate-on-scroll').forEach(element => {
            observer.observe(element);
        });
    }

    updateActiveNav(currentSection) {
        document.querySelectorAll('.nav__link').forEach(link => {
            link.classList.remove('active-link');
        });
        
        const activeLink = document.querySelector(`a[href="${currentSection}"]`);
        if (activeLink) {
            activeLink.classList.add('active-link');
        }
    }

    optimizeAnimations() {
        // Reduce animations for users who prefer reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.style.setProperty('--animation-duration', '0.1s');
            document.documentElement.style.setProperty('--transition-duration', '0.1s');
        }

        // Use will-change property for better performance
        const animatedElements = document.querySelectorAll('.portfolio__img, .skills__data, .qualification__content');
        animatedElements.forEach(element => {
            element.style.willChange = 'transform, opacity';
        });
    }

    setupScrollIndicator() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.innerHTML = '<div class="scroll-progress__bar"></div>';
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            
            document.querySelector('.scroll-progress__bar').style.width = scrolled + '%';
        });
    }
}

/*===== PERFORMANCE OPTIMIZATION UTILITIES =====*/
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.optimizeImages();
        this.setupLazyLoading();
        this.optimizeCSS();
        this.setupResourceHints();
        this.optimizeJavaScript();
    }

    optimizeImages() {
        // Add loading="lazy" to images that don't have it
        document.querySelectorAll('img:not([loading])').forEach(img => {
            img.setAttribute('loading', 'lazy');
        });

        // Add WebP support detection
        const supportsWebP = this.checkWebPSupport();
        if (supportsWebP) {
            document.documentElement.classList.add('webp-support');
        }
    }

    checkWebPSupport() {
        const canvas = document.createElement('canvas');
        return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }

    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    optimizeCSS() {
        // Remove unused CSS animations after page load
        window.addEventListener('load', () => {
            setTimeout(() => {
                const unusedAnimations = document.querySelectorAll('.animate-on-scroll:not(.animate-in)');
                unusedAnimations.forEach(element => {
                    element.style.willChange = 'auto';
                });
            }, 5000);
        });
    }

    setupResourceHints() {
        // Add preconnect for external resources
        const preconnectLinks = [
            'https://fonts.googleapis.com',
            'https://unpkg.com',
            'https://cdn.jsdelivr.net'
        ];

        preconnectLinks.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = href;
            document.head.appendChild(link);
        });
    }

    optimizeJavaScript() {
        // Debounce scroll and resize events
        this.debounceScrollEvents();
        this.optimizeResizeEvents();
    }

    debounceScrollEvents() {
        let scrollTimer;
        const originalScrollHandlers = [];
        
        // Store original scroll handlers
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
                // Dispatch custom optimized scroll event
                window.dispatchEvent(new CustomEvent('optimizedScroll'));
            }, 16); // ~60fps
        }, { passive: true });
    }

    optimizeResizeEvents() {
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                window.dispatchEvent(new CustomEvent('optimizedResize'));
            }, 250);
        });
    }
}

/*===== INITIALIZE ALL OPTIMIZATIONS =====*/
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing performance optimizations...');
    
    // Initialize enhanced performance monitoring
    new EnhancedPerformanceMonitor();
    
    // Initialize smooth scrolling and animations
    new SmoothScrollManager();
    
    // Initialize performance optimizations
    new PerformanceOptimizer();
    
    console.log('✅ Performance optimizations loaded successfully!');
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        EnhancedPerformanceMonitor,
        SmoothScrollManager,
        PerformanceOptimizer
    };
}