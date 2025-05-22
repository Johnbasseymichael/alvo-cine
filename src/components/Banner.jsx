// import React, { useContext, useState } from "react";
// import { SearchContext } from "../context/SearchContext";
// import "./style/banner.css";
// import { BiSearch } from "react-icons/bi";

// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import { Pagination, Autoplay } from "swiper/modules";
// import { Link } from "react-router-dom";

// const Banner = ({ randomMovies = [], showSearchBar, parentPath }) => {
//     const { setSearchInput } = useContext(SearchContext);
//     const [ searchBox, setSearchBox] = useState("");
    
//     const handleSearch = () => {
//         setSearchInput(searchBox);
//     };

//     const images = "https://image.tmdb.org/t/p/w780"; 

//     const getFirstWords = (text, wordCount = 10) => {
//         if (!text) return "";
//         const words = text.trim().split(/\s+/); // split on any whitespace
//         return (
//             words.slice(0, wordCount).join(" ") +
//             (words.length > wordCount ? "..." : "")
//         );
//     };

//     return (
//         <div className="banner">
//             <Swiper
//                 autoplay={{
//                     delay: 5000,
//                     disableOnInteraction: false,
//                 }}
//                 pagination={{
//                     dynamicBullets: true,
//                 }}
//                 modules={[Pagination, Autoplay]}
//                 className="mySwiper"
//             >
//                 {randomMovies.map((movie, i) => {
//                     const slideBackground = {
//                         backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.38)), url(${
//                             images + movie.backdrop_path
//                         })`,
//                         backgroundSize: "cover",
//                         backgroundPosition: "center",
//                     };

//                     return (
//                         <SwiperSlide key={i} style={slideBackground}>
//                             <div className="random-movie-details">
//                                 <h2>{movie.title}</h2>
//                                 <i>{getFirstWords(movie.overview, 10)}</i>
//                                 <div className="btn">
//                                     <Link to={`${parentPath}/${movie.id}`}>
//                                         View Info
//                                     </Link>
//                                 </div>
//                             </div>
//                         </SwiperSlide>
//                     );
//                 })}
//             </Swiper>

//             {/* Optional search bar */}
//             {showSearchBar && (
//                 <div className="search">
//                     <input
//                         type="search"
//                         placeholder="Search for your favorite movie"
//                         onChange={(e) => setSearchBox(e.target.value)}
//                     />
//                     <button onClick={handleSearch} className=" search-icon">
//                         <span>Search</span>
//                         <BiSearch />
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Banner;









// import React, { useContext, useState } from "react";
// import { SearchContext } from "../context/SearchContext";
// import "./style/banner.css";
// import { BiSearch } from "react-icons/bi";
// import axios from "axios";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Autoplay } from "swiper/modules";
// import { Link } from "react-router-dom";
// import "swiper/css";
// import "swiper/css/pagination";

// const Banner = ({ randomMovies = [], showSearchBar, parentPath }) => {
//     const { setSearchInput, setSearchType } = useContext(SearchContext);
//     const [searchBox, setSearchBox] = useState("");
//     const [suggestions, setSuggestions] = useState([]);
//     const [type, setType] = useState("multi");

//     const handleSearch = async () => {
//         setSearchInput(searchBox);
//         setSearchType(type);

//         if (!searchBox.trim()) return;

//         try {
//             const res = await axios.get(
//                 `https://api.themoviedb.org/3/search/${type}?api_key=${
//                     import.meta.env.VITE_API_KEY
//                 }&query=${searchBox}`
//             );
//             setSuggestions(res.data.results.slice(0, 5));
//         } catch (error) {
//             console.error("Search failed:", error);
//         }
//     };

//     const images = "https://image.tmdb.org/t/p/w780";
//     const getFirstWords = (text, wordCount = 10) => {
//         if (!text) return "";
//         const words = text.trim().split(/\s+/);
//         return words.slice(0, wordCount).join(" ") + (words.length > wordCount ? "..." : "");
//     };

