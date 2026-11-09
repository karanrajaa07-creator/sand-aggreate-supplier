/**
 * Vanguard Aggregates - Material Estimator & Tonnage Calculator
 * Handles cubic volume, bulk density conversion, compaction shrinkage, and load recommendations.
 */

const VanguardCalculator = {
  // Density lookup map (tonnes per cubic meter)
  densities: {
    "sharp-sand": 1.60,
    "building-sand": 1.55,
    "silica-sand": 1.50,
    "grit-sand": 1.65,
    "mot-type-1": 2.10,
    "mot-type-3": 1.85,
    "crusher-run-6f2": 2.00,
    "gabion-stone": 1.70,
    "pea-gravel-10mm": 1.60,
    "drainage-gravel-20mm": 1.60,
    "cotswold-buff": 1.55,
    "plum-slate-chippings": 1.45,
    "all-in-ballast": 1.95,
    "clean-drainage-stone-40mm": 1.55,
    "screened-topsoil-bs3882": 1.25,
    "enriched-rootzone-soil": 1.35,
    "recycled-type-1-crushed-concrete": 1.95,
    "recycled-road-planings": 1.80
  },

  // Calculate volume in m3
  calculateVolume(shape, dim1, dim2, depthMeters) {
    if (shape === "circle") {
      const radius = dim1 / 2;
      return Math.PI * radius * radius * depthMeters;
    }
    // rectangle default
    return dim1 * dim2 * depthMeters;
  },

  // Calculate full estimation
  estimate(params) {
    const {
      materialId = "mot-type-1",
      shape = "rectangle",
      length = 10,
      width = 5,
      depthMm = 100,
      includeBuffer = true
    } = params;

    const depthMeters = parseFloat(depthMm) / 1000;
    const rawVolume = this.calculateVolume(shape, parseFloat(length), parseFloat(width), depthMeters);
    const bufferMultiplier = includeBuffer ? 1.10 : 1.0; // 10% compaction & grade allowance
    const totalVolume = rawVolume * bufferMultiplier;

    const density = this.densities[materialId] || 1.80;
    const totalTonnes = totalVolume * density;

    // Load breakdown
    const fullTippers = Math.ceil(totalTonnes / 20); // 20-tonne 8-wheel rigid tipper
    const bulkBags = Math.ceil(totalTonnes / 0.85); // 850kg bulk bag (~0.85 tonne)

    // Lookup material info
    let materialName = "MOT Type 1 Sub-Base";
    if (window.VANGUARD_DATA && window.VANGUARD_DATA.materials) {
      const found = window.VANGUARD_DATA.materials.find(m => m.id === materialId);
      if (found) materialName = found.name;
    }

    return {
      materialId,
      materialName,
      density,
      rawVolume: Number(rawVolume.toFixed(2)),
      totalVolume: Number(totalVolume.toFixed(2)),
      totalTonnes: Number(totalTonnes.toFixed(2)),
      roundedTonnes: Math.ceil(totalTonnes),
      fullTippers,
      bulkBags,
      dimensionsSummary: shape === "circle" 
        ? `Diameter: ${length}m × Depth: ${depthMm}mm`
        : `Length: ${length}m × Width: ${width}m × Depth: ${depthMm}mm`,
      bufferApplied: includeBuffer
    };
  },

  // Transfer calculation directly to quote cart and redirect
  transferToQuote(calculationResult) {
    const quoteItem = {
      id: calculationResult.materialId,
      name: calculationResult.materialName,
      quantityTonnes: calculationResult.roundedTonnes,
      quantityBags: calculationResult.bulkBags,
      unitType: calculationResult.roundedTonnes >= 10 ? "tonnes-loose" : "bulk-bag",
      notes: `Estimated from Calculator (${calculationResult.dimensionsSummary}, Vol: ${calculationResult.totalVolume}m³ incl 10% compaction buffer)`
    };

    if (window.VanguardQuoteCart) {
      window.VanguardQuoteCart.addItem(quoteItem);
    } else {
      // Fallback direct storage
      let items = [];
      try {
        items = JSON.parse(localStorage.getItem("vanguard_quote_items") || "[]");
      } catch (e) {
        items = [];
      }
      items.push(quoteItem);
      localStorage.setItem("vanguard_quote_items", JSON.stringify(items));
    }

    // Redirect to contact page with anchor
    window.location.href = "contact.html#quote-builder";
  }
};

if (typeof window !== "undefined") {
  window.VanguardCalculator = VanguardCalculator;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = VanguardCalculator;
}
