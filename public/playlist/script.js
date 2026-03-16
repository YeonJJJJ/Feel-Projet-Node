const moodNameSpan = document.querySelector(".title span");
const cardsContainer = document.querySelector(".cards");
const regenBtn = document.querySelector(".regen");

const moodId    = localStorage.getItem("selectedMoodId");
const moodName  = localStorage.getItem("selectedMoodName");
const playlists = JSON.parse(localStorage.getItem("generatedPlaylists"));

// ─────────────────────────────────────────────
// Affichage du nom du mood dans le titre
// ─────────────────────────────────────────────
moodNameSpan.innerText = `"${moodName}"`;

// ─────────────────────────────────────────────
// Rendu des cartes
// ─────────────────────────────────────────────
const cardClasses = ["c1", "c2", "c3", "c4", "c5"];

function renderPlaylists(playlists) {

  cardsContainer.innerHTML = "";

  playlists.forEach((playlist, index) => {

    // Image : première track avec une image d'album Spotify
    const firstTrack = playlist.tracks.find(t => t.album_image);
    const imgSrc = firstTrack
      ? firstTrack.album_image
      : `https://picsum.photos/300?${index + 1}`;

    // Description : les 3 premiers artistes uniques
    const artists = [...new Set(
      playlist.tracks.slice(0, 3).map(t => t.artist)
    )].join(", ");

    const colorClass = cardClasses[index] || "c1";

    cardsContainer.innerHTML += `
      <div class="card ${colorClass}" onclick="goToTracks(${playlist.id})">
        <img src="${imgSrc}" alt="${playlist.name}">
        <h3>${playlist.name}</h3>
        <p>${artists}...</p>
      </div>
    `;

  });

}

// ─────────────────────────────────────────────
// Navigation vers la page tracks
// ─────────────────────────────────────────────
function goToTracks(playlistId) {
  localStorage.setItem("selectedPlaylistId", playlistId);
  window.location.href = "/tracks";
}

// ─────────────────────────────────────────────
// Bouton Regenerate
// ─────────────────────────────────────────────
regenBtn.addEventListener("click", async () => {

  const user   = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;

  regenBtn.textContent = "Generating...";
  regenBtn.style.pointerEvents = "none";

  try {

    const response = await fetch("http://localhost:3000/playlists/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, moodId })
    });

    const data = await response.json();

    localStorage.setItem("generatedPlaylists", JSON.stringify(data.playlists));
    renderPlaylists(data.playlists);

  } catch (error) {
    console.error("Erreur régénération :", error);
  } finally {
    regenBtn.textContent = "Regenerate";
    regenBtn.style.pointerEvents = "auto";
  }

});

// ─────────────────────────────────────────────
// Initialisation
// ─────────────────────────────────────────────
if (playlists && playlists.length > 0) {
  renderPlaylists(playlists);
} else {
  cardsContainer.innerHTML = "<p>Aucune playlist disponible.</p>";
}