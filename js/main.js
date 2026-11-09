/**
 * Vanguard Aggregates - Main Interactive UI Controller
 * Luxurious Industrial & Architectural Styling
 * Hardware-Accelerated Animations & Micro-Interactions
 */

// Immediate execution before DOM to prevent theme/direction flash
(function() {
  try {
    const savedTheme = localStorage.getItem("vanguard-theme");
    if (savedTheme === "light") {
      document.documentElement.classList.add("light-mode");
    }
    const savedDir = localStorage.getItem("vanguard-dir");
    if (savedDir === "rtl") {
      document.documentElement.setAttribute("dir", "rtl");
    }
  } catch (e) {}
})();

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide icons if available
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  // Update quote badge
  if (window.VanguardQuoteCart) {
    window.VanguardQuoteCart.updateBadge();
  }

  // 1. Theme Controller (Light Mode / Dark Mode)
  initThemeMode();

  // 2. Text Direction Controller (LTR / RTL)
  initDirectionMode();

  // 3. Dropdown Menu Controller (Home 1 & Home 2)
  initHomeDropdown();

  // 4. Smooth Scrolling for all anchor links with navbar offset
  initSmoothScrolling();

  // 5. Responsive Mobile Drawer with fluid animation
  initMobileMenu();

  // 6. Sticky transparent-to-solid navbar on scroll
  initStickyNavbar();

  // 7. Subtle reveal on scroll with staggered cascades
  initScrollReveal();

  // 8. Quantitative stats animated counter
  initAnimatedCounters();

  // Active link detection for desktop and mobile
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (!href) {
      // Check if it's the Home dropdown button
      if (link.closest(".dropdown-container") && (currentPath === "index.html" || currentPath === "" || currentPath === "home-2.html")) {
        link.classList.add("active-nav", "text-gold-400", "font-bold");
        link.classList.remove("text-sandstone-300");
      }
      return;
    }
    const cleanHref = href.split("?")[0].split("#")[0];
    if (cleanHref === currentPath || (currentPath === "" && cleanHref === "index.html")) {
      link.classList.add("active-nav", "text-gold-400", "font-bold");
      link.classList.remove("text-sandstone-300");
    } else {
      link.classList.remove("active-nav", "text-gold-400", "font-bold");
      link.classList.add("text-sandstone-300");
    }
  });

  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
  mobileNavLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (!href) return;
    const cleanHref = href.split("?")[0].split("#")[0];
    if (cleanHref === currentPath || (currentPath === "" && cleanHref === "index.html")) {
      link.classList.add("active-nav", "text-gold-400", "font-bold");
      link.classList.remove("text-sandstone-300");
    } else {
      link.classList.remove("active-nav", "text-gold-400", "font-bold");
      link.classList.add("text-sandstone-300");
    }
  });

  // Material Calculator Form (on Home page or standalone)
  initHomeCalculator();

  // Products Page Filter & Search
  initProductsCatalogue();

  // Delivery Postcode Estimator
  initDeliveryEstimator();

  // Setup FAQ accordions
  initFaqAccordions();

  // Pre-fill query parameters on Contact Page
  handleContactUrlParams();
});

/**
 * 1. Smooth Scrolling Controller
 * Dynamically computes sticky navbar offset and scrolls with custom easing.
 */
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      const href = this.getAttribute("href");
      if (!href || href === "#" || href.length <= 1) return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      // Close mobile drawer if open
      const mobileMenu = document.getElementById("mobile-menu");
      const mobileMenuIcon = document.getElementById("mobile-menu-icon");
      if (mobileMenu && mobileMenu.classList.contains("mobile-menu-open")) {
        mobileMenu.classList.remove("mobile-menu-open");
        if (mobileMenuIcon && typeof lucide !== "undefined") {
          mobileMenuIcon.setAttribute("data-lucide", "menu");
          lucide.createIcons();
        }
      }

      const navbar = document.getElementById("main-navbar");
      const navHeight = navbar ? navbar.offsetHeight : 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight - 16;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: "smooth"
      });

      if (window.history && window.history.pushState) {
        window.history.pushState(null, null, href);
      }
    });
  });
}

/**
 * 2. Sticky Navbar Scroll Controller
 * Starts transparent over hero and transforms seamlessly to a solid luxury background on scroll.
 * High-performance throttled requestAnimationFrame implementation.
 */
function initStickyNavbar() {
  const navbar = document.getElementById("main-navbar");
  if (!navbar) return;

  let ticking = false;

  function updateNavbar() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollY > 20) {
      navbar.classList.add("navbar-scrolled");
      navbar.classList.remove("navbar-transparent");
    } else {
      navbar.classList.remove("navbar-scrolled");
      navbar.classList.add("navbar-transparent");
    }
    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  }, { passive: true });

  updateNavbar();
}

/**
 * 3. Responsive Animated Mobile Drawer Menu
 * Replaces instant popping with an elegant, smoothly sliding drawer.
 */
function initMobileMenu() {
  const mobileToggle = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileMenuIcon = document.getElementById("mobile-menu-icon");

  if (!mobileToggle || !mobileMenu) return;

  // Remove Tailwind 'hidden' to allow CSS max-height transitions to operate
  mobileMenu.classList.remove("hidden");

  function openMenu() {
    mobileMenu.classList.add("mobile-menu-open");
    if (mobileMenuIcon && typeof lucide !== "undefined") {
      mobileMenuIcon.setAttribute("data-lucide", "x");
      lucide.createIcons();
    }
  }

  function closeMenu() {
    mobileMenu.classList.remove("mobile-menu-open");
    if (mobileMenuIcon && typeof lucide !== "undefined") {
      mobileMenuIcon.setAttribute("data-lucide", "menu");
      lucide.createIcons();
    }
  }

  function toggleMenu() {
    if (mobileMenu.classList.contains("mobile-menu-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  mobileToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close when clicking any navigation link
  mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  // Close when pressing Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu.classList.contains("mobile-menu-open")) {
      closeMenu();
    }
  });

  // Close when clicking outside of the drawer
  document.addEventListener("click", (e) => {
    if (mobileMenu.classList.contains("mobile-menu-open") &&
        !mobileMenu.contains(e.target) &&
        !mobileToggle.contains(e.target)) {
      closeMenu();
    }
  });
}

/**
 * 4. Subtle Reveal On Scroll Controller
 * Uses IntersectionObserver for 60fps hardware-accelerated cascading entrances.
 */
