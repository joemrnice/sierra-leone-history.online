/* ==========================================================================
   Sierra Leone Historical Knowledge Center - Timeline Engine
   ========================================================================== */

const SLTimeline = {
  activeEra: 'all',

  init() {
    document.addEventListener('slDataLoaded', () => {
      this.renderFilterBar();
      this.renderTimeline();
    });
  },

  renderFilterBar() {
    const filterContainer = document.getElementById('timeline-filter-bar');
    if (!filterContainer || !SLHistory.data.categories) return;

    const eras = SLHistory.data.categories.periods || [];
    let html = `
      <button class="btn-filter ${this.activeEra === 'all' ? 'active' : ''}" data-era="all">
        All Periods
      </button>
    `;

    eras.forEach(era => {
      html += `
        <button class="btn-filter ${this.activeEra === era.id ? 'active' : ''}" data-era="${era.id}">
          ${era.name}
        </button>
      `;
    });

    filterContainer.innerHTML = html;

    filterContainer.querySelectorAll('.btn-filter').forEach(btn => {
      btn.addEventListener('click', (e) => {
        filterContainer.querySelectorAll('.btn-filter').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        this.activeEra = e.target.getAttribute('data-era');
        this.renderTimeline();
      });
    });
  },

  renderTimeline() {
    const container = document.getElementById('timeline-items-container');
    if (!container || !SLHistory.data.events) return;

    let events = SLHistory.data.events;
    if (this.activeEra !== 'all') {
      events = events.filter(e => e.period === this.activeEra);
    }

    if (events.length === 0) {
      container.innerHTML = `<div class="card"><p>No events recorded for this specific era.</p></div>`;
      return;
    }

    container.innerHTML = events.map(evt => `
      <div class="timeline-item" id="${evt.id}">
        <div class="timeline-marker"></div>
        <div class="timeline-content card">
          <div class="timeline-year">${evt.startDate || 'Approximate Date'}</div>
          <h3 class="card-title">${evt.title}</h3>
          <p class="card-body">${evt.description}</p>
          <div class="card-footer">
            <span><strong>Location:</strong> ${evt.locations ? evt.locations.join(', ') : 'Sierra Leone'}</span>
            <span class="badge badge-primary">${evt.period}</span>
          </div>
        </div>
      </div>
    `).join('');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  SLTimeline.init();
});
