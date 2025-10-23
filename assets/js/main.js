/*===== PERFORMANCE OPTIMIZED MAIN JS =====*/

// Performance monitoring
const startTime = performance.now();

// Debug function for troubleshooting
function debugPortfolio() {
    console.log('=== PROJECTS DEBUG INFO ===');
    console.log('Skills section:', document.querySelector('#skills') ? 'Found' : 'Missing');
    console.log('Projects section:', document.querySelector('#portfolio') ? 'Found' : 'Missing');
    console.log('Contact section:', document.querySelector('#contact') ? 'Found' : 'Missing');
    console.log('Skill bars:', document.querySelectorAll('.skill__progress').length);
    console.log('Project images:', document.querySelectorAll('.portfolio__img').length);
    console.log('Contact form:', document.querySelector('#contactForm') ? 'Found' : 'Missing');
    console.log('==============================');
}

// Log initial page load performance
window.addEventListener('load', () => {
    const loadTime = performance.now() - startTime;
    console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
    
    // Track network speed
    if (navigator.connection) {
        console.log(`Connection: ${navigator.connection.effectiveType}, ${navigator.connection.downlink}Mbps`);
    }
    
    // Run debug after everything loads
    setTimeout(debugPortfolio, 1000);
});

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    initializeCore();
});

function initializeCore() {
    try {
        setupMenu();
        setupScrollEffects();
        setupPreloader();
        setupLazyComponents();
        
        // Initialize interactive components
        animateSkillBars();
        initializePortfolio();
        initializeContactForm();
        initializeSmoothScrolling();
        initializeScrollToTop();
        
        console.log('All core features initialized successfully');
    } catch (error) {
        console.error('Error initializing core features:', error);
    }
}

/*===== MENU SHOW =====*/ 
function setupMenu() {
    try {
        const toggle = document.getElementById('nav-toggle');
        const nav = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav__link');

        if (toggle && nav) {
            toggle.addEventListener('click', () => {
                nav.classList.toggle('show');
            });
        }

        // Remove menu on mobile when link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav?.classList.remove('show');
            });
        });
    } catch (error) {
        console.error('Error setting up menu:', error);
    }
}

/*===== OPTIMIZED SCROLL EFFECTS =====*/
function setupScrollEffects() {
    try {
        const sections = document.querySelectorAll('section[id]');
        const header = document.querySelector('.l-header');
        let ticking = false;

        // Throttled scroll handler for better performance
        function scrollActive() {
            const scrollY = window.pageYOffset;
            
            // Add scrolled class to header
            if (header) {
                if (scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            }

            // Update active navigation links
            sections.forEach(current => {
                try {
                    const sectionHeight = current.offsetHeight;
                    const sectionTop = current.offsetTop - 50;
                    const sectionId = current.getAttribute('id');
                    const navLink = document.querySelector(`.nav__menu a[href*="${sectionId}"]`);

                    if (navLink) {
                        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                            navLink.classList.add('active');
                        } else {
                            navLink.classList.remove('active');
                        }
                    }
                } catch (error) {
                    console.error('Error updating section:', error);
                }
            });

            ticking = false;
        }

        // Throttled scroll listener
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(scrollActive);
                ticking = true;
            }
        }, { passive: true });

    } catch (error) {
        console.error('Error setting up scroll effects:', error);
    }
}

/*===== PRELOADER =====*/
function setupPreloader() {
    try {
        const preloader = document.getElementById('preloader');
        
        if (preloader) {
            // Hide preloader after minimum time or when page is fully loaded
            const minTime = 1000; // Minimum 1 second
            const startTime = performance.now();
            
            window.addEventListener('load', () => {
                const elapsedTime = performance.now() - startTime;
                const remainingTime = Math.max(0, minTime - elapsedTime);
                
                setTimeout(() => {
                    preloader.style.opacity = '0';
                    setTimeout(() => {
                        preloader.style.display = 'none';
                    }, 300);
                }, remainingTime);
            });
            
            // Fallback: hide preloader after 5 seconds regardless
            setTimeout(() => {
                if (preloader.style.display !== 'none') {
                    preloader.style.opacity = '0';
                    setTimeout(() => {
                        preloader.style.display = 'none';
                    }, 300);
                }
            }, 5000);
        }
    } catch (error) {
        console.error('Error setting up preloader:', error);
    }
}

/*===== LAZY COMPONENT INITIALIZATION =====*/
function setupLazyComponents() {
    try {
        // Mark components for lazy loading
        const components = [
            { id: 'code-cube-container', type: 'code-cube' },
            { id: 'interactive-terminal', type: 'terminal' },
            { id: 'skills-radar-container', type: 'skills-radar' }
        ];
        
        components.forEach(component => {
            const element = document.getElementById(component.id);
            if (element) {
                element.setAttribute('data-lazy-load', component.type);
                element.classList.add('lazy-component');
            }
        });
        
        // Setup particle canvases with configuration
        const particleConfigs = {
            'hero-particles': {
                particleCount: 60,
                particleSize: 1.5,
                particleSpeed: 0.3,
                connectionDistance: 100,
                particleColor: 'rgba(59, 130, 246, 0.4)',
                lineColor: 'rgba(59, 130, 246, 0.15)',
                mouseRadius: 120,
                enableMouseInteraction: true
            },
            'skills-particles': {
                particleCount: 40,
                particleSize: 1,
                particleSpeed: 0.2,
                connectionDistance: 80,
                particleColor: 'rgba(16, 185, 129, 0.3)',
                lineColor: 'rgba(16, 185, 129, 0.1)',
                mouseRadius: 100,
                enableMouseInteraction: true
            },
            'contact-particles': {
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
            }
        };
        
        Object.entries(particleConfigs).forEach(([id, config]) => {
            const element = document.getElementById(id);
            if (element) {
                element.setAttribute('data-lazy-load', 'particles');
                element.setAttribute('data-particle-config', JSON.stringify(config));
            }
        });
        
    } catch (error) {
        console.error('Error setting up lazy components:', error);
    }
}

