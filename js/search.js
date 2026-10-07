/* ==========================================================================
   Sierra Leone Historical Knowledge Center - Global Search Engine
   ========================================================================== */

const SLSearch = {
  init() {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        if (query.length >= 2) {
          this.performSearch(query);
        } else if (query.length === 0) {
          this.clearResults();
        }
      });
    }

    if (searchForm) {
      searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput ? searchInput.value.trim() : '';
        this.performSearch(query);
      });
    }

    const urlParams = new URLSearchParams(window.location.search);
    const initialQuery = urlParams.get('q');
    if (initialQuery && searchInput) {
      searchInput.value = initialQuery;
      document.addEventListener('slDataLoaded', () => {
        this.performSearch(initialQuery);
      });
    }
  },

  performSearch(query) {
    const resultsContainer = document.getElementById('search-results-container');
    if (!resultsContainer) return;

    const q = query.toLowerCase();
    const eventMatches = (SLHistory.data.events || []).filter(item =>
      item.title.toLowerCase().includes(q) ||
      item.summary.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      (item.categories && item.categories.some(c => c.toLowerCase().includes(q)))
    );

    const peopleMatches = (SLHistory.data.people || []).filter(item =>
      item.name.toLowerCase().includes(q) ||
      item.role.toLowerCase().includes(q) ||
      item.biography.toLowerCase().includes(q)
    );

    const placeMatches = (SLHistory.data.places || []).filter(item =>
      item.name.toLowerCase().includes(q) ||
      item.district.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q)
    );

    this.renderResults(resultsContainer, query, eventMatches, peopleMatches, placeMatches);
  },

  renderResults(container, query, events, people, places) {
    const total = events.length + people.length + places.length;
    if (total === 0) {
      container.innerHTML = `
        <div class="card">
          <h3>No matching historical records found for "${query}"</h3>
          <p>Try searching for terms like "Hut Tax", "Bunce Island", "Bai Bureh", "Freetown", "Ebola", or "Independence".</p>
        </div>
      `;
      return;
    }

    let html = `<div class="search-summary">Found <strong>${total}</strong> records for "<em>${query}</em>"</div>`;

    if (events.length > 0) {
      html += `
        <div class="search-group">
          <h3 class="section-title">Historical Events (${events.length})</h3>
          <div class="grid-2">
            ${events.map(item => `
              <div class="card">
                <div class="card-meta">
                  <span class="badge badge-primary">${item.period}</span>
                  <span>${item.startDate || ''}</span>
                </div>
                <h4 class="card-title">${item.title}</h4>
                <p class="card-body">${item.summary}</p>
                <div class="card-footer">
                  <a href="events.html?id=${item.id}">View Record →</a>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    if (people.length > 0) {
      html += `
        <div class="search-group" style="margin-top: 2rem;">
          <h3 class="section-title">Historical Figures (${people.length})</h3>
          <div class="grid-2">
            ${people.map(item => `
              <div class="card">
                <div class="card-meta">
                  <span class="badge badge-archival">${item.period}</span>
                  <span>${item.birthYear} – ${item.deathYear || 'Present'}</span>
                </div>
                <h4 class="card-title">${item.name}</h4>
                <p class="card-body">${item.role}</p>
                <div class="card-footer">
                  <a href="people.html?id=${item.id}">Biography →</a>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    container.innerHTML = html;
  },

  clearResults() {
    const container = document.getElementById('search-results-container');
    if (container) container.innerHTML = '';
  }
};

document.addEventListener('DOMContentLoaded', () => {
  SLSearch.init();
});
