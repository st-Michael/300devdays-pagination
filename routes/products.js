// Import the express module, which is a web application framework for Node.js
const express = require('express');

// Create an instance of the express Router, which is a mini-application for handling routes
const router = express.Router();

// Import the Product model, which is used for interacting with the products collection in the database
const Product = require('../models/product');

// Define a route for creating a new product
// This route handles POST requests to the root URL ('/')
// The 'async' keyword is used to enable the use of the 'await' keyword inside the route handler
router.post('/', async (req, res) => {
    // Try to create a new product using the Product model and the data from the request body
    try {
        // Create a new product using the Product model and the data from the request body
        const product = new Product(req.body);

        // Save the product to the database
        await product.save();

        // If the product is saved successfully, send a 201 status and the product data
        res.status(201).send(product);
    }

    // If there's an error, send a 400 status and the error
    catch (error) {
        res.status(400).send(error);
    }
});

// Define a route for retrieving products
// This route handles GET requests to the root URL ('/')
// The 'async' keyword is used to enable the use of the 'await' keyword inside the route handler
router.get('/', async (req, res) => {
    // Destructure the query parameters from the request
    // The 'page' and 'limit' parameters are used for pagination
    // The 'sortBy' and 'order' parameters are used for sorting
    // Any other parameters are used for filtering
    const { page = 1, limit = 10, sortBy = 'name', order = 'asc', ...filters } = req.query;

    // Determine the sort order based on the 'order' parameter
    const sortOrder = order === 'asc' ? 1 : -1;

    try {
        // Try to retrieve the products from the database
        // Use the 'find' method to filter the products based on the 'filters' object
        // Use the 'sort' method to sort the products based on the 'sortBy' and 'sortOrder' parameters
        // Use the 'skip' method to skip the appropriate number of products for pagination
        // Use the 'limit' method to limit the number of products returned
        const products = await Product.find(filters)
            .sort({ [sortBy]: sortOrder })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        // If the products are retrieved successfully, send a 200 status and the product data
        res.send(products);
    }

    // If there's an error, send a 500 status and the error
    catch (error) {
        res.status(500).send(error);
    }
});

// Export the router so it can be used in other parts of the application
module.exports = router;