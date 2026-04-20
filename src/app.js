require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const auth = require('./middleware/auth');
const besiragarRoutes = require('./modules/besiraga/besiraga.routes');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check (auth gerekmez)
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Tüm API routeları auth ile korunuyor
app.use('/api', auth);
app.use('/api/besiraga', besiragarRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`✅ onder-api ${PORT} portunda çalışıyor`);
});