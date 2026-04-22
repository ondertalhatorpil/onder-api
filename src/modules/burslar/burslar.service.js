const { onderPool } = require('../../config/database');

exports.getAll = async () => {
    const [gruplar] = await onderPool.query(`
        SELECT 
            bg.*,
            JSON_ARRAYAGG(
                JSON_OBJECT('id', bak.id, 'ad', bak.ad, 'ogrenci_sayisi', bak.ogrenci_sayisi)
            ) as alt_kategoriler
        FROM burs_gruplari bg
        LEFT JOIN burs_alt_kategoriler bak ON bg.id = bak.burs_grubu_id
        GROUP BY bg.id
        ORDER BY bg.id
    `);
    return gruplar;
};

exports.getOzet = async () => {
    const [toplam] = await onderPool.query(`
        SELECT 
            SUM(bak.ogrenci_sayisi) as toplam_burslu,
            COUNT(DISTINCT bg.id) as toplam_grup
        FROM burs_gruplari bg
        LEFT JOIN burs_alt_kategoriler bak ON bg.id = bak.burs_grubu_id
    `);

    const [kategoriler] = await onderPool.query(`
        SELECT 
            bg.kategori,
            bg.ad,
            bg.kisi_basi,
            SUM(bak.ogrenci_sayisi) as ogrenci_sayisi,
            SUM(bak.ogrenci_sayisi * bg.kisi_basi) as aylik_maliyet
        FROM burs_gruplari bg
        LEFT JOIN burs_alt_kategoriler bak ON bg.id = bak.burs_grubu_id
        GROUP BY bg.id
    `);

    return {
        toplam: toplam[0],
        kategori_detaylari: kategoriler
    };
};