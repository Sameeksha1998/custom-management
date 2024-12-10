import React from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const CustomerList = ({ customers, onDelete, onEdit, onView }) => {
  const handleDelete = async (id) => {
    const url = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
    await axios.delete(`${url}/api/customers/${id}`);
    onDelete((prev) => prev.filter((customer) => customer._id !== id));
  };

  return (
    <Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer._id}>
                <TableCell>{customer.firstName}</TableCell>
                <TableCell>{customer.lastName}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phoneNumber}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => onView(customer._id)}
                    color="primary"
                    variant="contained"
                    style={{ marginRight: 8 }}
                  >
                    View
                  </Button>
                  <Button
                    onClick={() => onEdit(customer._id)}
                    color="primary"
                    variant="contained"
                    style={{ marginRight: 8 }}
                  >
                    Edit
                  </Button>
                  <Button onClick={() => handleDelete(customer._id)} color="error" variant="contained">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CustomerList;
