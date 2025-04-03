import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SeatSelector from '../components/SeatSelector';
import PaymentModal from '../components/PaymentModal';
import './BookingPage.css';
const BookingPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    axios.get(`/api/movies/${movieId}`)
      .then(res => setMovie(res.data))
      .catch(err => console.error(err));
  }, [movieId]);

  const handleBooking = () => {
    axios.post('/api/bookings', { 
      movieId, 
      seats: selectedSeats 
    }, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => {
      setShowPaymentModal(true);
    })
    .catch(err => console.error(err));
  };

  return (
    <div className="booking-page">
      {movie && (
        <>
          <h2>Booking: {movie.title}</h2>
          <SeatSelector onSeatSelect={setSelectedSeats} />
          <button 
            onClick={handleBooking}
            disabled={!selectedSeats.length}
          >
            Proceed to Payment
          </button>
          
          {showPaymentModal && (
            <PaymentModal 
              bookingId={movie._id} 
              onClose={() => setShowPaymentModal(false)} 
            />
          )}
        </>
      )}
    </div>
  );
};

export default BookingPage;