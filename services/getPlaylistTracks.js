const db = require("./db");

async function getPlaylistTracks(playlistId) {

  const rows = await db.query(
    `SELECT tracks.*
     FROM playlists_tracks
     JOIN tracks ON playlists_tracks.track_id = tracks.id
     WHERE playlists_tracks.playlist_id = ?`,
    [playlistId]
  );

  return {
    data: rows
  };

}

module.exports = {
  getPlaylistTracks
};