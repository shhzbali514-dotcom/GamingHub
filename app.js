/* ============================================================
   js/app.js
   Gaming Hub - Main Application Script
   All functionality in one file
   ============================================================ */

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        initApp();
    });

    function initApp() {
        initLoader();
        initNavbar();
        initCursor();
        initParticles();
        initHeroSearch();
        initStatsCounter();
        initGameCards();
        initCategoryCards();
        initNewsCards();
        initNewsletter();
        initSmoothScroll();
        initBackToTop();
        initScrollReveal();
        initMagneticButtons();
        initRippleEffects();
        initParallax();
        initVideoBackground();
        initNavbarScroll();
        initKeyboardShortcuts();
    }

    // ============================================================
    // LOADER
    // ============================================================
    function initLoader() {
        const loader = document.getElementById('loader');
        if (!loader) return;

        window.addEventListener('load', function() {
            setTimeout(function() {
                loader.classList.add('hidden');
            }, 1000);
        });

        setTimeout(function() {
            if (!loader.classList.contains('hidden')) {
                loader.classList.add('hidden');
            }
        }, 3000);
    }

    // ============================================================
    // NAVBAR
    // ============================================================
    function initNavbar() {
        const navbar = document.getElementById('navbar');
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', function(e) {
                e.stopPropagation();
                this.classList.toggle('active');
                navMenu.classList.toggle('active');
                document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
                toggleOverlay(navMenu.classList.contains('active'));
            });

            const navLinks = navMenu.querySelectorAll('a');
            navLinks.forEach(function(link) {
                link.addEventListener('click', function() {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                    toggleOverlay(false);
                });
            });
        }

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
                toggleOverlay(false);
            }
        });
    }

    function toggleOverlay(show) {
        let overlay = document.querySelector('.nav-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'nav-overlay';
            document.body.appendChild(overlay);
            overlay.addEventListener('click', function() {
                const hamburger = document.getElementById('hamburger');
                const navMenu = document.getElementById('navMenu');
                if (hamburger) hamburger.classList.remove('active');
                if (navMenu) navMenu.classList.remove('active');
                document.body.style.overflow = '';
                toggleOverlay(false);
            });
        }
        if (show) {
            overlay.classList.add('active');
        } else {
            overlay.classList.remove('active');
        }
    }

    // ============================================================
    // CUSTOM CURSOR
    // ============================================================
    function initCursor() {
        const dot = document.getElementById('cursorDot');
        const ring = document.getElementById('cursorRing');

        if (!dot || !ring) return;

        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            dot.style.display = 'none';
            ring.style.display = 'none';
            return;
        }

        let mouseX = 0, mouseY = 0;
        let ringX = 0, ringY = 0;

        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            dot.style.left = mouseX + 'px';
            dot.style.top = mouseY + 'px';
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            ring.style.left = ringX + 'px';
            ring.style.top = ringY + 'px';
        });

        const interactiveElements = document.querySelectorAll('a, button, .game-card, .news-card, .category-card, input, .slider-btn');
        interactiveElements.forEach(function(el) {
            el.addEventListener('mouseenter', function() {
                ring.classList.add('hover');
                dot.style.width = '4px';
                dot.style.height = '4px';
            });
            el.addEventListener('mouseleave', function() {
                ring.classList.remove('hover');
                dot.style.width = '6px';
                dot.style.height = '6px';
            });
        });

        document.addEventListener('mouseleave', function() {
            dot.style.opacity = '0';
            ring.style.opacity = '0';
        });

        document.addEventListener('mouseenter', function() {
            dot.style.opacity = '1';
            ring.style.opacity = '1';
        });
    }

    // ============================================================
    // PARTICLE BACKGROUND
    // ============================================================
    function initParticles() {
        const canvas = document.getElementById('particlesCanvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationId = null;

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 1.5 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.4;
                this.speedY = (Math.random() - 0.5) * 0.4;
                this.opacity = Math.random() * 0.3 + 0.05;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(124, 109, 212, ${this.opacity})`;
                ctx.fill();
            }
        }

        function createParticles() {
            const count = Math.min(60, Math.floor((canvas.width * canvas.height) / 20000));
            particles = [];
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        }

        function connectParticles() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 120) {
                        const opacity = (1 - distance / 120) * 0.12;
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(124, 109, 212, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(function(p) { p.update(); p.draw(); });
            connectParticles();
            animationId = requestAnimationFrame(animate);
        }

        createParticles();
        animate();

        window.addEventListener('resize', function() {
            resize();
            createParticles();
        });

        window.addEventListener('beforeunload', function() {
            if (animationId) cancelAnimationFrame(animationId);
        });
    }

    // ============================================================
    // HERO SEARCH
    // ============================================================
    function initHeroSearch() {
        const searchInput = document.getElementById('heroSearchInput');
        const searchBtn = document.getElementById('heroSearchBtn');

        if (!searchInput || !searchBtn) return;

        function performSearch() {
            const query = searchInput.value.trim();
            if (query.length > 0) {
                window.location.href = `games.html?search=${encodeURIComponent(query)}`;
            } else {
                searchInput.classList.add('shake');
                setTimeout(function() { searchInput.classList.remove('shake'); }, 600);
            }
        }

        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') { e.preventDefault(); performSearch(); }
        });

        let searchTimeout = null;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.trim();
            if (query.length > 2) {
                searchTimeout = setTimeout(function() {
                    console.log('Search suggestions for:', query);
                }, 300);
            }
        });

        searchInput.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        searchInput.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    }

    // ============================================================
    // STATS COUNTER
    // ============================================================
    function initStatsCounter() {
        const statNumbers = document.querySelectorAll('.stat-number');
        if (!statNumbers.length) return;

        let animated = false;

        function animateCounters() {
            if (animated) return;
            const heroSection = document.querySelector('.hero');
            if (!heroSection) return;
            const rect = heroSection.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            if (!isVisible) return;
            animated = true;

            statNumbers.forEach(function(stat) {
                const target = stat.getAttribute('data-count');
                if (!target) return;
                let isMillion = false;
                let targetNum = target;
                if (typeof target === 'string' && target.includes('m')) {
                    isMillion = true;
                    targetNum = target.replace('m', '') * 1000000;
                } else {
                    targetNum = parseInt(target) || 0;
                }
                const duration = 2000;
                const startTime = performance.now();
                const startValue = 0;

                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const easeOut = 1 - Math.pow(1 - progress, 3);
                    const currentValue = Math.floor(easeOut * targetNum);
                    if (isMillion) {
                        stat.textContent = (currentValue / 1000000).toFixed(1) + 'm';
                    } else {
                        stat.textContent = currentValue.toLocaleString();
                    }
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        if (isMillion) {
                            stat.textContent = target;
                        } else {
                            stat.textContent = parseInt(target).toLocaleString();
                        }
                    }
                }
                requestAnimationFrame(updateCounter);
            });
        }

        let timeout = null;
        window.addEventListener('scroll', function() {
            clearTimeout(timeout);
            timeout = setTimeout(animateCounters, 100);
        });
        setTimeout(animateCounters, 500);
    }

    // ============================================================
    // GAME CARDS
    // ============================================================
    function initGameCards() {
        const grid = document.getElementById('popularGrid');
        if (!grid) return;

        const games = [
            {
                title: 'Cyberpunk 2077',
                genre: 'RPG',
                rating: 4.5,
                image: 'CyberPunk.jpg',
                badge: '🔥 Hot'
            },
            {
                title: 'God of War',
                genre: 'Action',
                rating: 4.8,
                image: 'God Of War.jpg',
                badge: '⭐ Editor\'s Choice'
            },
            {
                title: 'The Last of Us',
                genre: 'Adventure',
                rating: 4.9,
                image: 'LAst OF uS.jpg',
                badge: '🏆 Game of the Year'
            },
            {
                title: 'Halo Infinite',
                genre: 'Shooter',
                rating: 4.2,
                image: 'halo infinite.jpg',
                badge: '🎯 Top Rated'
            }
        ];

        games.forEach(function(game) {
            const card = document.createElement('div');
            card.className = 'game-card card-hover-lift';

            card.innerHTML = `
                <div class="game-card-image">
                    <img src="${game.image}" alt="${game.title}" loading="lazy" />
                    <span class="game-card-badge">${game.badge}</span>
                </div>
                <div class="game-card-body">
                    <h3>${game.title}</h3>
                    <div class="game-meta">
                        <span>${game.genre}</span>
                        <span class="rating">★ ${game.rating}</span>
                    </div>
                </div>
            `;

            card.addEventListener('click', function() {
                const title = this.querySelector('h3').textContent;
                window.location.href = `game.html?title=${encodeURIComponent(title)}`;
            });

            grid.appendChild(card);
        });
    }

    // ============================================================
    // CATEGORY CARDS
    // ============================================================
    function initCategoryCards() {
        const cards = document.querySelectorAll('.category-card');
        cards.forEach(function(card) {
            card.addEventListener('click', function() {
                const category = this.getAttribute('data-cat');
                if (category) {
                    window.location.href = `categories.html?cat=${category}`;
                }
            });
        });
    }

    // ============================================================
    // NEWS CARDS
    // ============================================================
    function initNewsCards() {
        const grid = document.getElementById('newsGrid');
        if (!grid) return;

        const news = [
            {
                title: 'New Game Announced at Summer Game Fest',
                excerpt: 'Major studio reveals highly anticipated title with stunning trailer.',
                tag: 'Industry News',
                date: 'July 28, 2026',
                image: 'New Game Announced at Summer Game Fest.jpg'
            },
            {
                title: 'Cyberpunk 2077 Major Update Released',
                excerpt: 'New features, bug fixes, and performance improvements now available.',
                tag: 'Patch Notes',
                date: 'July 25, 2026',
                image: 'Cyberpunk 2077 Major Update Released.png'
            },
            {
                title: 'PlayStation 6 Specs Leaked Online',
                excerpt: 'Next-gen console rumored to feature revolutionary hardware upgrades.',
                tag: 'Upcoming Releases',
                date: 'July 22, 2026',
                image: 'PlayStation 6 Specs Leaked Online.png'
            }
        ];

        news.forEach(function(item) {
            const card = document.createElement('div');
            card.className = 'news-card';

            card.innerHTML = `
                <div class="news-card-image">
                    <img src="${item.image}" alt="${item.title}" loading="lazy" />
                </div>
                <div class="news-card-body">
                    <span class="news-tag">${item.tag}</span>
                    <h3>${item.title}</h3>
                    <p>${item.excerpt}</p>
                    <span class="news-date">📅 ${item.date}</span>
                </div>
            `;

            card.addEventListener('click', function() {
                window.location.href = `news.html?article=${encodeURIComponent(item.title)}`;
            });

            grid.appendChild(card);
        });
    }

    // ============================================================
    // NEWSLETTER
    // ============================================================
    function initNewsletter() {
        const form = document.querySelector('.newsletter-form');
        if (!form) return;

        const input = form.querySelector('input');
        const button = form.querySelector('button');

        if (!input || !button) return;

        button.addEventListener('click', function(e) {
            e.preventDefault();
            const email = input.value.trim();

            if (!email || !isValidEmail(email)) {
                input.classList.add('shake');
                input.style.borderColor = 'rgba(224,96,96,0.5)';
                setTimeout(function() {
                    input.classList.remove('shake');
                    input.style.borderColor = '';
                }, 600);
                return;
            }

            const originalText = this.textContent;
            this.textContent = '✓ Subscribed!';
            this.style.background = 'var(--gradient-primary)';
            input.value = '';

            setTimeout(function() {
                this.textContent = originalText;
                this.style.background = '';
            }.bind(this), 3000);

            showNotification('Successfully subscribed to Gaming Hub! 🎮');
        });

        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') { e.preventDefault(); button.click(); }
        });
    }

    // ============================================================
    // VALIDATION
    // ============================================================
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // ============================================================
    // NOTIFICATION
    // ============================================================
    function showNotification(message) {
        let notification = document.querySelector('.notification-toast');
        if (!notification) {
            notification = document.createElement('div');
            notification.className = 'notification-toast';
            document.body.appendChild(notification);
        }

        notification.textContent = message;
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';

        clearTimeout(notification._timeout);
        notification._timeout = setTimeout(function() {
            notification.style.transform = 'translateX(120%)';
        }, 4000);

        notification.onclick = function() {
            this.style.transform = 'translateX(120%)';
        };
    }

    // ============================================================
    // SMOOTH SCROLL
    // ============================================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    const navbarHeight = document.getElementById('navbar')?.offsetHeight || 80;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                }
            });
        });
    }

    // ============================================================
    // BACK TO TOP
    // ============================================================
    function initBackToTop() {
        let btn = document.querySelector('.back-to-top');
        if (!btn) {
            btn = document.createElement('button');
            btn.className = 'back-to-top';
            btn.innerHTML = '↑';
            btn.style.cssText = `
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 44px;
                height: 44px;
                border-radius: 50%;
                background: var(--gradient-primary);
                border: none;
                color: white;
                font-size: 1.3rem;
                cursor: pointer;
                z-index: 999;
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.3s ease;
                box-shadow: 0 4px 20px rgba(124,109,212,0.15);
                pointer-events: none;
                display: flex;
                align-items: center;
                justify-content: center;
            `;
            document.body.appendChild(btn);

            btn.addEventListener('click', function() {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        window.addEventListener('scroll', function() {
            const scrollY = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollY > 400) {
                btn.style.opacity = '1';
                btn.style.transform = 'translateY(0)';
                btn.style.pointerEvents = 'auto';
            } else {
                btn.style.opacity = '0';
                btn.style.transform = 'translateY(20px)';
                btn.style.pointerEvents = 'none';
            }
        });
    }

    // ============================================================
    // SCROLL REVEAL
    // ============================================================
    function initScrollReveal() {
        if (!('IntersectionObserver' in window)) {
            document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, [class*="animate-fade"]').forEach(function(el) {
                el.classList.add('visible');
            });
            return;
        }

        const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    if (entry.target.classList.contains('stagger-children')) {
                        const children = entry.target.children;
                        for (let i = 0; i < children.length; i++) {
                            children[i].style.animationDelay = (i * 0.08) + 's';
                        }
                    }
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

        revealElements.forEach(function(el) { observer.observe(el); });

        document.querySelectorAll('.animate-fade, .animate-fade-up, .animate-fade-down, .animate-fade-left, .animate-fade-right').forEach(function(el) {
            observer.observe(el);
        });
    }

    // ============================================================
    // MAGNETIC BUTTONS
    // ============================================================
    function initMagneticButtons() {
        const buttons = document.querySelectorAll('.btn-magnetic');

        buttons.forEach(function(btn) {
            btn.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                const distance = Math.sqrt(x * x + y * y);
                const maxDistance = Math.max(rect.width, rect.height) / 2;
                if (distance < maxDistance) {
                    const strength = 1 - distance / maxDistance;
                    const moveX = x * strength * 0.25;
                    const moveY = y * strength * 0.25;
                    this.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.04)`;
                } else {
                    this.style.transform = 'translate(0, 0) scale(1)';
                }
            });

            btn.addEventListener('mouseleave', function() {
                this.style.transform = 'translate(0, 0) scale(1)';
            });
        });
    }

    // ============================================================
    // RIPPLE EFFECTS
    // ============================================================
    function initRippleEffects() {
        const buttons = document.querySelectorAll('.btn-ripple');

        buttons.forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const ripple = document.createElement('span');
                ripple.className = 'ripple-effect';
                const size = Math.max(rect.width, rect.height) * 2;
                ripple.style.width = size + 'px';
                ripple.style.height = size + 'px';
                ripple.style.left = x - size / 2 + 'px';
                ripple.style.top = y - size / 2 + 'px';
                ripple.style.position = 'absolute';
                ripple.style.borderRadius = '50%';
                ripple.style.background = 'rgba(255,255,255,0.15)';
                ripple.style.transform = 'scale(0)';
                ripple.style.animation = 'ripple 0.6s ease-out forwards';
                ripple.style.pointerEvents = 'none';
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                setTimeout(function() { ripple.remove(); }, 800);
            });
        });
    }

    // ============================================================
    // PARALLAX
    // ============================================================
    function initParallax() {
        const parallaxElements = document.querySelectorAll('.parallax, .parallax-slow, .parallax-fast');

        if (!parallaxElements.length) return;

        window.addEventListener('scroll', function() {
            const scrollY = window.pageYOffset || document.documentElement.scrollTop;
            parallaxElements.forEach(function(el) {
                const speed = el.classList.contains('parallax-fast') ? 0.2 :
                             el.classList.contains('parallax-slow') ? 0.05 : 0.1;
                const offset = scrollY * speed;
                el.style.setProperty('--parallax-offset', offset + 'px');
            });
        });
    }

    // ============================================================
    // VIDEO BACKGROUND
    // ============================================================
    function initVideoBackground() {
        const video = document.getElementById('heroVideo');
        if (!video) return;
        video.setAttribute('playsinline', '');

        video.addEventListener('error', function() {
            console.log('Video failed to load, using fallback');
        });

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    video.play().catch(function() {});
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.1 });

        observer.observe(video);
    }

    // ============================================================
    // NAVBAR SCROLL
    // ============================================================
    function initNavbarScroll() {
        const navbar = document.getElementById('navbar');

        window.addEventListener('scroll', function() {
            const scrollY = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // ============================================================
    // KEYBOARD SHORTCUTS
    // ============================================================
    function initKeyboardShortcuts() {
        document.addEventListener('keydown', function(e) {
            if ((e.ctrlKey && e.key === 'k') || (e.key === '/' && !e.ctrlKey && !e.metaKey)) {
                e.preventDefault();
                const searchInput = document.getElementById('heroSearchInput');
                if (searchInput) { searchInput.focus(); }
            }

            if (e.key === 'Escape') {
                const navMenu = document.getElementById('navMenu');
                if (navMenu && navMenu.classList.contains('active')) {
                    const hamburger = document.getElementById('hamburger');
                    if (hamburger) hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                    toggleOverlay(false);
                }
            }
        });
    }

    // ============================================================
    // EXPOSE GLOBAL
    // ============================================================
    window.GamingHub = {
        showNotification: showNotification,
        isValidEmail: isValidEmail,
        init: initApp
    };

})();
