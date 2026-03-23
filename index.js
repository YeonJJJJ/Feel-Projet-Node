const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const port = 3000;

const getMoodsRouter          = require("./routes/getMoods");
const addUsersRouter          = require("./routes/addUsers");
const loginUsersRouter        = require("./routes/loginUsers");
const generatePlaylistRouter  = require("./routes/generatePlaylist");
const getUserPlaylistsRouter  = require("./routes/getPlaylists");
const getPlaylistTracksRouter = require("./routes/getTracks");
const deleteUsersRouter       = require("./routes/deleteUsers");
const addFavoritesRouter      = require("./routes/addFavorites");
const getDashboardDataRouter  = require("./routes/getDashboard");

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes API
app.use("/getMoods", getMoodsRouter);
app.use("/addUsers", addUsersRouter);
app.use("/login", loginUsersRouter);
app.use("/playlists/generate", generatePlaylistRouter);
app.use("/playlists/user", getUserPlaylistsRouter);
app.use("/playlists", getPlaylistTracksRouter);
app.use("/users/delete", deleteUsersRouter);
app.use("/favorites", addFavoritesRouter);
app.use("/dashboard/data", getDashboardDataRouter);

// Auth check
app.get("/auth/check", async (req, res) => {
  try {
    const db = require("./db");
    const { userId } = req.query;
    if (!userId) return res.json({ valid: false });
    const rows = await db.query("SELECT id FROM users WHERE id = ?", [userId]);
    res.json({ valid: rows.length > 0 });
  } catch (err) {
    res.json({ valid: false });
  }
});

// Error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});

// Fichiers statiques
app.use(express.static("public"));

// Port 8081 pour compatibilité Mac/MAMP
let server = app.listen(8081, function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log(`Server listening at http://localhost:${port}`);
});