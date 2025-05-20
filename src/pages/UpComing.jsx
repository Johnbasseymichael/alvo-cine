import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Error from "../components/Error";
import Loading from "../components/Loading";
import MovieList from "../components/MovieList";

const UpComing = () => {
    const [page, setPage] = useState(1);

    const {
        data: upcoming,
        isError,
        isLoading,
    } = useQuery(["get upcoming", page], async () => {
        document.title = "Up Coming";

        const options = {
            method: "GET",
            url: `https://api.themoviedb.org/3/movie/upcoming?page=${page}`,
            params: {
                api_key: import.meta.env.VITE_API_KEY,
            },
        };

        try {
            const res = await axios.request(options);
            return res.data.results;
        } catch (error) {
            console.error(error);
        }
    });

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
        if (upcoming?.length > 0) {
            const random = getRandomMovies(upcoming, 5);
            setRandomMovies(random);
        }
    }, [upcoming]);

    if (isLoading) return <Loading />;
    if (isError) return <Error />;
    return (
        <div>
            <Banner
                showSearchBar={false}
                randomMovies={randomMovies}
                bannerImage={upcoming && upcoming[randomImg(upcoming)]}
            />
            <MovieList
                parentPath={"upcoming/"}
                sectionNumber={4}
                getMovies={upcoming}
            />

            {upcoming[0] && (
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

export default UpComing;
