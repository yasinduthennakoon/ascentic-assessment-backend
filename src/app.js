const express = require('express');
const cors = require('cors');

const app = express();

// Allow Cross-Origin requests
app.use(cors());

// Body parser, reading data from body into req.body
app.use(express.json());

module.exports = app;
