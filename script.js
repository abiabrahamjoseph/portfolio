/* ==========================================================================
   ABI ABRAHAM JOSEPH - PORTFOLIO v6.0 (MASTER PLATINUM EDITION)
   Script Suite: Bespoke Anim-Engine + Failsafe Rendering
   ========================================================================== */

/**
 * 1. Project Grand Master Signature Cursor (v8.0)
 */
function initCustomCursor() {
    if (window.innerWidth < 992) return;

    const cursor = document.getElementById('customCursor');
    const follower = document.getElementById('cursorFollower');
    if (!cursor || !follower) return;

    cursor.style.display = 'block';
    follower.style.display = 'block';

    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate3d(${e.clientX - 10}px, ${e.clientY - 10}px, 0)`;
        follower.style.transform = `translate3d(${e.clientX - 20}px, ${e.clientY - 20}px, 0)`;
    });

    document.querySelectorAll('a, button, .glass-card, .mastery-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform += ' scale(2.5)';
            cursor.style.opacity = '0.5';
            follower.style.transform += ' scale(0.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = cursor.style.transform.replace(' scale(2.5)', '');
            cursor.style.opacity = '1';
            follower.style.transform = follower.style.transform.replace(' scale(0.5)', '');
        });
    });
}

/**
 * 2. Intelligent Navigation (v8.1 High-Precision)
 */
function initNavSync() {
    const navbar = document.getElementById('navbar');
    const scrollProgress = document.getElementById('scrollProgress');
    const sections = document.querySelectorAll('section[id]');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        // Navbar State
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
            navbar.style.transform = window.scrollY > lastScrollY ? 'translateY(-100%)' : 'translateY(0)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollY = window.scrollY;

        // Selection Logic Corrected: High-Precision Active State
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute("id");
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });

        // Progress
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / height) * 100;
        if (scrollProgress) scrollProgress.style.width = scrolled + "%";
    });

    // Mobile Collapse
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            const collapse = document.querySelector('.navbar-collapse');
            if (collapse.classList.contains('show')) {
                new bootstrap.Collapse(collapse).hide();
            }
        });
    });
}

/**
 * 2. Typewriter Effect (Cinematic Word Reveal + Technical Roles)
 */
const roles = [
    'IT Administrator',
    'System Admin',
    'Technical Support Specialist',
    'Enterprise Infrastructure Specialist',
    'Expert IT Analyst',
    'Cybersecurity Aspirant'
];

let roleIdx = 0;
let charIdx = 0;
let isDeleting = false;
let typeSpeed = 100;

function handleTypewriter() {
    // Initial Name Title Word Reveal
    const heroTitle = document.querySelector('.reveal-text');
    if (heroTitle && !heroTitle.classList.contains('done')) {
        const text = heroTitle.textContent;
        heroTitle.innerHTML = text.split(' ').map(word => `<span>${word}</span>`).join(' ');
        heroTitle.querySelectorAll('span').forEach((span, i) => {
            setTimeout(() => span.style.opacity = '1', i * 150);
        });
        heroTitle.classList.add('done');
    }

    const typewriterEl = document.getElementById('typewriter');
    if (!typewriterEl) return;

    const currentRole = roles[roleIdx];

    if (isDeleting) {
        typewriterEl.textContent = currentRole.substring(0, charIdx - 1);
        charIdx--;
        typeSpeed = 50;
    } else {
        typewriterEl.textContent = currentRole.substring(0, charIdx + 1);
        charIdx++;
        typeSpeed = 150;
    }

    if (!isDeleting && charIdx === currentRole.length) {
        isDeleting = true;
        typeSpeed = 2500; // Technical pause at end
    } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        typeSpeed = 500;
    }

    setTimeout(handleTypewriter, typeSpeed);
}

/**
 * 3. Platinum Vector Constellation (v6.4 Optimized)
 */
/**
 * 3. Grand Master Vector Constellation (v8.1 High-Impact)
 */
function initParticlesEngine() {
    const container = document.getElementById('particles-js');
    if (!container) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    container.appendChild(canvas);

    let particles = [];
    const mouse = { x: null, y: null, radius: 200 };

    window.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    function init() {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
        particles = [];
        let count = Math.min((canvas.width * canvas.height) / 7000, 180);
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                dx: (Math.random() - 0.5) * 0.8,
                dy: (Math.random() - 0.5) * 0.8,
                size: Math.random() * 2 + 1,
                color: 'rgba(99, 102, 241, 0.5)'
            });
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.x += p.dx;
            p.y += p.dy;

            if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

            // Draw Node
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();

            // Interactivity
            let dx = mouse.x - p.x;
            let dy = mouse.y - p.y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouse.radius) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(99, 102, 241, ${0.4 * (1 - dist / mouse.radius)})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
            }

            // Connection Logic
            particles.forEach(p2 => {
                let dx = p.x - p2.x;
                let dy = p.y - p2.y;
                let dist = dx * dx + dy * dy;
                if (dist < 10000) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(99, 102, 241, ${0.2 * (1 - dist / 10000)})`;
                    ctx.lineWidth = 0.8;
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            });
        });
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', init);
    init();
    animate();
}

