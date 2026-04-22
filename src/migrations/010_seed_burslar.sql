INSERT INTO burs_gruplari (ad, aciklama, kategori, kisi_basi) VALUES
('Lise Bursları', 'Ortaöğretim Akademik Destek', 'lise', 1500.00),
('Üniversite Bursları', 'Yükseköğretim Başarı Teşvikleri', 'universite', 3000.00),
('Nitelikli Burslar', 'Özel Program ve Proje Bazlı', 'nitelikli', 5000.00),
('Wonder - Uluslararası', 'Uluslararası öğrenci programı', 'yurtdisi', 5000.00),
('Dışarı - Diğer Kurumlar', 'Dış kurumlarla işbirliği', 'yurtdisi', 3000.00);

INSERT INTO burs_alt_kategoriler (burs_grubu_id, ad, ogrenci_sayisi) VALUES
(1, 'Teşkilat', 745),
(1, 'Öncü', 212),
(1, 'Dış İlişkiler', 57),
(1, 'Dernekçimp', 19),
(1, 'Gençlik', 3),
(2, 'Gençlik', 791),
(2, 'Dernekçimp', 99),
(2, 'Öncü', 52),
(2, 'Teşkilat', 49),
(3, 'Gençlik', 44),
(3, 'Yurtlar', 8),
(3, 'Öncü', 6),
(3, 'Kurumsal', 5),
(3, 'Beşirağa', 4),
(3, 'Proje', 4),
(3, 'Dernekçimp', 2);