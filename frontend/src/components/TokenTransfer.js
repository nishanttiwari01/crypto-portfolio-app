import React, { useState } from 'react';
import blockchainService from '../services/blockchainService';

const TokenTransfer = () => {
    const [walletAddress, setWalletAddress] = useState('');
    const [tokenAddress, setTokenAddress] = useState('');
    const [recipientAddress, setRecipientAddress] = useState('');
    const [amount, setAmount] = useState('');

    const transferTokens = async () => {
        // Add validation to ensure all fields are filled
        if (!walletAddress || !tokenAddress || !recipientAddress || !amount) {
            alert('Please fill in all the fields.');
            return;
        }

        // Ensure amount is a string
        const amountStr = amount.toString();

        try {
            await blockchainService.transferTokens(walletAddress, tokenAddress, recipientAddress, amountStr);
            alert('Transfer successful');
        } catch (error) {
            console.error('Error during token transfer:', error);
            alert('Token transfer failed');
        }
    };

    return (
        <div>
            <h2>Transfer Tokens</h2>
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
                placeholder="Recipient Address"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
            />
            <input
                type="text"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={transferTokens}>Transfer Tokens</button>
        </div>
    );
};

export default TokenTransfer;

