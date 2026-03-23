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

app.use("/getMoods", getMoodsRouter);
app.use("/addUsers", addUsersRouter);
app.use("/login", loginUsersRouter);
app.use("/playlists/generate", generatePlaylistRouter);
app.use("/playlists/user", getUserPlaylistsRouter);
app.use("/playlists", getPlaylistTracksRouter);
app.use("/users/delete", deleteUsersRouter);
app.use("/favorites", addFavoritesRouter);
app.use("/dashboard/data", getDashboardDataRouter);

app.use(express.static(path.join(__dirname, "public")));

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});