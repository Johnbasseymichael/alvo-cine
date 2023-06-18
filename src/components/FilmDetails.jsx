import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './style/film-details.css'
import noImg from '../assets/img.png'
import MovieTrailer from '../trailer/MovieTrailer';

const FilmDetails = ({ movieDetails }) => {
    const images = ' https://image.tmdb.org/t/p/w500'
    const backgroundImageStyle = {
        backgroundImage:
            `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${images + movieDetails?.backdrop_path})`,
    };



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
        <>
            <div className="movie-details">

                <div style={backgroundImageStyle} className='movie'>
                    <div
                        onClick={() => handlePlay(movieDetails?.title)} className="poster"
                    >
                        <img src={movieDetails?.poster_path ? images + movieDetails?.poster_path : noImg} alt="movie poster" />
                    </div>

                    <div className="details">
                        <h1>{movieDetails?.title}</h1>
                        <p className='tagline'>{movieDetails?.tagline}</p>
                        <p>{movieDetails?.release_date}</p>

                        <div
                            onClick={() => handlePlay(movieDetails?.title)}
                            className="play-trailer">
                            <span className="icon">&</span>
                            <small>Play Trailer</small>
                        </div>
<h3>OVERVIEW</h3>
                        <p className="overview">{movieDetails?.overview}</p>

                        {movieDetails?.belongs_to_collection &&
                            <>
                                <h3 className="c-header">collection</h3>
                                <div className="collection">
                                    <img src={images + movieDetails?.belongs_to_collection?.poster_path} alt="image" />
                                    <p className="collection-name">{movieDetails?.belongs_to_collection?.name}</p>
                                </div>
                            </>
                        }

                        {movieDetails?.homepage && <p className="link">
                            <p>you can visit:</p>
                            <Link target='_blank' to={movieDetails?.homepage}>
                                {movieDetails?.homepage}
                            </Link>
                        </p>}

                    </div>




                </div>

                <div className="ggg">

                    <div className="more-details">

                        <div className="production">
                            <h3>production companies</h3>

                            <div className="companies">
                                {movieDetails?.production_companies.map((company) => {
                                    return (
                                        <div className="company" key={company.id}>
                                            <div className="company-logo">
                                                <img src={company.logo_path ? images + company.logo_path : noImg} alt="company logo" />
                                            </div>
                                            <p className="company-name">{company.name}</p>
                                            <p>{company.origin_country}</p>
                                        </div>
                                    )
                                })}
                            </div>

                        </div>
                    </div>

                    <div className="others-container">

                        <div className="others">
                            <h4>production country</h4>
                            {movieDetails?.production_countries.map(country => {
                                return (
                                    <p key={country.name} className="country">{country.name} ({country.iso_3166_1})</p>
                                )
                            })}
                        </div>

                        <div className="others">
                            <h4>status</h4>
                            <p>{movieDetails?.status}</p>
                        </div>

                        <div className="others">
                            <h4>release date</h4>
                            <p>{movieDetails?.release_date}</p>
                        </div>

                        <div className="others">
                            <h4>budget</h4>
                            <p>${movieDetails?.budget}</p>
                        </div>

                        <div className="others">
                            <h4>revenue</h4>
                            <p>${movieDetails?.revenue}</p>
                        </div>

                        <div className="others">
                            <h4>spoken languages</h4>
                            <div>{movieDetails?.spoken_languages.map(lang => {
                                return <p key={lang.english_name}>{lang.english_name}</p>
                            })}</div>
                        </div>

                    </div>
                </div>

            </div>

            {showTrailer &&
                <div onClick={handleClose} className='trailer-container'>
                    <div className='close-video-btn' onClick={handleClose}>&</div>
                    <MovieTrailer movieTitle={movieTitle} />
                </div>
            }
        </>
    )
}

export default FilmDetails
