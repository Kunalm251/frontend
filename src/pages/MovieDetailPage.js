import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SeatSelector from '../components/SeatSelector';
import PaymentModal from '../components/PaymentModal';
import './MovieDetailPage.css';

const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await axios.get(`/api/movies/${id}`);
        setMovie(res.data);
      } catch (err) {
        setError('Failed to load movie details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleBookNow = () => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
      return;
    }
    setShowPaymentModal(true);
  };

  const handleConfirmBooking = async () => {
    try {
      const res = await axios.post(
        '/api/bookings',
        {
          movieId: id,
          seats: selectedSeats,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setShowPaymentModal(false);
      navigate(`/booking/${res.data._id}`);
    } catch (err) {
      console.error('Booking failed:', err);
      setError('Failed to complete booking');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="movie-details-container">
      <div className="movie-poster">
        <img src={movie.poster} alt={movie.title} />
      </div>
      <div className="movie-info">
        <h1>{movie.title}</h1>
        <div className="meta-info">
          <span>{movie.genre}</span>
          <span>{movie.duration} mins</span>
          <span>Rating: {movie.rating}/10</span>
        </div>
        <p className="description">{movie.description}</p>
        
        <div className="showtimes">
          <h3>Available Showtimes</h3>
          <div className="time-slots">
            {movie.showtimes.map((time) => (
              <button key={time} className="time-slot">
                {time}
              </button>
            ))}
          </div>
        </div>

        <div className="seat-selection">
          <h3>Select Seats</h3>
          <SeatSelector 
            availableSeats={movie.availableSeats} 
            onSelect={setSelectedSeats} 
          />
          <p className="price-display">
            Total: ${selectedSeats.length * movie.price}
          </p>
        </div>

        <button 
          className="book-btn"
          onClick={handleBookNow}
          disabled={selectedSeats.length === 0}
        >
          Book Now
        </button>
      </div>

      {showPaymentModal && (
        <PaymentModal
          totalAmount={selectedSeats.length * movie.price}
          onConfirm={handleConfirmBooking}
          onCancel={() => setShowPaymentModal(false)}
        />
      )}
    </div>
  );
};

export default MovieDetailPage;