/**
 * 4. Master Reveal Engine (v6.4 Bulletproof)
 */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            const bars = entry.target.querySelectorAll('.mastery-bar');
            bars.forEach(bar => {
                const targetW = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => bar.style.width = targetW, 300);
            });
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: "0px 0px -30px 0px" });

function initGlobalReveals() {
    const loader = document.getElementById('pageReveal');
    const dismissLoader = () => {
        if (loader) {
            loader.classList.add('loaded');
            setTimeout(() => { if (loader) loader.style.display = 'none'; }, 1500);
        }

        // RE-ENABLED: CINEMATIC STAGGER ENGINE
        // Triggers reveal-on-scroll elements with a sequential delay
        document.querySelectorAll('.reveal-on-scroll:not(.revealed)').forEach((el, i) => {
            setTimeout(() => el.classList.add('revealed'), i * 120);
        });
    };

    // 1. First, tag all elements for reveal
    document.querySelectorAll('section, .glass-card, .mastery-card, .exp-item, .category-card, .contact-link').forEach((el, i) => {
        el.classList.add('reveal-on-scroll');
        if (el.parentElement && (el.parentElement.classList.contains('row') || el.parentElement.classList.contains('skills-category-grid'))) {
            el.style.transitionDelay = `${(i % 4) * 0.15}s`;
        }
        revealObserver.observe(el);
    });

    // 2. ONLY THEN trigger the reveal
    dismissLoader();
}

/**
 * 5. Premium Interactive Physics
 */
function initEliteInteractions() {
    if (window.innerWidth <= 992) return;
    document.querySelectorAll('.btn-modern').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px) scale(1.04)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0) scale(1)';
        });
    });
    document.querySelectorAll('.glass-card, .mastery-card, .profile-wrapper').forEach(card => {
        card.style.transition = 'transform 0.15s ease-out, box-shadow 0.3s ease';
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            const rotateX = (0.5 - y) * 12;
            const rotateY = (x - 0.5) * 12;
            card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1200px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

/**
 * Main Orchestrator (Project Grand Master v8.0)
 */
document.addEventListener('DOMContentLoaded', () => {
    initGlobalReveals();
    document.documentElement.classList.add('js-active');

    // Grand Master Dynamic Triggers
    initCustomCursor();
    initNavSync();
    handleTypewriter();
    initParticlesEngine();
    initEliteInteractions();

    console.log(
        "%c Abi Abraham Joseph %c Grand Master v8.9 %c",
        "color: #fff; background: #6366f1; padding: 5px 12px; border-radius: 4px 0 0 4px; font-weight: bold;",
        "color: #6366f1; background: #f8fafc; padding: 5px 12px; border-radius: 0 4px 4px 0; font-weight: bold;",
        "color: #94a3b8; margin-left: 10px; font-style: italic;"
    );
});
