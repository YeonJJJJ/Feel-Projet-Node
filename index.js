// Import Libraries & Frameworks
const express = require("express");
const cors = require("cors");
const app = express();
let port = 3000;
const getMoodsRouter = require("./routes/getMoods");
const addUsersRouter = require("./routes/addUsers");
const loginUsersRouter = require("./routes/loginUsers");
const addTrackRouter = require("./routes/addTrack");
const generatePlaylistRouter = require("./routes/generatePlaylist");
const getUserPlaylistsRouter = require("./routes/getUserPlaylists");
const getPlaylistTracksRouter = require("./routes/getPlaylistTracks");

// Tell cors to stfu
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Use and convert files to json
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

// Routes
app.use("/getMoods", getMoodsRouter);
app.use("/addUsers", addUsersRouter);
app.use("/login", loginUsersRouter);
app.use("/addTrack", addTrackRouter);
app.use("/playlists/generate", generatePlaylistRouter);
app.use("/playlists/user", getUserPlaylistsRouter);
app.use("/playlists", getPlaylistTracksRouter);

// app.get("/", (req, res) => {
//   res.send("Je suis une saucisse");
// });

// app.get("/store", (req, res) => {
//   res.send("Ceci est un store du cul");
// });

// Error Handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

// Server Launch
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

let server = app.listen(8081, () => {
  let host = server.address().address;
  let port = server.address().port;

  console.log(`Server listening at http://localhost:${port}`);
});

app.use(express.static("public"));
