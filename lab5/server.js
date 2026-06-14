// Серверна сторона на Express.
// Приймає число за технологією AJAX, рахує квадрат і повертає відповідь у JSON.
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// віддаємо статичні файли (index.html, client.js, style.css)
app.use(express.static(__dirname));

// обробка AJAX-запиту на обрахунок квадрату
app.get('/square', (req, res) => {
    const number = Number(req.query.number);

    if (isNaN(number)) {
        return res.status(400).json({ error: 'Невірне число' });
    }

    res.json({
        number: number,
        square: number * number
    });
});

app.listen(PORT, () => {
    console.log(`Сервер запущено: http://localhost:${PORT}`);
});
