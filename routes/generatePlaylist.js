const express = require("express");
const router = express.Router();
const playlistService = require("../services/generatePlaylist");

router.post("/", async function(req, res, next) {

  try {

    const { userId, moodId } = req.body;

    const result = await playlistService.generatePlaylist(userId, moodId);

    res.json(result);

  } catch (err) {

    console.error("playlist generation error", err.message);
    next(err);

  }

});

module.exports = router;