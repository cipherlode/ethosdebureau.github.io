// Advanced Animations JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
    // ==========================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                // Optionally unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll(
        '.fade-in-up, .fade-in-left, .fade-in-right, .fade-in, .scale-in, .service-card, .testimonial-card, .process-step'
    );
    
    animatedElements.forEach(el => observer.observe(el));
    
    // ==========================================
    // PARALLAX EFFECT
    // ==========================================
    
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.parallax || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
    
    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', () => {
            requestAnimationFrame(updateParallax);
        });
    }
    
    // ==========================================
    // CURSOR TRAIL EFFECT (Optional)
    // ==========================================
    
    let cursorTrail = [];
    const trailLength = 10;
    
    function createCursorTrail() {
        for (let i = 0; i < trailLength; i++) {
            const dot = document.createElement('div');
            dot.className = 'cursor-dot';
            dot.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: radial-gradient(circle, rgba(0,212,255,0.8), transparent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                transition: transform 0.1s ease;
            `;
            document.body.appendChild(dot);
            cursorTrail.push(dot);
        }
    }
    
    // Uncomment to enable cursor trail
    // createCursorTrail();
    
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursorTrail() {
        let x = mouseX;
        let y = mouseY;
        
        cursorTrail.forEach((dot, index) => {
            dot.style.left = x - 5 + 'px';
            dot.style.top = y - 5 + 'px';
            dot.style.opacity = 1 - (index * 0.1);
            dot.style.transform = `scale(${1 - (index * 0.1)})`;
            
            const nextDot = cursorTrail[index + 1] || cursorTrail[0];
            x += (parseInt(nextDot.style.left) - x) * 0.3;
            y += (parseInt(nextDot.style.top) - y) * 0.3;
        });
        
        requestAnimationFrame(animateCursorTrail);
    }
    
    // Uncomment to enable cursor trail animation
    // animateCursorTrail();
    
    // ==========================================
    // MAGNETIC BUTTONS
    // ==========================================
    
    const magneticButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
    
    // ==========================================
    // TYPEWRITER EFFECT
    // ==========================================
    
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Example usage for hero title (optional)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && heroTitle.dataset.typewriter) {
        const originalText = heroTitle.textContent;
        heroTitle.style.opacity = '1';
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 500);
    }
    
    // ==========================================
    // SCROLL PROGRESS BAR
    // ==========================================
    
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #00d4ff, #0a2540);
        width: 0%;
        z-index: 10000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = scrollPercentage + '%';
    }
    
    window.addEventListener('scroll', updateScrollProgress);
    
    // ==========================================
    // TILT EFFECT ON CARDS
    // ==========================================
    
    const tiltCards = document.querySelectorAll('.service-card, .testimonial-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
    
    // ==========================================
    // LOADING ANIMATION
    // ==========================================
    
    window.addEventListener('load', () => {
        const loader = document.querySelector('.page-loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    });
    
    // ==========================================
    // TEXT REVEAL ANIMATION
    // ==========================================
    
    const revealTexts = document.querySelectorAll('[data-reveal]');
    
    revealTexts.forEach(text => {
        const words = text.textContent.split(' ');
        text.innerHTML = '';
        
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.textContent = word + ' ';
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.display = 'inline-block';
            span.style.transition = `all 0.5s ease ${index * 0.05}s`;
            text.appendChild(span);
        });
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.querySelectorAll('span').forEach(span => {
                        span.style.opacity = '1';
                        span.style.transform = 'translateY(0)';
                    });
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        revealObserver.observe(text);
    });
    
    // ==========================================
    // FLOATING ELEMENTS
    // ==========================================
    
    const floatingElements = document.querySelectorAll('.floating-notification, .trust-badge');
    
    floatingElements.forEach((element, index) => {
        element.style.animation = `float ${3 + (index * 0.5)}s ease-in-out infinite`;
        element.style.animationDelay = `${index * 0.2}s`;
    });
    
});

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================

// Debounce function for scroll events
function debounce(func, wait = 10) {
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

// Throttle function for frequent events
function throttle(func, limit = 100) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
