import React, { useState } from 'react'
import RenderMovie from '../modules/RenderMovie';
import SearchMovieById from '../modules/SearchMovieById';
import searchMoviesByName from '../modules/searchMoviesByName';

function Header() {
    const [movieData, setMovieData] = useState([]);
    const [title, setTitle] = useState('');
    const [showFavoritesOnly, setShowFavoritesOnly] = useState();
    const handleToggleFavorites = () => {
        setShowFavoritesOnly(!showFavoritesOnly);
    }
    const renderComponent = () => {
        if (showFavoritesOnly) {
            return ( <div className='bg-purple min-w-full'><RenderMovie /></div>);
        } else {
            return (<div className='bg-purple'><SearchMovieById /></div>);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        const results = await searchMoviesByName(event.target.value);
        setTitle(results)
    }
    return (
        <div className='bg-purple border border-purple h-40 text-white'>
            <header className='h-full'>
                <div className='flex justify-center m-2'>
                    <h1 className='font-bold text-2xl'>Popular Movies</h1>
                </div>
                <div className='flex justify-center m-5'>
                    <form onSubmit={handleSubmit} className='relative flex w-8/12'>
                        <input
                            type="text"
                            placeholder='Search for a Movie'
                            className='border-2 rounded-md border-gray bg-gray text-white flex justify-center h-10 w-full'
                            onChange={handleSubmit}
                        />
                        <div className='absolute right-0 m-2' onClick={handleSubmit}>
                            <ion-icon name="search"></ion-icon>
                        </div>
                    </form>
                </div>
                <div className='flex justify-center align center mb-1'>
                    <p className='flex justify-center mx-2 hover:border rounded p-1 border-gray hover:border-white' onClick={handleToggleFavorites}>{showFavoritesOnly ? 'Only show my favorite movies' : 'Show Popular Movies'}</p>
                </div>
            </header>
            {renderComponent()}
        </div>
    )
}

export default Header