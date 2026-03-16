const db = require("./db");

async function generatePlaylist(data) {

  const { userId, moodId, name } = data;

  const playlistResult = await db.query(
    `INSERT INTO playlists (user_id, mood_id, name)
     VALUES (?, ?, ?)`,
    [userId, moodId, name]
  );

  const playlistId = playlistResult.insertId;

  const tracks = await db.query(
    `SELECT track_id FROM mood_tracks
     WHERE mood_id = ?`,
    [moodId]
  );

  for (const track of tracks) {

    await db.query(
      `INSERT INTO playlists_tracks (playlist_id, track_id)
       VALUES (?, ?)`,
      [playlistId, track.track_id]
    );

  }

  return {
    message: "Playlist created",
    playlistId: playlistId
  };

}

module.exports = {
  generatePlaylist
};