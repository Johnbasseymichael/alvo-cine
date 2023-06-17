import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import './style/movies.css'
import Banner from '../components/Banner'
import MovieList from '../components/MovieList'
import { SearchContext } from '../context/SearchContext'
import MovieTrailer from '../trailer/MovieTrailer'

const Movies = () => {
    const { searchInput } = useContext(SearchContext)
    const [movies, setMovies] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const isSearch = searchInput ? 'search' : 'discover';

    const getMovies = async () => {
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/${isSearch}/movie?page=1`,
            params: {
                api_key: import.meta.env.VITE_API_KEY,
                query: searchInput
            },
        };
        await axios.request(options).then((response) => {
            setMovies(response.data.results);
        }).catch(function (error) {
            setIsError(true)
            console.error(error);
        });
    }
    useEffect(() => {
        getMovies()
    }, [searchInput])

    // if (isLoading) return <div>Loading</div>
    if (isError) return <div>erroorr</div>



    const randomImg = (arrr) => {
        return Math.floor(Math.random() * arrr.length)
    }

    // console.log(movies.length);


    return (
        <div className='movies'>
            <Banner bannerImage={movies[randomImg(movies)]} />
            <MovieList getMovies={movies} />
        </div>
    )
}

export default Movies
