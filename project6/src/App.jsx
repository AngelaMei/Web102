import { useState, useEffect } from 'react'
import './App.css'
import MovieCard from './Components/MovieCard';
import MovieChart from './Components/MovieChart';

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [movieData, setMovieData] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [rating, setRating] = useState(0);

  useEffect(() => {
    const options = {
      method: 'GET', // Fixed typo here
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
    };
  
    const fetchMovieData = async () => {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&2',
          options
        );
        const data = await response.json();
        setMovieData(data.results);
        console.log(data.results);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };
  
    fetchMovieData();
  }, []); // Added dependency array to ensure it runs only once

  const searchItems = searchValue => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = movieData.filter((item) => 
        item.title.toLowerCase().includes(searchValue.toLowerCase())
      )
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(Object.values(movieData));
    }
  }

  const combinedResults = () => {
    let moviesFilters = searchInput.length > 0 ? filteredResults : movieData;
    return moviesFilters.filter((movie) => {
      if (rating) {
        return movie.vote_average >= rating;
      }
      return true;
    })
  }

  return (
    <>
    <div className='container-row'>
        <div className="container-list">
        <h1>Popular Movie List on TMDB</h1>
        <div className="row">
          <input
            type="text"
            placeholder="Search a Movie..."
            onChange={(inputString) => searchItems(inputString.target.value)}
          />
          <div className="rangeSlider">
            <label htmlFor="rating"><strong>Rating</strong></label>
            <input 
              type="range" 
              id="rating" 
              name="rating" 
              min="0" 
              max="10" 
              step="0.1"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              />
            <span>{rating}</span>
          </div>
        </div>
        <div className="row">
          <div className='movie-card'>
            <div className="movie-card-content">
              {movieData.length > 0 && (
                <h2>
                  👑
                  <br />
                  {movieData.reduce((highest, movie) => 
                    movie.vote_average > highest.vote_average ? movie : highest).title}
                  <br />
                  {movieData.reduce((highest, movie) => 
                    movie.vote_average > highest.vote_average ? movie : highest).vote_average} / 10
                </h2>
              )}
              <h4>Top Rated in the list</h4>
            </div>
          </div>
          <div className='movie-card'>
            <div className="movie-card-content">
              {movieData.length > 0 && (
                <h2>
                  🆕
                  <br />
                  {movieData.reduce((newest, movie) => 
                    movie.release_date > newest.release_date ? movie : newest).title}
                  <br />
                  {movieData.reduce((newest, movie) => 
                    movie.release_date > newest.release_date ? movie : newest).release_date}
                  </h2>
              )}
              <h4>The Newest in the list</h4>
            </div>
          </div>
          <div className='movie-card'>
            <div className="movie-card-content">
              {movieData.length > 0 && (
                <h2>
                  ∑
                  <br />
                  Sum of Popularity <br />
                  {movieData.reduce((total, movie) =>
                    total + movie.popularity, 0).toFixed(2)}
                  </h2>
              )}
              <h4>Aggregated Popularity</h4>
            </div>
          </div>
        </div>
        <ul>
          {combinedResults().map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                vote_average={movie.vote_average}
                release_date={movie.release_date}
                vote_count={movie.vote_count}
                overview={movie.overview}
                popularity={movie.popularity}
              />
            ))}
          {/* {searchInput.length > 0
            ? filteredResults.map((movie) => (
              <MovieCard
                id={movie.id}
                title={movie.title}
                vote_average={movie.vote_average}
                release_date={movie.release_date}
                vote_count={movie.vote_count}
                overview={movie.overview}
                popularity={movie.popularity}
              />
            ))
            : movieData && movieData.map((movie) => (
              <MovieCard
                id={movie.id}
                title={movie.title}
                vote_average={movie.vote_average}
                release_date={movie.release_date}
                vote_count={movie.vote_count}
                overview={movie.overview}
                popularity={movie.popularity}
              />
            ))
          } */}
        </ul>
      </div>
      <MovieChart />
      </div>
    </>
  )
}

export default App
