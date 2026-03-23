// Defined images for each playlist name to ensure consistency and avoid relying on random picsum images.
const PLAYLIST_IMAGES = {
  // Happy
  "Golden Hour":          "https://picsum.photos/seed/golden-hour/300/300",
  "Dancing In The Rain":  "https://picsum.photos/seed/dancing-rain/300/300",
  "Sunday Morning":       "https://picsum.photos/seed/sunday-morning/300/300",
  "Vitamin D":            "https://picsum.photos/seed/vitamin-d/300/300",
  "Feels Like Summer":    "https://picsum.photos/seed/feels-summer/300/300",
  "Bright Side":          "https://picsum.photos/seed/bright-side/300/300",
  "Smile File":           "https://picsum.photos/seed/smile-file/300/300",
  "Good News Only":       "https://picsum.photos/seed/good-news/300/300",
  "Confetti":             "https://picsum.photos/seed/confetti-party/300/300",
  "Peak Happiness":       "https://picsum.photos/seed/peak-happy/300/300",
  // Sad
  "Empty Rooms":          "https://picsum.photos/seed/empty-rooms/300/300",
  "3AM Thoughts":         "https://picsum.photos/seed/3am-thoughts/300/300",
  "Glass Half Empty":     "https://picsum.photos/seed/glass-half/300/300",
  "After The Storm":      "https://picsum.photos/seed/after-storm/300/300",
  "Quiet Tears":          "https://picsum.photos/seed/quiet-tears/300/300",
  "Blue Hour":            "https://picsum.photos/seed/blue-hour/300/300",
  "Unread Messages":      "https://picsum.photos/seed/unread-msg/300/300",
  "Rain On Glass":        "https://picsum.photos/seed/rain-glass/300/300",
  "Hollow":               "https://picsum.photos/seed/hollow-room/300/300",
  "Overcast":             "https://picsum.photos/seed/overcast-sky/300/300",
  // Energetic
  "Full Send":            "https://picsum.photos/seed/full-send/300/300",
  "Overdrive":            "https://picsum.photos/seed/overdrive/300/300",
  "No Sleep Tonight":     "https://picsum.photos/seed/no-sleep/300/300",
  "Adrenaline Rush":      "https://picsum.photos/seed/adrenaline/300/300",
  "Chaos Theory":         "https://picsum.photos/seed/chaos-theory/300/300",
  "Red Line":             "https://picsum.photos/seed/red-line/300/300",
  "Static":               "https://picsum.photos/seed/static-noise/300/300",
  "Ignition":             "https://picsum.photos/seed/ignition-fire/300/300",
  "Wired":                "https://picsum.photos/seed/wired-up/300/300",
  "Maximum Output":       "https://picsum.photos/seed/max-output/300/300",
  // Nostalgic
  "Faded Polaroids":      "https://picsum.photos/seed/faded-polaroids/300/300",
  "My First MP3s":        "https://picsum.photos/seed/first-mp3/300/300",
  "Burned CDs":           "https://picsum.photos/seed/burned-cds/300/300",
  "Summer of 99":         "https://picsum.photos/seed/summer-99/300/300",
  "Analog Memories":      "https://picsum.photos/seed/analog-mem/300/300",
  "Old Bookmarks":        "https://picsum.photos/seed/old-bookmarks/300/300",
  "Rewind":               "https://picsum.photos/seed/rewind-tape/300/300",
  "Disposable Camera":    "https://picsum.photos/seed/disposable-cam/300/300",
  "Lost Frequencies":     "https://picsum.photos/seed/lost-freq/300/300",
  "Childhood Bedroom":    "https://picsum.photos/seed/childhood-room/300/300",
  // Party
  "Pre-Game Ritual":      "https://picsum.photos/seed/pregame/300/300",
  "Night Bus Home":       "https://picsum.photos/seed/night-bus/300/300",
  "3AM Banger":           "https://picsum.photos/seed/3am-banger/300/300",
  "Main Character":       "https://picsum.photos/seed/main-char/300/300",
  "Lights Out":           "https://picsum.photos/seed/lights-out/300/300",
  "Open Bar":             "https://picsum.photos/seed/open-bar/300/300",
  "Dance Floor Physics":  "https://picsum.photos/seed/dancefloor/300/300",
  "Last Round":           "https://picsum.photos/seed/last-round/300/300",
  "Afterglow":            "https://picsum.photos/seed/afterglow/300/300",
  "Headliner":            "https://picsum.photos/seed/headliner/300/300",
  // Chill
  "Slow Morning":         "https://picsum.photos/seed/slow-morning/300/300",
  "Café Window Seat":     "https://picsum.photos/seed/cafe-window/300/300",
  "Soft Landing":         "https://picsum.photos/seed/soft-landing/300/300",
  "Day Dreamer":          "https://picsum.photos/seed/day-dreamer/300/300",
  "Half Awake":           "https://picsum.photos/seed/half-awake/300/300",
  "Houseplant Hours":     "https://picsum.photos/seed/houseplant/300/300",
  "Still Water":          "https://picsum.photos/seed/still-water/300/300",
  "Sunday Ritual":        "https://picsum.photos/seed/sunday-ritual/300/300",
  "Fade In":              "https://picsum.photos/seed/fade-in/300/300",
  "Low Gravity":          "https://picsum.photos/seed/low-gravity/300/300",
  // Romantic
  "Candlelight":          "https://picsum.photos/seed/candlelight/300/300",
  "First Dance":          "https://picsum.photos/seed/first-dance/300/300",
  "Written In The Stars": "https://picsum.photos/seed/written-stars/300/300",
  "Velvet Curtains":      "https://picsum.photos/seed/velvet-curtains/300/300",
  "Late Night Drive":     "https://picsum.photos/seed/late-drive/300/300",
  "Last Song":            "https://picsum.photos/seed/last-song/300/300",
  "Slow Burn":            "https://picsum.photos/seed/slow-burn/300/300",
  "Close Your Eyes":      "https://picsum.photos/seed/close-eyes/300/300",
  "Love Letter":          "https://picsum.photos/seed/love-letter/300/300",
  "Dusk":                 "https://picsum.photos/seed/dusk-light/300/300",
  // Focus
  "Deep Work":            "https://picsum.photos/seed/deep-work/300/300",
  "Flow State":           "https://picsum.photos/seed/flow-state/300/300",
  "Brain Fuel":           "https://picsum.photos/seed/brain-fuel/300/300",
  "The Zone":             "https://picsum.photos/seed/the-zone/300/300",
  "Locked In":            "https://picsum.photos/seed/locked-in/300/300",
  "Signal / Noise":       "https://picsum.photos/seed/signal-noise/300/300",
  "Render Farm":          "https://picsum.photos/seed/render-farm/300/300",
  "White Room":           "https://picsum.photos/seed/white-room/300/300",
  "Tunnel Vision":        "https://picsum.photos/seed/tunnel-vision/300/300",
  "Loading...":           "https://picsum.photos/seed/loading-screen/300/300",
  // Motivational
  "Rise & Grind":         "https://picsum.photos/seed/rise-grind/300/300",
  "No Excuses":           "https://picsum.photos/seed/no-excuses/300/300",
  "Comeback Kid":         "https://picsum.photos/seed/comeback-kid/300/300",
  "Prove Them Wrong":     "https://picsum.photos/seed/prove-wrong/300/300",
  "One More Rep":         "https://picsum.photos/seed/one-more-rep/300/300",
  "Underdog":             "https://picsum.photos/seed/underdog/300/300",
  "Level Up":             "https://picsum.photos/seed/level-up/300/300",
  "Built Different":      "https://picsum.photos/seed/built-diff/300/300",
  "Relentless":           "https://picsum.photos/seed/relentless/300/300",
  "Zero To One":          "https://picsum.photos/seed/zero-one/300/300",
  // Melancholy
  "Soft Echoes":          "https://picsum.photos/seed/soft-echoes/300/300",
  "Grey Skies":           "https://picsum.photos/seed/grey-skies/300/300",
  "The Long Way Home":    "https://picsum.photos/seed/long-way/300/300",
  "Bittersweet":          "https://picsum.photos/seed/bittersweet/300/300",
  "Fog":                  "https://picsum.photos/seed/fog-morning/300/300",
  "Off Season":           "https://picsum.photos/seed/off-season/300/300",
  "Understated":          "https://picsum.photos/seed/understated/300/300",
  "Washed Out":           "https://picsum.photos/seed/washed-out/300/300",
  "Slow Dissolve":        "https://picsum.photos/seed/slow-dissolve/300/300",
  // Sleepy
  "Drift Away":           "https://picsum.photos/seed/drift-away/300/300",
  "Stargazing":           "https://picsum.photos/seed/stargazing/300/300",
  "Counting Clouds":      "https://picsum.photos/seed/counting-clouds/300/300",
  "Pillow Talk":          "https://picsum.photos/seed/pillow-talk/300/300",
  "Last Light":           "https://picsum.photos/seed/last-light/300/300",
  "Slowdown":             "https://picsum.photos/seed/slowdown/300/300",
  "Dissolve":             "https://picsum.photos/seed/dissolve/300/300",
  "Night Mode":           "https://picsum.photos/seed/night-mode/300/300",
  "Half Dreaming":        "https://picsum.photos/seed/half-dream/300/300",
  "Goodnight":            "https://picsum.photos/seed/goodnight/300/300",
};

