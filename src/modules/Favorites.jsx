import RenderMovie from "./RenderMovie";
import apiKey from "../data/apiKey";
import { useState, useEffect } from "react";
import favoritedImg from '../../public/images/heart-fill.svg'
import notFavoritedImg from '../../public/images/heart.svg'

async function searchMovieId(movieId) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey()}&language=en-US`;
    const fetchResponse = await fetch(url);
    const movieData = await fetchResponse.json();
    return movieData
}


function getFavoritedMovies(event, movie) {
    console.log('We are here')
    console.log(event.target)
    const favoriteState = {
        favorited: favoritedImg,
        notFavorited: notFavoritedImg
    };
    if (event.target.src === favoriteState.notFavorited) {
        event.target.src = favoriteState.favorited;
        saveToLocalStorage(movie);
        console.log('Favorited');
    } else if (event.target.src === favoriteState.favorited) {
        event.target.src = favoriteState.notFavorited;
        removeFromLocalStorage(movie.id);
        console.log('Desfavorited')
    }
}

function removeFromLocalStorage(movie) {
    const favorites = checkFavorite();

    for (let i = 0; i < favorites.length; i++) {
        if (favorites[i] === movie) {
            favorites.splice(i, 1)
            localStorage.setItem('favorites', JSON.stringify(favorites))
            break;
        }
    }
}
function saveToLocalStorage(movie) {
    let movies = saveFavoriteMovies();
    console.log(movies)
    if (!Array.isArray(movies) || movies === null) {
        movies = [];
    }
    movies.push(movie.id)
    const newMovies = [...new Set(movies)];
    const moviesJSON = JSON.stringify(newMovies);
    return localStorage.setItem('favorites', moviesJSON);
}

function saveFavoriteMovies() {
    return JSON.parse(localStorage.getItem('favorites'))
}

function checkFavorite() {
    const checkJSON = JSON.parse(localStorage.getItem('favorites'));
    let newCheckJSON = [];
    if (Array.isArray(checkJSON)) {
        newCheckJSON.push(...checkJSON);
    }
    return newCheckJSON;
}

export { getFavoritedMovies, checkFavorite, searchMovieId, saveFavoriteMovies }