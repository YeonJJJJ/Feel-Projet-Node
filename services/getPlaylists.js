const db = require("./db");

async function getUserPlaylists(userId, moodId) {

  const rows = await db.query(
    `SELECT playlists.id, playlists.name, moods.name AS mood_name
     FROM playlists
     JOIN moods ON playlists.mood_id = moods.id
     WHERE playlists.user_id = ?
     AND playlists.mood_id = ?
     ORDER BY playlists.created_at DESC
     LIMIT 5`,
    [userId, moodId]
  );

  return { data: rows };
}

module.exports = { getUserPlaylists };