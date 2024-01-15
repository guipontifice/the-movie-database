import React, { useState, useEffect } from 'react';
import apiKey from '../assets/environment/apiKey';

async function fetchMovieById(movieId) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey()}&language=en-US`;
    const response = await fetch(url);
    const data = await response.json();
    return data;  // Return the movie data directly
}

function useMovieById(movieId) {
    const [movieData, setMovieData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchMovieById(movieId);
                setMovieData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [movieId]);

    return movieData;
}

export { useMovieById, fetchMovieById };