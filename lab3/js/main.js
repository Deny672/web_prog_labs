// Калькулятор. Усі елементи і стилі створюються через JavaScript.

// ---- стан калькулятора ----
let display = '0';
let firstOperand = null;
let operator = null;
let waitingForSecond = false;

// ---- створення розмітки ----
document.body.style.margin = '0';
document.body.style.minHeight = '100vh';
document.body.style.display = 'flex';
document.body.style.justifyContent = 'center';
document.body.style.alignItems = 'center';
document.body.style.background = '#2b2f36';
document.body.style.fontFamily = 'Arial, sans-serif';

let calc = document.createElement('div');
calc.style.width = 'min(320px, 92vw)';
calc.style.background = '#1c1f24';
calc.style.borderRadius = '12px';
calc.style.padding = '16px';
calc.style.boxShadow = '0 8px 24px rgba(0,0,0,0.4)';
document.body.appendChild(calc);

let screen = document.createElement('div');
screen.textContent = display;
screen.style.background = '#11141a';
screen.style.color = '#fff';
screen.style.fontSize = '34px';
screen.style.textAlign = 'right';
screen.style.padding = '14px 12px';
screen.style.borderRadius = '8px';
screen.style.marginBottom = '14px';
screen.style.overflow = 'hidden';
screen.style.whiteSpace = 'nowrap';
calc.appendChild(screen);

let grid = document.createElement('div');
grid.style.display = 'grid';
grid.style.gridTemplateColumns = 'repeat(4, 1fr)';
grid.style.gap = '8px';
calc.appendChild(grid);

// розкладка кнопок
let layout = ['C', '←', '%', '/',
              '7', '8', '9', '*',
              '4', '5', '6', '-',
              '1', '2', '3', '+',
              '0', '.', '='];

layout.forEach(function (label) {
    let btn = document.createElement('button');
    btn.textContent = label;
    btn.style.fontSize = '20px';
    btn.style.padding = '16px 0';
    btn.style.border = 'none';
    btn.style.borderRadius = '8px';
    btn.style.cursor = 'pointer';
    btn.style.color = '#fff';

    if ('+-*/%'.indexOf(label) !== -1) {
        btn.style.background = '#ec7a2c';      // операції
    } else if (label === '=') {
        btn.style.background = '#2d9c5a';       // дорівнює
    } else if (label === 'C' || label === '←') {
        btn.style.background = '#555b66';       // службові
    } else {
        btn.style.background = '#3a3f48';       // цифри
    }

    if (label === '0') {
        btn.style.gridColumn = 'span 2';        // нуль на дві колонки
    }

    btn.addEventListener('click', function () {
        press(label);
    });
    grid.appendChild(btn);
});

// ---- логіка ----
function press(key) {
    if (key >= '0' && key <= '9') {
        inputDigit(key);
    } else if (key === '.') {
        inputDot();
    } else if (key === 'C') {
        clearAll();
    } else if (key === '←') {
        backspace();
    } else if (key === '=') {
        equals();
    } else {
        chooseOperator(key);
    }
    screen.textContent = display;
}

function inputDigit(d) {
    if (waitingForSecond) {
        display = d;
        waitingForSecond = false;
    } else {
        display = display === '0' ? d : display + d;
    }
}

function inputDot() {
    if (waitingForSecond) {
        display = '0.';
        waitingForSecond = false;
        return;
    }
    if (display.indexOf('.') === -1) {
        display += '.';
    }
}

function chooseOperator(op) {
    let value = parseFloat(display);
    if (operator !== null && waitingForSecond) {
        operator = op;            // просто змінили операцію
        return;
    }
    if (firstOperand === null) {
        firstOperand = value;
    } else if (operator) {
        let res = calculate(firstOperand, value, operator);
        display = String(res);
        firstOperand = res;
    }
    operator = op;
    waitingForSecond = true;
}

function equals() {
    if (operator === null || waitingForSecond) {
        return;
    }
    let value = parseFloat(display);
    let res = calculate(firstOperand, value, operator);
    display = String(res);
    firstOperand = null;
    operator = null;
    waitingForSecond = true;
}

function calculate(a, b, op) {
    let r;
    if (op === '+') r = a + b;
    else if (op === '-') r = a - b;
    else if (op === '*') r = a * b;
    else if (op === '/') r = b === 0 ? 'Помилка' : a / b;
    else if (op === '%') r = a % b;
    // округлення довгих дробів
    if (typeof r === 'number') {
        r = Math.round(r * 1e8) / 1e8;
    }
    return r;
}

function clearAll() {
    display = '0';
    firstOperand = null;
    operator = null;
    waitingForSecond = false;
}

function backspace() {
    if (display === 'Помилка') {
        clearAll();
        return;
    }
    display = display.length > 1 ? display.slice(0, -1) : '0';
}
