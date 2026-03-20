const express = require("express");
const router = express.Router();
const playlistService = require("../services/getUserPlaylists");

// GET /playlists/user?userId=1&moodId=2
router.get("/", async function (req, res, next) {
  try {

    const { userId, moodId } = req.query;

    if (!userId || !moodId) {
      return res.status(400).json({ message: "userId et moodId sont requis" });
    }

    const result = await playlistService.getUserPlaylists(userId, moodId);

    res.json(result);

  } catch (err) {
    console.error("Error while getting playlists", err.message);
    next(err);
  }
});

module.exports = router;