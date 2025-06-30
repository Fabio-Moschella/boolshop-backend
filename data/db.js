const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.HOST_DB,
  user: process.env.USER_DB,
  port: process.env.DB_PORT,
  password: process.env.PASS_DB,
  database: process.env.DB_NAME,
});
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL!");
});
module.exports = connection;
