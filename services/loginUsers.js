const db = require("./db");
const crypto = require("crypto");

function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

async function login(user) {

  const rows = await db.query(
    `SELECT * FROM users WHERE email = ? AND password = ?`,
    [user.email, hashPassword(user.password)]
  );

  if (rows.length === 0) {
    return {
      success: false,
      message: "Invalid email or password"
    };
  }

  // On ne renvoie jamais le mot de passe au front
  const { password, ...userWithoutPassword } = rows[0];

  return {
    success: true,
    message: "Login successful",
    user: userWithoutPassword
  };
}

module.exports = { login };