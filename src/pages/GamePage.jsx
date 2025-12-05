import React from 'react';
import MoleHole from '../components/MoleHole';
import { useGame } from '../context/GameContext';

const GamePage = () => {
    const { score, timeLeft, activeMoleIndex, HOLE_COUNT, whackMole, endGame } = useGame();
    const holes = Array(HOLE_COUNT).fill(null);
    const columns = Math.sqrt(HOLE_COUNT);

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: '10px',
        maxWidth: '500px',
        margin: '20px auto',
        padding: '10px',
        backgroundColor: '#6b4f4f',
        borderRadius: '10px',
    };

    if (HOLE_COUNT === 12) {
        gridStyle.gridTemplateColumns = `repeat(4, 1fr)`;
    }

    return (
        <div className="page-center">
            <h2>🕹️ ГРА ТРИВАЄ 🕹️</h2>
            <div className="game-stats-panel">
                <h3>Очки: <span style={{ color: 'green', fontWeight: 'bold' }}>{score}</span></h3>
                <h3>Залишилось: <span style={{ color: timeLeft <= 5 ? 'red' : 'blue', fontWeight: 'bold' }}>{timeLeft}</span> сек</h3>
            </div>

            {/* Ігрове поле */}
            <div style={gridStyle}>
                {holes.map((_, index) => (
                    <MoleHole
                        key={index}
                        isMoleUp={index === activeMoleIndex}
                        onWhack={() => whackMole(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default GamePage;