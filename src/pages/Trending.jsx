import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Banner from "../components/Banner";
import Error from "../components/Error";
import MovieList from "../components/MovieList";
import { SearchContext } from "../context/SearchContext";

const Trending = () => {
    const { searchInput } = useContext(SearchContext);
    const [trending, setTrending] = useState([]);
    const [isError, setIsError] = useState(false);
    const isSearch = searchInput ? "search" : "trending";
    const [randomMovies, setRandomMovies] = useState([]);

    // ⬇️ Utility: Shuffle and return random movies
    function getRandomMovies(movies, count = 5) {
        const shuffled = [...movies];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled.slice(0, count);
    }

    // ⬇️ Update random movies after fetch
    useEffect(() => {
        if (trending.length > 0) {
            const random = getRandomMovies(trending, 5);
            setRandomMovies(random);
        }
    }, [trending]);

    const [page, setPage] = useState(1);

    const getTrends = async () => {
        document.title = "Trends";
        const options = {
            method: "GET",
            url: `https://api.themoviedb.org/3/${isSearch}/all/week?page=${page}`,
            params: {
                api_key: import.meta.env.VITE_API_KEY,
                query: searchInput,
            },
        };

        await axios
            .request(options)
            .then((response) => {
                setTrending(response.data.results);
            })
            .catch(function (error) {
                setIsError(true);
                // isLoading(false)
                console.error(error);
            });
    };

    useEffect(() => {
        getTrends();
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
                showSearchBar={false}
                randomMovies={randomMovies}
                bannerImage={trending[randomImg(trending)]}
            />
            <MovieList
                parentPath={"trending/"}
                sectionNumber={3}
                getMovies={trending}
            />

            {trending[0] && (
                <>
                    <div className="pages-btn">
                        {page > 1 && <button onClick={prevPage}>prev</button>}
                        <button onClick={nextPage}>next</button>
                    </div>
                    <div className="page-number">page = {page}</div>
                </>
            )}
        </div>
    );
};

export default Trending;
