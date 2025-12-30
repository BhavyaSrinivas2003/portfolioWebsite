// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const headerActions = document.querySelector('.header-actions');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    headerActions.classList.toggle('active');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        // Close mobile menu
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        headerActions.classList.remove('active');
    });
});

// Add this to your existing script.js (after smooth scrolling)
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});


// Enhanced Skills Animation
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.querySelectorAll('.skill-card').forEach((card, i) => {
                    setTimeout(() => card.classList.add('animate'), i * 100);
                });
            }, 200);
        }
    });
}, { threshold: 0.1 });
skillObserver.observe(document.querySelector('#skills'));

// Progress Bars with Data Attributes
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.progress-fill').forEach(fill => {
                const width = fill.getAttribute('data-width');
                fill.style.width = width;
            });
        }
    });
});
document.querySelectorAll('.skill-progress').forEach(el => progressObserver.observe(el));

// Enhanced Project Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        projectCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.transform = 'scale(1)';
                card.style.opacity = '1';
            } else {
                card.style.transform = 'scale(0.8)';
                card.style.opacity = '0.3';
            }
        });
    });
});

// Section Scroll Animations
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.section, .experience-card, .project-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s ease';
    sectionObserver.observe(el);
});

// Particle System for Hero
// function createParticles() {
//     const canvas = document.getElementById('particles');
//     const ctx = canvas.getContext('2d');
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;

//     const particles = [];
//     for (let i = 0; i < 100; i++) {
//         particles.push({
//             x: Math.random() * canvas.width,
//             y: Math.random() * canvas.height,
//             vx: (Math.random() - 0.5) * 0.5,
//             vy: (Math.random() - 0.5) * 0.5,
//             radius: Math.random() * 2 + 1
//         });
//     }

//     function animate() {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         particles.forEach(p => {
//             ctx.beginPath();
//             ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
//             ctx.fillStyle = 'rgba(102, 126, 234, 0.3)';
//             ctx.fill();

//             p.x += p.vx;
//             p.y += p.vy;

//             if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
//             if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
//         });
//         requestAnimationFrame(animate);
//     }
//     animate();

//     window.addEventListener('resize', () => {
//         canvas.width = window.innerWidth;
//         canvas.height = window.innerHeight;
//     });
// }
// Enhanced Dark Particles - Perfect for your hero
function createParticles() {
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    for (let i = 0; i < 120; i++) {  // More particles
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8,
            radius: Math.random() * 3 + 1.5,  // Larger
            opacity: Math.random() * 0.6 + 0.3  // Dynamic opacity
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            // Dynamic dark gradient particles
            const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
            gradient.addColorStop(0, `rgba(102, 126, 234, ${p.opacity})`);  // Your blue theme
            gradient.addColorStop(1, `rgba(118, 75, 162, ${p.opacity * 0.4})`);  // Purple accent
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
            
            // Subtle glow effect
            ctx.shadowColor = 'rgba(102, 126, 234, 0.5)';
            ctx.shadowBlur = 8;
            ctx.fill();

            p.x += p.vx;
            p.y += p.vy;

            // Bounce off edges
            if (p.x < p.radius || p.x > canvas.width - p.radius) p.vx *= -1;
            if (p.y < p.radius || p.y > canvas.height - p.radius) p.vy *= -1;
        });
        
        // Reset shadow
        ctx.shadowBlur = 0;
        requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}
createParticles();

// Typing Animation for About
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

// Initialize typing after load
window.addEventListener('load', () => {
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        typeWriter(typingText, typingText.dataset.text || typingText.textContent);
    }
});

// Modal System for Experience/Projects
document.addEventListener('click', (e) => {
    // if (e.target.classList.contains('view-details') || e.target.closest('.project-card')) {
    if (e.target.classList.contains('view-details')) {
        e.preventDefault();
        const modalId = e.target.closest('[data-modal]').dataset.modal;
        showModal(modalId);
    }
});

document.addEventListener('click', (e) => {
    const btn = e.target.closest('.view-details');
    if (!btn) return;

    const card = btn.closest('[data-modal]');
    if (!card) return;

    e.preventDefault();
    showModal(card);
});

function showModal(card) {
    const modalContainer = document.getElementById('modal-container');

    const title = card.querySelector('h3')?.innerText || '';
    // const duration = card.querySelector('.exp-header span')?.innerText || '';
    const skills = card.querySelector('.exp-skills')?.innerHTML || '';
    const achievements = card.querySelector('.exp-achievements')?.innerHTML || '';

    modalContainer.innerHTML = `
        <div class="modal-overlay active" onclick="this.remove()">
            <div class="modal-content" onclick="event.stopPropagation()">
                <h3>${title}</h3>
                <div class="modal-skills">${skills}</div>
                <br>
                <h4>Key Contributions</h4>
                <ul>${achievements}</ul>

                <button class="btn btn-primary" onclick="this.closest('.modal-overlay').remove()">
                    Close
                </button>
            </div>
        </div>
    `;
}

// Parallax Effect on Scroll
/*
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});
*/
// Scroll Up Button - HIDE in Hero Section ONLY
const scrollUp = document.getElementById('scrollUp');
const heroSection = document.getElementById('home');

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const heroBottom = heroSection.offsetTop + heroSection.clientHeight;
    
    // Show if scrolled >300px AND past Hero section
    if (scrollPosition > 300 && scrollPosition > heroBottom) {
        scrollUp.classList.add('show');
    } else {
        scrollUp.classList.remove('show');
    }
});

scrollUp.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