// Generating playlist names propositions based on the mood
const MOOD_NAMES = {
  Happy:        ["Golden Hour", "Dancing In The Rain", "Sunday Morning", "Vitamin", "Feels Like Summer", "Bright Side", "Smile Files", "Good News Only", "Confetti", "Peak Happiness"],
  Sad:          ["Empty Rooms", "3AM Thoughts", "Glass Half Empty", "After The Storm", "Quiet Tears", "Blue Hour", "Unread Messages", "Rain On Glass", "Hollow", "Overcast"],
  Energetic:    ["Full Send", "Overdrive", "No Sleep Tonight", "Adrenaline Rush", "Chaos Theory", "Red Line", "Static", "Ignition", "Wired", "Maximum Output"],
  Nostalgic:    ["Faded Polaroids", "My First MP3s", "Burned CDs", "Summer of 99", "Analog Memories", "Old Bookmarks", "Rewind", "Disposable Camera", "Lost Frequencies", "Childhood Bedroom"],
  Party:        ["Pre-Game Ritual", "Night Bus Home", "3AM Banger", "Main Character", "Lights Out", "Open Bar", "Dance Floor Physics", "Last Round", "Afterglow", "Headliner"],
  Chill:        ["Slow Morning", "Café Window Seat", "Soft Landing", "Day Dreamer", "Half Awake", "Houseplant Hours", "Still Water", "Sunday Ritual", "Fade In", "Low Gravity"],
  Romantic:     ["Candlelight", "First Dance", "Written In The Stars", "Velvet Curtains", "Late Night Drive", "Last Song", "Slow Burn", "Close Your Eyes", "Love Letter", "Dusk"],
  Focus:        ["Deep Work", "Flow State", "Brain Fuel", "The Zone", "Locked In", "Signal / Noise", "Render Farm", "White Room", "Tunnel Vision", "Loading..."],
  Motivational: ["Rise & Grind", "No Excuses", "Comeback Kid", "Prove Them Wrong", "One More Rep", "Underdog", "Level Up", "Built Different", "Relentless", "Zero To One"],
  Melancholy:   ["Soft Echoes", "Grey Skies", "The Long Way Home", "Bittersweet", "Hollow", "Fog", "Off Season", "Understated", "Washed Out", "Slow Dissolve"],
  Adventure:    ["Into The Unknown", "Open Road", "Horizon Chaser", "Uncharted", "Wanderlust", "Trailblazer", "Last Known Position", "First Light", "Elevation", "Edge of the Map"],
  Sleepy:       ["Drift Away", "Stargazing", "Counting Clouds", "Pillow Talk", "Last Light", "Slowdown", "Dissolve", "Night Mode", "Half Dreaming", "Goodnight"],
  Groovy:       ["Silk & Bass", "Head Nodder", "Velvet Underground", "Pocket Rocket", "The Good Stuff", "Butter", "Soulful Sunday", "Low & Slow", "In The Pocket", "Wax & Vinyl"],
  Workout:      ["Beast Mode", "No Pain No Gain", "Iron Will", "Sweat It Out", "Last Set", "PR Day", "Grind Season", "Tempo", "Raw", "Max Effort"],
};

