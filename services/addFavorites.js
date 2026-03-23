const db = require("./db");

async function addFavorite(userId, playlistId) {

  await db.query(
    "INSERT IGNORE INTO favorites (user_id, playlist_id) VALUES (?, ?)",
    [userId, playlistId]
  );

  return { message: "Playlist added to favorites" };
}

async function removeFavorite(userId, playlistId) {

  await db.query(
    "DELETE FROM favorites WHERE user_id = ? AND playlist_id = ?",
    [userId, playlistId]
  );

  return { message: "Playlist removed from favorites" };
}

async function isFavorite(userId, playlistId) {

  const rows = await db.query(
    "SELECT id FROM favorites WHERE user_id = ? AND playlist_id = ?",
    [userId, playlistId]
  );

  return { isFavorite: rows.length > 0 };
}

module.exports = { addFavorite, removeFavorite, isFavorite };