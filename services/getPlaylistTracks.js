const db = require("./db");

async function getPlaylistTracks(playlistId) {

  // Infos de la playlist
  const playlists = await db.query(
    `SELECT playlists.id, playlists.name, moods.name AS mood_name
     FROM playlists
     JOIN moods ON playlists.mood_id = moods.id
     WHERE playlists.id = ?`,
    [playlistId]
  );

  if (playlists.length === 0) {
    return { data: null };
  }

  // Tracks de la playlist
  const tracks = await db.query(
    `SELECT tracks.id, tracks.title, tracks.artist, tracks.preview_url
     FROM tracks
     JOIN playlists_tracks ON tracks.id = playlists_tracks.track_id
     WHERE playlists_tracks.playlist_id = ?`,
    [playlistId]
  );

  return {
    data: {
      playlist: playlists[0],
      tracks: tracks
    }
  };

}

module.exports = { getPlaylistTracks };