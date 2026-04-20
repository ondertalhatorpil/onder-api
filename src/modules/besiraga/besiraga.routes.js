const express = require('express');
const router = express.Router();
const service = require('./besiraga.service');

router.get('/ozet', async (req, res) => {
    try {
        const data = await service.getOzet();
        res.json({ success: true, data });
    } catch (err) {
        console.error('Beşirağa özet hatası:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});

router.get('/rezervasyonlar', async (req, res) => {
    try {
        const data = await service.getRezervasyonlar();
        res.json({ success: true, data });
    } catch (err) {
        console.error('Beşirağa rezervasyon hatası:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;