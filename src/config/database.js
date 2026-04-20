require('dotenv').config();
const mysql = require('mysql2');

const besiragarPool = mysql.createPool({
    host: process.env.BESIRAGA_DB_HOST,
    port: process.env.BESIRAGA_DB_PORT,
    user: process.env.BESIRAGA_DB_USER,
    password: process.env.BESIRAGA_DB_PASS,
    database: process.env.BESIRAGA_DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
});

module.exports = {
    besiragarPool: besiragarPool.promise()
};