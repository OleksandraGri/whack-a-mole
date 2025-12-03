import React from 'react';

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