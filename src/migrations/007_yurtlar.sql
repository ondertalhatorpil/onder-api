CREATE TABLE IF NOT EXISTS yurtlar (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ad VARCHAR(255) NOT NULL,
    adres TEXT,
    il VARCHAR(100),
    ilce VARCHAR(100),
    kapasite INT,
    dolu_sayi INT,
    aylik_ucret DECIMAL(10,2),
    durum ENUM('aktif', 'pasif') NOT NULL DEFAULT 'aktif',
    cinsiyet ENUM('erkek', 'kiz', 'karma') NOT NULL,
    ozellikler JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);