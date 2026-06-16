// ===== Завдання 1. День тижня з одного об'єкта =====

const week = {
    ua: {
        ask: 'Введіть номер дня тижня від 1 до 7?',
        wrong: 'Неправильний ввід даних',
        days: ['Понеділок', 'Вівторок', 'Середа', 'Четвер', "П'ятниця", 'Субота', 'Неділя']
    },
    en: {
        ask: 'Enter the day number of the week (from 1 to 7)?',
        wrong: 'Invalid input',
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    }
};

function runDayOfWeek() {
    let lang;
    // вибір мови, повторюємо поки не введуть ua або en
    while (true) {
        let answer = prompt('Виберіть мову "ua" або "en"?');
        if (answer === null) return;
        answer = answer.trim().toLowerCase();
        if (answer === 'ua' || answer === 'en') {
            lang = answer;
            break;
        }
        alert('Неправильний ввід даних');
    }

    // вибір дня, теж з перевіркою діапазону
    let day;
    while (true) {
        let answer = prompt(week[lang].ask);
        if (answer === null) return;
        day = Number(answer);
        if (Number.isInteger(day) && day >= 1 && day <= 7) {
            break;
        }
        alert(week[lang].wrong);
    }

    alert(week[lang].days[day - 1]);
}


// ===== Завдання 2. Електрична мережа (ООП) =====

class PowerStation {
    constructor(power) {
        this.power = power; // МВт
    }
    produce() {
        return this.power; // однаково вдень і вночі
    }
}

class SolarPanel {
    constructor(power) {
        this.power = power; // МВт вдень
    }
    produce(time) {
        return time === 'day' ? this.power : 0;
    }
}

class House {
    constructor(apartments) {
        this.apartments = apartments;
    }
    consume(time) {
        let perFlat = time === 'day' ? 4 : 1;     // кВт на квартиру
        return this.apartments * perFlat / 1000;  // переводимо у МВт
    }
}

class PowerLine {
    constructor(capacity, price) {
        this.capacity = capacity; // скільки МВт можна передати
        this.price = price;       // ціна за один мегават
    }
}

class Network {
    constructor() {
        this.producers = [];
        this.houses = [];
        this.lines = [];
    }

    add(item) {
        if (item instanceof House) {
            this.houses.push(item);
        } else if (item instanceof PowerLine) {
            this.lines.push(item);
        } else {
            this.producers.push(item);
        }
    }

    // передача потрібного обсягу по лініях (вже відсортованих)
    transfer(lines, amount) {
        let moved = 0;
        let money = 0;
        for (let line of lines) {
            if (amount <= 0) break;
            let take = Math.min(line.capacity, amount);
            moved += take;
            money += take * line.price;
            amount -= take;
        }
        return { moved: moved, money: money };
    }

    balance(time) {
        let production = 0;
        this.producers.forEach(p => production += p.produce(time));

        let consumption = 0;
        this.houses.forEach(h => consumption += h.consume(time));

        let net = production - consumption;
        let info = { production: production, consumption: consumption };

        if (net < 0) {
            // не вистачає — купуємо по найдешевших лініях
            let lines = this.lines.slice().sort((a, b) => a.price - b.price);
            let res = this.transfer(lines, -net);
            info.action = 'купити';
            info.amount = res.moved;
            info.money = res.money;
        } else if (net > 0) {
            // зайве — продаємо по найдорожчих лініях
            let lines = this.lines.slice().sort((a, b) => b.price - a.price);
            let res = this.transfer(lines, net);
            info.action = 'продати';
            info.amount = res.moved;
            info.money = res.money;
        } else {
            info.action = 'баланс';
            info.amount = 0;
            info.money = 0;
        }
        return info;
    }
}

function runNetwork() {
    let net = new Network();

    // склад мережі
    net.add(new PowerStation(2));
    net.add(new SolarPanel(1));
    net.add(new House(400));
    net.add(new House(400));
    net.add(new House(200));
    net.add(new PowerLine(50, 2));
    net.add(new PowerLine(30, 3));

    let text = '';
    [['day', 'Вдень'], ['night', 'Вночі']].forEach(function (pair) {
        let time = pair[0];
        let label = pair[1];
        let b = net.balance(time);

        text += label + ':\n';
        text += '  вироблено: ' + b.production + ' МВт\n';
        text += '  спожито:   ' + b.consumption + ' МВт\n';

        if (b.action === 'купити') {
            text += '  треба купити ' + b.amount + ' МВт, витрати ' + b.money + ' у.о.\n\n';
        } else if (b.action === 'продати') {
            text += '  можна продати ' + b.amount + ' МВт, прибуток ' + b.money + ' у.о.\n\n';
        } else {
            text += '  мережа збалансована\n\n';
        }
    });

    document.getElementById('out2').textContent = text;
    console.log(text);
}
