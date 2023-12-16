import React, { useState } from 'react'
import { useEffect } from 'react'
import heartImg from '../assets/images/heart.svg'
import heartFillImg from '../assets/images/heart-fill.svg'
import starImg from '../assets/images/star.png'
import { getFavoritedMovies, checkFavorite, searchMovieId } from './Favorites'
import { SearchMovie, SearchTitle } from './SearchMovie'

function RenderMovie({ fetchType, title }) {
    const isFavorited = checkFavorite()
    const MOVIES_PER_PAGE = 10;
    const [movieData, setMovieData] = useState([])
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let data;
                if (fetchType === 'name') {
                    data = await SearchTitle(title)
                }
                else if (fetchType === 'favorites') {
                    const fetchDataArray = isFavorited.map(async (movieId) => {
                        return await searchMovieId(movieId);
                    });
                    data = await Promise.all(fetchDataArray);
                } else if (fetchType === 'popular') {
                    data = await SearchMovie(currentPage);
                }
                console.log('API URL:', data);
                setMovieData(data);
                console.log('MovieData: ', data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [currentPage, fetchType, title]);

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
        <>
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
                                                className='w-6 mx-3 cursor-pointer'
                                                onClick={(event) => getFavoritedMovies(event, movie)}
                                            />
                                            <img src={starImg} className='w-6 mx-3' /> {movie.vote_average?.toFixed(1)}
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
                <div className='flex justify-center cursor-pointer'>
                    <ion-icon name="chevron-back-outline" onClick={prevPage}></ion-icon>
                    <ion-icon name="chevron-forward-outline" onClick={nextPage}></ion-icon>
                </div>
            </div>
        </>
    )
}

export default RenderMovie