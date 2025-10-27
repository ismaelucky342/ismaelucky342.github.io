/**
 * Main application script
 * Optimized for performance and compatibility
 */

(function() {
    'use strict';
    
    // Utility function for debouncing
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Initialize on DOM ready
    function init() {
        setupLazyLoading();
        setupSmoothScroll();
        setupAccessibility();
        setupPerformanceOptimizations();
        setupNavigation();
        setupCardFlip();
    }
    
    // Lazy loading for images (fallback if native lazy loading not supported)
    function setupLazyLoading() {
        if ('loading' in HTMLImageElement.prototype) {
            return; // Native lazy loading is supported
        }
        
        const images = document.querySelectorAll('img[loading="lazy"]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Smooth scroll for anchor links
    function setupSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // Accessibility improvements
    function setupAccessibility() {
        // Skip to main content link
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.className = 'skip-to-main visually-hidden';
        skipLink.textContent = 'Skip to main content';
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Add aria-label to external links
        const externalLinks = document.querySelectorAll('a[target="_blank"]');
        externalLinks.forEach(link => {
            if (!link.getAttribute('aria-label')) {
                link.setAttribute('aria-label', `${link.textContent} (opens in new tab)`);
            }
        });
    }
    
    // Performance optimizations
    function setupPerformanceOptimizations() {
        // Optimize grid animation based on device performance
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            document.body.classList.add('reduced-motion');
        }
        
        // Handle visibility change to pause animations
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                document.body.classList.add('page-hidden');
            } else {
                document.body.classList.remove('page-hidden');
            }
        });
        
        // Debounced resize handler
        const handleResize = debounce(() => {
            // Add any resize-specific logic here
            console.log('Window resized');
        }, 250);
        
        window.addEventListener('resize', handleResize);
    }
    
    // Navigation setup
    function setupNavigation() {
        const currentPath = window.location.pathname.split("/").pop(); 
        document.querySelectorAll(".nav-item").forEach(item => {
            const link = item.getAttribute("href").split("/").pop();
            if (currentPath === link) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        });
    }
    
    // Card flip setup
    function setupCardFlip() {
        // Seleccionamos todas las tarjetas
        const cards = document.querySelectorAll('.card');
    
        // Añadimos el evento de clic para cada tarjeta
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const cardInner = card.querySelector('.card-inner');
                cardInner.classList.toggle('flipped'); // Al hacer clic, se agrega o elimina la clase "flipped"
            });
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();