function initScrollReveal() {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Auto-tag key layout components for subtle elevation
  const selectorsToTag = [
    "#materials .grid > div",
    "#why-choose-us .grid > div",
    "#our-impact .grid > div",
    "#featured-projects .grid > div",
    ".luxury-card-hover",
    "section h2",
    ".faq-item"
  ];

  selectorsToTag.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, index) => {
      if (!el.classList.contains("reveal-on-scroll") &&
          !el.closest("#main-navbar") &&
          !el.closest("footer")) {
        el.classList.add("reveal-on-scroll");
        const delay = (index % 4) * 80;
        if (delay > 0) {
          el.style.transitionDelay = `${delay}ms`;
        }
      }
    });
  });

  const revealElements = document.querySelectorAll(".reveal-on-scroll, .reveal-fade, .reveal-scale");

  if (prefersReduced || !("IntersectionObserver" in window)) {
    revealElements.forEach(el => el.classList.add("is-revealed"));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-revealed");
        obs.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: "0px 0px -40px 0px",
    threshold: 0.12
  });

  revealElements.forEach(el => observer.observe(el));
}

/**
 * 5. Animated Quantitative Metric Counters
 * Animates key metrics like '40+', '3,850+', '12.5M+', '99.4%' on entering viewport.
 */
function initAnimatedCounters() {
  const counterElements = document.querySelectorAll(
    "#our-impact .font-mono, #our-impact .text-4xl, .border-t .font-mono"
  );

  if (!("IntersectionObserver" in window)) return;
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  const animatedSet = new Set();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animatedSet.has(entry.target)) {
        animatedSet.add(entry.target);
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.25 });

  counterElements.forEach(el => {
    const rawText = el.textContent.trim();
    if (/\d/.test(rawText) && !rawText.includes(":") && !rawText.includes("t/m³") && !rawText.includes("m³") && rawText.length <= 10) {
      el.setAttribute("data-target-value", rawText);
      observer.observe(el);
    }
  });

  function animateCounter(el) {
    const raw = el.getAttribute("data-target-value") || el.textContent.trim();
    const match = raw.match(/^([^0-9.]*)([0-9.,]+)(.*)$/);
    if (!match) return;

    const prefix = match[1];
    const numStr = match[2].replace(/,/g, "");
    const suffix = match[3];
    const targetNum = parseFloat(numStr);
    if (isNaN(targetNum)) return;

    const isFloat = numStr.includes(".");
    const decimals = isFloat ? numStr.split(".")[1].length : 0;
    const hasCommas = match[2].includes(",");
    const duration = 1600;
    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const currentVal = targetNum * ease;

      let formattedNum = isFloat ? currentVal.toFixed(decimals) : Math.floor(currentVal).toString();
      if (hasCommas) {
        formattedNum = Number(isFloat ? currentVal.toFixed(decimals) : Math.floor(currentVal)).toLocaleString("en-GB");
      }

      el.textContent = `${prefix}${formattedNum}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = raw;
      }
    }

    requestAnimationFrame(step);
  }
}
function handleContactUrlParams() {
  if (!window.location.search) return;
  const params = new URLSearchParams(window.location.search);

  const postcodeParam = params.get("postcode") || params.get("location");
  const locationInput = document.getElementById("quote-location") || document.querySelector('input[name="deliveryLocation"]') || document.querySelector('input[name="postcode"]');
  if (postcodeParam && locationInput) {
    locationInput.value = decodeURIComponent(postcodeParam).toUpperCase();
  }

  const vehicleParam = params.get("vehicle");
  const vehicleSelect = document.getElementById("quote-vehicle") || document.querySelector('select[name="deliveryMethod"]');
  if (vehicleParam && vehicleSelect) {
    for (let i = 0; i < vehicleSelect.options.length; i++) {
      if (vehicleSelect.options[i].value.toLowerCase().includes(vehicleParam.toLowerCase())) {
        vehicleSelect.selectedIndex = i;
        break;
      }
    }
  }

  const materialParam = params.get("material") || params.get("product");
  const materialSelect = document.getElementById("quote-material");
  if (materialParam && materialSelect) {
    for (let i = 0; i < materialSelect.options.length; i++) {
      if (materialSelect.options[i].value.toLowerCase().includes(materialParam.toLowerCase()) || 
          materialSelect.options[i].text.toLowerCase().includes(materialParam.toLowerCase())) {
        materialSelect.selectedIndex = i;
        break;
      }
    }
  }
}

/**
 * Technical Specification Modal (Luxurious Architectural styling)
 */
function showTechSpecModal(materialId) {
  if (!window.VANGUARD_DATA) return;
  const material = window.VANGUARD_DATA.materials.find(m => m.id === materialId);
  if (!material) return;

  let modal = document.getElementById("tech-spec-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "tech-spec-modal";
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="fixed inset-0 bg-charcoal-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div class="bg-charcoal-900 border border-gold-500/30 rounded-3xl max-w-2xl w-full p-8 sm:p-10 shadow-2xl relative my-8">
        <button onclick="closeTechSpecModal()" class="absolute top-5 right-5 text-sandstone-400 hover:text-white p-2 rounded-xl hover:bg-charcoal-800 transition">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <div class="flex items-center gap-2 mb-2">
          <span class="px-3 py-1 rounded-full bg-gold-950 text-gold-400 border border-gold-700/60 text-xs font-mono font-bold">${material.code}</span>
          <span class="px-3 py-1 rounded-full bg-charcoal-800 border border-earth-700 text-sandstone-300 text-xs font-medium">${material.standard}</span>
        </div>

        <h3 class="text-2xl sm:text-3xl font-black text-ivory-50 tracking-tight font-heading mt-2">${material.name}</h3>
        <p class="text-xs sm:text-sm text-sandstone-300 mt-2 leading-relaxed">${material.fullDesc}</p>

        <!-- Technical Specification Matrix -->
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 my-6 bg-charcoal-950 p-5 rounded-2xl border border-earth-800 text-xs">
          <div>
            <span class="text-earth-400 block uppercase tracking-wider text-[10px] font-semibold">Grading Range</span>
            <span class="text-ivory-50 font-mono font-bold text-sm block mt-0.5">${material.grading}</span>
          </div>
          <div>
            <span class="text-earth-400 block uppercase tracking-wider text-[10px] font-semibold">Bulk Density</span>
            <span class="text-gold-400 font-mono font-bold text-sm block mt-0.5">~${material.density.toFixed(2)} t / m³</span>
          </div>
          <div>
            <span class="text-earth-400 block uppercase tracking-wider text-[10px] font-semibold">Particle Geometry</span>
            <span class="text-ivory-100 font-medium block mt-0.5">${material.properties.grainShape}</span>
          </div>
          <div>
            <span class="text-earth-400 block uppercase tracking-wider text-[10px] font-semibold">Moisture Ratio</span>
            <span class="text-ivory-100 font-medium block mt-0.5">${material.properties.moistureContent}</span>
          </div>
          <div>
            <span class="text-earth-400 block uppercase tracking-wider text-[10px] font-semibold">Hydraulic Class</span>
            <span class="text-gold-300 font-medium block mt-0.5">${material.properties.drainage}</span>
          </div>
          <div>
            <span class="text-earth-400 block uppercase tracking-wider text-[10px] font-semibold">Compaction</span>
            <span class="text-ivory-100 font-medium block mt-0.5">${material.properties.compaction}</span>
          </div>
        </div>

        <!-- Recommended Applications -->
        <div class="mb-6">
          <h4 class="text-[11px] font-bold uppercase tracking-widest text-sandstone-400 mb-2.5">Engineered Site Applications</h4>
          <div class="flex flex-wrap gap-2">
            ${material.applications.map(app => `
              <span class="px-3 py-1 rounded-lg bg-charcoal-800 border border-earth-700 text-ivory-200 text-xs flex items-center gap-1.5 font-medium">
                <span class="w-1.5 h-1.5 rounded-full bg-gold-400"></span>
                ${app}
              </span>
            `).join("")}
          </div>
        </div>

        <!-- Supply Options & Actions (Strict Quotation Architecture) -->
        <div class="pt-5 border-t border-earth-800 flex flex-wrap items-center justify-between gap-4">
          <div class="text-xs text-earth-400">
            Available: <strong class="text-ivory-100">${material.supplyTypes.includes("loose") ? "Bulk Loose (Tipper)" : ""} ${material.supplyTypes.includes("bulk-bag") ? "+ 850kg Bags" : ""}</strong>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="closeTechSpecModal(); openRequestPricingModal('${material.id}')" class="px-5 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-gold-500/20 flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
              <span>Request Pricing</span>
            </button>
            <button onclick="addMaterialToQuoteDirect('${material.id}', 10, 'tonnes-loose')" class="px-4 py-2.5 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-ivory-100 font-bold text-xs uppercase tracking-wider transition border border-earth-700">
              Add to Quote List
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove("hidden");
}

function closeTechSpecModal() {
  const modal = document.getElementById("tech-spec-modal");
  if (modal) modal.classList.add("hidden");
}

function addMaterialToQuoteDirect(materialId, qty, unitType) {
  if (!window.VANGUARD_DATA || !window.VanguardQuoteCart) return;
  const material = window.VANGUARD_DATA.materials.find(m => m.id === materialId);
  if (!material) return;

  window.VanguardQuoteCart.addItem({
    id: material.id,
    name: material.name,
    unitType: unitType,
    quantityTonnes: unitType === "tonnes-loose" ? qty : 0,
    quantityBags: unitType === "bulk-bag" ? qty : 0,
    notes: "Direct selection from Technical Data Sheet"
  });

  closeTechSpecModal();
}

/**
 * Home Page Calculator Setup
 */
function initHomeCalculator() {
  const calcForm = document.getElementById("home-calculator-form");
  if (!calcForm) return;

  const materialSelect = document.getElementById("calc-material");
  const shapeSelect = document.getElementById("calc-shape");
  const lengthInput = document.getElementById("calc-length");
  const widthInput = document.getElementById("calc-width");
  const depthInput = document.getElementById("calc-depth");
  const bufferCheckbox = document.getElementById("calc-buffer");
  const widthContainer = document.getElementById("calc-width-container");

  // Populate materials dropdown if empty
  if (materialSelect && window.VANGUARD_DATA && materialSelect.children.length <= 1) {
    materialSelect.innerHTML = window.VANGUARD_DATA.materials.map(m => `
      <option value="${m.id}" ${m.id === "mot-type-1" ? "selected" : ""}>${m.name} (~${m.density} t/m³)</option>
    `).join("");
  }

  // Handle shape change
  if (shapeSelect && widthContainer) {
    shapeSelect.addEventListener("change", () => {
      if (shapeSelect.value === "circle") {
        widthContainer.classList.add("hidden");
        const lengthLabel = document.getElementById("calc-dim1-label");
        if (lengthLabel) lengthLabel.textContent = "Diameter (Meters)";
      } else {
        widthContainer.classList.remove("hidden");
        const lengthLabel = document.getElementById("calc-dim1-label");
        if (lengthLabel) lengthLabel.textContent = "Length (Meters)";
      }
      runEstimate();
    });
  }

  function runEstimate() {
    if (!window.VanguardCalculator) return;
    const materialId = materialSelect ? materialSelect.value : "mot-type-1";
    const shape = shapeSelect ? shapeSelect.value : "rectangle";
    const length = parseFloat(lengthInput ? lengthInput.value : 10) || 1;
    const width = parseFloat(widthInput ? widthInput.value : 5) || 1;
    const depthMm = parseFloat(depthInput ? depthInput.value : 100) || 50;
    const includeBuffer = bufferCheckbox ? bufferCheckbox.checked : true;

    const result = window.VanguardCalculator.estimate({
      materialId,
      shape,
      length,
      width,
      depthMm,
      includeBuffer
    });

    const volEl = document.getElementById("calc-result-volume");
    const tonnesEl = document.getElementById("calc-result-tonnes");
    const tippersEl = document.getElementById("calc-result-tippers");
    const bagsEl = document.getElementById("calc-result-bags");
    const summaryTextEl = document.getElementById("calc-result-summary");

    if (volEl) volEl.textContent = `${result.totalVolume} m³`;
    if (tonnesEl) tonnesEl.textContent = `${result.roundedTonnes} Tonnes`;
    if (tippersEl) tippersEl.textContent = `${result.fullTippers} Load${result.fullTippers > 1 ? "s" : ""} (8-Wheel Rigid)`;
    if (bagsEl) bagsEl.textContent = `${result.bulkBags} Bags (~850kg)`;
    if (summaryTextEl) {
      summaryTextEl.textContent = `Calculated against ${result.materialName} bulk density of ${result.density} t/m³ ${result.bufferApplied ? "with 10% compaction & grade allowance" : ""}.`;
    }

    const applyBtn = document.getElementById("calc-apply-quote-btn");
    if (applyBtn) {
      applyBtn.onclick = () => {
        window.VanguardCalculator.transferToQuote(result);
      };
    }
  }

  [materialSelect, shapeSelect, lengthInput, widthInput, depthInput, bufferCheckbox].forEach(el => {
    if (el) {
      el.addEventListener("input", runEstimate);
      el.addEventListener("change", runEstimate);
    }
  });

  runEstimate();
}

/**
 * Products Catalogue Filter & Search (Luxurious Architecture Cards)
 * Strictly quotation-based; no fake checkout or consumer cart.
 */
function initProductsCatalogue() {
  const container = document.getElementById("products-catalog-grid");
  if (!container || !window.VANGUARD_DATA) return;

  const searchInput = document.getElementById("product-search-input");
  const categoryFilters = document.querySelectorAll(".category-filter-btn");
  const supplyFilter = document.getElementById("product-supply-filter");
  const countBadge = document.getElementById("products-found-count");

  // Category alias mapping for URL query parameters & backward compatibility
  const categoryAliasMap = {
    "sands": "sand",
    "sand": "sand",
    "manufactured-sand": "manufactured-sand",
    "msand": "manufactured-sand",
    "m-sand": "manufactured-sand",
    "aggregates": "aggregates",
    "aggregate": "aggregates",
    "ballast": "aggregates",
    "drainage": "aggregates",
    "gravels": "gravel",
    "gravel": "gravel",
    "sub-bases": "crushed-stone",
    "crushed-stone": "crushed-stone",
    "stone": "crushed-stone",
    "topsoil": "aggregates",
    "recycled": "aggregates"
  };

  let activeCategory = "all";
  let searchTerm = "";
  let activeSupply = "all";

  // Check URL category and search parameters
  if (window.location.search) {
    const urlParams = new URLSearchParams(window.location.search);
    const cat = urlParams.get("category");
    if (cat) {
      const normalizedCat = categoryAliasMap[cat.toLowerCase()] || cat.toLowerCase();
      activeCategory = normalizedCat;
      categoryFilters.forEach(b => {
        const btnCat = b.getAttribute("data-category");
        if (btnCat === normalizedCat) {
          b.classList.add("bg-gold-500", "text-charcoal-950", "font-bold");
          b.classList.remove("bg-charcoal-850", "text-sandstone-300");
        } else {
          b.classList.remove("bg-gold-500", "text-charcoal-950", "font-bold");
          b.classList.add("bg-charcoal-850", "text-sandstone-300");
        }
      });
    }

    const searchQuery = urlParams.get("search");
    if (searchQuery && searchInput) {
      searchTerm = searchQuery;
      searchInput.value = searchQuery;
    }
  }

  function render() {
    let filtered = window.VANGUARD_DATA.materials.filter(m => {
      if (activeCategory !== "all" && m.category !== activeCategory) {
        return false;
      }
      if (activeSupply === "loose" && !m.supplyTypes.includes("loose")) {
        return false;
      }
      if (activeSupply === "bulk-bag" && !m.supplyTypes.includes("bulk-bag")) {
        return false;
      }
      if (searchTerm.trim() !== "") {
        const query = searchTerm.toLowerCase();
        const matchesName = m.name && m.name.toLowerCase().includes(query);
        const matchesCode = m.code && m.code.toLowerCase().includes(query);
        const matchesGrading = m.grading && m.grading.toLowerCase().includes(query);
        const matchesStandard = m.standard && m.standard.toLowerCase().includes(query);
        const categoryLabel = (window.VANGUARD_DATA.categoryLabels && window.VANGUARD_DATA.categoryLabels[m.category]) || m.category;
        const matchesCategory = categoryLabel.toLowerCase().includes(query) || m.category.toLowerCase().includes(query);
        const matchesDesc = (m.shortDesc && m.shortDesc.toLowerCase().includes(query)) || (m.fullDesc && m.fullDesc.toLowerCase().includes(query));
        const matchesApps = m.applications && m.applications.some(a => a.toLowerCase().includes(query));
        if (!matchesName && !matchesCode && !matchesGrading && !matchesStandard && !matchesCategory && !matchesDesc && !matchesApps) {
          return false;
        }
      }
      return true;
    });

    if (countBadge) {
      countBadge.textContent = `${filtered.length} Material${filtered.length === 1 ? "" : "s"} Found`;
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-span-full py-20 text-center bg-charcoal-900 rounded-3xl border border-earth-800 p-8 shadow-2xl">
          <div class="w-14 h-14 mx-auto rounded-2xl bg-charcoal-800 flex items-center justify-center text-sandstone-400 mb-4 border border-earth-700">
            <svg class="w-6 h-6 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </div>
          <h4 class="text-xl font-bold text-ivory-50 font-heading">No materials matched your search</h4>
          <p class="text-xs sm:text-sm text-sandstone-400 mt-2 max-w-md mx-auto leading-relaxed font-light">Try adjusting your keywords, selecting All Materials, or contacting our dispatch desk for custom quarry gradings.</p>
          <button onclick="resetProductFilters()" class="mt-6 px-6 py-3 bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-lg shadow-gold-500/20">Reset All Filters</button>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(m => {
      const categoryLabel = (window.VANGUARD_DATA.categoryLabels && window.VANGUARD_DATA.categoryLabels[m.category]) || m.category;
      return `
      <div class="bg-charcoal-900 border border-earth-800 hover:border-gold-500/50 rounded-3xl overflow-hidden flex flex-col transition duration-500 group shadow-xl luxury-card-hover">
        <!-- Uniform, Consistent Image Container (h-60 / 240px) -->
        <div class="relative h-60 w-full overflow-hidden bg-charcoal-950">
          <img src="${m.image}" alt="${m.name}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100" />
          <div class="absolute inset-0 image-scrim pointer-events-none"></div>
          
          <!-- Badges on Image -->
          <div class="absolute top-4 left-4 flex flex-wrap gap-2">
            <span class="px-3 py-1 rounded-full bg-charcoal-950/90 backdrop-blur-md text-gold-400 border border-gold-500/30 text-xs font-mono font-semibold">${m.grading}</span>
            <span class="px-2.5 py-1 rounded-full bg-charcoal-950/85 backdrop-blur-md text-ivory-200 border border-earth-700 text-[11px] font-mono">${m.standard.split(":")[0]}</span>
          </div>

          <div class="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs">
            <span class="text-sandstone-300 font-mono bg-charcoal-950/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-earth-800 text-[11px]">Density: ~${m.density.toFixed(2)} t/m³</span>
            <span class="text-gold-300 font-medium bg-charcoal-950/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-earth-800 text-[11px] truncate max-w-[130px]">${m.properties.grainShape}</span>
          </div>
        </div>

        <!-- Body -->
        <div class="p-6 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between text-xs text-sandstone-400 mb-2">
              <span class="uppercase tracking-widest font-semibold text-gold-400 text-[10px] px-2 py-0.5 rounded bg-gold-950/80 border border-gold-800/40">${categoryLabel}</span>
              <span class="font-mono text-earth-400 text-[11px]">${m.code}</span>
            </div>
            
            <h3 class="text-xl font-bold text-ivory-50 group-hover:text-gold-400 transition duration-300 leading-snug font-heading">${m.name}</h3>
            
            <p class="text-xs text-sandstone-300 mt-2.5 line-clamp-2 leading-relaxed font-light">${m.shortDesc}</p>

            <!-- Key Specifications Matrix Box -->
            <div class="grid grid-cols-2 gap-2 mt-4 p-3 bg-charcoal-950 rounded-xl border border-earth-800 text-[11px]">
              <div>
                <span class="text-earth-400 block uppercase tracking-wider text-[9px] font-semibold">Available Sizes</span>
                <strong class="text-ivory-100 font-mono text-xs block truncate">${m.grading}</strong>
              </div>
              <div>
                <span class="text-earth-400 block uppercase tracking-wider text-[9px] font-semibold">Standard Spec</span>
                <strong class="text-gold-400 font-mono text-xs block truncate">${m.standard}</strong>
              </div>
              <div>
                <span class="text-earth-400 block uppercase tracking-wider text-[9px] font-semibold">Bulk Density</span>
                <strong class="text-sandstone-200 font-mono text-xs block">~${m.density.toFixed(2)} t / m³</strong>
              </div>
              <div>
                <span class="text-earth-400 block uppercase tracking-wider text-[9px] font-semibold">Grain Texture</span>
                <span class="text-ivory-300 block text-[11px] truncate font-medium" title="${m.properties.grainShape}">${m.properties.grainShape}</span>
              </div>
            </div>

            <!-- Applications tags -->
            <div class="mt-4 flex flex-wrap gap-1.5">
              ${m.applications.slice(0, 3).map(app => `
                <span class="px-2.5 py-1 rounded-lg bg-charcoal-800 text-[11px] text-ivory-300 border border-earth-700 font-medium">${app}</span>
              `).join("")}
              ${m.applications.length > 3 ? `<span class="px-2 py-1 rounded-lg bg-charcoal-800 text-[10px] text-sandstone-400 border border-earth-700">+${m.applications.length - 3}</span>` : ""}
            </div>
          </div>

          <!-- Bottom Action Buttons: Spec Sheet & Request Pricing -->
          <div class="mt-6 pt-5 border-t border-earth-800 flex items-center justify-between gap-3">
            <button onclick="showTechSpecModal('${m.id}')" class="text-xs font-semibold text-sandstone-300 hover:text-gold-400 transition flex items-center gap-1.5 py-2">
              <svg class="w-4 h-4 text-gold-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              <span>Spec Sheet</span>
            </button>
            
            <button onclick="openRequestPricingModal('${m.id}')" class="px-4 py-2.5 bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-md shadow-gold-500/20 flex items-center gap-1.5 group">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
              <span>Request Pricing</span>
            </button>
          </div>
        </div>
      </div>
      `;
    }).join("");

    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }
  }

  // Animated render wrapper for smooth filter transitions
  function renderWithAnimation() {
    container.classList.add("grid-filter-fade");
    container.classList.remove("grid-filter-visible");
    setTimeout(() => {
      render();
      container.classList.remove("grid-filter-fade");
      container.classList.add("grid-filter-visible");
    }, 140);
  }

  // Category buttons
  categoryFilters.forEach(btn => {
    btn.addEventListener("click", () => {
      categoryFilters.forEach(b => {
        b.classList.remove("bg-gold-500", "text-charcoal-950", "font-bold", "active-category");
        b.classList.add("bg-charcoal-850", "text-sandstone-300");
      });
      btn.classList.add("bg-gold-500", "text-charcoal-950", "font-bold", "active-category");
      btn.classList.remove("bg-charcoal-850", "text-sandstone-300");
      activeCategory = btn.getAttribute("data-category") || "all";

      // Sync URL parameter smoothly without reloading
      if (window.history && window.history.replaceState) {
        const url = new URL(window.location);
        if (activeCategory === "all") {
          url.searchParams.delete("category");
        } else {
          url.searchParams.set("category", activeCategory);
        }
        window.history.replaceState({}, "", url);
      }

      renderWithAnimation();
    });
  });

  if (supplyFilter) {
    supplyFilter.addEventListener("change", () => {
      activeSupply = supplyFilter.value;
      renderWithAnimation();
    });
  }

  let searchDebounce = null;
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      clearTimeout(searchDebounce);
      searchDebounce = setTimeout(() => {
        searchTerm = searchInput.value;
        renderWithAnimation();
      }, 120);
    });
  }

  window.resetProductFilters = function() {
    activeCategory = "all";
    searchTerm = "";
    activeSupply = "all";
    if (searchInput) searchInput.value = "";
    if (supplyFilter) supplyFilter.value = "all";
    categoryFilters.forEach((b, i) => {
      if (i === 0) {
        b.classList.add("bg-gold-500", "text-charcoal-950", "font-bold", "active-category");
        b.classList.remove("bg-charcoal-850", "text-sandstone-300");
      } else {
        b.classList.remove("bg-gold-500", "text-charcoal-950", "font-bold", "active-category");
        b.classList.add("bg-charcoal-850", "text-sandstone-300");
      }
    });

    if (window.history && window.history.replaceState) {
      const url = new URL(window.location);
      url.searchParams.delete("category");
      url.searchParams.delete("search");
      window.history.replaceState({}, "", url);
    }

    renderWithAnimation();
  };

  render();
}

/**
 * Request Pricing Modal (Commercial Quotation Architecture)
 * Strictly quotation-based; no fake e-commerce checkout.
 */
function openRequestPricingModal(materialId) {
  if (!window.VANGUARD_DATA) return;
  const material = window.VANGUARD_DATA.materials.find(m => m.id === materialId) || window.VANGUARD_DATA.materials[0];
  if (!material) return;

  const categoryLabel = (window.VANGUARD_DATA.categoryLabels && window.VANGUARD_DATA.categoryLabels[material.category]) || material.category;

  let modal = document.getElementById("request-pricing-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "request-pricing-modal";
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="fixed inset-0 bg-charcoal-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div class="bg-charcoal-900 border border-gold-500/30 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
        <button onclick="closeRequestPricingModal()" class="absolute top-5 right-5 text-sandstone-400 hover:text-white p-2 rounded-xl hover:bg-charcoal-800 transition">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <div class="flex items-center gap-2 mb-2">
          <span class="px-3 py-1 rounded-full bg-gold-950 text-gold-400 border border-gold-700/60 text-xs font-mono font-bold">${material.code}</span>
          <span class="px-3 py-1 rounded-full bg-charcoal-800 border border-earth-700 text-sandstone-300 text-xs font-medium uppercase tracking-wider">${categoryLabel}</span>
          <span class="px-3 py-1 rounded-full bg-charcoal-800 border border-earth-700 text-gold-400 text-xs font-mono">B2B Quotation Desk</span>
        </div>

        <h3 class="text-2xl sm:text-3xl font-black text-ivory-50 tracking-tight font-heading mt-2">Request Material Pricing</h3>
        <p class="text-xs sm:text-sm text-sandstone-300 mt-1 leading-relaxed font-light">
          Request official quarry trade tariff and haulage calculation for <strong>${material.name}</strong>. No cart or e-commerce checkout required.
        </p>

        <!-- Material Specification Strip -->
        <div class="mt-4 p-4 rounded-2xl bg-charcoal-950 border border-earth-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <span class="text-earth-400 block text-[10px] uppercase font-semibold">Available Sizes</span>
            <strong class="text-gold-400 font-mono">${material.grading}</strong>
          </div>
          <div>
            <span class="text-earth-400 block text-[10px] uppercase font-semibold">Bulk Density</span>
            <strong class="text-ivory-100 font-mono">~${material.density.toFixed(2)} t/m³</strong>
          </div>
          <div>
            <span class="text-earth-400 block text-[10px] uppercase font-semibold">Governing Standard</span>
            <strong class="text-ivory-100 font-mono text-[11px] truncate block">${material.standard}</strong>
          </div>
          <div>
            <span class="text-earth-400 block text-[10px] uppercase font-semibold">Available Formats</span>
            <strong class="text-ivory-100 text-[11px]">${material.supplyTypes.includes("loose") ? "Bulk Loose" : ""} ${material.supplyTypes.includes("bulk-bag") ? "+ Bags" : ""}</strong>
          </div>
        </div>

        <!-- Quotation Request Form -->
        <form id="direct-pricing-form" onsubmit="submitDirectPricingInquiry(event, '${material.id}')" class="mt-5 space-y-4 text-xs">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sandstone-300 font-semibold mb-1">Estimated Required Quantity</label>
              <div class="flex gap-2">
                <input type="number" id="pricing-qty" min="1" max="10000" value="20" required class="w-1/2 bg-charcoal-950 border border-earth-800 rounded-xl px-3 py-2.5 text-ivory-50 text-sm font-mono focus:border-gold-500 focus:outline-none" />
                <select id="pricing-unit" class="w-1/2 bg-charcoal-950 border border-earth-800 rounded-xl px-2.5 py-2.5 text-ivory-50 text-xs focus:border-gold-500 focus:outline-none">
                  <option value="tonnes-loose">Tonnes (Bulk Tipper)</option>
                  <option value="bulk-bag">Bulk Bags (~850kg)</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-sandstone-300 font-semibold mb-1">Delivery Site Postcode</label>
              <input type="text" id="pricing-postcode" placeholder="e.g. B78 3EQ, CV4, WS14" required class="w-full bg-charcoal-950 border border-earth-800 rounded-xl px-3 py-2.5 text-ivory-50 text-sm font-mono uppercase placeholder-earth-500 focus:border-gold-500 focus:outline-none" />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sandstone-300 font-semibold mb-1">Preferred Haulage Method</label>
              <select id="pricing-vehicle" class="w-full bg-charcoal-950 border border-earth-800 rounded-xl px-3 py-2.5 text-ivory-50 text-xs focus:border-gold-500 focus:outline-none">
                <option value="tipper-8wheel">8-Wheel Rigid Tipper (Rear Tipped - 20t)</option>
                <option value="grab-8wheel">8-Wheel Grab Lorry (Crane Over Wall - 16t)</option>
                <option value="hiab-crane">Crane Offload Truck (Curbside Bulk Bags)</option>
                <option value="artic-bulk">Artic Bulk Tipper (Major Infrastructure - 30t)</option>
                <option value="collection">Self-Collection at Quarry Weighbridge</option>
              </select>
            </div>

            <div>
              <label class="block text-sandstone-300 font-semibold mb-1">Target Delivery Date</label>
              <input type="date" id="pricing-target-date" class="w-full bg-charcoal-950 border border-earth-800 rounded-xl px-3 py-2 text-ivory-50 text-xs focus:border-gold-500 focus:outline-none" />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sandstone-300 font-semibold mb-1">Your Name / Estimator Name *</label>
              <input type="text" id="pricing-name" placeholder="Johnathan Reed" required class="w-full bg-charcoal-950 border border-earth-800 rounded-xl px-3 py-2 text-ivory-50 text-xs placeholder-earth-500 focus:border-gold-500 focus:outline-none" />
            </div>

            <div>
              <label class="block text-sandstone-300 font-semibold mb-1">Company / Project Name</label>
              <input type="text" id="pricing-company" placeholder="Reed Civil Engineering Ltd" class="w-full bg-charcoal-950 border border-earth-800 rounded-xl px-3 py-2 text-ivory-50 text-xs placeholder-earth-500 focus:border-gold-500 focus:outline-none" />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sandstone-300 font-semibold mb-1">Phone Number (For Fast Weighbridge Callback) *</label>
              <input type="tel" id="pricing-phone" placeholder="07700 900123" required class="w-full bg-charcoal-950 border border-earth-800 rounded-xl px-3 py-2 text-ivory-50 text-xs font-mono placeholder-earth-500 focus:border-gold-500 focus:outline-none" />
            </div>

            <div>
              <label class="block text-sandstone-300 font-semibold mb-1">Email Address (For Formal PDF Quote) *</label>
              <input type="email" id="pricing-email" placeholder="estimating@company.co.uk" required class="w-full bg-charcoal-950 border border-earth-800 rounded-xl px-3 py-2 text-ivory-50 text-xs placeholder-earth-500 focus:border-gold-500 focus:outline-none" />
            </div>
          </div>

          <div>
            <label class="block text-sandstone-300 font-semibold mb-1">Site Access Notes or Special Requirements</label>
            <input type="text" id="pricing-notes" placeholder="e.g. Narrow residential gateway, overhead power cables, timed 08:00 AM delivery" class="w-full bg-charcoal-950 border border-earth-800 rounded-xl px-3 py-2 text-ivory-50 text-xs placeholder-earth-500 focus:border-gold-500 focus:outline-none" />
          </div>

          <div class="pt-3 border-t border-earth-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div class="text-[11px] text-sandstone-400 font-mono">
              Quarry Weighbridge Hotline: <a href="tel:08008482626" class="text-gold-400 font-bold hover:underline">(0800) 848-2626</a>
            </div>

            <div class="flex items-center gap-2 w-full sm:w-auto">
              <button type="button" onclick="addMaterialToMasterQuote('${material.id}')" class="px-4 py-2.5 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-sandstone-200 font-bold text-xs uppercase tracking-wider transition border border-earth-700">
                + Add to Master Quote
              </button>
              <button type="submit" class="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-gold-500/25 luxury-glow flex items-center justify-center gap-2">
                <span>Submit Pricing Inquiry</span>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </div>
          </div>
        </form>

        <div id="pricing-success-view" class="hidden mt-6 p-6 rounded-2xl bg-charcoal-950 border border-gold-500/50 text-center">
          <div class="w-12 h-12 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center mx-auto mb-3 border border-gold-500/40">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
          </div>
          <span class="px-3 py-1 rounded-full bg-gold-950 text-gold-400 font-mono font-bold text-xs border border-gold-800" id="pricing-ref-code">VNG-PRC-00000</span>
          <h4 class="text-xl font-bold text-ivory-50 font-heading mt-2">Pricing Inquiry Received</h4>
          <p class="text-xs text-sandstone-300 mt-2 max-w-md mx-auto leading-relaxed" id="pricing-success-message">
            Your inquiry for ${material.name} has been routed directly to our quarry weighbridge desk. A surveyor will contact you with certified tonnage rates within 30 minutes.
          </p>
          <div class="mt-5 flex items-center justify-center gap-3">
            <a href="contact.html#quote-builder" class="px-4 py-2 bg-charcoal-800 hover:bg-charcoal-700 text-ivory-100 rounded-xl text-xs font-semibold border border-earth-700 transition">View Active Quotations</a>
            <button onclick="closeRequestPricingModal()" class="px-5 py-2 bg-gold-500 hover:bg-gold-400 text-charcoal-950 rounded-xl text-xs font-bold uppercase tracking-wider transition">Done</button>
          </div>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove("hidden");
}

function closeRequestPricingModal() {
  const modal = document.getElementById("request-pricing-modal");
  if (modal) modal.classList.add("hidden");
}

function submitDirectPricingInquiry(e, materialId) {
  e.preventDefault();
  if (!window.VANGUARD_DATA) return;
  const material = window.VANGUARD_DATA.materials.find(m => m.id === materialId);
  if (!material) return;

  const qty = document.getElementById("pricing-qty") ? document.getElementById("pricing-qty").value : "20";
  const unit = document.getElementById("pricing-unit") ? document.getElementById("pricing-unit").value : "tonnes-loose";
  const postcode = document.getElementById("pricing-postcode") ? document.getElementById("pricing-postcode").value : "";
  const vehicle = document.getElementById("pricing-vehicle") ? document.getElementById("pricing-vehicle").value : "tipper-8wheel";
  const name = document.getElementById("pricing-name") ? document.getElementById("pricing-name").value : "";
  const company = document.getElementById("pricing-company") ? document.getElementById("pricing-company").value : "";
  const phone = document.getElementById("pricing-phone") ? document.getElementById("pricing-phone").value : "";
  const email = document.getElementById("pricing-email") ? document.getElementById("pricing-email").value : "";
  const notes = document.getElementById("pricing-notes") ? document.getElementById("pricing-notes").value : "";
  const targetDate = document.getElementById("pricing-target-date") ? document.getElementById("pricing-target-date").value : "";

  const refCode = "VNG-PRC-" + Math.floor(10000 + Math.random() * 90000);

  // Store in inquiry manager
  const inquiryRecord = {
    refCode,
    date: new Date().toISOString(),
    materialId: material.id,
    materialName: material.name,
    category: material.category,
    quantity: qty,
    unit: unit,
    postcode,
    vehicle,
    targetDate,
    customer: { name, company, phone, email },
    notes,
    status: "Processing by Dispatch Desk"
  };

  try {
    const existing = JSON.parse(localStorage.getItem("vanguard_pricing_inquiries") || "[]");
    existing.push(inquiryRecord);
    localStorage.setItem("vanguard_pricing_inquiries", JSON.stringify(existing));
  } catch (err) {
    console.warn("Storage error", err);
  }

  // Also record in backend API
  fetch("/api/quote", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fullName: name,
      companyName: company || "Direct Pricing Inquiry",
      phone: phone,
      email: email,
      materialRequired: material.name,
      quantityRequired: qty,
      unit: unit === "tonnes-loose" ? "Tonnes (Loose Tipped)" : "Bulk Bags (~850kg)",
      deliveryLocation: postcode,
      requiredDeliveryDate: targetDate || new Date(Date.now() + 86400000*2).toISOString().split("T")[0],
      deliveryMethod: vehicle,
      additionalRequirements: notes
    })
  }).then(res => res.json()).then(data => {
    if (data && data.referenceCode && refCodeEl) {
      refCodeEl.textContent = data.referenceCode;
    }
  }).catch(e => console.warn("API sync:", e));

  // Hide form, show confirmation
  const form = document.getElementById("direct-pricing-form");
  const successView = document.getElementById("pricing-success-view");
  const refCodeEl = document.getElementById("pricing-ref-code");
  const successMsg = document.getElementById("pricing-success-message");

  if (form) form.classList.add("hidden");
  if (successView) successView.classList.remove("hidden");
  if (refCodeEl) refCodeEl.textContent = refCode;
  if (successMsg) {
    const unitText = unit === "tonnes-loose" ? "Tonnes (Bulk Loose)" : "Bulk Bags";
    successMsg.textContent = `Your inquiry for ${qty} ${unitText} of ${material.name} to site ${postcode.toUpperCase()} has been submitted under reference ${refCode}. Our dispatch surveyor will call ${phone} within 30 minutes with calibrated haulage rates.`;
  }
}

function addMaterialToMasterQuote(materialId) {
  if (!window.VANGUARD_DATA || !window.VanguardQuoteCart) return;
  const material = window.VANGUARD_DATA.materials.find(m => m.id === materialId);
  if (!material) return;

  const qty = document.getElementById("pricing-qty") ? Number(document.getElementById("pricing-qty").value) || 20 : 20;
  const unit = document.getElementById("pricing-unit") ? document.getElementById("pricing-unit").value : "tonnes-loose";
  const postcode = document.getElementById("pricing-postcode") ? document.getElementById("pricing-postcode").value : "";

  window.VanguardQuoteCart.addItem({
    id: material.id,
    name: material.name,
    unitType: unit,
    quantityTonnes: unit === "tonnes-loose" ? qty : 0,
    quantityBags: unit === "bulk-bag" ? qty : 0,
    notes: `Added from Pricing Request Modal. Target Postcode: ${postcode || "TBC"}`
  });

  closeRequestPricingModal();
  window.location.href = "contact.html#quote-builder";
}

// Global exposure for event handlers
if (typeof window !== "undefined") {
  window.openRequestPricingModal = openRequestPricingModal;
  window.closeRequestPricingModal = closeRequestPricingModal;
  window.submitDirectPricingInquiry = submitDirectPricingInquiry;
  window.addMaterialToMasterQuote = addMaterialToMasterQuote;
  window.showTechSpecModal = showTechSpecModal;
  window.closeTechSpecModal = closeTechSpecModal;
  window.addMaterialToQuoteDirect = addMaterialToQuoteDirect;
}

function quickAddProduct(materialId, qty, unitType) {
  if (!window.VANGUARD_DATA || !window.VanguardQuoteCart) return;
  const material = window.VANGUARD_DATA.materials.find(m => m.id === materialId);
  if (!material) return;

  window.VanguardQuoteCart.addItem({
    id: material.id,
    name: material.name,
    unitType: unitType,
    quantityTonnes: unitType === "tonnes-loose" ? qty : 0,
    quantityBags: unitType === "bulk-bag" ? qty : 0,
    notes: "Added from Product Catalog"
  });
}

/**
 * Delivery Zone Estimator (Luxurious styling)
 */
function initDeliveryEstimator() {
  const checkBtn = document.getElementById("zone-check-btn");
  const postcodeInput = document.getElementById("zone-postcode-input");
  const resultBox = document.getElementById("zone-check-result");

  if (!checkBtn || !postcodeInput || !resultBox) return;

  checkBtn.addEventListener("click", () => {
    const code = postcodeInput.value.trim().toUpperCase();
    if (!code) {
      alert("Please enter a valid UK postcode (e.g., B78 3EQ, CV4, WS14).");
      return;
    }

    let zoneNumber = 1;
    let distanceApprox = 8;
    const prefix = code.split(" ")[0].substring(0, 2);

    if (["B7", "B8", "CV", "WS"].includes(prefix)) {
      zoneNumber = 1;
      distanceApprox = Math.floor(4 + Math.random() * 8);
    } else if (["DY", "LE", "WR", "ST", "NN"].includes(prefix)) {
      zoneNumber = 2;
      distanceApprox = Math.floor(18 + Math.random() * 14);
    } else {
      zoneNumber = 3;
      distanceApprox = Math.floor(38 + Math.random() * 25);
    }

    const zoneInfo = window.VANGUARD_DATA.deliveryZones.find(z => z.zone === zoneNumber) || window.VANGUARD_DATA.deliveryZones[0];

    resultBox.innerHTML = `
      <div class="p-5 rounded-2xl bg-charcoal-950 border border-gold-500/40 text-left">
        <div class="flex items-center justify-between mb-2">
          <span class="px-3 py-1 rounded-full bg-gold-950 text-gold-400 font-mono font-bold text-xs border border-gold-700/50">
            Postcode: ${code} (~${distanceApprox} Miles to nearest Depot)
          </span>
          <span class="text-xs font-bold text-gold-300 uppercase tracking-wider">Eligible for Haulage</span>
        </div>
        <h4 class="text-base font-bold text-ivory-50 font-heading mt-1">${zoneInfo.title}</h4>
        <p class="text-xs text-sandstone-300 mt-1 leading-relaxed">${zoneInfo.coverageNote}</p>
        <div class="grid grid-cols-2 gap-2 mt-4 text-xs bg-charcoal-900 p-3 rounded-xl border border-earth-800">
          <div>
            <span class="text-earth-400 block font-medium">Standard Lead Time:</span>
            <strong class="text-ivory-100">${zoneInfo.leadTime}</strong>
          </div>
          <div>
            <span class="text-earth-400 block font-medium">Minimum Load:</span>
            <strong class="text-gold-400 font-mono">${zoneInfo.minimumOrder}</strong>
          </div>
        </div>
        <div class="mt-4 text-right">
          <a href="contact.html?postcode=${encodeURIComponent(code)}#quote-builder" class="inline-flex items-center gap-2 px-4 py-2 bg-gold-500 hover:bg-gold-400 text-charcoal-950 text-xs font-bold uppercase tracking-wider rounded-xl transition shadow-md shadow-gold-500/20">
            Book Haulage to ${code} &rarr;
          </a>
        </div>
      </div>
    `;
    resultBox.classList.remove("hidden");
  });
}

/**
 * FAQ Accordions
 */
function initFaqAccordions() {
  const faqToggles = document.querySelectorAll(".faq-toggle");
  faqToggles.forEach(toggle => {
    toggle.addEventListener("click", () => {
      const content = toggle.nextElementSibling;
      const icon = toggle.querySelector(".faq-icon");
      if (content) {
        content.classList.toggle("hidden");
      }
      if (icon) {
        icon.classList.toggle("rotate-180");
      }
    });
  });
}

/**
 * Theme Controller: Light Mode / Dark Mode
 */
function initThemeMode() {
  const themeBtns = document.querySelectorAll("#theme-toggle-btn, .theme-toggle-btn");

  function updateThemeUI(isLight) {
    if (isLight) {
      document.documentElement.classList.add("light-mode");
    } else {
      document.documentElement.classList.remove("light-mode");
    }

    document.querySelectorAll(".theme-icon-sun").forEach(icon => {
      icon.classList.toggle("hidden", !isLight);
    });
    document.querySelectorAll(".theme-icon-moon").forEach(icon => {
      icon.classList.toggle("hidden", isLight);
    });
    document.querySelectorAll(".theme-label").forEach(lbl => {
      lbl.textContent = isLight ? "DARK" : "LIGHT";
    });
  }

  // Sync initial UI
  const isCurrentlyLight = document.documentElement.classList.contains("light-mode");
  updateThemeUI(isCurrentlyLight);

  themeBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const willBeLight = !document.documentElement.classList.contains("light-mode");
      updateThemeUI(willBeLight);
      try {
        localStorage.setItem("vanguard-theme", willBeLight ? "light" : "dark");
      } catch (err) {}
      if (typeof lucide !== "undefined") {
        lucide.createIcons();
      }
    });
  });
}

/**
 * Text Direction Controller: LTR / RTL Mode
 */
function initDirectionMode() {
  const rtlBtns = document.querySelectorAll("#rtl-toggle-btn, .rtl-toggle-btn");

  function updateDirUI(isRtl) {
    if (isRtl) {
      document.documentElement.setAttribute("dir", "rtl");
    } else {
      document.documentElement.setAttribute("dir", "ltr");
    }

    document.querySelectorAll(".rtl-label").forEach(lbl => {
      lbl.textContent = isRtl ? "LTR" : "RTL";
    });
  }

  // Sync initial UI
  const isCurrentlyRtl = document.documentElement.getAttribute("dir") === "rtl";
  updateDirUI(isCurrentlyRtl);

  rtlBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const willBeRtl = document.documentElement.getAttribute("dir") !== "rtl";
      updateDirUI(willBeRtl);
      try {
        localStorage.setItem("vanguard-dir", willBeRtl ? "rtl" : "ltr");
      } catch (err) {}
      if (typeof lucide !== "undefined") {
        lucide.createIcons();
      }
    });
  });
}

/**
 * Home Editions Dropdown Controller
 */
function initHomeDropdown() {
  const dropdownContainers = document.querySelectorAll(".dropdown-container");
  
  dropdownContainers.forEach(container => {
    const trigger = container.querySelector("button");
    const menu = container.querySelector(".dropdown-menu");
    if (!trigger || !menu) return;

    // Toggle on click/tap for touch devices
    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      const isExpanded = trigger.getAttribute("aria-expanded") === "true";
      trigger.setAttribute("aria-expanded", String(!isExpanded));
      menu.classList.toggle("opacity-100");
      menu.classList.toggle("visible");
      menu.classList.toggle("pointer-events-auto");
    });
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".dropdown-container")) {
      document.querySelectorAll(".dropdown-container button").forEach(btn => {
        btn.setAttribute("aria-expanded", "false");
      });
      document.querySelectorAll(".dropdown-container .dropdown-menu").forEach(menu => {
        menu.classList.remove("opacity-100", "visible", "pointer-events-auto");
      });
    }
  });
}

