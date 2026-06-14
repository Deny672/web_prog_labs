// Допоміжна функція для виводу результату під завданням
function show(id, text) {
    document.getElementById(id).textContent = text;
}

// 1. Залишок від ділення на 60
function seconds(total) {
    return total % 60;
}
function run1() {
    show('out1', 'seconds(125) = ' + seconds(125) + '\nseconds(60) = ' + seconds(60));
}

// 2. Периметр правильного багатокутника
function perimeter(side, count) {
    return side * count;
}
function run2() {
    show('out2', 'perimeter(5, 6) = ' + perimeter(5, 6));
}

// 3. FizzBuzz
function fizzbuzz(n) {
    let lines = [];
    for (let i = 1; i <= n; i++) {
        if (i % 15 === 0) {
            lines.push('fizzbuzz');
        } else if (i % 3 === 0) {
            lines.push('fizz');
        } else if (i % 5 === 0) {
            lines.push('buzz');
        } else {
            lines.push(i);
        }
    }
    return lines;
}
function run3() {
    let res = fizzbuzz(20);
    console.log(res.join('\n'));
    show('out3', res.join(', '));
}

// 4. Середнє арифметичне трьох чисел
function Calculate(a, b, c) {
    return (a + b + c) / 3;
}
function run4() {
    show('out4', 'Calculate(10, 20, 30) = ' + Calculate(10, 20, 30));
}

// 5. Чи ділиться n на x і y (три способи)
function isDivisibleIf(n, x, y) {
    if (n % x === 0 && n % y === 0) {
        return true;
    } else {
        return false;
    }
}
function isDivisibleTernary(n, x, y) {
    return (n % x === 0 && n % y === 0) ? true : false;
}
function isDivisiblePlain(n, x, y) {
    return n % x === 0 && n % y === 0;
}
function run5() {
    let n = 24, x = 2, y = 3;
    show('out5',
        'через if:        ' + isDivisibleIf(n, x, y) + '\n' +
        'тернарний:       ' + isDivisibleTernary(n, x, y) + '\n' +
        'без if/тернарного: ' + isDivisiblePlain(n, x, y));
}

// 6. Статистика масиву
function randomArray(size) {
    let arr = [];
    for (let i = 0; i < size; i++) {
        arr.push(Math.floor(Math.random() * 41) - 20); // від -20 до 20
    }
    return arr;
}
function run6() {
    let arr = randomArray(10);
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    let odd = arr.filter(function (x) {
        return x % 2 !== 0;
    });
    show('out6',
        'Масив:    [' + arr.join(', ') + ']\n' +
        'Максимум: ' + Math.max(...arr) + '\n' +
        'Мінімум:  ' + Math.min(...arr) + '\n' +
        'Сума:     ' + sum + '\n' +
        'Середнє:  ' + (sum / arr.length) + '\n' +
        'Непарні:  [' + odd.join(', ') + ']');
}

// 7. Матриця 5x5, обробка головної діагоналі
function run7() {
    let m = [];
    for (let i = 0; i < 5; i++) {
        let row = [];
        for (let j = 0; j < 5; j++) {
            row.push(Math.floor(Math.random() * 19) - 9); // від -9 до 9
        }
        m.push(row);
    }

    let before = matrixToText(m);

    for (let i = 0; i < 5; i++) {
        if (m[i][i] < 0) {
            m[i][i] = 0;
        } else if (m[i][i] > 0) {
            m[i][i] = 1;
        }
    }

    show('out7', 'До:\n' + before + '\n\nПісля:\n' + matrixToText(m));
}
function matrixToText(m) {
    return m.map(function (row) {
        return row.map(function (v) {
            return String(v).padStart(3, ' ');
        }).join(' ');
    }).join('\n');
}

// 8. Арифметичні операції
function Add(a, b) { return a + b; }
function Sub(a, b) { return a - b; }
function Mul(a, b) { return a * b; }
function Div(a, b) {
    if (b === 0) {
        return 'Ділення на нуль неможливе';
    }
    return a / b;
}
function run8(op) {
    let a = Number(document.getElementById('numA').value);
    let b = Number(document.getElementById('numB').value);
    let result;
    if (op === '+') result = Add(a, b);
    else if (op === '-') result = Sub(a, b);
    else if (op === '*') result = Mul(a, b);
    else result = Div(a, b);
    show('out8', a + ' ' + op + ' ' + b + ' = ' + result);
}

// 9. Аналіз числа
function isPrime(n) {
    if (n < 2) return false;
    for (let i = 2; i < n; i++) {
        if (n % i === 0) return false;
    }
    return true;
}
function run9() {
    let n = Number(document.getElementById('num9').value);
    let divisors = [2, 5, 3, 6, 9].filter(function (d) {
        return n % d === 0;
    });
    show('out9',
        'Число: ' + n + '\n' +
        'Знак: ' + (n > 0 ? 'позитивне' : (n < 0 ? 'негативне' : 'нуль')) + '\n' +
        'Просте: ' + (isPrime(n) ? 'так' : 'ні') + '\n' +
        'Ділиться без залишку на: ' + (divisors.length ? divisors.join(', ') : 'жодне з 2,5,3,6,9'));
}

// 10. Перевернути масив, числа підняти до квадрату
function reverseAndSquare(arr) {
    let reversed = arr.slice().reverse();
    return reversed.map(function (item) {
        return typeof item === 'number' ? item * item : item;
    });
}
function run10() {
    let arr = [2, 'hello', 5, true, 3];
    show('out10',
        'Вхід:  [' + arr.join(', ') + ']\n' +
        'Вихід: [' + reverseAndSquare(arr).join(', ') + ']');
}

// 11. Видалення дублікатів
function removeDuplicates(arr) {
    return arr.filter(function (item, index) {
        return arr.indexOf(item) === index;
    });
}
function run11() {
    let arr = [1, 2, 2, 4, 5, 4, 7, 8, 7, 3, 6];
    show('out11',
        'Вхід:  [' + arr.join(', ') + ']\n' +
        'Вихід: [' + removeDuplicates(arr).join(', ') + ']');
}
