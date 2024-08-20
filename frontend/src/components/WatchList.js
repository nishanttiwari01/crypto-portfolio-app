import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';
import blockchainService from '../services/blockchainService';

const WatchList = ({walletAddress}) => {
    const [watchList, setWatchList] = useState([]);
    const [tokenAddress, setTokenAddress] = useState('');
    // const [walletAddress, setWalletAddress] = useState('');

    const fetchWatchList = async () => {
        const data = await apiService.getTokens(walletAddress);
        setWatchList(data);
    };

    const addTokenToWatchList = async () => {
        console.log(walletAddress,tokenAddress)
        const balance = await blockchainService.getTokenBalance(walletAddress, tokenAddress);
        console.log(balance)
        const tokenData = { walletAddress, tokenAddress, balance };
        await apiService.addToken(tokenData);
        fetchWatchList();
    };

    useEffect(() => {
        if (walletAddress) {
            fetchWatchList();
        }
    }, [walletAddress]);

    return (
        <div>
            <h2>Watch List</h2>
            <input
                type="text"
                placeholder="Token Address"
                value={tokenAddress}
                onChange={(e) => setTokenAddress(e.target.value)}
            />
            <button onClick={addTokenToWatchList}>Add Token</button>
            <table>
                <thead>
                    <tr>
                        <th>Token Address</th>
                        <th>Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {watchList.map((token, index) => (
                        <tr key={index}>
                            <td>{token.tokenAddress}</td>
                            <td>{token.balance}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default WatchList;
