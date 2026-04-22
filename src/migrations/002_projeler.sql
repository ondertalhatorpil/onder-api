CREATE TABLE IF NOT EXISTS projeler (
    id INT AUTO_INCREMENT PRIMARY KEY,
    yil INT,
    program VARCHAR(255),
    proje_adi VARCHAR(500) NOT NULL,
    aciklama TEXT,
    durum ENUM('aktif', 'tamamlandi', 'iptal') NOT NULL DEFAULT 'aktif',
    butce DECIMAL(15,2),
    para_birimi ENUM('TRY', 'EUR', 'USD') DEFAULT 'TRY',
    katilimci_sayisi INT DEFAULT 0,
    ortak_ulke_sayisi INT DEFAULT 0,
    baslangic_tarihi DATE,
    bitis_tarihi DATE,
    lokasyon VARCHAR(255),
    ilerleme_yuzdesi INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);