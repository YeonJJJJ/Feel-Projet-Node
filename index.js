const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const port = 3000;

const getMoodsRouter          = require("./routes/getMoods");
const addUsersRouter          = require("./routes/addUsers");
const loginUsersRouter        = require("./routes/loginUsers");
const addTrackRouter          = require("./routes/addTrack");
const generatePlaylistRouter  = require("./routes/generatePlaylist");
const getUserPlaylistsRouter  = require("./routes/getUserPlaylists");
const getPlaylistTracksRouter = require("./routes/getPlaylistTracks");
const deleteUsersRouter       = require("./routes/deleteUsers");
const addFavoritesRouter      = require("./routes/addFavorites");
const getDashboardDataRouter  = require("./routes/getDashboard");

// CORS
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─────────────────────────────────────────────
// Routes API — avant le static
// ─────────────────────────────────────────────
app.use("/getMoods", getMoodsRouter);
app.use("/addUsers", addUsersRouter);
app.use("/login", loginUsersRouter);
app.use("/addTrack", addTrackRouter);
app.use("/playlists/generate", generatePlaylistRouter);
app.use("/playlists/user", getUserPlaylistsRouter);
app.use("/playlists", getPlaylistTracksRouter);
app.use("/users/delete", deleteUsersRouter);
app.use("/favorites", addFavoritesRouter);
app.use("/dashboard/data", getDashboardDataRouter);



// ─────────────────────────────────────────────
// Fichiers statiques
// ─────────────────────────────────────────────
app.use(express.static(path.join(__dirname, "public")));

// ─────────────────────────────────────────────
// Routes pages HTML
// ─────────────────────────────────────────────
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/login/index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public/login/index.html"));
});

app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "public/signup/index.html"));
});

app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/playlist", (req, res) => {
  res.sendFile(path.join(__dirname, "public/playlist/index.html"));
});

app.get("/playlist2", (req, res) => {
  res.sendFile(path.join(__dirname, "public/playlist2/index.html"));
});

app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "public/dashboard/index.html"));
});

// ─────────────────────────────────────────────
// Error Handler
// ─────────────────────────────────────────────
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
});

// ─────────────────────────────────────────────
// Lancement
// ─────────────────────────────────────────────
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});