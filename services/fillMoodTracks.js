const db = require("./db");
const spotify = require("./spotifyTracks");

async function fillMoodTracks(moodId) {

  const moodRows = await db.query(
    `SELECT name FROM moods WHERE id = ?`,
    [moodId]
  );

  if (moodRows.length === 0) {
    return { message: "Mood not found" };
  }

  const moodName = moodRows[0].name;

  // 2 appeler Spotify
  const spotifyTracks = await spotify.getTracks(moodName);

  for (const track of spotifyTracks) {

    const spotifyId = track.id;
    const title = track.name;
    const artist = track.artists[0].name;
    const album = track.album.name;

    let trackRows = await db.query(
      `SELECT id FROM tracks WHERE spotify_id = ?`,
      [spotifyId]
    );

    let trackId;

    if (trackRows.length === 0) {

      const insertTrack = await db.query(
        `INSERT INTO tracks (spotify_id, title, artist, album)
         VALUES (?, ?, ?, ?)`,
        [spotifyId, title, artist, album]
      );

      trackId = insertTrack.insertId;

    } else {

      trackId = trackRows[0].id;

    }

    const linkRows = await db.query(
      `SELECT * FROM mood_tracks 
       WHERE mood_id = ? AND track_id = ?`,
      [moodId, trackId]
    );

    if (linkRows.length === 0) {

      await db.query(
        `INSERT INTO mood_tracks (mood_id, track_id)
         VALUES (?, ?)`,
        [moodId, trackId]
      );

    }

  }

  return {
    message: "Mood tracks filled successfully"
  };

}

module.exports = {
  fillMoodTracks
};