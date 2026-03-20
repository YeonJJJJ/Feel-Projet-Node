const db = require("./db");

async function getDashboard(userId) {

  // 1. Profil utilisateur
  const users = await db.query(
    "SELECT id, username, email, created_at FROM users WHERE id = ?",
    [userId]
  );
  if (users.length === 0) throw new Error("Utilisateur introuvable");
  const profile = users[0];

  // 2. Historique des moods (moods distincts utilisés, du plus récent)
  const moodHistory = await db.query(
    `SELECT DISTINCT moods.id, moods.name, moods.description,
            MAX(playlists.created_at) AS last_used
     FROM playlists
     JOIN moods ON playlists.mood_id = moods.id
     WHERE playlists.user_id = ?
     GROUP BY moods.id, moods.name, moods.description
     ORDER BY last_used DESC`,
    [userId]
  );

  // 3. Playlists générées récemment (10 dernières)
  const recentPlaylists = await db.query(
    `SELECT playlists.id, playlists.name, playlists.created_at,
            moods.name AS mood_name
     FROM playlists
     JOIN moods ON playlists.mood_id = moods.id
     WHERE playlists.user_id = ?
     ORDER BY playlists.created_at DESC
     LIMIT 10`,
    [userId]
  );

  // 4. Playlists en favoris
  const favorites = await db.query(
    `SELECT playlists.id, playlists.name, playlists.created_at,
            moods.name AS mood_name
     FROM favorites
     JOIN playlists ON favorites.playlist_id = playlists.id
     JOIN moods ON playlists.mood_id = moods.id
     WHERE favorites.user_id = ?
     ORDER BY favorites.created_at DESC`,
    [userId]
  );

  return { profile, moodHistory, recentPlaylists, favorites };
}

module.exports = { getDashboard };