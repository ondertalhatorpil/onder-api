const { kariyerPool } = require('../../config/database');

// Özet: toplam ilan sayıları ve son 7 günün trendi
exports.getOzet = async () => {
    const [merkez] = await kariyerPool.query(`
        SELECT COUNT(*) as toplam,
               SUM(CASE WHEN is_tipi = 'tam-zamanli' THEN 1 ELSE 0 END) as tam_zamanli,
               SUM(CASE WHEN is_tipi = 'yari-zamanli' THEN 1 ELSE 0 END) as yari_zamanli
        FROM merkez_ilanlar
    `);

    const [yurt] = await kariyerPool.query(`
        SELECT COUNT(*) as toplam,
               SUM(CASE WHEN is_tipi = 'tam-zamanli' THEN 1 ELSE 0 END) as tam_zamanli,
               SUM(CASE WHEN is_tipi = 'yari-zamanli' THEN 1 ELSE 0 END) as yari_zamanli
        FROM yurt_ilanlar
    `);

    const [sonYediGun] = await kariyerPool.query(`
        SELECT DATE_FORMAT(ilan_tarihi, '%Y-%m-%d') as tarih,
               COUNT(*) as sayi,
               'merkez' as tip
        FROM merkez_ilanlar
        WHERE ilan_tarihi >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
        GROUP BY tarih
        UNION ALL
        SELECT DATE_FORMAT(ilan_tarihi, '%Y-%m-%d') as tarih,
               COUNT(*) as sayi,
               'yurt' as tip
        FROM yurt_ilanlar
        WHERE ilan_tarihi >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
        GROUP BY tarih
        ORDER BY tarih DESC
    `);

    const [sehirler] = await kariyerPool.query(`
        SELECT sehir, COUNT(*) as sayi FROM (
            SELECT sehir FROM merkez_ilanlar WHERE sehir IS NOT NULL
            UNION ALL
            SELECT sehir FROM yurt_ilanlar WHERE sehir IS NOT NULL
        ) t
        GROUP BY sehir
        ORDER BY sayi DESC
        LIMIT 10
    `);

    return {
        merkez_ilanlar: merkez[0],
        yurt_ilanlar: yurt[0],
        toplam: (merkez[0].toplam || 0) + (yurt[0].toplam || 0),
        son_yedi_gun: sonYediGun,
        sehir_dagilimi: sehirler,
    };
};

// İlan listesi (her iki tablodan birleşik)
exports.getIlanlar = async () => {
    const [rows] = await kariyerPool.query(`
        SELECT id, ilan_basligi, firma_adi, sehir, is_tipi, maas, ilan_tarihi, created_at,
               'merkez' as kaynak
        FROM merkez_ilanlar
        UNION ALL
        SELECT id, ilan_basligi, firma_adi, sehir, is_tipi, maas, ilan_tarihi, created_at,
               'yurt' as kaynak
        FROM yurt_ilanlar
        ORDER BY created_at DESC
        LIMIT 100
    `);
    return rows;
};