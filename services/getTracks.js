const db = require("./db");

async function getTracks() {

  const rows = await db.query(`SELECT * FROM tracks`);

  return {
    data: rows
  };

}

module.exports = {
  getTracks
};