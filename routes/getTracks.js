const express = require("express");
const router = express.Router();
const playlistTracksService = require("../services/getTracks");

router.get("/tracks", async function (req, res, next) {
  try {

    const { playlistId } = req.query;

    if (!playlistId) {
      return res.status(400).json({ message: "playlistId missing" });
    }

    const result = await playlistTracksService.getPlaylistTracks(playlistId);

    res.json(result);

  } catch (err) {
    console.error("Error while getting playlist tracks", err.message);
    next(err);
  }
});

module.exports = router;