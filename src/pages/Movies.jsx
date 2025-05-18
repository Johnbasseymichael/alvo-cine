import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./style/movies.css";
import Banner from "../components/Banner";
import MovieList from "../components/MovieList";
import { SearchContext } from "../context/SearchContext";
import Error from "../components/Error";

const Movies = () => {
    const { searchInput } = useContext(SearchContext);
    const [movies, setMovies] = useState([]);
    const [isError, setIsError] = useState(false);
    const isSearch = searchInput ? "search" : "discover";

    const [page, setPage] = useState(1);

    const getMovies = async () => {
        document.title = "Movies";
        const options = {
            method: "GET",
            url: `https://api.themoviedb.org/3/${isSearch}/movie?page=${page}`,
            params: {
                api_key: import.meta.env.VITE_API_KEY,
                query: searchInput,
            },
        };
        await axios
            .request(options)
            .then((response) => {
                setMovies(response.data.results);
            })
            .catch(function (error) {
                setIsError(true);
                console.error(error);
            });
    };

    useEffect(() => {
        getMovies();
    }, [searchInput, page]);

    const randomImg = (arrr) => {
        return Math.floor(Math.random() * arrr.length);
    };

    const nextPage = () => {
        setPage(page + 1);
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const prevPage = () => {
        setPage(page - 1);
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    if (isError) return <Error />;

    return (
        <div className="movies">
            <Banner
                showSearchBar={true}
                bannerImage={movies[randomImg(movies)]}
            />

            <MovieList parentPath="" getMovies={movies} />

            <>
                <div className="pages-btn">
                    {page > 1 && <button onClick={prevPage}>prev</button>}
                    <button onClick={nextPage}>next</button>
                </div>
            </>
        </div>
    );
};

export default Movies;
