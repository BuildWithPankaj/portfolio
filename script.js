const NAV_ITEMS = [
  { id: "home", label: "Home", icon: "home" },
  { id: "about", label: "About", icon: "user" },
  { id: "experience", label: "Experience", icon: "briefcase" },
  { id: "projects", label: "Projects", icon: "folder-kanban" },
  { id: "skills", label: "Skills", icon: "layers" },
  { id: "education", label: "Education", icon: "graduation-cap" },
  { id: "contact", label: "Contact", icon: "mail" },
];

let activeId = "home";

function buildNav(container) {
  if (!container) return;

  container.innerHTML = "";

  NAV_ITEMS.forEach(({ id, label, icon }) => {
    const btn = document.createElement("button");

    btn.className =
      "nav-item" + (id === activeId ? " active" : "");

    btn.dataset.navTarget = id;

    btn.innerHTML = `
      <i data-lucide="${icon}"></i>
      <span>${label}</span>
    `;

    btn.addEventListener("click", () => {
      scrollToSection(id);
    });

    container.appendChild(btn);
  });
}

function setActiveNav(id) {
  activeId = id;

  document.querySelectorAll(".nav-item").forEach((btn) => {
    btn.classList.toggle(
      "active",
      btn.dataset.navTarget === id
    );
  });
}

function scrollToSection(id) {
  const el = document.getElementById(id);

  if (el) {
    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  setActiveNav(id);
  closeDrawer();
}


// ============================================================
// MOBILE DRAWER
// ============================================================

const drawerOverlay =
  document.getElementById("drawerOverlay");


function openDrawer() {
  if (drawerOverlay) {
    drawerOverlay.classList.add("open");
  }
}


function closeDrawer() {
  if (drawerOverlay) {
    drawerOverlay.classList.remove("open");
  }
}


document
  .getElementById("drawerOpenBtn")
  ?.addEventListener("click", openDrawer);


document
  .getElementById("drawerCloseBtn")
  ?.addEventListener("click", closeDrawer);


document
  .getElementById("drawerBackdrop")
  ?.addEventListener("click", closeDrawer);


document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeDrawer();
  }
});


// ============================================================
// HERO / NAV BUTTONS
// ============================================================

document.querySelectorAll("[data-nav]").forEach((btn) => {
  btn.addEventListener("click", () => {
    scrollToSection(btn.dataset.nav);
  });
});


// ============================================================
// HERO DEVICE MOCK TABS
// ============================================================

document.querySelectorAll(".device-tab").forEach((tab) => {
  tab.addEventListener("click", () => {

    document.querySelectorAll(".device-tab").forEach((t) => {
      t.classList.remove("active");
    });

    document.querySelectorAll(".tab-panel").forEach((panel) => {
      panel.classList.remove("active");
    });

    tab.classList.add("active");

    document
      .querySelector(
        `.tab-panel[data-panel="${tab.dataset.tab}"]`
      )
      ?.classList.add("active");
  });
});


// ============================================================
// SCROLL SPY
// ============================================================

const sections = NAV_ITEMS
  .map(({ id }) => document.getElementById(id))
  .filter(Boolean);


const spyObserver = new IntersectionObserver(
  (entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {
        setActiveNav(entry.target.id);
      }

    });

  },
  {
    rootMargin: "-35% 0px -50% 0px",
    threshold: 0,
  }
);


sections.forEach((section) => {
  spyObserver.observe(section);
});


// ============================================================
// SCROLL REVEAL
// ============================================================

const revealObserver = new IntersectionObserver(
  (entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {

        entry.target.classList.add("in-view");

        revealObserver.unobserve(
          entry.target
        );
      }

    });

  },
  {
    threshold: 0.12,
  }
);


document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});


// ============================================================
// BUILD NAVIGATION
// ============================================================

buildNav(
  document.getElementById("desktopNav")
);

buildNav(
  document.getElementById("mobileNav")
);


// ============================================================
// LUCIDE ICONS
// ============================================================

function initIcons() {

  if (window.lucide) {

    window.lucide.createIcons();

  } else {

    setTimeout(
      initIcons,
      100
    );

  }
}


initIcons();

// ============================================================
// POLISHED SECTION / CARD ANIMATIONS
// ============================================================

document.querySelectorAll(".chip-row .chip").forEach((chip, index) => {
  chip.style.setProperty("--skill-index", index);
});

document.querySelectorAll(".project-card").forEach((card, index) => {
  card.style.setProperty("--card-index", index);
});

document.querySelectorAll(".stat-card").forEach((card, index) => {
  card.style.setProperty("--stat-index", index);
});

document.querySelectorAll(".edu-card").forEach((card, index) => {
  card.style.setProperty("--edu-index", index);
});

document.querySelectorAll(".timeline-item").forEach((item, index) => {
  item.style.setProperty("--timeline-index", index);
});

document.querySelectorAll(".contact-row").forEach((row, index) => {
  row.style.setProperty("--contact-index", index);
});

// Preserve each inline progress value as a CSS custom property, then animate
// the bar from zero when the Skills section enters the viewport.
document.querySelectorAll(".lang-fill").forEach((bar) => {
  const targetWidth = bar.style.width || "0%";
  bar.style.setProperty("--bar-width", targetWidth);
  // Remove the inline width so CSS can animate from 0 to the target value.
  bar.style.removeProperty("width");
});

// ============================================================
// SIMPLE CUSTOM DESKTOP CURSOR
// ============================================================

const finePointer = window.matchMedia("(pointer: fine)");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (finePointer.matches && !reducedMotion.matches) {
  document.documentElement.classList.add("custom-cursor-enabled");

  const cursorDot = document.createElement("div");
  const cursorRing = document.createElement("div");

  cursorDot.className = "cursor-dot";
  cursorRing.className = "cursor-ring";
  cursorDot.setAttribute("aria-hidden", "true");
  cursorRing.setAttribute("aria-hidden", "true");
  document.body.append(cursorRing, cursorDot);

  const interactiveSelector = [
    "a",
    "button",
    ".chip",
    ".project-card",
    ".stat-card",
    ".edu-card",
    ".device-tab",
    ".nav-item"
  ].join(", ");

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  let visible = false;

  const showCursor = () => {
    if (visible) return;
    visible = true;
    cursorDot.classList.add("visible");
    cursorRing.classList.add("visible");
  };

  const hideCursor = () => {
    visible = false;
    cursorDot.classList.remove("visible");
    cursorRing.classList.remove("visible", "is-hovering", "is-clicking");
  };

  const animateCursor = () => {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;

    cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

    requestAnimationFrame(animateCursor);
  };

  window.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    showCursor();

    const isInteractive = event.target instanceof Element &&
      Boolean(event.target.closest(interactiveSelector));

    cursorRing.classList.toggle("is-hovering", isInteractive);
    cursorDot.classList.toggle("is-hovering", isInteractive);
  });

  document.addEventListener("mousedown", () => cursorRing.classList.add("is-clicking"));
  document.addEventListener("mouseup", () => cursorRing.classList.remove("is-clicking"));
  document.addEventListener("mouseleave", hideCursor);
  document.addEventListener("mouseenter", showCursor);

  animateCursor();
}
