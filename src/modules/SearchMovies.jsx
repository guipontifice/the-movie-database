import { useState, useEffect } from "react"
import apiKey from "../assets/environment/apiKey"
import { checkFavorite, getFavoritedMovies, saveFavoriteMovies } from "./Favorites"
import heartImg from '../assets/images/heart.svg'
import heartFillImg from '../assets/images/heart-fill.svg'
import starImg from '../assets/images/star.png'
import  { useMovieById }  from '../modules/fetchMovieById'

const isFavorited = checkFavorite()

function searchMovieById({ movieId }) {
    const movieData = useMovieById(movieId)
    if (!movieData) {
        return <div><h1>Loading...</h1></div>
    }
    return (
        <div key={movieData.id} className='flex justify-center'>
            <div className='shadow-xl bg-light-purple border-purple-shadow rounded-lg m-10 w-10/12'>
                <div className='flex justify-between p-4 items-center'>
                    <div className='flex justify-start mt-6 ml-5 w-6/12'>
                        <img src={`https://image.tmdb.org/t/p/original${movieData.poster_path}`} className='w-28 h-28 rounded-full' alt={movieData.title} />
                        <div>
                            <h1 className='ml-5 text-xl font-bold'>{movieData.title}</h1>
                            <div className='flex ml-1 mt-5 text-sm font-medium'>
                                <img src={isFavorited.includes(movieData.id) ? heartFillImg : heartImg}
                                    className='w-6 mx-3'
                                    onClick={(event) => getFavoritedMovies(event, movieData)}
                                />
                                <img src={starImg} className='w-6 mx-3' alt="Star Icon" /> {movieData.vote_average.toFixed(1)}
                            </div>
                        </div>
                    </div>
                    <div className='flex w-6/12'>
                        <p className='flex justify-center text-lg font-thin text-light-gray'>{movieData.overview}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
async function inputBox(setMovieData) {
    try {
        const movieIds = saveFavoriteMovies();
        console.log(saveFavoriteMovies());
        const promises = movieIds.map(async (movieId) => await searchMovieById(movieId));
        const movies = await Promise.all(promises);
        setMovieData(movies.filter((movie) => movie !== null));
    } catch (error) {
        console.log('Error fetching: ', error);
    }
}

export { inputBox }
