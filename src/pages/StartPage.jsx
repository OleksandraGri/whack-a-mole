import React from 'react';
import Button from '../components/Button';

const StartPage = ({ onStartGame, onOpenSettings }) => {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>🎯 Удар по Кроту 🎯</h1>
            <p>Ласкаво просимо! Ваше завдання — встигнути вдарити крота, поки він не зник.</p>
            <Button onClick={onStartGame}>Почати Гру</Button>
            <Button onClick={onOpenSettings} style={{ backgroundColor: '#2196F3' }}>Налаштування</Button>
        </div>
    );
};

export default StartPage;