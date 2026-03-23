const user = JSON.parse(localStorage.getItem("user"));
const chipsContainer = document.querySelector(".chips");
const searchInput = document.querySelector(".input-box input");
let availableMoods = [];

// Input suggestions element
const suggestion = document.createElement("div");
suggestion.className = "mood-suggestion";
suggestion.style.cssText = `display: none; margin-top: 10px; font-size: 14px; opacity: 0.8; cursor: pointer; transition: opacity 0.2s;`;
searchInput.closest(".input-box").insertAdjacentElement("afterend", suggestion);

// Get the moods from the database and create buttons
fetch("http://localhost:3000/getMoods")
  .then(res => res.json())
  .then(json => {
    availableMoods = json.data;
    chipsContainer.innerHTML = "";
    availableMoods.forEach(mood => {
      const btn = document.createElement("button");
      btn.textContent = mood.name;
      btn.addEventListener("click", () => generatePlaylists(mood.id, mood.name));
      chipsContainer.appendChild(btn);
    });
  })
  .catch(err => console.error("Erreur chargement moods :", err));

// Keywords for mood suggestion
const MOOD_KEYWORDS = {
  Happy:        ["happy", "joy", "joyful", "good", "great", "excited", "cheerful", "smile", "fun", "positive", "bright"],
  Sad:          ["sad", "unhappy", "cry", "crying", "down", "depressed", "heartbreak", "broken", "lonely", "miss", "hurt"],
  Energetic:    ["energy", "energetic", "hyped", "hype", "active", "alive", "electric", "wild", "intense", "fired up"],
  Nostalgic:    ["nostalgic", "nostalgia", "memories", "memory", "past", "old", "throwback", "vintage", "retro", "remember"],
  Party:        ["party", "celebrate", "celebration", "dance", "dancing", "fun", "night out", "drinks", "friends", "festive"],
  Chill:        ["chill", "relax", "relaxed", "calm", "peaceful", "easy", "slow", "mellow", "laid back", "quiet", "sunday"],
  Romantic:     ["romantic", "romance", "love", "loved", "in love", "date", "tender", "sweet", "intimate", "affection"],
  Focus:        ["focus", "focused", "study", "studying", "work", "working", "concentrate", "productive", "deep", "serious"],
  Motivational: ["motivated", "motivation", "inspire", "inspired", "grind", "hustle", "determined", "strong", "push", "goal"],
  Melancholy:   ["melancholy", "melancholic", "bittersweet", "grey", "reflect", "reflective", "empty", "hollow", "pensive"],
  Sleepy:       ["sleepy", "sleep", "tired", "exhausted", "drowsy", "night", "bed", "rest", "nap", "dreamy", "bedtime"],
};

function findMatchingMood(text) {
  const lower = text.toLowerCase().trim();
  let bestMood = null, bestScore = -1;
  for (const mood of availableMoods) {
    const keywords = MOOD_KEYWORDS[mood.name] || [];
    let score = 0;
    if (lower.includes(mood.name.toLowerCase())) score += 10;
    for (const keyword of keywords) { if (lower.includes(keyword)) score += 1; }
    if (score > bestScore) { bestScore = score; bestMood = mood; }
  }
  return { mood: bestMood, score: bestScore };
}

// Suggestions made in real time as the user types, based on keywords
if (searchInput) {
  searchInput.addEventListener("input", () => {
    const text = searchInput.value.trim();
    if (!text || text.length < 2) { suggestion.style.display = "none"; return; }
    const { mood, score } = findMatchingMood(text);
    if (!mood) return;
    const label = score >= 5
      ? `✦ We think you're feeling <strong>${mood.name}</strong> — press Enter to confirm`
      : `✦ Maybe <strong>${mood.name}</strong>? — press Enter or keep typing`;
    suggestion.innerHTML = label;
    suggestion.style.display = "block";
    suggestion.onclick = () => {
      suggestion.style.display = "none";
      searchInput.value = "";
      generatePlaylists(mood.id, mood.name);
    };
  });

  searchInput.addEventListener("keydown", async (e) => {
    if (e.key !== "Enter") return;
    const text = searchInput.value.trim();
    if (!text) return;
    const { mood } = findMatchingMood(text);
    if (!mood) return;
    suggestion.style.display = "none";
    searchInput.disabled = true;
    searchInput.value = "";
    searchInput.placeholder = `Generating playlists for "${mood.name}"...`;
    await generatePlaylists(mood.id, mood.name);
  });
}

// Playlist generation function
async function generatePlaylists(moodId, moodName) {
  const userId = user.id;
  chipsContainer.querySelectorAll("button").forEach(btn => btn.disabled = true);
  try {
    await fetch("http://localhost:3000/playlists/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, moodId })
    });
    localStorage.setItem("selectedMoodId", moodId);
    localStorage.setItem("selectedMoodName", moodName);
    window.location.href = "/playlist";
  } catch (error) {
    console.error("Erreur génération playlist :", error);
    chipsContainer.querySelectorAll("button").forEach(btn => btn.disabled = false);
    if (searchInput) { searchInput.disabled = false; searchInput.placeholder = "I'm feeling..."; }
  }
}

// Account dropdown
const accountBtn      = document.getElementById("account-btn");
const accountDropdown = document.getElementById("account-dropdown");
const accountAvatar   = document.getElementById("account-avatar");
const accountName     = document.getElementById("account-name");
const logoutItem      = document.getElementById("logout-btn");

if (user) {
  accountAvatar.innerText = user.username.charAt(0).toUpperCase();
  accountName.innerText = user.username;
}

accountBtn.addEventListener("click", (e) => { e.stopPropagation(); accountDropdown.classList.toggle("open"); });
document.addEventListener("click", () => { accountDropdown.classList.remove("open"); });
logoutItem.addEventListener("click", () => { localStorage.clear(); window.location.href = "/login"; });