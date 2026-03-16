/*const db = require("./db");

async function generatePlaylist(userId, moodId) {

  const result = await db.query(
    `INSERT INTO playlists (user_id, name, mood_id)
     VALUES (?, ?, ?)`,
    [
      "Generated Playlist",
      "Playlist based on mood",
      userId,
      moodId
    ]
  );

  return {
    success: true,
    playlistId: result.insertId
  };

}

module.exports = {
  generatePlaylist
};*/

const axios = require("axios");
const config = require("../config");
const db = require("../db");

// ─────────────────────────────────────────────
// Mapping mood → keywords Spotify
// ─────────────────────────────────────────────
const MOOD_KEYWORDS = {
  Happy:        ["happy hits", "feel good", "good vibes", "joyful", "cheerful pop"],
  Sad:          ["sad songs", "heartbreak", "emotional ballad", "crying playlist", "melancholic"],
  Energetic:    ["energy boost", "hype music", "high energy", "adrenaline", "power anthem"],
  Nostalgic:    ["nostalgic", "throwback hits", "90s classics", "old school", "retro vibes"],
  Party:        ["party hits", "dance party", "club bangers", "night out", "celebration"],
  Chill:        ["chill vibes", "lofi chill", "relax music", "easy listening", "mellow"],
  Romantic:     ["romantic songs", "love songs", "slow dance", "date night", "soulful romance"],
  Focus:        ["focus music", "study beats", "deep focus", "concentration", "lofi study"],
  Motivational: ["motivational", "pump up", "rise up", "never give up", "success anthem"],
  Melancholy:   ["melancholy", "soft sad", "introspective", "lonely vibes", "quiet storm"],
  Adventure:    ["epic adventure", "exploration music", "cinematic journey", "road trip", "wanderlust"],
  Sleepy:       ["sleep music", "calm lullaby", "sleeping sounds", "night calm", "bedtime"],
  Groovy:       ["groovy", "funky beats", "soul funk", "disco groove", "rhythm and bass"],
  Workout:      ["workout", "gym motivation", "training music", "beast mode", "cardio beats"],
};

// ─────────────────────────────────────────────
// Obtenir un token Spotify (Client Credentials)
// ─────────────────────────────────────────────
async function getSpotifyToken() {
  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    "grant_type=client_credentials",
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      auth: {
        username: config.spotify.clientId,
        password: config.spotify.clientSecret,
      },
    }
  );
  return response.data.access_token;
}

// ─────────────────────────────────────────────
// Chercher 30 tracks Spotify pour un keyword
// ─────────────────────────────────────────────
async function searchTracks(token, keyword) {
  const response = await axios.get("https://api.spotify.com/v1/search", {
    headers: { Authorization: `Bearer ${token}` },
    params: {
      q: keyword,
      type: "track",
      limit: 30,
    },
  });
  return response.data.tracks.items;
}

// ─────────────────────────────────────────────
// Sauvegarder une track en DB si elle n'existe pas
// Retourne l'id interne de la track
// ─────────────────────────────────────────────
async function saveTrack(track) {
  const existing = await db.query(
    "SELECT id FROM tracks WHERE spotify_id = ?",
    [track.id]
  );

  if (existing.length > 0) {
    return existing[0].id;
  }

  const result = await db.query(
    "INSERT INTO tracks (spotify_id, title, artist, preview_url) VALUES (?, ?, ?, ?)",
    [
      track.id,
      track.name,
      track.artists.map((a) => a.name).join(", "),
      track.preview_url || null,
    ]
  );
  return result.insertId;
}

// ─────────────────────────────────────────────
// Lier une track à un mood dans mood_tracks
// ─────────────────────────────────────────────
async function linkTrackToMood(moodId, trackId) {
  await db.query(
    "INSERT IGNORE INTO mood_tracks (mood_id, track_id) VALUES (?, ?)",
    [moodId, trackId]
  );
}

// ─────────────────────────────────────────────
// Créer une playlist en DB et y associer des tracks
// ─────────────────────────────────────────────
async function createPlaylist(userId, moodId, moodName, tracks, index) {
  const playlistName = `${moodName} Playlist #${index + 1}`;

  const result = await db.query(
    "INSERT INTO playlists (user_id, mood_id, name) VALUES (?, ?, ?)",
    [userId, moodId, playlistName]
  );
  const playlistId = result.insertId;

  for (const track of tracks) {
    const trackId = await saveTrack(track);
    await linkTrackToMood(moodId, trackId);

    await db.query(
      "INSERT IGNORE INTO playlists_tracks (playlist_id, track_id) VALUES (?, ?)",
      [playlistId, trackId]
    );
  }

  return {
    id: playlistId,
    name: playlistName,
    tracks: tracks.map((t) => ({
      spotify_id: t.id,
      title: t.name,
      artist: t.artists.map((a) => a.name).join(", "),
      preview_url: t.preview_url || null,
    })),
  };
}

// ─────────────────────────────────────────────
// Fonction principale : génère 5 playlists
// ─────────────────────────────────────────────
async function generatePlaylist(userId, moodId) {

  // 1. Récupérer le mood en DB
  const moods = await db.query("SELECT * FROM moods WHERE id = ?", [moodId]);
  if (moods.length === 0) throw new Error(`Mood introuvable : id ${moodId}`);
  const mood = moods[0];

  // 2. Récupérer les keywords pour ce mood
  const keywords = MOOD_KEYWORDS[mood.name];
  if (!keywords) throw new Error(`Aucun keyword défini pour le mood : ${mood.name}`);

  // 3. Obtenir un token Spotify
  const token = await getSpotifyToken();

  // 4. Générer 5 playlists avec 5 keywords différents
  const playlists = [];

  for (let i = 0; i < 5; i++) {
    const keyword = keywords[i % keywords.length];
    const spotifyTracks = await searchTracks(token, keyword);

    if (!spotifyTracks || spotifyTracks.length === 0) {
      console.warn(`Aucune track trouvée pour le keyword : ${keyword}`);
      continue;
    }

    const playlist = await createPlaylist(userId, moodId, mood.name, spotifyTracks, i);
    playlists.push(playlist);
  }

  return {
    mood: mood.name,
    playlists,
  };
}

module.exports = {
  generatePlaylist,
};