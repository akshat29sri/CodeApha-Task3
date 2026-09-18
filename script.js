// Theme Toggle & Persistence
const themeToggle = document.querySelector(".theme-toggle");
const currentTheme = localStorage.getItem("portfolio-theme") || 
  (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

const setTheme = (theme) => {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("portfolio-theme", theme);
  if (themeToggle) {
    const isDark = theme === "dark";
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    themeToggle.setAttribute("title", isDark ? "Switch to light mode" : "Switch to dark mode");
  }
};

// Set theme immediately
setTheme(currentTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") || "light";
    const nextTheme = current === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  });
}

// Navigation mobile toggle
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector("[data-nav-links]");
const links = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main section[id]");
const revealItems = document.querySelectorAll(".reveal");
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const copyButton = document.querySelector(".copy-btn");
const toast = document.querySelector("[data-toast]");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Scroll Reveal with threshold
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.05, rootMargin: "0px 0px -30px 0px" }
);

revealItems.forEach((item) => revealObserver.observe(item));

// Section active link observer
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      links.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-30% 0px -55% 0px" }
);

sections.forEach((section) => sectionObserver.observe(section));

// Project filtering
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    projectCards.forEach((card) => {
      const categories = (card.dataset.category || "").split(" ");
      const match = filter === "all" || categories.includes(filter);
      card.classList.toggle("hidden", !match);
      if (match) {
        card.classList.add("visible");
      }
    });
  });
});

// Toast notification helper
const showToast = (message) => {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");

  window.setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
};

// Clipboard copy button
if (copyButton) {
  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(copyButton.dataset.copy || "akshat29sri");
      showToast("Handle @akshat29sri copied!");
    } catch (error) {
      showToast("Handle copied: @akshat29sri");
    }
  });
}

