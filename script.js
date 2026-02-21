/* ==========================================================================
   ABI ABRAHAM JOSEPH - PORTFOLIO v4.1 (DEFINITIVE ELITE)
   Master Script: Bold Vectors + Elite Interactions
   ========================================================================== */

/**
 * 1. Global Navigation & Scroll Progress
 */
const navbar = document.getElementById('navbar');
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
    // Navbar Glass Sync
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // High-End Scroll Progress indicator
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (scrollProgress) scrollProgress.style.width = scrolled + "%";
});

// Mobile Nav Auto-Collapse with Smooth Scroll
const navLinks = document.querySelectorAll('.nav-link');
const navCollapse = document.querySelector('.navbar-collapse');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (targetId.startsWith('#')) {
            e.preventDefault();
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                window.scrollTo({
                    top: targetEl.offsetTop - 70, // Header offset
                    behavior: 'smooth'
                });
            }
        }

        if (window.innerWidth < 992 && navCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navCollapse);
            bsCollapse.hide();
        }
    });
});

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
    // Initial Word Reveal for the Name Title
    const heroTitle = document.querySelector('.reveal-text');
    if (heroTitle && !heroTitle.classList.contains('done')) {
        const text = heroTitle.textContent;
        heroTitle.innerHTML = text.split(' ').map(word => `<span>${word}</span>`).join(' ');
        heroTitle.querySelectorAll('span').forEach((span, i) => {
            setTimeout(() => span.style.opacity = '1', i * 250);
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
 * 3. Enhanced Platinum Vector System (Bold + Inner Glow)
 */
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const particlesContainer = document.getElementById('particles-js');

if (particlesContainer) {
    particlesContainer.appendChild(canvas);

    let particlesArray = [];
    const mouse = { x: null, y: null, radius: 180 };

    window.addEventListener('mousemove', (event) => {
        mouse.x = event.x;
        mouse.y = event.y;

        // Interactive Mesh Background Motion
        const mesh = document.querySelector('.mesh-gradient');
        if (mesh) {
            const x = (event.clientX / window.innerWidth) * 25;
            const y = (event.clientY / window.innerHeight) * 25;
            mesh.style.transform = `translate(${x}px, ${y}px)`;
        }
    });

    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    }
    window.addEventListener('resize', setCanvasSize);
    setCanvasSize();

    class Particle {
        constructor(x, y, dx, dy, size, color) {
            this.x = x;
            this.y = y;
            this.dx = dx;
            this.dy = dy;
            this.size = size;
            this.color = color;
            this.baseX = x;
            this.baseY = y;
            this.density = (Math.random() * 20) + 1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();

            // Subtle glow for the node itself (Referenced style)
            if (this.size > 2) {
                ctx.shadowBlur = 10;
                ctx.shadowColor = 'rgba(79, 70, 229, 0.4)';
            } else {
                ctx.shadowBlur = 0;
            }
        }

        update() {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < mouse.radius) {
                let force = (mouse.radius - dist) / mouse.radius;
                this.x -= (dx / dist) * force * this.density;
                this.y -= (dy / dist) * force * this.density;
            } else {
                if (this.x !== this.baseX) this.x -= (this.x - this.baseX) / 10;
                if (this.y !== this.baseY) this.y -= (this.y - this.baseY) / 10;
            }

            this.x += this.dx;
            this.y += this.dy;
            this.baseX += this.dx;
            this.baseY += this.dy;

            if (this.baseX > canvas.width || this.baseX < 0) this.dx = -this.dx;
            if (this.baseY > canvas.height || this.baseY < 0) this.dy = -this.dy;

            this.draw();
        }
    }

    function initParticles() {
        particlesArray = [];
        let count = (canvas.height * canvas.width) / 8000; // Referenced High Density
        for (let i = 0; i < count; i++) {
            let size = (Math.random() * 3.5) + 1.0;
            let x = Math.random() * canvas.width;
            let y = Math.random() * canvas.height;
            let dx = (Math.random() * 0.4) - 0.2;
            let dy = (Math.random() * 0.4) - 0.2;
            let color = 'rgba(79, 70, 229, 0.5)';
            particlesArray.push(new Particle(x, y, dx, dy, size, color));
        }
    }

    function connect() {
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let dx = particlesArray[a].x - particlesArray[b].x;
                let dy = particlesArray[a].y - particlesArray[b].y;
                let dist = dx * dx + dy * dy;

                let range = (canvas.width / 8) * (canvas.height / 8);
                if (dist < range) {
                    let opacity = 1 - (dist / range);
                    ctx.strokeStyle = `rgba(79, 70, 229, ${opacity * 0.4})`;
                    ctx.lineWidth = 1.5; // Bold Connection (Optimized balance)

                    // Constellation glow
                    ctx.shadowBlur = 5;
                    ctx.shadowColor = 'rgba(79, 70, 229, 0.2)';

                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                    ctx.shadowBlur = 0;
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesArray.forEach(p => p.update());
        connect();
        requestAnimationFrame(animate);
    }
}

/**
 * 4. Cinematic Intersection Observers (Skew-Scale Engine)
 */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');

            // Mastery Bar trigger
            const bars = entry.target.querySelectorAll('.mastery-bar');
            bars.forEach(bar => {
                const targetW = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => bar.style.width = targetW, 200);
            });

            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: "0px 0px -10px 0px" });

function initGlobalReveals() {
    // Cinematic Page Loader logic
    const loader = document.getElementById('pageReveal');
    if (loader) {
        setTimeout(() => loader.classList.add('loaded'), 500);
    }

    document.querySelectorAll('section, .glass-card, .mastery-card, .exp-item, .category-card, .contact-link').forEach((el, i) => {
        el.classList.add('reveal-on-scroll');
        // Cinematic Stagger Logic
        if (el.parentElement.classList.contains('row') || el.parentElement.classList.contains('skills-category-grid')) {
            el.style.transitionDelay = `${(i % 5) * 0.15}s`;
        }
        revealObserver.observe(el);
    });
}

/**
 * 5. Magnetic Physics & 3D Parallax
 */
function initEliteInteractions() {
    if (window.innerWidth <= 992) return;

    // Magnetic Buttons
    const magnets = document.querySelectorAll('.btn-modern');
    magnets.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`;
            btn.style.boxShadow = '0 10px 30px rgba(79, 70, 229, 0.2)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0px, 0px) scale(1)`;
            btn.style.boxShadow = 'none';
        });
    });

    // 3D Para-Tilt
    const cards = document.querySelectorAll('.glass-card, .mastery-card, .profile-wrapper');
    cards.forEach(card => {
        card.style.transition = 'transform 0.1s ease-out, box-shadow 0.3s ease';
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const xc = rect.width / 2;
            const yc = rect.height / 2;
            card.style.transform = `perspective(1000px) rotateX(${(yc - y) / 15}deg) rotateY(${(x - xc) / 15}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });
}

/**
 * Main Initialization
 */
document.addEventListener('DOMContentLoaded', () => {
    handleTypewriter();
    if (particlesContainer) animate();
    initGlobalReveals();
    initEliteInteractions();

    // Final Signature Handover logic
    console.log(
        "%c Abi Abraham Joseph %c Definitive Elite Portfolio v5.1 Platinum %c",
        "color: #fff; background: #4f46e5; padding: 5px 12px; border-radius: 4px 0 0 4px; font-weight: bold;",
        "color: #4f46e5; background: #f1f5f9; padding: 5px 12px; border-radius: 0 4px 4px 0; font-weight: bold;",
        "color: #94a3b8; margin-left: 10px; font-style: italic;"
    );
});
