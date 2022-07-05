let mysql = require("mysql2");

const db = mysql.createConnection({
  host: "sql8.freesqldatabase.com",
  user: "sql8504152",
  password: "lmZUqJQ9Vh",
  database: "sql8504152",
});

db.connect((err: Error) => {
  if (err) {
    return console.error("error: " + err.message);
  }
  console.log("Connected to the MySQL server.");
});

export default db;
