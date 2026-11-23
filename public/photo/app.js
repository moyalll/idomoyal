const photos = window.PHOTOS || [];
const grid = document.getElementById("gallery-grid");
const $ = (id) => document.getElementById(id);

$("year").textContent = new Date().getFullYear();

// Header fills exactly one screen below the nav
const navEl = $("nav");
const filtersEl = $("filters");
const setNavH = () => document.documentElement.style.setProperty("--nav-h", Math.floor(navEl.getBoundingClientRect().height) + "px");
setNavH();
addEventListener("resize", setNavH);
addEventListener("load", setNavH);

// Liquid Glass effect only when content scrolls underneath each bar
const updateGlass = () => {
  navEl.classList.toggle("glass", scrollY > 8);
  const navBottom = navEl.getBoundingClientRect().height;
  const filtersTop = filtersEl.getBoundingClientRect().top;
  filtersEl.classList.toggle("glass", filtersTop <= navBottom + 4);
};
addEventListener("scroll", updateGlass, { passive: true });
updateGlass();

// Theme: dark by default, remembered between visits
const root = document.documentElement;
if (localStorage.getItem("theme") === "light") root.dataset.theme = "light";
$("theme-toggle").onclick = () => {
  const light = root.dataset.theme !== "light";
  if (light) root.dataset.theme = "light"; else delete root.dataset.theme;
  localStorage.setItem("theme", light ? "light" : "dark");
};

// Gallery: rows of 2–3 photos. Within a row all photos share a height,
// so widths follow each photo's aspect ratio.
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } });
}, { threshold: 0.05 });

function packRows(list) {
  const rows = [];
  let i = 0;
  while (i < list.length) {
    const left = list.length - i;
    if (left <= 3) { rows.push(list.slice(i)); break; }
    if (left === 4) { rows.push(list.slice(i, i + 2), list.slice(i + 2)); break; }
    // Two wide photos fill a row nicely; otherwise take three
    const r2 = list[i].w / list[i].h + list[i + 1].w / list[i + 1].h;
    const n = r2 >= 2.6 ? 2 : 3;
    rows.push(list.slice(i, i + n));
    i += n;
  }
  // Never leave a single photo alone (only possible if there's 1 photo total)
  return rows;
}

photos.forEach((p) => {
  const c = (window.CATEGORIES || {})[p.id];
  p.cats = Array.isArray(c) ? c : c ? [c] : [];
});
let visible = photos;

function render() {
  grid.innerHTML = "";
  visible.forEach((p, i) => (p.index = i));
  packRows(visible).forEach((rowPhotos) => {
    const row = document.createElement("div");
    row.className = "row";
    rowPhotos.forEach((p, k) => {
      const r = p.w / p.h;
      const tile = document.createElement("figure");
      tile.className = "tile";
      tile.id = `photo-${p.id}`;
      tile.style.flex = `${r} 1 0`;
      tile.style.aspectRatio = `${p.w} / ${p.h}`;
      tile.style.transitionDelay = `${k * 100}ms`;
      const img = document.createElement("img");
      img.alt = p.title || "Photograph by Moyal";
      img.loading = "lazy";
      img.src = p.thumb;
      img.onerror = () => {
        if (!img.dataset.retried) {
          img.dataset.retried = "1";
          setTimeout(() => { img.src = p.small || p.full; }, 600);
        }
      };
      tile.appendChild(img);
      tile.onclick = () => openLb(p.index);
      row.appendChild(tile);
      io.observe(tile);
    });
    grid.appendChild(row);
  });
}

// Category filter
document.querySelectorAll(".filter").forEach((btn) => {
  btn.onclick = () => {
    document.querySelectorAll(".filter").forEach((b) => b.classList.toggle("active", b === btn));
    const c = btn.dataset.cat;
    visible = c === "all" ? photos : photos.filter((p) => p.cats.includes(c));
    grid.classList.add("fading");
    setTimeout(() => { render(); grid.classList.remove("fading"); }, 250);
  };
});
render();

// Lightbox with swipe & two-finger trackpad scroll
let current = 0;
const lbTrack = $("lb-track");

function buildLbSlides() {
  lbTrack.innerHTML = visible
    .map((p, i) => `<div class="lb-slide" data-index="${i}"><img data-src="${p.full}" alt="${p.title || "Photograph by Moyal"}" /></div>`)
    .join("");
}

function loadNearby(idx) {
  const slides = lbTrack.children;
  if (!slides.length) return;
  [idx - 1, idx, idx + 1, (idx + 2) % visible.length, (idx - 2 + visible.length) % visible.length].forEach((k) => {
    const n = (k + visible.length) % visible.length;
    const img = slides[n] && slides[n].querySelector("img");
    if (img && !img.src) img.src = img.dataset.src;
  });
}

function updateCounter(idx) {
  current = idx;
  $("lb-counter").textContent = `${current + 1} / ${visible.length}`;
  loadNearby(current);
}

function openLb(i) {
  buildLbSlides();
  $("lightbox").classList.add("open");
  lbTrack.style.scrollBehavior = "auto";
  lbTrack.scrollLeft = i * lbTrack.clientWidth;
  updateCounter(i);
  requestAnimationFrame(() => { lbTrack.style.scrollBehavior = "smooth"; });
}

function goToSlide(idx, smooth = true) {
  const n = (idx + visible.length) % visible.length;
  lbTrack.style.scrollBehavior = smooth ? "smooth" : "auto";
  lbTrack.scrollTo({ left: n * lbTrack.clientWidth, behavior: smooth ? "smooth" : "auto" });
  updateCounter(n);
}

function step(d) {
  goToSlide(current + d, true);
}

lbTrack.addEventListener("scroll", () => {
  if (!$("lightbox").classList.contains("open")) return;
  const w = lbTrack.clientWidth;
  if (!w) return;
  const idx = Math.round(lbTrack.scrollLeft / w);
  if (idx >= 0 && idx < visible.length && idx !== current) {
    updateCounter(idx);
  }
}, { passive: true });

// Support vertical two-finger scroll on trackpad to also swipe horizontally
let wheelLock = false;
lbTrack.addEventListener("wheel", (e) => {
  if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && Math.abs(e.deltaY) > 12) {
    e.preventDefault();
    if (!wheelLock) {
      wheelLock = true;
      step(e.deltaY > 0 ? 1 : -1);
      setTimeout(() => { wheelLock = false; }, 380);
    }
  }
}, { passive: false });

function closeAll() { $("lightbox").classList.remove("open"); $("contact-modal").classList.remove("open"); }
$("lb-close").onclick = closeAll;
$("lb-prev").onclick = (e) => { e.stopPropagation(); step(-1); };
$("lb-next").onclick = (e) => { e.stopPropagation(); step(1); };
$("lightbox").onclick = (e) => {
  if (e.target.id === "lightbox" || e.target.classList.contains("lb-slide") || e.target.id === "lb-track") closeAll();
};
addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeAll();
  if ($("lightbox").classList.contains("open")) {
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  }
});

// Contact
$("contact-btn").onclick = () => $("contact-modal").classList.add("open");
$("contact-close").onclick = closeAll;
$("contact-modal").onclick = (e) => { if (e.target.id === "contact-modal") closeAll(); };
