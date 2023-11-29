import React from 'react'
import apiKey from '../assets/environment/apiKey'
import getPopularMovies from '../modules/getPopularMovies'
import RenderMovie from '../modules/RenderMovie'

function Home() {
    return (
    <div>
        <RenderMovie />
    </div>
  )
}


export default Home