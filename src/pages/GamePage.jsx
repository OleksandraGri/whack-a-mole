import React from 'react';
import MoleHole from '../components/MoleHole';

// Приймає функцію для завершення гри та базові стани
const GamePage = ({ score, time, onGameOver }) => {
    // Плейсхолдер для 9 отворів. У майбутньому це буде масив стану.
    const holes = Array(9).fill(false);
    holes[4] = true; // Для прикладу, кріт вискочив в 5-му отворі

    const handleWhack = (index) => {
        console.log(`Удар по кроту в отворі ${index + 1}!`);
        // Тут буде логіка нарахування очок
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h2>🕹️ Гра триває 🕹️</h2>
            <div style={{ display: 'flex', justifyContent: 'space-around', margin: '20px 0' }}>
                <h3>Очки: {score} (плейсхолдер)</h3>
                <h3>Час: {time} сек (плейсхолдер)</h3>
            </div>

            {/* Ігрове поле (Grid) */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '10px',
                maxWidth: '350px',
                margin: '0 auto'
            }}>
                {holes.map((isUp, index) => (
                    <MoleHole
                        key={index}
                        isMoleUp={isUp}
                        onWhack={() => handleWhack(index)}
                    />
                ))}
            </div>

            <button onClick={onGameOver} style={{ marginTop: '20px' }}>
                Завершити Гру (Тест)
            </button>
        </div>
    );
};

export default GamePage;