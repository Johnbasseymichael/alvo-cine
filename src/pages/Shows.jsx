import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Banner from '../components/Banner'
import MovieList from '../components/MovieList'
import { SearchContext } from '../context/SearchContext'

const Shows = () => {
  const { searchInput } = useContext(SearchContext)
  const [shows, setShows] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const isSearch = searchInput ? 'search' : 'discover';

  const getShow = async () => {
    const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/${isSearch}/tv?page=1`,
      params: {
        api_key: import.meta.env.VITE_API_KEY,
        query: searchInput
      },
    };
    await axios.request(options).then((response) => {
      setShows(response.data.results);
    }).catch(function (error) {
      setIsError(true)
      isLoading(false)
      console.error(error);
    });
  }
  useEffect(() => {
    getShow()
  }, [searchInput])

  // if (isLoading) return <div>Loading</div>
  if (isError) return <div>erroorr</div>



  const randomImg = (arrr) => {
    return Math.floor(Math.random() * arrr.length)
  }

  // console.log(shows);


  return (
    <div className='movies'>
      <Banner bannerImage={shows[randomImg(shows)]} />
      <MovieList getMovies={shows} />
    </div>
  )
}

export default Shows
