// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Smooth scroll with active link highlighting
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });

    // Glass navbar scroll effect
    const nav = document.getElementById('main-nav');
    if (window.scrollY > 50) {
        nav.style.width = 'calc(100% - 2rem)';
        nav.style.borderRadius = '20px';
    } else {
        nav.style.width = 'calc(100% - 4rem)';
        nav.style.borderRadius = '50px';
    }
});

// Form Submission (Staging)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        console.log('Form Submitted:', data);
        
        // Show success state
        const btn = contactForm.querySelector('button');
        const originalText = btn.textContent;
        btn.textContent = 'Message Sent!';
        btn.style.background = 'var(--tertiary)';
        btn.disabled = true;

        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = 'linear-gradient(135deg, var(--primary) 0%, var(--primary-container) 100%)';
            btn.disabled = false;
            contactForm.reset();
        }, 3000);
    });
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.glass, section h2, .hero-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
});

// CSS for the scroll animation injected via JS
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);
