const express = require('express');
const { userRoutes, thoughtRoutes } = require('./routes/api');
const app = express();

app.use(express.json());

// Using routes
app.use('/api', userRoutes);
app.use('/api', thoughtRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
