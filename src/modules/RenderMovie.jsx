import React, { useState } from 'react'
import apiKey from "../assets/environment/apiKey"
import { useEffect } from 'react'
import heartImg from '../assets/images/heart.svg'
import heartFillImg from '../assets/images/heart-fill.svg'
import starImg from '../assets/images/star.png'
import { getFavoritedMovies, checkFavorite } from './Favorites'
function RenderMovie(movie) {
    const isFavorited = checkFavorite()
    const MOVIES_PER_PAGE = 10;
    const [movieData, setMovieData] = useState([])
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const apiKeyValue = apiKey();
                const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKeyValue}&language=en-US&page=${currentPage}`;
                const response = await fetch(apiUrl);
                const data = await response.json();
                setMovieData(data.results);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchMovies();
    }, [currentPage])

    const nextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
        window.scrollTo({ top: 5, behavior: 'smooth' })
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1)
            window.scrollTo({ top: 5, behavior: 'smooth' })
        }
    }

    return (
        <div className='text-white'>
            {movieData.map((movie) => (
                <div key={movie.id} className='flex justify-center'>
                    <div className='shadow-xl bg-light-purple border-purple-shadow rounded-lg m-10 w-10/12'>
                        <div className='flex justify-between p-4 items-center'>
                            <div className='flex justify-start mt-6 ml-5 w-6/12'>
                                <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} className='w-28 h-28 rounded-full' />
                                <div>
                                    <h1 className='ml-5 text-xl font-bold'>{movie.title}</h1>
                                    <div className='flex ml-1 mt-5 text-sm font-medium'>
                                        <img src={isFavorited.includes(movie.id) ? heartFillImg : heartImg}
                                            className='w-6 mx-3'
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
            <div className='flex justify-center'>
                <div onClick={prevPage}>
                    <ion-icon name="chevron-back-outline"></ion-icon>
                </div>
                <div onClick={nextPage}>
                    <ion-icon name="chevron-forward-outline"></ion-icon>
                </div>
            </div>
        </div>
    )
}

export default RenderMovie