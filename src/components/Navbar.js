

import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/actions/authActions';
import './Navbar.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Add this to debug routing
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);

  console.log('Current path:', location.pathname); // Debugging
  console.log('Auth status:', isAuthenticated); // Debugging

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  // Add active class based on current route
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className={`navbar-brand ${isActive('/')}`}>
          BookMyCryptoShow
        </Link>

        <div className="navbar-links">
          <Link 
            to="/movies" 
            className={`nav-link ${isActive('/movies')}`}
            onClick={(e) => {
              console.log('Movies link clicked'); // Debugging
              e.preventDefault();
              navigate('/movies');
            }}
          >
            Movies
          </Link>
          <Link 
            to="/events" 
            className={`nav-link ${isActive('/events')}`}
            onClick={(e) => {
              console.log('Events link clicked'); // Debugging
              e.preventDefault();
              navigate('/events');
            }}
          >
            Events
          </Link>
        </div>

        <div className="navbar-auth">
          {isAuthenticated ? (
            <>
              <Link 
                to="/profile" 
                className={`nav-link ${isActive('/profile')}`}
              >
                {user?.username || 'Profile'}
              </Link>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className={`nav-link ${isActive('/login')}`}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className={`register-btn ${isActive('/register')}`}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;