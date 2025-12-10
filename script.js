/* ===================================
   ROOFING ADVISORY - JAVASCRIPT
   =================================== */

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll for all internal links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80; // Account for fixed header
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add scroll effect to fixed CTA bar
    const fixedCta = document.querySelector('.fixed-cta');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            fixedCta.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            fixedCta.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe service cards, case cards, and pricing cards
    const animatedElements = document.querySelectorAll('.service-card, .case-card, .pricing-card, .faq-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Track CTA button clicks (you can connect this to analytics)
    const ctaButtons = document.querySelectorAll('.btn');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            console.log('CTA clicked:', buttonText);
            
            // Example: Send to Google Analytics (uncomment when GA is set up)
            // if (typeof gtag !== 'undefined') {
            //     gtag('event', 'cta_click', {
            //         'button_text': buttonText,
            //         'page_location': window.location.href
            //     });
            // }
        });
    });
    
    // Optional: Add active state to fixed CTA based on section
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // You can add highlighting or other effects here
                // console.log('Current section:', sectionId);
            }
        });
    });
    
    // Mobile menu toggle (if you add a hamburger menu later)
    // This is a placeholder for future enhancement
    function initMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        if (menuToggle && mobileMenu) {
            menuToggle.addEventListener('click', function() {
                mobileMenu.classList.toggle('active');
                this.classList.toggle('active');
            });
        }
    }
    
    // Initialize mobile menu if elements exist
    initMobileMenu();
    
    // Console message for developers
    console.log('🛡️ Roofing Advisory site loaded successfully');
    console.log('Need help? Contact: tu@email.com');
});

// Optional: Add price calculator (future enhancement)
function calculateRoofPrice(sqft, condition) {
    const basePrice = 8.5; // Base price per sqft
    const conditionMultiplier = {
        'good': 1.0,
        'fair': 1.2,
        'poor': 1.5
    };
    
    const multiplier = conditionMultiplier[condition] || 1.2;
    const estimate = sqft * basePrice * multiplier;
    
    return {
        low: Math.floor(estimate * 0.9),
        high: Math.ceil(estimate * 1.1)
    };
}

// Export functions for potential use in forms
window.roofingAdvisory = {
    calculateRoofPrice: calculateRoofPrice
};
