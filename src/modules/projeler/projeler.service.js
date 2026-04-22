const { onderPool } = require('../../config/database');

exports.getAll = async () => {
    const [rows] = await onderPool.query(`
        SELECT * FROM projeler ORDER BY yil DESC
    `);
    return rows;
};

exports.getOzet = async () => {
    const [durumlar] = await onderPool.query(`
        SELECT durum, COUNT(*) as sayi FROM projeler GROUP BY durum
    `);

    const [butce] = await onderPool.query(`
        SELECT para_birimi, SUM(butce) as toplam FROM projeler GROUP BY para_birimi
    `);

    return {
        durum_sayilari: durumlar,
        butce_toplamlari: butce
    };
};