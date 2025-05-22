// hooks/useFetchFilms.js
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { SearchContext } from "../context/SearchContext";

/**
 * Fetch films from TMDB API.
 * @param {string} endpoint - TMDB endpoint like "discover", "trending", "search", "upcoming"
 * @param {string} mediaType - "movie" or "tv"
 * @param {number} page - current page
 */
const useFetchFilms = (endpoint = "discover", mediaType = "movie", page = 1) => {
  const { searchInput } = useContext(SearchContext);
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Adjust path for search context
  const resolvedEndpoint = searchInput ? "search" : endpoint;

  useEffect(() => {
    const fetchFilms = async () => {
      setIsLoading(true);
      setIsError(false);

      const url = `https://api.themoviedb.org/3/${resolvedEndpoint}/${mediaType}?page=${page}`;
      const params = {
        api_key: import.meta.env.VITE_API_KEY,
        query: searchInput || undefined,
      };

      try {
        const response = await axios.get(url, { params });
        setFilms(response.data.results || []);
      } catch (error) {
        console.error("Error fetching films:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilms();
  }, [resolvedEndpoint, mediaType, page, searchInput]);

  return {
    films,
    isLoading,
    isError,
  };
};

export default useFetchFilms;
