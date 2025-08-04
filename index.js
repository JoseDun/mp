// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {

    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    const navOverlay = document.querySelector('.nav-overlay');
    const serviceMenuItem = document.querySelector('.service-menu-item');
    const serviceLink = document.querySelector('.service-menu-item .nav-link');

    if (mobileToggle && nav && navOverlay) {
        mobileToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            navOverlay.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }

    // Mobile Submenu Toggle
    const arrowDown = document.querySelector('.arrow-down');
    
    if (serviceMenuItem && serviceLink && arrowDown) {
        // Click en la flecha para abrir/cerrar submenú
        arrowDown.addEventListener('click', function(e) {
            // Solo en mobile (cuando el menú está activo)
            if (nav.classList.contains('active')) {
                e.preventDefault();
                e.stopPropagation();
                serviceMenuItem.classList.toggle('active');
            }
        });
        
        // También permitir click en "Servicios" para abrir/cerrar
        serviceLink.addEventListener('click', function(e) {
            // Solo en mobile (cuando el menú está activo)
            if (nav.classList.contains('active')) {
                e.preventDefault();
                serviceMenuItem.classList.toggle('active');
            }
        });
    }

    // Close mobile menu when clicking outside or on overlay
    function closeMobileMenu() {
        if (nav && navOverlay && mobileToggle) {
            nav.classList.remove('active');
            navOverlay.classList.remove('active');
            mobileToggle.classList.remove('active');
        }
    }

    document.addEventListener('click', function(e) {
        if (nav && nav.classList.contains('active')) {
            if (!nav.contains(e.target) && !mobileToggle.contains(e.target)) {
                closeMobileMenu();
            }
        }
    });

    // Close menu when clicking on overlay
    if (navOverlay) {
        navOverlay.addEventListener('click', closeMobileMenu);
    }

    // Testimonial Carousel
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.testimonial-nav.prev');
    const nextBtn = document.querySelector('.testimonial-nav.next');

    let currentSlide = 0;
    const totalSlides = testimonialSlides.length;

    function showSlide(index) {
        // Hide all slides
        testimonialSlides.forEach(slide => {
            slide.classList.remove('active');
        });

        // Remove active class from all dots
        testimonialDots.forEach(dot => {
            dot.classList.remove('active');
        });

        // Show current slide
        if (testimonialSlides[index]) {
            testimonialSlides[index].classList.add('active');
        }

        // Activate current dot
        if (testimonialDots[index]) {
            testimonialDots[index].classList.add('active');
        }
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }

    // Event listeners for testimonial navigation
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }

    // Dot navigation
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Auto-play testimonials
    let testimonialInterval = setInterval(nextSlide, 5000);

    // Pause auto-play on hover
    const testimonialCarousel = document.querySelector('.testimonial-carousel');
    if (testimonialCarousel) {
        testimonialCarousel.addEventListener('mouseenter', () => {
            clearInterval(testimonialInterval);
        });

        testimonialCarousel.addEventListener('mouseleave', () => {
            testimonialInterval = setInterval(nextSlide, 5000);
        });
    }


    // Scroll Animations
    const animatedElements = document.querySelectorAll('.service-card, .about-image, .about-text');

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

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // Form Validation
    const emailInputs = document.querySelectorAll('input[type="email"]');

    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            const email = this.value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (email && !emailRegex.test(email)) {
                this.style.borderColor = '#e74c3c';
                this.style.boxShadow = '0 0 5px rgba(231, 76, 60, 0.3)';
            } else {
                this.style.borderColor = '#b79269';
                this.style.boxShadow = 'none';
            }
        });
    });

    // Lazy Loading for Images
    const images = document.querySelectorAll('img[src]');

    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '1';
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        imageObserver.observe(img);
    });

    // Testimonial Touch/Swipe Support for Mobile
    let startX = 0;
    let endX = 0;

    if (testimonialCarousel) {
        testimonialCarousel.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
        });

        testimonialCarousel.addEventListener('touchend', function(e) {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        });

        function handleSwipe() {
            const difference = startX - endX;
            const threshold = 50;

            if (Math.abs(difference) > threshold) {
                if (difference > 0) {
                    // Swipe left - next slide
                    nextSlide();
                } else {
                    // Swipe right - previous slide
                    prevSlide();
                }
            }
        }
    }

    // Keyboard Navigation for Testimonials
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

    // Performance Optimization - Debounce Scroll Events
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

    console.log('María Palos website loaded successfully! 🌟');
});
