const express = require('express');
const router = express.Router();
const service = require('./kariyer.service');

router.get('/ozet', async (req, res) => {
    try {
        const data = await service.getOzet();
        res.json({ success: true, data });
    } catch (err) {
        console.error('Kariyer özet hatası:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});

router.get('/ilanlar', async (req, res) => {
    try {
        const data = await service.getIlanlar();
        res.json({ success: true, data });
    } catch (err) {
        console.error('Kariyer ilan hatası:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;