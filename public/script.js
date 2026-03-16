const chipsContainer = document.querySelector(".chips");

// ─────────────────────────────────────────────
// Chargement des moods depuis la DB
// ─────────────────────────────────────────────
fetch("http://localhost:3000/getMoods")
  .then(res => res.json())
  .then(json => {

    // On vide les boutons statiques du HTML
    chipsContainer.innerHTML = "";

    json.data.slice(0, 13).forEach(mood => {
      const btn = document.createElement("button");
      btn.textContent = mood.name;
      btn.addEventListener("click", () => generatePlaylists(mood.id, mood.name));
      chipsContainer.appendChild(btn);
    });

  })
  .catch(err => console.error("Erreur chargement moods :", err));

// ─────────────────────────────────────────────
// Génération des playlists au clic sur un mood
// ─────────────────────────────────────────────
async function generatePlaylists(moodId, moodName) {

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;

  // Feedback visuel pendant la génération
  chipsContainer.querySelectorAll("button").forEach(btn => {
    btn.disabled = true;
  });

  try {

    const response = await fetch("http://localhost:3000/playlists/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, moodId })
    });

    const data = await response.json();

    // Stockage du mood et des playlists générées avant redirection
    localStorage.setItem("selectedMoodId", moodId);
    localStorage.setItem("selectedMoodName", moodName);
    localStorage.setItem("generatedPlaylists", JSON.stringify(data.playlists));

    window.location.href = "/playlist";

  } catch (error) {
    console.error("Erreur génération playlist :", error);
    chipsContainer.querySelectorAll("button").forEach(btn => {
      btn.disabled = false;
    });
  }

}