const { onderPool } = require('../../config/database');

exports.getAll = async () => {
    const [rows] = await onderPool.query(`
        SELECT * FROM yurtlar ORDER BY il, ad
    `);
    return rows;
};

exports.getOzet = async () => {
    const [genel] = await onderPool.query(`
        SELECT 
            COUNT(*) as toplam_yurt,
            SUM(kapasite) as toplam_kapasite,
            SUM(dolu_sayi) as toplam_dolu,
            SUM(kapasite - dolu_sayi) as toplam_bos
        FROM yurtlar WHERE durum = 'aktif'
    `);

    const [cinsiyet] = await onderPool.query(`
        SELECT cinsiyet, COUNT(*) as sayi, SUM(kapasite) as kapasite, SUM(dolu_sayi) as dolu
        FROM yurtlar GROUP BY cinsiyet
    `);

    return {
        genel: genel[0],
        cinsiyet_dagilimi: cinsiyet
    };
};