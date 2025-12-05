import React, { createContext, useContext, useState, useEffect } from 'react';
import { useWhackAMoleGame } from '../hooks/useWhackAMoleGame';
import { defaultSettings } from '../config/validationSchema';

const GameContext = createContext();

// Кастомний хук для доступу до контексту
export const useGame = () => useContext(GameContext);

// Провайдер контексту
export const GameProvider = ({ children }) => {
    // 1. Стан налаштувань
    const [settings, setSettings] = useState(() => {
        const savedSettings = localStorage.getItem('whackAMoleSettings');
        return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
    });

    // 2. Інтеграція логіки гри, передаючи налаштування
    const gameLogic = useWhackAMoleGame(settings);

    // 3. Функція оновлення налаштувань і збереження в localStorage
    const updateSettings = (newSettings) => {
        setSettings(newSettings);
        localStorage.setItem('whackAMoleSettings', JSON.stringify(newSettings));
        gameLogic.restartGame();
    };

    // 4. Значення, яке надаємо через контекст
    const contextValue = {
        settings,
        updateSettings,
        ...gameLogic,
    };

    return (
        <GameContext.Provider value={contextValue}>
            {children}
        </GameContext.Provider>
    );
};