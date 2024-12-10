import React, { useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';

const CustomerList = ({ customers, onDelete, onEdit, onView }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);

  const handleDeleteDialogOpen = (id) => {
    setCustomerToDelete(id);
    setOpenDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setOpenDialog(false);
    setCustomerToDelete(null);
  };

  const handleDelete = async () => {
    if (!customerToDelete) return;
    try {
      const url = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
      await axios.delete(`${url}/api/customers/${customerToDelete}`);
      onDelete((prev) => prev.filter((customer) => customer._id !== customerToDelete));
      handleDeleteDialogClose(); // Close the dialog after deletion
    } catch (error) {
      console.log("error on delete", error);
    }
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
                  <Button
                    onClick={() => handleDeleteDialogOpen(customer._id)}
                    color="error"
                    variant="contained"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleDeleteDialogClose}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this customer?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CustomerList;
