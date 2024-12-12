const express = require('express');
const cors = require('cors');
const connectDB = require('../config/db'); // Adjust the path as necessary
const authRoutes = require('../routes/auth'); // Adjust the path as necessary
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Adjust as needed
    credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Sample Route
app.get('/api', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

// Serve static assets if in production
const path = require('path');
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../frontend/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../../frontend', 'build', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
