// src/components/EditCustomerForm.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Box } from '@mui/material';
import axios from 'axios';

const EditCustomerForm = ({ customerId, onUpdate }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  let url = process.env.BACKEND_SERVER_URL 

  useEffect(() => {
    const fetchCustomer = async () => {
      const response = await axios.get(`${url}/api/customers/${customerId}`);
      const customer = response.data;
      setFirstName(customer.firstName);
      setLastName(customer.lastName);
      setEmail(customer.email);
      setPhoneNumber(customer.phoneNumber);
      setAddress(customer.address);
    };

    fetchCustomer();
  }, [customerId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedCustomer = { firstName, lastName, email, phoneNumber, address };
    const response = await axios.put(`http://localhost:5001/api/customers/${customerId}`, updatedCustomer);
    onUpdate(response.data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained">Update Customer</Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditCustomerForm;
