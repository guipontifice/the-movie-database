import React, { useState } from 'react'
import apiKey from "../assets/environment/apiKey"
import { useEffect } from 'react'
function RenderMovie() {
    const [movieData, setMovieData] = useState([])
    try {
        const apiKeyValue = apiKey();
        console.log('API Key:', apiKeyValue);

        const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKeyValue}&language=en-US&page=1`;
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                setMovieData(data.results);
                console.log('Fetched movie data:', data.results);
            })
            .catch(error => console.error('Error fetching data:', error));
    } catch (error) {
        console.error('Error getting API key:', error);
    }

    return (
        <div>
            <div>
                {movieData.map((movie) => (
                    <div key={movie.id}>
                        <h2>{movie.title}</h2>
                        <p>{movie.overview}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RenderMovie