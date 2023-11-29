import apiKey from "../assets/environment/apiKey"

async function getPopularMovies() {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey()}&language=en-US&page=1`
    const fetchResponse = await fetch(url)
    const {results} = await fetchResponse.json()
    return results
}

export default getPopularMovies

