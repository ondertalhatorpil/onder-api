require('dotenv').config();
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function migrate() {
    const connection = await mysql.createConnection({
        host: process.env.ONDER_DB_HOST,
        port: process.env.ONDER_DB_PORT,
        user: process.env.ONDER_DB_USER,
        password: process.env.ONDER_DB_PASS,
        database: process.env.ONDER_DB_NAME,
        multipleStatements: true
    });

    const files = [
    '001_mulkler.sql',
    '002_projeler.sql',
    '003_seed_mulkler.sql',
    '004_seed_projeler.sql',
    '005_bina_tahsisleri.sql',
    '006_seed_bina_tahsisleri.sql',
    '007_yurtlar.sql',
    '008_seed_yurtlar.sql',
    '009_burslar.sql',
    '010_seed_burslar.sql'
    ];

    for (const file of files) {
        const filePath = path.join(__dirname, file);
        const sql = fs.readFileSync(filePath, 'utf8');
        console.log(`⏳ Çalıştırılıyor: ${file}`);
        await connection.query(sql);
        console.log(`✅ Tamamlandı: ${file}`);
    }

    await connection.end();
    console.log('🎉 Tüm migration\'lar tamamlandı!');
}

migrate().catch(err => {
    console.error('❌ Migration hatası:', err);
    process.exit(1);
});