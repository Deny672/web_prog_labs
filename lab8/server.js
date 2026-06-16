// Додаткове завдання: сервер на Express.
// Сторінки гри віддаються окремими роутами.
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// статика (style.css, game.js)
app.use(express.static(__dirname));

// головна сторінка
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// сторінка з грою
app.get('/game', (req, res) => {
    res.sendFile(path.join(__dirname, 'game.html'));
});

app.listen(PORT, () => {
    console.log(`Сервер запущено: http://localhost:${PORT}`);
});
