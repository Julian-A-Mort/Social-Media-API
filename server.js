const express = require('express');
const mongoose = require('mongoose');
const app = express();
const connectDB = require('./config/db');
require('dotenv').config();

const { userRoutes, thoughtRoutes } = require('./routes/api');

app.use(express.json());

// Mongoose
connectDB();

// Using routes
app.use('/api', userRoutes);
app.use('/api', thoughtRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});