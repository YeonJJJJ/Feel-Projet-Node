const express = require("express");
const router = express.Router();
const deleteUserService = require("../services/deleteUsers");

router.delete("/", async function (req, res, next) {
  try {

    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "userId missing" });
    }

    const result = await deleteUserService.deleteUser(userId);

    res.json(result);

  } catch (err) {
    console.error("Error while deleting user", err.message);
    next(err);
  }
});

module.exports = router;