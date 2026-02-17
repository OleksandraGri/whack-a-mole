import React from 'react';

/**
 * Компонент лунки крота.
 * Відображає або порожню лунку, або крота, по якому можна вдарити.
 * 
 * @param {Object} props - Властивості компонента
 * @param {boolean} props.isMoleUp - Чи виліз кріт із цієї лунки (true/false)
 * @param {function} props.onWhack - Функція, що викликається при кліку на крота
 */
const MoleHole = ({ isMoleUp, onWhack }) => {
    const moleStyle = {
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        backgroundColor: isMoleUp ? '#8B4513' : 'transparent',
        transition: 'transform 0.15s ease-out',
        textAlign: 'center',
        lineHeight: '80px',
        color: 'white',
        fontSize: '30px',
        position: 'relative',
        // Динамічний рух: 0px якщо піднятий, 100% (схований) якщо опущений
        transform: isMoleUp ? 'translateY(0)' : 'translateY(100%)',
    };

    const holeStyle = {
        width: '100px',
        height: '100px',
        backgroundColor: '#A9A9A9',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        overflow: 'hidden',
        cursor: isMoleUp ? 'pointer' : 'default',
        margin: 'auto',
    };

    return (
        // Обробник натискання: спрацює лише, якщо isMoleUp === true
        <div className="mole-hole" style={holeStyle} onClick={isMoleUp ? onWhack : null}>
            <div className="mole" style={moleStyle}>
                {isMoleUp ? '🐻' : ''}
            </div>
        </div>
    );
};

export default MoleHole;