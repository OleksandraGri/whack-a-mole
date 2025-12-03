import React from 'react';

const MoleHole = ({ isMoleUp, onWhack }) => {
    const moleStyle = {
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        backgroundColor: isMoleUp ? '#8B4513' : 'transparent',
        transition: 'background-color 0.3s',
        cursor: isMoleUp ? 'pointer' : 'default',
        textAlign: 'center',
        lineHeight: '80px',
        color: 'white',
        fontSize: '20px',
        position: 'relative',
        top: isMoleUp ? '0' : '20px',
    };

    const holeStyle = {
        width: '100px',
        height: '100px',
        backgroundColor: '#A9A9A9',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        overflow: 'hidden',
        margin: '10px',
    };

    return (
        <div className="mole-hole" style={holeStyle} onClick={isMoleUp ? onWhack : null}>
            <div className="mole" style={moleStyle}>
                {isMoleUp ? 'Кріт' : '...'}
            </div>
        </div>
    );
};

export default MoleHole;