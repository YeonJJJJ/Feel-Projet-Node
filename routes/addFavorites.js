const express = require("express");
const router = express.Router();
const favoriteService = require("../services/addFavorites");

// POST /favorites — add favorites
router.post("/", async (req, res, next) => {
  try {
    const { userId, playlistId } = req.body;
    if (!userId || !playlistId) return res.status(400).json({ message: "userId and playlistId required" });
    const result = await favoriteService.addFavorite(userId, playlistId);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// DELETE /favorites — delete favorites
router.delete("/", async (req, res, next) => {
  try {
    const { userId, playlistId } = req.body;
    if (!userId || !playlistId) return res.status(400).json({ message: "userId and playlistId required" });
    const result = await favoriteService.removeFavorite(userId, playlistId);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// GET /favorites/check?userId=1&playlistId=2
router.get("/check", async (req, res, next) => {
  try {
    const { userId, playlistId } = req.query;
    const result = await favoriteService.isFavorite(userId, playlistId);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;