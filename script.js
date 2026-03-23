document.addEventListener('DOMContentLoaded', function () {

    // =============================================
    // Hero Slider（TOPページのみ）
    // =============================================
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

    // =============================================
    // Hamburger Menu（背景オーバーレイで閉じる対応）
    // =============================================
    const hamburger = document.querySelector('.hamburger');
    const navLinks  = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        const navOverlay = document.createElement('div');
        navOverlay.style.cssText = [
            'position:fixed','top:0','left:0',
            'width:100%','height:100%',
            'background:rgba(0,0,0,0.35)',
            'z-index:999','display:none','opacity:0',
            'transition:opacity 0.3s ease'
        ].join(';');
        document.body.appendChild(navOverlay);

        function openNav() {
            hamburger.classList.add('active');
            navLinks.classList.add('active');
            navOverlay.style.display = 'block';
            setTimeout(() => navOverlay.style.opacity = '1', 10);
        }

        function closeNav() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            navOverlay.style.opacity = '0';
            setTimeout(() => navOverlay.style.display = 'none', 300);
        }

        hamburger.addEventListener('click', () => {
            navLinks.classList.contains('active') ? closeNav() : openNav();
        });

        navOverlay.addEventListener('click', closeNav);

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeNav);
        });
    }

    // =============================================
    // Header Hide on Scroll Down / Show on Scroll Up
    // =============================================
    const header    = document.querySelector('header');
    let lastScrollY = window.scrollY;
    const headerH   = header ? header.offsetHeight : 80;

    if (header) {
        header.style.transition = 'transform 0.35s cubic-bezier(0.4,0,0.2,1), padding 0.3s ease, box-shadow 0.3s ease';
    }

    function updateHeader(sy) {
        const diff = sy - lastScrollY;
        header.classList.toggle('scrolled', sy > 50);
        if (sy <= headerH) {
            header.style.transform = 'translateY(0)';
        } else if (diff > 4) {
            header.style.transform = 'translateY(-110%)';
        } else if (diff < -4) {
            header.style.transform = 'translateY(0)';
        }
        lastScrollY = sy;
    }

    // =============================================
    // Hero Parallax（PC のみ・TOPページ）
    // =============================================
    const heroSlider  = document.querySelector('.hero-slider');
    const heroContent = document.querySelector('.hero-content');

    function heroParallax(sy) {
        if (window.innerWidth <= 768) return;
        if (heroSlider)  heroSlider.style.transform  = `translateY(${sy * 0.4}px)`;
        if (heroContent) {
            heroContent.style.transform = `translateY(${sy * 0.15}px)`;
            heroContent.style.opacity   = Math.max(0, 1 - sy / 500);
        }
    }

    // =============================================
    // Section Image Parallax（PC のみ）
    // =============================================
    const parallaxImages = document.querySelectorAll(
        '.about-image img, .about-image-full img, .eat-in-image img, .seasonal-image img'
    );

    function sectionParallax() {
        if (window.innerWidth <= 768) return;
        parallaxImages.forEach(img => {
            const wrap = img.closest('[class*="-image"]');
            if (!wrap) return;
            const rect         = wrap.getBoundingClientRect();
            const centerOffset = rect.top + rect.height / 2 - window.innerHeight / 2;
            img.style.transform = `translateY(${centerOffset * 0.12}px) scale(1.12)`;
        });
    }

    // =============================================
    // Section Title Parallax（PC のみ）
    // =============================================
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
            if (heroSlider)  heroSlider.style.transform  = '';
            if (heroContent) { heroContent.style.transform = ''; heroContent.style.opacity = ''; }
            parallaxImages.forEach(img => img.style.transform = '');
            sectionTitles.forEach(t   => t.style.transform   = '');
        }
    });

    // =============================================
    // RAF スクロールループ
    // =============================================
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const sy = window.scrollY;
                updateHeader(sy);
                heroParallax(sy);
                sectionParallax();
                titleParallax();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    const sy0 = window.scrollY;
    updateHeader(sy0);
    heroParallax(sy0);
    sectionParallax();
    titleParallax();

    // =============================================
    // Hero フェードイン（PC: JS / SP: CSS）
    // =============================================
    if (heroContent) {
        if (window.innerWidth > 768) {
            heroContent.style.opacity   = '0';
            heroContent.style.transform = 'translateY(40px)';
            setTimeout(() => {
                heroContent.style.transition = 'opacity 1.2s ease, transform 1.2s ease';
                heroContent.style.opacity    = '1';
                heroContent.style.transform  = 'translateY(0)';
            }, 300);
        }
    }

    // =============================================
    // Scroll Animation（スクロール出現）- TOP & Menu共通
    // =============================================
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

    // メニューアイテム時差フェードアップ（menu.html & TOPプレビュー）
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

    // About・Eat in・Seasonal 左右スライドイン
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

    // Visit カード時間差フェードアップ
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

});