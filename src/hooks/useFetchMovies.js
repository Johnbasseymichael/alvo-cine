import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { SearchContext } from "../context/SearchContext";

const useFetchMovies = (endpointPath, initialPage = 1) => {
    const { searchInput } = useContext(SearchContext);
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(initialPage);
    const [isError, setIsError] = useState(false);
    const isSearch = searchInput ? "search" : endpointPath;

    const fetchMovies = async () => {
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
            setMovies(response.data.results);
            setIsError(false);
        } catch (error) {
            console.error(error);
            setIsError(true);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, [searchInput, page]);

    return { movies, page, setPage, isError };
};

export default useFetchMovies;