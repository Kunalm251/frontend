import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import API from '../utils/api';

const MovieManagement = () => {
  const [movies, setMovies] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentMovie, setCurrentMovie] = useState({
    title: '',
    description: '',
    genre: '',
    duration: '',
    releaseDate: '',
    poster: ''
  });

  // Get token from localStorage or some other secure place
  const token = localStorage.getItem('authToken'); // or sessionStorage, depending on how you're storing it

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const { data } = await API.get('/movies', {
        headers: {
          'Authorization': `Bearer ${token}` // Add token here
        }
      });
      setMovies(data);
    } catch (err) {
      console.error('Failed to fetch movies:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentMovie({ ...currentMovie, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (currentMovie._id) {
        await API.put(`/admin/movies/${currentMovie._id}`, currentMovie, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      } else {
        await API.post('/admin/movies', currentMovie, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
      setOpen(false);
      fetchMovies();
    } catch (err) {
      console.error('Failed to save movie:', err);
    }
  };

  const handleEdit = (movie) => {
    setCurrentMovie(movie);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/admin/movies/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      fetchMovies();
    } catch (err) {
      console.error('Failed to delete movie:', err);
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={() => { setCurrentMovie({}); setOpen(true); }}>
        Add New Movie
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Poster</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Genre</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.map((movie) => (
              <TableRow key={movie._id}>
                <TableCell><img src={movie.poster} alt={movie.title} style={{ height: '50px' }} /></TableCell>
                <TableCell>{movie.title}</TableCell>
                <TableCell>{movie.genre}</TableCell>
                <TableCell>{movie.duration} mins</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(movie)}>Edit</Button>
                  <Button color="error" onClick={() => handleDelete(movie._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{currentMovie._id ? 'Edit Movie' : 'Add New Movie'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="title"
            label="Title"
            fullWidth
            value={currentMovie.title}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={currentMovie.description}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="genre"
            label="Genre"
            fullWidth
            value={currentMovie.genre}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="duration"
            label="Duration (minutes)"
            type="number"
            fullWidth
            value={currentMovie.duration}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="releaseDate"
            label="Release Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={currentMovie.releaseDate}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="poster"
            label="Poster URL"
            fullWidth
            value={currentMovie.poster}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MovieManagement;
