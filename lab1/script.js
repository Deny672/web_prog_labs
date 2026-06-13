// Завдання 1. Прості числа від 0 до 100 через while
function primes() {
    let result = [];
    let n = 2;
    while (n <= 100) {
        let isPrime = true;
        let d = 2;
        while (d < n) {
            if (n % d === 0) {
                isPrime = false;
                break;
            }
            d++;
        }
        if (isPrime) {
            result.push(n);
        }
        n++;
    }
    document.getElementById('out1').textContent = result.join(', ');
    console.log(result);
}

// Завдання 2. Числа 0..10 з підписом парне/непарне через do...while
function parity() {
    let i = 0;
    let text = '';
    do {
        if (i === 0) {
            text += '0 – це нуль\n';
        } else if (i % 2 === 0) {
            text += i + ' – парне число\n';
        } else {
            text += i + ' – непарне число\n';
        }
        i++;
    } while (i <= 10);
    document.getElementById('out2').textContent = text;
    console.log(text);
}

// Завдання 3. Ділимо 10000 на 2 поки не стане менше 50
function divide() {
    let result = 10000;
    let counter = 0;
    while (result >= 50) {
        result = result / 2;
        counter++;
    }
    console.log('result =', result);
    console.log('counter =', counter);
    document.getElementById('out3').textContent =
        'result = ' + result + '\ncounter = ' + counter + '\n(детальніше в консолі)';
}

// Завдання 4. Пора року і назва місяця
function month() {
    let month = Number(prompt('Введіть номер місяця (1-12):'));
    if (!month || month < 1 || month > 12) {
        alert('Невірне число');
        return;
    }

    let names = ['січень', 'лютий', 'березень', 'квітень', 'травень', 'червень',
                 'липень', 'серпень', 'вересень', 'жовтень', 'листопад', 'грудень'];

    let season;
    if (month === 12 || month === 1 || month === 2) {
        season = 'зима';
    } else if (month >= 3 && month <= 5) {
        season = 'весна';
    } else if (month >= 6 && month <= 8) {
        season = 'літо';
    } else {
        season = 'осінь';
    }

    alert('Місяць ' + names[month - 1] + ', пора року — ' + season);
}

// Завдання 5. Цельсій -> Фаренгейт
function toFahrenheit() {
    let tc = Number(prompt('Введіть температуру в градусах Цельсія:'));
    let tf = (9 / 5) * tc + 32;
    alert(tc + ' °C = ' + tf + ' °F');
}

// Завдання 6. День тижня за номером
function weekday() {
    let num = Number(prompt('Введіть число від 1 до 7:'));
    let days = ['понеділок', 'вівторок', 'середа', 'четвер', "п'ятниця", 'субота', 'неділя'];

    if (num >= 1 && num <= 7) {
        document.getElementById('out6').textContent = 'День тижня: ' + days[num - 1];
    } else {
        document.getElementById('out6').textContent = 'Число повинно бути від 1 до 7';
    }
}
