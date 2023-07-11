import React from 'react'
import { useEffect, useState } from 'react';
import './App.css'
import MovieCard from './MovieCard';
const API_URL = 'https://www.omdbapi.com?apikey=c032e2d7'


const App = () => {

  const [searchTerm, setSearchTerm] = useState('Random');
  const [movies, setMovies] = useState([]);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json();
    setMovies(data.Search);
    console.log(data.Search);
  }


  useEffect(() => {
    searchMovies(searchTerm);
  }, []);

  return (
    <div className='app'>
      <h1>Movie Lister</h1>

      <div className='search'>
        <input placeholder='Search for movies...' onChange={(e) => setSearchTerm(e.target.value)} />
        <img src={process.env.PUBLIC_URL + '/search.png'} alt='Search Icon' onClick={() => searchMovies(searchTerm)}></img>
      </div>

      {movies?.length > 0 ? (
        <div className='container'>
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className='empty'> No movies found!</div>
      )}
    </div>
  );
}

export default App