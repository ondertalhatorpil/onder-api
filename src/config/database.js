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

const onderPool = mysql.createPool({
    host: process.env.ONDER_DB_HOST,
    port: process.env.ONDER_DB_PORT,
    user: process.env.ONDER_DB_USER,
    password: process.env.ONDER_DB_PASS,
    database: process.env.ONDER_DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
});

const talepPool = mysql.createPool({
    host: process.env.TALEP_DB_HOST,
    port: process.env.TALEP_DB_PORT,
    user: process.env.TALEP_DB_USER,
    password: process.env.TALEP_DB_PASS || '',
    database: process.env.TALEP_DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
});

const kariyerPool = mysql.createPool({
    host: process.env.KARIYER_DB_HOST,
    port: process.env.KARIYER_DB_PORT,
    user: process.env.KARIYER_DB_USER,
    password: process.env.KARIYER_DB_PASS,
    database: process.env.KARIYER_DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
});

module.exports = {
    besiragarPool: besiragarPool.promise(),
    talepPool: talepPool.promise(),
    onderPool: onderPool.promise(),
    kariyerPool: kariyerPool.promise(),
};