import { create } from 'zustand';

// --- Початкові значення ---
const defaultSettings = {
  gameTime: 30,
  holeCount: 9,
  moleInterval: 1000,
};

const getSavedSettings = () => {
  const saved = localStorage.getItem('whackAMoleSettings');
  return saved ? JSON.parse(saved) : defaultSettings;
};

const getSavedResults = () => {
  const saved = localStorage.getItem('whackAMoleResults');
  return saved ? JSON.parse(saved) : [];
};

// --- Єдиний Zustand Store ---
const useGameStore = create((set) => ({
  // ========== СТАН ==========
  settings: getSavedSettings(),
  resultsTable: getSavedResults(),

  // ========== ACTIONS: Налаштування ==========
  updateSettings: (newSettings) => set((state) => {
    const updated = { ...state.settings, ...newSettings };
    localStorage.setItem('whackAMoleSettings', JSON.stringify(updated));
    return { settings: updated };
  }),

  // ========== ACTIONS: Результати ==========
  addResult: (score) => set((state) => {
    const newResult = {
      id: Date.now(),
      score,
      date: new Date().toLocaleString(),
    };
    // Зберігаємо топ-10 результатів, відсортованих за очками
    const updatedTable = [newResult, ...state.resultsTable]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
    localStorage.setItem('whackAMoleResults', JSON.stringify(updatedTable));
    return { resultsTable: updatedTable };
  }),

  clearResults: () => set(() => {
    localStorage.removeItem('whackAMoleResults');
    return { resultsTable: [] };
  }),
}));

export default useGameStore;