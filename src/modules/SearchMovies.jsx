import { useState, useEffect } from "react"
import apiKey from "../assets/environment/apiKey"
import { checkFavorite, saveFavoriteMovies } from "./Favorites"
import heartImg from '../assets/images/heart.svg'
import heartFillImg from '../assets/images/heart-fill.svg'
import starImg from '../assets/images/star.png'


const isFavorited = checkFavorite()
// function searchMovieName(movieTitle) {
//     const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey()}&query=${movieTitle}&language=en-US&page=1`
//     const fetchResponse = await fetch(url)
//     const { results } = await fetchResponse.json()
//     console.log(results)
//     return results
// }
// https://api.themoviedb.org/3/movie/1075794?api_key=7da6086803a787193c9595415c04178b&language=en-US
function searchMovieById(movieId) {
    const [movieData, setMovieData] = useState([])

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey()}&language=en-US`;
                const fetchResponse = await fetch(url);
                const data = await fetchResponse.json();
                setMovieData(data.results);
                return movieData
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchMovies();
    }, [])
    const movies = checkFavorite();

    console.log(movies)
    return (
        <div>
            {movies.map((id) => (
                <div key={id.id} className='flex justify-center'>
                    <div className='shadow-xl bg-light-purple border-purple-shadow rounded-lg m-10 w-10/12'>
                        <div className='flex justify-between p-4 items-center'>
                            <div className='flex justify-start mt-6 ml-5 w-6/12'>
                                <img src={`https://image.tmdb.org/t/p/original${id.poster_path}`} className='w-28 h-28 rounded-full' />
                                <div>
                                    <h1 className='ml-5 text-xl font-bold'>{id.title}</h1>
                                    <div className='flex ml-1 mt-5 text-sm font-medium'>
                                        <img src={isFavorited.includes(id.id) ? heartFillImg : heartImg}
                                            className='w-6 mx-3'
                                            onClick={(event) => getFavoritedids(event, id)}
                                        />
                                        <img src={starImg} className='w-6 mx-3' /> {id.vote_average.toFixed(1)}
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
    )
    // const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey()}&language=en-US`
    // try {
    //     const fetchResponse = await fetch(url)
    //     if (!fetchResponse.ok) {
    //         throw new Error(`Failed to fetch ${movieId}`)
    //     }
    //     const movieData = await fetchResponse.json();
    //     return movieData
    // } catch (error) {
    //     console.log(error);
    //     return null
    // }
}
function inputBox(setMovieData) {
    const movieIds = saveFavoriteMovies()
    const promises = movieIds.map((movieId) => searchMovieById(movieId));
    Promise.all(promises)
        .then((movies) => {
            const filteredMovies = movies.filter((movie) => movie !== null);
            setMovieData(filteredMovies)
        })
        .catch((error) => {
            console.log('Error fetching: ', error)
        })
}

export { inputBox }




// const [favoriteChecked, setFavoriteChecked] = useState(false)
// const handleCheckboxChange = () => {
//     setFavoriteChecked(!favoriteChecked)
// }
// useEffect(() => {
//     if (favoriteChecked) {
//         cleanAllMovies();
//         const favorites = saveFavoriteMovies()
//         favorites.forEach(movie => searchMovieId(movie));
//     } else if (!favoriteChecked) {
//         cleanAllMovies();
//     };
// }, [favoriteChecked])
// return null