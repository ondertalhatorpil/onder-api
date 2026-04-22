CREATE TABLE IF NOT EXISTS burs_gruplari (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ad VARCHAR(255) NOT NULL,
    aciklama TEXT,
    kategori ENUM('lise', 'universite', 'nitelikli', 'yurtdisi') NOT NULL,
    kisi_basi DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS burs_alt_kategoriler (
    id INT AUTO_INCREMENT PRIMARY KEY,
    burs_grubu_id INT NOT NULL,
    ad VARCHAR(255) NOT NULL,
    ogrenci_sayisi INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (burs_grubu_id) REFERENCES burs_gruplari(id)
);