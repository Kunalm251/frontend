import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
import BookingPage from './pages/BookingPage';
import PaymentPage from './pages/PaymentPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
// import MoviesPage from './pages/MoviesPage';
import NotFoundPage from './pages/NotFoundPage';
import PrivateRoute from './components/routing/PrivateRoute';
import AdminPanel from './pages/AdminPanel';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/movies" element={<MoviesPage />} /> */}
        <Route path="/movies/:id" element={<MovieDetailPage />} />
       
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Admin Routes */}

        <Route
          path="/admin"
          element={
            <PrivateRoute adminOnly>
              <AdminPanel />
            </PrivateRoute>
          }
        />
        {/* Protected Routes */}
        <Route path="/bookings/:movieId" element={
          <PrivateRoute>
            <BookingPage />
          </PrivateRoute>
        } />
        <Route path="/payment/:bookingId" element={
          <PrivateRoute>
            <PaymentPage />
          </PrivateRoute>
        } />
        <Route path="/profile" element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        } />

        {/* 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;