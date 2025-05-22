
import { useState } from "react";
import Banner from "../components/Banner";
import Error from "../components/Error";
import MovieList from "../components/MovieList";
import useRandomMovies from "../hooks/useRandomMovies";
import useFetchFilms from "../hooks/useFetchFilms";
import ReactPaginate from "react-paginate";
import MovieSkeleton from "../components/MovieSkeleton";

const UpComing = () => {
    const [page, setPage] = useState(1);

    //get upcoming
    const {
        films: upcoming,
        isLoading,
        isError,
    } = useFetchFilms("movie", "upcoming", page); // Adjust if needed

    // Shuffle and return random movies
    const randomMovies = useRandomMovies(upcoming);

    //pagination
    const handlePageClick = (data) => {
        setPage(data.selected + 1); // selected is 0-based
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (isLoading) return <MovieSkeleton count={8} />;
    if (isError) return <Error />;
    return (
        <div>
            <Banner showSearchBar={false} randomMovies={randomMovies} />
            <MovieList
                parentPath={"upcoming/"}
                sectionNumber={4}
                getMovies={upcoming}
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

export default UpComing;
