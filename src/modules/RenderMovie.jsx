import React, { useState } from 'react'
import apiKey from "../assets/environment/apiKey"
import { useEffect } from 'react'
function RenderMovie() {
    const [movieData, setMovieData] = useState([])
    try {
        const apiKeyValue = apiKey();

        const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKeyValue}&language=en-US&page=1`;
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                setMovieData(data.results);
            })
            .catch(error => console.error('Error fetching data:', error));
    } catch (error) {
        console.error('Error getting API key:', error);
    }

    return (
        <div className='text-white'>
            {movieData.map((movie) => (
                <div key={movie.id} className='flex justify-center'>
                    <div className='border-2 m-10 w-10/12'>
                        <div className='flex justify-between'>
                            <div className='flex justify-start  w-6/12'>
                                <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} className='w-28 h-28 rounded-full' />
                                <div>
                                    <h2 className='ml-5'>{movie.title}</h2>
                                    <img src='../assets/images/heart-fill.svg' className='w-6' />
                                </div>
                            </div>
                            <div className='w-6/12'>
                                <p>{movie.overview}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default RenderMovie