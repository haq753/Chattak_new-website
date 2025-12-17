// Tabs
document.querySelectorAll(".tab-button").forEach((button) => {
  button.addEventListener("click", () => {
    const tabId = button.getAttribute("data-tab");

    document.querySelectorAll(".tab-button").forEach((btn) => {
      btn.classList.remove("active");
      btn.setAttribute("aria-selected", "false");
    });

    document.querySelectorAll(".tab-panel").forEach((panel) => {
      panel.classList.remove("active");
    });

    button.classList.add("active");
    button.setAttribute("aria-selected", "true");
    const panel = document.getElementById(tabId);
    if (panel) panel.classList.add("active");
  });
});

// Vertical rotator
(() => {
  const track = document.getElementById("rotatorTrack");
  if (!track) return;

  const items = track.querySelectorAll(".rotator-item");
  const itemCount = items.length;
  const visibleCount = itemCount - 1; // last is clone

  let index = 0;
  let itemHeight = items[0].offsetHeight;

  function move() {
    index++;
    track.style.transition = "transform 650ms cubic-bezier(.2,.9,.2,1)";
    track.style.transform = `translateY(${-index * itemHeight}px)`;

    // when we hit the clone, jump back instantly
    if (index === visibleCount) {
      setTimeout(() => {
        track.style.transition = "none";
        track.style.transform = "translateY(0)";
        index = 0;
      }, 650);
    }
  }

  setInterval(move, 2400);

  // responsive recalculation
  window.addEventListener("resize", () => {
    itemHeight = items[0].offsetHeight;
    track.style.transition = "none";
    track.style.transform = `translateY(${-index * itemHeight}px)`;
  });
})();

function textUnderline() {
  const wrappers = document.querySelectorAll(".js-text-underline");
  wrappers.forEach(addUnderline);

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.style.setProperty("--animation", "title-underline");
      io.unobserve(entry.target);
    });
  }, { threshold: 0.4 });

  wrappers.forEach((w, idx) => {
    if (idx === 0) {
      w.style.setProperty("--animation", "title-underline");
    } else {
      io.observe(w);
    }
  });

  function addUnderline(wrapper) {
    const templateValue = wrapper.getAttribute("data-underline");
    const template =
      templateValue === "sm"
        ? `
<svg class="svg-underline" viewBox="0 0 430 16" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path class="top-line" d="M2 7.94972C135.772 5.76704 284.063 2 418.739 2" stroke="#8247FF" stroke-width="4" stroke-linecap="round"/>
  <path class="bottom-line" d="M153.261 13.8994C245.06 13.3972 336.602 11.6868 428 10.3296" stroke="#8247FF" stroke-width="4" stroke-linecap="round"/>
</svg>`
        : `
<svg class="svg-underline" viewBox="0 0 448 26" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path class="top-line" d="M73.3804 22.8573C166.579 20.3422 259.873 18.2243 352.949 14.802C356.34 14.6774 368.152 14.4647 374.62 13.754" stroke="#8247FF" stroke-width="4" stroke-linecap="round"/>
  <path class="bottom-line" d="M1.99989 20.173C62.4908 14.9745 123.484 13.4458 184.125 11.1428C262.309 8.17355 340.509 5.23404 418.755 4.25167C427.273 4.14472 452.789 3.54451 444.281 3.07897" stroke="#8247FF" stroke-width="4" stroke-linecap="round"/>
</svg>`;

    wrapper.insertAdjacentHTML("beforeend", template);

    const svg = wrapper.querySelector(".svg-underline");
    const topLine = svg.querySelector(".top-line");
    const bottomLine = svg.querySelector(".bottom-line");

    // exact rendered width (more accurate than scrollWidth)
    const w = Math.ceil(wrapper.getBoundingClientRect().width);
    svg.style.width = w + "px";

    // lengths for animation
    topLine.style.setProperty("--length", topLine.getTotalLength());
    bottomLine.style.setProperty("--length", bottomLine.getTotalLength());

  }
}

document.addEventListener("DOMContentLoaded", textUnderline);


// Footer year
const yearEl = document.querySelector(".copyright-year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mobile menu toggle
const mobileBtn = document.querySelector(".mobile-menu-btn");
const mobileNav = document.getElementById("mobileNav");

if (mobileBtn && mobileNav) {
  mobileBtn.addEventListener("click", () => {
    const open = mobileNav.style.display === "flex";
    mobileNav.style.display = open ? "none" : "flex";
    mobileBtn.setAttribute("aria-expanded", String(!open));
  });

  // Close menu when a link is clicked
  mobileNav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      mobileNav.style.display = "none";
      mobileBtn.setAttribute("aria-expanded", "false");
    });
  });
}

document.querySelectorAll('[data-btn="up"]').forEach((btn) => {
  btn.addEventListener("mouseenter", () => btn.classList.add("is-hover"));
  btn.addEventListener("mouseleave", () => btn.classList.remove("is-hover"));

  btn.addEventListener("focus", () => btn.classList.add("is-hover"));
  btn.addEventListener("blur", () => btn.classList.remove("is-hover"));

  // mobile: tap to preview animation
  btn.addEventListener("touchstart", () => btn.classList.add("is-hover"), { passive: true });
  btn.addEventListener("touchend", () => btn.classList.remove("is-hover"));
});
