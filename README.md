# Sierra Leone Historical Knowledge Center & Digital Archive

A zero-framework, research-oriented static web platform and data portal dedicated to the history of Sierra Leone—from prehistory and early human settlements through European contact, the Atlantic slave trade, Freetown's founding, the colonial era, independence, civil war peacebuilding, and contemporary developments.

---

## 🏛️ Project Purpose & Scope

The website functions as a serious digital historical knowledge center and data portal for:
- Sierra Leoneans at home and in the diaspora
- Students, teachers, lecturers, and educational institutions
- Historians, researchers, genealogists, and African history scholars
- International organizations, journalists, and global visitors

---

## 💻 Tech Stack & Zero-Framework Architecture

This project is a genuine **ZERO-FRAMEWORK** static application.

- **HTML5**: Semantic markup, accessible navigation, and ARIA attributes.
- **CSS3**: Pure CSS custom properties (variables), light/dark mode support, responsive flex/grid layouts, and dedicated print styles.
- **Vanilla JavaScript**: Zero-framework ES6 modular application logic for dataset loading, multi-field search, timeline filtering, map integration, chart rendering, and interactive quiz generation.
- **CDN Supporting Tools**:
  - [Leaflet.js](https://leafletjs.com/) for historical interactive map overlays.
  - [Chart.js](https://www.chartjs.org/) for data center statistical visualizations.

---

## 📁 Repository Directory Structure

```
/
├── index.html            # Landing portal, hero search, spotlight & era navigation
├── timeline.html         # Master interactive historical timeline
├── events.html           # Searchable events explorer
├── people.html           # Historical figures biography directory
├── places.html           # Geographic heritage & places directory
├── maps.html             # Leaflet.js interactive historical map
├── data.html             # Data center (population & mineral charts)
├── sources.html          # Source bibliography & credibility repository
├── research.html         # Educational study hub & interactive quiz engine
├── glossary.html         # Searchable historical glossary
├── about.html            # Project scope, editorial principles & disclaimers
├── contact.html          # Formspree contact & source correction form
├── sitemap.xml           # SEO sitemap
├── robots.txt            # Search engine crawler configuration
├── css/
│   ├── style.css         # Core design system, variables & components
│   ├── responsive.css    # Mobile/tablet layout rules
│   └── print.css         # Academic research print stylesheet
├── js/
│   ├── app.js            # Core app state, theme manager & dataset loader
│   ├── search.js         # Client-side global search engine
│   ├── timeline.js       # Era filter & timeline generator
│   ├── people.js         # Directory rendering engine
│   ├── maps.js           # Leaflet map & Chart.js engine
│   └── quiz.js           # Educational quiz module
└── data/
    ├── categories.json   # Historical period & topic taxonomies
    ├── events.json       # Structured historical event records
    ├── people.json       # Historical figure biographies
    ├── places.json       # Geographic site records with coordinates
    ├── timeline.json     # Milestone timeline entries
    ├── sources.json      # Annotated bibliographical citations
    ├── glossary.json     # Terminology definitions
    └── statistics.json   # Sourced demographic & economic data series
```

---

## 📝 How to Add or Update Historical Content

The site architecture separates content logic from code. To add new historical records, edit the corresponding JSON file in `/data/`:

### 1. Adding a New Historical Event (`data/events.json`)
```json
{
  "id": "event-unique-slug",
  "title": "Title of Event",
  "startDate": "YYYY-MM-DD",
  "period": "prehistory | precolonial | european-contact | slave-trade | freetown-founding | crown-colony | protectorate-era | decolonization | post-independence | civil-war | peacebuilding | ebola-crisis | contemporary",
  "categories": ["politics", "colonialism", "culture"],
  "locations": ["Freetown"],
  "summary": "Brief summary of event.",
  "description": "Comprehensive historical description with citations.",
  "people": ["person-id"],
  "sources": ["src-id"],
  "status": "historical",
  "confidence": "high"
}
```

### 2. Adding a Person (`data/people.json`)
```json
{
  "id": "person-unique-slug",
  "name": "Full Name",
  "birthYear": "1800",
  "deathYear": "1890",
  "role": "Role / Historical Significance",
  "period": "Crown Colony",
  "places": ["Freetown"],
  "biography": "Full biographical description...",
  "achievements": ["Achievement 1", "Achievement 2"],
  "sources": ["src-id"]
}
```

---

## ✉️ Formspree Contact Configuration

To connect the contact & correction form on `contact.html` to your inbox:
1. Register a free form endpoint at [Formspree.io](https://formspree.io/).
2. Open `contact.html`.
3. Replace `YOUR_FORMSPREE_ID` in `<form action="https://formspree.io/f/YOUR_FORMSPREE_ID" method="POST">` with your actual Formspree endpoint key.

---

## 🚀 GitHub Pages Deployment

1. Push all files to your GitHub repository:
   ```bash
   git add .
   git commit -m "Deploy Sierra Leone History Portal"
   git push origin main
   ```
2. Navigate to Repository Settings > **Pages**.
3. Under **Build and deployment**, set Source to **Deploy from a branch** and select `main` / `/ (root)`.
4. Click **Save**. Your site will be live at `https://USERNAME.github.io/REPOSITORY/`.

---

## 📜 Editorial Disclaimer

All historical data provided in this repository synthesizes primary archival sources, Truth & Reconciliation Commission materials, UNESCO documentation, and peer-reviewed academic publications. Disagreements between sources regarding exact dates or numerical estimates are presented transparently in accordance with academic standards.
