import React, { useState } from 'react'
import apiKey from '../assets/environment/apiKey'

async function searchMovieName(movieTitle) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey()}&query=${movieTitle}&language=en-US&page=1`
    const fetchResponse = await fetch(url)
    const { results } = await fetchResponse.json()
    return results
}

function searchMoviesByName() {
    const [getText, setGetText] = useState('');
    console.log('We are here')
  return (
    <div>searchMoviesByName</div>
  )
}

export default searchMoviesByName