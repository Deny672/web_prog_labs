// Завдання 1.1. Клік по картинці -> width в консоль
let images = document.querySelectorAll('.images img');
images.forEach(function (img) {
    img.onclick = function () {
        console.log(this.width);
    };
});

// Завдання 1.2. При наведенні записати href в title.
// Записуємо один раз і знімаємо обробник через removeEventListener.
function setTitle(e) {
    let a = e.currentTarget;
    a.title = a.href;
    a.removeEventListener('mouseover', setTitle);
}

let links = document.querySelectorAll('.links a');
links.forEach(function (a) {
    a.addEventListener('mouseover', setTitle);
});

// Завдання 1.3. Клік по input -> його value в абзац #demo
let inputsA = document.querySelectorAll('.inputs-a input');
inputsA.forEach(function (inp) {
    inp.addEventListener('click', function () {
        document.getElementById('demo').textContent = this.value;
    });
});

// Завдання 1.4. Перший клік - console.log, далі - alert
function firstClick(e) {
    let inp = e.currentTarget;
    console.log(inp.value);
    inp.removeEventListener('click', firstClick);
    inp.addEventListener('click', nextClick);
}

function nextClick(e) {
    alert(e.currentTarget.value);
}

let inputsB = document.querySelectorAll('.inputs-b input');
inputsB.forEach(function (inp) {
    inp.addEventListener('click', firstClick);
});

// Завдання 1.5. Число словом -> квадрат
let words = {
    'нуль': 0, 'один': 1, 'два': 2, 'три': 3, 'чотири': 4, 'п\'ять': 5,
    'шість': 6, 'сім': 7, 'вісім': 8, 'дев\'ять': 9, 'десять': 10
};

let numbers = document.querySelectorAll('.numbers p');
numbers.forEach(function (p) {
    p.addEventListener('click', function () {
        if (this.dataset.done) return;
        let word = this.textContent.trim().toLowerCase();
        let n = words[word];
        this.textContent = word + ' → ' + n * n;
        this.dataset.done = '1';
    });
});

// Завдання 2. Чергування кольору блоку через зміну обробників
function paintRed(e) {
    let box = e.currentTarget;
    box.style.background = '#e74c3c';
    box.removeEventListener('click', paintRed);
    box.addEventListener('click', paintGreen);
}

function paintGreen(e) {
    let box = e.currentTarget;
    box.style.background = '#27ae60';
    box.removeEventListener('click', paintGreen);
    box.addEventListener('click', paintRed);
}

let boxes = document.querySelectorAll('.box');
boxes.forEach(function (box) {
    box.addEventListener('click', paintRed);
});
