// React через CDN без збірки, тому замість JSX використовуємо React.createElement.
const e = React.createElement;

// Класова компонента - заголовок і вступ про хоббі
class HobbyTitle extends React.Component {
    render() {
        return e('div', { className: 'block' },
            e('h1', null, 'Моє хоббі - фотографія'),
            e('p', null,
                'Знімати я почав ще в школі зі звичайного телефону, а зараз ' +
                'знімаю на дзеркальну камеру. Найбільше люблю вуличну зйомку ' +
                'і пейзажі на світанку.')
        );
    }
}

// Функціональна компонента - чому мені це подобається
function HobbyDetails() {
    const reasons = [
        'Можна зупинити цікавий момент і залишити його на згадку',
        'Це привід більше гуляти і подорожувати',
        'Постійно вчишся бачити світло і композицію'
    ];
    return e('div', { className: 'block' },
        e('h2', null, 'Чому мені це подобається'),
        e('ul', null, reasons.map((text, i) => e('li', { key: i }, text)))
    );
}

// Головна компонента збирає обидві разом
function App() {
    return e('main', { className: 'center' },
        e(HobbyTitle, null),
        e(HobbyDetails, null)
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(e(App, null));
