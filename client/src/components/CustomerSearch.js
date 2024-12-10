// src/components/CustomerSearch.js
import React from 'react';
import { TextField, Select, MenuItem, Box, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

function CustomerSearch({ searchTerm, setSearchTerm, sortBy, setSortBy, order, setOrder, setOpen }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
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
        }}
        style={{ marginBottom: '16px' }}
        startIcon={<AddIcon />}
      >
        Add New Customer
      </Button>
    </Box>
  );
}

export default CustomerSearch;
