import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { GameProvider, useGame } from './context/GameContext';
import useGameStore from './store/useGameStore';
import StartPage from './pages/StartPage';
import GamePage from './pages/GamePage';
import ResultsPage from './pages/ResultsPage';
import SettingsPage from './pages/SettingsPage';
import ResultsTablePage from './pages/ResultsTablePage';
import ProfilePage from './pages/ProfilePage';
import Modal from './components/Modal';
import CookieConsent from 'react-cookie-consent';
import './App.css';

const AppContent = () => {
    const { stage, score, startGame, restartGame, GAME_STAGES, endGame } = useGame();
    const addResult = useGameStore((state) => state.addResult);

    const [showModal, setShowModal] = React.useState(false);

    React.useEffect(() => {
        if (stage === GAME_STAGES.RESULTS) {
            addResult(score);
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
                <Link to="/results-table">Таблиця результатів</Link>
                {stage === GAME_STAGES.GAME && <span className="game-status">Гра триває...</span>}
            </nav>

            <main className="main-content">
                <Routes>
                    <Route path="/" element={<StartPage />} />
                    <Route path="/game" element={<GamePage onGameOver={endGame} />} />
                    <Route path="/results" element={<ResultsPage finalScore={score} onRestartGame={restartGame} />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/results-table" element={<ResultsTablePage />} />
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

            <CookieConsent
                location="bottom"
                buttonText="Прийняти"
                cookieName="moleGameCookie"
                style={{ background: '#2B373B' }}
                buttonStyle={{ color: '#4e503b', fontSize: '13px', borderRadius: '5px' }}
            >
                Цей сайт використовує localStorage для збереження ваших ігрових результатів.
            </CookieConsent>
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