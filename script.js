/* ============================================
   NEZU — interazioni 2.0
   ============================================ */

(function () {
    'use strict';

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const canAnimate = () => !reduceMotion.matches;

    /* ---- Particle background ---- */
    (function initParticles() {
        const canvas = document.getElementById('particles');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const COLORS = [
            [255, 43, 52],
            [255, 223, 0],
            [56, 225, 255],
            [255, 255, 255]
        ];

        let particles = [];
        let w = 0;
        let h = 0;
        let running = false;
        let resizeTimer = 0;

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.size = Math.random() * 2.1 + 0.6;
                this.speedX = (Math.random() - 0.5) * 0.28;
                this.speedY = (Math.random() - 0.5) * 0.28;
                this.opacity = Math.random() * 0.4 + 0.1;
                this.pulse = Math.random() * Math.PI * 2;
                this.pulseSpeed = Math.random() * 0.015 + 0.004;
                this.spark = Math.random() < 0.12;
                this.sparkBig = Math.random() < 0.04;
                this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.pulse += this.pulseSpeed;

                if (this.x < -10 || this.x > w + 10 || this.y < -10 || this.y > h + 10) {
                    this.x = Math.random() * w;
                    this.y = Math.random() < 0.5 ? -5 : h + 5;
                }
            }

            draw() {
                const alpha = this.opacity * (0.6 + 0.4 * Math.sin(this.pulse));
                const [r, g, b] = this.color;

                if (this.sparkBig) {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.15})`;
                    ctx.fill();
                }

                ctx.beginPath();
                ctx.arc(this.x, this.y, this.spark ? this.size * 0.6 : this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
                ctx.fill();
            }
        }

        function build() {
            const count = Math.min(Math.floor((w * h) / 11500), 140);
            particles = new Array(count);
            for (let i = 0; i < count; i++) particles[i] = new Particle();
        }

        function resize() {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            w = window.innerWidth;
            h = window.innerHeight;

            canvas.width = Math.round(w * dpr);
            canvas.height = Math.round(h * dpr);
            canvas.style.width = w + 'px';
            canvas.style.height = h + 'px';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            build();
            if (!running) drawStatic();
        }

        function drawStatic() {
            ctx.clearRect(0, 0, w, h);
            for (let i = 0; i < particles.length; i++) particles[i].draw();
        }

        function loop() {
            if (!running) return;
            ctx.clearRect(0, 0, w, h);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
            requestAnimationFrame(loop);
        }

        function start() {
            if (running || !canAnimate()) return;
            running = true;
            requestAnimationFrame(loop);
        }

        function stop() {
            running = false;
        }

        resize();

        window.addEventListener('resize', function () {
            window.clearTimeout(resizeTimer);
            resizeTimer = window.setTimeout(resize, 180);
        }, { passive: true });

        document.addEventListener('visibilitychange', function () {
            if (document.hidden) stop();
            else start();
        });

        reduceMotion.addEventListener('change', function () {
            if (canAnimate()) start();
            else { stop(); drawStatic(); }
        });

        if (canAnimate()) start();
    })();

    /* ---- Coin burst on donate ---- */
    (function initCoinBurst() {
        const btn = document.getElementById('donateBtn');
        if (!btn) return;

        const coins = ['🪙', '⭐', '✨', '🔥'];
        let busy = false;

        btn.addEventListener('click', function () {
            if (!canAnimate() || busy) return;
            busy = true;

            for (let i = 0; i < 8; i++) {
                window.setTimeout(function () {
                    const coin = document.createElement('div');
                    coin.className = 'coin';
                    coin.textContent = coins[Math.floor(Math.random() * coins.length)];

                    const rect = btn.getBoundingClientRect();
                    coin.style.left = (rect.left + rect.width / 2 + (Math.random() - 0.5) * 60) + 'px';
                    coin.style.top = rect.top + 'px';
                    coin.style.setProperty('--random-x', ((Math.random() - 0.5) * 80) + 'px');

                    document.body.appendChild(coin);
                    window.setTimeout(function () { coin.remove(); }, 1200);
                }, i * 60);
            }

            window.setTimeout(function () { busy = false; }, 600);
        });
    })();

    /* ---- Magnetic hover on social cards ---- */
    (function initMagnetic() {
        if (!finePointer.matches) return;

        document.querySelectorAll('.link-card').forEach(function (card) {
            let rect = null;

            card.addEventListener('mouseenter', function () {
                if (!canAnimate()) return;
                rect = card.getBoundingClientRect();
            }, { passive: true });

            card.addEventListener('mousemove', function (e) {
                if (!rect || !canAnimate()) return;
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                card.style.setProperty('--mx', (x * 0.05).toFixed(2) + 'px');
                card.style.setProperty('--my', (y * 0.05).toFixed(2) + 'px');
            }, { passive: true });

            card.addEventListener('mouseleave', function () {
                rect = null;
                card.style.setProperty('--mx', '0px');
                card.style.setProperty('--my', '0px');
            }, { passive: true });
        });
    })();

    /* ---- Subtle 3D tilt on the support card ---- */
    (function initTilt() {
        if (!finePointer.matches) return;

        const card = document.getElementById('supportCard');
        if (!card) return;

        card.addEventListener('mousemove', function (e) {
            if (!canAnimate()) return;
            const rect = card.getBoundingClientRect();
            if (rect.height > window.innerHeight) return;

            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `perspective(900px) rotateY(${(x * 2.2).toFixed(2)}deg) rotateX(${(-y * 2.2).toFixed(2)}deg)`;
        }, { passive: true });

        card.addEventListener('mouseleave', function () {
            card.style.transform = '';
            card.style.transition = 'transform 0.5s ease';
            window.setTimeout(function () { card.style.transition = ''; }, 500);
        }, { passive: true });
    })();

    /* ---- Donation progress ---- */
    (function initProgress() {
        const fill = document.getElementById('progressFill');
        const track = document.getElementById('progressTrack');
        const pctEl = document.getElementById('progressPct');
        const leftEl = document.getElementById('progressLeft');
        const raisedEl = document.getElementById('raisedAmount');
        const goalEl = document.getElementById('goalAmount');
        if (!fill || !track || !pctEl || !leftEl) return;

        const raised = parseFloat(fill.dataset.raised) || 0;
        const goal = parseFloat(fill.dataset.goal) || 0;
        if (goal <= 0) return;

        const percent = Math.min(100, Math.round((raised / goal) * 100));
        const format = (value) => Math.round(value).toLocaleString('it-IT') + '€';

        if (raisedEl) raisedEl.textContent = format(raised);
        if (goalEl) goalEl.textContent = '/ ' + format(goal);

        track.setAttribute('aria-valuemax', String(goal));
        track.setAttribute('aria-valuenow', String(raised));
        track.setAttribute('aria-valuetext', `${format(raised)} raccolti su ${format(goal)} (${percent}%)`);

        let done = false;

        function animate() {
            if (done) return;
            done = true;

            fill.style.width = percent + '%';
            pctEl.textContent = percent + '%';
            leftEl.textContent = 'Mancano ' + format(goal - raised);

            if (!canAnimate()) {
                pctEl.textContent = percent + '%';
                return;
            }

            const start = performance.now();
            const duration = 1600;

            function tick(now) {
                const t = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - t, 3);
                pctEl.textContent = Math.round(eased * percent) + '%';
                if (t < 1) requestAnimationFrame(tick);
            }

            requestAnimationFrame(tick);
        }

        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        animate();
                        observer.disconnect();
                    }
                });
            }, { threshold: 0.3 });

            observer.observe(fill.closest('.progress-block'));
        } else {
            animate();
        }
    })();

    /* ---- Active section in top nav ---- */
    (function initScrollSpy() {
        const sections = document.querySelectorAll('#social, #setup, #supporta');
        const links = document.querySelectorAll('.topnav a[href^="#"]');
        if (!sections.length || !links.length || !('IntersectionObserver' in window)) return;

        const map = new Map();
        links.forEach(function (link) {
            map.set(link.getAttribute('href').slice(1), link);
        });

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                links.forEach(function (link) { link.classList.remove('is-active'); });
                const link = map.get(entry.target.id);
                if (link) link.classList.add('is-active');
            });
        }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

        sections.forEach(function (section) { observer.observe(section); });
    })();

    /* ---- Footer year ---- */
    (function initYear() {
        const el = document.getElementById('year');
        if (el) el.textContent = String(new Date().getFullYear());
    })();
})();
