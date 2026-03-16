const db = require("./db");

async function getUserPlaylists(userId) {

  const rows = await db.query(
    `SELECT * FROM playlists WHERE user_id = ?`,
    [userId]
  );

  return {
    data: rows
  };

}

module.exports = {
  getUserPlaylists
};