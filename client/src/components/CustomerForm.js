import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Box } from '@mui/material';
import axios from 'axios';

const CustomerForm = ({ onAdd, onUpdate, editingCustomer }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (editingCustomer) {
      setFirstName(editingCustomer.firstName || '');
      setLastName(editingCustomer.lastName || '');
      setEmail(editingCustomer.email || '');
      setPhoneNumber(editingCustomer.phoneNumber || '');
      setAddress(editingCustomer.address || '');
    } else {
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhoneNumber('');
      setAddress('');
    }
  }, [editingCustomer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCustomer = { firstName, lastName, email, phoneNumber, address };
    const url = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';

    if (editingCustomer) {
      const response = await axios.put(
        `${url}/api/customers/${editingCustomer._id}`,
        newCustomer
      );
      onUpdate(response.data);
    } else {
      const response = await axios.post(`${url}/api/customers`, newCustomer);
      onAdd(response.data);
    }
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
          <Button type="submit" variant="contained">
            {editingCustomer ? 'Update Customer' : 'Add Customer'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomerForm;
