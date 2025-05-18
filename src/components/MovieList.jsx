import React, { useContext, useEffect, useState } from 'react'
import VideoCard from './VideoCard'
import './style/movie-list.css'
import MovieTrailer from '../trailer/MovieTrailer'

const MovieList = ({ parentPath, getMovies }) => {
    const [movieTitle, setMovieTile] = useState('')
    const [showTrailer, setShowTrailer] = useState(false)


    const handlePlay = (title) => {
        setMovieTile(title)
        setShowTrailer(true)
    }

    const handleClose = () => {
        setMovieTile('')
        setShowTrailer(false)
    }
    return (
        <div className='movie-list' >
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
