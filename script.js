/* =========================
   NAVBAR SCROLL EFFECT
   ========================= */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

/* =========================
   TYPEWRITER EFFECT
   ========================= */
const typewriterElement = document.getElementById('typewriter');
const roles = [
    'IT Administrator',
    'System Admin',
    'Technical Support Specialist',
    'Cybersecurity Aspirant'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
        typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 150;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

document.addEventListener('DOMContentLoaded', type);

/* =========================
   ENHANCED PARTICLE SYSTEM
   ========================= */
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const particlesContainer = document.getElementById('particles-js');

if (particlesContainer) {
    particlesContainer.appendChild(canvas);

    let particlesArray = [];
    let mouse = {
        x: null,
        y: null,
        radius: 150
    };

    window.addEventListener('mousemove', (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
            this.baseX = x;
            this.baseY = y;
            this.density = (Math.random() * 20) + 1; // Lower density for smoother trailing
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();

            // Subtle glow for the node itself
            if (this.size > 2) {
                ctx.shadowBlur = 10;
                ctx.shadowColor = 'rgba(109, 40, 217, 0.4)';
            } else {
                ctx.shadowBlur = 0;
            }
        }

        update() {
            // Check mouse distance
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            let maxDistance = mouse.radius;
            let force = (maxDistance - distance) / maxDistance;
            let directionX = forceDirectionX * force * this.density;
            let directionY = forceDirectionY * force * this.density;

            if (distance < mouse.radius) {
                this.x -= directionX;
                this.y -= directionY;
            } else {
                if (this.x !== this.baseX) {
                    let dx = this.x - this.baseX;
                    this.x -= dx / 10;
                }
                if (this.y !== this.baseY) {
                    let dy = this.y - this.baseY;
                    this.y -= dy / 10;
                }
            }

            // Boundary checks for floating
            this.x += this.directionX;
            this.y += this.directionY;

            if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
            if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;

            this.draw();
        }
    }

    function init() {
        particlesArray = [];
        let numberOfParticles = (canvas.height * canvas.width) / 8000; // Increased density from 12000
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 3.5) + 1.0; // Slightly larger particles
            let x = (Math.random() * canvas.width);
            let y = (Math.random() * canvas.height);
            let directionX = (Math.random() * 0.4) - 0.2;
            let directionY = (Math.random() * 0.4) - 0.2;
            let color = 'rgba(79, 70, 229, 0.5)'; // Matches --primary

            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connect();
    }

    function connect() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                    ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));

                let range = (canvas.width / 10) * (canvas.height / 10);
                if (distance < range) {
                    opacityValue = 1 - (distance / range);
                    ctx.strokeStyle = `rgba(79, 70, 229, ${opacityValue * 0.5})`;
                    ctx.lineWidth = (1 - (distance / range)) * 2.5; // Bold lines (increased from 1.5)

                    // Constellation glow effect
                    ctx.shadowBlur = 5;
                    ctx.shadowColor = 'rgba(79, 70, 229, 0.2)';

                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();

                    // Reset shadow for performance
                    ctx.shadowBlur = 0;
                }
            }
        }
    }

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });

    // Start animations
    init();
    animate();
}

/* =========================
   MASTERY BAR ANIMATION
   ========================= */
const masteryObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll('.mastery-bar');
            bars.forEach(bar => {
                const targetWidth = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = targetWidth;
                }, 100);
            });
            masteryObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const techSection = document.getElementById('expertise');
if (techSection) {
    masteryObserver.observe(techSection);
}

/* =========================
   MOBILE ACCESSIBILITY
   ========================= */
// Close mobile nav on click
const navLinks = document.querySelectorAll('.nav-link');
const navCollapse = document.querySelector('.navbar-collapse');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 992) {
            const bsCollapse = new bootstrap.Collapse(navCollapse);
            bsCollapse.hide();
        }
    });
});

// Final Signature Handover logic
console.log("%c Abi Abraham Joseph - Portfolio v2.0 Finalized %c", "color: #fff; background: #4f46e5; padding: 5px 0;", "background: transparent;");

/* =========================
   PREMIUM REVEAL ANIMATIONS
   ========================= */
const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, revealOptions);

document.querySelectorAll('section, .glass-card, .mastery-card').forEach(el => {
    el.classList.add('reveal-on-scroll');
    revealObserver.observe(el);
});

/* =========================
   3D TILT EFFECT (DESKTOP)
   ========================= */
if (window.innerWidth > 992) {
    const cards = document.querySelectorAll('.glass-card, .mastery-card, .profile-wrapper');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });
}
