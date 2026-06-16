// Гра "Послідовність 1-20" на jQuery.
// Треба натискати числа по порядку. Кожна партія - 60 секунд.

const TOTAL = 25;        // поле 5x5, числа від 1 до 25
const ROUND = 60;        // тривалість партії в секундах
const sizes = [18, 24, 30, 36, 44]; // різні розміри шрифту (5 варіантів)

let next;        // яке число чекаємо натиснути
let left;        // скільки секунд лишилось
let timerId;     // id інтервалу таймера
let attempt = 0; // номер спроби (для таблиці)
let bestRow;     // рядок з кращим (найменшим) часом

// випадкове ціле від min до max включно
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// випадковий, але не надто світлий колір
function randColor() {
    return 'rgb(' + rand(0, 170) + ',' + rand(0, 170) + ',' + rand(0, 170) + ')';
}

// перемішати масив (Фішер-Йейтс)
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = rand(0, i);
        let t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
}

// будуємо поле з кнопками-числами
function buildField() {
    let nums = [];
    for (let i = 1; i <= TOTAL; i++) nums.push(i);
    shuffle(nums);

    let field = $('#field').empty();
    nums.forEach(function (n) {
        let cell = $('<span class="cell"></span>')
            .text(n)
            .data('num', n)
            .css('font-size', sizes[rand(0, sizes.length - 1)] + 'px')
            .css('color', randColor());
        field.append(cell);
    });
}

// почати нову партію
function startGame() {
    next = 1;
    left = ROUND;
    $('#next').text(next);
    $('#timer').text('Залишилось: ' + left);
    buildField();

    clearInterval(timerId);
    timerId = setInterval(tick, 1000);
}

// кожну секунду
function tick() {
    left--;
    $('#timer').text('Залишилось: ' + left);
    if (left <= 0) {
        clearInterval(timerId);
        addStat('Час вийшов', ROUND);
        alert('Час вийшов! Спробуйте ще раз.');
        startGame();
    }
}

// додати рядок у таблицю статистики
function addStat(result, time) {
    attempt++;
    let row = $('<tr></tr>');
    row.append('<td>' + attempt + '</td>');
    row.append('<td>' + result + '</td>');
    row.append('<td>' + time + '</td>');
    $('#stats tbody').append(row);

    // підсвічуємо кращий час лише серед виграних партій
    if (result === 'Перемога') {
        if (!bestRow || time < bestRow.data('time')) {
            if (bestRow) bestRow.removeClass('best');
            row.addClass('best').data('time', time);
            bestRow = row;
        }
    }
}

// обробка кліку по числу
function onCellClick() {
    let cell = $(this);
    if (cell.hasClass('done')) return;

    let n = cell.data('num');
    if (n === next) {
        cell.addClass('done');
        next++;
        $('#next').text(next <= TOTAL ? next : '-');

        if (next > TOTAL) {
            clearInterval(timerId);
            let spent = ROUND - left;
            addStat('Перемога', spent);
            alert('Вітаємо! Ви пройшли гру за ' + spent + ' с.');
            startGame();
        }
    } else {
        alert('Не вірна цифра');
    }
}

$(function () {
    $('#field').on('click', '.cell', onCellClick);
    $('#restart').on('click', startGame);
    startGame();
});
