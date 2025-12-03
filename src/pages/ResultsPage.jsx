import React from 'react';
import Button from '../components/Button';

// Приймає фінальний результат та функцію для початку нової гри
const ResultsPage = ({ finalScore, onRestartGame }) => {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>🏆 Результати Гри 🏆</h1>
            <p>Ваш фінальний рахунок:</p>
            <h2>{finalScore} очок (плейсхолдер)</h2>
            <Button onClick={onRestartGame}>Грати Знову</Button>
        </div>
    );
};

export default ResultsPage;