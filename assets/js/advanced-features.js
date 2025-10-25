/*===== THEME TOGGLE FUNCTIONALITY =====*/
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme();
        this.setupToggle();
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        this.updateToggleIcon();
    }

    updateToggleIcon() {
        const icon = document.querySelector('.theme-toggle-icon');
        if (icon) {
            icon.className = this.theme === 'dark' ? 'bx bx-sun theme-toggle-icon' : 'bx bx-moon theme-toggle-icon';
        }
    }

    setupToggle() {
        const toggle = document.getElementById('theme-toggle');
        if (toggle) {
            toggle.addEventListener('click', () => this.toggleTheme());
        }
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.theme);
        this.applyTheme();
        
        // Add smooth transition effect
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }
}

/*===== BASIC PERFORMANCE METRICS (Legacy Support) =====*/
class PerformanceMonitor {
    constructor() {
        // This class is kept for compatibility
        // Enhanced monitoring is handled by performance-optimizer.js
        console.log('Basic PerformanceMonitor loaded. Enhanced monitoring available via EnhancedPerformanceMonitor.');
    }
}

/*===== BLOG INTEGRATION =====*/
class BlogIntegration {
    constructor() {
        this.blogUrl = 'https://musingwithmukesh.blogspot.com';
        this.init();
    }

    init() {
        this.fetchBlogPosts();
    }

    async fetchBlogPosts() {
        const container = document.getElementById('blog-posts');
        if (!container) return;

        // Show loading state
        container.innerHTML = '<div class="blog__loading">Loading latest blog posts...</div>';

        try {
            // Since we can't directly fetch from Blogger due to CORS, we'll create mock data
            // In a real implementation, you'd use a backend service or Blogger API
            const mockPosts = await this.getMockBlogPosts();
            this.displayBlogPosts(mockPosts);
        } catch (error) {
            console.error('Error fetching blog posts:', error);
            container.innerHTML = '<div class="blog__loading">Visit my blog for latest posts!</div>';
        }
    }

    async getMockBlogPosts() {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        return [
            {
                title: "Variational AutoEncoder in Machine Learning",
                excerpt: "Deep dive into Variational AutoEncoders (VAEs), exploring their architecture, mathematical foundations, and practical applications in generative modeling and dimensionality reduction.",
                date: "2024-10-20",
                image: "assets/img/blog1.jpg",
                url: "https://musingwithmukesh.blogspot.com/"
            },
            {
                title: "Learning Model Building in Scikit Learn: A Python Machine Learning Library",
                excerpt: "Comprehensive guide to building machine learning models using Scikit-Learn, covering preprocessing, model selection, training, and evaluation techniques.",
                date: "2024-10-15",
                image: "assets/img/blog2.jpg",
                url: "https://musingwithmukesh.blogspot.com/"
            },
            {
                title: "Flower Detection & Classification using CNN",
                excerpt: "Step-by-step implementation of Convolutional Neural Networks for flower species detection and classification, including data preprocessing and model optimization.",
                date: "2024-10-10",
                image: "assets/img/blog3.jpg",
                url: "https://musingwithmukesh.blogspot.com/"
            },
            {
                title: "A Beginner's Guide to Neural Networks",
                excerpt: "Introduction to neural networks fundamentals, covering perceptrons, backpropagation, activation functions, and practical implementation examples for beginners.",
                date: "2024-10-05",
                image: "assets/img/blog4.jpg",
                url: "https://musingwithmukesh.blogspot.com/"
            }
        ];
    }

    displayBlogPosts(posts) {
        const container = document.getElementById('blog-posts');
        if (!container) return;

        container.innerHTML = posts.map(post => `
            <article class="blog__post">
                <div class="blog__post-content">
                    <h3 class="blog__post-title">${post.title}</h3>
                    <p class="blog__post-date">${this.formatDate(post.date)}</p>
                    <p class="blog__post-excerpt">${post.excerpt}</p>
                    <a href="${post.url}" class="blog__post-link" target="_blank" rel="noopener noreferrer">
                        Read More <i class='bx bx-right-arrow-alt'></i>
                    </a>
                </div>
            </article>
        `).join('');
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}

/*===== QR CODE GENERATOR =====*/
class QRCodeGenerator {
    constructor() {
        this.init();
    }

    init() {
        this.generateQRCode();
    }

    generateQRCode() {
        const qrImage = document.getElementById('qr-code');
        if (!qrImage) {
            console.error('QR code element not found');
            return;
        }

        // LinkedIn profile URL
        const linkedInUrl = 'https://www.linkedin.com/in/mukesh-gautam-a9a79820a/';
        
        // Method 1: Try QR Server API
        this.tryQRServerAPI(qrImage, linkedInUrl);
    }

