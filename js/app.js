const apiInput = document.getElementById('api');
const galleryContainer = document.getElementById('gallery');
const statusDiv = document.getElementById('status');

// Dapatkan URL API daripada localStorage atau input
const savedApiUrl = localStorage.getItem('vatc_api_url');
if (savedApiUrl) {
  apiInput.value = savedApiUrl;
  loadGallery(savedApiUrl);
} else {
  statusDiv.textContent = 'Sila masukkan Apps Script Web App URL di bahagian Settings (⚙ API).';
}
// Mengendalikan Modal Setup / Settings
const modal = document.getElementById('modal');
const btnSettings = document.getElementById('settings');
const btnClose = document.getElementById('close');
const btnSave = document.getElementById('save');
const btnRefresh = document.getElementById('refresh');

if (btnSettings) {
  btnSettings.addEventListener('click', () => {
    modal.classList.remove('hidden');
  });
}

if (btnClose) {
  btnClose.addEventListener('click', () => {
    modal.classList.add('hidden');
  });
}

if (btnSave) {
  btnSave.addEventListener('click', () => {
    const url = apiInput.value.trim();
    if (url) {
      localStorage.setItem('vatc_api_url', url);
      modal.classList.add('hidden');
      loadGallery(url);
    } else {
      alert('Sila masukkan URL Google Apps Script yang sah.');
    }
  });
}

if (btnRefresh) {
  btnRefresh.addEventListener('click', () => {
    const url = localStorage.getItem('vatc_api_url');
    if (url) {
      loadGallery(url);
    } else {
      modal.classList.remove('hidden');
    }
  });
}
async function loadGallery(url) {
  statusDiv.textContent = 'Memuat turun senarai ride & media...';
  galleryContainer.innerHTML = '';

  try {
    const res = await fetch(url);
    const rides = await res.json();

    if (!rides || rides.length === 0) {
      statusDiv.textContent = 'Tiada folder ride dijumpai.';
      return;
    }

    statusDiv.textContent = '';

    rides.forEach((ride) => {
      // Cipta Seksyen Ride
      const rideSection = document.createElement('div');
      rideSection.className = 'ride-card';

      let html = `<h2 class="ride-title">📍 ${ride.rideName}</h2>`;

      // Paparan Gambar
      if (ride.pictures && ride.pictures.length > 0) {
        html += `<h3>🖼️ Picture (${ride.pictures.length})</h3>`;
        html += `<div class="media-grid">`;
        ride.pictures.forEach((pic) => {
          html += `
            <div class="media-item">
              <img src="${pic.url}" alt="${pic.name}" loading="lazy" />
              <a href="${pic.downloadUrl}" target="_blank">Muat Turun</a>
            </div>
          `;
        });
        html += `</div>`;
      } else {
        html += `<p class="no-media">Tiada gambar dalam folder Picture.</p>`;
      }

      // Paparan Video
      if (ride.videos && ride.videos.length > 0) {
        html += `<h3>🎥 Video (${ride.videos.length})</h3>`;
        html += `<div class="video-list">`;
        ride.videos.forEach((vid) => {
          html += `
            <div class="video-item">
              <span>📹 ${vid.name}</span>
              <a href="${vid.url}" target="_blank" class="btn-play">Tonton / Buka Video</a>
            </div>
          `;
        });
        html += `</div>`;
      } else {
        html += `<p class="no-media">Tiada video dalam folder Video.</p>`;
      }

      rideSection.innerHTML = html;
      galleryContainer.appendChild(rideSection);
    });
  } catch (err) {
    console.error(err);
    statusDiv.textContent = 'Gagal memuat turun data. Pastikan URL Web App adalah betul dan diset kepada "Anyone".';
  }
}