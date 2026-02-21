/* =========================
   NAVBAR SCROLL EFFECT
   ========================= */
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 80) { // Slightly deeper threshold for stability
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
        let numberOfParticles = (canvas.height * canvas.width) / 12000; // Optimal density for professionalism
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2.5) + 0.5; // Varied sizes for depth mapping
            let x = (Math.random() * canvas.width);
            let y = (Math.random() * canvas.height);
            let directionX = (Math.random() * 0.4) - 0.2;
            let directionY = (Math.random() * 0.4) - 0.2;
            let color = 'rgba(109, 40, 217, 0.6)'; // Bold Purple

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
                    ctx.strokeStyle = `rgba(109, 40, 217, ${opacityValue * 0.5})`;
                    ctx.lineWidth = (1 - (distance / range)) * 1.5; // Dynamic weight

                    // Constellation glow effect
                    ctx.shadowBlur = 5;
                    ctx.shadowColor = 'rgba(109, 40, 217, 0.3)';

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

const techSection = document.getElementById('expertise'); // Updated from tech-mastery
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
