// ============================================================
// NAV DATA
// ============================================================
const NAV_ITEMS = [
  { id: "home", label: "Home", icon: "home" },
  { id: "about", label: "About", icon: "user" },
  { id: "experience", label: "Experience", icon: "briefcase" },
  { id: "skills", label: "Skills", icon: "layers" },
  { id: "education", label: "Education", icon: "graduation-cap" },
  { id: "contact", label: "Contact", icon: "mail" },
];

let activeId = "home";

function buildNav(container) {
  container.innerHTML = "";
  NAV_ITEMS.forEach(({ id, label, icon }) => {
    const btn = document.createElement("button");
    btn.className = "nav-item" + (id === activeId ? " active" : "");
    btn.dataset.navTarget = id;
    btn.innerHTML = `<i data-lucide="${icon}"></i><span>${label}</span>`;
    btn.addEventListener("click", () => scrollToSection(id));
    container.appendChild(btn);
  });
}

function setActiveNav(id) {
  activeId = id;
  document.querySelectorAll(".nav-item").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.navTarget === id);
  });
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  setActiveNav(id);
  closeDrawer();
}

// ============================================================
// DRAWER (mobile)
// ============================================================
const drawerOverlay = document.getElementById("drawerOverlay");

function openDrawer() {
  drawerOverlay.classList.add("open");
}
function closeDrawer() {
  drawerOverlay.classList.remove("open");
}

document.getElementById("drawerOpenBtn").addEventListener("click", openDrawer);
document.getElementById("drawerCloseBtn").addEventListener("click", closeDrawer);
document.getElementById("drawerBackdrop").addEventListener("click", closeDrawer);

// ============================================================
// HERO BUTTONS (data-nav attribute)
// ============================================================
document.querySelectorAll("[data-nav]").forEach((btn) => {
  btn.addEventListener("click", () => scrollToSection(btn.dataset.nav));
});

// ============================================================
// DEVICE MOCK TABS
// ============================================================
document.querySelectorAll(".device-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".device-tab").forEach((t) => t.classList.remove("active"));
    document.querySelectorAll(".tab-panel").forEach((p) => p.classList.remove("active"));
    tab.classList.add("active");
    document.querySelector(`.tab-panel[data-panel="${tab.dataset.tab}"]`).classList.add("active");
  });
});

// ============================================================
// SCROLL-SPY
// ============================================================
const sections = NAV_ITEMS.map(({ id }) => document.getElementById(id)).filter(Boolean);

const spyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActiveNav(entry.target.id);
    });
  },
  { rootMargin: "-35% 0px -50% 0px", threshold: 0 }
);
sections.forEach((el) => spyObserver.observe(el));

// ============================================================
// SCROLL REVEAL
// ============================================================
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// ============================================================
// INIT
// ============================================================
buildNav(document.getElementById("desktopNav"));
buildNav(document.getElementById("mobileNav"));

// Render lucide icons (script is loaded with defer, so DOM is ready by run time)
function initIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  } else {
    // retry shortly if the CDN script hasn't finished loading yet
    setTimeout(initIcons, 100);
  }
}
initIcons();
