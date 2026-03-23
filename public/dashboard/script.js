const user = JSON.parse(localStorage.getItem("user"));
if (!user) window.location.href = "/login";
const userId = user.id;

const avatarEl      = document.getElementById("avatar");
const usernameEl    = document.getElementById("profile-username");
const emailEl       = document.getElementById("profile-email");
const sinceEl       = document.getElementById("profile-since");
const moodHistoryEl = document.getElementById("mood-history");
const favoritesEl   = document.getElementById("favorites-grid");
const recentEl      = document.getElementById("recent-grid");
const logoutBtn     = document.querySelector(".btn-logout");
const deleteBtn     = document.getElementById("delete-account");
const deleteModal   = document.getElementById("delete-modal");
const cancelDelete  = document.getElementById("cancel-delete");
const confirmDelete = document.getElementById("confirm-delete");

const playlistImages = JSON.parse(localStorage.getItem("playlistImages") || "{}");
const playlistNames  = JSON.parse(localStorage.getItem("playlistNames") || "{}");

function getPlaylistImage(playlist) {
  return playlistImages[playlist.id] || `https://picsum.photos/seed/${playlist.id}/200/200`;
}

function getPlaylistName(playlist) {
  return playlistNames[playlist.id]?.name || playlist.name;
}

function getPlaylistDesc(playlist) {
  return playlistNames[playlist.id]?.description || "";
}

// Dashboard initialization
fetch(`http://localhost:3000/dashboard/data?userId=${userId}`)
  .then(res => res.json())
  .then(data => {
    const { profile, moodHistory, recentPlaylists, favorites } = data;

    avatarEl.innerText = profile.username.charAt(0).toUpperCase();
    usernameEl.innerText = profile.username;
    emailEl.innerText = profile.email;
    sinceEl.innerText = `Member since ${new Date(profile.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long" })}`;

    if (moodHistory.length === 0) {
      moodHistoryEl.innerHTML = `<p class="empty">No moods explored yet.</p>`;
    } else {
      moodHistory.forEach(mood => {
        const chip = document.createElement("div");
        chip.className = "mood-chip";
        chip.textContent = mood.name;
        chip.addEventListener("click", () => {
          localStorage.setItem("selectedMoodId", mood.id);
          localStorage.setItem("selectedMoodName", mood.name);
          window.location.href = "/playlist";
        });
        moodHistoryEl.appendChild(chip);
      });
    }

    favoritesEl.innerHTML = favorites.length === 0
      ? `<p class="empty">No favorites yet.</p>`
      : "";
    if (favorites.length > 0) renderPlaylistGrid(favoritesEl, favorites, true);

    recentEl.innerHTML = recentPlaylists.length === 0
      ? `<p class="empty">No playlists generated yet.</p>`
      : "";
    if (recentPlaylists.length > 0) renderPlaylistGrid(recentEl, recentPlaylists, false);
  })
  .catch(err => console.error("Erreur chargement dashboard :", err));

// Playlist grid rendering
function renderPlaylistGrid(container, playlists, isFav) {
  container.innerHTML = "";
  playlists.forEach(playlist => {
    const imgSrc      = getPlaylistImage(playlist);
    const displayName = getPlaylistName(playlist);
    const displayDesc = getPlaylistDesc(playlist);
    const card = document.createElement("div");
    card.className = "playlist-card";
    card.innerHTML = `
      ${isFav ? `<div class="fav-badge">♥</div>` : ""}
      <img src="${imgSrc}" alt="${displayName}">
      <div class="playlist-card-info">
        <h4>${displayName}</h4>
        <span>${playlist.mood_name}</span>
        ${displayDesc ? `<p class="card-desc">${displayDesc}</p>` : ""}
      </div>
    `;
    card.addEventListener("click", () => {
      localStorage.setItem("selectedPlaylistId", playlist.id);
      localStorage.setItem("selectedMoodName", playlist.mood_name);
      window.location.href = "/playlist2";
    });
    container.appendChild(card);
  });
}

// Logout
logoutBtn.addEventListener("click", () => { localStorage.clear(); window.location.href = "/login"; });

// Account deletion
deleteBtn.addEventListener("click", () => { deleteModal.classList.add("open"); });
cancelDelete.addEventListener("click", () => { deleteModal.classList.remove("open"); });
confirmDelete.addEventListener("click", async () => {
  try {
    await fetch("http://localhost:3000/users/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId })
    });
    localStorage.clear();
    window.location.href = "/login";
  } catch (err) { console.error("Erreur suppression compte :", err); }
});