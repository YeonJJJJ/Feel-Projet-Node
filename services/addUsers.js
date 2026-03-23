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
    user: {                         
      id: result.insertId,
      username: user.username,
      email: user.email
    }
  };
}

module.exports = { addUser };