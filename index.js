// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {

    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');

    if (mobileToggle && nav) {
        mobileToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }

    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('.nav-link, .cta-button, .learn-more-btn, .service-btn, .contact-btn');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href && href.startsWith('#')) {
                e.preventDefault();

                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    nav.classList.remove('active');
                    mobileToggle.classList.remove('active');
                }
            }
        });
    });

    // Active Navigation Link on Scroll
    const sections = document.querySelectorAll('section[id]');
    const navigationLinks = document.querySelectorAll('.nav-link');

    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPosition >= top && scrollPosition < top + height) {
                navigationLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);

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

    // Newsletter Form
    const newsletterForm = document.getElementById('newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = this.querySelector('input[type="email"]').value;
            const checkbox = this.parentElement.querySelector('input[type="checkbox"]');

            if (!checkbox.checked) {
                alert('Debes aceptar la Política de Privacidad para continuar.');
                return;
            }

            // Simulate form submission
            alert(`¡Gracias! Hemos enviado la guía a tu email: ${email}`);

            // Reset form
            this.reset();
            checkbox.checked = false;
        });
    }

    // Cookie Banner
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookies = document.getElementById('accept-cookies');
    const rejectCookies = document.getElementById('reject-cookies');

    // Check if cookies have been accepted
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');

    if (!cookiesAccepted && cookieBanner) {
        // Show cookie banner after a delay
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 2000);
    }

    if (acceptCookies) {
        acceptCookies.addEventListener('click', function() {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieBanner.classList.remove('show');
        });
    }

    if (rejectCookies) {
        rejectCookies.addEventListener('click', function() {
            localStorage.setItem('cookiesAccepted', 'false');
            cookieBanner.classList.remove('show');
        });
    }

    // WhatsApp Float Button
    const whatsappFloat = document.querySelector('.whatsapp-float');

    if (whatsappFloat) {
        whatsappFloat.addEventListener('click', function() {
            const phoneNumber = '34634187692'; // María's phone number
            const message = encodeURIComponent('¡Hola María! Me gustaría conocer más sobre tus servicios.');
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
            window.open(whatsappUrl, '_blank');
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

    // Header Scroll Effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
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

    // Contact Modal (if needed)
    const contactBtns = document.querySelectorAll('.contact-btn');

    contactBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#contacto') {
                e.preventDefault();
                // You can implement a contact modal here
                alert('¡Hola! Puedes contactarme directamente por WhatsApp o email. ¡Estaré encantada de ayudarte!');
            }
        });
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

    const debouncedScrollHandler = debounce(updateActiveNavLink, 100);
    window.removeEventListener('scroll', updateActiveNavLink);
    window.addEventListener('scroll', debouncedScrollHandler);

    // Analytics Events (Google Analytics integration)
    function trackEvent(eventName, eventData = {}) {
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, eventData);
        }
    }

    // Track button clicks
    document.querySelectorAll('.cta-button, .service-btn, .learn-more-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            trackEvent('button_click', {
                button_text: this.textContent,
                button_location: this.closest('section')?.id || 'unknown'
            });
        });
    });

    // Track WhatsApp clicks
    if (whatsappFloat) {
        whatsappFloat.addEventListener('click', function() {
            trackEvent('whatsapp_click', {
                source: 'floating_button'
            });
        });
    }

    // Track Newsletter Signup
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function() {
            trackEvent('newsletter_signup', {
                form_location: 'main_page'
            });
        });
    }

    console.log('María Palos website loaded successfully! 🌟');
});
