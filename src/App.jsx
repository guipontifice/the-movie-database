import React from 'react'
import Header from './pages/Header'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className='bg-purple min-h-screen'>
        <Routes>
          <Route path='/movie-database' element={<Header />} />
        </Routes>
    </div>
  )
}

export default App