// Generating playlist descriptions propositions based on the mood
const MOOD_DESCRIPTIONS = {
  Happy:        ["Warm tones and feel-good beats.", "When joy hits harder than the weather.", "Slow starts and good vibes only.", "Pure sunshine, no prescription needed.", "Windows down, volume up.", "Every track a reminder that things are good.", "The playlist you come back to when you need a lift.", "No sad songs allowed in here.", "Celebrate nothing. Celebrate everything.", "This is what joy sounds like."],
  Sad:          ["For when the silence gets too loud.", "The songs that understand you tonight.", "Honest music for honest feelings.", "You're allowed to feel this.", "Soft songs for heavy hearts.", "When the day ends and the ache begins.", "For everything left unsaid.", "Melancholy never sounded so beautiful.", "Some feelings need the right soundtrack.", "Grey days deserve grey music."],
  Energetic:    ["No half measures. All gas.", "Your nervous system is ready.", "Sleep is for the weekend.", "Heart rate: elevated.", "Controlled destruction, beautifully loud.", "Push past the limit.", "Pure unfiltered energy.", "The moment before everything explodes.", "Too much caffeine, perfect soundtrack.", "Everything at full volume."],
  Nostalgic:    ["Messy youth and loud nights you still think about.", "The songs you illegally downloaded at 13.", "Made with love and a Sharpie label.", "Before smartphones, just pure memory.", "Warm, slightly distorted, perfectly imperfect.", "Pages you dog-eared and never went back to.", "The version of you that existed before.", "You only had 24 shots. Make them count.", "Radio stations that no longer exist.", "Posters on the wall. Music through the floor."],
  Party:        ["The sacred hour before the night begins.", "Still dancing in your seat.", "The floor is still packed and no one cares.", "Walk in like the spotlight follows you.", "When the DJ drops everything.", "Free drinks and zero inhibitions.", "Bodies in motion tend to stay in motion.", "One more, then we really go.", "The perfect end to the perfect night.", "You're the act everyone came to see."],
  Chill:        ["No rush. The world can wait.", "Watch the street. Sip slowly.", "Coming down from everything, gently.", "Gentle tracks for when your mind wanders.", "Somewhere between sleep and the day.", "Just existing. Quietly thriving.", "Calm on the surface. Calm underneath.", "The playlist that makes time slow down.", "Ease into it. No alarm required.", "Everything feels a little lighter here."],
  Romantic:     ["Flickering light and slow songs.", "The song you'll remember forever.", "Some things were always meant to be.", "Soft light, slower tempo, closer.", "Nowhere to be. Just the two of you.", "Neither of you want it to end.", "The kind of love that builds quietly.", "Just listen. Just feel.", "Every word chosen carefully.", "The golden hour you share together."],
  Focus:        ["Distraction is not invited here.", "When hours feel like minutes.", "Feed your focus.", "You're in it. Stay there.", "Phone face down. Headphones on.", "Cut out everything that doesn't matter.", "Let your brain do its best work.", "Clean space, clean mind, clear output.", "One task. One playlist. One result.", "Processing. Please do not disturb."],
  Motivational: ["The alarm went off. Now it's time.", "Every reason you had is now invalid.", "They counted you out. Big mistake.", "Let the results do the talking.", "You always had one more in you.", "No one believed in you. You did.", "The version of you that didn't quit.", "You weren't made to give up.", "Tired is not the same as done.", "Every great thing started like this."],
  Melancholy:   ["Tracks that quietly stay with you.", "Not sad exactly. Just somewhere between.", "You took the scenic route on purpose.", "Good things that ended too soon.", "The feeling you can't quite name.", "Everything is slightly muffled today.", "When the world moves on and you haven't.", "Quiet music for quiet feelings.", "Faded colours, faded sounds.", "Letting go, note by note."],
  Adventure:    ["No map. No plan. Perfect.", "Miles ahead. Nothing behind.", "The destination is not the point.", "Where the trail runs out, you begin.", "The itch you can only scratch by leaving.", "Someone had to go first.", "Somewhere out there, living it.", "Before anyone else is awake.", "Higher ground. Clearer view.", "Here be dragons. Go anyway."],
  Sleepy:       ["Let the music carry you under.", "Eyes heavy. Sky full.", "Soft enough to sleep through.", "The last sounds before silence.", "The day is done. Rest now.", "Your body already knows what it needs.", "Everything softens at the edges.", "Screen off. Mind off. Music on.", "Between here and somewhere softer.", "The last playlist you'll need tonight."],
  Groovy:       ["Smooth enough to slide on.", "You won't even notice you're moving.", "Rich, warm, and deeply satisfying.", "Tight groove. Big impact.", "No filler. Pure feel.", "Everything just glides.", "The perfect groove for doing nothing.", "The best things don't rush.", "Right in the sweet spot.", "The kind of music you can feel."],
  Workout:      ["You showed up. Now perform.", "The burn means it's working.", "Mind over everything.", "Every drop earned.", "The hardest one is always the last.", "Today you break your own record.", "Not every day is easy. Show up anyway.", "Match the music. Match the pace.", "Unfiltered. Unpolished. Unstoppable.", "Leave nothing in the tank."],
};

