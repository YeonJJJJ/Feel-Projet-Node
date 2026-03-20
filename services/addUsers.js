const db = require("./db");
const crypto = require("crypto");

function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

async function addUser(user) {

  const hashedPassword = hashPassword(user.password);

  const result = await db.query(
    `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
    [user.username, user.email, hashedPassword]
  );

  return {
    message: "User created successfully",
    userId: result.insertId
  };
}

module.exports = { addUser };