import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { settingsSchema, defaultSettings } from '../config/validationSchema';
import { useGame } from '../context/GameContext';
import Button from '../components/Button';

const SettingsPage = ({ onGoBack }) => {
    const { settings, updateSettings } = useGame();

    // Ініціалізація форми з валідацією
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(settingsSchema),
        defaultValues: settings,
    });

    const onSubmit = (data) => {
        updateSettings(data);
        onGoBack();
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Налаштування Гри</h2>
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>

                {/* 1. Час гри */}
                <div>
                    <label htmlFor="gameTime">Час гри (сек):</label>
                    <input type="number" id="gameTime" {...register('gameTime')} />
                    {errors.gameTime && <p style={{ color: 'red', fontSize: '14px' }}>{errors.gameTime.message}</p>}
                </div>

                {/* 2. Кількість отворів */}
                <div>
                    <label htmlFor="holeCount">Кількість отворів (9, 12, 16):</label>
                    <input type="number" id="holeCount" {...register('holeCount')} />
                    {errors.holeCount && <p style={{ color: 'red', fontSize: '14px' }}>{errors.holeCount.message}</p>}
                </div>

                {/* 3. Швидкість появи крота */}
                <div>
                    <label htmlFor="moleInterval">Швидкість появи (мс):</label>
                    <input type="number" id="moleInterval" {...register('moleInterval')} />
                    {errors.moleInterval && <p style={{ color: 'red', fontSize: '14px' }}>{errors.moleInterval.message}</p>}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                    <Button onClick={onGoBack} type="button" style={{ backgroundColor: '#ccc' }}>Назад</Button>
                    <Button type="submit">Зберегти та вийти</Button>
                </div>
            </form>
        </div>
    );
};

export default SettingsPage;
