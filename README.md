# Feel — Mood Based Playlist Generator

> Generate playlists automatically based on how you feel.

Feel is a web application that connects to the Spotify API to create personalized playlists based on the user's current mood.

---

## Features

- Create an account and log in
- Choose or type a mood
- Automatically generate playlists from Spotify
- Browse and revisit your playlists
- Save playlists to favorites
- Personal dashboard with mood history and recent playlists

---

## Prerequisites

- Node.js
- A local server with MySQL enabled (WAMP / MAMP / XAMPP)

> **Note — Mac users:** If running MAMP on Mac, change the port in `index.js` to `8889`.

---

## Installation

**1. Clone the repository**

**2. Install dependencies**

```bash
npm i
```

**3. Configure the project**

Duplicate `config.js.ext` and rename it `config.js`, then fill in the database credentials and Spotify API keys.

**4. Run migrations** (in this order)

```bash
node ./migration/dbCreate.js     # Creates the database
node ./migration/tableCreate.js  # Creates the tables
node ./migration/tableFill.js    # Fills the tables with fixtures
```

**5. Start the server**

```bash
node index.js
```

**6. Open the app**

```
http://localhost:8081
```
or on Mac with MAMP:
```
http://localhost:8889
```

---

## How It Works

1. The user signs up or logs in
2. They choose or type a mood
3. A request is sent to the Spotify API
4. Tracks are retrieved based on the mood
5. Tracks are saved to the database
6. A playlist is automatically created
7. The user can browse and favorite their playlists

---

## Project Structure

```
project/
│
├── routes/         # API endpoint handlers
├── services/       # Business logic & DB queries
├── public/         # Frontend (HTML / CSS / JS)
├── migration/      # DB creation and fixtures
│
├── config.js       # Environment configuration (not committed)
├── config.js.ext   # Configuration template
├── index.js        # Server entry point
└── helper.js       # Utility functions
```

---

## API Routes

### Users
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/addUsers` | Register a new user |
| POST | `/login` | Log in |
| DELETE | `/users/delete` | Delete a user account |

### Playlists
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/playlists/generate` | Generate playlists for a mood |
| GET | `/playlists/user` | Get playlists for a user |
| GET | `/playlists/tracks` | Get tracks for a specific playlist |

### Moods
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/getMoods` | Get all available moods |

### Favorites & Dashboard
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/favorites` | Add a playlist to favorites |
| DELETE | `/favorites` | Remove a playlist from favorites |
| GET | `/favorites/check` | Check if a playlist is favorited |
| GET | `/dashboard/data` | Get all dashboard data for a user |

---

## Database Schema

| Table | Key Fields |
|-------|-----------|
| `users` | id, username, email, password, created_at |
| `moods` | id, name, description |
| `playlists` | id, user_id, mood_id, name, created_at |
| `tracks` | id, spotify_id, title, artist, preview_url |
| `playlists_tracks` | playlist_id, track_id |
| `mood_tracks` | mood_id, track_id |
| `favorites` | id, user_id, playlist_id, created_at |

**Relations:**
- Playlists ↔ Tracks (many-to-many via `playlists_tracks`)
- Moods ↔ Tracks (many-to-many via `mood_tracks`)
- Users → Playlists (one-to-many)
- Users → Favorites (one-to-many)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Node.js, Express |
| Database | MySQL |
| Frontend | HTML, CSS, JavaScript |
| External API | Spotify API |
| Libraries | axios, mysql2, cors |

---

## Notes

- `config.js` is not committed to the repository. Use `config.js.ext` as a template.
- Spotify `preview_url` availability depends on Spotify's API — some tracks may not have a preview.