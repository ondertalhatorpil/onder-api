const express = require('express');
const router = express.Router();
const service = require('./talep.service');

router.get('/ozet', async (req, res) => {
    try {
        const data = await service.getOzet();
        res.json({ success: true, data });
    } catch (err) {
        console.error('Talep özet hatası:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const data = await service.getAll();
        res.json({ success: true, data });
    } catch (err) {
        console.error('Talep listesi hatası:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;