// Generating colors for the playlist cards based on the mood
const MOOD_COLORS = {
  Happy:        ["#c8860a", "#d4720f", "#b87d10", "#c9900c", "#bf7a0e"],
  Sad:          ["#2d4a7a", "#1e3a6e", "#2a4575", "#253f72", "#1f3d70"],
  Energetic:    ["#b81c1c", "#c02020", "#a81818", "#c41e1e", "#b01a1a"],
  Nostalgic:    ["#7a5230", "#6e4828", "#7c562e", "#6a4626", "#724e2c"],
  Party:        ["#6a2a9e", "#7030a0", "#5e2490", "#6c2ca0", "#642898"],
  Chill:        ["#1e6e44", "#186040", "#1c6842", "#1a6442", "#166040"],
  Romantic:     ["#a02050", "#982048", "#a8224e", "#9c1e4c", "#a02050"],
  Focus:        ["#2a3a7a", "#223070", "#283875", "#203570", "#263a78"],
  Motivational: ["#b86010", "#c0680e", "#b05c10", "#bc640c", "#b05e10"],
  Melancholy:   ["#4a3870", "#402e68", "#4c3a72", "#3e2e66", "#463570"],
  Adventure:    ["#1a6e2a", "#186428", "#1c6e2c", "#166026", "#1a682a"],
  Sleepy:       ["#2a3a6e", "#223068", "#283870", "#203265", "#26386c"],
  Groovy:       ["#a07010", "#986808", "#a87210", "#9e6c0c", "#a06e10"],
  Workout:      ["#b03a1a", "#a83018", "#b84018", "#ac341a", "#b03818"],
};

