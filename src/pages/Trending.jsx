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

  const [page, setPage] = useState(1)
  const pageNum = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  const getTrends = async () => {
    document.title = 'Trends'
    const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/${isSearch}/all/week?page=${page}`,
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
  }, [searchInput, page])

  // if (isLoading) return <div>Loading</div>
  if (isError) return <div>erroorr</div>



  const randomImg = (arrr) => {
    return Math.floor(Math.random() * arrr.length)
  }



  return (
    <div className='movies'>
      <Banner showSearchBar={false} bannerImage={trending[randomImg(trending)]} />
      <MovieList getMovies={trending} />

      <div className="pages-btn">
        {pageNum.map((num) => {
          return <button key={num} onClick={() => setPage(num)}>{num}</button>
        })}
      </div>
    </div>
  )
}

export default Trending
