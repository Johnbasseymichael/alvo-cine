import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Movies from './pages/Movies'
import Shows from './pages/Shows'
import Trending from './pages/Trending'
import Pricing from './pages/Pricing'





function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Movies />}/>
        <Route path='/trending' element={<Trending />}/>
        <Route path='/shows' element={<Shows />}/>
        <Route path='/pricing' element={<Pricing />}/>
      </Routes>
    </>
  )
}

export default App
