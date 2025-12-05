import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { useGame } from '../context/GameContext';

const StartPage = () => {
    const navigate = useNavigate();
    const { startGame } = useGame();

    const handleStart = () => {
        startGame();
        navigate('/game');
    };

    return (
        <div className="page-center">
            <h1>🎯 Удар по Кроту 🎯</h1>
            <p>Ласкаво просимо! Ваше завдання — встигнути вдарити крота, поки він не зник.</p>
            <Button onClick={handleStart}>Почати Гру</Button>
        </div>
    );
};

export default StartPage;