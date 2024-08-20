const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
    walletAddress: { type: String, required: true },
    tokenAddress: { type: String, required: true },
    balance: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Token', TokenSchema);
