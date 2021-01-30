const express = require('express');
const cors = require('cors');
// Import Routes
const authRoute = require('./routes/userRoutes');
const todoRoute = require('./routes/todoRoutes');

const app = express();

// Allow Cross-Origin requests
app.use(cors());

// Body parser, reading data from body into req.body
app.use(express.json());

// Routes
app.use('/api/user', authRoute);
app.use('/api/todo', todoRoute);

module.exports = app;
