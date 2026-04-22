require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const auth = require('./middleware/auth');
const besiragarRoutes = require('./modules/besiraga/besiraga.routes');
const mulklerRoutes = require('./modules/mulkler/mulkler.routes');
const binaTahsisleriRoutes = require('./modules/bina_tahsisleri/bina_tahsisleri.routes');
const yurtlarRoutes = require('./modules/yurtlar/yurtlar.routes');
const projelerRoutes = require('./modules/projeler/projeler.routes');
const burslarRoutes = require('./modules/burslar/burslar.routes');
const talepRoutes = require('./modules/talep/talep.routes');


const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.use('/api', auth);
app.use('/api/besiraga', besiragarRoutes);
app.use('/api/mulkler', mulklerRoutes);
app.use('/api/bina-tahsisleri', binaTahsisleriRoutes);
app.use('/api/yurtlar', yurtlarRoutes);
app.use('/api/projeler', projelerRoutes);
app.use('/api/burslar', burslarRoutes);
app.use('/api/talep', talepRoutes);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`✅ onder-api ${PORT} portunda çalışıyor`);
});