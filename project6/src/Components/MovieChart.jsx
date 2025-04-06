import React, { PureComponent, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function MovieChart() {
    
    const [movieYearData, setMovieYearData] = React.useState([]);
    const [regionMovieAmount, setRegionMovieAmount] = React.useState([]);

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_KEY}`,
            },
        };

        const fetchYearlyMovieData = async () => {

            const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);

            const movieCounts = await Promise.all(
                years.map(async (year) => {
                    const response = await fetch(
                        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_year=${year}&sort_by=popularity.desc`,
                        options
                    );
                    const data = await response.json();
                    return { year, count: data.total_results };
                })
            );

            setMovieYearData(movieCounts.reverse());
        };

        
        const fetchRegionMovieData = async () => {
            const Region = ["US", "TW", "JP", "KR", "FR"];

            const movieCounts = await Promise.all(
                Region.map(async (region) => {
                    const response = await fetch(
                        `https://api.themoviedb.org/3/movie/now_playing?page=1&region=${region}`,
                        options
                    );
                    const data = await response.json();
                    return { region, count: data.total_results };
                })
            );
            setRegionMovieAmount(movieCounts);   
        }

        fetchRegionMovieData();
        fetchYearlyMovieData();
    }
    , []);

    const handleToggle = (e) => {
        const chartContainers = document.querySelectorAll('.movie-chart'); // Select all `.movie-chart` elements
        chartContainers.forEach((chartContainer) => {
            if (e.target.checked) {
                chartContainer.style.display = 'block'; // Hide the charts
            } else {
                chartContainer.style.display = 'none'; // Show the charts
            }
        });
    };

    return (
        <>
            <div className="container-chart">
                <label className="switch">
                    <input type="checkbox"
                    defaultChecked={true}
                    onClick={handleToggle} 
                    />
                    <span className="slider round"></span>
                </label>
                <h2>Interesting Facts about Movies</h2>
                <br />
                <div className="movie-chart">
                    <h2>Movie Release Count Over the Years</h2>
                    <p>The number of movies released annually has grown.</p>
                    <br />
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={movieYearData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="movie-chart">
                    <h2>Currently Playing Movies Amount in the Country</h2>
                    <p>The United States leads the countries depicted in the chart in terms of the number of movies currently playing in theaters.</p>
                    <br />
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={regionMovieAmount}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="region" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="count" stroke="#82ca9d" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    );
}

export default MovieChart;