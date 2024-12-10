import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  CircularProgress,
  Modal,
  Box,
  IconButton,
  Divider,
  Grid,
} from '@mui/material';
import CustomerList from './components/CustomerList';
import CustomerForm from './components/CustomerForm';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import CustomerView from './components/CustomerView';

function App() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('FirstName');
  const [order, setOrder] = useState('asc');
  const [open, setOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [viewCustomer, setViewCustomer] = useState(null);
  const [openView, setOpenView] = useState(false);


  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const url = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
      const response = await axios.get(`${url}/api/customers`, {
        params: { searchTerm, sortBy, order },
      });
      setCustomers(response.data);
    } catch (error) {
      console.error('Failed to fetch customers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(viewCustomer, "viewCustomer");
    fetchCustomers();
  }, [searchTerm, sortBy, order]);

  const handleAddCustomer = (newCustomer) => {
    setCustomers((prev) => [...prev, newCustomer]);
    setOpen(false);
  };

  const handleEditCustomer = (id) => {
    const customer = customers.find((customer) => customer._id === id);
    setEditingCustomer(customer);
    setOpen(true);
  };

  const handleView = (id) => {
    const customer = customers.find((customer) => customer._id === id);
    setViewCustomer(customer);
    setOpenView(true);
  }

  const handleModalClose = () => {
    setOpen(false);
    setEditingCustomer(null);
  };

  const handleViewClose = () => {
    setOpenView(false);
    setViewCustomer(null);
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 600, color: 'primary', m: 4 }}>
          Customer Management
        </Typography>
      </Box>

      {/* Search Field */}
      <Box sx={{ display: "flex", justifyContent: 'space-between', mb: 4 }}>
        <Box>
          <TextField
            label="Search"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginBottom: '16px', marginRight: '16px' }}
          />

          {/* Sort Dropdown */}
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{ marginBottom: '16px', marginRight: '16px' }}
          >
            <MenuItem value="FirstName">First Name</MenuItem>
            <MenuItem value="LastName">Last Name</MenuItem>
            <MenuItem value="Email">Email</MenuItem>
          </Select>

          {/* Order Dropdown */}
          <Select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            style={{ marginBottom: '16px', marginRight: '16px' }}
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>

        </Box>
        <Button
          variant="contained"
          onClick={() => {
            setOpen(true);
            setEditingCustomer(null);
          }}
          style={{ marginBottom: '16px' }}
          startIcon={<AddIcon />}
        >
          Add New Customer
        </Button>
      </Box>

      {/* Loading Indicator */}
      {loading ? (
        <CircularProgress style={{ display: 'block', margin: '16px auto' }} />
      ) : (
        <CustomerList
          onView={handleView}
          customers={customers}
          onEdit={handleEditCustomer}
          onDelete={(updatedList) => setCustomers(updatedList)}
        />
      )}

      <Modal
        open={open}
        onClose={handleModalClose}
        aria-labelledby="customer-form-modal-title"
        aria-describedby="customer-form-modal-description"
      >
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
            <Typography id="customer-details-modal" color='primary' variant="h6" component="h2" fontWeight={600} gutterBottom>
              Customer Details
            </Typography>

            <IconButton aria-label="close" onClick={handleModalClose} >
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />

          <CustomerForm
            onAdd={handleAddCustomer}
            onUpdate={(updatedCustomer) => {
              setCustomers((prev) =>
                prev.map((cust) =>
                  cust._id === updatedCustomer._id ? updatedCustomer : cust
                )
              );
              handleModalClose();
            }}
            editingCustomer={editingCustomer}
          />
        </Box>
      </Modal>

      <Modal
        open={openView}
        onClose={handleViewClose}
        aria-labelledby="customer-form-modal-title"
        aria-describedby="customer-form-modal-description"
      >
              <CustomerView openView={openView} handleViewClose={handleViewClose} viewCustomer={viewCustomer} />

      </Modal>
    </Container>
  );
}

export default App;
