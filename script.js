// Enhanced animation and interaction system
class DNSLearningPlatform {
    constructor() {
        this.initializeObservers();
        this.setupNavigation();
        this.setupCardInteractions();
        this.setupHeroParallax();
        this.setupProgressIndicator();
    }

    initializeObservers() {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px'
        };

        // Enhanced intersection observer with callback options
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Add custom animation based on data attribute
                    const animationType = entry.target.dataset.animationType;
                    if (animationType) {
                        entry.target.classList.add(`animate-${animationType}`);
                    }
                }
            });
        }, observerOptions);

        // Observe all animated elements
        document.querySelectorAll('.animate-on-scroll').forEach(element => {
            this.observer.observe(element);
        });
    }

    setupNavigation() {
        const mobileMenu = document.getElementById('mobile-menu');
        const navLinks = document.querySelector('.nav-links');
        const navbar = document.getElementById('navbar');

        // Enhanced mobile menu toggle with gestures
        let touchStartX = 0;
        let touchEndX = 0;

        document.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });

        document.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > 75) {
                this.closeMobileMenu();
            } else if (touchEndX - touchStartX > 75) {
                this.openMobileMenu();
            }
        });

        // Smooth scroll with dynamic offset
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = anchor.getAttribute('href');
                this.smoothScrollTo(target);
                this.closeMobileMenu();
            });
        });

        // Dynamic navbar background
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    setupCardInteractions() {
        const cards = document.querySelectorAll('.module-card');
        
        cards.forEach(card => {
            // Enhanced card hover effect
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Calculate rotation based on mouse position
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `
                    perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    scale3d(1.05, 1.05, 1.05)
                `;
            });

            // Reset card position
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'none';
            });
        });
    }

    setupHeroParallax() {
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.35;
            
            // Parallax effect for hero section
            hero.style.transform = `translateY(${rate}px)`;
            heroContent.style.transform = `translateY(${rate * 0.5}px)`;
            heroContent.style.opacity = 1 - (scrolled * 0.002);
        });
    }

    setupProgressIndicator() {
        // Create and append progress bar
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        document.body.appendChild(progressBar);

        // Update progress bar
        window.addEventListener('scroll', () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrolled = window.scrollY;
            
            const progress = (scrolled / (documentHeight - windowHeight)) * 100;
            progressBar.style.width = `${progress}%`;
        });
    }

    smoothScrollTo(target) {
        const element = document.querySelector(target);
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }

    openMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        const navLinks = document.querySelector('.nav-links');
        
        mobileMenu.classList.add('active');
        navLinks.classList.add('active');
        this.animateMenuItems(true);
    }

    closeMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        const navLinks = document.querySelector('.nav-links');
        
        mobileMenu.classList.remove('active');
        navLinks.classList.remove('active');
        this.animateMenuItems(false);
    }

    animateMenuItems(show) {
        const links = document.querySelectorAll('.nav-link');
        links.forEach((link, index) => {
            link.style.animation = show 
                ? `slideIn 0.5s ease forwards ${index * 0.1}s`
                : '';
        });
    }
}

// Initialize the platform
document.addEventListener('DOMContentLoaded', () => {
    new DNSLearningPlatform();
});

