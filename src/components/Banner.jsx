import React, { useContext } from 'react'
import { SearchContext } from '../context/SearchContext'
import './style/banner.css'
import { BiSearch } from "react-icons/bi";
import { ThemeContext } from '../context/ThemeContext';



const Banner = ({ bannerImage, showSearchBar }) => {
  const { setSearchInput } = useContext(SearchContext)
  const images = ' https://image.tmdb.org/t/p/w500'
  const {lightTheme, setLightTheme } = useContext(ThemeContext)



  const backgroundImageStyle = {
    backgroundImage:
      `linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)), url(${images + bannerImage?.backdrop_path})`,
  };


  return (
    <div className={`banner ${lightTheme && ''}`} style={backgroundImageStyle} >

      <div className="text">
        <h1>Lights, Camera, Action! Welcome to alvo cine</h1>
        <h3>Explore the Cinematic Universe</h3>
        <p>Your Gateway to Hollywood and Beyond</p>
      </div>

      {showSearchBar && <div className='search'>
        <input placeholder='search for your favorite movie' onChange={(e) => setSearchInput(e.target.value)} />
        <span className="icon search-icon"> <BiSearch /></span>
      </div>}

    </div>
  )
}

export default Banner
