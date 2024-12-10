// server/routes/customerRoutes.js
const express = require('express');
const customerController = require('../controllers/customerController');
const router = express.Router();

// Get all customers
router.get('/', customerController.getAllCustomers);

// Get a specific customer by ID
router.get('/:id', customerController.getCustomerById);

// Add a new customer
router.post('/', customerController.addCustomer);

// Update an existing customer by ID
router.put('/:id', customerController.updateCustomer);

// Delete a customer by ID
router.delete('/:id', customerController.deleteCustomer);

module.exports = router;
