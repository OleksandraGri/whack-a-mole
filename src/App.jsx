import React, { useState } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import StartPage from './pages/StartPage';
import GamePage from './pages/GamePage';
import ResultsPage from './pages/ResultsPage';
import { useWhackAMoleGame } from './hooks/useWhackAMoleGame';
import SettingsPage from './pages/SettingsPage';
import Modal from './components/Modal';

const AppRouter = () => {
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
        endGame,
    } = useGame();

    const [showSettings, setShowSettings] = React.useState(false);
    const [showModal, setShowModal] = React.useState(false);

    React.useEffect(() => {
        if (stage === GAME_STAGES.RESULTS) {
            setShowModal(true);
        }
    }, [stage, GAME_STAGES.RESULTS]);

    const handleRestart = (newGame) => {
        setShowModal(false);
        if (newGame) {
            restartGame();
        } else {
            startGame();
        }
    }

    const renderStage = () => {
        if (showSettings) {
            return <SettingsPage onGoBack={() => setShowSettings(false)} />;
        }

        switch (stage) {
            case GAME_STAGES.START:
                return <StartPage
                    onStartGame={startGame}
                    onOpenSettings={() => setShowSettings(true)}
                />;
            case GAME_STAGES.GAME:
                return (
                    <GamePage
                        score={score}
                        timeLeft={timeLeft}
                        activeMoleIndex={activeMoleIndex}
                        HOLE_COUNT={HOLE_COUNT}
                        onWhack={whackMole}
                        onGameOver={endGame}
                    />
                );
            case GAME_STAGES.RESULTS:
                return null;
            default:
                return <StartPage onStartGame={startGame} />;
        }
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', border: '1px solid #ccc', padding: '20px', backgroundColor: 'white', borderRadius: '10px' }}>
            {renderStage()}

            {showModal && stage === GAME_STAGES.RESULTS && (
                <Modal
                    score={score}
                    onRestartNew={handleRestart.bind(null, true)}
                    onRestartSame={handleRestart.bind(null, false)}
                />
            )}
        </div>
    );
};

function App() {
    return (
        <GameProvider>
            <AppRouter />
        </GameProvider>
    )
}

export default App;