// Generating the datas of the playlists
function getDisplayData(moodName, count) {
  const storageKey = `displayData_${moodName}`;
  const stored = localStorage.getItem(storageKey);
  if (stored) return JSON.parse(stored);
  const names  = MOOD_NAMES[moodName] || [];
  const descs  = MOOD_DESCRIPTIONS[moodName] || [];
  const colors = MOOD_COLORS[moodName] || ["#333", "#444", "#555", "#666", "#777"];
  const shuffledNames = [...names].sort(() => Math.random() - 0.5).slice(0, count);
  const shuffledDescs = [...descs].sort(() => Math.random() - 0.5).slice(0, count);
  const data = shuffledNames.map((name, i) => ({
    name,
    description: shuffledDescs[i] || "",
    color: colors[i % colors.length],
    image: PLAYLIST_IMAGES[name] || `https://picsum.photos/seed/${encodeURIComponent(name)}/300/300`,
  }));
  localStorage.setItem(storageKey, JSON.stringify(data));
  return data;
}

function storePlaylistData(playlistId, imgSrc, name, description) {
  const images = JSON.parse(localStorage.getItem("playlistImages") || "{}");
  images[playlistId] = imgSrc;
  localStorage.setItem("playlistImages", JSON.stringify(images));
  const names = JSON.parse(localStorage.getItem("playlistNames") || "{}");
  names[playlistId] = { name, description };
  localStorage.setItem("playlistNames", JSON.stringify(names));
}

  const moodNameSpan   = document.querySelector(".mood-name");
  const cardsContainer = document.getElementById("cards");
  const loader         = document.getElementById("loader");
  const regenBtn       = document.querySelector(".regen");
  const homeBtn        = document.querySelector(".home-btn");
  const accountBtn      = document.getElementById("account-btn");
  const accountDropdown = document.getElementById("account-dropdown");
  const accountAvatar   = document.getElementById("account-avatar");
  const accountName     = document.getElementById("account-name");
  const logoutItem      = document.getElementById("logout-btn");

  const moodId   = localStorage.getItem("selectedMoodId");
  const moodName = localStorage.getItem("selectedMoodName");
  const user     = JSON.parse(localStorage.getItem("user"));
  const userId   = user.id;

  moodNameSpan.innerText = `"${moodName}"`;

  if (homeBtn) { homeBtn.addEventListener("click", () => { window.location.href = "/home"; }); }

  // Account dropdown
  if (user) { accountAvatar.innerText = user.username.charAt(0).toUpperCase(); accountName.innerText = user.username; }
  accountBtn.addEventListener("click", (e) => { e.stopPropagation(); accountDropdown.classList.toggle("open"); });
  document.addEventListener("click", () => { accountDropdown.classList.remove("open"); });
  logoutItem.addEventListener("click", () => { localStorage.clear(); window.location.href = "/login"; });

  function showLoader() { loader.style.display = "flex"; cardsContainer.style.display = "none"; }
  function hideLoader() { loader.style.display = "none"; cardsContainer.style.display = "flex"; }

  async function renderPlaylists(playlists) {
    cardsContainer.innerHTML = "";
    if (!playlists || playlists.length === 0) { cardsContainer.innerHTML = "<p>No playlists available.</p>"; hideLoader(); return; }
    const displayData = getDisplayData(moodName, playlists.length);
    for (let index = 0; index < playlists.length; index++) {
      const playlist = playlists[index];
      const d = displayData[index];
      const imgSrc = d.image;
      storePlaylistData(playlist.id, imgSrc, d.name, d.description);
      const card = document.createElement("div");
      card.className = "card";
      card.style.background = d.color;
      card.innerHTML = `<img src="${imgSrc}" alt="${d.name}"><h3>${d.name}</h3><p>${d.description}</p>`;
      card.addEventListener("click", () => goToTracks(playlist.id, index));
      cardsContainer.appendChild(card);
    }
    hideLoader();
  }

  function loadPlaylists() {
    showLoader();
    fetch(`http://localhost:3000/playlists/user?userId=${userId}&moodId=${moodId}`)
      .then(res => res.json())
      .then(json => renderPlaylists(json.data))
      .catch(err => { console.error("Erreur chargement playlists :", err); hideLoader(); });
  }

  function goToTracks(playlistId, index) {
    localStorage.setItem("selectedPlaylistId", playlistId);
    localStorage.setItem("selectedPlaylistIndex", index);
    window.location.href = "/playlist2";
  }

  regenBtn.addEventListener("click", async () => {
    regenBtn.textContent = "Generating...";
    regenBtn.style.pointerEvents = "none";
    showLoader();
    localStorage.removeItem(`displayData_${moodName}`);
    try {
      await fetch("http://localhost:3000/playlists/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userId, moodId }) });
      loadPlaylists();
    } catch (error) { console.error("Erreur régénération :", error); hideLoader(); }
    finally { regenBtn.textContent = "Regenerate"; regenBtn.style.pointerEvents = "auto"; }
  });

  loadPlaylists();