//     return (
//         <div className="banner">
//             <Swiper
//                 autoplay={{ delay: 5000, disableOnInteraction: false }}
//                 pagination={{ dynamicBullets: true }}
//                 modules={[Pagination, Autoplay]}
//                 className="mySwiper"
//             >
//                 {randomMovies.map((movie, i) => {
//                     const slideBackground = {
//                         backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.38)), url(${
//                             images + movie.backdrop_path
//                         })`,
//                         backgroundSize: "cover",
//                         backgroundPosition: "center",
//                     };
//                     return (
//                         <SwiperSlide key={i} style={slideBackground}>
//                             <div className="random-movie-details">
//                                 <h2>{movie.title}</h2>
//                                 <i>{getFirstWords(movie.overview, 10)}</i>
//                                 <div className="btn">
//                                     <Link to={`${parentPath}/${movie.id}`}>
//                                         View Info
//                                     </Link>
//                                 </div>
//                             </div>
//                         </SwiperSlide>
//                     );
//                 })}
//             </Swiper>

//             {showSearchBar && (
//                 <div className="search">
//                     <input
//                         type="search"
//                         placeholder="Search for your favorite movie or show"
//                         value={searchBox}
//                         onChange={(e) => setSearchBox(e.target.value)}
//                     />

//                     <select onChange={(e) => setType(e.target.value)} value={type}>
//                         <option value="multi">All</option>
//                         <option value="movie">Movies</option>
//                         <option value="tv">TV Shows</option>
//                     </select>

//                     <button onClick={handleSearch} className="search-icon">
//                         <span>Search</span>
//                         <BiSearch />
//                     </button>
//                 </div>
//             )}

//             {/* Suggestions */}
//             {suggestions.length > 0 && (
//                 <ul className="suggestion-list">
//                     {suggestions.map((item) => (
//                         <li key={item.id}>
//                             <Link to={`/${item.media_type}/${item.id}`}>
//                                 {item.title || item.name}
//                             </Link>
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// };

// export default Banner;








// components/Banner.jsx






import React, { useContext, useState } from "react";
import { SearchContext } from "../context/SearchContext";
import "./style/banner.css";
import { BiSearch } from "react-icons/bi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";

const Banner = ({ randomMovies = [], showSearchBar, parentPath }) => {
    const { searchInput, setSearchInput } = useContext(SearchContext);
    const [ searchInp, setSearchInp ] = useState("");

    const handleSearch = () => {
        setSearchInput(searchInp)
        if (!searchInput.trim()) return;
        // already updated by the input onChange
    };

    const images = "https://image.tmdb.org/t/p/w780";
    const getFirstWords = (text, wordCount = 10) => {
        if (!text) return "";
        const words = text.trim().split(/\s+/);
        return words.slice(0, wordCount).join(" ") + (words.length > wordCount ? "..." : "");
    };

    return (
        <div className="banner">
            <Swiper
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{ dynamicBullets: true }}
                modules={[Pagination, Autoplay]}
                className="mySwiper"
            >
                {randomMovies.map((movie, i) => {
                    const slideBackground = {
                        backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.38)), url(${images + movie.backdrop_path})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    };

                    return (
                        <SwiperSlide key={i} style={slideBackground}>
                            <div className="random-movie-details">
                                <h2>{movie.title}</h2>
                                <i>{getFirstWords(movie.overview, 10)}</i>
                                <div className="btn">
                                    <Link to={`${parentPath}/${movie.id}`}>
                                        View Info
                                    </Link>
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>

            {showSearchBar && (
                <div className="search">
                    <input
                        type="search"
                        placeholder="Search for your favorite movie"
                        value={searchInput || searchInp}
                        onChange={(e) => setSearchInp(e.target.value)}
                    />
                    <button onClick={handleSearch} className="search-icon">
                        <span>Search</span>
                        <BiSearch />
                    </button>
                </div>
            )}
        </div>
    );
};

export default Banner;
