import React, { useState } from 'react';
import StartPage from './pages/StartPage';
import GamePage from './pages/GamePage';
import ResultsPage from './pages/ResultsPage';

// Плейсхолдери для базових станів
const GAME_STAGES = {
    START: 'start',
    GAME: 'game',
    RESULTS: 'results',
};

function App() {
    // Базовий стан для управління поточною сторінкою/етапом гри
    const [currentStage, setCurrentStage] = useState(GAME_STAGES.START);

    // Плейсхолдери для майбутньої бізнес-логіки
    const [score, setScore] = useState(0);
    const [time, setTime] = useState(60);

    // Функції для переходу між сторінками
    const handleStartGame = () => {
        // Тут буде логіка ініціалізації гри
        setScore(0);
        setTime(60);
        setCurrentStage(GAME_STAGES.GAME);
    };

    const handleGameOver = () => {
        // Тут буде логіка завершення гри
        setCurrentStage(GAME_STAGES.RESULTS);
    };

    const handleRestartGame = () => {
        setCurrentStage(GAME_STAGES.START);
    };

    // Логіка відображення поточної сторінки
    const renderStage = () => {
        switch (currentStage) {
            case GAME_STAGES.START:
                return <StartPage onStartGame={handleStartGame} />;
            case GAME_STAGES.GAME:
                return (
                    <GamePage
                        score={score}
                        time={time}
                        onGameOver={handleGameOver}
                    />
                );
            case GAME_STAGES.RESULTS:
                return <ResultsPage finalScore={score} onRestartGame={handleRestartGame} />;
            default:
                return <StartPage onStartGame={handleStartGame} />;
        }
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', border: '1px solid #ccc', padding: '20px' }}>
            {renderStage()}
        </div>
    );
}

export default App;