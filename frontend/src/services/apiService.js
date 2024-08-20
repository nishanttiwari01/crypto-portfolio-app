import axios from 'axios';

const API_URL = 'https://crypto-portfolio-app.onrender.com/api/tokens';

export const getTokens = async (walletAddress) => {

    console.log(`${API_URL}/${walletAddress}`);

    const response = await axios.get(`${API_URL}/${walletAddress}`);
     
    console.log(response);

    return response.data;
};

export const addToken = async (tokenData) => {
    const response = await axios.post(API_URL, tokenData);
    return response.data;
};

export const getHistoricalData = async (walletAddress, tokenAddress, startDate, endDate) => {
    const response = await axios.get(`${API_URL}/${walletAddress}/${tokenAddress}/history`, {
        params: { startDate, endDate },
    });
    return response.data;
};

export default {
    getTokens,
    addToken,
    getHistoricalData,
};
