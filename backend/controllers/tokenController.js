const Token = require('../models/tokenModel');

// Get all tokens for a specific wallet address
exports.getTokens = async (req, res) => {
    const { walletAddress } = req.params;
    try {
        const tokens = await Token.find({ walletAddress });
        res.status(200).json(tokens);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Add a token to watch list
exports.addToken = async (req, res) => {
    const { walletAddress, tokenAddress, balance } = req.body;

     console.log(tokenAddress);
    try {
        const newToken = new Token({ walletAddress, tokenAddress, balance });
        await newToken.save();
        res.status(201).json(newToken);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get historical balance of a token
exports.getHistoricalData = async (req, res) => {
    const { walletAddress, tokenAddress } = req.params;
    const { startDate, endDate } = req.query;
    try {
        const history = await Token.find({
            walletAddress,
            tokenAddress,
            date: { $gte: new Date(startDate), $lte: new Date(endDate) },
        });
        res.status(200).json(history);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
