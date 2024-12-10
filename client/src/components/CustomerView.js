// src/components/CustomerView.js
import React from 'react';
import { Modal, Box, Typography, Grid, Divider, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function CustomerView({ openView, handleViewClose, viewCustomer }) {
  return (
    <Modal open={openView} onClose={handleViewClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box display="flex" sx={{ justifyContent: 'space-between', alignItems: 'center', py: 2 }}>
          <Typography id="customer-details-modal" color="primary" variant="h6" component="h2" fontWeight={600} gutterBottom>
            Customer Details
          </Typography>
          <IconButton aria-label="close" onClick={handleViewClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <Typography>
              <strong>First Name:</strong> {viewCustomer?.firstName}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>Last Name:</strong> {viewCustomer?.lastName}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>Email:</strong> {viewCustomer?.email}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>Phone Number:</strong> {viewCustomer?.phoneNumber}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>Address:</strong> {viewCustomer?.address}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

export default CustomerView;
