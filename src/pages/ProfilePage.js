import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfilePage.css';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Please login to view profile');
          return;
        }

        const [userRes, bookingsRes] = await Promise.all([
          axios.get('/api/auth/me', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('/api/bookings', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setUserData(userRes.data);
        setBookings(bookingsRes.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load profile data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    try {
      await axios.delete(`/api/bookings/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setBookings(bookings.filter(booking => booking._id !== bookingId));
    } catch (err) {
      console.error('Cancellation failed:', err);
      setError('Failed to cancel booking');
    }
  };

  if (loading) return <div className="loading">Loading your profile...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="profile-container">
      <div className="user-info">
        <h2>My Profile</h2>
        <div className="info-item">
          <strong>Name:</strong> {userData.username}
        </div>
        <div className="info-item">
          <strong>Email:</strong> {userData.email}
        </div>
        <div className="info-item">
          <strong>Member Since:</strong> {new Date(userData.createdAt).toLocaleDateString()}
        </div>
      </div>

      <div className="bookings-section">
        <h3>My Bookings</h3>
        {bookings.length === 0 ? (
          <p>No bookings yet</p>
        ) : (
          <div className="bookings-list">
            {bookings.map((booking) => (
              <div key={booking._id} className="booking-card">
                <div className="booking-movie">
                  <img src={booking.movie.poster} alt={booking.movie.title} />
                  <div>
                    <h4>{booking.movie.title}</h4>
                    <p>{new Date(booking.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                <div className="booking-details">
                  <p>Seats: {booking.seats.join(', ')}</p>
                  <p>Total: ${booking.totalPrice}</p>
                  <p>Status: 
                    <span className={`status-${booking.paymentStatus.toLowerCase()}`}>
                      {booking.paymentStatus}
                    </span>
                  </p>
                </div>
                <button 
                  className="cancel-btn"
                  onClick={() => handleCancelBooking(booking._id)}
                  disabled={booking.paymentStatus === 'COMPLETED'}
                >
                  Cancel
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;