import React from 'react'

function Header() {
    return (
        <div className='border border-purple h-40 text-white'>
            <header className='h-full'>
                <div className='flex justify-center m-2'>
                    <h1 className='font-bold text-2xl'>Popular Movies</h1>
                </div>
                <div className='flex justify-center m-5'>
                    <input type="text" placeholder='Search for a Movie' className='border-2 rounded-md border-gray bg-gray text-white flex justify-center h-10 w-8/12' />
                </div>
                <div className='flex justify-center align center mb-1'>
                    <p className='flex justify-center mx-2'>Only show my favorite movies</p>
                    <input type="radio" value='' />
                </div>
            </header>
        </div>
    )
}

export default Header