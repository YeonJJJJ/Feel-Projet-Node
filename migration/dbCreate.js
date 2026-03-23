let mysql = require("mysql");
let config = require("../config");

let con = mysql.createConnection({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password
});

con.connect(function (err) {
    if (err) throw err;
    con.query("CREATE DATABASE IF NOT EXISTS Feel_DB", function (err, result) {
        if (err) throw err;
        console.log("Database created");
        con.end();
    });
});

