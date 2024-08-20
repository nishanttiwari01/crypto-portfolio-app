const express = require('express');
const { getTokens, addToken, getHistoricalData } = require('../controllers/tokenController');

const router = express.Router();

router.get('/:walletAddress', getTokens);
console.log(addToken);
router.post('/', addToken);
router.get('/:walletAddress/:tokenAddress/history', getHistoricalData);

module.exports = router;
