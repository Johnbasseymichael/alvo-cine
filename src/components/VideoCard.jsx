import React from 'react'
import './style/video-card.css'
import noImg from '../assets/img.png'
import { Link } from 'react-router-dom'
import { BsFillPlayFill } from 'react-icons/bs'

const VideoCard = ({ parentPath, movie, handlePlay }) => {
    const images = ' https://image.tmdb.org/t/p/w500'



    return (
        <div className='video-card' >
            <div className="thunbnail">
                <Link to={`/${parentPath}${movie.id}`}>
                    <img src={movie.poster_path ? images + movie.poster_path : noImg} alt="video thumb nail" />
                </Link>
                <div onClick={() => handlePlay(movie.name ? movie.name : movie.title)} className="play-vid-btn"><BsFillPlayFill /></div>
            </div>
            <div className="video-name">{movie.name ? movie.name : movie.title}</div>
        </div>
    )
}

export default VideoCard
