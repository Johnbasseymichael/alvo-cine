import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import movieTrailer from 'movie-trailer'


const MovieTrailer = ({ movieTitle }) => {
    const [video, setVideo] = useState('')
    const [videoURL, setVideoURL] = useState('https://www.youtube.com/watch?v=vubGEqD_a_E')

    useEffect(() => {
        setVideo(movieTitle)
        movieTrailer(video).then((res) => {
            setVideoURL(res)
        })
    }, [videoURL]) 



    return (
        <div className='trailer'>
            <ReactPlayer url={videoURL} controls playing muted={false} />
        </div>
    )
}

export default MovieTrailer
