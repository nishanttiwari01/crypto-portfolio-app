import React, { useState } from 'react';
import blockchainService from '../services/blockchainService';

const AllowanceChecker = () => {
    const [walletAddress, setWalletAddress] = useState('');
    const [tokenAddress, setTokenAddress] = useState('');
    const [spenderAddress, setSpenderAddress] = useState('');
    const [allowance, setAllowance] = useState('');

    const checkAllowance = async () => {
        const result = await blockchainService.getAllowance(walletAddress, tokenAddress, spenderAddress);
        setAllowance(result);
    };

    return (
        <div>
            <h2>Check Token Allowance</h2>
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
                type="text"
                placeholder="Spender Address"
                value={spenderAddress}
                onChange={(e) => setSpenderAddress(e.target.value)}
            />
            <button onClick={checkAllowance}>Check Allowance</button>
            {allowance && <p>Allowance: {allowance}</p>}
        </div>
    );
};

export default AllowanceChecker;
