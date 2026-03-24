document.addEventListener('DOMContentLoaded', function () {

    // Hero Slider
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;

    function showSlide(n) {
        slides.forEach(s => s.classList.remove('active'));
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    if (slides.length > 0) {
        setInterval(() => showSlide(currentSlide + 1), 5000);
    }

    // Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks  = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        // nav-links を body 直下に移動（header の stacking context を脱出）
        document.body.appendChild(navLinks);

        // メニュー外タップ用オーバーレイ
        const navOverlay = document.createElement('div');
        navOverlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:1049;display:none;';
        document.body.appendChild(navOverlay);

        function openNav() {
            hamburger.classList.add('active');
            navLinks.classList.add('active');
            navOverlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }

        function closeNav() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            navOverlay.style.display = 'none';
            document.body.style.overflow = '';
        }

        hamburger.addEventListener('click', () => {
            navLinks.classList.contains('active') ? closeNav() : openNav();
        });

        navOverlay.addEventListener('click', closeNav);
        navOverlay.addEventListener('touchstart', closeNav, { passive: true });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeNav);
        });

        navLinks.addEventListener('click', (e) => {
            if (!e.target.closest('a')) closeNav();
        });
    }

    // Header Hide on Scroll Down / Show on Scroll Up
    const header    = document.querySelector('header');
    let lastScrollY = window.scrollY;
    const headerH   = header ? header.offsetHeight : 80;

    if (header) {
        header.style.transition = 'transform 0.35s cubic-bezier(0.4,0,0.2,1), padding 0.3s ease, box-shadow 0.3s ease';
    }

    function updateHeader(sy) {
        const diff = sy - lastScrollY;
        header.classList.toggle('scrolled', sy > 50);

        // nav-linksもheaderと同期して動かす
        const navLinksEl = document.querySelector('body > ul.nav-links') || navLinks;

        if (sy <= headerH) {
            header.style.transform = 'translateY(0)';
            if (navLinksEl) navLinksEl.style.transform = 'translateY(0)';
        } else if (diff > 4) {
            header.style.transform = 'translateY(-110%)';
            if (navLinksEl) navLinksEl.style.transform = 'translateY(-110%)';
        } else if (diff < -4) {
            header.style.transform = 'translateY(0)';
            if (navLinksEl) navLinksEl.style.transform = 'translateY(0)';
        }
        lastScrollY = sy;
    }

    // Hero Parallax（PC のみ）
    const heroContent = document.querySelector('.hero-content');

    function heroParallax(sy) {
        if (heroContent && window.innerWidth > 768) {
            heroContent.style.transform = `translateY(${sy * 0.15}px)`;
            heroContent.style.opacity   = Math.max(0, 1 - sy / 500);
        }
    }

    // Section Title Parallax（PC のみ）
    const sectionTitles = document.querySelectorAll('.section-title');

    function titleParallax() {
        if (window.innerWidth <= 768) return;
        sectionTitles.forEach(title => {
            const rect         = title.getBoundingClientRect();
            const centerOffset = rect.top + rect.height / 2 - window.innerHeight / 2;
            title.style.transform = `translateX(${-centerOffset * 0.06}px)`;
        });
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            if (heroContent) { heroContent.style.transform = ''; heroContent.style.opacity = ''; }
            sectionTitles.forEach(t => t.style.transform = '');
        }
    });

    // RAF スクロールループ
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const sy = window.scrollY;
                updateHeader(sy);
                heroParallax(sy);
                titleParallax();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    const sy0 = window.scrollY;
    updateHeader(sy0);
    heroParallax(sy0);
    titleParallax();

    // Hero フェードイン（PC）
    if (heroContent && window.innerWidth > 768) {
        heroContent.style.opacity   = '0';
        heroContent.style.transform = 'translateY(40px)';
        setTimeout(() => {
            heroContent.style.transition = 'opacity 1.2s ease, transform 1.2s ease';
            heroContent.style.opacity    = '1';
            heroContent.style.transform  = 'translateY(0)';
        }, 300);
    }

    // Scroll Animation
    const animateEls = document.querySelectorAll(
        '.about-image-full, .eat-in-grid, ' +
        '.seasonal-grid, .visit-grid, .visit-map, ' +
        '.section-title, .section-subtitle, .section-intro, ' +
        '.menu-preview-cta, .menu-grid'
    );
    animateEls.forEach(el => el.classList.add('anim-hidden'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('anim-visible');
                entry.target.classList.remove('anim-hidden');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    animateEls.forEach(el => observer.observe(el));

    document.querySelectorAll('.menu-item, .menu-preview-item').forEach((el, i) => {
        el.classList.add('anim-hidden');
        const mo = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('anim-visible');
                        entry.target.classList.remove('anim-hidden');
                    }, (i % 6) * 100);
                    mo.unobserve(entry.target);
                }
            });
        }, { threshold: 0.05 });
        mo.observe(el);
    });

    const fromLeftSels  = ['.about-image', '.eat-in-image', '.seasonal-image'];
    const fromRightSels = ['.about-text',  '.eat-in-text',  '.seasonal-text'];

    fromLeftSels.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => el.classList.add('anim-from-left'));
    });
    fromRightSels.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => el.classList.add('anim-from-right'));
    });

    const sideEls = [...document.querySelectorAll(
        '.about-image, .about-text, .eat-in-image, .eat-in-text, .seasonal-image, .seasonal-text'
    )];

    const sideObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('anim-visible'), i * 100);
                sideObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05, rootMargin: '0px 0px -30px 0px' });

    sideEls.forEach(el => sideObserver.observe(el));

    document.querySelectorAll('.visit-info').forEach((el, i) => {
        el.classList.add('anim-hidden');
        const vo = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => entry.target.classList.add('anim-visible'), i * 150);
                    vo.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
        vo.observe(el);
    });

    // Seeds パララックス（PC のみ）
    const seeds = document.querySelectorAll('.seed');
    window.addEventListener('scroll', () => {
        if (window.innerWidth <= 768) return;
        const sy = window.scrollY;
        seeds.forEach((seed, i) => {
            seed.style.transform = `rotate(45deg) translateY(${sy * ((i % 3 + 1) * 0.08)}px)`;
        });
    }, { passive: true });

    // Hero 固定：body の padding-top を画面高さに合わせる
    if (document.querySelector('.hero-slider')) {
        function setHeroPadding() {
            document.body.style.paddingTop = window.innerHeight + 'px';
        }
        setHeroPadding();
        window.addEventListener('resize', setHeroPadding, { passive: true });
    }

});