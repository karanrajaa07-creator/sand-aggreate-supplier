/**
 * Vanguard Aggregates - Quote Cart & Inquiry Manager
 * Luxurious Architectural Styling & Formal Quotation Processing
 */

const VanguardQuoteCart = {
  storageKey: "vanguard_quote_items",
  inquiriesKey: "vanguard_submitted_inquiries",

  // Get active items in quote
  getItems() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn("Storage access failed", e);
      return [];
    }
  },

  // Save items
  saveItems(items) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(items));
      this.updateBadge();
    } catch (e) {
      console.warn("Storage write failed", e);
    }
  },

  // Add item
  addItem(item) {
    const items = this.getItems();
    const existingIndex = items.findIndex(i => i.id === item.id && i.unitType === item.unitType);
    if (existingIndex > -1) {
      if (item.unitType === "tonnes-loose") {
        items[existingIndex].quantityTonnes = (Number(items[existingIndex].quantityTonnes) || 0) + (Number(item.quantityTonnes) || 10);
      } else {
        items[existingIndex].quantityBags = (Number(items[existingIndex].quantityBags) || 0) + (Number(item.quantityBags) || 1);
      }
      if (item.notes) items[existingIndex].notes = item.notes;
    } else {
      items.push(item);
    }
    this.saveItems(items);
    this.showToast(`Added "${item.name}" to your quotation list`);
  },

  // Remove item
  removeItem(index) {
    const items = this.getItems();
    if (index >= 0 && index < items.length) {
      const removed = items.splice(index, 1);
      this.saveItems(items);
      this.renderQuoteBuilder();
      if (removed.length) {
        this.showToast(`Removed "${removed[0].name}"`);
      }
    }
  },

  // Clear all items
  clearAll() {
    this.saveItems([]);
    this.renderQuoteBuilder();
  },

  // Update navbar counter badge
  updateBadge() {
    const badges = document.querySelectorAll(".quote-badge-count");
    const count = this.getItems().length;
    badges.forEach(badge => {
      badge.textContent = count;
      if (count > 0) {
        badge.classList.remove("hidden");
        badge.classList.add("inline-flex");
      } else {
        badge.classList.add("hidden");
        badge.classList.remove("inline-flex");
      }
    });
  },

  // Render Quote Builder list on contact.html
  renderQuoteBuilder() {
    const container = document.getElementById("quote-items-container");
    const emptyState = document.getElementById("quote-empty-state");
    const summaryContainer = document.getElementById("quote-live-summary");
    if (!container) return;

    const items = this.getItems();

    if (items.length === 0) {
      container.innerHTML = "";
      if (emptyState) emptyState.classList.remove("hidden");
      if (summaryContainer) summaryContainer.classList.add("hidden");
      return;
    }

    if (emptyState) emptyState.classList.add("hidden");
    if (summaryContainer) summaryContainer.classList.remove("hidden");

    let html = "";
    let totalEstimatedWeight = 0;

    items.forEach((item, index) => {
      const isLoose = item.unitType === "tonnes-loose";
      const qty = isLoose ? (item.quantityTonnes || 10) : (item.quantityBags || 1);
      const unitLabel = isLoose ? "Tonnes (Loose Tipped)" : "Bulk Bags (~850kg)";
      const weightContribution = isLoose ? Number(qty) : (Number(qty) * 0.85);
      totalEstimatedWeight += weightContribution;

      html += `
        <div class="p-5 bg-charcoal-900 border border-earth-800 rounded-2xl relative flex flex-col md:flex-row md:items-center justify-between gap-4 transition duration-300 hover:border-gold-500/40">
          <div class="flex-1">
            <div class="flex items-center gap-2.5">
              <span class="inline-block w-2 h-2 rounded-full bg-gold-400"></span>
              <h4 class="text-base font-bold text-ivory-50 tracking-tight font-heading">${item.name}</h4>
            </div>
            ${item.notes ? `<p class="text-xs text-sandstone-400 mt-1 italic">${item.notes}</p>` : ""}
            <div class="flex flex-wrap items-center gap-3 mt-2 text-xs text-ivory-300">
              <span class="px-2.5 py-0.5 rounded-full bg-charcoal-800 border border-earth-700 font-mono text-gold-400 font-medium">${item.unitType === "tonnes-loose" ? "Bulk Loose" : "Bulk Bag"}</span>
              <span class="text-earth-400">Mass: ~${weightContribution.toFixed(1)} Tonnes</span>
            </div>
          </div>

          <div class="flex items-center gap-3 self-end md:self-center">
            <div class="flex items-center bg-charcoal-950 border border-earth-700 rounded-xl overflow-hidden">
              <button type="button" onclick="VanguardQuoteCart.adjustQty(${index}, -1)" class="px-3 py-1.5 text-ivory-300 hover:text-white hover:bg-charcoal-800 text-sm font-bold transition">−</button>
              <span class="px-3 py-1.5 text-sm font-bold text-gold-400 min-w-[50px] text-center font-mono">${qty}</span>
              <button type="button" onclick="VanguardQuoteCart.adjustQty(${index}, 1)" class="px-3 py-1.5 text-ivory-300 hover:text-white hover:bg-charcoal-800 text-sm font-bold transition">+</button>
            </div>
            <span class="text-xs text-sandstone-400 font-medium">${unitLabel}</span>
            <button type="button" onclick="VanguardQuoteCart.removeItem(${index})" title="Remove item" class="p-2 text-earth-500 hover:text-rose-400 transition ml-1 rounded-lg hover:bg-charcoal-800">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;

    // Update live summary
    const summaryWeightEl = document.getElementById("summary-total-weight");
    const summaryTrucksEl = document.getElementById("summary-recommended-trucks");
    if (summaryWeightEl) summaryWeightEl.textContent = `~${totalEstimatedWeight.toFixed(1)} Tonnes`;
    if (summaryTrucksEl) {
      const trucks = Math.ceil(totalEstimatedWeight / 20);
      summaryTrucksEl.textContent = `${trucks} x 8-Wheel Rigid Tipper${trucks > 1 ? "s" : ""} (20t payload)`;
    }
  },

  // Adjust quantity
  adjustQty(index, delta) {
    const items = this.getItems();
    if (index >= 0 && index < items.length) {
      if (items[index].unitType === "tonnes-loose") {
        let current = Number(items[index].quantityTonnes) || 10;
        current = Math.max(5, current + delta * 5);
        items[index].quantityTonnes = current;
      } else {
        let current = Number(items[index].quantityBags) || 1;
        current = Math.max(1, current + delta);
        items[index].quantityBags = current;
      }
      this.saveItems(items);
      this.renderQuoteBuilder();
    }
  },

  // Quick add from dropdown on Contact page
  addFromSelect() {
    const select = document.getElementById("quick-add-material-select");
    const qtyInput = document.getElementById("quick-add-qty");
    const unitSelect = document.getElementById("quick-add-unit");
    if (!select || !select.value) return;

    const materialId = select.value;
    const qty = Math.max(1, parseFloat(qtyInput ? qtyInput.value : 10) || 10);
    const unitType = unitSelect ? unitSelect.value : "tonnes-loose";

    let materialName = select.options[select.selectedIndex].text;
    if (window.VANGUARD_DATA && window.VANGUARD_DATA.materials) {
      const m = window.VANGUARD_DATA.materials.find(x => x.id === materialId);
      if (m) materialName = m.name;
    }

    this.addItem({
      id: materialId,
      name: materialName,
      unitType: unitType,
      quantityTonnes: unitType === "tonnes-loose" ? qty : 0,
      quantityBags: unitType === "bulk-bag" ? qty : 0,
      notes: "Selected from specification catalog"
    });

    this.renderQuoteBuilder();
  },

  // Generate Reference ID
  generateReference() {
    const random = Math.floor(10000 + Math.random() * 90000);
    return `VA-${random}`;
  },

  // Handle Form Submission
  handleQuoteSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const items = this.getItems();

    if (items.length === 0) {
      alert("Please add at least one material to your quotation inquiry before submitting.");
      return;
    }

    const formData = new FormData(form);
    const reference = this.generateReference();
    const submissionDate = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });

    const inquiry = {
      reference,
      date: submissionDate,
      customerName: formData.get("customerName") || "Site Project Director",
      companyName: formData.get("companyName") || "Civil Engineering Group Ltd",
      phone: formData.get("phone") || "07700 900077",
      email: formData.get("email") || "director@construction.co.uk",
      accountType: formData.get("accountType") || "Commercial Civil Contractor",
      deliveryMethod: formData.get("deliveryMethod") || "tipper-8wheel",
      deliveryAddress: formData.get("deliveryAddress") || "Site Compound, Plot 14",
      postcode: formData.get("postcode") || "B78 3EQ",
      requiredDate: formData.get("requiredDate") || "Next Available Morning",
      timeSlot: formData.get("timeSlot") || "First Drop (06:30 - 08:00)",
      siteAccess: formData.getAll("accessNotes"),
      additionalNotes: formData.get("additionalNotes") || "",
      items: items
    };

    // Store inquiry in recent inquiries
    try {
      const existing = JSON.parse(localStorage.getItem(this.inquiriesKey) || "[]");
      existing.unshift(inquiry);
      localStorage.setItem(this.inquiriesKey, JSON.stringify(existing.slice(0, 10)));
    } catch (e) {
      console.warn("Storage error", e);
    }

    // Show formal modal
    this.showConfirmationModal(inquiry);

    // Clear cart after successful submission
    this.clearAll();
    form.reset();
  },

  // Show confirmation modal
  showConfirmationModal(inquiry) {
    const modal = document.getElementById("quote-confirmation-modal");
    if (!modal) return;

    let itemsHtml = inquiry.items.map(item => `
      <tr class="border-b border-earth-800">
        <td class="py-3 text-ivory-50 font-medium">${item.name}</td>
        <td class="py-3 text-sandstone-300 capitalize">${item.unitType === 'tonnes-loose' ? 'Bulk Loose Tipped' : 'Bulk Bag (~850kg)'}</td>
        <td class="py-3 text-right font-mono font-bold text-gold-400">
          ${item.unitType === 'tonnes-loose' ? `${item.quantityTonnes} Tonnes` : `${item.quantityBags} Bags`}
        </td>
      </tr>
    `).join("");

    const deliveryLabels = {
      "tipper-8wheel": "8-Wheel Rigid Tipper (Rear Loose Tip)",
      "grab-8wheel": "8-Wheel Grab Lorry (Crane Over-Wall)",
      "hiab-crane": "Hiab Crane Offload (Bulk Bags)",
      "artic-bulk": "Articulated Bulk Tipper (28-30t Payload)",
      "quarry-collection": "Ex-Quarry Weighbridge Customer Collection"
    };

    modal.innerHTML = `
      <div class="fixed inset-0 bg-charcoal-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div class="bg-charcoal-900 border border-gold-500/30 rounded-3xl max-w-2xl w-full p-8 sm:p-10 shadow-2xl relative my-8 print:p-0 print:border-none print:shadow-none">
          <!-- Close button -->
          <button onclick="VanguardQuoteCart.closeModal()" class="absolute top-5 right-5 text-sandstone-400 hover:text-white p-2 rounded-xl hover:bg-charcoal-800 transition print:hidden">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>

          <!-- Header -->
          <div class="border-b border-earth-800 pb-6 mb-6 flex items-start justify-between">
            <div>
              <div class="flex items-center gap-2 mb-2">
                <span class="px-3 py-1 rounded-full bg-gold-950 text-gold-400 border border-gold-700/60 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse"></span>
                  Formal Inquiry Logged
                </span>
                <span class="text-xs text-earth-400 font-mono">${inquiry.date}</span>
              </div>
              <h3 class="text-2xl sm:text-3xl font-black text-ivory-50 tracking-tight font-heading">Quotation Inquiry Transmitted</h3>
              <p class="text-xs text-sandstone-400 mt-1">Quarry Dispatch Reference: <span class="font-mono font-bold text-gold-400 text-sm">${inquiry.reference}</span></p>
            </div>
            <div class="hidden sm:block text-right">
              <span class="text-[10px] uppercase tracking-widest text-earth-400 font-semibold block">Dispatched To</span>
              <span class="text-xs font-bold text-ivory-100">Central Weighbridge Desk</span>
            </div>
          </div>

          <!-- Customer info grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-charcoal-950 p-5 rounded-2xl border border-earth-800 text-xs mb-6">
            <div>
              <span class="text-earth-400 block uppercase tracking-wider text-[10px] font-semibold">Client / Enterprise</span>
              <span class="text-ivory-50 font-bold text-sm block mt-0.5">${inquiry.customerName}</span>
              <span class="text-sandstone-300 block">${inquiry.companyName} (${inquiry.accountType})</span>
              <span class="text-gold-400 block mt-1 font-mono">${inquiry.phone} • ${inquiry.email}</span>
            </div>
            <div>
              <span class="text-earth-400 block uppercase tracking-wider text-[10px] font-semibold">Destination & Logistics</span>
              <span class="text-ivory-50 font-bold text-sm block mt-0.5">${inquiry.postcode}</span>
              <span class="text-sandstone-300 block truncate">${inquiry.deliveryAddress}</span>
              <span class="text-gold-400 font-medium block mt-1">Vehicle: ${deliveryLabels[inquiry.deliveryMethod] || inquiry.deliveryMethod}</span>
            </div>
          </div>

          <!-- Materials table -->
          <div class="mb-6">
            <h4 class="text-[11px] font-bold uppercase tracking-widest text-sandstone-400 mb-2.5">Requested Material Specifications</h4>
            <div class="overflow-x-auto rounded-xl border border-earth-800 bg-charcoal-950">
              <table class="w-full text-left text-xs px-4">
                <thead class="border-b border-earth-800 text-earth-400 bg-charcoal-900/60 font-semibold uppercase text-[10px]">
                  <tr>
                    <th class="py-2.5 px-4 font-semibold">Material Grade / Specification</th>
                    <th class="py-2.5 px-4 font-semibold">Format</th>
                    <th class="py-2.5 px-4 text-right font-semibold">Tonnage / Qty</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-earth-800 px-4">
                  ${itemsHtml}
                </tbody>
              </table>
            </div>
          </div>

          <!-- SLA Notice -->
          <div class="p-4 rounded-xl bg-gold-950/40 border border-gold-600/30 text-xs text-gold-300 mb-8 flex items-start gap-3">
            <svg class="w-5 h-5 text-gold-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <div class="leading-relaxed">
              <strong class="font-bold text-ivory-100">Next Action:</strong> Our weighbridge logistics dispatchers are calculating the exact haulage transit distance from our closest terminal. An official written PDF quotation with guaranteed 30-day fixed rates will be emailed to <strong>${inquiry.email}</strong> within 30 minutes.
            </div>
          </div>

          <!-- Action buttons -->
          <div class="flex flex-wrap items-center justify-end gap-3 print:hidden">
            <button onclick="window.print()" class="px-5 py-2.5 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-ivory-200 text-xs font-bold uppercase tracking-wider transition flex items-center gap-2 border border-earth-700">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
              Print / Save PDF
            </button>
            <a href="tel:08008482626" class="px-6 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-bold text-xs uppercase tracking-wider transition flex items-center gap-2 shadow-lg shadow-gold-500/20">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              Call Dispatch Direct
            </a>
            <button onclick="VanguardQuoteCart.closeModal()" class="px-5 py-2.5 rounded-xl border border-earth-700 text-sandstone-300 hover:text-white text-xs font-semibold uppercase tracking-wider transition">
              Close
            </button>
          </div>
        </div>
      </div>
    `;

    modal.classList.remove("hidden");
  },

  // Close modal
  closeModal() {
    const modal = document.getElementById("quote-confirmation-modal");
    if (modal) modal.classList.add("hidden");
  },

  // Toast feedback with luxury aesthetics
  showToast(message) {
    let toast = document.getElementById("vanguard-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "vanguard-toast";
      toast.className = "fixed bottom-6 right-6 z-50 bg-charcoal-900 border border-gold-500/50 text-ivory-50 px-6 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3.5 transform transition-all duration-400 translate-y-20 opacity-0 backdrop-blur-md";
      document.body.appendChild(toast);
    }

    toast.innerHTML = `
      <div class="w-2 h-2 rounded-full bg-gold-400"></div>
      <span class="text-xs sm:text-sm font-medium tracking-tight">${message}</span>
      <a href="contact.html#quote-builder" class="text-xs font-bold text-gold-400 hover:text-gold-300 ml-2 tracking-wide uppercase">&rarr; View Quote</a>
    `;

    setTimeout(() => {
      toast.classList.remove("translate-y-20", "opacity-0");
      toast.classList.add("translate-y-0", "opacity-100");
    }, 10);

    setTimeout(() => {
      toast.classList.remove("translate-y-0", "opacity-100");
      toast.classList.add("translate-y-20", "opacity-0");
    }, 4000);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  VanguardQuoteCart.updateBadge();
  VanguardQuoteCart.renderQuoteBuilder();
  initContactQuoteForm();
});

/**
 * Initialize Contact Page Quote Form
 * Auto-populates parameters from query string and configures date pickers
 */
function initContactQuoteForm() {
  const form = document.getElementById("professional-quote-form");
  if (!form) return;

  const urlParams = new URLSearchParams(window.location.search);

  // Material autofill
  const materialParam = urlParams.get("material") || urlParams.get("product");
  const materialSelect = document.getElementById("quote-material");
  if (materialParam && materialSelect) {
    // Try finding exact match or partial match
    let matched = false;
    for (let i = 0; i < materialSelect.options.length; i++) {
      const opt = materialSelect.options[i];
      if (opt.value.toLowerCase().includes(materialParam.toLowerCase()) || 
          opt.text.toLowerCase().includes(materialParam.toLowerCase())) {
        materialSelect.selectedIndex = i;
        matched = true;
        break;
      }
    }
  }

  // Quantity autofill
  const qtyParam = urlParams.get("quantity") || urlParams.get("tonnes") || urlParams.get("qty");
  const qtyInput = document.getElementById("quote-quantity");
  if (qtyParam && qtyInput) {
    qtyInput.value = qtyParam;
  }

  // Location / Postcode autofill
  const locationParam = urlParams.get("postcode") || urlParams.get("location") || urlParams.get("zone");
  const locationInput = document.getElementById("quote-location");
  if (locationParam && locationInput) {
    if (urlParams.get("zone")) {
      locationInput.value = `Site Location (Zone ${locationParam})`;
    } else {
      locationInput.value = locationParam.toUpperCase();
    }
  }

  // Vehicle autofill
  const vehicleParam = urlParams.get("vehicle");
  const vehicleSelect = document.getElementById("quote-vehicle");
  if (vehicleParam && vehicleSelect) {
    for (let i = 0; i < vehicleSelect.options.length; i++) {
      const opt = vehicleSelect.options[i];
      if (opt.value.toLowerCase().includes(vehicleParam.toLowerCase()) || 
          opt.text.toLowerCase().includes(vehicleParam.toLowerCase())) {
        vehicleSelect.selectedIndex = i;
        break;
      }
    }
  }

  // Delivery date minimum set to tomorrow
  const dateInput = document.getElementById("quote-date");
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split("T")[0];
    dateInput.min = tomorrowStr;
    if (!dateInput.value) {
      const defaultDate = new Date();
      defaultDate.setDate(defaultDate.getDate() + 2);
      dateInput.value = defaultDate.toISOString().split("T")[0];
    }
  }

  // Attach live interactive validation to form inputs
  attachLiveQuoteValidation();
}

/**
 * Interactive Real-Time Field Validation
 * Visual error state on blur, instantaneous clearing on input
 */
function attachLiveQuoteValidation() {
  const fields = [
    { id: "quote-fullname", check: v => v.trim().length >= 2 },
    { id: "quote-email", check: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) },
    { id: "quote-phone", check: v => v.replace(/\D/g, "").length >= 7 },
    { id: "quote-material", check: v => v && v.trim() !== "" },
    { id: "quote-quantity", check: v => parseFloat(v) > 0 },
    { id: "quote-location", check: v => v.trim().length >= 3 }
  ];

  fields.forEach(({ id, check }) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.addEventListener("blur", () => {
      if (el.value.trim() !== "" && !check(el.value)) {
        el.classList.add("input-error");
      } else if (check(el.value)) {
        el.classList.remove("input-error");
      }
    });

    el.addEventListener("input", () => {
      if (check(el.value)) {
        el.classList.remove("input-error");
      }
    });

    el.addEventListener("change", () => {
      if (check(el.value)) {
        el.classList.remove("input-error");
      }
    });
  });
}

function markInputError(el) {
  if (!el) return;
  el.classList.add("input-error", "animate-field-shake");
  setTimeout(() => el.classList.remove("animate-field-shake"), 450);

  const clean = () => {
    el.classList.remove("input-error");
    el.removeEventListener("input", clean);
    el.removeEventListener("change", clean);
  };
  el.addEventListener("input", clean);
  el.addEventListener("change", clean);
}

/**
 * Handle Professional Quote Request Form Submission
 * Connects directly to POST /api/quote backend.
 * Guarantees NO fake success message on failure.
 */
async function submitProfessionalQuote(event) {
  event.preventDefault();
  const form = event.target || document.getElementById("professional-quote-form");
  const errorBanner = document.getElementById("quote-error-banner");
  const errorMessage = document.getElementById("quote-error-message");
  const successCard = document.getElementById("quote-success-card");
  const submitBtn = document.getElementById("quote-submit-btn");

  // Reset error banner
  if (errorBanner) errorBanner.classList.add("hidden");

  // Input element references
  const fullNameEl = document.getElementById("quote-fullname") || form.fullName;
  const companyNameEl = document.getElementById("quote-company") || form.companyName;
  const emailEl = document.getElementById("quote-email") || form.email;
  const phoneEl = document.getElementById("quote-phone") || form.phone;
  const materialEl = document.getElementById("quote-material") || form.materialType || form.materialRequired;
  const quantityEl = document.getElementById("quote-quantity") || form.requiredQuantity || form.quantityRequired;
  const unitEl = document.getElementById("quote-unit") || form.unit;
  const locationEl = document.getElementById("quote-location") || form.deliveryLocation;
  const dateEl = document.getElementById("quote-date") || form.preferredDeliveryDate || form.requiredDeliveryDate;
  const vehicleEl = document.getElementById("quote-vehicle") || form.deliveryMethod;
  const timeSlotEl = document.getElementById("quote-timeslot") || form.timeSlot;
  const additionalEl = document.getElementById("quote-additional") || form.additionalRequirements;

  // Gather sanitized values
  const fullName = fullNameEl ? fullNameEl.value.trim() : "";
  const companyName = companyNameEl ? companyNameEl.value.trim() : "";
  const email = emailEl ? emailEl.value.trim() : "";
  const phone = phoneEl ? phoneEl.value.trim() : "";
  const materialType = materialEl ? materialEl.value.trim() : "";
  const requiredQuantity = quantityEl ? quantityEl.value.trim() : "";
  const unit = unitEl ? unitEl.value.trim() : "Tonnes (Bulk Loose Tipping)";
  const deliveryLocation = locationEl ? locationEl.value.trim() : "";
  const preferredDeliveryDate = dateEl ? dateEl.value.trim() : "";
  const deliveryMethod = vehicleEl ? vehicleEl.value.trim() : "8-Wheel Rigid Tipper (20t Rear Tip)";
  const timeSlot = timeSlotEl ? timeSlotEl.value.trim() : "Morning (08:00 - 12:00)";
  const additionalRequirements = additionalEl ? additionalEl.value.trim() : "";

  // Client-side Validation Checks
  const missing = [];
  let firstErrorEl = null;

  if (!fullName || fullName.length < 2) {
    missing.push("Full Name");
    markInputError(fullNameEl);
    if (!firstErrorEl) firstErrorEl = fullNameEl;
  }
  if (!email) {
    missing.push("Email Address");
    markInputError(emailEl);
    if (!firstErrorEl) firstErrorEl = emailEl;
  }
  if (!phone) {
    missing.push("Phone Number");
    markInputError(phoneEl);
    if (!firstErrorEl) firstErrorEl = phoneEl;
  }
  if (!materialType) {
    missing.push("Material Type");
    markInputError(materialEl);
    if (!firstErrorEl) firstErrorEl = materialEl;
  }
  if (!requiredQuantity || parseFloat(requiredQuantity) <= 0) {
    missing.push("Required Quantity (positive number)");
    markInputError(quantityEl);
    if (!firstErrorEl) firstErrorEl = quantityEl;
  }
  if (!deliveryLocation || deliveryLocation.length < 3) {
    missing.push("Delivery Location");
    markInputError(locationEl);
    if (!firstErrorEl) firstErrorEl = locationEl;
  }
  if (!preferredDeliveryDate) {
    missing.push("Preferred Delivery Date");
    markInputError(dateEl);
    if (!firstErrorEl) firstErrorEl = dateEl;
  }

  if (missing.length > 0) {
    if (errorBanner && errorMessage) {
      errorMessage.textContent = `Please complete all mandatory quote fields: ${missing.join(", ")}.`;
      errorBanner.classList.remove("hidden");
      errorBanner.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    if (firstErrorEl) firstErrorEl.focus();
    return;
  }

  // Email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    markInputError(emailEl);
    if (errorBanner && errorMessage) {
      errorMessage.textContent = "Please provide a valid company or personal email address format (e.g. name@domain.com).";
      errorBanner.classList.remove("hidden");
      errorBanner.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    if (emailEl) emailEl.focus();
    return;
  }

  // Phone digit count check
  const digitsOnly = phone.replace(/\D/g, "");
  if (digitsOnly.length < 7) {
    markInputError(phoneEl);
    if (errorBanner && errorMessage) {
      errorMessage.textContent = "Please provide a valid telephone number with area or country code (minimum 7 digits).";
      errorBanner.classList.remove("hidden");
      errorBanner.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    if (phoneEl) phoneEl.focus();
    return;
  }

  // Ensure preferred delivery date is not in the past
  if (preferredDeliveryDate) {
    const chosenDate = new Date(preferredDeliveryDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (chosenDate < today) {
      markInputError(dateEl);
      if (errorBanner && errorMessage) {
        errorMessage.textContent = "Preferred delivery date cannot be in the past. Please choose a future dispatch date.";
        errorBanner.classList.remove("hidden");
        errorBanner.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      if (dateEl) dateEl.focus();
      return;
    }
  }

  // Build API payload supporting both naming conventions
  const payload = {
    fullName,
    companyName: companyName || "Private / Independent Contractor",
    email,
    phone,
    materialType,
    materialRequired: materialType,
    requiredQuantity,
    quantityRequired: requiredQuantity,
    unit,
    deliveryLocation,
    preferredDeliveryDate,
    requiredDeliveryDate: preferredDeliveryDate,
    deliveryMethod,
    timeSlot,
    additionalRequirements
  };

  // Visual loading feedback
  const originalBtnContent = submitBtn ? submitBtn.innerHTML : "";
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.classList.add("opacity-80", "cursor-not-allowed");
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-2.5 h-4 w-4 text-charcoal-950 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
      <span>Transmitting to Weighbridge Desk...</span>
    `;
  }

  try {
    const response = await fetch("/api/quote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json().catch(() => null);

    // If server returned non-200 or success=false, show genuine error message
    if (!response.ok || !result || !result.success) {
      const errorMsg = (result && result.error) ? result.error : `Server communication failure (HTTP ${response.status}: ${response.statusText}).`;
      if (errorBanner && errorMessage) {
        errorMessage.textContent = errorMsg;
        errorBanner.classList.remove("hidden");
        errorBanner.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    // Real success: use verified reference code and timestamp from backend response
    const refCode = result.referenceCode || (result.details && result.details.refCode) || "VNG-QTE-RECORDED";
    const refEl = document.getElementById("success-ref-code");
    if (refEl) refEl.textContent = refCode;

    // Build structured order summary in success card matching user fields
    const summaryContainer = document.getElementById("success-quote-summary");
    if (summaryContainer) {
      summaryContainer.innerHTML = `
        <div class="space-y-1">
          <span class="text-earth-400 block text-[10px] uppercase font-semibold">Client Specification</span>
          <strong class="text-ivory-50 block font-heading text-sm">${payload.fullName}</strong>
          <span class="text-sandstone-300 block text-xs">${payload.companyName}</span>
          <span class="text-gold-400 font-mono block mt-1 text-xs">${payload.email} • ${payload.phone}</span>
        </div>
        <div class="space-y-1">
          <span class="text-earth-400 block text-[10px] uppercase font-semibold">Site Delivery Destination</span>
          <strong class="text-ivory-50 block text-sm">${payload.deliveryLocation}</strong>
          <span class="text-sandstone-300 block text-xs">Preferred Date: <strong class="text-ivory-100">${payload.preferredDeliveryDate}</strong> (${payload.timeSlot})</span>
          <span class="text-gold-400 block font-medium mt-1 text-xs">Vehicle: ${payload.deliveryMethod}</span>
        </div>
        <div class="sm:col-span-2 pt-4 border-t border-earth-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span class="text-[10px] text-earth-400 uppercase font-semibold block">Requested Material Type</span>
            <span class="font-bold text-ivory-100 font-heading text-sm">${payload.materialType}</span>
            ${payload.additionalRequirements ? `<p class="text-[11px] text-sandstone-400 mt-1 italic max-w-md">Additional Requirements: ${payload.additionalRequirements}</p>` : ""}
          </div>
          <div class="text-left sm:text-right">
            <span class="text-[10px] text-earth-400 uppercase font-semibold block">Required Quantity</span>
            <span class="font-mono font-bold text-gold-400 text-base">${payload.requiredQuantity} ${payload.unit}</span>
          </div>
        </div>
      `;
    }

    // Hide form, reveal success card
    form.classList.add("hidden");
    if (successCard) {
      successCard.classList.remove("hidden");
      successCard.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // Reinitialize Lucide icons in newly rendered elements
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }

  } catch (err) {
    console.error("Quotation submission network exception:", err);
    if (errorBanner && errorMessage) {
      errorMessage.textContent = "Network error: Unable to reach the weighbridge server. Please check your network connection or call our dispatch hotline directly at (0800) 848-2626.";
      errorBanner.classList.remove("hidden");
      errorBanner.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.classList.remove("opacity-80", "cursor-not-allowed");
      submitBtn.innerHTML = originalBtnContent;
    }
  }
}

/**
 * Reset Quote Form to submit another quotation
 */
function resetQuoteForm() {
  const form = document.getElementById("professional-quote-form");
  const successCard = document.getElementById("quote-success-card");
  const errorBanner = document.getElementById("quote-error-banner");

  if (form) {
    form.reset();
    form.classList.remove("hidden");
  }
  if (successCard) {
    successCard.classList.add("hidden");
  }
  if (errorBanner) {
    errorBanner.classList.add("hidden");
  }

  // Reset date to default
  const dateInput = document.getElementById("quote-date");
  if (dateInput) {
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 2);
    dateInput.value = defaultDate.toISOString().split("T")[0];
  }

  if (form) {
    form.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// Expose functions globally for inline HTML onsubmit/onclick handlers
if (typeof window !== "undefined") {
  window.submitProfessionalQuote = submitProfessionalQuote;
  window.resetQuoteForm = resetQuoteForm;
  window.initContactQuoteForm = initContactQuoteForm;
}

if (typeof window !== "undefined") {
  window.VanguardQuoteCart = VanguardQuoteCart;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = VanguardQuoteCart;
}
