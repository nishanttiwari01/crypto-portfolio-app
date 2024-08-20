import { ethers } from 'ethers';

const getProvider = () => {
    if (window.ethereum) {
        return new ethers.providers.Web3Provider(window.ethereum);
    }
    throw new Error('No Ethereum provider found');
};

const getSigner = () => {
    const provider = getProvider();
    return provider.getSigner();
};

const getTokenContract = (tokenAddress, signerOrProvider) => {
    const tokenABI = [
        {
            "constant": true,
            "inputs": [
                { "name": "_owner", "type": "address" }
            ],
            "name": "balanceOf",
            "outputs": [
                { "name": "balance", "type": "uint256" }
            ],
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                { "name": "_owner", "type": "address" },
                { "name": "_spender", "type": "address" }
            ],
            "name": "allowance",
            "outputs": [
                { "name": "remaining", "type": "uint256" }
            ],
            "type": "function"
        },
        {
            "inputs": [
                { "name": "_to", "type": "address" },
                { "name": "_value", "type": "uint256" }
            ],
            "name": "transfer",
            "outputs": [
                { "name": "", "type": "bool" }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];
    return new ethers.Contract(tokenAddress, tokenABI, signerOrProvider);
};

export const getTokenBalance = async (walletAddress, tokenAddress) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const tokenContract = getTokenContract(tokenAddress, provider);
    const balance = await tokenContract.balanceOf(walletAddress);
    return ethers.utils.formatUnits(balance, 18);
};

export const getAllowance = async (walletAddress, tokenAddress, spenderAddress) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const tokenContract = getTokenContract(tokenAddress, provider);
    const allowance = await tokenContract.allowance(walletAddress, spenderAddress);
    return ethers.utils.formatUnits(allowance, 18);
};

export const transferTokens = async (walletAddress, tokenAddress, recipientAddress, amount) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(tokenAddress, [
        "function transfer(address to, uint amount) returns (bool)"
    ], signer);

    try {
        // Manually specify a gas limit
        const tx = await contract.transfer(recipientAddress, ethers.utils.parseUnits(amount, 18), {
            gasLimit: 100000 // Set an appropriate gas limit
        });

        await tx.wait();
        console.log('Transaction successful');
    } catch (error) {
        console.error('Transaction failed:', error);
        throw error;
    }
};

export default {
    getTokenBalance,
    getAllowance,
    transferTokens,
};






