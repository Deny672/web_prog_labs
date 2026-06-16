import React from 'react';

// Класова компонента - заголовок і вступ про хоббі
class HobbyTitle extends React.Component {
    render() {
        return (
            <div className="block">
                <h1>Моє хоббі - фотографія</h1>
                <p>
                    Знімати я почав ще в школі зі звичайного телефону, а зараз
                    знімаю на дзеркальну камеру. Найбільше люблю вуличну зйомку
                    і пейзажі на світанку.
                </p>
            </div>
        );
    }
}

export default HobbyTitle;
