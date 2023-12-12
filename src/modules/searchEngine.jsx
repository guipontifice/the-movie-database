import apiKey from "../assets/environment/apiKey";

async function searchEngine(movieTitle) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey()}&query=${movieTitle}&language=en-US&page=1`;

    try {
        const fetchResponse = await fetch(url);
        const { results } = await fetchResponse.json();
        console.log(results)
        return results;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Rethrow the error for further handling if needed
    }
}

export default searchEngine
