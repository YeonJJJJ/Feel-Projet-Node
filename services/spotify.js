const axios = require("axios");
const config = require("../config");

async function getSpotifyToken() {

  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    "grant_type=client_credentials",
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      auth: {
        username: config.spotify.clientId,
        password: config.spotify.clientSecret
      }
    }
  );

  return response.data.access_token;
}

async function getTrack(trackName) {

  const token = await getSpotifyToken();

  const response = await axios.get(
    "https://api.spotify.com/v1/search",
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        q: trackName,
        type: "track",
        limit: 1
      }
    }
  );

  return response.data.tracks.items[0];
}

module.exports = {
  getTrack
};