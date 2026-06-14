// Front-сторона: відправляємо число на сервер через AJAX (XMLHttpRequest)
// і виводимо текстову інформацію про його квадрат.

const btn = document.getElementById('calcBtn');
const input = document.getElementById('number');
const result = document.getElementById('result');

btn.addEventListener('click', function () {
    const value = input.value.trim();

    if (value === '' || isNaN(value)) {
        result.textContent = 'Введіть коректне число';
        return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/square?number=' + value, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                result.textContent = 'Квадрат числа ' + data.number + ' дорівнює ' + data.square;
            } else {
                result.textContent = 'Помилка запиту до сервера';
            }
        }
    };

    xhr.send();
});
