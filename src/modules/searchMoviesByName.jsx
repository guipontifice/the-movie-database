import React, { useState, useEffect } from 'react'
import apiKey from '../assets/environment/apiKey'
import heartImg from '../assets/images/heart.svg';
import heartFillImg from '../assets/images/heart-fill.svg';
import starImg from '../assets/images/star.png';

async function searchMovieName(movieTitle) {
    const fetchResponse = await fetch(url);
    const { results } = await fetchResponse.json();
    return results;
}

function searchMoviesByName(movieTitle) {
    const [movieData, setMovieData] = useState();
    const [data, setData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const handleFilter = (value) => {
        const res = filterData.filter(movie => movie.title.toLowerCase().includes(value))
    }
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const promises = movies.map(async (movieId) => {
                    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey()}&query=${movieTitle}&language=en-US&page=1`
                    const fetchResponse = await fetch(url);
                    const data = await fetchResponse.json();
                    return data;
                });

                const movieDetails = await Promise.all(promises);
                setMovieData(movieDetails);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        console.log(movieTitle)
        fetchMovies();
    }, [movieTitle])

    return (
        <>
            <div className='text-white'>
                {Array.isArray(movieData) && movieData.map((movie) => (
                    <div key={movie.id} className="flex justify-center">
                        <div key={movie.id} className='shadow-xl bg-light-purple border-purple-shadow rounded-lg m-10 w-10/12'>
                            <div className='flex justify-between p-4 items-center'>
                                <div className='flex justify-start mt-6 ml-5 w-6/12'>
                                    <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} className='w-28 h-28 rounded-full' alt={movie.title} />
                                    <div>
                                        <h1 className='ml-5 text-xl font-bold'>{movie.title}</h1>
                                        <div className='flex ml-1 mt-5 text-sm font-medium'>
                                            <img src={movies.includes(movie.id) ? heartFillImg : heartImg}
                                                className='w-6 mx-3 cursor-pointer'
                                                onClick={(event) => getFavoritedMovies(event, movie)}
                                            />
                                            <img src={starImg} className='w-6 mx-3' /> {movie.vote_average.toFixed(1)}
                                        </div>
                                    </div>

                                </div>
                                <div className='flex w-6/12'>
                                    <p className='flex justify-center text-lg font-thin text-light-gray'>{movie.overview}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default searchMoviesByName