import { useState } from "react";
import Banner from "../components/Banner";
import Error from "../components/Error";
import MovieList from "../components/MovieList";
import useRandomMovies from "../hooks/useRandomMovies";
import useFetchFilms from "../hooks/useFetchFilms";
import MovieSkeleton from "../components/MovieSkeleton";
import ReactPaginate from "react-paginate";

const Shows = () => {
    const [page, setPage] = useState(1);

    //get shows/series
    const {
        films: shows,
        isLoading,
        isError,
    } = useFetchFilms("discover", "tv", page);

    const randomMovies = useRandomMovies(shows);

    //pagination
    const handlePageClick = (data) => {
        setPage(data.selected + 1); // selected is 0-based
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (isLoading) return <MovieSkeleton count={8} />;
    if (isError) return <Error />;

    return (
        <div className="movies">
            <Banner showSearchBar={true} randomMovies={randomMovies} />
            <MovieList
                parentPath={"shows/"}
                sectionNumber={2}
                getMovies={shows}
            />
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

export default Shows;