    tryQRServerAPI(imgElement, url) {
        const size = 150;
        const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(url)}&format=png&margin=5&color=000000&bgcolor=ffffff`;
        
        console.log('Generating QR code for:', url);
        console.log('QR API URL:', qrApiUrl);
        console.log('Image element:', imgElement);
        
        // Set the image source directly
        imgElement.src = qrApiUrl;
        imgElement.style.display = 'block';
        
        // Also log the direct URL for manual testing
        console.log('Direct QR code URL (copy to browser):', qrApiUrl);
        
        // Handle loading states
        imgElement.onload = () => {
            console.log('QR code loaded successfully');
            imgElement.style.opacity = '1';
        };
        
        imgElement.onerror = () => {
            console.log('QR Server API failed, trying alternative');
            this.tryAlternativeAPI(imgElement, url);
        };
        
        // Set initial styles
        imgElement.style.opacity = '0.7';
        imgElement.style.transition = 'opacity 0.3s ease';
    }

    tryAlternativeAPI(imgElement, url) {
        // Method 2: Try QR-Code Generator API
        const size = 150;
        const altApiUrl = `https://chart.googleapis.com/chart?chs=${size}x${size}&cht=qr&chl=${encodeURIComponent(url)}&choe=UTF-8`;
        
        console.log('Trying Google Charts API:', altApiUrl);
        
        imgElement.src = altApiUrl;
        
        imgElement.onload = () => {
            console.log('Alternative QR code loaded successfully');
            imgElement.style.opacity = '1';
        };
        
        imgElement.onerror = () => {
            console.log('All QR APIs failed, showing fallback');
            this.showFallback(imgElement, url);
        };
    }

    showFallback(imgElement, url) {
        // Method 3: Create a simple fallback using data URL
        const fallbackSVG = this.createFallbackQR(url);
        imgElement.src = `data:image/svg+xml;base64,${btoa(fallbackSVG)}`;
        imgElement.style.opacity = '1';
        console.log('Fallback QR code displayed');
    }

    createFallbackQR(url) {
        return `
        <svg width="150" height="150" xmlns="http://www.w3.org/2000/svg">
            <rect width="150" height="150" fill="white" stroke="#ccc" stroke-width="2"/>
            
            <!-- Finder patterns -->
            <rect x="10" y="10" width="35" height="35" fill="black"/>
            <rect x="15" y="15" width="25" height="25" fill="white"/>
            <rect x="20" y="20" width="15" height="15" fill="black"/>
            
            <rect x="105" y="10" width="35" height="35" fill="black"/>
            <rect x="110" y="15" width="25" height="25" fill="white"/>
            <rect x="115" y="20" width="15" height="15" fill="black"/>
            
            <rect x="10" y="105" width="35" height="35" fill="black"/>
            <rect x="15" y="110" width="25" height="25" fill="white"/>
            <rect x="20" y="115" width="15" height="15" fill="black"/>
            
            <!-- Data pattern -->
            <rect x="50" y="20" width="5" height="5" fill="black"/>
            <rect x="60" y="20" width="5" height="5" fill="black"/>
            <rect x="70" y="25" width="5" height="5" fill="black"/>
            <rect x="80" y="30" width="5" height="5" fill="black"/>
            <rect x="55" y="35" width="5" height="5" fill="black"/>
            <rect x="65" y="40" width="5" height="5" fill="black"/>
            <rect x="75" y="45" width="5" height="5" fill="black"/>
            <rect x="85" y="50" width="5" height="5" fill="black"/>
            
            <!-- More data pattern -->
            <rect x="50" y="60" width="5" height="5" fill="black"/>
            <rect x="70" y="65" width="5" height="5" fill="black"/>
            <rect x="90" y="70" width="5" height="5" fill="black"/>
            <rect x="55" y="75" width="5" height="5" fill="black"/>
            <rect x="75" y="80" width="5" height="5" fill="black"/>
            <rect x="95" y="85" width="5" height="5" fill="black"/>
            
            <!-- Text -->
            <text x="75" y="135" font-family="Arial" font-size="10" text-anchor="middle" fill="#666">LinkedIn Profile</text>
        </svg>`;
    }
}

/*===== INITIALIZE ALL FEATURES =====*/
document.addEventListener('DOMContentLoaded', function() {
    console.log('Advanced features initializing...');
    
    // Initialize theme manager
    new ThemeManager();
    console.log('Theme manager initialized');
    
    // Initialize performance monitor
    new PerformanceMonitor();
    console.log('Performance monitor initialized');
    
    // Initialize blog integration
    new BlogIntegration();
    console.log('Blog integration initialized');
    
    // Initialize QR code generator
    const qrGenerator = new QRCodeGenerator();
    console.log('QR code generator initialized');
});