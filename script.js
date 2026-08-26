/* ============================================
   LINK-IN-BIO - Interactive Animations
   Palette: Rosso Neon + Rosso Scuro + Nero + Giallo + Ciano
   ============================================ */

// ---- Floating Particles ----
(function initParticles() {
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let w, h;
    let animating = true;

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.size = Math.random() * 1.5 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.2;
            this.speedY = (Math.random() - 0.5) * 0.2;
            this.opacity = Math.random() * 0.3 + 0.05;
            this.pulse = Math.random() * Math.PI * 2;
            this.pulseSpeed = Math.random() * 0.01 + 0.003;
            const colors = [
                [255, 43, 52],    // Rosso Neon
                [255, 223, 0],    // Giallo Elettrico
                [56, 225, 255],   // Ciano Glitch
            ];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.pulse += this.pulseSpeed;

            if (this.x < -10 || this.x > w + 10 || this.y < -10 || this.y > h + 10) {
                this.reset();
                this.x = Math.random() * w;
                this.y = Math.random() < 0.5 ? -5 : h + 5;
            }
        }

        draw() {
            const currentOpacity = this.opacity * (0.6 + 0.4 * Math.sin(this.pulse));
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${currentOpacity})`;
            ctx.fill();
        }
    }

    // Reduced particle count for better performance
    const count = Math.min(Math.floor((w * h) / 25000), 35);
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }

    function animate() {
        if (!animating) return;
        ctx.clearRect(0, 0, w, h);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    // Pause animations when tab is not visible
    document.addEventListener('visibilitychange', () => {
        animating = !document.hidden;
        if (animating) animate();
    });

    animate();
})();

// ---- Coin Burst Animation ----
(function initCoinBurst() {
    const btn = document.getElementById('donateBtn');
    if (!btn) return;

    const coins = ['🪙', '⭐', '✨', '🔥'];
    let isAnimating = false;

    btn.addEventListener('click', function(e) {
        if (isAnimating) return;
        isAnimating = true;

        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const coin = document.createElement('div');
                coin.className = 'coin';
                coin.textContent = coins[Math.floor(Math.random() * coins.length)];
                
                const rect = this.getBoundingClientRect();
                const startX = rect.left + rect.width / 2 + (Math.random() - 0.5) * 60;
                const startY = rect.top;
                
                coin.style.left = startX + 'px';
                coin.style.top = startY + 'px';
                coin.style.setProperty('--random-x', (Math.random() - 0.5) * 80 + 'px');
                
                document.body.appendChild(coin);
                
                setTimeout(() => coin.remove(), 1200);
            }, i * 60);
        }

        setTimeout(() => { isAnimating = false; }, 600);
    });
})();

// ---- Magnetic Hover Effect on Cards ----
(function initMagnetic() {
    document.querySelectorAll('.link-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const moveX = x * 0.05;
            const moveY = y * 0.05;
            card.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }, { passive: true });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        }, { passive: true });
    });
})();

// ---- Ripple Effect on Donate Button ----
(function initRipple() {
    const btn = document.getElementById('donateBtn');
    if (!btn) return;

    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 2;
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255,255,255,0.2);
            border-radius: 50%;
            transform: scale(0);
            animation: rippleOut 0.6s ease-out forwards;
            pointer-events: none;
        `;

        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });

    const style = document.createElement('style');
    style.textContent = `
        @keyframes rippleOut {
            to { transform: scale(1); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
})();

// ---- Tilt Effect on Donation Card ----
(function initTilt() {
    const card = document.querySelector('.donation-card');
    if (!card) return;

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(600px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
    }, { passive: true });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform 0.4s ease';
        setTimeout(() => card.style.transition = '', 400);
    }, { passive: true });
})();

// ---- Subtle parallax on scroll ----
(function initParallax() {
    const profile = document.querySelector('.profile');
    if (!profile) return;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const maxScroll = 300;
        if (scrollY < maxScroll) {
            const factor = 1 - scrollY / maxScroll;
            profile.style.opacity = 0.3 + 0.7 * factor;
            profile.style.transform = `translateY(${scrollY * 0.15}px)`;
        }
    }, { passive: true });
})();
