// Додаткове завдання: сервер на Express, сторінки віддаються окремими роутами.
// Запуск: npm install, потім node server.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// статика (js/main.js)
app.use('/js', express.static(path.join(__dirname, 'js')));

// головна сторінка
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// окремий роут на калькулятор
app.get('/calculator', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Сервер запущено: http://localhost:${PORT}`);
});
