import React, { useContext, useEffect, useState } from 'react'
import VideoCard from './VideoCard'
import './style/movie-list.css'
import MovieTrailer from '../trailer/MovieTrailer'
import { ThemeContext } from '../context/ThemeContext'

const MovieList = ({ parentPath, getMovies }) => {
    const [movieTitle, setMovieTile] = useState('')
    const [showTrailer, setShowTrailer] = useState(false)
    const { lightTheme } = useContext(ThemeContext)


    const handlePlay = (title) => {
        setMovieTile(title)
        setShowTrailer(true)
    }

    const handleClose = () => {
        setMovieTile('')
        setShowTrailer(false)
    }
    return (
        <div className={`movie-list ${lightTheme && 'lt-bg'}`}>
            {showTrailer &&
                <div onClick={handleClose} className='trailer-container'>
                    <div className='close-video-btn' onClick={handleClose}>&</div>
                    <MovieTrailer movieTitle={movieTitle} />
                </div>
            }

            {getMovies?.map(movie => (
                <VideoCard parentPath={parentPath} handlePlay={handlePlay} key={movie.id} movie={movie} />
            ))}
        </div>
    )
}

export default MovieList
