const express = require("express");
const router = express.Router();
const playlistService = require("../services/getPlaylists");

router.get("/", async function (req, res, next) {
  try {

    const { userId, moodId } = req.query;

    if (!userId || !moodId) {
      return res.status(400).json({ message: "userId and moodId are required" });
    }

    const result = await playlistService.getUserPlaylists(userId, moodId);

    res.json(result);

  } catch (err) {
    console.error("Error while getting playlists", err.message);
    next(err);
  }
});

module.exports = router;