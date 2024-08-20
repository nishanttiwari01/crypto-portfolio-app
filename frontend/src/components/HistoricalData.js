import React, { useState } from 'react';
import apiService from '../services/apiService';

const HistoricalData = () => {
    const [walletAddress, setWalletAddress] = useState('');
    const [tokenAddress, setTokenAddress] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [history, setHistory] = useState([]);

    const fetchHistoricalData = async () => {
        const data = await apiService.getHistoricalData(walletAddress, tokenAddress, startDate, endDate);
        setHistory(data);
    };

    return (
        <div>
            <h2>Historical Data</h2>
            <input
                type="text"
                placeholder="Wallet Address"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
            />
            <input
                type="text"
                placeholder="Token Address"
                value={tokenAddress}
                onChange={(e) => setTokenAddress(e.target.value)}
            />
            <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
            />
            <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
            />
            <button onClick={fetchHistoricalData}>Fetch Historical Data</button>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {history.map((record, index) => (
                        <tr key={index}>
                            <td>{new Date(record.date).toLocaleDateString()}</td>
                            <td>{record.balance}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HistoricalData;
