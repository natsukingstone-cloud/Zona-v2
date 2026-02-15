// ================================
// 1) ハンバーガーメニュー開閉（PCヘッダー用）
// ================================
const btn = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");

if (btn && nav) {
  btn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (e) => {
    const target = e.target;
    if (target instanceof HTMLAnchorElement) {
      nav.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
    }
  });
}

// ================================
// 2) reveal（フェードイン）
// ================================
const revealEls = document.querySelectorAll(".reveal");

if (revealEls.length) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
  );

  revealEls.forEach((el) => io.observe(el));
}

// ================================
// 3) スムーススクロール（#リンク）
// ================================
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const href = a.getAttribute("href");
    if (!href || href === "#") return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });

    // SPでメニュー開いてたら閉じる（保険）
    if (nav?.classList.contains("is-open")) {
      nav.classList.remove("is-open");
      btn?.setAttribute("aria-expanded", "false");
    }
  });
});

// ================================
// 4) Heroスライドショー（2.5秒）
// ================================
const slides = document.querySelectorAll(".hero-slide");
let currentSlide = 0;

if (slides.length > 1) {
  setInterval(() => {
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
  }, 5000);
}

// ================================
// 5) トップに戻るボタン（必要なら）
// ================================
const backToTop = document.createElement("button");
backToTop.className = "back-to-top";
backToTop.innerHTML = "↑";
backToTop.setAttribute("aria-label", "トップに戻る");
document.body.appendChild(backToTop);

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) backToTop.classList.add("show");
  else backToTop.classList.remove("show");
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ================================
// 6) パララックス（全セクション写真）
// ================================
const parallaxTargets = document.querySelectorAll(
  "#about .photo-farm img, #about .photo-sweets img, #seasonal .season-card__photo img, #eat-in .photo img"
);

window.addEventListener("scroll", () => {
  parallaxTargets.forEach((img) => {
    const figure = img.closest("figure");
    if (!figure) return;
    const rect = figure.getBoundingClientRect();
    const center = rect.top + rect.height / 2 - window.innerHeight / 2;
    img.style.transform = `translateY(${center * 0.05}px)`; /* 0.05=動き小さめ */
  });
}, { passive: true });