const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/products');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/products', router);

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/products', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

module.exports = app;
