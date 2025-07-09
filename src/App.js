// src/App.js
import './App.css';
import logo from './assets/logo.png';
import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import { useDebounce } from './hooks/useDebounce';

const App = () => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);


  const [darkMode, setDarkMode] = useState(() => {
  return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setSelectedMovie(null);
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);


  const fetchMovieDetails = async (id) => {
  try {
    const res = await fetch(`https://www.omdbapi.com/?apikey=d8690e9a&i=${id}`);
    const data = await res.json();
    if (data.Response === 'True') {
      setMovieDetails(data);
    } else {
      setMovieDetails(null);
    }
    } catch (error) {
      setMovieDetails(null);
    }
  };



  // ✅ Watchlist state from localStorage
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('watchlist');
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ Fetch movies from OMDb API
  useEffect(() => {
    const fetchMovies = async () => {
      if (debouncedQuery.trim() === '') {
        setMovies([]);
        return;
      }

      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=d8690e9a&s=${debouncedQuery}&type=movie`
        );
        const data = await res.json();
        if (data.Response === 'True') {
          setMovies(data.Search.slice(0, 10)); // Limit to 10
          setError(null);
        } else {
          setMovies([]);
          setError(data.Error);
        }
      } catch (err) {
        setMovies([]);
        setError('Failed to fetch movies.');
      }
    };

    fetchMovies();
  }, [debouncedQuery]);

  // ✅ Add to Watchlist (prevent duplicates)
  const addToWatchlist = (movie) => {
    if (!watchlist.some((m) => m.imdbID === movie.imdbID)) {
      const updated = [...watchlist, movie];
      setWatchlist(updated);
      localStorage.setItem('watchlist', JSON.stringify(updated));
    }
  };

  const removeFromWatchlist = (movieId) => {
  const updated = watchlist.filter((m) => m.imdbID !== movieId);
  setWatchlist(updated);
  localStorage.setItem('watchlist', JSON.stringify(updated));
  };





return (
  <>

  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet"></link>
    {/* 🌙 Dark Mode Toggle Button */}
    <button
      className="theme-toggle"
      onClick={() => setDarkMode(!darkMode)}
      title="Toggle theme"
    >
      {darkMode ? '☀️' : '🌙'}
    </button>

    <div className="container">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '10px' }}>
        <img src={logo} alt="Logo" style={{ height: '40px' }} />
        <h1 style={{ margin: 0 }}>Mini Movie Explorer</h1>
      </div>


      <SearchBar query={query} setQuery={setQuery} />

      {error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>}

      {/* 🔍 Search Results */}
      <div className="grid">
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            className="movie-card"
            onClick={() => {
              setSelectedMovie(movie.imdbID);
              fetchMovieDetails(movie.imdbID);
            }}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150x220?text=No+Image'}
              alt={movie.Title}
            />
            <h4>{movie.Title}</h4>
            <p>({movie.Year})</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToWatchlist(movie);
              }}
            >
              + Watchlist
            </button>
          </div>
        ))}
      </div>

      {/* 🎥 Watchlist */}
      <h2>🎥 Your Watchlist</h2>
      <div className="grid">
        {watchlist.length === 0 ? (
          <p style={{ gridColumn: '1 / -1' }}>No movies in watchlist.</p>
        ) : (
          watchlist.map((movie) => (
            <div
              key={movie.imdbID}
              className="movie-card"
              onClick={() => {
                setSelectedMovie(movie.imdbID);
                fetchMovieDetails(movie.imdbID);
              }}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150x220?text=No+Image'}
                alt={movie.Title}
              />
              <h4>{movie.Title}</h4>
              <p>({movie.Year})</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromWatchlist(movie.imdbID);
                }}
                style={{ backgroundColor: '#dc3545' }}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>

    {/* 📋 Movie Detail Drawer */}
    {selectedMovie && movieDetails && (
      <div className="drawer">
        <button className="close-btn" onClick={() => setSelectedMovie(null)}>✖</button>
        <img
          src={movieDetails.Poster !== 'N/A' ? movieDetails.Poster : 'https://via.placeholder.com/300x450?text=No+Image'}
          alt={movieDetails.Title}
        />
        <h2>{movieDetails.Title}</h2>
        <p><strong>Year:</strong> {movieDetails.Year}</p>
        <p><strong>Genre:</strong> {movieDetails.Genre}</p>
        <p><strong>IMDb Rating:</strong> {movieDetails.imdbRating}</p>
        <p><strong>Plot:</strong> {movieDetails.Plot}</p>
      </div>
    )}
  </>
);


};

export default App;
