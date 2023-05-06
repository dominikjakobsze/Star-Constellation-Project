const express = require('express');
const { sequelize, env } = require('./config/db');
const Star = require('./models/StarModel');
const Constellation = require('./models/ConstellationModel');
const StarConstellation = require('./models/StarConstellation');
const ConstellationController = require('./controllers/ConstellationController');
const app = express();
const StarController = require('./controllers/StarController');
const StarConstellationController = require('./controllers/StarConstellationController');

// Config Base Request - Response Flow
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    next();
  });  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(StarController);
app.use(ConstellationController);
app.use(StarConstellationController);
// Serve static files from the uploads directory => uploaded images
app.use('/uploads', express.static('uploads'));

if(env !== 'test') {
    // Sync Models
    sequelize
        .sync({ force: true })
        .then(() => {
            console.log('\n\n\x1b[33mAll models were synchronized successfully.\x1b[0m\n\n');
            const PORT = process.env.PORT || 3520;
            app.listen(PORT, () => {
                console.log('\n\n\x1b[33m%s\x1b[0m', `Server listening on port http://127.0.0.1:${PORT}\n\n`);
            });
        })
        .catch((error) => {
            console.error('\n\nAn error occurred while synchronizing the models:\n\n', error);
        });
}

module.exports = app;

//npm run start => prezentacja mode z bazą danych dev
//npm run dev => dev mode z bazą danych dev, usuwa wszystkie pliki z uploads
//npm run test => test mode z bazą danych test
//npm run debug-mode-test => test mode z baza danych test + wszystkie informacje co sie dzieje

//sudo lsof -i :3520 => sprawdzenie czy port jest zajęty
//kill -9 PID => np. kill -9 45789

//crtl + c => zamknij serwer
