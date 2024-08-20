import React, { useState } from 'react';
import { ethers } from 'ethers';

const WalletConnection = ({setWalletAddress,walletAddress}) => {
    // const [walletAddress, setWalletAddress] = useState('');

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                // const provider = new ethers.BrowserProvider(window.ethereum);
                const provider = new ethers.providers.Web3Provider(window.ethereum);

                await provider.send("eth_requestAccounts", []);
                const signer = provider.getSigner();  // Await here
                // const address = await signer.address;  // Directly access the address
                const address = await signer.getAddress();  // Directly access the address

                setWalletAddress(address);
                console.log('hii')
            } catch (error) {
                console.error(error);
            }
        } else {
            alert('Please install Metamask!');
        }
    };

    return (
        <div>
            <button onClick={connectWallet}>Connect Wallet</button>
            {walletAddress && <p>Connected Wallet: {walletAddress}</p>}
        </div>
    );
};

export default WalletConnection;

