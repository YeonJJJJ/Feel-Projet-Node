const db = require("./db");

async function login(user) {

  const rows = await db.query(
    `SELECT * FROM users WHERE email = ? AND password = ?`,
    [user.email, user.password]
  );

  if (rows.length === 0) {
    return {
      success: false,
      message: "Invalid email or password"
    };
  }

  return {
    success: true,
    message: "Login successful",
    user: rows[0]
  };
}

module.exports = {
  login
};