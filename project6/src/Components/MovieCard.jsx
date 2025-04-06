import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

export default function MovieCard({ id, title, vote_average, release_date, popularity, overview }) {
    const [movieImage, setMovieImage] = useState("");

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_KEY}`,
            },
        };
    
        const fetchMovieImage = async () => {
            try {
                const response = await fetch(
                `https://api.themoviedb.org/3/movie/${id}/images`, options);
                const data = await response.json();

                // Check if the data contains images
                if (data.backdrops && data.backdrops.length > 0) {
                    // Use the first image from the backdrops array
                    setMovieImage(`https://image.tmdb.org/t/p/w500${data.backdrops[0].file_path}`);
                } else {
                    console.log("No images available for this movie.");
                }
            } catch (error) {
                console.error('Error fetching movie data:', error);
            }
        };
        fetchMovieImage();
    }, [id]); 

    return (
        <Link className="card-link" to={`/movieDetails/${id}`}>
            <div className="movie-card">
            <img
                src={movieImage} // Adjust the size if needed
                alt={title}
            />
            <div className="movie-card-content">
                <h2 className="movie-card-title">{title}</h2>
                <p className="movie-card-overview">{overview}</p>
                <p className="movie-card-score">Score: {vote_average} / 10</p>
                <p className="movie-card-popularity">Popularity: {popularity}</p>
                <p className="movie-card-release-date">Release Date: {release_date}</p>
            </div>
            </div>
        </Link>
      );
}