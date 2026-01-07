/* =============================================
   NAVIGATION
   ============================================= */

// Menu mobile toggle
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

// Ouvrir le menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

// Fermer le menu
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

// Fermer le menu lors du clic sur un lien
const navLinks = document.querySelectorAll('.nav__link');

function linkAction() {
    navMenu.classList.remove('show-menu');
}
navLinks.forEach(link => link.addEventListener('click', linkAction));

/* =============================================
   SCROLL HEADER
   ============================================= */
function scrollHeader() {
    const header = document.getElementById('header');
    if (this.scrollY >= 50) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
    }
}
window.addEventListener('scroll', scrollHeader);

/* =============================================
   ACTIVE LINK ON SCROLL
   ============================================= */
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__link[href*=' + sectionId + ']')?.classList.add('active-link');
        } else {
            document.querySelector('.nav__link[href*=' + sectionId + ']')?.classList.remove('active-link');
        }
    });
}
window.addEventListener('scroll', scrollActive);

/* =============================================
   SCROLL TO TOP BUTTON
   ============================================= */
const scrollTop = document.getElementById('scroll-top');

function toggleScrollTop() {
    if (this.scrollY >= 560) {
        scrollTop.classList.add('show');
    } else {
        scrollTop.classList.remove('show');
    }
}
window.addEventListener('scroll', toggleScrollTop);

// Scroll to top on click
if (scrollTop) {
    scrollTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* =============================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ============================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/* =============================================
   ANIMATION ON SCROLL (AOS)
   ============================================= */
const animateOnScroll = () => {
    const elements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                
                // Délay personnalisé
                const delay = entry.target.getAttribute('data-aos-delay');
                if (delay) {
                    entry.target.style.transitionDelay = delay + 'ms';
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => observer.observe(element));
};

// Initialiser l'animation au chargement
window.addEventListener('DOMContentLoaded', animateOnScroll);

/* =============================================
   COUNTER ANIMATION FOR STATS
   ============================================= */
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat__number');
    const speed = 200; // Vitesse de l'animation

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const counter = entry.target;
                const target = counter.innerText;
                let count = 0;
                
                // Extraire le nombre du texte
                const number = parseInt(target.replace(/[^0-9]/g, ''));
                const suffix = target.replace(/[0-9]/g, '');
                
                const updateCount = () => {
                    const increment = number / speed;
                    
                    if (count < number) {
                        count += increment;
                        counter.innerText = Math.ceil(count) + suffix;
                        setTimeout(updateCount, 1);
                    } else {
                        counter.innerText = target;
                    }
                };
                
                updateCount();
                counter.classList.add('counted');
            }
        });
    }, {
        threshold: 0.5
    });

    counters.forEach(counter => observer.observe(counter));
};

window.addEventListener('DOMContentLoaded', animateCounters);

/* =============================================
   SERVICE CARDS TILT EFFECT
   ============================================= */
const serviceCards = document.querySelectorAll('.service__card, .why-us__card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'transform 0.1s ease';
    });
    
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        this.style.transition = 'transform 0.5s ease';
    });
});

/* =============================================
   LOADING ANIMATION
   ============================================= */
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

/* =============================================
   PERFORMANCE OPTIMIZATION
   ============================================= */

// Lazy loading pour les images
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback pour les navigateurs qui ne supportent pas le lazy loading natif
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Debounce pour les événements scroll
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Appliquer le debounce aux fonctions scroll
window.addEventListener('scroll', debounce(scrollHeader));
window.addEventListener('scroll', debounce(scrollActive));
window.addEventListener('scroll', debounce(toggleScrollTop));

/* =============================================
   FORM VALIDATION (pour future implementation)
   ============================================= */
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

const validatePhone = (phone) => {
    const re = /^(\+221)?[0-9]{9}$/;
    return re.test(String(phone).replace(/\s/g, ''));
};

/* =============================================
   CONSOLE MESSAGE
   ============================================= */
console.log('%c🚀 DIGISN - Solutions Digitales & Informatiques', 
    'color: #2ecc71; font-size: 20px; font-weight: bold;');
console.log('%c📍 Dakar, Guédiawaye - Sénégal', 
    'color: #f39c12; font-size: 14px;');
console.log('%c📞 Contact: 78 307 32 15 | ✉️ yanchitherapper@gmail.com', 
    'color: #34495e; font-size: 12px;');
console.log('%c💻 Développé avec ❤️ pour propulser votre présence digitale', 
    'color: #7f8c8d; font-size: 11px; font-style: italic;');

/* =============================================
   ERROR HANDLING
   ============================================= */
window.addEventListener('error', (e) => {
    console.error('Une erreur est survenue:', e.error);
});

// Service Worker pour le mode offline (futur développement)
if ('serviceWorker' in navigator) {
    // Prêt pour PWA dans le futur
    console.log('Service Worker ready for PWA implementation');
}
