import React, { useContext, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";

import "../components/style/pagination.css";
import "./style/movies.css";
import Banner from "../components/Banner";
import MovieList from "../components/MovieList";
import { SearchContext } from "../context/SearchContext";
import Error from "../components/Error";

const Movies = () => {
    const { searchInput } = useContext(SearchContext);
    const [movies, setMovies] = useState([]);
    const [randomMovies, setRandomMovies] = useState([]);
    const [isError, setIsError] = useState(false);
    const [page, setPage] = useState(1);

    const isSearch = searchInput ? "search" : "discover";

    // ⬇️ Utility: Shuffle and return random movies
    function getRandomMovies(movies, count = 5) {
        const shuffled = [...movies];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled.slice(0, count);
    }

    const handlePageClick = (data) => {
        setPage(data.selected + 1); // selected is 0-based
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Fetch movies
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

        try {
            const response = await axios.request(options);
            const movieResults = response.data.results;
            setMovies(movieResults);
        } catch (error) {
            setIsError(true);
            console.error(error);
        }
    };

    // ⬇️ Fetch when input/page changes
    useEffect(() => {
        getMovies();
    }, [searchInput, page]);

    // ⬇️ Update random movies after fetch
    useEffect(() => {
        if (movies.length > 0) {
            const random = getRandomMovies(movies, 5);
            setRandomMovies(random);
        }
    }, [movies]);

    // Pagination handlers
    const nextPage = () => {
        setPage((prev) => prev + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const prevPage = () => {
        setPage((prev) => Math.max(prev - 1, 1));
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (isError) return <Error />;

    return (
        <div className="movies">
            <Banner
                showSearchBar={true}
                randomMovies={randomMovies}
                parentPath=""
            />
            <MovieList parentPath="" sectionNumber={1} getMovies={movies} />

            
            <ReactPaginate
                previousLabel={"← Prev"}
                nextLabel={"Next →"}
                breakLabel={"..."}
                pageCount={50} 
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                nextClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
            />
        </div>
    );
};

export default Movies;