/*===== FALLBACK FOR JAVASCRIPT DISABLED =====*/
// Remove no-js class if JavaScript is enabled
document.documentElement.classList.remove('no-js');
document.documentElement.classList.add('js');


/*===== ENHANCED SKILLS - NO ANIMATION =====*/
// Skill progress bars - display static without animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill__progress');
    
    // Simply set the width immediately without animation
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
        bar.style.opacity = '1';
        bar.classList.add('animated');
    });
}

/*===== PROJECTS ENHANCEMENT =====*/
function initializePortfolio() {
    const portfolioItems = document.querySelectorAll('.portfolio__img');
    
    portfolioItems.forEach(item => {
        // Add loading state for images
        const img = item.querySelector('img');
        const link = item.querySelector('.portfolio__link-name');
        
        if (img) {
            img.addEventListener('load', () => {
                item.classList.add('loaded');
            });
            
            img.addEventListener('error', () => {
                item.classList.add('error');
                console.error('Failed to load project image:', img.src);
            });
        }
        
        // Add hover effects and analytics
        item.addEventListener('mouseenter', () => {
            item.classList.add('hovered');
        });
        
        item.addEventListener('mouseleave', () => {
            item.classList.remove('hovered');
        });
        
        // Track clicks
        if (link) {
            link.addEventListener('click', (e) => {
                console.log('Project item clicked:', link.href);
                // Add analytics here if needed
            });
        }
    });
}

/*===== FORM VALIDATION AND ENHANCEMENT =====*/
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const inputs = form.querySelectorAll('.contact__input');
    const submitBtn = form.querySelector('.contact__button');
    
    // Add loading state and validation to submit button
    form.addEventListener('submit', function(e) {
        // Basic form validation
        const name = form.querySelector('input[name="name"]').value.trim();
        const email = form.querySelector('input[name="email"]').value.trim();
        const message = form.querySelector('textarea[name="message"]').value.trim();
        
        if (!name || !email || !message) {
            e.preventDefault();
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            e.preventDefault();
            alert('Please enter a valid email address.');
            return;
        }
        
        // Show loading state
        submitBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Re-enable button after 10 seconds in case of timeout
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="bx bx-send"></i> Send Message';
            submitBtn.disabled = false;
        }, 10000);
    });
    
    // Add real-time validation
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearErrors);
    });
    
    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        
        // Remove existing error styling
        field.classList.remove('error');
        
        // Validate based on field type
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(field, 'Please enter a valid email address');
            }
        }
    }
    
    function clearErrors(e) {
        e.target.classList.remove('error');
    }
    
    function showFieldError(field, message) {
        field.classList.add('error');
        // Could add tooltip or error message display here
    }
}

/*===== SMOOTH SCROLLING ENHANCEMENT =====*/
function initializeSmoothScrolling() {
    // Enhanced smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            console.log('Smooth scroll clicked:', targetId, 'Target found:', !!target);
            
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            } else {
                console.error('Target not found for:', targetId);
            }
        });
    });
}

/*===== PRELOADER AND LOADING ANIMATION =====*/
function initializePreloader() {
    const preloader = document.getElementById('preloader');
    
    // Hide preloader when page is fully loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (preloader) {
                preloader.classList.add('hidden');
                setTimeout(() => {
                    preloader.remove();
                }, 500);
            }
            document.body.classList.add('loaded');
        }, 1000); // Show preloader for at least 1 second
    });
}

function initializeLoadingAnimation() {
    // Add loading class to body
    document.body.classList.add('loading');
    
    // Remove loading class when everything is loaded
    window.addEventListener('load', () => {
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');
    });
}

/*===== TYPING ANIMATION FOR HOME TITLE =====*/
function initializeTypingAnimation() {
    const titleElement = document.querySelector('.home__title-name');
    if (!titleElement) return;
    
    const text = titleElement.textContent;
    titleElement.textContent = '';
    titleElement.style.opacity = '1';
    
    let i = 0;
    const typeTimer = setInterval(() => {
        if (i < text.length) {
            titleElement.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typeTimer);
        }
    }, 100);
}

/*===== SCROLL TO TOP FUNCTIONALITY =====*/
function initializeScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (!scrollToTopBtn) return;
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top when clicked
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Additional enhancements - typing animation
document.addEventListener('DOMContentLoaded', function() {
    // Delay typing animation slightly for better effect
    setTimeout(() => {
        if (typeof initializeTypingAnimation === 'function') {
            initializeTypingAnimation();
        }
    }, 2000);
});






