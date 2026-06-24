(function () {
  "use strict";

  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navItems = Array.from(document.querySelectorAll(".nav-links a"));
  const sections = navItems
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);
  const currentYear = document.querySelector("#current-year");

  if (currentYear) {
    currentYear.textContent = String(new Date().getFullYear());
  }

  function closeMenu() {
    if (!navToggle || !navLinks) {
      return;
    }

    navToggle.setAttribute("aria-expanded", "false");
    navLinks.classList.remove("is-open");
    document.body.classList.remove("nav-open");
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!isExpanded));
      navLinks.classList.toggle("is-open");
      document.body.classList.toggle("nav-open", !isExpanded);
    });
  }

  navItems.forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  function updateActiveLink() {
    const scrollPosition = window.scrollY + 120;
    let activeSection = sections[0];

    sections.forEach(function (section) {
      if (section.offsetTop <= scrollPosition) {
        activeSection = section;
      }
    });

    navItems.forEach(function (link) {
      const isActive = activeSection && link.getAttribute("href") === "#" + activeSection.id;
      link.classList.toggle("active", Boolean(isActive));
    });
  }

  updateActiveLink();
  window.addEventListener("scroll", updateActiveLink, { passive: true });
  window.addEventListener("resize", function () {
    if (window.innerWidth > 1040) {
      closeMenu();
    }
  });
})();
