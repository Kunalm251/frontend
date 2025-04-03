import React, { useState } from 'react';
import { Tab, Tabs, Box } from '@mui/material';
import MovieManagement from './MovieManagement';
import BookingManagement from './BookingManagement';
import UserManagement from './UserManagement';
import './AdminPanel.css';

const AdminPanel = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div className="admin-panel">
      <h1>Admin Dashboard</h1>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Movies" />
          <Tab label="Bookings" />
          <Tab label="User" />
        </Tabs>
      </Box>
      
      <div className="tab-content">
        {tabValue === 0 && <MovieManagement />}
        {tabValue === 1 && <BookingManagement />} 
        {tabValue === 2 && <UserManagement />}
      </div>
    </div>
  );
};

export default AdminPanel;