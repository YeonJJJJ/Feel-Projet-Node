/*
let mysql = require("mysql");
let config = require("../config");

let con = mysql.createConnection(config.db);

const fillTable = `
INSERT INTO users
(username, email, password) 
VALUES ('random','random@example.com','password123');
`

con.connect(err => {
    if (err) throw err;
    console.log("Connected to database");

    con.query(fillTable, (err, result) => {
        if (err) throw err;
        console.log("Table users filled");
        con.end();
    });
});

*/

const mysql = require("mysql");
const config = require("../config");

const con = mysql.createConnection(config.db);

const queries = [
`
INSERT INTO moods (name, description) VALUES
('Happy', 'Upbeat and cheerful tracks to lift your mood'),
('Sad', 'Melancholic and emotional tracks'),
('Energetic', 'High tempo tracks to get you moving'),
('Nostalgic', 'Tracks that evoke memories and past times'),
('Party', 'Songs perfect for celebrations and parties'),
('Chill', 'Relaxed and laid-back tracks for unwinding'),
('Romantic', 'Tracks perfect for love and romance'),
('Focus', 'Music that helps you concentrate and study'),
('Motivational', 'Tracks to inspire and pump you up'),
('Melancholy', 'Soft and emotional songs to reflect'),
('Sleepy', 'Calm tracks to help relax or fall asleep');`,

];

con.connect(err => {
    if (err) throw err;
    console.log("Connected");

    queries.forEach(sql => {
        con.query(sql, err => {
            if (err) throw err;
        });
    });

    console.log("All tables filled");
    con.end();
});

