require("dotenv").config();
const mariadb = require("mariadb");

const connectionString = process.env.DATABASE_URL;
const url = new URL(connectionString);

console.log("Mencoba koneksi ke database...");
console.log("Host  :", url.hostname);
console.log("Port  :", url.port || 3306);
console.log("User  :", url.username);
console.log("DB    :", url.pathname.substring(1));

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
    console.log("\n BERHASIL! Koneksi ke database sukses.");
    conn.release();
    pool.end();
  })
  .catch((err) => {
    console.log("\n GAGAL! Error koneksi database:");
    console.log("   Code   :", err.code);
    console.log("   Errno  :", err.errno);
    console.log("   Message:", err.message);
    pool.end();
  });
