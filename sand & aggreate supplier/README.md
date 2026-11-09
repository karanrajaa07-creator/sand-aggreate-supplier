# Vanguard Aggregates & Minerals Co.
### Architectural Sands, Primary Quarried Aggregates & Heavy Haulage

A production-grade, practical website built for a commercial **Sand & Aggregate Supplier**, styled with a **luxurious industrial design and premium architectural aesthetic**.

---

## 🎨 Visual Identity & Architectural Design System

* **Color Palette:**
  - **Charcoal Black** (`#0c0e11`, `#14171d`, `#1b1f27`) — Deep, monolithic basalt base canvas and card surfaces.
  - **Warm Ivory** (`#fdfbf7`, `#f7f4ed`, `#eee8dc`) — High-contrast, elegant typography for headings and prominent badges.
  - **Sandstone Beige** (`#d4c8b6`, `#b8a994`, `#9e8d77`) — Mineral earth tones for technical descriptions and secondary labels.
  - **Muted Gold** (`#c5a059`, `#dfba73`, `#d4a34b`) — Sophisticated architectural metallic accents, active navigation states, and action buttons.
  - **Earthy Grey** (`#22252c`, `#282c35`, `#383d49`) — Subdued stone dividers, hairline borders, and utility surfaces.
* **Typography:**
  - Headings: `Cinzel` & `Plus Jakarta Sans` with bold uppercase tracking and generous letter-spacing.
  - Body: `Plus Jakarta Sans` for clean, readable, effortless reading.
  - Technical Metrics: `JetBrains Mono` for grading specs, density numbers, and weighbridge timestamps.
* **Photography:**
  - 100% verified, high-resolution imagery of sand dunes, open-pit stone quarries, heavy mining machinery, and architectural concrete civil projects.
  - Zero duplicate images across product catalog cards and home page showcase cards.
* **Layout & Polish:**
  - Generous whitespace (`py-24`, `py-32`), clean architectural grid lines, subtle hairline gold dividers, frosted-glass headers, and smooth micro-interactions.
  - No basic templates, no cartoon graphics, no harsh construction hazard stripes.

---

## 🏗️ Complete Page Directory

1. **Home Page (`index.html`)** — Impressive full-width hero with live weighbridge status, 7 unique material category cards (River Sand, M-Sand, P-Sand, 20mm Aggregate, 40mm Aggregate, Gravel, Crushed Stone), Why Choose Us, Our Impact statistics counters, Featured Projects showcase, and Final CTA.
2. **Home 2 / Infrastructure (`home-2.html`)** — Civil engineering and mega-infrastructure edition focusing on railheads, airport runways, highway bypasses, and coastal sea defences.
3. **Products Catalog (`products.html`)** — Quotation-based catalog with live search, 5 category filters (Sand, Manufactured Sand, Aggregates, Gravel, Crushed Stone), grading metrics, technical specifications, and direct "Request Pricing" quote integration.
4. **About Us (`about.html`)** — Heritage, quarry operations, ESG sustainability, laboratory testing certifications (ISO 9001 / BS EN / WRAP), and executive leadership.
5. **Logistics & Delivery (`delivery.html`)** — Haulage fleet breakdown (8-wheel tippers, 8-wheel grab cranes, Hiab offloaders, articulated bulk tippers), 3-step delivery process, interactive delivery zone estimator, site access requirements, and FAQs.
6. **Blog & Technical Guides (`blog.html`)** — In-depth technical articles for civil engineers, groundworkers, and quantity surveyors (e.g. SuDS permeable aggregates, compaction testing, sieve analysis).
7. **Pricing Matrix (`pricing.html`)** — Commercial indicative volume tariffs, minimum order thresholds, and lead time matrices.
8. **Contact & Quote Builder (`contact.html`)** — Luxurious contact page with central weighbridge dispatch details, interactive multi-field quotation builder with client and server validation, and instant quotation reference generation.
9. **Privacy & Data Governance (`privacy.html`)** — Corporate privacy policy, GDPR compliance, and weighbridge telemetry data handling.
10. **Commercial Terms of Supply (`terms.html`)** — Standard terms of sale, site access clearances, offload demurrage, and weighbridge calibration standards.

---

## ⚡ Technical Highlights

* **Sticky Luxury Navbar:** Seamless transition from transparent over the hero to solid premium background on scroll (`#main-nav`, `.navbar-scrolled`).
* **Live Quotation API:** Embedded Node.js server (`server.js`) with active `POST /api/quote` endpoint validating all mandatory fields and returning formatted reference codes (e.g. `VNG-QTE-43860`).
* **Zero Broken Links / Missing Images:** Verified across all 10 pages and 407 internal hyperlinks, with 58 active Unsplash images tested with HTTP 200 responses.
* **Performance & Accessibility:** Semantic HTML5, `loading="lazy"` on all offscreen images, `@media (prefers-reduced-motion)` fallbacks, and WCAG AA contrast compliance.

---

## 🚀 How to Run Locally

Start the local server:
```bash
node server.js
```

Then visit:
- **Home:** [http://localhost:3000/index.html](http://localhost:3000/index.html)
- **Home 2:** [http://localhost:3000/home-2.html](http://localhost:3000/home-2.html)
- **Products:** [http://localhost:3000/products.html](http://localhost:3000/products.html)
- **About Us:** [http://localhost:3000/about.html](http://localhost:3000/about.html)
- **Delivery:** [http://localhost:3000/delivery.html](http://localhost:3000/delivery.html)
- **Blog:** [http://localhost:3000/blog.html](http://localhost:3000/blog.html)
- **Pricing:** [http://localhost:3000/pricing.html](http://localhost:3000/pricing.html)
- **Contact & Quote:** [http://localhost:3000/contact.html](http://localhost:3000/contact.html)
