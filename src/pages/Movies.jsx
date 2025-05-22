import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import MovieSkeleton from "../components/MovieSkeleton";
import useFetchFilms from "../hooks/useFetchFilms";
import "../components/style/pagination.css";
import "./style/movies.css";
import Banner from "../components/Banner";
import MovieList from "../components/MovieList";
import Error from "../components/Error";
import useRandomMovies from "../hooks/useRandomMovies";

const Movies = () => {
    const [page, setPage] = useState(1);

    useEffect(() => {
        document.title = "Discover || AlvoCine ";
    }, []);

    //get movies
    const {
        films: movies,
        isLoading,
        isError,
    } = useFetchFilms("discover", "movie", page);
    const randomMovies = useRandomMovies(movies);

    //pagination
    const handlePageClick = (data) => {
        setPage(data.selected + 1); // selected is 0-based
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (isLoading) return <MovieSkeleton count={8} />;
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
