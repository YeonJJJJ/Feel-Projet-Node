const express = require("express");
const router = express.Router();
const dashboardService = require("../services/getDashboard");

// GET /dashboard?userId=1
router.get("/", async (req, res, next) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ message: "userId requis" });
    const result = await dashboardService.getDashboard(userId);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;