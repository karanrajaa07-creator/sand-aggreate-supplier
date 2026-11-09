/**
 * Vanguard Aggregates & Minerals - Master Data Store
 * Luxurious Industrial & Architectural Materials Catalogue
 */

const VANGUARD_DATA = {
  company: {
    name: "Vanguard Aggregates & Minerals",
    shortName: "Vanguard Aggregates",
    tagline: "Architectural Sands, Primary Quarried Aggregates & Precision Heavy Haulage",
    phone: "(0800) 848-2626",
    directSales: "+44 (0) 1632 960844",
    dispatchHotline: "+44 (0) 1632 960845",
    email: "dispatch@vanguardaggregates.co.uk",
    salesEmail: "concierge@vanguardaggregates.co.uk",
    operatingHours: {
      weekdays: "06:00 - 17:30",
      saturday: "07:00 - 12:30",
      sunday: "Closed (Emergency Civils on-call)"
    },
    headquarters: "Vanguard Quarry Hub, Mineral Way, Granite Ridge, Midlands, UK"
  },

  categoryLabels: {
    "sand": "Sand",
    "manufactured-sand": "Manufactured Sand",
    "aggregates": "Aggregates",
    "gravel": "Gravel",
    "crushed-stone": "Crushed Stone"
  },

  materials: [
    // =========================================================================
    // 1. SAND (Natural Quarried & Alluvial Sands)
    // =========================================================================
    {
      id: "river-sand",
      name: "River Sand (Natural Alluvial Silica)",
      category: "sand",
      code: "SND-RIV-01",
      grading: "0 - 4 mm",
      density: 1.55,
      standard: "BS EN 12620:2013",
      supplyTypes: ["loose", "bulk-bag"],
      image: "https://images.unsplash.com/photo-1635604027975-0a0a34a35646?auto=format&fit=crop&w=1200&q=85",
      applications: ["Architectural brick masonry", "Fine plastering work", "Exposed aggregate terrazzo", "Water filtration beds"],
      properties: {
        grainShape: "Rounded / Alluvial Quartz",
        moistureContent: "4 - 5% washed",
        drainage: "High natural percolation",
        compaction: "Smooth trowel plastic finish"
      },
      shortDesc: "Naturally filtered alluvial river sand with rounded silica grains for superior brickwork, stone masonry, and render bonding.",
      fullDesc: "Sourced from clean alluvial floodplain deposits, this washed river sand features naturally rounded quartz grains that provide exceptional trowel glide and mortar fluidity. Zero clay or organic fines, compliant with BS EN 12620."
    },
    {
      id: "sharp-sand",
      name: "Sharp Sand (Concrete & Screed Sand)",
      category: "sand",
      code: "SND-SHP-02",
      grading: "0 - 4 mm (Coarse)",
      density: 1.60,
      standard: "BS EN 12620:2013",
      supplyTypes: ["loose", "bulk-bag"],
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=85",
      applications: ["Precision floor screeds", "Paving bedding course", "High-strength structural concrete", "Underfloor heating slabs"],
      properties: {
        grainShape: "Angular Quartzite",
        moistureContent: "4 - 6% controlled",
        drainage: "High permeability",
        compaction: "Firm interlocking matrix"
      },
      shortDesc: "Triple-washed angular quartzite sand calibrated for underfloor heating screeds, monolithic slabs, and block paving.",
      fullDesc: "Mined from selected glacial deposits, this coarse washed sand features distinct angular quartzite particles sized 0mm to 4mm. Thoroughly washed through hydrocyclones to eliminate clay fines. Conforms strictly to BS EN 12620."
    },
    {
      id: "building-sand",
      name: "Soft Building Sand (Warm Sandstone Masonry)",
      category: "sand",
      code: "SND-BLD-03",
      grading: "0 - 2 mm (Fine)",
      density: 1.50,
      standard: "BS EN 13139:2013",
      supplyTypes: ["loose", "bulk-bag"],
      image: "https://images.unsplash.com/photo-1517999179346-a7078f1e40a6?auto=format&fit=crop&w=1200&q=85",
      applications: ["Heritage bricklaying mortar", "Architectural blockwork", "Lime render undercoats", "Fine pointing mortar"],
      properties: {
        grainShape: "Sub-rounded Sandstone",
        moistureContent: "5 - 7% natural",
        drainage: "Moderate",
        compaction: "Superior mortar plasticity"
      },
      shortDesc: "Rich, velvety soft sand offering exceptional trowel workability for brickwork, stone masonry, and lime mortars.",
      fullDesc: "Extracted from natural sandstone deposits, this golden-hued soft sand boasts sub-rounded fine grains that produce smooth, highly plastic mortars. Favored by master masons for clean mortar lines and uniform curing."
    },
    {
      id: "silica-sand",
      name: "Kiln-Dried Silica Sand",
      category: "sand",
      code: "SND-SIL-04",
      grading: "0.2 - 0.6 mm (Bespoke)",
      density: 1.50,
      standard: "ISO 9001 / BS 7533",
      supplyTypes: ["bulk-bag"],
      image: "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&w=1200&q=85",
      applications: ["Architectural block paving joint lock", "Equestrian surfaces", "Synthetic sports turf infill", "Foundry castings"],
      properties: {
        grainShape: "Ultra-pure Sub-angular Quartz",
        moistureContent: "< 0.2% (Oven Baked)",
        drainage: "Immediate percolation",
        compaction: "High shear interlocking joint"
      },
      shortDesc: "Bespoke oven-baked high-purity silica sand designed for tight joint locking in high-end stone and block paving.",
      fullDesc: "Kiln-dried in specialized industrial ovens to eliminate all moisture. Flows effortlessly into joint apertures as fine as 2mm, locking individual stones into an unyielding, interlocked surface that resists erosion."
    },
    {
      id: "grit-sand",
      name: "Coarse Washed Grit Sand",
      category: "sand",
      code: "SND-GRT-05",
      grading: "0 - 6 mm",
      density: 1.65,
      standard: "BS EN 12620",
      supplyTypes: ["loose", "bulk-bag"],
      image: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=85",
      applications: ["Heavy commercial paving", "Precast architectural stone", "Agricultural hardstandings", "High-traction bedding"],
      properties: {
        grainShape: "Very Angular Granite Grit",
        moistureContent: "4 - 5%",
        drainage: "Rapid free-flow",
        compaction: "Maximum shear resistance"
      },
      shortDesc: "Aggressive, high-friction grit sand engineered for heavy vehicle turning areas and commercial distribution pavements.",
      fullDesc: "Crushed and washed granite grit providing high mechanical friction under severe dynamic loading. Essential for transport depots, docklands, and precast concrete manufacturing."
    },
    {
      id: "silver-sand",
      name: "Silver Horticultural & Play Sand",
      category: "sand",
      code: "SND-SLV-06",
      grading: "0.1 - 0.5 mm",
      density: 1.45,
      standard: "BS EN 1177:2018 / Non-Toxic",
      supplyTypes: ["loose", "bulk-bag"],
      image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1200&q=85",
      applications: ["Architectural lawn top dressing", "Certified impact play areas", "Golf bunker faces", "Horticultural soil aeration"],
      properties: {
        grainShape: "Sub-rounded White Silica",
        moistureContent: "2 - 3% washed",
        drainage: "Free draining",
        compaction: "Cushioned non-staining surface"
      },
      shortDesc: "Pure washed silver silica sand certified non-staining, non-toxic, and free-draining for sports and architectural lawns.",
      fullDesc: "Double-washed bleached quartz sand with near-zero iron oxide content. Tested to BS EN 1177 for safety surfaces and ideal for soil aeration, bunker dressing, and prestige landscaping."
    },

    // =========================================================================
    // 2. MANUFACTURED SAND (VSI Engineered Hardstone Sands)
    // =========================================================================
    {
      id: "m-sand",
      name: "M-Sand (Manufactured Concrete Sand - VSI)",
      category: "manufactured-sand",
      code: "MSD-CON-01",
      grading: "0 - 4 mm (VSI Cubical)",
      density: 1.65,
      standard: "BS EN 12620 / IS 383 Zone II",
      supplyTypes: ["loose", "bulk-bag"],
      image: "https://images.unsplash.com/photo-1747849291727-6d23f7b51257?auto=format&fit=crop&w=1200&q=85",
      applications: ["High-strength structural concrete", "Post-tensioned slab pours", "Precast architectural lintels", "Pumped ready-mix concrete"],
      properties: {
        grainShape: "Cubical / Fractured Hardstone",
        moistureContent: "3 - 5% controlled",
        drainage: "Consistent high density",
        compaction: "High compressive bonding"
      },
      shortDesc: "Engineered 0-4mm cubical hardstone sand produced via Vertical Shaft Impactor (VSI) crushers for high-strength concrete.",
      fullDesc: "Manufactured by crushing virgin granite and limestone boulders using advanced Vertical Shaft Impactors (VSI). Produces consistent cubical particles with a continuous grading curve that maximizes cementitious bonding in ready-mix concrete and civil pours."
    },
    {
      id: "p-sand",
      name: "P-Sand (Manufactured Plastering Sand)",
      category: "manufactured-sand",
      code: "MSD-PLS-02",
      grading: "0 - 2.36 mm",
      density: 1.50,
      standard: "BS EN 13139 / IS 1542",
      supplyTypes: ["loose", "bulk-bag"],
      image: "https://images.unsplash.com/photo-1781026688566-60da3af1ebe5?auto=format&fit=crop&w=1200&q=85",
      applications: ["Internal & external wall plastering", "Fine architectural stucco", "Tile adhesives & grouts", "Exterior smooth renders"],
      properties: {
        grainShape: "Sub-angular / Fine Calibrated",
        moistureContent: "2 - 4% controlled",
        drainage: "Controlled absorption",
        compaction: "Flawless shrinkage-free finish"
      },
      shortDesc: "Micro-screened 0-2.36mm manufactured sand formulated for internal and external wall plastering without shrinkage cracking.",
      fullDesc: "Specially calibrated plastering sand subjected to secondary rotary screening to remove all particles above 2.36mm. Produces an extraordinarily smooth, cohesive plaster mortar that reduces rebound loss and resists thermal cracking."
    },
    {
      id: "granite-micro-sand",
      name: "Granite Micro-Sand (Ultra-Fine Manufactured Sand)",
      category: "manufactured-sand",
      code: "MSD-MIC-03",
      grading: "0 - 1.18 mm",
      density: 1.58,
      standard: "BS EN 12620 / Special Precast Spec",
      supplyTypes: ["loose", "bulk-bag"],
      image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=85",
      applications: ["Ultra-high performance concrete (UHPC)", "Architectural GFRC panels", "Micro-cement floor finishes", "Precision injection grouts"],
      properties: {
        grainShape: "Micro-Fractured Angular Granite",
        moistureContent: "1 - 3% dried",
        drainage: "Low void ratio",
        compaction: "Dense micro-structure"
      },
      shortDesc: "Engineered ultra-fine granite sand calibrated for architectural glass-fiber reinforced concrete (GFRC) and micro-cements.",
      fullDesc: "Classified through air-swept cyclone separators to achieve particle size distribution below 1.18mm. Densifies cement pastes, reduces porosity, and delivers glassy, mirror-smooth cast concrete surfaces."
    },
    {
      id: "basalt-vsi-sand",
      name: "Basalt Engineered VSI Sand (High Compressive)",
      category: "manufactured-sand",
      code: "MSD-BST-04",
      grading: "0 - 4 mm (Heavy Duty)",
      density: 1.72,
      standard: "BS EN 12620 / Heavy Infrastructure",
      supplyTypes: ["loose", "bulk-bag"],
      image: "https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?auto=format&fit=crop&w=1200&q=85",
      applications: ["Bridge deck wearing courses", "Airport runway concrete", "Heavy-duty industrial wear floors", "Prestressed concrete beams"],
      properties: {
        grainShape: "Cubical Volcanic Basalt",
        moistureContent: "2 - 4%",
        drainage: "Impervious matrix",
        compaction: "Exceptional abrasion resistance"
      },
      shortDesc: "Crushed volcanic basalt VSI sand offering extraordinary aggregate impact value (AIV < 12%) for heavy industrial wear surfaces.",
      fullDesc: "Derived from premium volcanic basalt formations and shaped in multi-stage tertiary VSI impactors. Provides the highest hardness and polish resistance for harsh environmental and heavy vehicle wear applications."
    },

    // =========================================================================
    // 3. AGGREGATES (Structural, Concrete & Drainage Aggregates)
    // =========================================================================
    {
      id: "aggregate-10mm",
      name: "10mm Single-Size Concrete Aggregate",
      category: "aggregates",
      code: "AGG-10M-01",
      grading: "4 - 10 mm (Single-Size)",
      density: 1.58,
      standard: "BS EN 12620:2013",
      supplyTypes: ["loose", "bulk-bag"],
      image: "https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=1200&q=85",
      applications: ["Pumped concrete mixes", "Precast lintels & fence posts", "Dense reinforcement slab pours", "Pipe surround & filter media"],
      properties: {
        grainShape: "Clean Washed Angular Hardstone",
        moistureContent: "2 - 4%",
        drainage: "High permeability",
        compaction: "Free-flowing concrete aggregate"
      },
      shortDesc: "Double-screened 10mm single-size aggregate. Flowable around congested rebar in high-specification concrete pours.",
      fullDesc: "Rigorously washed and screened to exact 4–10mm tolerances. Indispensable for congested structural members where 20mm aggregate would risk honeycombing, and for pumped concrete mixes requiring unhindered line flow."
    },
    {
      id: "aggregate-20mm",
      name: "20mm Single-Size Concrete Aggregate",
      category: "aggregates",
      code: "AGG-20M-02",
      grading: "10 - 20 mm (Single-Size)",
      density: 1.60,
      standard: "BS EN 12620:2013",
      supplyTypes: ["loose", "bulk-bag"],
      image: "https://images.unsplash.com/photo-1645567849531-40dc40ecb2b9?auto=format&fit=crop&w=1200&q=85",
      applications: ["Ready-mix structural concrete", "Ground-bearing slabs & rafts", "Civil retaining walls", "Heavy foundations"],
      properties: {
        grainShape: "Uniform Angular Hardstone",
        moistureContent: "2 - 3%",
        drainage: "Immediate free drainage",
        compaction: "Maximum concrete compressive matrix"
      },
      shortDesc: "The primary coarse aggregate for civil foundations, commercial floor slabs, and high-strength concrete mixes.",
      fullDesc: "Quarried hardstone crushed and washed to a tight 10–20mm grading. Forms the structural backbone of C25 to C50 structural concretes, maximizing elastic modulus and minimizing drying shrinkage."
    },
    {
      id: "clean-drainage-stone-40mm",
      name: "40mm Clean Drainage Aggregate",
      category: "aggregates",
      code: "AGG-40M-03",
      grading: "20 - 40 mm (Zero Fines)",
      density: 1.55,
      standard: "BS EN 12620 / SHW Clause 505",
      supplyTypes: ["loose", "bulk-bag"],
      image: "https://images.unsplash.com/photo-1704175970211-4c2c15b18328?auto=format&fit=crop&w=1200&q=85",
      applications: ["Heavy civil soakaways", "Highway storm drainage trenches", "Railway track ballast backfill", "Attenuation basin sumps"],
      properties: {
        grainShape: "Coarse Angular Clean Stone",
        moistureContent: "Clean / Silt-free",
        drainage: "Vast Interstitial Void Capacity (>38%)",
        compaction: "Non-clogging open matrix"
      },
      shortDesc: "Single-size 40mm clean aggregate engineered with high void ratio to handle immense stormwater drainage flows.",
      fullDesc: "Single-sized 40mm aggregate thoroughly washed free of all fines. Retains open void spaces that allow torrential volumes of water to percolate freely without clogging, preventing surface pooling and hydraulic backpressure."
    },
    {
      id: "all-in-ballast",
      name: "All-In Ballast (0 - 20mm Concreting Mix)",
      category: "aggregates",
      code: "AGG-BAL-04",
      grading: "0 - 20 mm (Engineered Composite)",
      density: 1.95,
      standard: "BS EN 12620",
      supplyTypes: ["loose", "bulk-bag"],
      image: "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=1200&q=85",
      applications: ["Structural foundations & footings", "Fence post setting", "Garage & shed concrete floor slabs", "Site-mixed concrete"],
      properties: {
        grainShape: "Calibrated Sand & Shingle Blend",
        moistureContent: "4 - 6%",
        drainage: "Dense composite matrix",
        compaction: "High compressive strength with cement"
      },
      shortDesc: "Precision blend of sharp sand and 20mm coarse aggregate. Just add cement and water for structural concrete.",
      fullDesc: "Scientifically proportioned at the quarry wash plant to ensure optimal particle packing. Delivers consistent C25 to C35 compressive strength concrete without storing separate sand and aggregate stockpiles on site."
    },
    {
      id: "recycled-type-1-crushed-concrete",
      name: "Recycled Concrete Aggregate (Type 1 RCA)",
      category: "aggregates",
      code: "AGG-RCA-05",
      grading: "0 - 40 mm (Graded)",
      density: 1.95,
      standard: "WRAP Protocol / SHW Clause 803",
      supplyTypes: ["loose", "bulk-bag"],
      image: "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1200&q=85",
      applications: ["Sustainable road sub-bases", "Commercial warehouse floor slabs", "Paved courtyard foundations", "BREEAM-rated green developments"],
      properties: {
        grainShape: "Crushed Recycled Concrete & Stone",
        moistureContent: "Controlled",
        drainage: "Low permeability compacted",
        compaction: "Self-cementing secondary matrix"
      },
      shortDesc: "Certified quality secondary aggregate crushed from demolition concrete. 30% cost savings with a low carbon footprint.",
      fullDesc: "Crushed in automated recycling hubs with electromagnetic separators removing 100% of rebar. Certified under WRAP Quality Protocol, matching Highway Works specifications for sub-base structural integrity."
    },
    {
      id: "crusher-run-6f2",
      name: "6F2 Primary Capping Aggregate",
      category: "aggregates",
      code: "AGG-6F2-06",
      grading: "0 - 75 mm (Heavy Granular)",
      density: 2.00,
      standard: "SHW Clause 613 / BS EN 13242",
      supplyTypes: ["loose"],
      image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=85",
      applications: ["Heavy construction site haul roads", "Piling rig working platforms", "Capping layers over soft subgrades", "Embankment fills"],
      properties: {
        grainShape: "Coarse Angular Quarry Run",
        moistureContent: "Quarry natural",
        drainage: "Moderate",
        compaction: "Exceptional load bridging"
      },
      shortDesc: "Heavy 75mm-down primary capping aggregate used to stabilize soft subgrades and establish heavy plant haul tracks.",
      fullDesc: "Coarse quarry-run crushed stone designed to bridge over soft clay subgrades, forming unyielding haul routes for 40-tonne tracked excavators and heavy construction vehicles."
    },

    // =========================================================================
    // 4. GRAVEL (Washed Decorative & Functional Gravels)
    // =========================================================================
    {
      id: "pea-gravel-10mm",
      name: "10mm Pea Gravel (River Pea Shingle)",
      category: "gravel",
      code: "GRV-PEA-01",
      grading: "4 - 10 mm (Smooth)",
      density: 1.60,
      standard: "BS EN 12620 / Landscape Spec",
      supplyTypes: ["loose", "bulk-bag"],
      image: "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?auto=format&fit=crop&w=1200&q=85",
      applications: ["Underground pipe surround", "Architectural garden pathways", "Exposed aggregate concrete", "Perimeter boundary drainage"],
      properties: {
        grainShape: "Naturally Rounded Smooth Pebble",
        moistureContent: "Washed Clean",
        drainage: "Immediate hydraulic drainage",
        compaction: "Self-bedding uniform surround"
      },
      shortDesc: "Smooth, washed river gravel that self-compacts evenly around drainage conduits and creates quiet, refined garden paths.",
      fullDesc: "Mined from natural river valleys, these smooth rounded stones are washed to eliminate fines. Flows effortlessly around flexible utility and drainage pipes without puncture risk, while offering a classic aesthetic for pathways."
    },
    {
      id: "drainage-gravel-20mm",
      name: "20mm Washed Driveway Shingle (Flint Shingle)",
      category: "gravel",
      code: "GRV-DRV-02",
      grading: "10 - 20 mm",
      density: 1.60,
      standard: "BS EN 12620",
      supplyTypes: ["loose", "bulk-bag"],
      image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=85",
      applications: ["Private estate gravel driveways", "French drains & soakaways", "Foundation perimeter trenches", "High-capacity drainage"],
      properties: {
        grainShape: "Mixed Rounded & Angular Flint",
        moistureContent: "Washed clean",
        drainage: "Maximum interstitial water flow",
        compaction: "Resistant to vehicle tyre rutting"
      },
      shortDesc: "The benchmark gravel for driveways and civil soakaways. Large enough to prevent lodging in car tyre treads.",
      fullDesc: "20mm washed flint gravel aggregate. Unlike smaller shingles, 20mm gravel does not lodge in car tyre treads, avoiding scatter onto public highways. Simultaneously provides rapid water percolation in French drains."
    },
    {
      id: "cotswold-buff",
      name: "Cotswold Buff Chippings (Architectural Limestone)",
      category: "gravel",
      code: "GRV-COT-03",
      grading: "14 - 20 mm (Angular)",
      density: 1.55,
      standard: "Architectural Hardscaping Spec",
      supplyTypes: ["loose", "bulk-bag"],
      image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1200&q=85",
      applications: ["Luxury courtyards & plazas", "Manor estate driveways", "Architectural borders", "Reflective landscaping"],
      properties: {
        grainShape: "Angular Chipped Cotswold Stone",
        moistureContent: "Dry quarried",
        drainage: "High percolation",
        compaction: "Interlocks neatly underfoot"
      },
      shortDesc: "Luminous, creamy-buff angular limestone chippings that radiate natural warmth across courtyards and estate driveways.",
      fullDesc: "Quarried from celebrated limestone beds, these cream and ivory chippings reflect daylight, transforming shadowed spaces. Angular faceting ensures stones settle together underfoot rather than shifting loose."
    },
    {
      id: "golden-flint-gravel",
      name: "Golden Flint Gravel (20mm Multi-Tone)",
      category: "gravel",
      code: "GRV-GLD-04",
      grading: "10 - 20 mm",
      density: 1.62,
      standard: "BS EN 12620 / Hardscaping Spec",
      supplyTypes: ["loose", "bulk-bag"],
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=85",
      applications: ["Prestige driveways & forecourts", "Commercial landscaping", "Decorative borders", "Water feature surrounds"],
      properties: {
        grainShape: "Semi-Angular Hard Flint",
        moistureContent: "Washed Clean",
        drainage: "Free draining",
        compaction: "Firm vehicle load bearing"
      },
      shortDesc: "Vibrant blend of warm gold, rich amber, and chestnut flint stones. Extremely hard-wearing under regular vehicular traffic.",
      fullDesc: "Washed and screened flint pebbles featuring an eye-catching mix of golden amber, cream, and brown hues. Angular edges ensure a tight interlock under car wheels, creating an elegant, crisp crunch without rutting."
    },
    {
      id: "plum-slate-chippings",
      name: "Welsh Plum Slate Paddlestones (40mm Deep)",
      category: "gravel",
      code: "GRV-SLT-05",
      grading: "20 - 40 mm (Flat)",
      density: 1.45,
      standard: "BS EN 13043 / Landscape Spec",
      supplyTypes: ["loose", "bulk-bag"],
      image: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=1200&q=85",
      applications: ["Architectural ground cover", "Water features & reflection ponds", "Low-maintenance mulch", "Weed suppression"],
      properties: {
        grainShape: "Flat Flaky Paddlestones",
        moistureContent: "Inert natural slate",
        drainage: "Maintains soil moisture",
        compaction: "Lies flat with superior ground cover"
      },
      shortDesc: "Monolithic deep plum and heather-blue Welsh slate paddlestones. Completely fish-friendly and striking when wet.",
      fullDesc: "Natural flat slate flakes extracted from historic Welsh veins. Shimmers with rich indigo and violet tones during rainfall while suppressing weed germination. 100% chemically inert and safe for ornamental ponds."
    },
    {
      id: "marine-washed-shingle",
      name: "Marine Washed Shingle (10 - 20mm Coastal Flint)",
      category: "gravel",
      code: "GRV-MAR-06",
      grading: "10 - 20 mm (Sub-Rounded)",
      density: 1.62,
      standard: "BS EN 12620 / Marine Dredged",
      supplyTypes: ["loose", "bulk-bag"],
      image: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1200&q=85",
      applications: ["Exposed coastal paving", "Aquatic landscaping", "Stormwater swales", "Permeable driveways"],
      properties: {
        grainShape: "Naturally Tumbled Marine Quartz",
        moistureContent: "Desalinated / Washed",
        drainage: "High permeability",
        compaction: "Dense stable bed"
      },
      shortDesc: "Desalinated marine-dredged flint pebbles with softly tumbled edges, offering high durability and coastal charm.",
      fullDesc: "Harvested from licensed marine extraction zones and thoroughly desalinated through freshwater wash plants. Smoothly contoured by oceanic wave action, providing exceptional hardness and natural earthy color variations."
    },

    // =========================================================================
    // 5. CRUSHED STONE (Quarried Sub-Bases, Armour & Crushed Rock)
    // =========================================================================
    {
      id: "mot-type-1",
      name: "MOT Type 1 Carboniferous Limestone Sub-Base",
      category: "crushed-stone",
      code: "CRS-MT1-01",
      grading: "0 - 40 mm (Graded Fines)",
      density: 2.10,
      standard: "SHW Clause 803 / BS EN 13242",
      supplyTypes: ["loose", "bulk-bag"],
      image: "https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=1200&q=85",
      applications: ["Motorway & highway sub-bases", "Commercial logistics compounds", "Estate driveways", "High-load structural floor slabs"],
      properties: {
        grainShape: "Hard Crushed Angular with Fines",
        moistureContent: "Optimum compaction range",
        drainage: "Low permeability (Dense)",
        compaction: "CBR > 80% achieved under compaction"
      },
      shortDesc: "The civil engineering benchmark granular sub-base. Crushed rock with graded fines for zero-deflection compaction.",
      fullDesc: "The definitive sub-base specified by the Department for Transport (SHW Series 800, Clause 803). Extracted from dense carboniferous limestone quarries, graded meticulously from 40mm down to dust. Interlocks rigidly when compacted by heavy vibratory rollers."
    },
    {
      id: "mot-type-1-granite",
      name: "MOT Type 1 Hard Granite Sub-Base",
      category: "crushed-stone",
      code: "CRS-GRN-02",
      grading: "0 - 40 mm (Granite Graded)",
      density: 2.15,
      standard: "SHW Clause 803 / Network Rail Spec",
      supplyTypes: ["loose", "bulk-bag"],
      image: "https://images.unsplash.com/photo-1574482620826-40685ca5ebd2?auto=format&fit=crop&w=1200&q=85",
      applications: ["Rail freight yard hardstandings", "Severe-duty industrial pavements", "Heavy axle load roadways", "Extreme compaction sub-bases"],
      properties: {
        grainShape: "Crushed Igneous Volcanic Granite",
        moistureContent: "Controlled",
        drainage: "Low void ratio once rolled",
        compaction: "Superior abrasion & frost heave resistance"
      },
      shortDesc: "Ultra-dense igneous granite sub-base delivering maximum frost heave resistance and exceptional bearing strength.",
      fullDesc: "Crushed from virgin volcanic granite with zero clay or soft mineral inclusions. Engineered for the most demanding civil engineering infrastructure projects requiring frost-resistant Class 803 foundations."
    },
    {
      id: "mot-type-3",
      name: "MOT Type 3 Open-Graded (SuDS Permeable Stone)",
      category: "crushed-stone",
      code: "CRS-MT3-03",
      grading: "4 - 40 mm (Zero Fines)",
      density: 1.85,
      standard: "SHW Clause 805 / BS EN 13242",
      supplyTypes: ["loose", "bulk-bag"],
      image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=85",
      applications: ["Permeable architectural driveways", "SuDS stormwater attenuation", "Equestrian surfaces", "Sports arena sub-bases"],
      properties: {
        grainShape: "Clean Crushed Angular Granite",
        moistureContent: "Dry free-draining",
        drainage: "Extraordinary Void Ratio (>32%)",
        compaction: "Interlocking permeable matrix"
      },
      shortDesc: "Engineered open-graded crushed stone formulated with reduced fines for Sustainable Drainage Systems (SuDS).",
      fullDesc: "Designed specifically for architectural permeable pavements and storm water reservoirs where surface water must drain naturally into sub-formations. Formulated with zero dust or silt fines to maintain void space while retaining high structural load capacity."
    },
    {
      id: "gabion-stone",
      name: "Gabion Basket Stone (100 - 200mm Quarry Rock)",
      category: "crushed-stone",
      code: "CRS-GAB-04",
      grading: "100 - 200 mm (Monolithic)",
      density: 1.70,
      standard: "BS EN 13383-1 / Armorstone Spec",
      supplyTypes: ["loose", "bulk-bag"],
      image: "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&w=1200&q=85",
      applications: ["Wire gabion retaining walls", "Civil erosion mitigation", "Architectural stone cladding", "Earthworks terracing"],
      properties: {
        grainShape: "Monolithic Hand-Sorted Angular",
        moistureContent: "Clean & weather-resistant",
        drainage: "100% Free Draining",
        compaction: "Hand/machine placed stone matrix"
      },
      shortDesc: "Weather-resistant, angular quarried stone sorted specifically to fill wire gabion baskets for retaining structures.",
      fullDesc: "Hand-picked and mechanically sorted limestone and basalt stones sized between 100mm and 200mm. Offers maximum compressive strength and freeze-thaw endurance, making it ideal for architectural retaining structures, shoreline protection, and luxury terraced landscaping."
    },
    {
      id: "crusher-run-50mm",
      name: "Crusher Run (0 - 50mm Crushed Limestone)",
      category: "crushed-stone",
      code: "CRS-RUN-05",
      grading: "0 - 50 mm (Quarry Run)",
      density: 2.05,
      standard: "BS EN 13242 / General Civils",
      supplyTypes: ["loose", "bulk-bag"],
      image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=85",
      applications: ["Farm trackways & estate paths", "Paddock hardstandings", "Temporary access road formations", "Site leveling foundation"],
      properties: {
        grainShape: "Crushed Angular with Sieve Dust",
        moistureContent: "Natural quarry moisture",
        drainage: "Low permeability when bound",
        compaction: "High natural self-binding"
      },
      shortDesc: "Direct quarry-crushed limestone with dust fines that compacts into an economical, bound, solid stone trackway.",
      fullDesc: "Unscreened crusher run straight from primary jaw crushers. The blend of angular stone and stone dust binds together tightly when compacted with a roller, forming an inexpensive, highly durable surface for rural and site tracks."
    },
    {
      id: "rip-rap-stone",
      name: "Rip Rap / Rock Armour Crushed Stone (150 - 300mm)",
      category: "crushed-stone",
      code: "CRS-RIP-06",
      grading: "150 - 300 mm (Heavy Armour)",
      density: 1.65,
      standard: "BS EN 13383-1 / Heavy Civil Spec",
      supplyTypes: ["loose"],
      image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1200&q=85",
      applications: ["Riverbank scour protection", "Coastal revetments & breakwaters", "Culvert inlet/outlet erosion barriers", "Civil retaining boulder structures"],
      properties: {
        grainShape: "Heavy Angular Quarry Rock",
        moistureContent: "Clean & Dense",
        drainage: "High open void percolation",
        compaction: "Interlocked heavy boulder placement"
      },
      shortDesc: "Heavy quarried boulder stone engineered to absorb high hydraulic wave energy and prevent shoreline scour.",
      fullDesc: "Heavy monolithic crushed rock blocks selected for density and durability against chemical dissolution and freeze-thaw cycles. Essential for culverts, flood management channels, and heavy civil erosion control."
    }
  ],

  // Haulage and Delivery Fleet specifications
  fleet: [
    {
      id: "tipper-8wheel",
      title: "8-Wheel Rigid Tipper (Rear Discharge)",
      capacity: "20 Tonnes Payload (~14 m³)",
      discharge: "High-lift hydraulic rear tip",
      dimensions: "9.2m (L) x 2.55m (W) x 3.4m (H)",
      overheadTippingHeight: "7.8m vertical clearance required",
      minimumGateWidth: "3.2 meters clearance",
      idealFor: "Bulk civil infrastructure, commercial distribution hubs, highway widening, and ready-mix continuous replenishment.",
      badge: "Commercial Bulk Efficiency",
      image: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=1200&q=85"
    },
    {
      id: "grab-8wheel",
      title: "8-Wheel Grab Lorry (Hydraulic Crane)",
      capacity: "16 Tonnes Payload (~11 m³)",
      discharge: "Hydraulic clamshell grab bucket",
      dimensions: "9.5m (L) x 2.55m (W) x 3.6m (H)",
      craneReach: "7.5 meters horizontal reach over 6ft walls",
      minimumGateWidth: "3.2 meters clearance",
      idealFor: "Delivering aggregates over architectural walls, hedges, or fencing; combined muck-away soil removal on return trips.",
      badge: "Precision Over-Wall Placement",
      image: "https://images.unsplash.com/photo-1584467541268-b040f83be3fd?auto=format&fit=crop&w=1200&q=85"
    },
    {
      id: "hiab-crane",
      title: "Crane Offload Vehicle (Bulk Bags)",
      capacity: "10 - 14 Bulk Bags (Up to 12 Tonnes)",
      discharge: "Hiab rear articulating crane",
      dimensions: "8.5m (L) x 2.5m (W) x 3.4m (H)",
      craneReach: "5.5 meters reach onto driveways & curbs",
      minimumGateWidth: "3.0 meters clearance",
      idealFor: "Residential projects, private driveways, and urban developments where loose aggregate tipping would impede roads.",
      badge: "Zero-Spill Curbside Drop",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=85"
    },
    {
      id: "artic-bulk",
      title: "Articulated Bulk Tipper (Heavy Infrastructure)",
      capacity: "28 - 30 Tonnes Payload (~20 m³)",
      discharge: "High-volume chassis hydraulic tip",
      dimensions: "14.5m (L) x 2.55m (W) x 3.8m (H)",
      overheadTippingHeight: "9.5m vertical clearance required",
      minimumGateWidth: "4.0 meters wide swept path",
      idealFor: "Major highway infrastructure, airport runways, rail ballast replacements, and continuous asphalt batching plants.",
      badge: "Monolithic Volume Transport",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=85"
    }
  ],

  // Haulage zones & rates
  deliveryZones: [
    {
      zone: 1,
      title: "Zone 1 - Local Hub & Core Metro Corridor",
      radius: "0 - 15 Miles from closest Depot",
      leadTime: "Same-Day (Order before 10 AM) or Next-Day Guaranteed",
      minimumOrder: "10 Tonnes loose or 1 Bulk Bag",
      baseHaulageRate: 35.00,
      color: "gold",
      coverageNote: "Direct daily scheduled shuttles. Dedicated morning or afternoon time slots available."
    },
    {
      zone: 2,
      title: "Zone 2 - Regional Construction Belt",
      radius: "15 - 35 Miles from closest Depot",
      leadTime: "Next-Day or Pre-Booked Scheduled Drops",
      minimumOrder: "15 Tonnes loose or 3 Bulk Bags",
      baseHaulageRate: 65.00,
      color: "sandstone",
      coverageNote: "Comprehensive daily regional routes. Full digital POD tracking with 30-min callahead."
    },
    {
      zone: 3,
      title: "Zone 3 - Major Civils & Extended Infrastructure",
      radius: "35 - 70 Miles from Railhead/Quarry",
      leadTime: "24 to 48 Hours Notice Required",
      minimumOrder: "20 Tonnes loose (Full 8-Wheeler or Artic load)",
      baseHaulageRate: 110.00,
      color: "earth",
      coverageNote: "High-capacity continuous haulage fleets dedicated to major civil engineering contracts."
    }
  ],

  // Depots and Weighbridge Hubs
  depots: [
    {
      id: "quarry-north",
      name: "Granite Ridge Main Quarry & Railhead Hub",
      address: "Granite Way, Quarry Hill Industrial Park, B78 3EQ",
      phone: "+44 (0) 1632 960840",
      weighbridgeHours: "Mon-Fri: 06:00 - 17:30 | Sat: 07:00 - 12:30",
      type: "Primary Quarry, Hydrocyclone Wash Plant & Rail Terminal",
      status: "Active - Smooth Weighbridge Flow",
      coordinates: "52.4862° N, 1.8904° W"
    },
    {
      id: "hub-central",
      name: "Central Urban Reclamation & Soil Screen Plant",
      address: "Phoenix Reclamation Way, Delta Logistics Park, CV4 9TW",
      phone: "+44 (0) 1632 960841",
      weighbridgeHours: "Mon-Fri: 06:30 - 17:00 | Sat: 07:00 - 12:00",
      type: "Concrete Crushing, Tarmac Planings & Screened Blending",
      status: "Active - Rapid Turnaround (~6 min wait)",
      coordinates: "52.4068° N, 1.5197° W"
    },
    {
      id: "terminal-coastal",
      name: "Southern Estuary Marine Sand & Gravel Wharf",
      address: "Wharf Road, Portside Aggregate Basin, PO1 3AX",
      phone: "+44 (0) 1632 960842",
      weighbridgeHours: "Mon-Fri: 06:00 - 18:00 | Sat: On Request",
      type: "Marine Dredged Sands, Washed Shingle & Coarse Ballast",
      status: "Active - High Capacity Ships Discharge",
      coordinates: "50.8198° N, 1.0880° W"
    }
  ]
};

// Export to window for vanilla JS access across pages, and module.exports for Node
if (typeof window !== "undefined") {
  window.VANGUARD_DATA = VANGUARD_DATA;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = VANGUARD_DATA;
}
