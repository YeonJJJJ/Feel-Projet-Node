const express = require("express");
const router = express.Router();
const playlistService = require("../services/getPlaylistTracks");

router.get("/:playlistId", async function (req, res, next) {
  try {

    const result = await playlistService.getPlaylistTracks(req.params.playlistId);

    res.json(result);

  } catch (err) {
    console.error(`Error while getting playlist tracks`, err.message);
    next(err);
  }
});

module.exports = router;