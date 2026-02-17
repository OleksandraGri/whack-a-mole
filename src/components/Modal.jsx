import React from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';

const Modal = ({ score, onRestartNew, onRestartSame }) => {

    const ModalContent = (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '10px',
                textAlign: 'center',
                maxWidth: '400px',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)'
            }}>
                <h2>🎉 ГРУ ЗАВЕРШЕНО! 🎉</h2>
                <p style={{ fontSize: '18px' }}>Ваш фінальний рахунок:</p>
                <h1 style={{ fontSize: '48px', color: '#4CAF50', margin: '10px 0' }}>{score}</h1>
                <p>очок</p>

                <div style={{ marginTop: '30px' }}>
                    <Button onClick={onRestartSame} style={{ backgroundColor: '#2196F3', marginRight: '10px' }}>
                        Почати заново (з тими ж налаштуваннями)
                    </Button>
                    <Button onClick={onRestartNew} style={{ backgroundColor: '#FF9800' }}>
                        Повернутися на старт
                    </Button>
                </div>
            </div>
        </div>
    );

    // Використовую ReactDOM.createPortal для рендерингу поза кореневим DOM-елементом
    return ReactDOM.createPortal(
        ModalContent,
        document.getElementById('modal-root') || document.body
    );
};

export default Modal;