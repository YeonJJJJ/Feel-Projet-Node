const db = require("./db");

async function getDashboard(userId) {

  const users = await db.query(
    "SELECT id, username, email, created_at FROM users WHERE id = ?",
    [userId]
  );
  if (users.length === 0) throw new Error("User not found");
  const profile = users[0];

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