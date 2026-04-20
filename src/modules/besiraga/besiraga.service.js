const { besiragarPool } = require('../../config/database');

// Genel özet istatistikler
exports.getOzet = async () => {
    const [durumlar] = await besiragarPool.query(`
        SELECT durum, COUNT(*) as sayi
        FROM rezervasyonlar
        GROUP BY durum
    `);

    const [buAy] = await besiragarPool.query(`
        SELECT COUNT(*) as sayi
        FROM rezervasyonlar
        WHERE MONTH(tarih) = MONTH(CURDATE())
        AND YEAR(tarih) = YEAR(CURDATE())
    `);

    const [toplamZiyaretci] = await besiragarPool.query(`
        SELECT SUM(toplam_kisi) as toplam
        FROM rezervasyonlar
        WHERE durum = 'onaylandi'
    `);

   const [sonYediGun] = await besiragarPool.query(`
    SELECT DATE_FORMAT(tarih, '%Y-%m-%d') as tarih, 
           COUNT(*) as sayi, 
           SUM(toplam_kisi) as toplam_kisi
    FROM rezervasyonlar
    WHERE tarih >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
    GROUP BY tarih
    ORDER BY tarih DESC
    LIMIT 7
`);

    const durumObj = {};
    durumlar.forEach(d => durumObj[d.durum] = d.sayi);

    return {
        durum_sayilari: {
            beklemede: durumObj.beklemede || 0,
            onaylandi: durumObj.onaylandi || 0,
            reddedildi: durumObj.reddedildi || 0,
            iptal: durumObj.iptal || 0,
        },
        bu_ay: buAy[0].sayi,
        toplam_ziyaretci: toplamZiyaretci[0].toplam || 0,
        son_yedi_gun: sonYediGun
    };
};

// Rezervasyon listesi
exports.getRezervasyonlar = async () => {
    const [rows] = await besiragarPool.query(`
        SELECT id, yetkili_ad_soyad, kurum_adi, il, ilce,
               tarih, saat_dilimi, toplam_kisi, durum, olusturma_tarihi
        FROM rezervasyonlar
        ORDER BY olusturma_tarihi DESC
        LIMIT 100
    `);
    return rows;
};