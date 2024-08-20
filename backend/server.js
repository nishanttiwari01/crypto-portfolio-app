const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const tokenRoutes = require('./routes/tokenRoutes');
const dbConfig = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

console.log("hii");

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(dbConfig.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected successfully.');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Base URL route
app.get('/', (req, res) => {
    res.send('Hello');
  });

// Routes
app.use('/api/tokens', tokenRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
