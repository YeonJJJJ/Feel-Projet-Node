const mysql = require("mysql");
const config = require("../config");

const con = mysql.createConnection(config.db);

const queries = [
`CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`,

`CREATE TABLE IF NOT EXISTS moods (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT
)`,

`CREATE TABLE IF NOT EXISTS playlists (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    name VARCHAR(150),
    mood_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (mood_id) REFERENCES moods(id)
)`,

`CREATE TABLE IF NOT EXISTS tracks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    spotify_id VARCHAR(100),
    title VARCHAR(255),
    artist VARCHAR(255),
    preview_url TEXT
)`,

`CREATE TABLE IF NOT EXISTS playlists_tracks (
    playlist_id INT,
    track_id INT,
    PRIMARY KEY (playlist_id, track_id),
    FOREIGN KEY (playlist_id) REFERENCES playlists(id),
    FOREIGN KEY (track_id) REFERENCES tracks(id)
)`,

`CREATE TABLE IF NOT EXISTS mood_tracks (
    mood_id INT,
    track_id INT,
    PRIMARY KEY (mood_id, track_id),
    FOREIGN KEY (mood_id) REFERENCES moods(id),
    FOREIGN KEY (track_id) REFERENCES tracks(id)
)`
];

con.connect(err => {
    if (err) throw err;
    console.log("Connected");

    queries.forEach(sql => {
        con.query(sql, err => {
            if (err) throw err;
        });
    });

    console.log("All tables created");
    con.end();
});