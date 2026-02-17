import React from 'react';

/**
 * Базовий компонент кнопки.
 * Використовується для всіх дій користувача в грі.
 *
 * @param {Object} props - Властивості компонента
 * @param {React.ReactNode} props.children - Вміст кнопки
 * @param {function} props.onClick - Функція обробки кліку
 * @param {boolean} [props.disabled] - Чи заблокована кнопка
 */
const Button = ({ children, onClick, disabled }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            style={{
                padding: '10px 20px',
                fontSize: '18px',
                cursor: 'pointer',
                margin: '10px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                fontWeight: 'bold',
            }}
        >
            {children}
        </button>
    );
};

export default Button;