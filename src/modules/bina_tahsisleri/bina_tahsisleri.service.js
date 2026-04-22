const { onderPool } = require('../../config/database');

exports.getAll = async () => {
    const [rows] = await onderPool.query(`
        SELECT * FROM bina_tahsisleri ORDER BY sira_no
    `);
    return rows;
};

exports.getOzet = async () => {
    const [durumlar] = await onderPool.query(`
        SELECT kullanim_durumu, COUNT(*) as sayi FROM bina_tahsisleri GROUP BY kullanim_durumu
    `);

    const [kaynaklar] = await onderPool.query(`
        SELECT nereden_tahsisli, COUNT(*) as sayi FROM bina_tahsisleri GROUP BY nereden_tahsisli
    `);

    const [kullanim] = await onderPool.query(`
        SELECT kullanim_amaci, COUNT(*) as sayi FROM bina_tahsisleri GROUP BY kullanim_amaci ORDER BY sayi DESC
    `);

    return {
        kullanim_durumu: durumlar,
        kaynak_sayilari: kaynaklar,
        kullanim_amaci: kullanim
    };
};