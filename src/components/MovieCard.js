import React from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img src={movie.poster} alt={movie.title} />
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.genre} • {movie.duration} mins</p>
        <Link to={`/movie/${movie._id}`} className="btn">
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;