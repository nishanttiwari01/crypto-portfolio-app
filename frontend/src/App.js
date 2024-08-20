import React, { useState } from 'react';
import WalletConnection from './components/WalletConnection';
import WatchList from './components/WatchList';
import HistoricalData from './components/HistoricalData';
import AllowanceChecker from './components/AllowanceChecker';
import TokenTransfer from './components/TokenTransfer';

function App() {
  const [walletAddress, setWalletAddress] = useState('');
    return (
        <div className="App">
            <h1>Crypto Portfolio App</h1>
            <WalletConnection setWalletAddress={setWalletAddress} walletAddress={walletAddress}/>
            <WatchList walletAddress={walletAddress}/>
            <HistoricalData walletAddress={walletAddress}/>
            <AllowanceChecker walletAddress={walletAddress}/>
            <TokenTransfer walletAddress={walletAddress}/>
        </div>
    );
}

export default App;

