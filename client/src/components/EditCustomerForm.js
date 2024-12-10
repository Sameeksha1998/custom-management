import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Box, FormHelperText } from '@mui/material';
import axios from 'axios';

const CustomerForm = ({ onAdd, onUpdate, editingCustomer }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
  });

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

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Required fields validation
    if (!firstName) {
      newErrors.firstName = 'First Name is required';
      isValid = false;
    }
    if (!lastName) {
      newErrors.lastName = 'Last Name is required';
      isValid = false;
    }
    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }
    if (!phoneNumber) {
      newErrors.phoneNumber = 'Phone Number is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      newErrors.phoneNumber = 'Phone Number should be 10 digits';
      isValid = false;
    }
    if (!address) {
      newErrors.address = 'Address is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Stop submission if validation fails
    try {
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
    } catch (error) {
      console.log(error, "error");
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
            error={!!errors.firstName}
            helperText={errors.firstName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
            error={!!errors.lastName}
            helperText={errors.lastName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            error={!!errors.email}
            helperText={errors.email}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            fullWidth
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
            error={!!errors.address}
            helperText={errors.address}
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
