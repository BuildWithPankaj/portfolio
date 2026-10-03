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
// PROJECT IMAGE LIGHTBOX
// ============================================================

const lightbox =
  document.getElementById("lightbox");

const lightboxImage =
  document.getElementById("lightboxImage");

const lightboxCaption =
  document.getElementById("lightboxCaption");


function openLightbox(
  src,
  caption,
  altText
) {

  if (!lightbox || !lightboxImage) {
    return;
  }

  lightboxImage.src = src;

  lightboxImage.alt =
    altText ||
    caption ||
    "Project screenshot";

  if (lightboxCaption) {
    lightboxCaption.textContent =
      caption || "";
  }

  lightbox.classList.add("open");

  lightbox.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.classList.add(
    "lightbox-open"
  );
}


function closeLightbox() {

  if (!lightbox || !lightboxImage) {
    return;
  }

  lightbox.classList.remove("open");

  lightbox.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.classList.remove(
    "lightbox-open"
  );

  lightboxImage.src = "";
}


// Open project image

document
  .querySelectorAll("[data-lightbox]")
  .forEach((button) => {

    button.addEventListener("click", () => {

      const image =
        button.querySelector("img");

      openLightbox(
        button.dataset.lightbox,
        button.dataset.caption,
        image?.alt
      );

    });

  });


// Close lightbox

document
  .querySelectorAll("[data-lightbox-close]")
  .forEach((button) => {

    button.addEventListener(
      "click",
      closeLightbox
    );

  });


// Close lightbox with ESC

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape" &&
      lightbox?.classList.contains("open")
    ) {

      closeLightbox();

    }

  }
);
