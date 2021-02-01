const express = require('express');
const cors = require('cors');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
// Import Routes
const authRoute = require('./routes/userRoutes');
const todoRoute = require('./routes/todoRoutes');

const app = express();

// swagger documentation
const swaggerOptions = {
    definition: {
        info: {
            title: 'Todo Application API',
            version: '1.0.0',
            description: 'Todo Api for todo application management',
            servers: ['http://localhost:5000'],
        },
    },
    apis: ['./src/routes/*.js'],
    
};
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Allow Cross-Origin requests
app.use(cors());

// Body parser, reading data from body into req.body
app.use(express.json());

// Routes
app.use('/api/user', authRoute);
app.use('/api/todo', todoRoute);

module.exports = app;
