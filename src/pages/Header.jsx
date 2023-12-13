import React, { useState } from 'react'
import RenderMovie from '../modules/RenderMovie';

function Header() {
    const [title, setTitle] = useState('');
    const [showFavoritesOnly, setShowFavoritesOnly] = useState();
    const handleToggleFavorites = () => {
        setShowFavoritesOnly(!showFavoritesOnly);
    }
    const renderComponent = () => {
        if (!showFavoritesOnly) {
            return (<div className='bg-purple min-w-full'><RenderMovie fetchType={'popular'}/></div>);
        } else if (showFavoritesOnly) {
            return (<div className='bg-purple'><RenderMovie fetchType={'favorites'}/></div>);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const searchTerm = event.target.value;
        try {
            const results = await searchEngine(searchTerm);
            setTitle(results);
        } catch (error) {
            console.error('Error searching:', error);
        }

    };
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
                        />
                        <div className='absolute right-0 m-2' onClick={handleSubmit}>
                            <ion-icon name="search"></ion-icon>
                        </div>
                    </form>
                </div>
                <div className='flex justify-center align center mb-1'>
                    <p className='flex justify-center mx-2 hover:border rounded p-1 border-gray hover:border-white' onClick={handleToggleFavorites}>{showFavoritesOnly ? 'Show Popular Movies' : 'Only show my favorite movies'}</p>
                </div>
            </header>
            {renderComponent()}
        </div>
    )
}

export default Header