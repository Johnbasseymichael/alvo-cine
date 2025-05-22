import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style/film-details.css";
import noImg from "../assets/img.png";
import MovieTrailer from "../trailer/MovieTrailer";
import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

const FilmDetails = ({ tvShow, movieDetails }) => {
    const images = " https://image.tmdb.org/t/p/w500";
    const backgroundImageStyle = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url(${
            images + movieDetails?.backdrop_path
        })`,
    };

    useEffect(() => {
        document.title =
            movieDetails?.title || movieDetails?.name + " || AlvoCine";
    }, []);

    const [movieTitle, setMovieTile] = useState("");
    const [showTrailer, setShowTrailer] = useState(false);

    const handlePlay = (title) => {
        setMovieTile(title);
        setShowTrailer(true);
    };

    const handleClose = () => {
        setMovieTile("");
        setShowTrailer(false);
    };

    return (
        <>
            <div className="movie-details">
                <div style={backgroundImageStyle} className="movie">
                    <div className="movie-inner-container">
                        <div
                            onClick={() => handlePlay(movieDetails?.title)}
                            className="poster"
                        >
                            <img
                                src={
                                    movieDetails?.poster_path
                                        ? images + movieDetails?.poster_path
                                        : noImg
                                }
                                alt="movie poster"
                            />
                        </div>

                        <div className="details">
                            <h1>
                                {tvShow
                                    ? movieDetails?.name
                                    : movieDetails?.title}
                            </h1>
                            <p className="tagline">{movieDetails?.tagline} </p>

                            <div>
                                <span>{movieDetails?.release_date} </span>
                                {movieDetails?.genres.map((g) => {
                                    return <span key={g.id}> {g.name} . </span>;
                                })}
                                {tvShow && (
                                    <span>
                                        {movieDetails?.episode_run_time[0]} min
                                    </span>
                                )}
                            </div>

                            <div
                                onClick={() => handlePlay(movieDetails?.title)}
                                className="play-trailer"
                            >
                                <span className="icon">
                                    <BsFillPlayFill />
                                </span>
                                <small>Play Trailer</small>
                            </div>
                            <h3>OVERVIEW</h3>
                            <p className="overview">{movieDetails?.overview}</p>

                            {movieDetails?.belongs_to_collection && (
                                <>
                                    <div className="collection">
                                        <img
                                            src={
                                                images +
                                                movieDetails
                                                    ?.belongs_to_collection
                                                    ?.poster_path
                                            }
                                            alt="image"
                                        />
                                        <p className="collection-name">
                                            {
                                                movieDetails
                                                    ?.belongs_to_collection
                                                    ?.name
                                            }
                                        </p>
                                    </div>
                                </>
                            )}

                            {movieDetails?.homepage && (
                                <p className="link">
                                    <p>You Can Visit:</p>
                                    <Link
                                        target="_blank"
                                        to={movieDetails?.homepage}
                                    >
                                        {movieDetails?.homepage}
                                    </Link>
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {tvShow && (
                    <div className="created-by">
                        <h3>Created By</h3>
                        <div>
                            {movieDetails?.created_by.map((person) => {
                                return (
                                    <div className="person" key={person.id}>
                                        <div className="profile-img">
                                            <img
                                                src={
                                                    person.profile_path
                                                        ? images +
                                                          person.profile_path
                                                        : noImg
                                                }
                                            />
                                        </div>
                                        <p>{person.name}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {movieDetails.next_episode_to_air && (
                    <div className="next-e">
                        <h3>Next Episode</h3>
                        <div className="np-inner">
                            <div>
                                <img
                                    src={
                                        movieDetails.next_episode_to_air
                                            .still_path
                                            ? images +
                                              movieDetails.next_episode_to_air
                                                  .still_path
                                            : noImg
                                    }
                                    alt="image"
                                />
                            </div>
                            <p>
                                Episode name:{" "}
                                {movieDetails?.next_episode_to_air.name}
                            </p>
                            <p>
                                Episode{" "}
                                {
                                    movieDetails?.next_episode_to_air
                                        .episode_number
                                }
                            </p>
                            <p>{movieDetails?.next_episode_to_air.air_date}</p>
                            <p className="np-overview">
                                {movieDetails.next_episode_to_air.overview}
                            </p>
                        </div>
                    </div>
                )}

                {movieDetails.seasons && (
                    <div className="seasons">
                        <h3>Seasons</h3>
                        <div className="season-container">
                            {movieDetails?.seasons.map((season) => {
                                return (
                                    <div key={season.id} className="season">
                                        <div className="s-img">
                                            <img
                                                src={
                                                    season.poster_path
                                                        ? images +
                                                          season.poster_path
                                                        : noImg
                                                }
                                                alt="season image"
                                            />
                                        </div>
                                        <p>{season.name}</p>
                                        <p>
                                            {season.episode_count} episode
                                            {season.episode_count < 2
                                                ? ""
                                                : "s"}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                <div className="ggg">
                    <div className="more-details">
                        <div className="production">
                            <h3>production companies</h3>

                            <div className="companies">
                                {movieDetails?.production_companies.map(
                                    (company) => {
                                        return (
                                            <div
                                                className="company"
                                                key={company.id}
                                            >
                                                <div className="company-logo">
                                                    <img
                                                        src={
                                                            company.logo_path
                                                                ? images +
                                                                  company.logo_path
                                                                : noImg
                                                        }
                                                        alt="company logo"
                                                    />
                                                </div>

                                                <div className="company-details">
                                                    <p className="company-name">
                                                        {company.name}
                                                    </p>
                                                    <p>
                                                        {company.origin_country}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="others-container">
                        <div className="others">
                            <h4>production country</h4>
                            {movieDetails?.production_countries.map(
                                (country) => {
                                    return (
                                        <p
                                            key={country.name}
                                            className="country"
                                        >
                                            {country.name} ({country.iso_3166_1}
                                            )
                                        </p>
                                    );
                                }
                            )}
                        </div>

                        <div className="others">
                            <h4>status</h4>
                            <p>{movieDetails?.status}</p>
                        </div>

                        {!tvShow && (
                            <>
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
                            </>
                        )}
                        {tvShow && (
                            <>
                                <div className="others">
                                    <h4>first episode to air</h4>
                                    <p>{movieDetails?.first_air_date}</p>
                                </div>
                                <div className="others">
                                    <h4>last episode to air</h4>
                                    <p>{movieDetails?.last_air_date}</p>
                                </div>

                                {movieDetails?.next_episode_to_air && (
                                    <div className="others">
                                        <h4>next episode to air</h4>
                                        <p>
                                            {
                                                movieDetails
                                                    ?.next_episode_to_air
                                                    .air_date
                                            }
                                        </p>
                                    </div>
                                )}
                            </>
                        )}

                        <div className="others">
                            <h4>spoken languages</h4>
                            <div>
                                {movieDetails?.spoken_languages.map((lang) => {
                                    return (
                                        <p key={lang.english_name}>
                                            {lang.english_name}
                                        </p>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showTrailer && (
                <div onClick={handleClose} className="trailer-container">
                    <div className="close-video-btn" onClick={handleClose}>
                        <AiOutlineClose />
                    </div>
                    <MovieTrailer movieTitle={movieTitle} />
                </div>
            )}
        </>
    );
};

export default FilmDetails;
