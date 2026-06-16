// Гра "Знайди картинку" на jQuery + jQuery UI.
// У полі 5x5 - 25 різних картинок з обраного розділу.
// Збоку показується одна з них, її треба перетягнути на таку саму в полі.

const PER = 50;   // картинок у каталозі кожного розділу
const SIZE = 25;  // поле 5x5

let category;     // обраний розділ
let fieldNums;    // 25 номерів картинок у полі (унікальні)
let matched;      // індекси клітинок, які вже знайдені
let current;      // номер поточної картинки

function rand(n) {
    return Math.floor(Math.random() * n);
}

// шлях до картинки
function imgPath(n) {
    return 'images/' + category + '/' + n + '.png';
}

// вибрати 25 унікальних номерів з 1..PER
function pickNumbers() {
    let pool = [];
    for (let i = 1; i <= PER; i++) pool.push(i);
    for (let i = pool.length - 1; i > 0; i--) {
        let j = rand(i + 1);
        let t = pool[i]; pool[i] = pool[j]; pool[j] = t;
    }
    return pool.slice(0, SIZE);
}

// побудувати поле гри
function buildField() {
    fieldNums = pickNumbers();
    matched = [];
    $('#score').text(0);

    let field = $('#field').empty();
    fieldNums.forEach(function (n, idx) {
        let cell = $('<div class="cell"></div>').data('idx', idx);
        cell.append($('<img>').attr('src', imgPath(n)));
        field.append(cell);
    });

    // клітинки приймають перетягнуту картинку
    $('#field .cell').droppable({
        accept: '#current img',
        hoverClass: 'over',
        drop: function () { onDrop($(this)); }
    });

    loadCurrent();
}

// показати поточну картинку (робить її перетягуваною)
function renderCurrent() {
    let box = $('#current').empty();
    let img = $('<img>').attr('src', imgPath(current));
    box.append(img);
    img.draggable({ revert: 'invalid' });
}

// взяти нову поточну картинку з ще не знайдених
function loadCurrent() {
    let left = [];
    fieldNums.forEach(function (n, i) {
        if (matched.indexOf(i) === -1) left.push(i);
    });

    if (left.length === 0) {
        alert('Вітаємо! Ви знайшли всі картинки.');
        startGame();
        return;
    }

    current = fieldNums[left[rand(left.length)]];
    renderCurrent();
}

// обробка перетягування на клітинку
function onDrop(cell) {
    let idx = cell.data('idx');
    if (matched.indexOf(idx) !== -1) return;

    if (fieldNums[idx] === current) {
        cell.addClass('found');
        matched.push(idx);
        $('#score').text(matched.length);
        loadCurrent();
    } else {
        alert('Не той квадрат, спробуйте ще раз.');
        renderCurrent(); // повертаємо картинку на місце
    }
}

// почати гру (за обраним розділом)
function startGame() {
    category = $('#category').val();
    buildField();
}

$(function () {
    $('#category').on('change', startGame);
    $('#restart').on('click', startGame);
    startGame();
});
