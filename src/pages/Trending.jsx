import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Error from "../components/Error";
import MovieList from "../components/MovieList";
import useRandomMovies from "../hooks/useRandomMovies";
import useFetchFilms from "../hooks/useFetchFilms";
import ReactPaginate from "react-paginate";
import MovieSkeleton from "../components/MovieSkeleton";

const Trending = () => {
    const [page, setPage] = useState(1);


useEffect(() => {
        document.title = "Trending || AlvoCine ";
    }, []);

    // getMovies
    const {
        films: trending,
        isLoading,
        isError,
    } = useFetchFilms("trending", "all/week", page);

    const randomMovies = useRandomMovies(trending);

    //pagination
    const handlePageClick = (data) => {
        setPage(data.selected + 1); // selected is 0-based
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (isLoading) return <MovieSkeleton count={8} />;
    if (isError) return <Error />;

    return (
        <div className="movies">
            <Banner showSearchBar={false}  parentPath="/trending" randomMovies={randomMovies} />
            <MovieList
                parentPath={"trending/"}
                sectionNumber={3}
                getMovies={trending}
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

export default Trending;
