import * as yup from 'yup';

// Схема валідації для форми налаштувань
export const settingsSchema = yup.object({
    gameTime: yup
        .number()
        .required('Час гри є обов\'язковим')
        .min(10, 'Мінімальний час — 10 с')
        .max(120, 'Максимальний час — 120 с')
        .integer('Має бути цілим числом'),

    holeCount: yup
        .number()
        .required('Кількість отворів є обов\'язковою')
        .oneOf([9, 12, 16], 'Кількість має бути 9, 12 або 16'),

    // Швидкість (інтервал появи крота в мс)
    moleInterval: yup
        .number()
        .required('Швидкість є обов\'язковою')
        .min(300, 'Мінімальна швидкість — 300 мс')
        .max(2000, 'Максимальна швидкість — 2000 мс')
        .integer('Має бути цілим числом'),
}).required();

// Тип даних
export const defaultSettings = {
    gameTime: 30,
    holeCount: 9,
    moleInterval: 1000,
};