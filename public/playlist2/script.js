const playlistTitle = document.querySelector(".info h1");
const playlistLabel = document.querySelector(".info .label");
const playlistDesc  = document.querySelector(".info p");
const coverImg      = document.querySelector(".cover");
const tbody         = document.querySelector(".tracklist tbody");
const backBtn       = document.querySelector(".back");
const favBtn        = document.querySelector(".fav-btn");

const playlistId    = localStorage.getItem("selectedPlaylistId");
const playlistIndex = parseInt(localStorage.getItem("selectedPlaylistIndex")) || 0;
const moodName      = localStorage.getItem("selectedMoodName");
const user          = JSON.parse(localStorage.getItem("user"));
const userId        = user.id;

const playlistNames  = JSON.parse(localStorage.getItem("playlistNames") || "{}");
const playlistImages = JSON.parse(localStorage.getItem("playlistImages") || "{}");
const storageKey     = `displayData_${moodName}`;
const displayData    = JSON.parse(localStorage.getItem(storageKey) || "[]");
const displayByIndex = displayData[playlistIndex] || null;

const displayName  = playlistNames[playlistId]?.name  || displayByIndex?.name  || null;
const displayDesc  = playlistNames[playlistId]?.description || displayByIndex?.description || null;
const displayColor = displayByIndex?.color || null;

const imgSrc = playlistImages[playlistId]
  || (displayName ? `https://picsum.photos/seed/${encodeURIComponent(displayName)}-${playlistId}/300/300` : `https://picsum.photos/seed/${playlistId}/300/300`);

coverImg.src = imgSrc;
if (displayColor) {
  document.querySelector(".playlist-header").style.background = `linear-gradient(135deg, ${displayColor}33, transparent)`;
}

if (backBtn) { backBtn.addEventListener("click", () => { window.location.href = "/playlist"; }); }

// Favorite button
function updateFavBtn(isFav) {
  favBtn.dataset.fav = isFav;
  favBtn.innerHTML = isFav ? "♥ In favorites" : "♡ Add to favorites";
  favBtn.style.color = isFav ? "#ff4da6" : "";
  favBtn.style.borderColor = isFav ? "#ff4da6" : "";
}

async function checkFavorite() {
  try {
    const res = await fetch(`http://localhost:3000/favorites/check?userId=${userId}&playlistId=${playlistId}`);
    const data = await res.json();
    updateFavBtn(data.isFavorite);
  } catch (err) { console.error("Erreur vérification favori :", err); }
}

favBtn.addEventListener("click", async () => {
  const isFav = favBtn.dataset.fav === "true";
  try {
    await fetch("http://localhost:3000/favorites", {
      method: isFav ? "DELETE" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, playlistId })
    });
    updateFavBtn(!isFav);
  } catch (err) { console.error("Erreur toggle favori :", err); }
});

// Tracklist loading
fetch(`http://localhost:3000/playlists/tracks?playlistId=${playlistId}`)
  .then(res => res.json())
  .then(json => {
    const { playlist, tracks } = json.data;
    playlistTitle.innerText = displayName || playlist.name;
    playlistLabel.innerText = playlist.mood_name.toUpperCase();
    if (playlistDesc && displayDesc) playlistDesc.innerText = displayDesc;
    if (!tracks || tracks.length === 0) { tbody.innerHTML = `<tr><td colspan="4">Aucune track disponible.</td></tr>`; return; }
    tbody.innerHTML = "";
    tracks.forEach((track, index) => {
      tbody.innerHTML += `
        <tr>
          <td>${index + 1}</td>
          <td><strong>${track.title}</strong><br><span>${track.artist}</span></td>
          <td>${track.artist}</td>
          <td>${track.preview_url ? `<audio controls src="${track.preview_url}"></audio>` : "—"}</td>
        </tr>`;
    });
    checkFavorite();
  })
  .catch(err => console.error("Erreur chargement tracks :", err));

// Account dropdown
const accountBtn      = document.getElementById("account-btn");
const accountDropdown = document.getElementById("account-dropdown");
const accountAvatar   = document.getElementById("account-avatar");
const accountName     = document.getElementById("account-name");
const logoutItem      = document.getElementById("logout-btn");

if (user) { accountAvatar.innerText = user.username.charAt(0).toUpperCase(); accountName.innerText = user.username; }
accountBtn.addEventListener("click", (e) => { e.stopPropagation(); accountDropdown.classList.toggle("open"); });
document.addEventListener("click", () => { accountDropdown.classList.remove("open"); });
logoutItem.addEventListener("click", () => { localStorage.clear(); window.location.href = "/login"; });