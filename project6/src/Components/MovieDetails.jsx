import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function MovieDetails() {

    let params = useParams();

    const [fullDetails, setFullDetails] = useState(null);

    

    useEffect(() => {

        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${API_KEY}`,
            }
          };
          
        const getMovieDetail = async () => {
          const details = await fetch(`https://api.themoviedb.org/3/movie/${params.id}?language=en-US`, options)
          const detailsJson = await details.json();
          
          console.log(detailsJson);
          
          setFullDetails(detailsJson);
        };
        
        getMovieDetail().catch(console.error);

    }, [params.id]);

    return(
        <>
        {fullDetails ? (
            <div className="container-list">
                <h1>{fullDetails.original_title}</h1>
                <img
                    src={`https://image.tmdb.org/t/p/w500${fullDetails.poster_path}`}
                    alt={fullDetails.original_title}
                    style={{ width: "300px", height: "450px", borderRadius: "10px" }}
                    />
                <p>{fullDetails.overview}</p>
                <table>
                    <thead>
                        <tr>
                            <th>Movie Details</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Runtime</td>
                            <td>{fullDetails.runtime} minutes</td>
                        </tr>
                        <tr>
                            <td>Production Companies</td>
                            <td>{fullDetails.production_companies.map(company => company.name).join(", ")}</td>
                        </tr>
                        <tr>
                            <td>Origin Country</td>
                            <td>{fullDetails.origin_country.map(country => country).join(", ")}</td>
                        </tr>
                        <tr>
                            <td>Language</td>
                            <td>{fullDetails.original_language}</td>
                        </tr>
                        <tr>
                            <td>Genres</td>
                            <td>{fullDetails.genres.map(genre => genre.name).join(", ")}</td>
                        </tr>
                        <tr>
                            <td>Release Date</td>
                            <td>{fullDetails.release_date}</td>
                        </tr>
                        <tr>
                            <td>TMDB Rating</td>
                            <td>{fullDetails.vote_average} / 10</td>
                        </tr>
                        <tr>
                            <td>TMDB Rating Count</td>
                            <td>{fullDetails.vote_count} times</td>
                        </tr>
                        <tr>
                            <td>TMDB Popularity</td>
                            <td>{fullDetails.popularity}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            ) : null}
        </>
    )
}

export default MovieDetails;