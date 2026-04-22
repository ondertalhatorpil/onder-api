CREATE TABLE IF NOT EXISTS mulkler (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sira_no INT NOT NULL,
    adres TEXT NOT NULL,
    il VARCHAR(100),
    ilce VARCHAR(100),
    nitelik ENUM('dukkan', 'daire', 'arsa', 'kargir_ev') NOT NULL,
    yuz_olcumu VARCHAR(100),
    kiraci VARCHAR(255),
    kira_geliri DECIMAL(12,2),
    kira_geliri_aciklama VARCHAR(255),
    durum ENUM('kirali', 'bos', 'kullanim_hakki_bizde_degil') NOT NULL DEFAULT 'bos',
    kira_baslangic_tarihi DATE,
    kira_artis_zamani VARCHAR(100),
    notlar TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);