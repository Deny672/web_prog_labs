// дні тижня (getDay: 0 - неділя) і місяці в родовому відмінку
const days = ['неділя', 'понеділок', 'вівторок', 'середа', 'четвер', "п'ятниця", 'субота'];
const months = ['січня', 'лютого', 'березня', 'квітня', 'травня', 'червня',
    'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня'];

// додає нуль спереду, щоб було дві цифри
function pad(n) {
    return n < 10 ? '0' + n : '' + n;
}


// ===== Завдання 1. Поточний час =====

function currentTime() {
    let d = new Date();
    let time = pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
    return time + ', ' + days[d.getDay()] + ', ' + pad(d.getDate()) + ' ' +
        months[d.getMonth()] + ' ' + d.getFullYear() + ' року';
}

function runTime() {
    let text = currentTime();
    document.getElementById('out1').textContent = text;
    console.log(text);
}


// ===== Завдання 2. Гра "Вгадай число" =====

// дата і час для рядка в консолі: 02.03.2025 16:01:33
function stamp() {
    let d = new Date();
    return pad(d.getDate()) + '.' + pad(d.getMonth() + 1) + '.' + d.getFullYear() + ' ' +
        pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
}

// підказка за величиною відхилення
function hint(diff) {
    if (diff <= 3) return 'гаряче';
    if (diff <= 10) return 'тепло';
    return 'холодно';
}

function playGuess() {
    do {
        let secret = Math.floor(Math.random() * 51); // 0..50
        let tries = 0;
        let win = false;

        while (true) {
            let answer = prompt('Вгадайте число від 0 до 50:');
            if (answer === null) return; // натиснули "Скасувати" - виходимо з гри
            let num = Number(answer);
            if (!Number.isInteger(num) || num < 0 || num > 50) {
                alert('Введіть ціле число від 0 до 50');
                continue;
            }

            tries++;
            if (num === secret) {
                console.log(stamp() + ' Спроба ' + tries + ': число ' + num + ' - вірно');
                win = true;
                break;
            }

            let diff = Math.abs(num - secret);
            console.log(stamp() + ' Спроба ' + tries + ': число ' + num + ' - не вірно');
            alert('Не вгадали, ' + hint(diff) + '. Спробуйте ще раз.');
        }

        if (win) {
            alert('За ' + tries + ' спроб ви вгадали число ' + secret);
        }
    } while (confirm('Зіграти ще раз?'));
}
