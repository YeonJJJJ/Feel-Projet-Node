const db = require("./db");

async function deleteUser(userId) {

  const playlists = await db.query(
    `SELECT id FROM playlists WHERE user_id = ?`,
    [userId]
  );

  for (const playlist of playlists) {
    await db.query(
      `DELETE FROM playlists_tracks WHERE playlist_id = ?`,
      [playlist.id]
    );
  }

  await db.query(
    `DELETE FROM playlists WHERE user_id = ?`,
    [userId]
  );

  await db.query(
    `DELETE FROM users WHERE id = ?`,
    [userId]
  );

  return { message: "Account deleted successfully" };
}

module.exports = { deleteUser };