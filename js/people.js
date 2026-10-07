/* ==========================================================================
   Sierra Leone Historical Knowledge Center - Directories (People & Places)
   ========================================================================== */

const SLDirectories = {
  initPeople() {
    const container = document.getElementById('people-grid-container');
    const searchInput = document.getElementById('people-search-input');
    if (!container) return;

    document.addEventListener('slDataLoaded', () => {
      this.renderPeople(container, SLHistory.data.people || []);
    });

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = (SLHistory.data.people || []).filter(p =>
          p.name.toLowerCase().includes(query) ||
          p.role.toLowerCase().includes(query) ||
          p.biography.toLowerCase().includes(query)
        );
        this.renderPeople(container, filtered);
      });
    }
  },

  renderPeople(container, list) {
    if (list.length === 0) {
      container.innerHTML = `<div class="card"><p>No historical figures matched your query.</p></div>`;
      return;
    }

    container.innerHTML = list.map(person => `
      <div class="card" id="${person.id}">
        <div class="card-meta">
          <span class="badge badge-archival">${person.period}</span>
          <span>${person.birthYear} – ${person.deathYear || 'Present'}</span>
        </div>
        <h3 class="card-title">${person.name}</h3>
        <p class="card-body"><strong>${person.role}</strong><br>${person.biography}</p>
        <div class="card-footer">
          <span><strong>Associated Places:</strong> ${person.places ? person.places.join(', ') : 'Sierra Leone'}</span>
        </div>
      </div>
    `).join('');
  },

  initPlaces() {
    const container = document.getElementById('places-grid-container');
    const searchInput = document.getElementById('places-search-input');
    if (!container) return;

    document.addEventListener('slDataLoaded', () => {
      this.renderPlaces(container, SLHistory.data.places || []);
    });

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = (SLHistory.data.places || []).filter(p =>
          p.name.toLowerCase().includes(query) ||
          p.district.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
        );
        this.renderPlaces(container, filtered);
      });
    }
  },

  renderPlaces(container, list) {
    if (list.length === 0) {
      container.innerHTML = `<div class="card"><p>No historical places matched your query.</p></div>`;
      return;
    }

    container.innerHTML = list.map(place => `
      <div class="card" id="${place.id}">
        <div class="card-meta">
          <span class="badge badge-official">${place.district}</span>
          <span>${place.province}</span>
        </div>
        <h3 class="card-title">${place.name}</h3>
        <p class="card-body"><strong>Significance:</strong> ${place.historicalSignificance}<br><br>${place.description}</p>
        <div class="card-footer">
          <span><strong>Key Sites:</strong> ${place.keySites ? place.keySites.join(', ') : 'Historical Monument'}</span>
        </div>
      </div>
    `).join('');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  SLDirectories.initPeople();
  SLDirectories.initPlaces();
});
