// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector(link.getAttribute('href'))
            .scrollIntoView({ behavior: 'smooth' });
    });
});

// Breadcrumbs functionality
const crumbsMap = {
    home: 'Home',
    how: 'Home / Cómo Funciona',
    benefits: 'Home / Beneficios',
    causes: 'Home / Causas',
    security: 'Home / Seguridad',
    faq: 'Home / FAQ'
};

const bc = document.getElementById('breadcrumbs');
document.querySelectorAll('section[id]').forEach(sec => {
    new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) bc.textContent = crumbsMap[entry.target.id];
        });
    }, { threshold: 0.5 }).observe(sec);
});

// Theme toggle functionality
const toggle = document.getElementById('theme-toggle');
const heroImg = document.getElementById('hero-img');

const applyTheme = theme => {
    if (theme === 'light') {
        document.body.setAttribute('data-theme', 'light');
        heroImg.src = 'hero.png';
    } else {
        document.body.removeAttribute('data-theme');
        heroImg.src = 'hero.png';
    }
};

// Load saved theme or default to dark
const saved = localStorage.getItem('theme');
applyTheme(saved === 'light' ? 'light' : 'dark');

// Theme toggle click handler
toggle.addEventListener('click', () => {
    const next = document.body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', next);
    applyTheme(next);
});

// FAQ Accordion functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all other items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Toggle current item
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Causes Carousel functionality
const carousel = {
    track: document.querySelector('.causes-track'),
    cards: document.querySelectorAll('.cause-card'),
    
    init() {
        // Duplicar las cards para crear el efecto infinito
        this.cards.forEach(card => {
            const clone = card.cloneNode(true);
            this.track.appendChild(clone);
        });
    }
};

// Initialize carousel
carousel.init(); 