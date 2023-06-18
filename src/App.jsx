import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Movies from './pages/Movies'
import Shows from './pages/Shows'
import Trending from './pages/Trending'
import Pricing from './pages/Pricing'
import UpComing from './pages/UpComing'
import MovieDetails from './pages/MovieDetails'
import { useEffect, useState } from 'react'





function App() {



  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);







  // if (isOnline) {
    return (
      <>
        <Navbar />
        <Routes>
          <Route path='/' element={<Movies />} />
          <Route path='/trending' element={<Trending />} />
          <Route path='/shows' element={<Shows />} />
          <Route path='/upcoming' element={<UpComing />} />
          <Route path='/pricing' element={<Pricing />} />


          <Route path='/:movieId' element={<MovieDetails />} />
          <Route path='/upcoming/:movieId' element={<MovieDetails />} />
          <Route path='/shows/:movieId' element={<MovieDetails />} />
          <Route path='/trending/:movieId' element={<MovieDetails />} />
        </Routes>
      </>

    )
  // } else {
  //  return <h1>u r offline</h1>
  // }

}

export default App



