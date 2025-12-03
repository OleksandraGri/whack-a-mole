import React from 'react';
import Button from '../components/Button';

// Приймає функцію для переходу на сторінку гри
const StartPage = ({ onStartGame }) => {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>🎯 Удар по Кроту 🎯</h1>
            <p>Ласкаво просимо! Ваше завдання — встигнути вдарити крота, поки він не зник.</p>
            <Button onClick={onStartGame}>Почати Гру</Button>
        </div>
    );
};

export default StartPage;