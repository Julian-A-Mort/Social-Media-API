const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

const { userRoutes, thoughtRoutes } = require('./routes/api');

app.use(express.json());

// Mongoose
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
  });
  
  mongoose.connection.on('error', (err) => {
    console.error(`Error connecting to MongoDB: ${err.message}`);
  });

// Using routes
app.use('/api', userRoutes);
app.use('/api', thoughtRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});