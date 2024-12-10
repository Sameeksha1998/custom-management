// server/services/customerService.js
const customerRepository = require('../repositories/customerRepository');

class CustomerService {
  async getAllCustomers(searchTerm, sortBy, order) {
    return await customerRepository.getAllCustomers(searchTerm, sortBy, order);
  }

  async getCustomerById(id) {
    return await customerRepository.getCustomerById(id);
  }

  async addCustomer(data) {
    return await customerRepository.addCustomer(data);
  }

  async updateCustomer(id, data) {
    return await customerRepository.updateCustomer(id, data);
  }

  async deleteCustomer(id) {
    return await customerRepository.deleteCustomer(id);
  }
}

module.exports = new CustomerService();
