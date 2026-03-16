const express = require("express");
const router = express.Router();
const spotifyService = require("../services/spotifyTracks");

router.get("/", async function (req, res, next) {
  try {

    const tracks = await spotifyService.getTracks("lofi");

    res.json(tracks);

  } catch (err) {
    console.error("Error while getting tracks", err.message);
    next(err);
  }
});

module.exports = router;