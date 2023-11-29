import React from 'react'

function Header() {
    return (
        <div className='border h-40'>
            <header className='h-full'>
                <div className='flex justify-center m-2'>
                    <h1>Popular Movies</h1>
                </div>
                <div className='flex justify-center border-2 m-5'>
                    <input type="text" placeholder='Search for a Movie' className='border-2 flex justify-center' />
                </div>
                <div className='flex justify-center align center mb-1'>
                    <p className='flex justify-center mx-2'>Show only Favorites</p>
                    <input type="radio" value='' />
                </div>
            </header>
        </div>
    )
}

export default Header