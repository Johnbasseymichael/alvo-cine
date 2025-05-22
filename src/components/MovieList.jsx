import React, { useContext, useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import "./style/movie-list.css";
import MovieTrailer from "../trailer/MovieTrailer";
import { AiOutlineClose } from "react-icons/ai";

const MovieList = ({ parentPath, getMovies, sectionNumber }) => {
    const [movieTitle, setMovieTile] = useState("");
    const [showTrailer, setShowTrailer] = useState(false);
    const [section, setSection] = useState("");

    useEffect(() => {
        switch (sectionNumber) {
            case 1:
                setSection("Movies");
                break;
            case 2:
                setSection("Top Series");
                break;
            case 3:
                setSection("Now Trending");
                break;
            case 4:
                setSection("Up Coming ");
                break;
            default:
                break;
        }
    }, []);

    const handlePlay = (title) => {
        setMovieTile(title);
        setShowTrailer(true);
    };

    const handleClose = () => {
        setMovieTile("");
        setShowTrailer(false);
    };
    return (
        <div className="movie-list-container">
            <h2 className="page-name">{section}</h2>

            <div className="movie-list">
                {showTrailer && (
                    <div onClick={handleClose} className="trailer-container">
                        <div className="close-video-btn" onClick={handleClose}>
                            <AiOutlineClose />
                        </div>
                        <MovieTrailer movieTitle={movieTitle} />
                    </div>
                )}

                {getMovies?.map((movie) => (
                    <VideoCard
                        parentPath={parentPath}
                        handlePlay={handlePlay}
                        key={movie.id}
                        movie={movie}
                    />
                ))}
            </div>
        </div>
    );
};

export default MovieList;
