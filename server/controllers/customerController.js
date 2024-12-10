// server/controllers/customerController.js
const customerService = require('../services/customerService');

async function getAllCustomers(req, res) {
  try {
    const { searchTerm, sortBy, order } = req.query;
    const customers = await customerService.getAllCustomers(searchTerm, sortBy, order);
    if (!customers.length) return res.status(404).json({ message: 'No customers found' });
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err });
  }
}

async function getCustomerById(req, res) {
  try {
    const customer = await customerService.getCustomerById(req.params.id);
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    res.status(200).json(customer);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err });
  }
}

async function addCustomer(req, res) {
  try {
    const customer = await customerService.addCustomer(req.body);
    res.status(201).json(customer);
  } catch (err) {
    res.status(400).json({ message: 'Bad request', error: err });
  }
}

async function updateCustomer(req, res) {
  try {
    const customer = await customerService.updateCustomer(req.params.id, req.body);
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    res.status(200).json(customer);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err });
  }
}

async function deleteCustomer(req, res) {
  try {
    const customer = await customerService.deleteCustomer(req.params.id);
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err });
  }
}

module.exports = {
  getAllCustomers,
  getCustomerById,
  addCustomer,
  updateCustomer,
  deleteCustomer
};
