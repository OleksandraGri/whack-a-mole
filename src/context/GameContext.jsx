import React, { createContext, useContext } from 'react';
import { useWhackAMoleGame } from '../hooks/useWhackAMoleGame';
import useGameStore from '../store/useGameStore';

const GameContext = createContext();

// Кастомний хук для доступу до контексту
export const useGame = () => useContext(GameContext);

// Провайдер контексту
export const GameProvider = ({ children }) => {
    // 1. Налаштування з Zustand Store
    const settings = useGameStore((state) => state.settings);
    const updateSettings = useGameStore((state) => state.updateSettings);
    const addResult = useGameStore((state) => state.addResult);

    // 2. Інтеграція логіки гри, передаючи налаштування з Zustand
    const gameLogic = useWhackAMoleGame(settings);

    // 3. Функція оновлення налаштувань (через Zustand)
    const handleUpdateSettings = (newSettings) => {
        updateSettings(newSettings);
        gameLogic.restartGame();
    };

    // 4. Значення, яке надаємо через контекст
    const contextValue = {
        settings,
        updateSettings: handleUpdateSettings,
        addResult,
        ...gameLogic,
    };

    return (
        <GameContext.Provider value={contextValue}>
            {children}
        </GameContext.Provider>
    );
};