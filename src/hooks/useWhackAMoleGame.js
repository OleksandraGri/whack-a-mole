import { useState, useEffect, useCallback } from 'react';

const INITIAL_TIME = 30; // Загальний час гри у секундах
const HOLE_COUNT = 9;    // Кількість отворів на полі
const MOLE_SPAWN_INTERVAL = 1000; // Кріт з'являється/змінюється кожні 1000 мс

// Перелік етапів гри для керування роутингом
const GAME_STAGES = {
    START: 'start',
    GAME: 'game',
    RESULTS: 'results',
};

export const useWhackAMoleGame = (settings) => {
    const { gameTime, holeCount, moleInterval } = settings;
    // 1. Стан програми
    const [stage, setStage] = useState(GAME_STAGES.START);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(gameTime);
    const [activeMoleIndex, setActiveMoleIndex] = useState(null);

    // 2. Функції управління (використовую useCallback для оптимізації)
    const endGame = useCallback(() => {
        setStage(GAME_STAGES.RESULTS);
        setActiveMoleIndex(null);
    }, []);

    const startGame = () => {
        setScore(0);
        setTimeLeft(gameTime); // Скидаю час відповідно до налаштувань
        setActiveMoleIndex(null);
        setStage(GAME_STAGES.GAME);
    };

    const restartGame = () => {
        setStage(GAME_STAGES.START);
    }

    // 3. Логіка Таймера (useEffect)
    useEffect(() => {
        if (stage !== GAME_STAGES.GAME) return;

        if (timeLeft <= 0) {
            endGame();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [stage, timeLeft, endGame]); // Залежності: етап, час, функція завершення

    // 4. Логіка Появи Крота (useEffect)
    useEffect(() => {
        if (stage !== GAME_STAGES.GAME) return;

        const spawnMole = () => {
            setActiveMoleIndex(null);

            const randomIndex = Math.floor(Math.random() * holeCount);
            setActiveMoleIndex(randomIndex);

            // Інтервал зникнення залежить від швидкості
            const hideTimeout = setTimeout(() => {
                setActiveMoleIndex(null);
            }, moleInterval * 0.8);

            return () => clearTimeout(hideTimeout);
        };

        // Інтервал спауну залежить від швидкості
        const spawnInterval = setInterval(spawnMole, moleInterval);

        return () => clearInterval(spawnInterval);
    }, [stage, holeCount, moleInterval]);

    // 5. Логіка Удару (Whack)
    const whackMole = useCallback((holeIndex) => {
        if (holeIndex === activeMoleIndex) {
            setScore(prevScore => prevScore + 1);
            setActiveMoleIndex(null);
        }
    }, [activeMoleIndex]);

    return {
        score,
        timeLeft,
        activeMoleIndex,
        HOLE_COUNT: holeCount,
        stage,
        startGame,
        whackMole,
        restartGame,
        endGame,
        GAME_STAGES
    };
};