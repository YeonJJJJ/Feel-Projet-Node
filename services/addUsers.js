const db = require("./db");

async function addUser(user) {

  const sql = `
    INSERT INTO users (username, email, password)
    VALUES (?, ?, ?)
  `;

  const params = [
    user.username,
    user.email,
    user.password
  ];

  const result = await db.query(sql, params);

  return {
    message: "User created successfully",
    userId: result.insertId
  };
}

module.exports = {
  addUser
};
