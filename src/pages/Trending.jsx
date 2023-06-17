import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Banner from '../components/Banner'
import MovieList from '../components/MovieList'
import { SearchContext } from '../context/SearchContext'

const Trending = () => {
  const { searchInput } = useContext(SearchContext)
  const [trending, setTrending] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const isSearch = searchInput ? 'search' : 'trending';
  const getTrends = async () => {
    const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/${isSearch}/all/week`,
      params: {
        api_key: import.meta.env.VITE_API_KEY,
        query: searchInput
      },
    };

    await axios.request(options).then((response) => {
      setTrending(response.data.results);
    }).catch(function (error) {
      setIsError(true)
      // isLoading(false)
      console.error(error);
    });
  }


  useEffect(() => {
    getTrends()
  }, [searchInput])

  // if (isLoading) return <div>Loading</div>
  if (isError) return <div>erroorr</div>



  const randomImg = (arrr) => {
    return Math.floor(Math.random() * arrr.length)
  }



  return (
    <div className='movies'>
      <Banner bannerImage={trending[randomImg(trending)]} />
      <MovieList getMovies={trending} />
    </div>
  )
}

export default Trending
