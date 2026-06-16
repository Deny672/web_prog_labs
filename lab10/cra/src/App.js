import './App.css';
import HobbyTitle from './HobbyTitle';
import HobbyDetails from './HobbyDetails';

// Збираємо класову і функціональну компоненти по центру сторінки
function App() {
    return (
        <main className="center">
            <HobbyTitle />
            <HobbyDetails />
        </main>
    );
}

export default App;
