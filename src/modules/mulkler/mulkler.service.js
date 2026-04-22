const { onderPool } = require('../../config/database');

exports.getAll = async () => {
    const [rows] = await onderPool.query(`
        SELECT * FROM mulkler ORDER BY sira_no
    `);
    return rows;
};

exports.getOzet = async () => {
    const [durumlar] = await onderPool.query(`
        SELECT durum, COUNT(*) as sayi FROM mulkler GROUP BY durum
    `);

    const [nitelikler] = await onderPool.query(`
        SELECT nitelik, COUNT(*) as sayi FROM mulkler GROUP BY nitelik
    `);

    const [kiraGeliri] = await onderPool.query(`
        SELECT SUM(kira_geliri) as toplam FROM mulkler WHERE durum = 'kirali'
    `);

    return {
        durum_sayilari: durumlar,
        nitelik_sayilari: nitelikler,
        toplam_kira_geliri: kiraGeliri[0].toplam || 0
    };
};