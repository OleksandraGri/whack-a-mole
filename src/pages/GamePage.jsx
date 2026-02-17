import React from 'react';
import MoleHole from '../components/MoleHole';

// Чистий компонент, який приймає дані та функцію onWhack через пропси
const GamePage = ({ score, timeLeft, activeMoleIndex, HOLE_COUNT, onWhack }) => {

    // Створюю масив з потрібною кількістю отворів
    const holes = Array(HOLE_COUNT).fill(null);

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h2>🕹️ ГРА ТРИВАЄ 🕹️</h2>
            <div style={{ display: 'flex', justifyContent: 'space-around', margin: '20px 0', border: '1px solid #eee', padding: '10px', borderRadius: '5px' }}>
                <h3>Очки: <span style={{ color: 'green', fontWeight: 'bold' }}>{score}</span></h3>
                <h3>Залишилось: <span style={{ color: timeLeft <= 5 ? 'red' : 'blue', fontWeight: 'bold' }}>{timeLeft}</span> сек</h3>
            </div>

            {/* Ігрове поле (Grid) */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '10px',
                maxWidth: '350px',
                margin: '20px auto',
                padding: '10px',
                backgroundColor: '#6b4f4f',
                borderRadius: '10px',
            }}>
                {holes.map((_, index) => (
                    <MoleHole
                        key={index}
                        // Кріт активний, якщо його індекс дорівнює активному індексу з хука
                        isMoleUp={index === activeMoleIndex}
                        // При натисканні викликаємо функцію удару з індексом отвору
                        onWhack={() => onWhack(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default GamePage;