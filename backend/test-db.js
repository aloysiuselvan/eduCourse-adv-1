require("dotenv").config();
const mariadb = require("mariadb");

const connectionString = process.env.DATABASE_URL;
const url = new URL(connectionString);

const pool = mariadb.createPool({
  host: url.hostname,
  port: url.port ? parseInt(url.port) : 3306,
  user: url.username,
  password: url.password,
  database: url.pathname.substring(1),
  connectionLimit: 3,
  connectTimeout: 5000,
});

pool.getConnection()
  .then((conn) => {
    console.log("Koneksi ke database sukses.");
    conn.release();
    pool.end();
  })
  .catch((err) => {
    console.log("Gagal koneksi ke database:");
    console.log("Code   :", err.code);
    console.log("Errno  :", err.errno);
    console.log("Message:", err.message);
    pool.end();
  });
