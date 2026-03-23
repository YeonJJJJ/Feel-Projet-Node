const axios = require("axios");
const config = require("../config");
const db = require("./db");

// 5 queries per mood to get a good variety of tracks from Spotify
const MOOD_QUERIES = {
  Happy:        ["happy pop funk soul", "feel good dance disco", "cheerful indie pop upbeat", "good vibes rnb summer", "joyful acoustic pop"],
  Sad:          ["sad indie folk acoustic", "heartbreak blues emotional", "melancholic singer-songwriter", "crying playlist emo indie", "soft sad ballad"],
  Energetic:    ["high energy rock punk", "hard rock drum bass metal", "electronic punk adrenaline", "power anthem rock energetic", "hype music intense"],
  Nostalgic:    ["80s synth pop new wave", "classic rock oldies throwback", "90s hits retro nostalgia", "vintage pop rock 80s", "old school classic hits"],
  Party:        ["hip hop edm dance party", "club bangers dance reggaeton", "edm dance pop night out", "party hits disco electronic", "dance music celebration"],
  Chill:        ["lofi ambient jazz chill", "bossa nova jazz acoustic relax", "chillout ambient lofi mellow", "easy listening chill acoustic", "calm indie folk chill"],
  Romantic:     ["rnb soul jazz romantic love", "soul acoustic bossa nova slow", "jazz rnb love songs", "romantic ballad soul acoustic", "slow dance love rnb"],
  Focus:        ["classical ambient piano focus", "lofi post rock study beats", "instrumental ambient concentration", "deep focus piano classical", "study music lofi ambient"],
  Motivational: ["hip hop rock gospel motivational", "pump up rock electronic inspire", "motivational anthem hip hop", "never give up rock gospel", "success hip hop electronic"],
  Melancholy:   ["indie folk acoustic melancholy", "blues ambient indie soft", "folk acoustic introspective", "quiet sad indie ambient", "melancholic singer-songwriter blues"],
  Sleepy:       ["ambient classical sleep calm", "piano acoustic lullaby soft", "new age ambient peaceful night", "sleeping music calm piano", "soft classical ambient relax"],
};

// get Spotify token using Client Credentials Flow
async function getSpotifyToken() {
  try {
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
  } catch (err) {
    console.error("Spotify token error:", err.response?.data);
    throw err;
  }
}

// Searching for tracks on Spotify using the Search API
async function searchTracks(token, query) {
  try {
    const response = await axios.get("https://api.spotify.com/v1/search", {
      headers: { Authorization: `Bearer ${token}` },
      params: { q: query, type: "track", limit: 10 },
    });
    return response.data.tracks.items;
  } catch (err) {
    console.error("Spotify search error:", err.response?.data);
    throw err;
  }
}

// Save the tracks in the database and return their IDs
async function saveTrack(track) {
  const existing = await db.query(
    "SELECT id FROM tracks WHERE spotify_id = ?",
    [track.id]
  );
  if (existing.length > 0) return existing[0].id;

  const result = await db.query(
    "INSERT INTO tracks (spotify_id, title, artist, preview_url) VALUES (?, ?, ?, ?)",
    [track.id, track.name, track.artists.map(a => a.name).join(", "), track.preview_url || null]
  );
  return result.insertId;
}

// Refresh the tracks of an existing playlist (function)
async function refreshPlaylistTracks(playlistId, moodId, tracks) {
  await db.query("DELETE FROM playlists_tracks WHERE playlist_id = ?", [playlistId]);

  for (const track of tracks) {
    const trackId = await saveTrack(track);
    await db.query("INSERT IGNORE INTO mood_tracks (mood_id, track_id) VALUES (?, ?)", [moodId, trackId]);
    await db.query("INSERT IGNORE INTO playlists_tracks (playlist_id, track_id) VALUES (?, ?)", [playlistId, trackId]);
  }
}

// Main function to generate playlists based on mood
async function generatePlaylist(userId, moodId) {

  const moods = await db.query("SELECT * FROM moods WHERE id = ?", [moodId]);
  if (moods.length === 0) throw new Error(`Mood introuvable : id ${moodId}`);
  const mood = moods[0];

  const queries = MOOD_QUERIES[mood.name];
  if (!queries) throw new Error(`Aucune query définie pour le mood : ${mood.name}`);

  const existing = await db.query(
    `SELECT id FROM playlists WHERE user_id = ? AND mood_id = ? ORDER BY id ASC`,
    [userId, moodId]
  );

  const token = await getSpotifyToken();

  // To refresh playlists 
  if (existing.length >= 5) {
    for (let i = 0; i < 5; i++) {
      const spotifyTracks = await searchTracks(token, queries[i]);
      if (!spotifyTracks || spotifyTracks.length === 0) continue;
      await refreshPlaylistTracks(existing[i].id, moodId, spotifyTracks);
    }
    return { mood: mood.name, moodId };
  }

  // If no playlist exists for this mood, we create new ones until we have 5
  for (let i = 0; i < 5; i++) {
    const playlistName = `${mood.name} Playlist #${i + 1}`;
    console.log(`Création "${playlistName}"`);
    const spotifyTracks = await searchTracks(token, queries[i]);
    if (!spotifyTracks || spotifyTracks.length === 0) continue;

    const result = await db.query(
      "INSERT INTO playlists (user_id, mood_id, name) VALUES (?, ?, ?)",
      [userId, moodId, playlistName]
    );
    await refreshPlaylistTracks(result.insertId, moodId, spotifyTracks);
  }

  return { mood: mood.name, moodId };
}

module.exports = { generatePlaylist };