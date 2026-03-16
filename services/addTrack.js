const db = require("./db");
const spotify = require("./spotify");

async function addTrack(trackName) {

  const track = await spotify.getTrack(trackName);

  if (!track) {
    return {
      success: false,
      message: "Track not found"
    };
  }

  const sql = `
    INSERT INTO tracks (spotify_id, title, artist, preview_url)
    VALUES (?, ?, ?, ?)
  `;

  const params = [
    track?.id || null,
    track?.name || null,
    track?.artists?.[0]?.name || null,
    track?.preview_url || null
  ];

  const result = await db.query(sql, params);

  return {
    success: true,
    trackId: result.insertId,
    track: {
      name: track.name,
      artist: track.artists[0].name
    }
  };
}

module.exports = {
  addTrack
};