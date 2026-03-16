const db = require("./db");

async function getMoods() {

  const rows = await db.query(`SELECT * FROM moods`);

  return {
    data: rows
  };

}

module.exports = {
  getMoods
};