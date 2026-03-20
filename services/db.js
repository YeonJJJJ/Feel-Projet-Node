const mysql = require("mysql2/promise");
const config = require("../config");

// Crée un pool unique au démarrage du serveur
const pool = mysql.createPool({
  ...config.db,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function query(sql, params) {
  const [results] = await pool.execute(sql, params);
  return results;
}

module.exports = { query };