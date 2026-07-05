// ===== Gunadasa Kapuge Tribute — interactions =====

// Nav background on scroll
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 40);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Mobile hamburger menu
const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");
burger.addEventListener("click", () => {
  burger.classList.toggle("is-open");
  navLinks.classList.toggle("is-open");
});
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    burger.classList.remove("is-open");
    navLinks.classList.remove("is-open");
  })
);

// Scroll-reveal animations
const observer = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        observer.unobserve(e.target);
      }
    }
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Kampana soundwave bars — heights echo the Figma design
const barsHost = document.getElementById("kampanaBars");
if (barsHost) {
  const heights = [
    14, 26, 40, 22, 52, 34, 70, 46, 90, 60, 110, 76, 140, 96, 120, 80,
    150, 100, 130, 88, 105, 70, 88, 54, 68, 42, 52, 30, 38, 20, 28, 14,
    22, 34, 48, 64, 84, 104, 124, 96, 74, 56, 40, 28, 18, 12,
  ];
  const frag = document.createDocumentFragment();
  heights.forEach((h, i) => {
    const bar = document.createElement("i");
    bar.style.height = h + "px";
    bar.style.animationDelay = (i % 9) * 0.18 + "s";
    frag.appendChild(bar);
  });
  barsHost.appendChild(frag);
}
