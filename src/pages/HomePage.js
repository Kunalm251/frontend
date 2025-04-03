import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovies } from '../redux/actions/movieActions';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';
import Message from '../components/Message';
import './HomePage.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get movies and loading state from Redux
  const { movies, loading, error } = useSelector(state => state.movies);
  
  // Local state for featured movie
  const [featuredMovie, setFeaturedMovie] = useState(null);
  
  // Fetch movies on component mount
  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  // Set random featured movie when movies load
  useEffect(() => {
    if (movies.length > 0) {
      const randomIndex = Math.floor(Math.random() * movies.length);
      setFeaturedMovie(movies[randomIndex]);
    }
  }, [movies]);

  // Handle movie booking
  const handleBookNow = (movieId) => {
    navigate(`/movies/${movieId}`);
  };

  // Handle view all click
  const handleViewAll = () => {
    navigate('/movies');
  };

  if (loading && !movies.length) return <Loader fullPage />;
  if (error) return <Message message={error} />;

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        {featuredMovie && (
          <>
            <img 
              src={featuredMovie.poster} 
              alt={featuredMovie.title} 
              className="hero-image" 
            />
            <div className="hero-overlay" />
            <div className="hero-content">
              <h1 className="hero-title">{featuredMovie.title}</h1>
              <p className="hero-subtitle">
                {featuredMovie.description.substring(0, 150)}...
              </p>
              <button 
                className="hero-btn"
                onClick={() => handleBookNow(featuredMovie._id)}
              >
                Book Now
              </button>
            </div>
          </>
        )}

        {/* Decorative floating elements */}
        <span className="floating-icon">🎬</span>
        <span className="floating-icon">🍿</span>
      </section>

      {/* Now Showing Section */}
      <section className="now-showing">
        <div className="section-header">
          <h2 className="section-title">Now Showing</h2>
          <button 
            className="view-all"
            onClick={handleViewAll}
          >
            View All
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="movie-grid">
          {movies.slice(0, 4).map(movie => (
            <MovieCard 
              key={movie._id}
              movie={movie}
              onBookNow={() => handleBookNow(movie._id)}
            />
          ))}
        </div>
      </section>

      {/* Coming Soon Section (Example) */}
      <section className="now-showing">
        <div className="section-header">
          <h2 className="section-title">Coming Soon</h2>
        </div>
        <div className="movie-grid">
          {movies.slice(4, 8).map(movie => (
            <MovieCard 
              key={movie._id}
              movie={movie}
              comingSoon
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;