/* ==========================================================================
   Sierra Leone Historical Knowledge Center - Core App & Utilities
   ========================================================================== */

const SLHistory = {
  data: {
    categories: null,
    events: null,
    people: null,
    places: null,
    timeline: null,
    sources: null,
    glossary: null,
    statistics: null
  },

  async init() {
    this.initTheme();
    this.initMobileNav();
    await this.loadDatasets();
    this.initOnThisDay();
    this.initSpotlight();
    this.initResearchModeToggle();
  },

  initTheme() {
    const savedTheme = localStorage.getItem('sl_history_theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('sl_history_theme', newTheme);
      });
    }
  },

  initMobileNav() {
    const toggleBtn = document.getElementById('mobile-nav-toggle');
    const mainNav = document.getElementById('main-nav');
    if (toggleBtn && mainNav) {
      toggleBtn.addEventListener('click', () => {
        mainNav.classList.toggle('open');
        const isOpen = mainNav.classList.contains('open');
        toggleBtn.setAttribute('aria-expanded', isOpen);
      });
    }
  },

  async loadDatasets() {
    try {
      const [cats, evts, pms, plc, tml, src, glo, sta] = await Promise.all([
        fetch('data/categories.json').then(res => res.json()),
        fetch('data/events.json').then(res => res.json()),
        fetch('data/people.json').then(res => res.json()),
        fetch('data/places.json').then(res => res.json()),
        fetch('data/timeline.json').then(res => res.json()),
        fetch('data/sources.json').then(res => res.json()),
        fetch('data/glossary.json').then(res => res.json()),
        fetch('data/statistics.json').then(res => res.json())
      ]);

      this.data.categories = cats;
      this.data.events = evts;
      this.data.people = pms;
      this.data.places = plc;
      this.data.timeline = tml;
      this.data.sources = src;
      this.data.glossary = glo;
      this.data.statistics = sta;

      document.dispatchEvent(new CustomEvent('slDataLoaded'));
    } catch (err) {
      console.error('Error loading historical datasets:', err);
    }
  },

  initOnThisDay() {
    const container = document.getElementById('on-this-day-card');
    if (!container || !this.data.events) return;

    const today = new Date();
    const monthStr = String(today.getMonth() + 1).padStart(2, '0');
    const dayStr = String(today.getDate()).padStart(2, '0');
    const datePattern = `-${monthStr}-${dayStr}`;

    let match = this.data.events.find(e => e.startDate && e.startDate.includes(datePattern));
    if (!match) {
      match = this.data.events[Math.floor(Math.random() * this.data.events.length)];
    }

    container.innerHTML = `
      <div class="card-meta">
        <span class="badge badge-primary">On This Day</span>
        <span>${match.startDate || match.period}</span>
      </div>
      <h3 class="card-title">${match.title}</h3>
      <p class="card-body">${match.summary}</p>
      <div class="card-footer">
        <span>Location: ${match.locations ? match.locations.join(', ') : 'Sierra Leone'}</span>
        <a href="events.html?id=${match.id}" class="read-more-link">View Full Record →</a>
      </div>
    `;
  },

  initSpotlight() {
    const container = document.getElementById('featured-spotlight-card');
    if (!container || !this.data.people) return;

    const randomPerson = this.data.people[Math.floor(Math.random() * this.data.people.length)];
    container.innerHTML = `
      <div class="card-meta">
        <span class="badge badge-archival">Featured Historical Figure</span>
        <span>${randomPerson.birthYear} – ${randomPerson.deathYear || 'Present'}</span>
      </div>
      <h3 class="card-title">${randomPerson.name}</h3>
      <p class="card-body">${randomPerson.biography.substring(0, 220)}...</p>
      <div class="card-footer">
        <span>Role: ${randomPerson.role}</span>
        <a href="people.html?id=${randomPerson.id}">Biography →</a>
      </div>
    `;
  },

  initResearchModeToggle() {
    const toggle = document.getElementById('research-mode-toggle');
    if (!toggle) return;

    toggle.addEventListener('change', (e) => {
      if (e.target.checked) {
        document.body.classList.add('research-mode-active');
      } else {
        document.body.classList.remove('research-mode-active');
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  SLHistory.init();
});
