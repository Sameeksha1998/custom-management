// server/repositories/customerRepository.js
const Customer = require('../models/Customer');

class CustomerRepository {
  async getAllCustomers(searchTerm = '', sortBy = 'firstName', order = 'asc') {
    const customers = await Customer.find({
      $or: [
        { firstName: { $regex: searchTerm, $options: 'i' } },
        { lastName: { $regex: searchTerm, $options: 'i' } },
        { email: { $regex: searchTerm, $options: 'i' } },
      ],
    }).sort({ [sortBy]: order === 'asc' ? 1 : -1 });

    return customers;
  }

  async getCustomerById(id) {
    return await Customer.findById(id);
  }

  async addCustomer(data) {
    const newCustomer = new Customer(data);
    return await newCustomer.save();
  }

  async updateCustomer(id, data) {
    return await Customer.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteCustomer(id) {
    return await Customer.findByIdAndDelete(id);
  }
}

module.exports = new CustomerRepository();
