/* ==========================================================================
   Sierra Leone Historical Knowledge Center - Maps & Charts
   ========================================================================== */

const SLVisuals = {
  initMap() {
    const mapElement = document.getElementById('historical-map');
    if (!mapElement || typeof L === 'undefined') return;

    // Center map on Sierra Leone
    const map = L.map('historical-map').setView([8.460555, -11.779889], 8);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap contributors | Sierra Leone Historical Archive'
    }).addTo(map);

    document.addEventListener('slDataLoaded', () => {
      if (!SLHistory.data.places) return;

      SLHistory.data.places.forEach(place => {
        if (place.coordinates && place.coordinates.lat && place.coordinates.lng) {
          const marker = L.marker([place.coordinates.lat, place.coordinates.lng]).addTo(map);
          marker.bindPopup(`
            <div style="font-family: sans-serif; padding: 4px;">
              <h4 style="margin: 0 0 4px 0; color: #008751;">${place.name}</h4>
              <p style="margin: 0 0 6px 0; font-size: 12px; color: #555;">${place.district}, ${place.province}</p>
              <p style="margin: 0; font-size: 13px;">${place.historicalSignificance}</p>
              <a href="places.html#${place.id}" style="font-size: 12px; color: #0072ce; display: inline-block; margin-top: 6px;">Explore Location →</a>
            </div>
          `);
        }
      });
    });
  },

  initCharts() {
    if (typeof Chart === 'undefined') return;

    const popCtx = document.getElementById('population-chart');
    const diamondCtx = document.getElementById('diamond-chart');

    document.addEventListener('slDataLoaded', () => {
      const stats = SLHistory.data.statistics;
      if (!stats) return;

      if (popCtx && stats.population) {
        new Chart(popCtx, {
          type: 'line',
          data: {
            labels: stats.population.data.map(d => d.year),
            datasets: [{
              label: 'Population Count',
              data: stats.population.data.map(d => d.value),
              borderColor: '#008751',
              backgroundColor: 'rgba(0, 135, 81, 0.1)',
              fill: true,
              tension: 0.3
            }]
          },
          options: {
            responsive: true,
            plugins: {
              title: { display: true, text: stats.population.title },
              subtitle: { display: true, text: `Source: ${stats.population.source}` }
            }
          }
        });
      }

      if (diamondCtx && stats.mineralExports) {
        new Chart(diamondCtx, {
          type: 'bar',
          data: {
            labels: stats.mineralExports.data.map(d => d.year),
            datasets: [{
              label: 'Carats Exported',
              data: stats.mineralExports.data.map(d => d.value),
              backgroundColor: '#0072ce'
            }]
          },
          options: {
            responsive: true,
            plugins: {
              title: { display: true, text: stats.mineralExports.title },
              subtitle: { display: true, text: `Source: ${stats.mineralExports.source}` }
            }
          }
        });
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  SLVisuals.initMap();
  SLVisuals.initCharts();
});
