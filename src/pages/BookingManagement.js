import React, { useState, useEffect } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Button, 
  Snackbar, Alert 
} from '@mui/material';
import API from '../utils/api';

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Fetch bookings with authentication token
  const token = localStorage.getItem('authToken'); // Assume token is stored here

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data } = await API.get('/admin/bookings', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setBookings(data);
    } catch (err) {
      showNotification('Unable to load bookings', 'error');
    }
  };

  // Send SMS with authentication token
  const handleSendSMS = async (bookingId) => {
    try {
      await API.post(`/admin/bookings/${bookingId}/notify`, {}, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      showNotification('SMS notification sent successfully');
    } catch (err) {
      showNotification('Failed to send SMS', 'error');
    }
  };

  const showNotification = (message, severity = 'success') => {
    setNotification({ open: true, message, severity });
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Movie</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Seats</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking._id}>
                <TableCell>{booking.user?.name}</TableCell>
                <TableCell>{booking.movie?.title}</TableCell>
                <TableCell>{new Date(booking.createdAt).toLocaleString()}</TableCell>
                <TableCell>{booking.seats.join(', ')}</TableCell>
                <TableCell>{booking.status}</TableCell>
                <TableCell>
                  <Button 
                    variant="outlined" 
                    onClick={() => handleSendSMS(booking._id)}
                    disabled={!booking.user?.phone}
                  >
                    Send SMS
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default BookingManagement;
