import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { GameProvider, useGame } from './context/GameContext';
import StartPage from './pages/StartPage';
import GamePage from './pages/GamePage';
import ResultsPage from './pages/ResultsPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import Modal from './components/Modal';
import './App.css';

const AppContent = () => {
    const { stage, score, startGame, restartGame, GAME_STAGES, endGame } = useGame();

    const [showModal, setShowModal] = React.useState(false);

    React.useEffect(() => {
        if (stage === GAME_STAGES.RESULTS) {
            setShowModal(true);
        } else {
            setShowModal(false);
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

    return (
        <div className="app-container">
            <nav className="main-nav">
                <Link to="/">Головна</Link>
                <Link to="/user/42">Профіль користувача</Link>
                <Link to="/settings">Налаштування</Link>
                {stage === GAME_STAGES.GAME && <span className="game-status">Гра триває...</span>}
            </nav>

            <main className="main-content">
                <Routes>
                    <Route path="/" element={<StartPage />} />
                    <Route path="/game" element={<GamePage />} />
                    <Route path="/results" element={<ResultsPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/user/:userId" element={<ProfilePage />} />
                    <Route path="*" element={<h1>404 | Сторінка не знайдена</h1>} />
                </Routes>
            </main>

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
        <BrowserRouter>
            <GameProvider>
                <AppContent />
            </GameProvider>
        </BrowserRouter>
    )
}

export default App;