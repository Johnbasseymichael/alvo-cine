import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Movies from "./pages/Movies";
import Shows from "./pages/Shows";
import Trending from "./pages/Trending";
import UpComing from "./pages/UpComing";
import MovieDetails from "./pages/MovieDetails";
import ShowDetails from "./pages/ShowDetails";
import { useEffect, useState, useContext } from "react";
import Offline from "./components/Offline";
import PNF from "./pages/PNF";

import "react-loading-skeleton/dist/skeleton.css";

import { useLocation } from "react-router-dom";
import { SearchContext } from "./context/SearchContext";

function App() {
    const location = useLocation();
    const { setSearchInput } = useContext(SearchContext);

    useEffect(() => {
        // Reset search input whenever the path changes
        setSearchInput("");
    }, [location.pathname]);

    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    return (
        <>
            {!isOnline && <Offline />} {/* 👈 Show only when no internet */}
            <Navbar />
            <Routes>
                <Route path="/" element={<Movies />} />
                <Route path="/trending" element={<Trending />} />
                <Route path="/shows" element={<Shows />} />
                <Route path="/upcoming" element={<UpComing />} />

                <Route path="*" element={<PNF />} />
                <Route path="/:movieId" element={<MovieDetails />} />
                <Route path="/upcoming/:movieId" element={<MovieDetails />} />
                <Route path="/trending/:movieId" element={<MovieDetails />} />
                <Route path="/shows/:movieId" element={<ShowDetails />} />
            </Routes>
        </>
    );
}
export default App;
