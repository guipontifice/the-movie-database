import React, { useState, useEffect } from 'react'
import RenderMovie from '../modules/RenderMovie';
import { SearchTitle } from '../utils/SearchMovie';
import FadeMenu from '../components/FadeMenu'

function Header() {
    const [title, setTitle] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showFavoritesOnly, setShowFavoritesOnly] = useState();
    const [searchStatus, setSearchStatus] = useState('');
    const [genreId, setGenreId] = useState('');
    useEffect(() => {
        if (searchStatus === 'genre') {
            console.log('searchStatus: ', searchStatus)
        }
    }, [searchStatus])
    const handleToggleFavorites = () => {
        setSearchStatus('')
        setShowFavoritesOnly(prevState => !prevState);
    }
    const renderComponent = () => {
        if (searchStatus === 'searching') {
            return <div className='bg-purple'><RenderMovie fetchType={'name'} title={title} resetSearchStatus={() => setSearchStatus('searching')} /></div>;
        } else if (searchStatus === 'genre') {
            console.log('We are here')
            return <div className='bg-purple'><RenderMovie fetchType={'genre'} title={genreId} genreId={genreId} resetSearchStatus={() => setSearchStatus('genre')} /></div>
        }
        if (searchStatus !== 'searching' && searchStatus !== 'genre') {
            if (!showFavoritesOnly) {
                return <div className='bg-purple min-w-full'><RenderMovie fetchType={'popular'} resetSearchStatus={() => setSearchStatus('')} /></div>;
            } else if (showFavoritesOnly) {
                return <div className='bg-purple'><RenderMovie fetchType={'favorites'} resetSearchStatus={() => setSearchStatus('')} /></div>;
            }
        }
    };
    const handleSubmit = (event) => {
        event.preventDefault()
        if (searchTerm) {
            setTitle(searchTerm);
            setSearchStatus('searching');
        } else {
            setTitle('');
            setSearchStatus('')
            console.log('Second SearchStatus', searchStatus)
        }
        setSearchTerm('')
    }
    const handleChange = (event) => {
        setSearchTerm(event.target.value)
    }
    const handleGenreSelection = (genreSelection) => {
        setSearchStatus('genre');
        console.log('genreSelection:', genreSelection);
        setGenreId(genreSelection)
        return genreSelection
    }

    return (
        <div className='bg-purple border border-purple h-40 text-white'>
            <header className='h-full'>
                <div className='flex justify-center m-2'>
                    <h1 className='font-bold text-2xl' onClick={handleSubmit}>The Movie Database</h1>
                </div>
                <div className='flex justify-center m-5'>
                    <form onSubmit={handleSubmit} className='relative flex w-8/12'>
                        <input
                            type="text"
                            placeholder='Search for a Movie'
                            name='searchTerm'
                            value={searchTerm}
                            onChange={handleChange}
                            className='border-2 rounded-md border-gray bg-gray text-white flex justify-center h-10 w-full'
                        />
                        <div className='absolute right-0 m-2' onClick={handleSubmit}>
                            <ion-icon name="search"></ion-icon>
                        </div>
                    </form>
                </div>
                <div className='flex justify-center align center mb-1'>
                    <p className='flex justify-center mx-2 hover:border rounded p-1 border-gray hover:border-white' onClick={handleToggleFavorites}>{showFavoritesOnly ? 'Show Popular Movies' : 'Only show my favorite movies'}</p>
                </div>
                <div className='ml-20 mx-5'>
                    <FadeMenu genreSelection={handleGenreSelection} />
                </div>
            </header>
            {renderComponent()}
        </div>
    )
}
export default Header