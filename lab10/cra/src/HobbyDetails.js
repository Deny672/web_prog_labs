// Функціональна компонента - чому мені це подобається
function HobbyDetails() {
    const reasons = [
        'Можна зупинити цікавий момент і залишити його на згадку',
        'Це привід більше гуляти і подорожувати',
        'Постійно вчишся бачити світло і композицію'
    ];
    return (
        <div className="block">
            <h2>Чому мені це подобається</h2>
            <ul>
                {reasons.map((text, i) => <li key={i}>{text}</li>)}
            </ul>
        </div>
    );
}

export default HobbyDetails;
