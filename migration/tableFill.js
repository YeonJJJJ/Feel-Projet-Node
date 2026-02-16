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
INSERT INTO users
(username, email, password) 
VALUES ('random','random@example.com','password123');
`,

`
INSERT INTO moods
(name, description)
VALUES ('Happy', 'Feeling joyful and content'), ('Sad', 'Feeling down and blue'), ('Energetic', 'Feeling lively and full of energy');
`,

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

