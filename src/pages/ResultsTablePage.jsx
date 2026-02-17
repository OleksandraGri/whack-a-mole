import React from 'react';
import useGameStore from '../store/useGameStore';
import Button from '../components/Button';

const ResultsTablePage = () => {
    const resultsTable = useGameStore(state => state.resultsTable);
    const clearResults = useGameStore(state => state.clearResults);

    return (
        <div className="page-center">
            <h1>🏆 Таблиця Найкращих Результатів (Zustand)</h1>

            {resultsTable.length === 0 ? (
                <p>Результатів поки що немає. Почніть гру!</p>
            ) : (
                <>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f2f2f2' }}>
                                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Місце</th>
                                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Очки</th>
                                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Дата</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resultsTable.map((result, index) => (
                                <tr key={result.id} style={{ backgroundColor: index % 2 === 0 ? 'white' : '#fafafa' }}>
                                    <td style={{ padding: '10px', border: '1px solid #ddd', fontWeight: 'bold' }}>{index + 1}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd', color: index === 0 ? 'gold' : 'inherit' }}>{result.score}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd', fontSize: '0.9em' }}>{result.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div style={{ marginTop: '15px' }}>
                        <Button onClick={clearResults} style={{ backgroundColor: '#f44336' }}>Очистити результати</Button>
                    </div>
                </>
            )}
        </div>
    );
};

export default ResultsTablePage;