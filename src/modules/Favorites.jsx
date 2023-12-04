import RenderMovie from "./RenderMovie";
import apiKey from "../assets/environment/apiKey";

const inputBox = document.querySelector('input[type="radio"]');


function inputBox() {
    const [favoriteChecked, setFavoriteChecked] = useState(false)
    const handleCheckboxChange = () => {
        setFavoriteChecked(!favoriteChecked)
}
    if (isChecked) {
        cleanAllMovies();
        const favorites = saveFavoriteMovies()
        favorites.forEach(movie => searchMovieId(movie));
    } else if (!isChecked) {
        cleanAllMovies();
        RenderMovie()
    }
}
async function searchMovieId(movieId) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey()}&language=en-US`;
    const fetchResponse = await fetch(url);
    const movieData = await fetchResponse.json();
    return RenderMovie(movieData)
}


function getFavoritedMovies(event, movie) {
    const favoriteState = {
        favorited: '../assets/images/heart-fill.svg',
        notFavorited: '../assets/images/heart.svg'
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
    const movies = saveFavoriteMovies();
    console.log(movies)
    if (movies !== null) {
        movies.push(movie.id)
    }
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
    if (checkJSON) {
        newCheckJSON.push(...checkJSON);
    }
    return newCheckJSON;
}

export { getFavoritedMovies, checkFavorite, inputBox }