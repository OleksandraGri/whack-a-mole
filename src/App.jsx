import React, { useState } from 'react';
import StartPage from './pages/StartPage';
import GamePage from './pages/GamePage';
import ResultsPage from './pages/ResultsPage';
import { useWhackAMoleGame } from './hooks/useWhackAMoleGame';

// Плейсхолдери для базових станів
const GAME_STAGES = {
    START: 'start',
    GAME: 'game',
    RESULTS: 'results',
};

function App() {
    // Викликаємо кастомний хук, отримуючи весь стан і керуючі функції
    const {
        stage,
        score,
        timeLeft,
        activeMoleIndex,
        HOLE_COUNT,
        startGame,
        whackMole,
        restartGame,
        GAME_STAGES,
    } = useWhackAMoleGame();

    const renderStage = () => {
        switch (stage) {
            case GAME_STAGES.START:
                return <StartPage onStartGame={startGame} />;
            case GAME_STAGES.GAME:
                // Передаємо необхідні дані та функції на сторінку гри
                return (
                    <GamePage
                        score={score}
                        timeLeft={timeLeft}
                        activeMoleIndex={activeMoleIndex}
                        HOLE_COUNT={HOLE_COUNT}
                        onWhack={whackMole}
                    />
                );
            case GAME_STAGES.RESULTS:
                return <ResultsPage finalScore={score} onRestartGame={restartGame} />;
            default:
                return <StartPage onStartGame={startGame} />;
        }
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', border: '1px solid #ccc', padding: '20px' }}>
            {renderStage()}
        </div>
    );
}

export default App;