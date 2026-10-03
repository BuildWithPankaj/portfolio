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
  const section = document.getElementById(id);

  if (section) {
    section.scrollIntoView({
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

const drawerOpenBtn =
  document.getElementById("drawerOpenBtn");

const drawerCloseBtn =
  document.getElementById("drawerCloseBtn");

const drawerBackdrop =
  document.getElementById("drawerBackdrop");


function openDrawer() {
  if (!drawerOverlay) return;

  drawerOverlay.classList.add("open");

  document.body.style.overflow = "hidden";
}


function closeDrawer() {
  if (!drawerOverlay) return;

  drawerOverlay.classList.remove("open");

  document.body.style.overflow = "";
}


drawerOpenBtn?.addEventListener(
  "click",
  openDrawer
);

drawerCloseBtn?.addEventListener(
  "click",
  closeDrawer
);

drawerBackdrop?.addEventListener(
  "click",
  closeDrawer
);


document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeDrawer();
  }
});


// ============================================================
// HERO BUTTON NAVIGATION
// ============================================================

document
  .querySelectorAll("[data-nav]")
  .forEach((button) => {

    button.addEventListener("click", () => {

      const target =
        button.dataset.nav;

      if (target) {
        scrollToSection(target);
      }

    });

  });


// ============================================================
// DEVICE MOCK TABS
// ============================================================

const deviceTabs =
  document.querySelectorAll(".device-tab");

const tabPanels =
  document.querySelectorAll(".tab-panel");


deviceTabs.forEach((tab) => {

  tab.addEventListener("click", () => {

    const targetTab =
      tab.dataset.tab;

    deviceTabs.forEach((item) => {
      item.classList.remove("active");
    });

    tabPanels.forEach((panel) => {
      panel.classList.remove("active");
    });

    tab.classList.add("active");

    const selectedPanel =
      document.querySelector(
        `.tab-panel[data-panel="${targetTab}"]`
      );

    selectedPanel?.classList.add("active");

  });

});


// ============================================================
// SCROLL SPY
// ============================================================

const sections =
  NAV_ITEMS
    .map(({ id }) =>
      document.getElementById(id)
    )
    .filter(Boolean);


const spyObserver =
  new IntersectionObserver(

    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {
          setActiveNav(
            entry.target.id
          );
        }

      });

    },

    {
      rootMargin:
        "-35% 0px -50% 0px",

      threshold: 0,
    }

  );


sections.forEach((section) => {
  spyObserver.observe(section);
});


// ============================================================
// SCROLL REVEAL ANIMATION
// ============================================================

const revealElements =
  document.querySelectorAll(".reveal");


const revealObserver =
  new IntersectionObserver(

    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add(
            "in-view"
          );

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


revealElements.forEach((element) => {
  revealObserver.observe(element);
});


// ============================================================
// PROJECT CARD HOVER SUPPORT
// ============================================================

const projectCards =
  document.querySelectorAll(".project-card");


projectCards.forEach((card) => {

  card.addEventListener(
    "mouseenter",
    () => {
      card.classList.add(
        "is-hovered"
      );
    }
  );

  card.addEventListener(
    "mouseleave",
    () => {
      card.classList.remove(
        "is-hovered"
      );
    }
  );

});


// ============================================================
// EXTERNAL LINKS
// ============================================================

document
  .querySelectorAll(
    'a[target="_blank"]'
  )
  .forEach((link) => {

    if (
      !link.hasAttribute("rel")
    ) {

      link.setAttribute(
        "rel",
        "noopener noreferrer"
      );

    }

  });


// ============================================================
// NAV INITIALIZATION
// ============================================================

const desktopNav =
  document.getElementById(
    "desktopNav"
  );

const mobileNav =
  document.getElementById(
    "mobileNav"
  );


buildNav(desktopNav);
buildNav(mobileNav);


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
// SET INITIAL ACTIVE SECTION
// ============================================================

window.addEventListener(
  "load",
  () => {

    const hash =
      window.location.hash.replace(
        "#",
        ""
      );

    const validSection =
      NAV_ITEMS.find(
        (item) =>
          item.id === hash
      );

    if (validSection) {

      activeId =
        validSection.id;

      setActiveNav(
        validSection.id
      );

    } else {

      setActiveNav("home");

    }
  }
);
