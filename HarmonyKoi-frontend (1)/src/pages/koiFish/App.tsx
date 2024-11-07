import React from 'react'
import KoiFishList from './KoiFishDetail'

const Apps: React.FC = () => {
  return (
    <div className='container min-h-screen bg-gray-100'>
      <header className='header'>
        <h1 className='headerTitle'>Koi Fish Collection</h1>
      </header>
      <main className='mainContent'>
        <KoiFishList />
      </main>
      <footer className='footer'>
        <p>© 2024 Koi Fish Store</p>
      </footer>
    </div>
  )
}

export default Apps
