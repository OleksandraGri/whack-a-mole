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

export const useWhackAMoleGame = () => {
    // 1. Стан програми
    const [stage, setStage] = useState(GAME_STAGES.START);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
    // Індекс отвору, де кріт зараз вискочив
    const [activeMoleIndex, setActiveMoleIndex] = useState(null);

    // 2. Функції управління (використовую useCallback для оптимізації)
    const endGame = useCallback(() => {
        setStage(GAME_STAGES.RESULTS);
        setActiveMoleIndex(null);
    }, []);

    const startGame = () => {
        setScore(0);
        setTimeLeft(INITIAL_TIME);
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
            // Випадково обираю новий індекс отвору (від 0 до 8)
            const randomIndex = Math.floor(Math.random() * HOLE_COUNT);
            setActiveMoleIndex(randomIndex);

            // Кріт зникає через короткий час
            const hideTimeout = setTimeout(() => {
                // Прибираю крота, якщо його не вдарили
                setActiveMoleIndex(null);
            }, 800);

            return () => clearTimeout(hideTimeout);
        };

        // Інтервал, який викликає функцію спауну
        const spawnInterval = setInterval(spawnMole, MOLE_SPAWN_INTERVAL);

        return () => clearInterval(spawnInterval);
    }, [stage]);

    // 5. Логіка Удару (Whack)
    const whackMole = useCallback((holeIndex) => {
        // Перевіряємо, чи був успішний удар
        if (holeIndex === activeMoleIndex) {
            setScore(prevScore => prevScore + 1);
            setActiveMoleIndex(null); // Кріт зникає після удару
        }
    }, [activeMoleIndex]); // Залежить від поточного активного крота

    // Повертаю всі стани та функції, необхідні для роботи компонентів
    return {
        score,
        timeLeft,
        activeMoleIndex,
        HOLE_COUNT,
        stage,
        startGame,
        whackMole,
        restartGame,
        GAME_STAGES
    };
};